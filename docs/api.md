# HTTP API

所有接口以 `/api/v1` 为前缀，响应使用 UTF-8 JSON。除健康检查、认证状态、首次初始化和登录外，接口都需要有效会话。

## 认证

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/auth/status` | 初始化和登录状态 |
| `POST` | `/auth/bootstrap` | 将一次性初始化链接中的 token 兑换为短时 HttpOnly Cookie |
| `POST` | `/auth/setup` | 使用短时初始化授权创建首个管理员，仅可成功一次 |
| `POST` | `/auth/login` | 登录并设置 HttpOnly Cookie |
| `POST` | `/auth/logout` | 注销当前会话 |
| `POST` | `/auth/password` | 修改密码并注销旧会话 |

登录、初始化和状态响应会返回 `csrfToken`。所有已登录的非只读请求必须增加：

```http
X-CSRF-Token: <csrfToken>
```

浏览器会话 Cookie 名为 `kdae_panel_session`，属性为 `HttpOnly`、`SameSite=Strict`，可配置 `Secure`。

未初始化时，`/auth/status` 会返回 `bootstrapRequired: true`。前端从服务启动日志所示 URL 的 `#bootstrap=...` 片段读取 token，调用 `/auth/bootstrap` 兑换一个有效期 10 分钟、`HttpOnly`、`SameSite=Strict` 的初始化 Cookie，并立即从地址栏清除片段。`/auth/setup` 的 JSON 只包含用户名和密码，不再传输 bootstrap token。显式配置 `KDAE_PANEL_BOOTSTRAP_TOKEN` 时，启动日志会基于该固定值生成初始化链接。

## dae 能力

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/health` | 面板健康状态和版本 |
| `GET` | `/dae/capabilities` | dae 可用性、版本和命令能力 |
| `GET` | `/dae/outline` | 当前 dae 导出的动态配置结构 |

## 配置

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/config` | 入口配置文本、SHA-256 和文件元数据 |
| `POST` | `/config/validate` | 只校验候选内容 |
| `PUT` | `/config` | 保存候选内容，可选择立即重载 |
| `GET` | `/config/backups` | 列出自动备份 |
| `POST` | `/config/backups/{id}/restore` | 恢复指定备份 |

保存示例：

```json
{
  "content": "global { ... }\nrouting { fallback: direct }\n",
  "expectedHash": "提交编辑前读取到的 SHA-256",
  "apply": true
}
```

入口配置已经存在时，`expectedHash` 必填且不匹配时返回 HTTP `409`，防止覆盖外部修改；新建入口配置时必须为空。`apply` 默认为 `true`。

配置保存、备份恢复和服务控制操作会共享串行门；已有操作执行时返回 `409 operation_in_progress`，避免多个控制动作交叉执行。

常见错误码：

| HTTP | code | 含义 |
|---|---|---|
| `409` | `configuration_conflict` | 磁盘内容已经变化 |
| `422` | `configuration_invalid` | dae 拒绝候选配置 |
| `502` | `configuration_apply_failed` | 保存后重载失败，响应包含回滚状态 |

## 订阅自动刷新

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/schedule/reload` | 读取自动重载的设置与执行状态 |
| `PUT` | `/schedule/reload` | 更新自动重载设置 |

```json
{
  "enabled": true,
  "intervalMinutes": 1440
}
```

响应在此基础上追加 `lastRunAt`、`lastError` 和 `nextRunAt`。

dae 只在重载时重新拉取 `subscription` 链接，因此"订阅定时刷新"的实现就是按间隔执行一次 `dae reload`。每轮开始前尝试获取全局控制锁，锁被占用时跳过当轮并把原因记入 `lastError`，不会与用户发起的操作交叉。

间隔取值范围为 5 分钟到 7 天。设置与上次执行时间一起持久化在 `KDAE_PANEL_SCHEDULE_FILE` 指向的文件中，下一轮按"上次执行 + 间隔"排期，因此面板重启或提交无变化的设置都不会把倒计时重新拉满；停机期间错过的轮次会在启动一分钟后补做。

重载应用的是磁盘上的当前配置，所以之前用 `apply: false` 保存但未应用的改动会随这次刷新一并生效。

订阅内容本身的缓存由 dae 负责：把链接的 scheme 写成带 `-file` 后缀的形式（如 `https-file://`），dae 会将拉取成功的内容保存到 `config_dir/persist.d/<tag>.sub`，并在后续拉取失败时回退使用。面板只负责在配置里维护这一行，不自行下载或缓存订阅内容。

## 网络探测

| 方法 | 路径 | 说明 |
|---|---|---|
| `POST` | `/net/latency` | 从面板主机对目标做 TCP 握手延迟探测 |

请求与响应示例：

```json
{
  "targets": [
    { "host": "hk.example.com", "port": 443 }
  ]
}
```

```json
{
  "results": [
    { "host": "hk.example.com", "port": 443, "reachable": true, "latencyMs": 42.7 }
  ]
}
```

单次最多 64 个目标，单目标超时 4 秒，同一时刻最多 16 个并发拨号（上限属于面板进程，多个并发请求共享）。

`latencyMs` 是从发起拨号到 TCP 连接建立的耗时。目标为域名时它包含名称解析时间，因此冷缓存下的首次结果会偏高。该值反映面板主机到节点服务器的可达性，不等同于 dae 内部按 `tcp_check_url`/`udp_check_dns` 进行的健康检查，也不是 dae 选路时使用的延迟。

还有一层需要注意：dae 配置 `wan_interface` 时会劫持本机进程发出的流量，只有 dae 自身的连接凭 `so_mark_from_dae` 豁免。面板与 dae 同机运行，因此探测连接同样会进入 dae 的转发平面并按 routing 规则选路，测到的可能是经代理转发的路径而非物理直连。

单个目标不合法只影响它自己那条结果（`reachable: false` 并带 `error`），不会让整批探测失败；只有请求为空或超过 64 个目标才返回 `400`。目标列表会记入面板日志以供审计。

目标地址来自管理员自己的 dae 配置，可能合法指向内网或回环地址，因此服务端不按地址段过滤；该端点与其他写接口一样要求有效会话与 CSRF 令牌。

## 服务与日志

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/service` | systemd 状态与资源数据 |
| `POST` | `/service/actions/start` | 启动 dae |
| `POST` | `/service/actions/stop` | 停止 dae |
| `POST` | `/service/actions/restart` | 重启 dae |
| `POST` | `/service/actions/reload` | 执行 `dae reload` |
| `POST` | `/service/actions/suspend` | 执行 `dae suspend` |
| `GET` | `/logs?limit=200` | 最近 1–500 条 journald 日志 |
| `GET` | `/diagnostics/sysdump` | 执行 dae sysdump，并以 `application/gzip` 下载生成的归档 |

所有动作名和参数都由服务端白名单决定。URL、请求体和查询参数都不能注入额外命令参数。

## 错误格式

```json
{
  "error": {
    "code": "configuration_invalid",
    "message": "dae 配置校验失败：..."
  }
}
```

认证失败返回 `401`，CSRF 或来源检查失败返回 `403`，登录限速返回 `429` 并带 `Retry-After`。

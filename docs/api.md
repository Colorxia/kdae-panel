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

## dae 版本管理

默认关闭。未设置 `KDAE_PANEL_ENABLE_DAE_INSTALL=true` 时，以下接口一律返回 `503 dae_install_disabled`。

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/dae/install` | 当前安装状态与正在进行的任务 |
| `GET` | `/dae/versions?source=official\|kdae` | 列出可安装版本 |
| `POST` | `/dae/install` | 开始安装指定版本 |
| `POST` | `/dae/rollback` | 回滚到上一版本 |

安装请求体：

```json
{ "source": "kdae", "ref": "30187784287", "label": "d63a0c1" }
```

`source` 只接受 `official` 与 `kdae` 两个枚举值，仓库地址在代码中写死，不接受外部指定。`ref` 对官方来源是发布 tag，对 kdae 是构建编号。`GET /dae/versions` 另接受 `limit` 参数（1–100，默认 30），超出范围返回 `400 invalid_limit`。

机器上还没有 dae 时，`GET /dae/install` 的响应会附带 `provision` 字段，说明首次安装是否可行、将要写入哪些路径、以及缺少哪些可写目录。此时提交安装会走首次安装：除可执行文件外还写入 geo 数据、种子配置与 systemd 单元，然后 `daemon-reload`，但**不会启动服务**。

任务进行中（`downloading`/`applying`）的响应**不含** `provision`：该字段要靠实际试写目标目录才能算出来，而界面每两秒轮询一次，其中一个探测目标正是 systemd 在 inotify 监视的单元目录。客户端应沿用上一次拿到的值，而不是当作"首次安装已不可行"。

安装与回滚耗时以分钟计，远超 HTTP 写超时，因此立即返回 `202` 与任务快照，由客户端轮询 `GET /dae/install` 获取进度。任务阶段依次为 `downloading`、`applying`，终态为 `done` 或 `failed`。同一时刻只允许一个任务，重复提交返回 `409 install_in_progress`。

下载与校验不占用全局控制门，只有替换与重启阶段才进入串行区，避免几十兆的下载把配置保存一并堵住。

校验和缺失或格式不符时拒绝安装，没有跳过校验的开关。kdae 的构建产物保留 90 天，过期版本在列表中标记为不可安装；面板只接受本仓库自己的构建，解析时会重新核对 `head_repository`、事件类型、分支与工作流文件路径四项。

## geo 数据更新

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/dae/geo` | geo 数据现状与正在进行的任务 |
| `POST` | `/dae/geo` | 更新到上游最新版（无请求体） |

独立开关 `KDAE_PANEL_ENABLE_GEO_UPDATE`，与 dae 版本管理互不影响；未启用时返回 `503 geo_update_disabled`。

`GET` 返回 `status.targetDir`（本次会写入哪个目录）、`status.searchPath`（dae 的完整查找顺序）、每个文件的实际路径与大小，以及 `files[].shadowed`——被优先级更高的副本遮蔽、因而不会生效的同名文件。

`POST` 立即返回 `202` 与任务快照，进度靠轮询 `GET /dae/geo`，阶段与安装任务一致（`downloading` → `applying` → `done`/`failed`）。同一时刻只允许一个 geo 任务，重复提交返回 `409 geo_update_in_progress`；它与安装任务各有各的任务槽，但落盘阶段共用全局控制门。

更新只触发 `dae reload`，不重启服务。若 dae 不接受新数据，面板会自动还原旧文件并再 reload 一次，任务标记为 `failed`。

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

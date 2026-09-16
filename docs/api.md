# HTTP API

所有接口以 `/api/v1` 为前缀，使用 UTF-8 JSON。除健康检查、认证状态、首次初始化和登录外，都需要有效会话。

## 通用约定

**CSRF**：登录、初始化和状态响应会返回 `csrfToken`。已登录的非只读请求必须带上：

```http
X-CSRF-Token: <csrfToken>
```

**会话 Cookie**：`kdae_panel_session`，`HttpOnly`、`SameSite=Strict`，可配置 `Secure`。

**错误格式**：

```json
{
  "error": {
    "code": "configuration_invalid",
    "message": "dae 配置校验失败：..."
  }
}
```

认证失败返回 `401`，CSRF 或来源检查失败返回 `403`，登录限速返回 `429` 并带 `Retry-After`。

**串行操作**：配置保存、备份恢复、服务控制等会改动状态的操作共用一把锁，已有操作执行时返回 `409 operation_in_progress`。

**异步任务**：dae 安装、Geo 更新、面板自升级立即返回 `202` 和任务快照，客户端轮询对应的 `GET` 接口获取进度。dae 安装与 Geo 更新的任务阶段为 `downloading` → `applying` → `done` / `failed`。

## 认证

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/auth/status` | 初始化和登录状态 |
| `POST` | `/auth/bootstrap` | 用初始化链接中的 token 换取短时初始化 Cookie |
| `POST` | `/auth/setup` | 创建首个管理员，只能成功一次 |
| `POST` | `/auth/login` | 登录 |
| `POST` | `/auth/logout` | 注销当前会话 |
| `POST` | `/auth/password` | 修改密码并注销旧会话 |

未初始化时 `/auth/status` 返回 `bootstrapRequired: true`。前端从链接的 `#bootstrap=...` 片段读取 token，调用 `/auth/bootstrap` 换取有效期 10 分钟的初始化 Cookie，再用 `/auth/setup` 提交用户名和密码。

## dae 能力

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/health` | 面板健康状态和版本 |
| `GET` | `/dae/capabilities` | dae 可用性、版本和命令能力 |
| `GET` | `/dae/outline` | 当前 dae 的配置结构 |

## 配置

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/config` | 入口配置文本、SHA-256 和文件信息 |
| `POST` | `/config/validate` | 只校验，不保存 |
| `PUT` | `/config` | 保存，可选立即重载 |
| `GET` | `/config/section-versions` | 列出 DNS 和路由区块版本 |
| `POST` | `/config/section-versions` | 保存区块版本 |
| `PUT` | `/config/section-versions/{id}` | 更新区块版本 |
| `DELETE` | `/config/section-versions/{id}` | 删除区块版本 |
| `GET` | `/config/backups` | 列出自动备份和存档 |
| `POST` | `/config/backups` | 把当前配置保存为存档 |
| `POST` | `/config/backups/import` | 导入 `.kdae` 包或 `.dae` 文件为存档 |
| `PUT` | `/config/backups/{id}` | 修改存档名称和备注 |
| `DELETE` | `/config/backups/{id}` | 删除存档 |
| `GET` | `/config/backups/{id}/export` | 导出 `.kdae` 包（含配置和区块版本）；`?format=dae` 只导出配置原文 |
| `GET` | `/config/backups/{id}/preview` | 与当前配置比较，并用当前 dae 预先校验 |
| `POST` | `/config/backups/{id}/restore` | 恢复存档 |

### 保存配置

```json
{
  "content": "global { ... }\nrouting { fallback: direct }\n",
  "expectedHash": "读取时拿到的 SHA-256",
  "apply": true
}
```

- 入口配置已存在时 `expectedHash` 必填，不匹配返回 `409 configuration_conflict`；新建时必须为空。
- `apply` 默认 `true`。dae 未运行时仍然保存成功，响应带 `"deferred": true`，表示下次启动时生效。
- `managedSubscriptions` 可选：随本次保存一起生效的自定义 User-Agent 订阅列表，每条须先经过 `prepare`。列表无效返回 `400 managed_subscriptions_invalid`。

### 存档

创建和编辑存档：

```json
{ "name": "稳定线路", "note": "家庭网络使用" }
```

`name` 必填，最多 80 字符；`note` 可选，最多 500 字符。所有备份和存档共用上限：最多 50 份、总计 256 MiB，超出时删除最旧的。

区块版本的 `kind` 为 `dns` 或 `routing`，`content` 是不含外层声明的区块内容。导入只创建存档，不会覆盖当前配置。

恢复前应先调用 `preview`，响应包含：

| 字段 | 含义 |
|---|---|
| `same` | 配置和区块版本都与当前一致 |
| `configSame` / `versionsSame` | 分别比较配置和区块版本 |
| `valid` / 校验错误 | 当前 dae 是否接受该存档 |
| `diff` | 逐行差异，最多 4000 行；输入超过 5 万行时不生成差异，但仍会校验 |
| `currentHash` | 恢复请求要用的乐观锁 |

### 错误码

| HTTP | code | 含义 |
|---|---|---|
| `400` | `configuration_backup_invalid` | 存档名称或备注长度不符合要求 |
| `409` | `configuration_conflict` | 磁盘内容已经变化 |
| `422` | `configuration_invalid` | dae 拒绝候选配置 |
| `502` | `configuration_apply_failed` | 保存后重载失败，响应包含回滚状态 |

## 订阅

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/subscriptions/nodes` | 读取 dae 订阅缓存中的节点，供分组编辑器使用 |
| `GET` | `/subscriptions/managed` | 列出自定义 User-Agent 的订阅 |
| `POST` | `/subscriptions/managed/prepare` | 按草稿下载并校验一条订阅，不激活 |

`/subscriptions/nodes` 返回 `sources` 数组，每个来源有 `tag`、`cachedAt` 和 `nodes`。节点只有 `name`、`protocol`、`host` 和同名数量 `matches`，不含链接、密码或 UUID。单个缓存损坏或超限时，该来源带 `problem`，不影响其他来源。

`prepare` 请求体：

```json
{ "tag": "my-sub", "url": "https://example.com/sub", "userAgent": "clash-verge/v2" }
```

成功时返回订阅条目，其中 `localUrl` 是写入配置用的 `file://managed.d/...` 地址。订阅要在保存配置时通过 `managedSubscriptions` 字段一起提交才会生效。下载失败返回 `502 managed_subscription_prepare_failed`。

## dae 版本管理

显式设置 `KDAE_PANEL_ENABLE_DAE_INSTALL=false` 时，以下接口返回 `503 dae_install_disabled`。

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/dae/install` | 安装状态与当前任务 |
| `GET` | `/dae/versions?source=official\|kdae` | 上游与本地版本，`limit` 1–100，默认 30 |
| `GET` | `/dae/compatibility` | 读取预检任务 |
| `POST` | `/dae/compatibility` | 下载并预检某个版本，不替换当前二进制 |
| `POST` | `/dae/install` | 安装指定版本 |
| `DELETE` | `/dae/cache` | 删除本地缓存的版本 |
| `POST` | `/dae/rollback` | 回滚到上一版本 |
| `POST` | `/dae/uninstall` | 卸载 dae |

安装和预检请求体：

```json
{ "source": "kdae", "ref": "30187784287", "label": "d63a0c1" }
```

`source` 只接受 `official` 和 `kdae`。`ref` 对官方是发布 tag，对 kdae 是构建编号。版本管理任务同一时刻只能有一个，重复提交返回 `409 install_in_progress`。

**安装状态**中三个平台字段含义不同，不能互相替代：

| 字段 | 含义 |
|---|---|
| `architecture` | CPU 架构 |
| `preferredPlatform` | 本机首选的发布资产（兼容字段 `platform` 与它相同） |
| `managed.platform` | 实际安装的资产；旧记录没有该字段，`drifted` 为真时也不再可信，应显示为未知 |

机器上还没有 dae 时，响应带 `provision` 字段，说明首次安装是否可行、会写入哪些路径。任务进行中不返回该字段，客户端应沿用上一次的值。

**版本列表**额外带 `cached`、`cachedAt`、`cachedBytes`；只在本地存在的版本带 `cachedOnly`。

**删除缓存**请求体为 `{ "source": "official", "ref": "v2.0.0" }`。当前正在使用的版本返回 `409 cached_version_in_use`，不存在返回 `404 cached_version_not_found`。

**卸载**请求体可省略，默认都不删除：

```json
{ "purgeConfig": false, "purgeGeo": false }
```

### GitHub Token

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/settings/github` | 是否已配置 Token，以及来源（`panel` / `environment`） |
| `PUT` | `/settings/github` | 保存 `{"token":"..."}`，立即生效 |
| `DELETE` | `/settings/github` | 清除面板保存的 Token；由环境变量管理时返回 `409` |

响应只包含 `configured` 和 `source`，不会返回 Token 本身。

## Geo 数据

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/dae/geo` | 文件状态、可选来源与当前任务 |
| `POST` | `/dae/geo` | 更新到指定来源的最新版 |
| `POST` | `/dae/geo/residuals/cleanup` | 清理异常中断留下的暂存文件 |
| `POST` | `/dae/geo/residuals/restore` | 正式文件缺失时，从回滚点恢复 |
| `GET` | `/dae/geo/sources` | 列出自定义来源 |
| `POST` | `/dae/geo/sources` | 添加自定义来源 |
| `PUT` | `/dae/geo/sources/{id}` | 修改自定义来源 |
| `DELETE` | `/dae/geo/sources/{id}` | 删除自定义来源 |

更新请求体可省略，省略时使用 `status.defaultSource`（上次使用的来源）：

```json
{ "source": "loyalsoldier" }
```

`source` 可以是 `loyalsoldier`、`v2fly` 或 `custom:<id>`，未知来源返回 `400 invalid_geo_source`。Geo 任务同一时刻只能有一个，重复提交返回 `409 geo_update_in_progress`。

`GET` 响应中：

- `status.sources`：可选来源；`status.searchPath`：dae 的查找顺序；
- 每个文件的实际路径、大小、写入位置 `targetPath`，以及被遮蔽的副本 `shadowed`。两个文件可能在不同目录，以各自的 `targetPath` 为准；
- `status.residuals`：异常中断留下的文件。恢复请求体为 `{ "path": "..." }`。

自定义来源请求体包含 `label`、`geoipUrl`、`geoipSha256Url`、`geositeUrl`、`geositeSha256Url`，都必须是公网 HTTPS。数据文件上限 64 MiB，校验文件上限 64 KiB。正在使用的来源不能删除。

## 定时任务

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` / `PUT` | `/schedule/reload` | 订阅定时刷新 |
| `GET` / `PUT` | `/schedule/geo` | Geo 定时更新 |

两组接口格式相同：

```json
{ "enabled": true, "intervalMinutes": 1440 }
```

响应另带 `lastRunAt`、`lastError`、`nextRunAt`。间隔范围为 5 分钟到 30 天。

- 下一次执行时间按"上次执行 + 间隔"计算，重启面板或提交相同设置不会重置倒计时；停机期间错过的会在启动一分钟后补做。
- 订阅刷新就是执行一次 `dae reload`，因此之前用 `apply: false` 保存但未应用的配置也会随之生效。
- Geo 定时更新沿用上次使用的来源，不会自动切换。
- 拿不到控制锁时跳过这一轮，原因写入 `lastError`。

## 面板自升级

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/panel/update` | 新版本检查结果与自升级状态 |
| `POST` | `/panel/update/check` | 立即检查新版本 |
| `PUT` | `/panel/update/preference` | 保存自升级开关或更新通道 |
| `POST` | `/panel/update` | 执行自升级 |

- `check` 包含 `current`、`latest`、`updateAvailable`、`checkedAt`，失败时带 `error`。成功结果缓存 6 小时，失败缓存 15 分钟；手动检查有 1 分钟冷却。dev 构建和 `KDAE_PANEL_DISABLE_UPDATE_CHECK=true` 时不检查。
- `preference` 接受 `{"enabled": true|false}` 或 `{"channel": "stable"|"preview"}`。`preview` 通道包含预发布版本。
- 执行升级可选 `{"version": "v2.0.1"}`，省略时使用检查到的最新版。自升级关闭时返回 `409 panel_self_update_disabled`。

## 网络探测

| 方法 | 路径 | 说明 |
|---|---|---|
| `POST` | `/net/latency` | 探测节点主机延迟 |

```json
{
  "targets": [{ "host": "hk.example.com", "port": 443 }],
  "maxAgeSeconds": 300
}
```

```json
{
  "results": [
    {
      "host": "hk.example.com",
      "port": 443,
      "reachable": true,
      "latencyMs": 42.7,
      "resolvedIp": "203.0.113.8",
      "method": "icmp",
      "probedAt": "2026-09-17T08:00:00Z",
      "cached": true
    }
  ]
}
```

- 公网地址用 ICMP，内网地址用 TCP，`method` 标明实际方式。延迟不含域名解析时间。
- `maxAgeSeconds`（1–86400）可选：有足够新的缓存结果时直接复用，响应带 `cached: true`。省略时每次都真实测量。
- 单次最多 64 个目标，每个目标最多 4 秒，全局最多 16 个并发。
- 单个目标无效只影响该条结果（`reachable: false` 并带 `error`）；目标列表为空或超过 64 个返回 `400`。

## 服务、日志与诊断

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/service` | systemd 状态与资源数据 |
| `POST` | `/service/actions/start` | 启动 dae，并设为开机自启 |
| `POST` | `/service/actions/stop` | 停止 dae，并取消开机自启 |
| `POST` | `/service/actions/restart` | 重启 dae |
| `POST` | `/service/actions/reload` | 重载 dae；未运行时返回延后状态 |
| `POST` | `/service/actions/suspend` | 暂停 dae |
| `GET` | `/logs?limit=200` | 最近 1–500 条 journald 日志 |
| `GET` | `/host/interfaces` | 本机网络接口与地址 |
| `GET` | `/diagnostics/report` | 故障诊断报告 |
| `GET` | `/diagnostics/sysdump` | 导出 dae sysdump 归档 |

动作名和参数由服务端白名单决定，请求内容不能注入额外的命令参数。

诊断报告中每个检查项有 `level`（`ok` / `warning` / `error` / `unknown`）、摘要、详情和可选建议。单项检查失败只会让该项为 `unknown`，不会让整个报告失败。

## 连接活动

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/connections` | 连接建立流水、聚合、曲线与 socket 快照 |
| `GET` | `/connections/snapshot` | 只返回 socket 快照，供页面每秒轮询 |

`/connections` 的查询参数：

| 参数 | 范围 | 默认 |
|---|---|---|
| `limit` | 明细条数 1–2000 | 500 |
| `window` | 时间窗 1–1440 分钟 | 15 |
| `buckets` | 曲线桶数 1–240 | 60 |

响应字段分两类来源：

| 字段 | 来源 | 含义 |
|---|---|---|
| `entries` | journald | 连接建立明细：源、目的、域名、出站、节点、策略、进程、MAC |
| `facets.targets` / `nodes` / `groups` / `clients` | journald | 时间窗内按目标、节点、出站组、客户端聚合的连接数；客户端有有效 MAC 时按 MAC 合并 |
| `series` | journald | 等长时间桶（`at`、`count`），空桶保留 |
| `seriesSince` | journald | 面板开始有数据的时刻，更早的桶表示"不知道"；整个窗口都没有数据时省略 |
| `summary.windowEvents` / `windowClients` / `windowTargets` | journald | 时间窗内的事件、客户端、目标数 |
| `endpoints` | procfs | 采样窗口内 dae 的 ESTABLISHED TCP 远端 `address` 与 `count` |
| `summary.outboundTcp` / `udpSockets` | procfs | 最近一次采样的 TCP / UDP socket 数 |
| `summary.sampledTcpPeak` / `sampledUdpPeak` | procfs | `socketWindowSeconds` 秒内采样到的峰值 |

状态字段：

| 字段 | 含义 |
|---|---|
| `logsOk` / `snapshotOk` | 两个来源是否可用，一边失败不影响另一边 |
| `serviceRunning` | 区分"dae 未运行"和"运行中但没采到" |
| `logLevel` | 当前配置的日志级别，读取失败时省略 |
| `requiredLogLevel` | 当前 dae 版本输出连接流水所需的最低级别：`info` 或 `debug` |
| `truncated` | 明细或端点不完整 |
| `facetLimited` | 某个聚合维度超过 200 项被截断 |
| `dropped` | 无法解析的连接日志行数 |

`/connections/snapshot` 只返回 `snapshotAt`、`snapshotOk`、`serviceRunning`、`socketWindowSeconds`、`truncated`、`summary`（仅 socket 部分）和 `endpoints`。

**如何解读**：socket 数为零只表示这次采样没有命中，不代表没有流量。直连流量可能完全不产生 dae 的 socket，两次采样之间的短连接也看不到。API 不提供逐条连接的存活状态。原因见 [架构文档](architecture.md#连接活动)。

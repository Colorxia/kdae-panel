# 安装部署与升级

## 前置条件

- Linux 与 systemd；
- 已安装并能够通过 `systemctl status dae` 正常运行的 dae；
- `/etc/dae/config.dae` 是实际入口配置；
- 构建阶段需要 Go 1.25.12+ 和 Node.js 22+；
- 运行阶段不需要 Node.js。

## 从源码安装

```bash
git clone https://github.com/tuoro/kdae-panel.git
cd kdae-panel
npm ci --prefix web
make build
sudo ./scripts/install.sh
```

安装内容：

```text
/usr/bin/kdae-panel
/etc/kdae-panel/kdae-panel.env
/etc/systemd/system/kdae-panel.service
/var/lib/kdae-panel/panel.db
/var/lib/kdae-panel/backups/
```

安装脚本不会覆盖现有 `/etc/kdae-panel/kdae-panel.env`，也不会修改 dae 配置。

## 配置项

编辑 `/etc/kdae-panel/kdae-panel.env` 后执行：

```bash
sudo systemctl restart kdae-panel
```

| 环境变量 | 默认值 | 说明 |
|---|---|---|
| `KDAE_PANEL_LISTEN` | `127.0.0.1:2023` | HTTP 监听地址 |
| `KDAE_PANEL_BOOTSTRAP_TOKEN` | 空 | 一次性初始化链接的根凭证；留空时启动自动生成并仅写入服务日志中的 `setup_url` |
| `KDAE_PANEL_TRUSTED_PROXIES` | `127.0.0.0/8,::1/128` | 可以转发客户端地址和协议的代理 CIDR，逗号分隔 |
| `KDAE_PANEL_DAE_BINARY` | `/usr/bin/dae` | dae 二进制路径 |
| `KDAE_PANEL_DAE_CONFIG` | `/etc/dae/config.dae` | dae 入口配置 |
| `KDAE_PANEL_SERVICE_NAME` | `dae` | systemd 单元名 |
| `KDAE_PANEL_SYSTEMCTL` | `/usr/bin/systemctl` | systemctl 路径 |
| `KDAE_PANEL_JOURNALCTL` | `/usr/bin/journalctl` | journalctl 路径 |
| `KDAE_PANEL_DATABASE` | `/var/lib/kdae-panel/panel.db` | 认证数据库 |
| `KDAE_PANEL_BACKUP_DIR` | `/var/lib/kdae-panel/backups` | 配置备份目录 |
| `KDAE_PANEL_SCHEDULE_FILE` | `/var/lib/kdae-panel/schedule.json` | 订阅自动刷新的设置与上次执行时间 |
| `KDAE_PANEL_INSTALL_STATE_FILE` | `/var/lib/kdae-panel/dae-install.json` | dae 版本安装记录，同前缀下还存放回滚用的上一版二进制 |
| `KDAE_PANEL_ENABLE_DAE_INSTALL` | `false` | 允许通过面板安装与切换 dae 版本，开启后还需放宽单元的 `ReadWritePaths` |
| `KDAE_PANEL_SESSION_TTL` | `12h` | 会话绝对有效期 |
| `KDAE_PANEL_SECURE_COOKIE` | `false` | Cookie 是否仅允许 HTTPS |

### 启用 dae 版本管理

该功能默认关闭。开启需要两步，缺一不可：

```bash
# 1. 把 env 文件里已有的那一行改为 true（不要追加，否则会出现两行同名变量）
sed -i 's/^KDAE_PANEL_ENABLE_DAE_INSTALL=.*/KDAE_PANEL_ENABLE_DAE_INSTALL=true/' \
  /etc/kdae-panel/kdae-panel.env

# 2. 让面板能写入 dae 可执行文件所在目录（以服务实际启动的路径为准）
systemctl show dae --property=ExecStart
systemctl edit kdae-panel    # 追加 ReadWritePaths=/usr/local/bin

systemctl restart kdae-panel
```

第二步的目录通常在 root 的 `PATH` 上，开放它意味着面板的任何缺陷都可能升级为命令劫持。只在确实需要通过面板管理 dae 版本时才开启；只读部署或用包管理器维护 dae 的场景应保持关闭。

**若还想用面板完成 dae 的首次安装**，再加一个目录，让面板能写入服务单元：

```bash
systemctl edit kdae-panel    # 追加 ReadWritePaths=/etc/systemd/system
systemctl restart kdae-panel
```

这一条的代价更大：能写 `/etc/systemd/system` 就等于能定义以 root 运行的服务。面板在动手前会逐个探测这些目录是否真的可写，缺哪个会在界面上直接说明，不会在中途失败。

首次安装会写入可执行文件、geo 数据、服务单元，以及一份不劫持任何流量的种子配置（仅在配置不存在时）。**它不会自动启动 dae**——请先在配置管理页写好规则再手动启动，否则透明代理可能切断你当前的连接。已存在的服务单元与配置一律不覆盖。

只想升级已有的 dae 时不需要这一步。若你更习惯官方工具，[dae-installer](https://github.com/daeuniverse/dae-installer) 依然可用，两者互不冲突。

`setup_url` 默认使用面板的直接监听地址。通过 HTTPS 反向代理访问时，保留 `/setup#bootstrap=...` 部分，并将其协议和主机替换为实际面板地址；URL 片段不会发送给反向代理或写入访问日志。

## HTTPS

不建议直接将面板的 HTTP 端口暴露到公网。保持监听回环地址，并使用反向代理提供 TLS。

Nginx 示例：

```nginx
server {
    listen 443 ssl http2;
    server_name panel.example.com;

    ssl_certificate     /etc/letsencrypt/live/panel.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/panel.example.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:2023;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto https;
    }
}
```

面板只接受可信代理 CIDR 转发的地址和协议。可信代理报告 HTTPS 时，Cookie 会自动增加 `Secure` 并发送 HSTS；仍建议显式设置：

```bash
KDAE_PANEL_SECURE_COOKIE=true
```

面板的同源检查同时比较浏览器 `Origin` 的协议和主机，因此反向代理必须传递原始 Host 和正确的 `X-Forwarded-Proto`。不要信任公网来源的转发头。

## 权限模型

当前 systemd 单元以 root 运行，因为面板需要同时完成以下操作：

- 原子写入 `/etc/dae`；
- 向 dae 进程发送重载或暂停信号；
- 通过 systemd 启停服务；
- 读取系统日志和 sysdump。

单元通过 `ProtectSystem`、`ProtectHome`、`NoNewPrivileges`、能力白名单、地址族限制和只读系统路径降低暴露面。默认只保留 `CAP_KILL`、`CAP_NET_ADMIN`，可写路径仅为 `/etc/dae` 和 `/var/lib/kdae-panel`；`/run` 只读即可连接 systemd socket 并读取 dae 状态文件。`ProtectProc=invisible` 会隐藏其他进程，但保留 `/proc/sys/net`，供 dae sysdump 采集 sysctl。不要移除登录认证后对外开放，也不要让其他用户写入环境文件、数据库或面板二进制。

## 升级面板

```bash
git pull --ff-only
npm ci --prefix web
make build
sudo ./scripts/install.sh
```

数据库使用向前兼容的幂等迁移；安装脚本保留现有账户和环境配置。

## 升级 dae

建议先下载新二进制到临时位置：

```bash
/tmp/dae-new --version
sudo /tmp/dae-new validate -c /etc/dae/config.dae
```

校验通过后再替换 dae 并重启：

```bash
sudo install -m0755 /tmp/dae-new /usr/bin/dae
sudo systemctl restart dae
```

刷新面板后，它会重新执行 `--help` 和 `export outline`，自动读取新版本能力。生产环境仍应保留旧二进制，以便遇到上游破坏性变化时回滚。

正式发布包会附带 SHA-256 清单和 GitHub OIDC 来源证明，可使用 `gh attestation verify <归档> --repo tuoro/kdae-panel` 验证归档确实由仓库发布流程生成。

## 卸载

```bash
sudo ./scripts/uninstall.sh
```

卸载脚本保留 `/etc/kdae-panel` 和 `/var/lib/kdae-panel`。确认不再需要账户和备份后再手工删除。

## 排障

```bash
systemctl status kdae-panel
journalctl -u kdae-panel -n 200 --no-pager
curl http://127.0.0.1:2023/api/v1/health
/usr/bin/dae export outline
/usr/bin/dae validate -c /etc/dae/config.dae
```

若服务操作返回权限错误，先执行：

```bash
systemd-analyze security kdae-panel.service
systemctl cat kdae-panel.service
```

某些发行版或自定义 dae 可能需要调整 systemd 单元的能力白名单；修改前应明确缺失的具体系统调用或能力，避免直接移除所有沙箱设置。

# 安装部署与升级

## 前置条件

- Linux 与 systemd；
- 已安装并能够通过 `systemctl status dae` 正常运行的 dae——若这台机器上还没有 dae，可以启用下面的 dae 版本管理，由面板完成首次安装；
- `/etc/dae/config.dae` 是实际入口配置（首次安装时由面板写入不劫持流量的种子配置）；
- 构建阶段需要 Go 1.25.12+ 和 Node.js 22+；
- 运行阶段不需要 Node.js。

## 一键部署

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/tuoro/kdae-panel/main/scripts/get.sh)"
```

脚本按 `uname -m` 选择发布资产（amd64 / arm64 / riscv64），从 GitHub Release 的 latest 直链下载、比对 `SHA256SUMS` 后运行包内的 `install.sh`，效果与源码安装完全一致。设置 `KDAE_PANEL_VERSION=v0.1.0` 可固定版本。

三点如实说明：

- **信任边界**：`curl | bash` 等于信任本仓库与 GitHub。校验和与发布包由同一个发布者签出、放在同一个 Release，防的是传输损坏与不完整下载，防不住发布者本身。发布包另附 GitHub OIDC 来源证明，可用 `gh attestation verify kdae-panel_linux_<arch>.tar.gz --repo tuoro/kdae-panel` 进一步确认归档确实由本仓库的发布流程构建——它不依赖与包同源的清单，防得住"资产被事后替换"，仍防不住发布者提交的代码本身。
- **网络前提**：`raw.githubusercontent.com` 与 `github.com` 都必须可达。无法直连时，请在能访问的机器上手动下载 `kdae-panel_linux_<arch>.tar.gz` 与 `SHA256SUMS` 两个文件，核对通过后拷到目标机器解压，运行包内 `install.sh`。核对命令：

  ```bash
  # SHA256SUMS 列有全部三个架构；只下载了一个包时必须加 --ignore-missing，
  # 否则会因另两个文件不存在而报错。预期恰好输出一行 "…tar.gz: OK"。
  sha256sum -c --ignore-missing SHA256SUMS
  ```

- **可重复执行**：脚本可用于升级——`install.sh` 会覆盖二进制与服务单元并重启面板，但不覆盖已有的 `/etc/kdae-panel/kdae-panel.env`。

安装完成后的访问方式见下方「首次访问」。

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

## 首次访问

面板默认只监听 `127.0.0.1:2023`。从其他机器访问请先建立 SSH 端口转发：

```bash
ssh -L 2023:127.0.0.1:2023 root@router.example
```

然后打开 `http://127.0.0.1:2023`。首次启动会在服务日志里生成一次性初始化链接：

```bash
sudo journalctl -u kdae-panel -n 20 --no-pager
```

找到 `setup_url` 并打开，页面会自动完成授权，注册表单只需填写用户名和密码。创建管理员后初始化接口永久关闭。

`setup_url` 默认使用面板的直接监听地址。通过 HTTPS 反向代理访问时，保留 `/setup#bootstrap=...` 部分，并将其协议和主机替换为实际面板地址；URL 片段不会发送给反向代理或写入访问日志。

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
| `KDAE_PANEL_GEO_STATE_FILE` | `/var/lib/kdae-panel/geo-update.json` | geo 数据更新记录 |
| `KDAE_PANEL_GEO_SCHEDULE_FILE` | `/var/lib/kdae-panel/geo-schedule.json` | geo 自动更新的设置与上次执行时间 |
| `KDAE_PANEL_ENABLE_GEO_UPDATE` | `false` | 允许一键更新 geo 数据，与上一项相互独立 |
| `KDAE_PANEL_DISABLE_UPDATE_CHECK` | `false` | 关闭面板自身的新版本检查（检查只读取本仓库 releases/latest 的 tag，结果缓存 6 小时） |
| `KDAE_PANEL_ENABLE_SELF_UPDATE` | `false` | 允许面板一键升级自身，需放宽 `ReadWritePaths` |
| `KDAE_PANEL_BACKUP_FILE` | `/var/lib/kdae-panel/kdae-panel.previous` | 自升级保留的上一版面板二进制 |
| `KDAE_PANEL_SESSION_TTL` | `12h` | 会话绝对有效期 |
| `KDAE_PANEL_SECURE_COOKIE` | `false` | Cookie 是否仅允许 HTTPS |

### 启用 dae 版本管理

该功能默认关闭。开启需要两步，缺一不可：

```bash
# 1. 把 env 文件里那一行改为 true。
#    升级安装的 env 文件可能还没有这一行，此时 sed 是静默空操作——
#    因此有则改、无则追加，最后数一遍确认只有一行（两行同名变量时后一行生效，很难排查）。
env_file=/etc/kdae-panel/kdae-panel.env
if grep -q '^KDAE_PANEL_ENABLE_DAE_INSTALL=' "$env_file"; then
  sed -i 's/^KDAE_PANEL_ENABLE_DAE_INSTALL=.*/KDAE_PANEL_ENABLE_DAE_INSTALL=true/' "$env_file"
else
  echo 'KDAE_PANEL_ENABLE_DAE_INSTALL=true' >> "$env_file"
fi
grep -c '^KDAE_PANEL_ENABLE_DAE_INSTALL=' "$env_file"   # 必须输出 1

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

### 启用面板一键自升级

**又一个独立开关**，与上面两个互不影响。开启后，界面顶部的新版本横幅会多出一个「立即升级」按钮：面板下载发布包、比对 `SHA256SUMS`、用新二进制自证能在本机运行，然后替换自己并请求 systemd 重启。

```bash
env_file=/etc/kdae-panel/kdae-panel.env
if grep -q '^KDAE_PANEL_ENABLE_SELF_UPDATE=' "$env_file"; then
  sed -i 's/^KDAE_PANEL_ENABLE_SELF_UPDATE=.*/KDAE_PANEL_ENABLE_SELF_UPDATE=true/' "$env_file"
else
  echo 'KDAE_PANEL_ENABLE_SELF_UPDATE=true' >> "$env_file"
fi

# 让面板能写入自己所在的目录
systemctl edit kdae-panel    # 追加 ReadWritePaths=/usr/bin
systemctl restart kdae-panel
```

**这个开关的代价要说透**：它让面板能改写自己的可执行文件，因此面板本身的任何可利用缺陷都能被写成持久化的任意代码——严重程度不低于 dae 版本管理。不开也完全够用：新版本提醒始终可用，在服务器上重跑一次一键部署命令即可升级，配置与账号数据同样保留。

**没有自动回滚。** 被替换、被重启的是当前进程自己，一旦 systemd 把它停掉就无从执行补救。风险因此前移：替换之前先运行新二进制的 `-version` 让它自证能在这台机器上跑起来，版本对不上或跑不起来就中止，原文件一个字节都不动。替换时把上一版复制到 `KDAE_PANEL_BACKUP_FILE`，万一新版本起不来：

```bash
install -m0755 /var/lib/kdae-panel/kdae-panel.previous /usr/bin/kdae-panel
systemctl restart kdae-panel
```

升级期间面板会短暂无法访问（通常几秒）。**dae 与代理流量完全不受影响**——面板只是管理界面，它的重启不碰 dae 的任何东西。

### 启用 geo 数据更新

这是**另一个独立开关**，不需要开启上面的 dae 版本管理：

```bash
env_file=/etc/kdae-panel/kdae-panel.env
if grep -q '^KDAE_PANEL_ENABLE_GEO_UPDATE=' "$env_file"; then
  sed -i 's/^KDAE_PANEL_ENABLE_GEO_UPDATE=.*/KDAE_PANEL_ENABLE_GEO_UPDATE=true/' "$env_file"
else
  echo 'KDAE_PANEL_ENABLE_GEO_UPDATE=true' >> "$env_file"
fi
systemctl restart kdae-panel
```

通常不需要额外放宽 `ReadWritePaths`：面板更新的是 dae **当前实际读取**的那份 geo，而它多半就在配置目录（已经可写）。若你的 geo 在 `/usr/local/share/dae`（例如用 `dae-installer` 装的），界面会明确提示该目录不可写以及要追加哪一条。

界面上可以在两个来源之间切换：

| 来源 | 仓库 | 适合谁 |
|---|---|---|
| Loyalsoldier 规则集 | `Loyalsoldier/v2ray-rules-dat` | 想要更细分类（`geosite:gfw`、`geosite:greatfire` 等）、每天更新 |
| v2fly 官方 | `v2fly/geoip` + `v2fly/domain-list-community` | 想与 dae 发布包保持同一套数据，切过去不会改变现有规则的含义 |

两点务必知悉：

- **切换来源会改变路由行为。** 两套规则集里同名分类所含的域名不同，切换后 `geosite:` 开头的路由规则匹配的范围会变，而 dae 不会因此报错。界面只在切换时警告，沿用同一来源不会反复打扰。
- **更新会触发 `dae reload`。** 新连接不受影响，但进行中的长连接（大文件下载、SSH、串流）最多约 10 秒后可能被断开。若 dae 不接受新数据，面板会自动还原旧文件并重新加载。

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

## 卸载

一键卸载（信任边界是一键部署的子集：只有 `raw.githubusercontent.com` 上 main 分支的脚本本身，不涉及 Release 资产，因此也没有校验和环节）：

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/tuoro/kdae-panel/main/scripts/uninstall.sh)"
```

安装时（无论一键部署还是源码安装）也会在本地落一份等效脚本，离线可用（早期安装的机器没有这份副本，重跑一次安装即可补上）：

```bash
sudo bash /usr/share/kdae-panel/uninstall.sh
```

源码检出还在的话，`sudo ./scripts/uninstall.sh` 同样等效。

默认保留 `/etc/kdae-panel` 与 `/var/lib/kdae-panel`（配置、账户数据库、配置备份、dae 回滚副本），确认不再需要后可用清除模式重跑。本地副本会随普通卸载一起移除，因此重跑要用一键命令（或源码检出）：

```bash
sudo KDAE_PANEL_PURGE=true bash -c "$(curl -fsSL https://raw.githubusercontent.com/tuoro/kdae-panel/main/scripts/uninstall.sh)"
```

清除模式会按 env 文件里配置的实际路径删除数据（数据库、订阅刷新、geo 更新与安装状态文件即使被挪到默认目录之外也会被找到），随后删除上述两个目录本身。唯一的例外是备份目录：它需要以 root 递归删除，取值又来自 env 配置，因此只有位于默认数据目录 `/var/lib/kdae-panel` 之内时才自动删，挪到别处的会打印路径请你确认后手工处理——env 里一个手滑的取值不该变成 root 下的 `rm -rf`。

**任何模式都不触碰 dae**：它的服务、二进制、`/etc/dae` 配置与 geo 数据原样保留；`/etc/dae` 下的 geo 文件（无论是面板首次安装写入还是自行放置的）也会留下（dae 还在用），脚本会把它们的位置与大小如实列出。清除模式删掉 env 文件后，重装会使用发布包内的默认配置——自定义过 env 的话请先自行备份一份。

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

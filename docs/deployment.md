# 部署、配置与升级

## 前置条件

- Linux 与 systemd；
- dae 可以不预先安装，面板的版本管理能完成首次安装；
- dae 入口配置为 `/etc/dae/config.dae`；
- 运行时不需要 Node.js。

## 一键部署

以 root 执行（普通发行版可先 `sudo -i`）：

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/Colorxia/kdae-panel/main/scripts/get.sh)"
```

脚本按 `uname -m` 选择 amd64 / arm64 / riscv64 发布包，核对 `SHA256SUMS` 后运行包内的 `install.sh`。

- 固定版本：在命令前加 `KDAE_PANEL_VERSION=vX.Y.Z`。
- 重复执行即可升级：会覆盖二进制和服务单元，不会覆盖已有的 `/etc/kdae-panel/kdae-panel.env`。

**信任边界**：这条命令等于信任本仓库和 GitHub。校验和与发布包放在同一个 Release 里，只能防传输损坏，防不了发布者本身。发布包另附 GitHub OIDC 来源证明，可用 `gh attestation verify kdae-panel_linux_<arch>.tar.gz --repo Colorxia/kdae-panel` 进一步确认归档确实由本仓库的发布流程构建。

### 手动下载安装

无法直连 GitHub，或不想直接执行远程脚本时：

1. 从 [Releases](https://github.com/Colorxia/kdae-panel/releases) 下载 `kdae-panel_linux_<arch>.tar.gz` 和 `SHA256SUMS`；
2. 核对校验和。清单里有全部架构，只下载一个包时必须加 `--ignore-missing`，正常输出恰好一行 `…tar.gz: OK`：

   ```bash
   sha256sum -c --ignore-missing SHA256SUMS
   ```

3. 解压后以 root 运行包内的 `install.sh`。

由 GitHub Actions 构建的发布包还可以验证来源证明，确认归档确实由本仓库的发布流程构建：

```bash
gh attestation verify kdae-panel_linux_<arch>.tar.gz --repo Colorxia/kdae-panel
```

## 从源码安装

需要 Go 1.26+ 和 Node.js 22+：

```bash
git clone https://github.com/Colorxia/kdae-panel.git
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
/usr/share/kdae-panel/uninstall.sh
/var/lib/kdae-panel/
```

安装脚本不会覆盖已有的 env 文件，也不会修改 dae 配置。

## 首次访问

面板默认监听 `0.0.0.0:2023`。安装结束时，终端会在「首次访问地址」下为每个内网 IPv4 打印一条一次性初始化链接，选当前设备能访问的那条打开，设置管理员用户名和密码即可。管理员创建后，初始化接口永久关闭。

通过反向代理访问时，保留链接里的 `/setup#bootstrap=...` 部分，把协议和主机换成实际地址。`#` 之后的片段不会发给代理，也不会进入访问日志。

从旧版本升级时，env 文件不会被覆盖。如果其中仍是 `KDAE_PANEL_LISTEN=127.0.0.1:2023`，需要手动改成 `0.0.0.0:2023` 才能从局域网访问。

## 配置项

编辑 `/etc/kdae-panel/kdae-panel.env` 后执行 `sudo systemctl restart kdae-panel`。

| 环境变量 | 默认值 | 说明 |
|---|---|---|
| `KDAE_PANEL_LISTEN` | `0.0.0.0:2023` | HTTP 监听地址 |
| `KDAE_PANEL_BOOTSTRAP_TOKEN` | 空 | 初始化链接的根凭证，留空时自动生成 |
| `KDAE_PANEL_SETUP_URL_FILE` | 空 | 把初始化链接写入该文件交给安装脚本；服务单元设为 `/run/kdae-panel/setup-url` |
| `KDAE_PANEL_TRUSTED_PROXIES` | `127.0.0.0/8,::1/128` | 允许转发客户端地址和协议的代理 CIDR |
| `KDAE_PANEL_DAE_BINARY` | `/usr/bin/dae` | dae 二进制 |
| `KDAE_PANEL_DAE_CONFIG` | `/etc/dae/config.dae` | dae 入口配置 |
| `KDAE_PANEL_SERVICE_NAME` | `dae` | dae 的 systemd 单元名 |
| `KDAE_PANEL_SYSTEMCTL` | `/usr/bin/systemctl` | systemctl 路径 |
| `KDAE_PANEL_JOURNALCTL` | `/usr/bin/journalctl` | journalctl 路径 |
| `KDAE_PANEL_DATABASE` | `/var/lib/kdae-panel/panel.db` | 账户与会话数据库 |
| `KDAE_PANEL_BACKUP_DIR` | `/var/lib/kdae-panel/backups` | 配置备份与存档 |
| `KDAE_PANEL_SCHEDULE_FILE` | `/var/lib/kdae-panel/schedule.json` | 订阅定时刷新设置 |
| `KDAE_PANEL_MANAGED_SUBSCRIPTIONS_FILE` | `/var/lib/kdae-panel/managed-subscriptions.json` | 自定义 User-Agent 订阅的原始地址，权限 `0600` |
| `KDAE_PANEL_INSTALL_STATE_FILE` | `/var/lib/kdae-panel/dae-install.json` | dae 安装记录；同目录存放回滚点和 `dae-versions/` 版本库 |
| `KDAE_PANEL_GITHUB_TOKEN_FILE` | `/var/lib/kdae-panel/github-token` | 设置页保存的 GitHub Token，权限 `0600` |
| `KDAE_PANEL_GITHUB_TOKEN` | 空 | GitHub Token；非空时优先于设置页，且不能在界面修改 |
| `KDAE_PANEL_ENABLE_DAE_INSTALL` | `true` | 允许通过面板安装、切换和卸载 dae |
| `KDAE_PANEL_GEO_STATE_FILE` | `/var/lib/kdae-panel/geo-update.json` | Geo 更新记录 |
| `KDAE_PANEL_GEO_SCHEDULE_FILE` | `/var/lib/kdae-panel/geo-schedule.json` | Geo 定时更新设置 |
| `KDAE_PANEL_GEO_SOURCES_FILE` | `/var/lib/kdae-panel/geo-sources.json` | 自定义 Geo 来源，权限 `0600` |
| `KDAE_PANEL_ENABLE_GEO_UPDATE` | `true` | 已废弃，仅为兼容旧配置保留；Geo 管理始终可用 |
| `KDAE_PANEL_DISABLE_UPDATE_CHECK` | `false` | 关闭面板新版本检查 |
| `KDAE_PANEL_ENABLE_SELF_UPDATE` | `true` | 一键自升级的初始值；在设置页改过之后以设置页为准 |
| `KDAE_PANEL_BACKUP_FILE` | `/var/lib/kdae-panel/kdae-panel.previous` | 自升级时保留的上一版面板 |
| `KDAE_PANEL_SESSION_TTL` | `12h` | 会话有效期 |
| `KDAE_PANEL_SECURE_COOKIE` | `false` | Cookie 仅允许 HTTPS |

## dae 版本管理

默认开启。服务单元已允许写 `/usr/bin` 和 `/etc/systemd/system`，可以直接完成首次安装和版本切换。dae 在其他目录时，先用 `systemctl show dae --property=ExecStart` 确认路径，再通过 `systemctl edit kdae-panel` 把该目录加入 `ReadWritePaths`。

**权限代价**：面板能改写 root 的可执行文件和服务单元，面板自身的缺陷就可能被利用成任意代码执行。不需要这个功能时，把 `KDAE_PANEL_ENABLE_DAE_INSTALL` 设为 `false`，并用 systemd drop-in 收紧写路径。

需要注意：

- **首次安装不会启动 dae。** 写好配置后请手动启动；否则透明代理可能切断你当前的连接。
- **在服务页启动或停止 dae，会同时设置开机自启**（`enable --now` / `disable --now`）。版本切换只恢复切换前的运行状态，不改开机设置。
- **dae 运行中时，切换版本会重启它**，正在进行的连接会断开。
- **卸载 dae 默认保留配置和 Geo 数据**，删除哪一类可以分别勾选。面板只卸载自己装的 dae：没有安装记录、二进制已被外部修改、或服务单元不在标准路径时，会拒绝卸载。
- **下载过的版本保存在 `dae-versions/`**，卸载 dae 时不会删除，可以在版本页逐个清理。

版本列表依赖 GitHub API。匿名调用每个出口 IP 每小时只有 60 次，共用公网 IP 或管理多台机器时，建议在「面板设置 → GitHub API」填写一个只读 Token。

## 面板自升级

默认开启，可在设置页随时开关。有新版本时，页面顶部会出现「立即升级」：面板下载发布包、核对校验和，用新二进制试运行确认可用，再替换自身并重启。升级期间面板会有几秒无法访问，**dae 和代理流量不受影响**。

**权限代价**：面板能改写自己的可执行文件。不接受时在设置页关闭，改为重新执行一键部署来升级。

**没有自动回滚。** 上一版保存在 `KDAE_PANEL_BACKUP_FILE`，新版本无法启动时手动还原：

```bash
rollback=$(sudo mktemp /usr/bin/.kdae-panel-rollback.XXXXXX)
trap 'sudo rm -f "$rollback"' EXIT
sudo install -m0755 /var/lib/kdae-panel/kdae-panel.previous "$rollback"
sudo mv -f "$rollback" /usr/bin/kdae-panel
trap - EXIT
sudo systemctl restart kdae-panel
```

自升级只替换二进制，不更新服务单元和脚本。更新日志提到这些文件有变化时，请重新执行一键部署。

## Geo 数据

内置两个来源：

| 来源 | 仓库 | 特点 |
|---|---|---|
| Loyalsoldier | `Loyalsoldier/v2ray-rules-dat` | 分类更细（如 `geosite:gfw`），每天更新 |
| v2fly | `v2fly/geoip`、`v2fly/domain-list-community` | 与 dae 发布包使用同一套数据 |

- **切换来源会改变路由行为**：同名分类包含的域名不同，dae 不会报错。
- **dae 运行时，更新会触发 reload**，长连接（下载、SSH、串流）可能在约 10 秒内断开。新数据不被接受时自动还原。
- 面板会找到 dae 实际读取的那份文件原位更新，通常不需要改权限。只有 `DAE_LOCATION_ASSET` 指向自定义目录时，需要把该目录加入 `ReadWritePaths`。
- 可以添加自定义来源，要求公网 HTTPS 直链并附 SHA-256 校验文件。

路由引用了数据里不存在的分类时，`dae validate` 会通过，但 dae 启动会失败。面板会在错误中指出缺失的分类，这时应更新或切换 Geo 来源，或修改路由规则；只切换 dae 版本解决不了。

## HTTPS 反向代理

不要把面板的 HTTP 端口直接暴露到公网。使用反向代理时，把监听地址改为回环：

```bash
KDAE_PANEL_LISTEN=127.0.0.1:2023
KDAE_PANEL_SECURE_COOKIE=true
```

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

反向代理必须传递原始 `Host` 和正确的 `X-Forwarded-Proto`，否则同源检查会拒绝请求。只有 `KDAE_PANEL_TRUSTED_PROXIES` 里的地址转发的这些头会被采信。

## 权限模型

面板以 root 运行，因为它要写 `/etc/dae`、向 dae 发送信号、通过 systemd 启停服务，并读取日志和 sysdump。服务单元用沙箱限制暴露面：

- `ProtectSystem=strict`、`ProtectHome`、`NoNewPrivileges` 等常规加固；
- capability 只保留 `CAP_KILL`（向 dae 发送 reload 信号）、`CAP_NET_ADMIN`（设置绕行 Mark）、`CAP_NET_RAW`（系统不允许普通 ping socket 时，ICMP 探测回退使用）；
- 可写路径：`/etc/dae`、`/var/lib/kdae-panel`、`/usr/bin`、`/etc/systemd/system`，以及存在时的 `/usr/local/share/dae`、`/usr/share/dae`。

`/usr/bin` 和 `/etc/systemd/system` 只供 dae 版本管理使用。关闭版本管理后可以收紧：在 drop-in 里先写一行空的 `ReadWritePaths=` 清空列表，再只加回需要的目录。

不要让其他用户写入 env 文件、数据库或面板二进制。

## 升级

**面板**：点页面顶部的「立即升级」，或重新执行一键部署。源码安装则：

```bash
git pull --ff-only
npm ci --prefix web
make build
sudo ./scripts/install.sh
```

数据库迁移向前兼容，升级会保留账户和 env 配置。

**dae**：在「dae 版本管理」页选择版本切换，失败会自动恢复。手动替换时，先用新二进制校验现有配置：

```bash
/tmp/dae-new --version
sudo /tmp/dae-new validate -c /etc/dae/config.dae
sudo install -m0755 /tmp/dae-new /usr/bin/dae
sudo systemctl restart dae
```

## 卸载

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/Colorxia/kdae-panel/main/scripts/uninstall.sh)"
```

离线时可以用安装时留下的副本：`sudo bash /usr/share/kdae-panel/uninstall.sh`。

- **默认**：移除程序、服务单元和它的 override，保留 `/etc/kdae-panel` 与 `/var/lib/kdae-panel`。
- **清除数据**：在命令前加 `KDAE_PANEL_PURGE=true`。普通卸载会删除本地副本，所以之后再清除数据要用联网命令：
  ```bash
  sudo KDAE_PANEL_PURGE=true bash -c "$(curl -fsSL https://raw.githubusercontent.com/Colorxia/kdae-panel/main/scripts/uninstall.sh)"
  ```
- 备份目录如果被改到 `/var/lib/kdae-panel` 之外，清除时不会自动删除，脚本会打印路径让你手动处理。
- **任何模式都不影响 dae**，它的服务、二进制、配置和 Geo 数据都保留。

## 排障

```bash
systemctl status kdae-panel
journalctl -u kdae-panel -n 200 --no-pager
curl http://127.0.0.1:2023/api/v1/health
/usr/bin/dae validate -c /etc/dae/config.dae
```

服务操作报权限错误时，先查看沙箱配置：

```bash
systemd-analyze security kdae-panel.service
systemctl cat kdae-panel.service
```

需要放宽时，先确认具体缺少哪项能力或路径，只放宽那一项，不要整体关闭沙箱。

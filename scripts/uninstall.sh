#!/usr/bin/env bash
set -euo pipefail

if [[ ${EUID} -ne 0 ]]; then
  echo "请使用 root 权限运行卸载脚本" >&2
  exit 1
fi

systemctl disable --now kdae-panel.service 2>/dev/null || true
rm -f /etc/systemd/system/kdae-panel.service /usr/bin/kdae-panel
systemctl daemon-reload

echo "程序与 systemd 单元已移除。dae 本身不受影响。"
echo "配置和账户数据仍保留在 /etc/kdae-panel 与 /var/lib/kdae-panel。"

# 状态文件路径可由 KDAE_PANEL_INSTALL_STATE_FILE 改写，先按 env 文件里的实际值找。
state_file=/var/lib/kdae-panel/dae-install.json
env_file=/etc/kdae-panel/kdae-panel.env
if [[ -f ${env_file} ]]; then
  configured=$(sed -n 's/^KDAE_PANEL_INSTALL_STATE_FILE=//p' "${env_file}" | tail -n1)
  [[ -n ${configured} ]] && state_file=${configured}
fi

for leftover in "${state_file}.previous-dae" "${state_file}.previous-dae.pending"; do
  if [[ -f ${leftover} ]]; then
    echo "其中包含用于回滚的 dae 副本 ${leftover}（$(du -h "${leftover}" | cut -f1)），不再需要时可一并删除。"
  fi
done

# 首次安装往配置目录写过 geo 数据，两个文件加起来有几十兆，卸载脚本不动它们
# （dae 还要用），但必须说清楚它们在哪，否则没人知道这些空间去了哪里。
for geo in /etc/dae/geoip.dat /etc/dae/geosite.dat; do
  if [[ -f ${geo} ]]; then
    echo "面板首次安装写入的 ${geo}（$(du -h "${geo}" | cut -f1)）仍保留，dae 仍在使用它。"
  fi
done

if [[ -f /usr/bin/dae ]] && [[ -f ${state_file} ]]; then
  echo "若 dae 本身也是由面板安装的，它仍在 /usr/bin/dae 并由 dae.service 管理，本脚本不会移除。"
fi


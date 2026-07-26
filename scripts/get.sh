#!/usr/bin/env bash
# kdae-panel 一键部署：下载最新发布包、校验 sha256、安装并启动。
#
#   bash -c "$(curl -fsSL https://raw.githubusercontent.com/tuoro/kdae-panel/main/scripts/get.sh)"
#
# 固定安装某个版本：
#   KDAE_PANEL_VERSION=v0.1.0 bash -c "$(curl -fsSL ...)"
#
# 信任边界必须说在前面：这条命令等于信任本仓库与 GitHub——SHA256SUMS 与发布包
# 在同一个 Release 里，由同一个发布者签出，校验防的是传输损坏与不完整下载，
# 防不住发布者本身。不接受这个前提的话，请改用 README 里的源码构建方式。
set -euo pipefail

repo="tuoro/kdae-panel"
version="${KDAE_PANEL_VERSION:-}"

# 在拼进 URL 之前拦住异常取值：含空格/换行会让 curl 直接报参数错误，
# 含斜杠则可能把下载路径改写到别处，两种情况的报错都离真正原因很远。
if [[ -n ${version} && ! ${version} =~ ^v[0-9A-Za-z._-]+$ ]]; then
  echo "KDAE_PANEL_VERSION 格式不正确：'${version}'" >&2
  echo "版本号需与发布 tag 完全一致，以 v 开头，如 KDAE_PANEL_VERSION=v0.1.0；不要包含空格或斜杠" >&2
  exit 1
fi

if [[ ${EUID} -ne 0 ]]; then
  echo "请以 root 权限运行：安装需要写入 /usr/bin 与 /etc/systemd/system" >&2
  exit 1
fi
if ! command -v systemctl >/dev/null 2>&1; then
  echo "未找到 systemctl：kdae-panel 依赖 systemd 管理 dae 服务" >&2
  exit 1
fi
for tool in curl tar sha256sum; do
  if ! command -v "${tool}" >/dev/null 2>&1; then
    echo "未找到 ${tool}，请先安装它（如 apt install curl tar coreutils）" >&2
    exit 1
  fi
done

# 架构名映射到发布资产的 GOARCH 命名。认不出就明说，绝不猜一个装上去。
machine=$(uname -m)
case "${machine}" in
x86_64 | amd64) arch="amd64" ;;
aarch64 | arm64) arch="arm64" ;;
riscv64) arch="riscv64" ;;
*)
  echo "不支持的 CPU 架构：${machine}（发布包只有 amd64 / arm64 / riscv64）" >&2
  exit 1
  ;;
esac

package="kdae-panel_linux_${arch}"
if [[ -z ${version} ]]; then
  # 只解析一次 latest 实际指向的 tag，随后两个文件都从这个固定版本下载。
  # 直接用 latest 直链拉两次的话，恰逢发布时 latest 可能在两次请求之间切换，
  # 拿到的包与校验和分属两个 release，校验会失败且报错指不到真正的原因。
  release_url=$(curl -fsSLI -o /dev/null -w '%{url_effective}' \
    --retry 3 --retry-delay 2 --connect-timeout 15 \
    "https://github.com/${repo}/releases/latest") || release_url=""
  if [[ ${release_url} != */releases/tag/* ]]; then
    echo "无法确定最新版本：仓库可能尚未发布任何版本（需要先推送 tag 触发发布流水线）。" >&2
    echo "也可用 KDAE_PANEL_VERSION=vX.Y.Z 指定版本，或按 docs/deployment.md 手动下载安装。" >&2
    exit 1
  fi
  version="${release_url##*/}"
fi
base_url="https://github.com/${repo}/releases/download/${version}"

workdir=$(mktemp -d)
trap 'rm -rf "${workdir}"' EXIT
cd "${workdir}"

echo "正在下载 ${package}.tar.gz（${version}）……"
fetch() {
  # --fail 让 404 变成明确失败而不是把错误页当文件存下来；
  # --retry 只重试网络层错误，不会把 404 重试三遍。
  curl -fL --retry 3 --retry-delay 2 --connect-timeout 15 -o "$1" "${base_url}/$1" || {
    echo "下载 ${base_url}/$1 失败。" >&2
    echo "若指定了 KDAE_PANEL_VERSION，请核对该 tag 确实存在（含 v 前缀）；" >&2
    echo "若新版本刚刚发布，资产可能仍在上传中，等一两分钟再试。" >&2
    echo "网络无法直连 GitHub 时，请在能访问的机器上手动下载发布包与 SHA256SUMS，" >&2
    echo "用 sha256sum -c 核对通过后再拷到本机运行包内的 install.sh（步骤见 docs/deployment.md）。" >&2
    exit 1
  }
}
fetch "${package}.tar.gz"
fetch "SHA256SUMS"

# 只核对本机要装的这一个资产。SHA256SUMS 里还列着其他架构的包，
# 直接整份 sha256sum -c 会因为那些文件不存在而失败。
expected=$(grep -E "[ /]${package}\.tar\.gz\$" SHA256SUMS || true)
if [[ -z ${expected} ]]; then
  echo "SHA256SUMS 里没有 ${package}.tar.gz 的条目，拒绝安装" >&2
  exit 1
fi
printf '%s  %s.tar.gz\n' "${expected%% *}" "${package}" | sha256sum -c - || {
  echo "sha256 校验失败：下载内容与发布的校验和不一致，已中止安装。" >&2
  echo "若怀疑是下载损坏可直接重试；反复失败请到 Release 页核对 SHA256SUMS。" >&2
  exit 1
}

tar -xzf "${package}.tar.gz"
echo "校验通过，开始安装……"
bash "${package}/install.sh"

#!/usr/bin/env bash
set -euo pipefail

repo_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
version=${1:-dev}
dist_dir="${repo_root}/dist"

rm -rf "${dist_dir}"
mkdir -p "${dist_dir}"

targets=(
  "amd64"
  "arm64"
  "riscv64"
)

# 资产名刻意不含版本号：一键部署走 releases/latest/download/<资产名> 直链，
# 它要求文件名可预知。若嵌入版本号，安装脚本就得先调 GitHub API 查最新版本，
# 在访问 GitHub 不稳的网络里平白多一次失败点。版本信息仍在二进制里
# （--version）与 Release 页的 tag 上，不会丢。
for arch in "${targets[@]}"; do
  package="kdae-panel_linux_${arch}"
  stage="${dist_dir}/${package}"
  mkdir -p "${stage}"

  CGO_ENABLED=0 GOOS=linux GOARCH="${arch}" go -C "${repo_root}" build \
    -trimpath \
    -ldflags "-s -w -X main.version=${version}" \
    -o "${stage}/kdae-panel" \
    ./cmd/kdae-panel
  # 显式设权限，不依赖 go build 的产物恰好带可执行位：在非 Linux 宿主上
  # 交叉打包时它不带，包内 install.sh 的 -x 探测会因此静默落空。
  chmod 0755 "${stage}/kdae-panel"

  install -m0644 "${repo_root}/packaging/kdae-panel.service" "${stage}/kdae-panel.service"
  install -m0600 "${repo_root}/packaging/kdae-panel.env" "${stage}/kdae-panel.env"
  install -m0755 "${repo_root}/scripts/install.sh" "${stage}/install.sh"
  install -m0755 "${repo_root}/scripts/uninstall.sh" "${stage}/uninstall.sh"
  install -m0644 "${repo_root}/LICENSE" "${stage}/LICENSE"
  install -m0644 "${repo_root}/README.md" "${stage}/README.md"

  tar -C "${dist_dir}" -czf "${dist_dir}/${package}.tar.gz" "${package}"
  rm -rf "${stage}"
done

(
  cd "${dist_dir}"
  sha256sum ./*.tar.gz > SHA256SUMS
)

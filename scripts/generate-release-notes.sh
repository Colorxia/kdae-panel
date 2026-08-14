#!/usr/bin/env bash
set -euo pipefail

repo_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
current_tag=${1:?"用法: generate-release-notes.sh <当前标签> <仓库 URL> [输出文件]"}
repository_url=${2:?"用法: generate-release-notes.sh <当前标签> <仓库 URL> [输出文件]"}
output_path=${3:-"${repo_root}/dist/RELEASE_NOTES.md"}

if [[ ! "${current_tag}" =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z][0-9A-Za-z.-]*)?$ ]]; then
  echo "不支持的发布标签: ${current_tag}" >&2
  exit 1
fi

if ! git -C "${repo_root}" rev-parse --verify --quiet "${current_tag}^{commit}" >/dev/null; then
  echo "发布标签不存在或未指向提交: ${current_tag}" >&2
  exit 1
fi

repository_url=${repository_url%/}
current_commit=$(git -C "${repo_root}" rev-list -n 1 "${current_tag}")

# RC 日志也从上一稳定版开始累计；正式版发布后清理 RC 标签不会改变比较基线。
previous_tag=$(
  git -C "${repo_root}" tag --merged "${current_commit}" |
    grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' |
    grep -vxF "${current_tag}" |
    sort -V |
    tail -n 1 || true
)

if [[ -n "${previous_tag}" ]]; then
  commit_range="${previous_tag}..${current_tag}"
else
  commit_range="${current_tag}"
fi

if [[ "${output_path}" != /* ]]; then
  output_path="${repo_root}/${output_path}"
fi
mkdir -p "$(dirname "${output_path}")"

temp_file=$(mktemp "${output_path}.XXXXXX")
trap 'rm -f "${temp_file}"' EXIT

{
  printf '## 更新内容\n\n'

  has_commits=false
  while IFS=$'\t' read -r commit subject; do
    [[ -n "${commit}" ]] || continue
    has_commits=true
    printf -- '- [`%s`](%s/commit/%s) %s\n' "${commit:0:7}" "${repository_url}" "${commit}" "${subject}"
  done < <(git -C "${repo_root}" log --no-merges --format='%H%x09%s' "${commit_range}")

  if [[ "${has_commits}" == false ]]; then
    printf -- '- 此版本没有新的非合并提交。\n'
  fi

  if [[ -n "${previous_tag}" ]]; then
    printf '\n**完整变更**：[%s...%s](%s/compare/%s...%s)\n' \
      "${previous_tag}" "${current_tag}" "${repository_url}" "${previous_tag}" "${current_tag}"
  else
    printf '\n**完整历史**：[%s](%s/commits/%s)\n' \
      "${current_tag}" "${repository_url}" "${current_tag}"
  fi
} >"${temp_file}"

mv "${temp_file}" "${output_path}"
trap - EXIT

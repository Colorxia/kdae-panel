# 开发与发布

## 环境

- Go 1.26+
- Node.js 22+

前端源码在 `web/`，构建产物提交在 `internal/webui/dist`，由 Go 二进制嵌入。**改了前端就要重新构建并提交 dist**，CI 会检查两者是否一致。

## 本地运行

```bash
npm ci --prefix web
make build            # 构建前端并编译 bin/kdae-panel
```

用本地数据目录运行：

```bash
go run ./cmd/kdae-panel \
  --database ./data/panel.db \
  --backup-dir ./data/backups \
  --schedule-file ./data/schedule.json \
  --dae-config ./data/config.dae
```

前后端分开调试时，Vite 会把 `/api` 代理到 `127.0.0.1:2023`：

```bash
go run ./cmd/kdae-panel --database ./data/panel.db --schedule-file ./data/schedule.json
npm run dev --prefix web
```

只改 Go 代码时可以用 `make build-go` 跳过前端构建。

## 检查

```bash
make test             # go test、go vet、前端类型检查与单元测试
make vuln             # govulncheck
```

改动前端依赖后，先 `rm -rf web/node_modules web/*.tsbuildinfo` 再 `npm ci --prefix web` 复验。`vue-tsc -b` 是增量构建，`npm install` 又不会删除已移除的包，两者叠加可能让本地类型检查用旧状态通过，到 CI 才失败。

`@types/katex` 在源码里搜不到引用，但 naive-ui 的类型定义依赖它，不能删。

## 端到端测试

e2e 用真实浏览器访问真实面板，`systemctl`、`dae`、`journalctl` 由桩程序代替。

```bash
go build -o e2e/bin/kdae-panel ./cmd/kdae-panel
go build -o e2e/bin/systemctl ./e2e/stubs/systemctl
go build -o e2e/bin/dae ./e2e/stubs/dae
go build -o e2e/bin/journalctl ./e2e/stubs/journalctl
cd e2e
npm ci
npx playwright install chromium
npm test
```

**e2e 不会自动重新构建面板。** 改了前端之后，要先重新构建 `web` 并重新执行上面第一条 `go build`，否则测试跑的仍是旧界面。

README 的截图由 e2e 生成：

```bash
UPDATE_README_SCREENSHOTS=true npm test
```

## 发布

推送 `vX.Y.Z` 标签即可发布，带连字符的标签（如 `v2.1.0-rc.1`）会发成预发布。发布流程会：

1. 确认标签指向的提交在 main 上已有成功的 CI，没有则直接失败；
2. 构建三个架构的发布包，生成更新日志和来源证明；
3. 自动验证发布资产，并在真实环境中安装、卸载。

提交信息带 `[skip ci]` 的提交在 main 上没有 CI 记录，不能直接打标签。

自升级与回滚的完整验证成本较高，需要手动触发：

```bash
gh workflow run release-smoke.yml -f version=vX.Y.Z -f deep=true
```

## 上游兼容检查

`kdae 上游兼容` 工作流不在 PR 上运行，只定时检查上游：

| 作业 | 频率 | 内容 |
|---|---|---|
| `discovery` | 每天 | 对真实上游列出版本、下载并解包，确认发布包命名、校验和格式与 geo 数据仍符合面板预期 |
| `contract` | 每周 | 构建 `olicesx/dae` 的 `kdae` 分支，用真实二进制验证 `--version`、`--help`、`export outline`、`validate` 和 `sysdump` |

本地运行 `discovery` 的检查：

```bash
KDAE_UPSTREAM_LIVE=1 KDAE_PANEL_GITHUB_TOKEN=<只读 token> \
  go test -count=1 -run '^TestLive' ./internal/upstream ./internal/geodata
```

不带 token 也能运行，但匿名调用 GitHub API 每小时只有 60 次，很容易被限流。

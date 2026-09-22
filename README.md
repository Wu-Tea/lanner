# Project Cognition

Project Cognition 希望帮助一线开发者以较低的管理成本组织人和 Agent 的工作：建立共同的项目认识，接续分散的任务，掌握相互影响，并依据实际结果判断进展。

仓库名为 `lanner`。当前 `dev` 分支维护 MVP 设计，尚无可安装产品。第一版先验证单个开发者跨任务、跨会话使用的效果，之后再扩展到多人协作。

## 阅读入口

| 要回答的问题 | 文档 |
| --- | --- |
| 为什么做，提供哪些能力，第一版做到哪里？ | [MVP](docs/MVP.md) |
| 一次具体开发变更会造成什么影响，我们怎样介入？ | [报表导出案例](docs/CASE.md) |
| 信息怎样组织，各项职责如何配合？ | [设计说明](docs/DESIGN.md) |
| 先验证什么，怎样判断有效且值得使用？ | [验证说明](docs/VALIDATION.md) |
| 当前进展与下一步是什么？ | [交接](.agent-context/handoff.md) |

Agent 的工作规则见 [AGENTS.md](AGENTS.md)，历史进展见 [session-log](.agent-context/session-log.md)。维护文档时优先更新现有内容，避免为每次讨论增加一套材料。

## 历史版本

完整设计、案例、Demo、调研和历史记录保存在 [archive/full-design-2026-09-22](https://github.com/Wu-Tea/lanner/tree/archive/full-design-2026-09-22)，对应提交 `91e89c629008897b84012aaed4fffd5eb4c6e15b`。

需要本地只读查阅时，可执行 `git show archive/full-design-2026-09-22:README.md`；切换整个工作区前先处理未提交修改。历史材料中的验证结果与确认范围按当时记录理解。

项目许可证与分发方式尚未确定，研究快照保留原来源与许可。

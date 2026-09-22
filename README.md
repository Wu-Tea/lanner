# Project Cognition

让人和 Agent 围绕同一个项目目标持续协作：理解项目、开展工作、协调变化、核验成果，并把经验留给后续参与者。

仓库：[Wu-Tea/lanner](https://github.com/Wu-Tea/lanner)。Project Cognition 为当前工作名称，`lanner` 为仓库名；正式品牌和发布形态尚未冻结。

## 它帮助解决什么

当几个人分别带着自己的 Agent 开发同一个项目时，一个任务的成功还不足以保证整体工作一致。新决定可能没有传到旧任务，两个任务可能依赖不同版本的接口，讨论也可能被误读成已经实施。

Project Cognition 希望让每个参与者都能知道：项目怎样工作、当前目标是什么、自己的任务依赖谁、发生了哪些相关变化、哪些成果有证据，以及下一步需要什么判断。单人跨会话工作也使用同一套能力。

## 从哪里开始

- 第一次接入：指定项目，调查并建立有来源的结构、功能、关键流程和未知项。
- 收到新资料：把需求、设计、反馈与项目模型关联，识别新增认识、冲突和影响。
- 开始或继续任务：理解目标、约束、相关知识、依赖和完成条件，Agent 自主执行。
- 工作发生变化：及时使用新决定、复用现有能力，记录实际结果和待解决问题。
- 查看一条工作线：跨任务与会话理解进展、决定、阻塞和下一动作，必要时进入来源。

会议形式用于理解活动目的；task、session、工作线和项目模块分别表达。manager 是协调职责，实际分派、承诺与风险接受遵循明确授权。

## 当前状态

2026-09-22 已完成从任务执行视角到项目协作视角的一轮设计重塑。当前是设计提案与验证准备，尚无可安装产品或实际多用户协调运行。

重塑前基线已上传：[8c7b2ff](https://github.com/Wu-Tea/lanner/commit/8c7b2ff22908e8b6afe8d5fbb0571b6f5288f77b)。历史记录和案例保留各自范围；私人 Word 提取图与浏览器临时缓存未上传。巡检 Demo 是独立案例，不能证明本产品已经实现。

## 按问题继续

| 当前问题 | 入口 |
| --- | --- |
| 整个产品要解决什么，能力怎样划分？ | [能力目标](docs/product/capability-goals.md) |
| 多个人和 Agent 如何推进同一项工作？ | [完整协作例子](docs/guides/cognition-flow.md) |
| 从项目管理借鉴了什么？ | [研究与取舍](docs/research/project-collaboration-foundations.md) |
| 先验证什么，怎样判断值得做？ | [MVP 与阶段计划](docs/product/mvp-spec.md) |
| 角色、task、session、tag、manager 怎样分工？ | [协作契约](docs/contracts/project-collaboration-contract.md) |
| 信息怎样流动，工具需要承担什么？ | [逻辑架构](docs/architecture/information-system-architecture.md) |
| 工作结果与长期知识怎样保持可靠？ | [结果契约](docs/contracts/agent-output-contract.md) · [长期知识](docs/contracts/base-knowledge-contract.md) · [知识语义](docs/contracts/knowledge-contract.md) |
| 人怎样读懂当前工作和项目？ | [资料契约](docs/contracts/visual-view-contract.md) · [信息归属](docs/contracts/projection-ownership-contract.md) |
| 哪些失败必须验证？ | [协作验收](docs/validation/collaboration-cases.md) · [既有能力回归](docs/validation/golden-cases.md) |
| 当前做到哪里？ | [交接](.agent-context/handoff.md) |

旧方案比较见[能力基线与候选](docs/research/capability-baseline-and-candidates.md)，既有材料按[案例规则](docs/cases/README.md)使用。历史草稿不作为实现规范。

## 发布与许可

当前公开的是设计仓库，不代表已有可安装版本。项目整体 License 尚未选择；引用和研究快照保留原来源与许可。

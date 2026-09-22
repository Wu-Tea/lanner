# DEC-2026-09-22-001：从任务执行治理扩展到项目协作

Status: accepted
Date: 2026-09-22
Confirmed by: 用户明确指出目标是解决整个项目协作，并授权先上传旧项目、再基于项目管理重塑全部思路；接受范围仅限该方向与工作授权
Related sessions: 2026-09-22，会议类型、六条能力路线、五个 POV 与项目协作讨论
Related files: README.md、AGENTS.md、docs/product/capability-goals.md、docs/product/mvp-spec.md、docs/contracts/project-collaboration-contract.md、docs/architecture/information-system-architecture.md、docs/validation/collaboration-cases.md
Supersedes: DEC-2026-09-03-003 将四项治理责任作为整个产品范围的限定；DEC-2026-09-07-001 的旧设计审阅下一动作被本次重塑工作替代。其余仍适用的自主执行、来源、确认、基线与证据要求保留
Superseded by: none

## Context

用户从对齐、讨论、复盘、追责、决策等会议目的出发，提出将 Agent 看作参与个体、session 看作可记录的工作载体，并由 manager 汇总业务线或工作线变化。前序讨论形成六条能力路线与五个 POV 的候选划分，未单独确认具体组件。

随后用户明确指出，原先只关注 taskworker，现在意识到整个目标是在解决项目协作，并允许重塑项目。新仓库为 `https://github.com/Wu-Tea/lanner.git`。

## Decision

1. 产品方向扩展为人和 Agent 的项目协作：覆盖共同项目认识、任务工作、跨会话变化和整体成果判断。
2. 本轮可以修改全部相关设计、规范、入口与项目上下文；先保存远端旧基线，再开始改写。
3. 已执行顺序：远端空仓库核对 → 本地初始提交 → 推送 main → 核对远端同 SHA → 建立重塑分支并修改。

上述为用户要求及已执行事实。六条能力、五个 POV、工作对象、manager 授权层次、首轮单项目小团队范围和具体状态均为 Agent 设计提案。用户的广泛修改授权不证明其接受了所有新细节，也不证明产品实现或效果。

## Reasons

单次任务正确无法覆盖不同参与者之间的目标、决定、依赖和知识变化。项目管理提供目标、责任、协调、成果与复盘的观察角度；需要结合当前产品的知识与证据基础重新组织。

## Alternatives and Tradeoffs

- 只增加 taskworker 的摘要能力：不足以表达跨任务依赖和共同决定。
- 把每次会话完全等同一场会议、只按 tag 聚合：会混淆任务边界、状态与跨模块影响；本轮提案保留活动类型及有依据的关系。
- 直接复制企业组织层级、部署五个常驻 Agent：当前无效果证据，增加执行和维护成本；本轮将 POV 作为责任视角。
- 立即构建自动排期、通知和人员管理系统：超出本轮“重塑思路”的具体交付需要；运行机制留待验证切片选择。

这些取舍属于 Agent 的设计建议，不作为用户逐项确认记录。

## Evidence

用户：“这个goal实际上是想要解决整个项目的协作问题”“基于项目管理的知识去重塑一下整个项目思路，我允许做一切变更”“但在操作之前，先给项目上传到这个新仓库中”。

重塑前提交：[8c7b2ff22908e8b6afe8d5fbb0571b6f5288f77b](https://github.com/Wu-Tea/lanner/commit/8c7b2ff22908e8b6afe8d5fbb0571b6f5288f77b)。远端 main SHA 经 `git ls-remote` 核对一致，共 314 个文件。未上传浏览器临时缓存与私人 Word 提取图，本地原件保留；基线按 Git 文本规范化保存，不主张所有文件逐字节备份。

项目管理来源与采用范围见[本轮研究](../../docs/research/project-collaboration-foundations.md)。视频未提供，不声称已观看。用户关于基层参与管理的判断保留为思路来源，不推导为 Agent 获得组织决策权。

## Consequences

当前进入协作设计重塑与验证准备。旧单任务目标成为新目标的回归基础；已确认知识语义、执行自主、人的取舍和证据边界继续使用。历史案例与 Demo 不被改写为新产品效果证据。

下一动作是审阅协作模型的完整例子与首个验证切片，选择实际来源、参与方式和运行边界。具体宿主、存储、身份、事件、权限与成本仍待证明。

## Review Triggers

真实协作显示职责划分无效或成本过高；任务/会话/工作线边界造成误用；manager 需要更广授权；用户改变目标或首轮范围；已有工具能够更省力地覆盖需求。

# 能力基线与候选资料

整理日期：2026-09-07。本文供方向与架构审阅使用。已核对的文件内容、作者自述、社区反馈和本项目的设计判断分别标明；没有安装、实测或确定采用下列候选。

## 1. 先用什么标准看资料

已有检索围绕方向、规范、交付、知识和人类理解展开。用户补充首次全项目扫描与直接建模后，资料评审按 [六项能力目标](../product/capability-goals.md) 组织；需要追加核对 PC-G0，不能以旧的五项资料覆盖推定首次建模也已覆盖。比较同时看使用和维护负担。

已有材料显示，Trellis、SPEC-AGENTS 等方案已经连接多项能力，project-memory 是连续性与知识维护的直接同类。不能因为它们没有使用本项目术语，就判断无法覆盖需求；目前也没有证据证明一个自建应用会更好。具体资料与原始链接见 [9 月 5 日市场调研](../../output/market-review-20260905/research-note.zh-CN.md)。

用户把 `agent-context-sync` 指定为新应用必须超过的基线。这是第一条验收线；之后仍应使用这些已有方案检查是否有更省力的实现方式。

## 2. agent-context-sync 的实际基线

### 已核对的内容

读取范围为本机正在使用的 `using-agent-context-sync/SKILL.md`、`agent-context-sync/SKILL.md` 及其上下文文件、SyncSet、reviewer 和 decision schema 说明。文件身份见 [本机基线清单](../../output/design-alignment-20260907/baseline-source-manifest.json)。主 Skill SHA-256 为 `669886b0c08f5b0b6eed20f1f83e06b1eee099eef5c1740cb6e12d109a34146a`。

| 已有能力 | 文件中明确表达的行为 | 新应用应保留的价值 |
| --- | --- | --- |
| 按需启动与项目接续 | 发现连续性线索后先读 handoff，再读相关决定和近期历史；一次性任务可以跳过 | 后续会话能够恢复当前工作，避免无关上下文开销 |
| 当前状态与长期理由分工 | handoff 放当前目标和下一动作，session-log 保留历史，decision 保存理由 | 当前工作容易找到，历史可追溯 |
| 推断与确认分开 | AI 推断不得记为用户确认；重要决定带来源和接受状态 | 防止 Agent 的解释变成未经确认的项目决定 |
| 写入计划与审查 | 写入前展示 SyncSet，检查来源、范围、敏感内容、体量和确认；已有明确写入授权可以适用 | 维护者掌握长期记录发生了什么变化 |
| 文件体量与隐私 | handoff 和历史有整理提示；不保存 secrets 或无关个人信息 | 记忆可维护，减少污染 |
| 有范围的交接 | 可准备限定任务和必要资料的 brief | 工作交给后续 Agent 时保留任务边界 |

上述是指令与模板的资料证据。它们能否稳定执行、实际节省多少工作，尚未做独立测量。其 reviewer 主要审查上下文写入；本次读到的协议没有定义所有项目交付都必须使用的结果验收契约。这一观察限定于上述文件，不能推广为“使用它的 Agent 不会核验结果”。

### 从基线向完整应用扩展

| 用户要解决的问题 | 当前基线提供的起点 | 新应用需要形成的稳定责任 |
| --- | --- | --- |
| 第一次接入，如何直接了解项目 | 缺少上下文时可依据仓库与当前对话恢复，并提出记忆初始化 | 独立的全项目调查、初始结构与行为模型、覆盖与未知说明；生成后能供人和 Agent 直接使用 |
| 这次究竟要做成什么 | 交接里的当前目标与下一动作 | 保留原请求，管理任务理解、完成条件和重要方向变化 |
| 结果是否可以接受 | 写入审查与已有 Agent/项目规范 | 把本次重要完成条件对应到产物、证据和未验证项 |
| 上次留下的知识还适用吗 | 决策、历史、状态与仓库冲突检查 | 跨任务知识的来源、范围、依赖变化、冲突与替代关系 |
| 我能理解项目并判断改动吗 | 可阅读的交接、历史和决策文件 | 围绕人的问题组织同源说明、关系、影响、未知与证据导航 |
| 日常使用能否更省心 | Agent 维护文件，SyncSet 展示更新 | 用户通过统一入口完成工作与判断，减少文件管理、重复解释和无价值确认 |

右栏是产品设计要求。当前文件说明不足以证明这些扩展一定能改善体验，更不能把预测的摩擦写成基线的实测缺陷。

## 3. 哪些现成材料可供各项职责使用

### 能承担多项职责的方案

| 候选 | 原始资料支持的范围 | 对架构的意义与待验证问题 |
| --- | --- | --- |
| [Trellis](https://github.com/mindfold-ai/Trellis) | 规范、任务需求与上下文、实现检查、经验回写 | 完整工作流程候选；需比较阶段与任务管理带来的收益和负担。资料详见 [官方首个任务说明](https://docs.trytrellis.app/start/install-and-first-task) |
| [SPEC-AGENTS](https://github.com/yibie/SPEC-AGENTS.md) | 项目概念与约束、任务契约、证据、长期知识演化 | 方向、结果与知识边界均有对应设计；可比较整体采用或有限适配，不能先假定只有零散能力 |
| [OpenSpec](https://openspec.dev/docs/skills) | 需求探索、提案、规格差异、实现、验证与归档 | 任务方向和规格管理候选；具体规则作用范围要依 [官方配置说明](https://openspec.dev/docs/project-config) 检查 |
| [Global Agent Memory](https://github.com/ozankasikci/global-agent-memory) | Markdown 知识、检索、候选审核、冲突、生命周期与人类阅读入口 | 知识与审核部分可直接比较现成实现；本次资料未建立 Windows 原生运行适用性 |
| [Basic Memory](https://docs.basicmemory.com/start-here/what-is-basic-memory) | 人与 Agent 共享 Markdown、关系、检索和上下文组装 | 检索和共享底座候选；分类与 Schema 校验不能自动代表用户确认 |

这组材料以 9 月 5 日已核对来源为基点，属于公开功能描述和设计参考，没有本项目运行结果。

### 已阅读具体指令的 Skill

| Skill 来源 | 可以参考的职责 | 适配前必须考虑的差异 |
| --- | --- | --- |
| [SPEC-AGENTS plan](https://github.com/yibie/SPEC-AGENTS.md/blob/5ccfd6a8ce009016f6ed76c5ca39a4bd529d95ed/.spec-agents/doctrine/skills/plan/SKILL.md) | 让任务目标、范围、相关项目约束与验证要求可以审阅 | 本项目保留普通任务的轻量路径，具体工作步骤交给 Agent |
| [project-memory](https://github.com/tasuku-9/project-memory-skill/blob/de8a47d555105eccfafa1e2f050f43c8de2d48ce/SKILL.md) | 当前事实、假设、决定、证据和恢复入口分工；按需要读取与更新 | 本项目已有资料落点，应避免重复建立一套目录；它同样以 Agent 遵守指令为基础 |
| [Superpowers verification-before-completion](https://github.com/obra/superpowers/blob/b36e0829c6d0140e93cfef2ca599b1b07d4a7797/skills/verification-before-completion/SKILL.md) | 完成声明必须有对应验证证据，测试通过与需求满足分别判断 | 逐条要求重新运行的规则需与证据适用性和成本协调；整套框架的其他流程不因引用此 Skill 而成为项目约束 |
| [technical-writer](https://github.com/riekelt/technical-writer/blob/099d31bc3fa1f82acc6bc196f2a9a7010607f66d/plugins/technical-writer/skills/technical-writing/SKILL.md) 与 [truth](https://github.com/riekelt/technical-writer/blob/099d31bc3fa1f82acc6bc196f2a9a7010607f66d/plugins/technical-writer/skills/technical-writing/references/truth.md) | 读者目的、来源、事实与提案区分、资料失效与单一事实归属 | 固定写作风格和画图工具属于上游选择；本项目按读者问题和实际理解效果选择表达 |

这四组资料的固定 revision、路径、SHA-256 和本地快照见 [上游文件清单](../../output/skill-adoption-20260907/upstream/files.json)。已保存其 MIT 许可文本；许可允许的范围与是否值得采用是两个判断。

此前写出的 [组合草稿](../../skills/project-cognition/SKILL.md) 只展示过一种可能的适配方式，已标为未采纳。当前没有组件选型结论，也没有 Skill 已经接入的声明。

新增 PC-G0 后，后续候选核对要追问：是否能从没有本工具记忆的仓库直接开始；是否调查整个项目并建立职责、关系和流程模型；是否保留覆盖、来源与未知；模型能否在后续任务更新。已有资料中的 init、adopt、memory 等名称不能单独证明这些结果，初始化一组文件也不能计为建模完成。本轮没有新增候选实测或完整功能审计。

### 需求与方法来源

- 美团的 [Agent 评测文章](https://tech.meituan.com/2026/08/07/Agent-Evaluation.html) 和 [AI Coding 实践文章](https://tech.meituan.com/2026/05/07/Agent-AI-Coding.html) 是已有评审与验证设计的输入，其对本项目的采用范围记录在 [DEC-2026-09-05-001](../../.agent-context/decisions/DEC-2026-09-05-001-staged-validation-and-evidence-review.md)。外部案例的结果不证明本项目有效。
- skills.sh 用于发现 Skill，GitHub 的实际文件用于核对行为；LINUX DO 和 Reddit 用于了解使用者提过什么问题。社区讨论已经包含规范失守、跨会话接续、文档负担和静默改变需求等需求；原帖与来源类型见 [已有调研](../../output/market-review-20260905/research-note.zh-CN.md#社区是否讨论过同样的需求)。社区推荐不作为质量证明。

## 4. Comparison Design

状态：供后续审阅的比较设计，本轮不运行。

### 比什么

| 场景 | 要观察的能力 | 同时记录的人工负担 |
| --- | --- | --- |
| 已有项目首次接入 | 无旧记忆完成全项目调查，形成有来源的初始模型与覆盖说明 | 从零开始介绍项目、调查等待、模型纠正、接纳与初次阅读 |
| 从零创建项目 | 形成目标与设计模型，随着实现出现保持意图、设计和事实的区别 | 澄清真实需求、作出取舍、核对实现差异 |
| 中断后换会话继续 | 找对目标、已确认决定、未完成项和下一动作 | 再次介绍背景、纠正错误记忆、等待定位资料 |
| 一个普通局部任务 | 方向与规范正确，交付可核验，流程保持轻量 | 启动、额外确认、收尾和记录维护 |
| 一次结构性 Design 交付 | 结果回答原问题，证据与结论范围匹配，关键取舍可判断 | 补充目标、纠偏、打开证据和复核 |
| 项目变化后的后续任务 | 正确复用、识别过期或冲突，推断未被冒充确认 | 重复解释、重新查证、修正与维护知识 |
| 人依据资料作维护判断 | 能找到行为、影响、未知、待决定事项并返回证据 | 找资料、阅读、术语澄清和来回定位 |

### 怎样保证比较公平

- 基线使用当前实际的 Agent、`agent-context-sync`、启动规则和项目约定；记录自定义部分，不能将已有能力从基线移除。
- 两边固定原始任务、源码 revision、可用来源、规范、权限和重要完成条件。系统组织资料的方式可以不同，但必须记录建立与更新资料的人工成本。
- 尽量使用相同模型与环境、独立上下文。无法控制的模型差异、已有答案和读者学习效应明确列出；必要时交错顺序或用难度相称的任务，不伪称严格因果实验。
- 在看结果之前确定每个任务的判据和实际观察方法。实现正确、模型自评、独立评审、知识接纳、真实用户反馈各有自己的状态。
- 记录人工补充、纠偏、查找、核验、知识整理和读者使用，以及可获得的总耗时与资源成本。缺失保持未记录，估算说明方法。

### 怎样判断方向值得继续

先检查基线已有的接续与权威边界有没有退步，再检查六项能力能否覆盖首次接入与持续工作，最后比较实际人工负担与使用意愿。首次建模和后续维护分别计入成本。功能增量如果伴随明显额外操作，应说明收益是否足够抵消，不能只报新增功能数量。

产品成功需要支持 [能力目标中的三条门槛](../product/capability-goals.md#4-怎样才算超过-agent-context-sync)。未达到时优先缩减流程、复用现成组件或修正交互；不以继续堆叠 Skill 代替问题诊断。单次对照只支持相应任务和条件下的结论，持续替代仍要观察后续任务。

这些观察与 [GC-013 后续复用](../validation/golden-cases.md#17-gc-013--reuse-knowledge-in-a-follow-up-task)、[GC-014 收益对照](../validation/golden-cases.md#18-gc-014--compare-benefit-and-added-work) 衔接，不新增本轮执行承诺。

## 5. 资料如何参与下一步选择

先审阅能力目标和逻辑架构，明确必须保留的日常体验。之后选择少量最有代表性的现成方案与当前基线比较，按真实差距决定整体复用、局部适配或自建范围。

每项采用结论应写清楚：对应目标、使用的版本、实际覆盖、已观察到的限制、新增成本和替换方式。当前这些结论全部待验证；已保存的源码和草稿是研究材料。

# 现成方案是否足以替代 Project Cognition 的自建部分

调研日期：2026-09-05。状态：外部资料核对与采用建议，尚未进行安装、真实任务比较或用户验收；不构成新的产品决策。

## 当前判断

已找到直接同类的需求讨论和实现。Trellis 已经连接需求、规范、任务上下文、检查和经验回写；SPEC-AGENTS v4 已经连接稳定项目模型、任务契约、证据和长期知识演化。不能再用“只有局部相似产品”概括现状。

现有资料足以支持把这些工具纳入实际替代方案，但不足以证明其中某个工具已经在本项目上完全有效，也不足以证明 Project Cognition 自建会更好。此前若把“不能完全覆盖”当作继续自建的依据，这个依据需要撤回。

比较应首先使用结果要求：任务方向能保持，适用规范能被使用，重要结论有证据，下一次工作能继承可靠知识，人能看懂重要决定。文件名、字段枚举、自研存储、投影方式和界面形式是实现选择；不能仅凭这些不同排除替代方案。

## 值得优先比较的方案

| 方案 | 已核对的具体能力 | 对本项目的意义 | 采用时的实际问题 |
| --- | --- | --- | --- |
| [Trellis](https://github.com/mindfold-ai/Trellis) | 项目规范、任务 PRD、实现与检查上下文、工作记录；实现后检查并将经验更新到规范 | 可以作为整套现成工作流程的替代基线 | 默认引入阶段、子 Agent 和任务管理；其收益需覆盖这些成本 |
| [SPEC-AGENTS v4](https://github.com/yibie/SPEC-AGENTS.md) | 稳定概念和约束、任务范围与验收、证据、长期知识及来源；小任务有短路径 | 与当前产品语义最接近的一组候选之一 | 自带六动作协议；安装说明使用 shell，当前 Windows 环境未验证 |
| [project-memory-skill](https://github.com/tasuku-9/project-memory-skill) | 区分事实、假设、计划、决策、研究证据、人类摘要和恢复入口；只更新职责发生变化的文件 | 是 agent-context-sync 的直接同类，也适合借用部分规则 | 仓库明确自述仍早期；这些主要是 Agent 执行的指令，不等于机器保证语义正确 |
| [Global Agent Memory](https://github.com/ozankasikci/global-agent-memory) | Canonical Markdown、项目范围检索、候选审核、冲突处理、生命周期；同一知识用于 MCP、Obsidian 和审核面板 | 已覆盖我们考虑自建的一批知识存储、审核和人类阅读功能 | README 的系统要求是 macOS/Linux；Windows 原生运行未证实，项目也较新 |
| [Basic Memory](https://docs.basicmemory.com/start-here/what-is-basic-memory) | 人和 Agent 读写同一套 Markdown，事实分类、知识关系、检索、上下文组装和 Schema 校验 | 若现有文件方案出现真实检索或跨工具共享问题，已有可选底座 | 分类标签和 Schema 并不自动等于用户确认；官方文档说明 Schema 校验警告而不阻止写入 |
| [OpenSpec](https://openspec.dev/docs/skills) | 需求探索、提案、规格差异、实现、验证报告和规格归档；项目可定制规则 | 可承担任务方向与规格管理，再与已有项目记忆配合 | 验证是可选的报告步骤；规则的注入范围要按文档配置，不能假定所有阶段都收到全部规则 |
| [Kiro](https://kiro.dev/docs/specs/) | 集成需求、设计、任务、验收条件、图示；配合 Steering 保存项目约定 | 想减少自行组装时，应把它作为成品环境候选 | 需要进入它的运行环境；规格和 Steering 的存在不能直接证明完整知识准入或长期维护效果 |

上表是资料覆盖和采用判断，不是质量评分，也没有以“未找到说明”推断工具绝对不具备某项能力。

## 几个会影响选择的细节

**Trellis 的接入与日常负担。** 官方安装文档明确列出 Windows 和 Codex；不同平台的自动注入能力存在差异，Codex 的部分 Hook 需要相应设置。当前文档还要求复杂工作创建任务前取得同意。这些是实际使用时需要观察的摩擦，尤其与本项目希望保持自然对话、减少不必要确认的偏好相关。[安装和首个任务](https://docs.trytrellis.app/start/install-and-first-task)、[平台差异](https://docs.trytrellis.app/advanced/multi-platform)。

**SPEC-AGENTS 已经表达了我们认为重要的知识边界。** 其 `learn` 指令分别记录观察、解释、建议、验证和来源；长期记录需要状态、范围、适用条件、证据和验证路径，替代或冲突时增加相应关系。`check` 要声明是否与实现处于同一上下文。因此不能把它归为仅仅“保存聊天摘要”的工具。[learn 源文件](https://github.com/yibie/SPEC-AGENTS.md/blob/main/.spec-agents/doctrine/skills/learn/SKILL.md)、[check 源文件](https://github.com/yibie/SPEC-AGENTS.md/blob/main/.spec-agents/doctrine/skills/check/SKILL.md)。

**公开实验的结论也有边界。** SPEC-AGENTS README 自述的一次 A/B 中两组都通过了相同验收，作者明确没有据此宣称 v4 带来因果质量优势。这是采用时应保留的证据边界，不能把流程完备等同于已验证更有效。[实验说明](https://github.com/yibie/SPEC-AGENTS.md#experiment-conclusions)。

**OpenSpec 可以定制，定制有具体作用范围。** `rules` 只进入对应资料的创建步骤，`operations` 用于 apply/archive；文档明确 verify 不接收 `rules`，它检查实现与已写资料的一致性。重要验收要求应写入实际被检查的资料，而非只放在某个生成提示中。[项目配置](https://openspec.dev/docs/project-config)。

**Basic Memory 可以省掉知识底座，但准入规则仍要明确。** 它提供分类、关系、可编辑文件和上下文组装；Schema 校验是提示式。是否需要机械阻止未经确认的长期知识写入，应由真实失败决定，不能仅为匹配本项目术语就重建整个存储层。[事实与关系](https://docs.basicmemory.com/concepts/observations-and-relations)。

**Superpowers 和 GSD 值得作为工作方法参考。** Superpowers 明确要求完成声明绑定新验证证据，并区分测试通过和需求满足；其整套流程还强调 TDD、细任务和子 Agent。GSD Core 采用讨论、计划、执行、验证和交付的阶段循环，并用文件保存跨会话状态。对本项目而言，是否整套采用要比较额外流程成本；单项规则已有直接参考。[Superpowers 验证 Skill](https://github.com/obra/superpowers/blob/main/skills/verification-before-completion/SKILL.md)、[GSD Core](https://github.com/open-gsd/gsd-core)。旧的 [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done) 已归档并指向当前仓库，不能拿旧入口代表现状。

## 社区是否讨论过同样的需求

- **直接的问题求助。** 2026-06-12 的 LINUX DO 帖子描述：项目变大后，已经写了规范，Agent 仍会跑偏；反复解释和读很多文档又有成本。回复提到 Trellis、OpenSpec 和本地文档。它证明类似痛点已被明确提出，回复的推荐本身不证明效果。[原帖](https://linux.do/t/topic/2386217)。
- **从连续性痛点发展出来的 Skill。** RecallLoom 作者公开描述跨 Agent、跨模型、跨会话的项目接力，并提供实际项目。帖子属于作者推广；可用来确认需求和方案存在，效果还要看使用证据。[社区介绍](https://linux.do/t/topic/2236517)、[项目源码和说明](https://github.com/Frappucc1no/recall-loom)。
- **用户报告并不一致。** Reddit 的 SDD 讨论中，既有 OpenSpec 使用者认可共享规格，也有使用者抱怨资料过多、难读难审；还有人明确担心代码和测试一起变化后，原规格被悄悄改变。该讨论非常接近本项目关心的“维护者是否仍掌握项目”。这些是个人报告，不能转成普遍收益数字。[讨论原帖](https://www.reddit.com/r/ClaudeCode/comments/1uno1bs/spec_driven_development/)。
- **常见 Skill 来源有对应应用。** skills.sh 收录的 Superpowers 中包括需求澄清、计划、调试、代码评审和完成前验证。仅搜索 memory 容易漏掉以 spec-driven development、project continuity、context engineering 或 harness 命名的方案。[Skill 目录](https://www.skills.sh/obra/superpowers)。

## 建议的采用顺序

1. **保留当前实际做法作为基线，先比较一个整套替代方案。** 第一候选是 Trellis；如果最关心知识边界和来源准入，再加入 SPEC-AGENTS。无需一次装入所有框架。
2. **若固定流程太重，比较小幅组合。** OpenSpec 处理当前变更；现有 agent-context-sync 处理连续性，参考 project-memory-skill 补事实、假设、证据和人类摘要。现有文件检索够用时，可以先不增加知识服务。
3. **出现真实检索和共享困难后，再比较知识底座。** Basic Memory 和 Global Agent Memory 都应先于自研存储、索引和审核面板进入试用。后者先解决本机平台适用性问题。
4. **以结果决定剩余自建范围。** 若现成方案完成任务、支持后续接力、让维护者理解关键理由，并且维护负担可接受，即便内部文件形式不同，也可视为满足实际需要。只对重复出现且无法通过轻量配置解决的差距考虑实现。

建议采用一个真实的三段任务：完成一项改动；换会话或模型做依赖前次知识的后续工作；让维护者依据留下的材料解释关键取舍与不能改坏的行为。比较目标命中、规范遗漏、证据可靠性、旧知识误用、用户纠正次数、阅读/维护时间和运行成本。这是待执行的比较建议，不是已完成的 Golden Run，也没有替换此前 proposed 的参考任务。

## 核对范围和材料

本次使用 skills.sh、GitHub、LINUX DO、Reddit 和产品官方文档。核对了候选 README，并对 project-memory、SPEC-AGENTS 的 check/learn、Superpowers 的 verification-before-completion 阅读了具体 Skill 指令。获取 GitHub 当前文件时使用了 Contents API，避免仅依赖搜索摘要中的旧版本。

本目录保存部分上游文件的检索快照；`primary-readmes.json` 和 `primary-rules.json` 包含来源 URL 与文件对象 SHA。这些外部 Skill 是研究材料，没有被安装或作为本工作区的执行指令。没有实测候选产品、比较模型输出，或进行完整代码审计。

当前采用建议标为分析判断。项目是否缩小自建范围、采用哪个工具、是否调整验证顺序，仍需结合试用结果与用户选择确定。

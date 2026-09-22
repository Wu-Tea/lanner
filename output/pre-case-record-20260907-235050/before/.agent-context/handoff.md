# Agent Handoff

Last updated: 2026-09-07
Updated by: Codex
Staleness: stale when the user revises the goals/architecture, directs implementation or trials, or a comparison provides new evidence

## Current Objective

先整理资料、产品方向和逻辑架构。Project Cognition 支持首次接入时全项目调查与初始建模，再在持续工作中保持任务方向、规范、交付依据和知识更新，并帮助人理解项目。用户明确要求比当前 agent-context-sync 更完善、更好用；尚无效果证据。

## Current State

能力目标包含 PC-G0 首次建模与 PC-G1–PC-G5 持续工作。本轮补充 PC-G2 开发中使用能力/经验/研发路径，以及 PC-G4 中途捕获；事件、检索和准入分别设计。GC-015/016、GC-017/018 均为未运行案例。

用户报告开发中漏读经验、记录时机偏少，并举“mouse 的覆盖、转写工具”未被提醒的例子。当前材料未定位工具入口或原执行记录，实际漏点未证明；详细机制和验收保持 proposed，未选择 Hook。

用户进一步询问 Skill 数量与执行保障。官方文档已核对 Codex 的事件、工具接入及覆盖限制；“插件接入现有 Agent，知识核心配合少量 Skill”的形态为 proposed。本机支持、故障行为和实际收益未运行验证，不能把 Hook 或上下文送达等同于完整保障或正确使用。

用户已明确要求方便传播，并参考 Superpowers 与热门轻量插件。已核对 Superpowers、Context7 和官方 commit-commands 的源码/清单及分发方式；一包安装、按需运行与项目数据独立维护为提案。没有把仓库星数或安装便利当作效果证据。

Trellis、SPEC-AGENTS 等是直接候选；已有资料还不足以证明其首次建模效果，需按 PC-G0 补核对。资料核对不等于实测或采用。

薄治理与伴生资料主线仍有效。用户叫停了过早的 Skill 组合工作：`skills/project-cognition/` 未采纳、未安装或启用；`knowledge/` 为设计期来源索引示例，未选择物理 Base。无新 Golden Run、应用实现、后续复用或真实读者验收。

## Next Action

结合 [插件样本调研](../docs/research/plugin-distribution-and-runtime-patterns.md) 和 [保障提案](decisions/DEC-2026-09-07-004-product-form-and-execution-guarantees.md)，对齐每项能力的触发、执行责任、证据和接入成本，让方便传播与可靠使用同时成立。新的实施指令到来前保持设计范围。

## Blockers

- 当前资料整理没有阻塞；架构、组件和比较细节保持 proposed。
- 后续试用前仍需确定真实任务、使用者与比较条件；当前不请求或启动试用。

## Active Questions

- 初始模型的内容、全项目覆盖和已有代码/从零两种起点，是否准确表达用户需要？
- 隐藏能力和经验应该在哪些重要选择前被提供，怎样证明被核实和使用且不会反复打断？
- 哪些条件需要程序保证，现有宿主能覆盖到哪里，是否有必须由自有任务入口承担的控制点？
- 哪些职责可由现有方案整体承担，哪些差距值得适配或自建？

## Relevant Decisions

- [DEC-2026-09-07-004](decisions/DEC-2026-09-07-004-product-form-and-execution-guarantees.md): 产品形态与执行保障提案；官方资料已核对，本机接入与效果未验证，未采纳具体形态。
- [DEC-2026-09-07-003](decisions/DEC-2026-09-07-003-development-time-memory-use.md): 用户报告与开发中读取/捕获的设计提案；mouse 具体入口、原因和宿主事件支持未验证。
- [DEC-2026-09-07-002](decisions/DEC-2026-09-07-002-initial-project-modeling.md): 用户提出首次全项目扫描与直接建模；产物、交互和验收细节仍为提案。
- [DEC-2026-09-07-001](decisions/DEC-2026-09-07-001-design-first-and-context-sync-baseline.md): 用户明确的设计优先范围和基线要求；未确认具体方案。
- [DEC-2026-09-05-001](decisions/DEC-2026-09-05-001-staged-validation-and-evidence-review.md): accepted documentation and validation refinements; proposed task and effectiveness are outside that acceptance.
- [DEC-2026-09-03-003](decisions/DEC-2026-09-03-003-thin-governance-and-companion-knowledge.md): accepted active thin-governance mainline.
- [DEC-2026-09-02-001](decisions/DEC-2026-09-02-001-agent-led-analysis-and-progressive-visuals.md): Agent-led investigation remains active.
- [DEC-2026-09-03-001](decisions/DEC-2026-09-03-001-canonical-base-and-derived-projections.md): one Canonical Base and derived human materials remain active.
- [DEC-2026-09-03-002](decisions/DEC-2026-09-03-002-coordinated-multi-view-base-store.md): downstream human-view guidance; historical fixture is not an implementation baseline.

## Files To Read First

- [能力目标与比较门槛](../docs/product/capability-goals.md)
- [基线、来源与候选判断](../docs/research/capability-baseline-and-candidates.md)
- [架构、职责与信息归属](../docs/architecture/information-system-architecture.md)
- [插件分发与运行模式](../docs/research/plugin-distribution-and-runtime-patterns.md)
- [MVP 功能与后续验证](../docs/product/mvp-spec.md)，按问题再读契约和案例。
- [Session history](session-log.md)

## Do Not Reopen Unless Needed

历史 walkthrough、多视图 fixture、Claim Schema 和早期 Skill 草稿均为研究材料。原 proposed Golden Case 保留供后续选择。精确 schema、存储、语言、模型、Skill/Hook/MCP 和 UI 未定，不根据草稿文件存在自动推进实施。

## Notes

- 旧参考仍为 `yolo-study-001/dev@9505591f51974c04664d7fc231ddc8685791bcf7`；任务细节由 Golden Cases 保存，当前未确认任务。
- 来源快照在 `output/market-review-20260905/` 与 `output/skill-adoption-20260907/upstream/`；本轮修改前备份在 `output/design-alignment-20260907/before/`。
- 文档状态核对与真实能力验证分开；不得把更多文件描述为更完善或更好用的证据。
- 首次建模补充设计的修改前备份和静态检查位于 `output/project-initialization-design-20260907/`；本轮未扫描参考项目或开发实现。
- 开发中记忆使用的备份与静态检查位于 `output/development-memory-design-20260907/`；本轮没有安装或执行 Hook。
- 产品形态资料修订与 SyncSet sync-20260907-004 的静态核对位于 `output/product-form-design-20260907/`；session-log 与既有决策历史保持原样。
- 插件分发调研的 18 个上游文件、revision 与哈希位于 `output/plugin-distribution-research-20260907/`；均为未运行的研究快照。

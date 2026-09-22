# Agent Handoff

Last updated: 2026-09-13
Updated by: Codex
Staleness: 目标、阶段或当前任务进展变化时更新

## Current Objective

明确 Project Cognition 怎样支持首次项目建模、任务方向、开发中知识复用、交付核验、可靠知识积累和人的项目理解；目标是比 agent-context-sync 更完善、更好用，并方便传播。

## Current State

- 当前主线为 R1：资料、方向和逻辑架构设计。2026-09-13 用户明确授权巡检案例的隔离推荐 Demo，已完成；不扩展为正式产品或原服务实施。
- 已用 `yxyw-safe-check` 做 [首次源码资料规整案例](../docs/cases/CASE-20260913-001/analysis.md)：整体业务结构、wutea 本地提交、路线推荐深读及知识候选；目标 revision 固定为 `8af0fc2d`，未改案例源码。
- 用户补充提交优化 Word 后，已 [修订结论](../docs/cases/CASE-20260913-001/submission-reassessment.md)：附件分离与 MQ 动机有文档来源，保障完备性和性能仍待证。资料与候选未获业务验收或 Base 准入。
- [recommendLines Demo](../demos/recommend-lines/README.md) 提供合成数据、原逻辑 JavaScript 移植及距离校正对照、离线页面和本地 API；11 项算法/HTTP、12 项浏览器检查与脱敏打包通过。原 Word 和案例源码未改，没有 Golden Run 或新产品决定。
- 用户否定上一版可读性，明确本案例读者为零业务知识、只会 CRUD 的大学生。已用同一学校检查故事、关联数据表、数组/循环及完整算例重写入门说明，先解释用途再引入术语；Demo 包新增 guide.md。算例与分享包核对通过，新版可读性尚未获读者接受。
- 既有知识获取方向见 [长期知识契约](../docs/contracts/base-knowledge-contract.md#过程获取与事后复盘)；插件形态与执行保障仍为 proposed，真实收益待验证。

## Next Action

按零业务、只会 CRUD 的读者前提检验本轮入门资料，确认能否独立理解一次检查、数据关联及推荐计算；根据具体不理解的位置继续修改。

## Blockers

当前交付无阻塞；原巡检服务未做联调，缺实际数据库/资产样本、历史故障原始记录、性能数据与业务验收。Demo 的本地接口测试不等于原服务验证；演示为独立 JS 移植，精度/依赖差异见说明。

## Active Questions

- 这些资料是否帮助维护者理解业务，哪些候选值得长期接纳？
- 后续任务是否会主动取回线程上下文、MQ 可见性和时间生成等关系，而不把历史标题或推断当成已验证经验？

## Relevant Decisions

核对阶段依据时看 [设计优先](decisions/DEC-2026-09-07-001-design-first-and-context-sync-baseline.md)；核对记录授权时看 [案例前记录决定](decisions/DEC-2026-09-07-005-pre-case-baseline-and-scope-separation.md)。其余决定按所讨论的目标或方案追溯。

## Files To Read First

- [能力目标](../docs/product/capability-goals.md)：先定位与当前问题相关的段落，需要整体对齐时再读全篇。
- 按当前问题选择 [案例入口](../docs/cases/README.md) 中的分析与验收建议，核对结论时再读对应证据；无需通读所有案例。

## Do Not Reopen Unless Needed

[2026-09-07 完整基线](baselines/BASELINE-2026-09-07-001.md) 是历史对齐快照，核对原目标或演变时按需查阅。归档与 output 备份用于追溯；历史示例、schemas、skills/project-cognition 和 knowledge 为未采纳设计材料。

## Notes

最近工作见 [日志](session-log.md) 的相关条目，其他资料入口见 [README](../README.md)。当前读取顺序以本交接为准，历史快照中的启动安排保留当时语境。

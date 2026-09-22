# Project Cognition 知识索引

Base revision: `pc-base-20260907-01`  
范围：本仓库已确认的产品意图与证据边界。以下是来源索引及最小命题摘要，不是已实现能力或效果报告。原始决定拥有确认与理由。

## PC-G1 — 保持当前任务方向

- 命题：接受普通自然语言任务，保持目标、scope 和完成条件，重要解释对用户可见。
- 种类与状态：declared intent；human-confirmed；active。
- Scope：Project Cognition 的任务入口与任务评审；不证明模型已经可靠做到。
- 来源：[DEC-2026-09-03-003](../.agent-context/decisions/DEC-2026-09-03-003-thin-governance-and-companion-knowledge.md)，Decision 3–5。

## PC-G2 — 规范相关，执行自主

- 命题：为本次工作选择相关项目规范与知识；Agent 自主选择调查、工具、规划和验证。
- 种类与状态：declared intent；human-confirmed；active。
- Scope：Project Cognition 的治理职责；用户要求和宿主权限仍适用。
- 来源：[DEC-2026-09-03-003](../.agent-context/decisions/DEC-2026-09-03-003-thin-governance-and-companion-knowledge.md)，Decision 1–3、6。

## PC-G3 — 用对应证据核验结果

- 命题：结果检查目标、规范、证据、影响和未知；重要完成条件与实际产物或执行证据对应。
- 种类与状态：declared intent；human-confirmed；active。
- Scope：任务交付评审；自查、证据核验、人工接受分别记录。
- 来源：[DEC-2026-09-03-003](../.agent-context/decisions/DEC-2026-09-03-003-thin-governance-and-companion-knowledge.md)，Decision 5–6；[DEC-2026-09-05-001](../.agent-context/decisions/DEC-2026-09-05-001-staged-validation-and-evidence-review.md)。

## PC-G4 — 可靠知识可供后续复用

- 命题：任务结果与长期知识候选分开；只接纳有跨任务价值、来源、scope、状态和适当确认的知识。
- 种类与状态：declared intent；human-confirmed；active。
- Scope：Base 的准入与复用；inferred 保存其推断状态，确认绑定具体命题。
- 来源：[DEC-2026-09-03-003](../.agent-context/decisions/DEC-2026-09-03-003-thin-governance-and-companion-knowledge.md)，Decision 7–8；[Base 契约](../docs/contracts/base-knowledge-contract.md)，第 7、10 节为尚可调整的语义细化。

## PC-G5 — 人类资料与 Agent 知识同源

- 命题：从同一 Base 按读者问题生成资料，帮助维护者理解行为、影响、未知和待决定项，保留来源入口。
- 种类与状态：declared intent；human-confirmed；active。
- Scope：人类资料的语义归属和使用目标；不证明读者已经理解。
- 来源：[DEC-2026-09-03-003](../.agent-context/decisions/DEC-2026-09-03-003-thin-governance-and-companion-knowledge.md)，Decision 9；[DEC-2026-09-05-001](../.agent-context/decisions/DEC-2026-09-05-001-staged-validation-and-evidence-review.md)。

## PC-V1 — 效果需要分阶段证据

- 命题：一次任务、后续知识复用、独立运行、资料生成、真实读者使用和成本收益分别保留证据范围。
- 种类与状态：declared intent；human-confirmed；active。
- Scope：能力验证和对外声明。
- 来源：[DEC-2026-09-05-001](../.agent-context/decisions/DEC-2026-09-05-001-staged-validation-and-evidence-review.md)。

## 更新与失效

准入记录：[本次登记](changes/20260907-bootstrap.md)。这些记录的确认来自既有决定，日期指本次登记时间。用户变更相应目标、规范或证据边界时，重新检查相关 ID 并保留修正历史。上游工具变更不会自动改变本项目目标。

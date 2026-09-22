# DEC-2026-09-07-001: Design first and surpass the context-sync baseline

Status: accepted  
Date: 2026-09-07  
Confirmed by: the user's explicit instruction quoted below; acceptance is limited to work scope and the product requirement  
Related sessions: 2026-09-05 to 2026-09-07, product origins, existing alternatives and capability-first planning  
Related files:
- `docs/product/capability-goals.md`
- `docs/research/capability-baseline-and-candidates.md`
- `docs/architecture/information-system-architecture.md`
- `docs/product/mvp-spec.md`
- `docs/validation/golden-cases.md`
- `README.md`
- `AGENTS.md`
Supersedes: the immediate next-action ordering in DEC-2026-09-03-003 Decision 10 and DEC-2026-09-05-001 Consequences only; their product invariants and later validation requirements remain active  
Superseded by: none

## Context

The user described agent-context-sync as an early form of this product idea, then asked whether existing Skills or applications already meet the need. Research found direct alternatives and multi-capability frameworks. The user asked to clarify capability goals before deriving components. The Agent began drafting a Skill combination before the direction and architecture review was complete.

The user then explicitly stopped that progression and requested materials, direction and architecture first. Existing project documents still placed a Golden Run as the immediate next action and needed a scope correction.

## Decision

1. The current work is to organize research, product direction, capability goals and logical architecture. Skill installation, integration, application implementation and trial execution are deferred until a new instruction to proceed.
2. The new application must be more complete and easier to use than the user's current agent-context-sync approach. This is a requirement to demonstrate, not an observed result.
3. Capability goals precede component selection. Existing Skills and tools are research inputs and candidates; their presence in the repository does not mean adoption.

These three points record explicit user instructions. The proposed experience details, architecture decomposition, comparison scenarios and specific acceptance criteria in the revised design documents have not been separately accepted by the user.

## Reasons

- The user wants the purpose and capability target clear before assembling the solution.
- The earlier Skill provides an actual starting point and a required comparison baseline.
- Completeness and daily usability must both guide design; the requirement does not establish a chosen runtime, storage or interface.

## Rejected Alternatives

- Continue implementing or integrating the drafted Skill now: inconsistent with the user's latest instruction.
- Treat a Skill bundle or more documents as sufficient evidence of improvement: does not demonstrate the stated product requirement.
- Treat the proposed architecture or trial criteria as already user-confirmed: outside the scope of the user's confirmation.

## Evidence

- User: “最重要的还是明确好产品的能力目标，然后根据目标反向推理所需组件”.
- User: “先别做，先整理资料、方向和架构。而且这个新应用一定要比agent-context-sync完善好用”.
- The local agent-context-sync instructions already cover continuity, decisions, inferred status and write review. The baseline inspection and its limits are documented in the research index.
- Early `skills/project-cognition/` files and `knowledge/` examples existed as drafts. They were not installed or run as a product in this task.

## Consequences

- The next action is design review of capability goals, baseline evidence and logical architecture.
- The proposed output-diagnosis Golden Case retains its proposed status; no reference-project change is authorized or performed by this decision.
- The early Skill files are retained and explicitly marked unadopted. The knowledge index is a design example, not a chosen operational Base.
- The product must eventually compare against the actual context-sync setup, preserving its existing capabilities and accounting for human work. Detailed experimental choices remain proposed.
- No efficacy, ease-of-use, runtime, reuse or real-reader acceptance is established by this documentation work.

## Review Triggers

- The user directs the project to begin implementation or trials.
- Design review changes the target users, capability scope or intended interaction.
- Actual comparisons show loss of baseline capability or added burden that outweighs the benefit.
- A suitable existing application or component changes the justified implementation scope.

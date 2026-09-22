# DEC-2026-09-03-001: Canonical base content and derived projections

Status: accepted
Date: 2026-09-03
Confirmed by: user in the current Codex session
Related sessions:
- 2026-09-03T13:00:28+08:00
Related files:
- `AGENTS.md`
- `README.md`
- `docs/architecture/information-system-architecture.md`
- `docs/product/mvp-spec.md`
- `docs/contracts/base-knowledge-contract.md`
- `docs/contracts/projection-ownership-contract.md`
- `docs/contracts/agent-output-contract.md`
- `docs/contracts/knowledge-contract.md`
- `docs/contracts/visual-view-contract.md`
- `docs/validation/golden-cases.md`
Supersedes: none
Superseded by: none

## Context

The accepted Agent-led design defined how a task-specific Cognition Bundle carries structured results to validation, rendering, and recording tools. The user identified that this model emphasized temporary request responses and did not yet define a maintained body of durable base content. The same stable project explanation was also beginning to appear in README, handoff, decisions, contracts, and generated-view examples, creating a foreseeable synchronization problem.

## Decision

1. Project Cognition has one canonical Base Knowledge Store for durable project knowledge, current relationships, status, and evidence references.
2. A Cognition Bundle is a task-scoped candidate transaction against an explicit Base revision. It is not itself the durable knowledge base.
3. Repository artifacts, runtime evidence, and human decisions remain type-specific sources of authority. The Base Store is the canonical current registry and relationship model; it references rather than duplicates authoritative source content.
4. Agent findings enter the Base only through validation, reconciliation, promotion policy, and any required human confirmation.
5. README, START_HERE, module cards, diagrams, learning paths, and other human outputs are one-way projections from a Base snapshot. They must not become parallel sources of truth.
6. `AGENTS.md` owns behavior and routing rules only. `.agent-context/handoff.md` owns the current task cursor only. `session-log.md` owns historical session events only. Decision/ADR files own durable rationale and confirmation. None may silently duplicate Base-owned current facts.
7. Every projection and task cursor identifies the Base revision it used. Projection drift is fixed by regeneration; Base-to-source semantic drift is investigated by an Agent and marked for review rather than guessed by a generic scanner.
8. Base changes are versioned, conflict-aware, and non-destructive. Updates carry expected revisions; incompatible concurrent changes do not overwrite each other; supersede preserves history.
9. Knowledge state is treated as multiple independent dimensions: epistemic, acceptance, lifecycle, verification/freshness, and delivery/promotion.
10. Physical directory names, serialization format, storage engine, implementation language, and exact enums remain T1C drafts until verified by concrete scenarios.

## Reasons

- Task responses and durable project knowledge have different lifetimes, review needs, and update semantics.
- A single canonical current model prevents README, handoff, generated diagrams, and task bundles from competing as independent truth systems.
- One-way projections are easier to verify than bidirectional document synchronization.
- Base-relative transactions prevent concurrent Agents from silently overwriting newer knowledge.
- Explicit promotion prevents every temporary observation or polished Agent response from bloating the durable knowledge base.
- Separating state dimensions allows combinations such as human-confirmed but stale, observed but task-local, or inferred but active to remain representable.

## Rejected Alternatives

- Treat every Cognition Bundle as a durable knowledge snapshot: rejected because task-local answers would accumulate without curation and conflict with later tasks.
- Use README as the base content store: rejected because README must stay a low-burden entry point and cannot safely carry detailed status, provenance, relations, and history.
- Use `.agent-context` as the project knowledge base: rejected because it is a continuity mechanism for current work and session history, and must remain optional to the product's base model.
- Maintain Base Content and human documents independently: rejected because manual synchronization creates multiple current truths.
- Bidirectionally parse generated README or diagrams back into Base Content: rejected because presentation changes would become ambiguous semantic edits.
- Copy complete ADRs, source files, logs, and conversations into the Base: rejected because it duplicates authority, increases privacy risk, and makes staleness harder to reason about.
- Choose a database or monolithic knowledge file before acceptance cases exist: rejected because the logical contracts do not require a physical storage decision yet.

## Evidence

- The user stated that the current structure mostly represented temporary user-request responses and required a fixed maintained base-content system.
- The user explicitly required avoidance of synchronization drift between Agent Context Sync, README, and other documentation systems.
- The user asked to record these constraints and begin building the complete information-system structure.
- Existing repository files already repeated parts of the accepted architecture in README, handoff, a decision record, contracts, and a walkthrough.

## Consequences

- T1C precedes schema freeze and implementation: define Base records, Base snapshots, promotion, reconciliation, projection ownership, and consistency invariants.
- The Agent Output Contract must include `read_basis` and a Base-relative change set, and must distinguish task response content from promotion candidates.
- The Visual View Contract must render from a committed Base snapshot by default and visibly label previews from unmerged bundles.
- README and handoff must be reduced to their declared roles once the Base model has a concrete fixture.
- Golden Cases must cover stale projections, stale handoffs, concurrent bundle changes, non-promotion of temporary findings, and protected decisions.
- The existing Claim Schema remains a draft component and must not be expanded until the complete logical record model is exercised by a fixture.

## Review Triggers

- A real repository cannot represent essential long-lived knowledge without duplicating authoritative source content.
- One-way projection prevents a necessary human editing workflow that cannot be expressed as a Base change proposal.
- Base-relative reconciliation creates more maintenance burden than the drift it prevents.
- The five state dimensions prove redundant or insufficient in Golden Cases.
- `.agent-context`, an ADR system, or another host environment cannot reference Base revisions without tight coupling.
- A physical storage decision becomes necessary to meet accepted scale, collaboration, or query requirements.

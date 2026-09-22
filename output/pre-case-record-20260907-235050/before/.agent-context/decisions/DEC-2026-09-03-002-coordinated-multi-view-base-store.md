# DEC-2026-09-03-002: Coordinated multi-view Base Store

Status: accepted
Date: 2026-09-03
Confirmed by: user in the current Codex session
Related sessions:
- 2026-09-03T14:52:02+08:00
Related files:
- `README.md`
- `AGENTS.md`
- `docs/architecture/information-system-architecture.md`
- `docs/product/mvp-spec.md`
- `docs/contracts/base-knowledge-contract.md`
- `docs/contracts/projection-ownership-contract.md`
- `docs/contracts/agent-output-contract.md`
- `docs/contracts/visual-view-contract.md`
- `docs/validation/golden-cases.md`
- `docs/examples/yolo-study-001-reference-preview.html`
Supersedes: none
Superseded by: none

## Context

The first reference-project HTML proved a low-burden continuous technical explanation. The user accepted that content direction and clarified that one technical manual covers only one part of the intended Base Store. The maintained project knowledge also needs application framework, module and data-logic flows, focused module internals, and an interactive form dedicated to relationships, similar in use to an IDE dependency view.

The earlier progressive L0-L3 experiment also risked turning disclosure depth into a fixed document taxonomy. The Base must support several complementary human questions without creating several independently maintained documentation systems.

## Decision

1. The human-facing Base Store is a coordinated set of projections over one Canonical Base, not one comprehensive document.
2. Its required view families include application framework, module topology, runtime/data/event flow, focused module detail, continuous technical guide, relationship explorer, evidence detail, and task-anchored learning paths.
3. The same project object and relation keep the same stable Base identity, scope, state, and evidence across every view family.
4. Application framework is the default project landmark. A selected object or path remains the focus when the user opens another view family.
5. Relationship Explorer is a relationship-only surface. It begins from one focus node, shows bounded typed/directed relations, supports local expansion and filtering, and exposes relation condition, scope, state, and evidence on selection.
6. Graph coordinates, zoom, temporary filters, pinned nodes, expansion and navigation history are interaction state rather than Base knowledge.
7. Progressive disclosure is a depth axis inside an understanding path. It does not define the complete set of document types.
8. Human technical guides declare a reader baseline and order content by prerequisites: concrete purpose, inputs/outputs and one complete behavior precede internal component names and mechanisms.
9. The first complete schema-free fixture uses the pinned `yolo-study-001/dev@9505591` snapshot and must exercise multiple view families from shared records and relations before schema freeze or implementation-stack selection.

## Reasons

- Different maintenance questions require different representations: prose for continuous explanation, flows for time/data movement, module detail for local mechanisms, and graphs for relationship inspection.
- A shared Base prevents framework maps, module pages, diagrams and articles from drifting into separate current truths.
- Stable identity across views lets users move from overview to detail without rebuilding their mental location.
- Bounded one-focus relationship views avoid the unreadable all-repository graph while preserving exact dependency and evidence semantics.
- Reader prerequisites address the observed failure where Agent prose begins with project-internal abstractions before establishing what the system does.

## Rejected Alternatives

- One long comprehensive project manual: rejected because it cannot efficiently answer structural, flow, local-mechanism and dependency questions at once.
- Independently maintained framework, module, flow and article documents: rejected because repeated facts and relations would drift.
- One default full-repository graph: rejected because density hides the user’s current object and the meaning of individual edges.
- Treat graph layout and user expansion as durable project knowledge: rejected because presentation state would pollute semantic history.
- Preserve L0/L1/L2/L3 as the primary artifact taxonomy: rejected because disclosure depth and information form are independent dimensions.

## Evidence

- The user accepted the revised reference-project technical explanation.
- The user stated that the Base Store must also contain application framework, module/data logic flows and focused module detail.
- The user requested an interactive relationship-only form comparable to an IDE POM dependency view.
- The user explicitly asked to record these constraints and then organize one complete case project.

## Consequences

- The Base record draft expands to cover application/runtime units, data objects, flow stages, focused mechanisms and implementation anchors.
- Relations must retain stable identity, direction, type, scope, condition, state and evidence.
- Projection specifications need a `view_family`, stable focus IDs, bounded relation selection, reader baseline and non-authoritative interaction state.
- The old Project Cognition L0-L3 walkthrough remains historical; it is not the active Base Store example.
- T1C now requires one multi-view fixture. T2 must prove at least one static projection path and one relationship dataset/interactive projection path.
- The exact record enums, graph data format, UI framework and first focused module remain fixture-level design choices until reviewed.

## Review Triggers

- A real case cannot reuse stable object/relation identities across the required views.
- The required semantic records make a small project materially harder to maintain than ordinary documentation.
- Relationship Explorer needs source-level facts that cannot be represented as bounded typed relations.
- Reader-prerequisite metadata proves too subjective to produce more usable technical explanations.
- Preserving focus across view families adds more navigation burden than it removes.

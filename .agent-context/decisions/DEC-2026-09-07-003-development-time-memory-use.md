# DEC-2026-09-07-003: Use and capture project knowledge during development

Status: proposed  
Date: 2026-09-07  
Confirmed by: none for the detailed design; the user explicitly reported the usage gap and mouse example  
Related sessions: 2026-09-07, development-time recall, lessons, development paths and hidden capabilities  
Related files:
- `docs/product/capability-goals.md`
- `docs/product/mvp-spec.md`
- `docs/architecture/information-system-architecture.md`
- `docs/contracts/base-knowledge-contract.md`
- `docs/contracts/agent-output-contract.md`
- `docs/validation/golden-cases.md`
- `docs/research/capability-baseline-and-candidates.md`
- `AGENTS.md`
Supersedes: none; elaborates PC-G2/PC-G4 within the accepted product direction  
Superseded by: none

## Context

The user reports that agent-context-sync does not bring lessons or development paths into ongoing development often enough and has too few situations that trigger recording. They cite a previously requested “mouse 的覆盖、转写工具” as a hidden project capability that later Agents are not told about.

Current project design supplied relevant context at framing and described result-driven knowledge updates, but did not explicitly define renewed selection or candidate capture at meaningful points during execution. The inspected context-sync instructions primarily define startup continuity and write review. These document observations identify a design gap; they do not establish the original incident's technical cause.

The tool entry, current implementation status and original execution trace were not located in the inspected Project Cognition materials. The example is a user report, not a verified implementation record. Host Hook support was not audited.

## Proposed Decision

1. Elaborate PC-G2 so relevant project capabilities, lessons and development paths can be supplied during work when the goal, proposed capability, module or problem changes, including before significant duplicate implementation.
2. Elaborate PC-G4 so new capabilities, verified fixes, experiment outcomes, explicit corrections and source changes can produce candidates before task completion.
3. Describe reusable knowledge by purpose, relevant cues, source entry, scope, status and evidence. Capture observable attempts and outcomes; unresolved causes remain hypotheses.
4. Separate event detection, knowledge selection, delivery, applicability review, actual use, candidate capture and durable admission. Compare their outcomes and burden independently.
5. Use host events, tool results or Agent semantic checkpoints only as mechanisms for these responsibilities. No Hook or retrieval implementation is selected; unavailable event coverage remains explicit.

The existing thin-governance direction, Agent execution autonomy, one Base, proportional evidence and human confirmation boundaries remain unchanged. This proposed elaboration is documentation work, not runtime authorization.

## Reasons

- Useful knowledge can exist yet fail to affect the next decision.
- Development creates important evidence before the final response, and that evidence can be lost across interruptions or context changes.
- Triggering alone does not establish relevance, correct use or knowledge authority.
- Comparing actual reuse, repeated failures and interruption burden is more informative than counting records or Hook invocations.

## Alternatives Considered

- Rely only on startup and final sync: leaves the reported mid-task situations without explicit responsibility.
- Add many unconditional Hooks: may increase noise while failing to supply applicable knowledge; event availability is unverified.
- Force reuse of every related old tool or lesson: could apply stale or mismatched knowledge; applicability requires source checks.
- Record every failed attempt as a confirmed lesson: confuses observation, cause, scope and evidence.
- Add a second independent capability or experience store: would split current authority; descriptors should refer to the same Base and source owners.

## Evidence

- User reported missing development-time reading of lessons/development paths and limited recording triggers.
- User supplied the mouse tool as a concrete example of a hidden capability not brought into later work.
- Pre-revision architecture section 4.2 went from autonomous execution to results without an explicit development-time memory-use/capture path.
- The Base already supports facts, relationships, lessons and state distinctions; descriptors and lifecycle use can extend those semantics.

## Consequences

- Product/architecture drafts now describe read and capture moments separately, with capability and development-path semantics.
- GC-017/018 are proposed, unexecuted cases for hidden-capability use and mid-task capture/reuse.
- Incident diagnosis must distinguish never captured, not triggered, not found, not supplied, not read and not correctly used; no single cause is assumed.
- Existing candidate reviews need corresponding execution evidence before adoption claims.
- No Hook is installed, no mouse tool is run, and no product-effectiveness claim is established.

## Review Triggers

- The user clarifies the intended tool or expected development behavior.
- Original sources or execution records establish the actual failure stage.
- Host event support or real trials require different trigger coverage.
- Proactive knowledge delivery adds more distraction than useful assistance, or supplied knowledge still does not affect decisions.

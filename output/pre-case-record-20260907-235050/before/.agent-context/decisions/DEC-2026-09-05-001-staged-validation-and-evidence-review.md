# DEC-2026-09-05-001: Staged validation and evidence review

Status: accepted  
Date: 2026-09-05  
Confirmed by: user authorized the preceding document-revision recommendations in the current session; acceptance covers the documentation and validation design, not runtime effectiveness or the proposed yolo task  
Related sessions: 2026-09-05, project-purpose alignment and document revision  
Related files:
- `README.md`
- `AGENTS.md`
- `docs/product/mvp-spec.md`
- `docs/validation/golden-cases.md`
- `docs/contracts/agent-output-contract.md`
- `docs/contracts/visual-view-contract.md`
- `docs/architecture/information-system-architecture.md`
Supersedes: none; clarifies the validation boundary of DEC-2026-09-03-003  
Superseded by: none

## Context

The user asked to align the project purpose after reading the current documents and two Meituan articles, then requested an assessment of document changes and authorized the recommended revision. The active thin-governance mainline remains valid. The review found that one run could demonstrate feasibility but could not establish enduring value; review checks needed explicit connections to actual evidence; and knowledge reuse and reader application needed their own observations.

The [Agent evaluation article](https://tech.meituan.com/2026/08/07/Agent-Evaluation.html) informed the use of concrete criteria, observed task results and case-based improvement. The [AI Coding practice article](https://tech.meituan.com/2026/05/07/Agent-AI-Coding.html) informed the connection between shared project standards and review. These are external design inputs; their reported outcomes are not evidence of Project Cognition's effectiveness.

## Decision

1. Express the product purpose through the maintainer's work: task direction, reviewable delivery, important human decisions and usable accumulated knowledge. README provides an accessible entry into the existing contracts.
2. The first Golden Run demonstrates a bounded task path and discovers failures. Durable reuse, repeatability, real-reader usefulness and relative cost require separate evidence.
3. Important completion conditions connect to actual artifacts or execution evidence, with reviewer, method, scope, verdict and rationale. Self-review, evidence verification, human acceptance, knowledge admission and reader feedback remain distinct.
4. Keep task execution autonomous and evidence proportional to risk. Small tasks can express checks briefly; record only the execution evidence needed to verify consequential behavior and explain failures.
5. Use a small set of explicitly synthetic results to clarify review criteria before expanding automated judgment. No fixed agreement threshold, second-model requirement or new tracing platform is selected.
6. Validate admitted knowledge in a later real task. Validate human material through a concrete maintenance question appropriate to the reader. Two complementary materials remain a first-run experiment arrangement.
7. Record human work and available resource data. Use a matched comparison only when drawing relative-benefit conclusions; state missing measurements and uncontrolled differences.

## Reasons

- A complete single run and repeated reliable use answer different questions.
- Traceable verdicts help detect unsupported completion claims and disagreements about evidence.
- Accumulated knowledge has value when it helps later work and remains applicable.
- Human materials should support concrete understanding and judgment; generation alone does not establish that outcome.
- Proportional records and staged experiments preserve the accepted thin-governance boundary.

## Rejected Alternatives

- Reset the product mainline again: the review identified validation and explanation gaps within the accepted direction.
- Treat a successful run as proof of long-term reliability or savings: those claims require reuse, repeated observations and relevant comparisons.
- Introduce a mandatory full-trace or multi-model platform now: the next case can use existing execution records and human verification.
- Automatically adopt an Agent-created project change as the real task: the user's document-edit authorization does not supply the missing business target.

## Evidence

- User requested the document assessment and then said “可以修订。开始工作”.
- Pre-edit MVP linked long-term value to one complete run; the new success section narrows that claim.
- Pre-edit review rules required evidence but did not specify a per-condition verification record.
- Pre-edit reader checks covered explanation and navigation; the revision adds an applied maintenance question.
- The reference commit was verified locally, and its root policy plus selected source excerpts were read only to prepare a reviewable case candidate.

## Consequences

- The next step is to confirm or replace the concrete first-task candidate, then freeze the task and its criteria before execution.
- The output-diagnosis task in Golden Cases is Agent-proposed, not human-confirmed. It neither establishes a defect nor authorizes implementation in the reference project.
- The new checks and conceptual field names are validation design; no schema or implementation stack is frozen.
- All current runtime, reuse, real-reader and cost-effectiveness outcomes remain unverified.
- Earlier accepted decisions and historical fixtures keep their original scope and history.

## Review Triggers

- Verification records cost more effort than the errors they expose.
- Human/model disagreements cannot be resolved with explicit criteria and source checks.
- Later tasks cannot use the admitted knowledge or repeatedly need the same missing context.
- Readers can repeat the explanation but cannot use it for the agreed maintenance question.
- Comparable runs show no benefit after including governance and knowledge-maintenance costs.

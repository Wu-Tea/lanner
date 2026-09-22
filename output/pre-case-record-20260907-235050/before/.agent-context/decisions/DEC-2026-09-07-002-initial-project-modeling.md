# DEC-2026-09-07-002: Initial project scanning and modeling

Status: accepted  
Date: 2026-09-07  
Confirmed by: the user's explicit identification of full-project scanning and direct modeling as a missing product capability; acceptance covers inclusion in the design, not the detailed workflow or implementation  
Related sessions: 2026-09-07, review of capability goals after design-first correction  
Related files:
- `docs/product/capability-goals.md`
- `docs/product/mvp-spec.md`
- `docs/architecture/information-system-architecture.md`
- `docs/contracts/base-knowledge-contract.md`
- `docs/contracts/agent-output-contract.md`
- `docs/validation/golden-cases.md`
- `docs/research/capability-baseline-and-candidates.md`
- `README.md`
- `AGENTS.md`
Supersedes: none; clarifies first-contact product scope while retaining DEC-2026-09-02-001 Agent-led investigation and DEC-2026-09-03-003 governance/knowledge responsibilities  
Superseded by: none

## Context

The current capability table began with an ongoing task. The architecture used a Canonical Base but did not define an independent first-contact flow for a project without this tool's prior memory. Existing validation focused on a local Design task and later reuse. The user identified that a project being introduced for the first time also needs full-project scanning and direct modeling.

Earlier decisions assign repository investigation and semantic understanding to the Agent and avoid building a universal parser. Those mechanism choices do not exclude an application capability that asks the Agent to investigate and model a whole project.

## Decision

Project Cognition must include an independent first-contact capability: take a newly introduced project, investigate its full specified scope and establish an initial project model. Ongoing development and incremental knowledge maintenance alone do not cover this need.

The application remains in design scope under DEC-2026-09-07-001. This statement authorizes no project scan, Skill installation or runtime implementation.

The PC-G0 identifier, model contents, coverage record, greenfield branch, component mapping and acceptance cases are Agent-proposed design details. They are not recorded as separately human-confirmed.

## Reasons

- A newly introduced project may have no prior tool-generated memory or tasks.
- Users need an initial understanding from which future project work can proceed.
- The new application's completeness requirement must include first use as well as continuity.

## Rejected Alternatives

- Require several development tasks before a project model can exist: does not address the user's first-contact requirement.
- Treat creation of memory folders or an outline as sufficient modeling: does not establish usable project understanding; detailed adequacy criteria remain proposed.
- Interpret whole-project modeling as a mandate to build a universal language parser: the existing Agent-led investigation decision remains applicable.

## Evidence

- User: “我觉得还缺少了对新项目全量扫描然后直接建模的功能，理论上用这套工具可能持续开发可以，但新项目呢”.
- Before this revision, capability-goals listed PC-G1–PC-G5 for ongoing work; no initial-model capability or acceptance case was explicit.
- The prior architecture supplied Base knowledge to task framing without defining the first Base's independent creation path.
- DEC-2026-09-02-001 already assigns technology recognition, source investigation and interpretation to the Agent.

## Consequences

- The design now covers initial modeling and ongoing development/update as linked capabilities.
- Initial modeling is treated as a real project task using existing result review, knowledge admission and same-source material responsibilities.
- The design distinguishes newly introduced repositories from greenfield projects; the latter's concrete treatment remains a proposed interpretation of “new project”.
- New GC-015 and GC-016 are unexecuted validation designs. The existing output-diagnosis case is preserved with its proposed scope.
- Candidate reviews need additional first-contact evidence; previous feature descriptions do not prove full-project modeling support.
- No completeness, usability, initial-model correctness or comparative effectiveness is established by documentation changes.

## Review Triggers

- The user clarifies a different meaning or scope of full-project scanning or new projects.
- Initial-model review reveals missing structures, unsupported relationships or excessive human burden.
- Large-project trials require different coverage and resumability semantics.
- Real use shows the model cannot support subsequent work or cannot be updated without full repeated scans.

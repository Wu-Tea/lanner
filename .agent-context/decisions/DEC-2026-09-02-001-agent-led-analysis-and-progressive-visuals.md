# DEC-2026-09-02-001: Agent-led analysis and progressive visual outputs

Status: accepted
Date: 2026-09-02
Confirmed by: user in the current Codex session
Related sessions:
- 2026-09-02T21:40:06+08:00
Related files:
- `AGENTS.md`
- `README.md`
- `docs/product/mvp-spec.md`
- `docs/contracts/knowledge-contract.md`
- `docs/contracts/agent-output-contract.md`
- `docs/contracts/visual-view-contract.md`
- `docs/validation/golden-cases.md`
Supersedes: none
Superseded by: none

## Context

The initial design treated deterministic repository scanning as a shared product capability and considered Skills, Hooks, and MCP as possible delivery mechanisms. The user clarified that natural language should remain the interaction surface, the Agent should investigate and understand each repository with methods appropriate to its actual language and toolchain, and the project should first constrain the communication protocol. The Agent's otherwise unstructured investigation should become structured data before tools render or record it.

## Decision

1. The user communicates with the Agent in ordinary natural language.
2. The Agent owns repository investigation, technology-stack recognition, selection of repository-native tools, and semantic interpretation.
3. Before durable output, the Agent submits a structured cognition bundle that separates claims, evidence, relationships, uncertainty, view requests, and proposed recording actions.
4. Project tools are language-agnostic consumers of that bundle. They may validate, normalize, slice, lay out, render, and record it, but they do not need to understand every source language.
5. A universal multi-language scanner is not part of the product core. Optional language-specific adapters may be added only when a concrete acceptance case proves their value.
6. Skills, MCP, Hooks, and Plugins are deferred. They may later instruct, expose, trigger, or distribute the same contracts and tools, but they are not sources of truth.
7. Human-facing outputs use progressive disclosure: orientation first, one critical flow second, focused detail third, and source evidence on demand.

## Reasons

- A universal scanner would shift the project toward maintaining parsers and framework adapters across languages.
- Modern coding Agents can select source inspection, Git, compiler, test, language-server, and repository-specific tools according to context.
- A stable structured boundary lets Agent capability improve without coupling the project to one model or one analysis implementation.
- Language-agnostic validation and rendering remain reusable even when investigation methods change.
- Progressive views reduce the burden of reading a complete repository graph before the user has a concrete question.

## Rejected Alternatives

- Universal deterministic scanner as the core: rejected because language, framework, build-system, generated-code, and runtime semantics create an open-ended compatibility burden.
- Free-form Markdown as the Agent-to-tool interface: rejected because evidence, status, scope, and update semantics cannot be validated reliably.
- MCP-first or Hook-first delivery: rejected for the MVP because neither adds core knowledge capability, and both introduce integration surface before the protocol is stable.
- Manually maintained diagrams as authoritative documentation: rejected because they drift and create a second source of truth.
- A single large Skill containing all reasoning: rejected because it would encode a rigid workflow that may become obsolete as Agent capability improves.

## Evidence

- The user stated that repository scanning and understanding should be performed by the Agent because a general-purpose scanner would be difficult to adapt across languages.
- The user confirmed the intended sequence: constrain the communication protocol, let the Agent turn unstructured investigation into structured data, then let tools produce and record outputs.
- Existing project rules require observed facts, Agent inference, proposals, human confirmation, and superseded knowledge to remain distinguishable.

## Consequences

- T1 must define the Agent output contract before an implementation stack is selected.
- The current claim schema remains a draft input component rather than the complete communication envelope.
- Rendering tools consume a neutral view specification and evidence references; they do not inspect source repositories directly.
- Golden Cases must test unsupported assertions, missing evidence, progressive disclosure, and deterministic rendering of the same structured input.
- Existing documents that assume a scanner-led architecture must be revised.

## Review Triggers

- Agents repeatedly fail to obtain a specific class of repository fact with available native tools.
- A language-specific adapter measurably improves an accepted Golden Case enough to justify its maintenance cost.
- Multiple Agent clients need the same tools and direct CLI invocation becomes a proven usability problem.
- A recurring missed check demonstrates a concrete need for a Hook.
- The structured protocol constrains useful future Agent behavior or cannot represent a real project case.

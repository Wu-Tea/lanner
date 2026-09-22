# Agent Work and Result Contract

Status: Revised semantic draft 0.2; runtime validation pending  
Phase: R1 capability contract  
Last updated: 2026-09-07

## 1. Purpose

本契约定义一次 Agent 工作的语义边界：如何保持用户方向、提供相关项目规范、核验实际结果，以及怎样把任务回答与可复用知识增量分开。Agent 在任务风险、项目约束和已给定资源边界内，自主决定调查步骤、工具、语言适配、推理方法、视图形式和工作深度。

```text
Natural-language request
→ Task Frame + selected project context
→ autonomous Agent work
→ Result Envelope
→ Outcome Review
→ optional Knowledge Delta
```

## 2. Responsibility Boundary

| Role | Owns | Success Boundary |
|---|---|---|
| Human | 真实目标、业务语义、架构取舍、风险接受和最终验收 | 明确确认需要价值判断的命题 |
| Project Cognition | 方向、相关规范、结果要求和知识晋升边界 | 为 Agent 提供最小充分治理条件 |
| Agent | 调查计划、工具选择、推理、验证和当前结果 | 标明观察、推断、建议和未知项 |
| Outcome Reviewer | 将重要完成条件对应到原始证据并实际核验 | 写明核验者、方法、判定依据和未核验部分 |
| Promotion Boundary | 把长期知识候选与任务内容分开 | 只保留具有跨任务价值的知识 |

同一个强模型可以同时完成 framing、execution、review 和 delta extraction。自查、证据核验和人工接受在记录中分别标明；模型自查可支持当前任务，尚未校准的自动评审不能声称已有人工判断的一致性保证。

## 3. Task Frame

Task Frame 是 Agent 从用户自然语言中形成的可检查解释。

概念结构：

```yaml
original_request: 原始用户请求或其可靠引用
goal: 本次要达到的结果
phase: design | implementation | review | diagnosis | learning | other
scope:
  included: []
  excluded: []
completion_conditions: []
relevant_policies: []
relevant_base_refs: []
required_outcomes: []
human_decisions: []
assumptions: []
```

这里只定义语义，不冻结字段名或序列化格式。

首次接入与全项目建模可以直接成为任务目标。此时 `relevant_base_refs` 可以为空，scope 是指定项目整体，完成条件包含主要结构与流程、实际覆盖和来源状态；用户无需先提供局部开发目标或既有记忆。模型选择分批调查方法时仍保持整体 scope，未完成部分明确保留。

### Required Behavior

- 保留原始请求，便于发现目标解释偏差；
- 目标用结果表述，不把预设实现方法当成目标；
- 只加入本次任务相关的规范和 Base 内容；
- 明确影响结果的假设；
- 实质性改变 scope、完成条件或用户目标时必须对人可见；
- 缺失信息保持为假设、未知项或澄清问题。
- 重要完成条件应能通过产物或行为判断，并在评审前明确。后续需要改变条件时，保留原因和必要的用户确认；条件不能随候选结果静默改写。

### Agent Execution Freedom

Agent 根据仓库、任务和模型能力决定：

- 优先读取的文件和上下文；
- 搜索、AST、构建、测试或其他工具组合；
- 调查层次和扩大范围的时机；
- 中间验证和最终表达方式；
- 适合当前问题的专业判断框架。

用户任务或项目规范明确要求的方法会进入 Task Frame，成为可核对的执行条件。

## 4. Selected Project Context

每项上下文至少保留：

- 内容或稳定引用；
- 它属于事实、意图、决定、规范、风险还是未知项；
- 适用 scope；
- 来源或确认依据；
- 当前状态和已知限制。

上下文选择遵循最小充分原则：先给完成任务需要知道的内容，再按调查需要展开证据、历史和关系。

任务或方案变化、进入新模块、准备新增能力和出现相关失败时，重新选择适用的能力、经验与研发记录。关键知识带相关理由、实际入口与适用边界；按需要查看来源后决定复用、适配、补查或不采用。重要新增方案的复用检查不得仅凭“检索没有命中”判定项目不存在相关能力。

对首次建模，相关上下文范围覆盖全项目；最小充分决定每次载入的材料和调查顺序，不将全项目目标静默缩成局部任务。目录枚举、来源阅读、关系解释和运行验证分别说明已完成到什么程度。

## 5. Result Envelope

Result Envelope 让当前结果可以被判断，同时保留 Agent 对推理和表达的选择。

概念结构：

```yaml
direct_result: 对当前任务的直接回答或已完成结果
completion:
  status: complete | partial | blocked
  condition_checks: [] # 完成条件、证据引用、核验者/方式、判定与理由
key_findings: []
evidence: []
policy_check: []
impact_and_risk: []
uncertainties: []
unexamined_or_unverifiable: []
human_decisions: []
knowledge_delta: optional
```

普通回答可以使用自然语言。只有 Review 或持久化需要时才转换成明确结构。`completion` 是执行者对完成状态的报告，Review 会核验其依据；最终接受状态仍按人类确认边界产生。

对存在明确复用要求或重要历史约束的结果，说明相关知识如何影响关键选择；引用来源或适用性判断即可，无需逐条叙述阅读过程。知识已保存、已提供、已核实、已用于判断分别有自己的证据范围。开发中的候选与最终结果通过引用连接，不要求等待收尾再保存。

首次建模的 `direct_result` 应交付可关联、可更新的初始项目模型，并引用覆盖记录；至少包含项目全貌、主要模块与关系、关键行为、相关规范及重要未知。目录树、摘要或已创建 Base 文件不能单独证明建模完成。具体判据见 [GC-015](../validation/golden-cases.md#19-gc-015--initial-model-of-an-existing-project)；从零项目见 [GC-016](../validation/golden-cases.md#20-gc-016--model-a-greenfield-project)。

## 6. Evidence Proportionality

| Result Type | Minimum Evidence Expectation |
|---|---|
| 局部实现事实 | 可定位源码、配置、diff、测试或运行行为 |
| 模块或跨文件解释 | 关键来源、关系依据、scope 和推断标记 |
| 结构性 Design 建议 | 当前边界、受影响路径、相关规范、替代方案和未知项 |
| “项目中不存在某问题” | 实际调查范围、方法、未覆盖区域和外部盲区 |
| 真实运行结论 | 绑定环境、revision 和观察方法 |
| 业务接受或架构选择 | 明确的人类确认 |

证据与结论强度保持一致：当前证据支持局部结论时使用局部表述，需要更强结论时追加相应验证。

### Actual Artifacts and Execution Records

- 修改是否落地，由实际文件或 diff 支持；执行是否成功，由相应命令结果或可观察状态支持；测试通过引用测试范围、命令、revision、环境和结果。
- 历史测试保留为历史记录。没有本次运行证据时，不把已有的通过记录描述为本次复验。
- Design 工作可交付充分有据的分析和验证计划；计划本身不证明实现完成或运行效果。
- 核验者打开相关来源，说明实际检查的部分。引用缺失、不可访问或与当前范围不符时，该完成条件保持尚未验证。
- 当判断规范遵守、失败原因或高影响行为需要过程证据时，引用相关输入、已加载规范、关键动作及结果、实际产物和人工纠正。原始记录由执行环境或任务证据目录承载，Base 只引用其中有长期价值的部分。
- 记录深度与风险相称。普通局部任务可用少量直接证据；无需为了统一格式保存全量工具输出、私人对话或内部推理。

## 7. Outcome Review

Outcome Review 按顺序回答：

1. 结果是否回答了原始目标？
2. 完成条件是否实际满足？
3. 是否违反任何相关项目规范或已确认决定？
4. 关键结论的证据是否足以支撑其强度？
5. scope、影响和限制是否表达清楚？
6. 推断、建议和人类确认是否正确区分？
7. 是否隐藏了会改变决定的重要未知项？
8. 哪些事项仍必须由人判断？

### Condition Checks

每项重要完成条件至少能找到以下信息；可以在简短自然语言中表达，不强制每次任务填表：

| 信息 | 需要回答的问题 |
|---|---|
| 完成条件 | 本次约定需要交付或证明什么？ |
| 证据与范围 | 对应哪个产物、源码、运行结果或决定，适用于哪个 revision 和环境？ |
| 核验者与方式 | 谁做了自查、来源核验或人工判断，实际查看了什么？ |
| 判定与理由 | 满足、不满足或尚未验证，依据是什么？ |

不适用的条件说明理由及其范围依据。不得用“不适用”静默取消用户要求。这里的字段名和形式保持为语义草案。

例如，要求“本次回归测试通过”而只有历史测试记录时，判为尚未验证；要求“设计说明静态分析的运行盲区”且明确指出尚未实测的部分时，这条条件可以满足，实际运行效果继续保持未知。

### Review Result and Calibration

Review 可以输出 `pass`、`revise`、`needs-human-decision` 或 `blocked`：

- `pass`：所有必要完成条件都有充分证据支持，相关规范已按本次范围核验，发现的违反项已解决。只表示本次结果契约满足，不表示用户验收，也不表示知识已晋升。
- `revise`：发现目标、规范、证据或表达缺口，需要修正结果或追加核验。
- `needs-human-decision`：继续判定或推进需要明确的人类取舍。
- `blocked`：存在当前无法取得的证据、权限或外部条件，并写明受影响的完成条件。

必要条件尚未验证时，不能仅凭结果完整或模型自述给出 `pass`；总体状态由具体缺口决定。任务评审、人工接受、知识接纳和资料使用反馈分别保留状态。

首个 Golden Run 用少量具体结果校准判据：先写清标准与预期判断，再比较人工和模型对合格、缺证据、偏离目标或违反规范样例的判断。样例为合成时明确标注；分歧用于修订模糊标准或补充来源。所需人机一致性证据随自动化的使用范围增加，首轮不预设百分比门槛，也不强制增加第二个模型。

## 8. Knowledge Delta

Knowledge Delta 是 Result Envelope 的可选部分，只提出跨任务仍有价值的内容：

```yaml
base_read_basis: optional
candidates:
  - action: add | revise | contradict | mark-stale | supersede
    topic: stable project topic
    scope: {}
    value: {}
    epistemic_state: observed | inferred
    acceptance_state: not-applicable | proposed | human-confirmed
    source_refs: []
    reason_to_retain: 为什么后续任务仍需要它
    human_confirmation_required: true | false
```

当前回答的写作和版式、一次性调试过程及中间推理留在任务上下文；原始日志留在证据系统；重复内容由既有 Base 继续拥有；敏感信息在进入 Delta 前完成清理。

## 9. Partial and Blocked Results

Agent 可以诚实提交部分结果：

- 已完成部分和未完成条件分开；
- 已验证内容与推断分开；
- 阻塞原因指向缺少的证据、权限、外部状态或人类选择；
- 当前任务可以完成但没有任何 Knowledge Delta；
- Knowledge Delta 可以被全部拒绝而不否定当前任务结果。

## 10. Model Independence

- 不同模型可以使用不同工具和调查路径；
- 比较目标命中、规范遵守、证据强度、未知项诚实度和结果效用；
- 模型变强时逐步减少提示和中间结构；
- 供应商专用能力只作为执行配置，不改变本契约的核心语义。

## 11. Validation Outcomes

### Revise

- 目标被静默改写；
- 关键完成条件没有回答；
- 违反相关规范；
- 结论强于证据；
- scope 或未知项会误导决定；
- 把 proposed/inferred 表述为 human-confirmed；
- Knowledge Delta 复制了整个任务回答。

### Pass

- 结果对任务有直接作用；
- 完成状态真实；
- 相关规范已检查；
- 证据与结论强度匹配；
- 影响、未知和人类决策点清楚；
- Delta 只含可复用候选。

## 12. Open Decisions

1. 首个 Golden Run 用什么最简记录形式连接原始请求、完成条件、证据和核验结果。
2. 谁负责首轮关键证据核验，模型自查与人工判断如何记录。
3. Knowledge Delta 使用 Markdown、YAML 还是模型原生结构化输出。
4. 哪些低风险 observed fact 可以无需逐项确认进入 Base candidate。
5. 是否需要为长时间 Agent 运行保留阶段性完成条件，而不固定执行计划。

# Agent Work and Result Contract

Status: Reset draft 0.1  
Phase: R1 capability contract  
Last updated: 2026-09-03

## 1. Purpose

本契约定义一次 Agent 工作的语义边界：如何保持用户方向、提供相关项目规范、判断最终结果，以及怎样把任务回答与可复用知识增量分开。调查步骤、工具、语言适配、推理方法、视图形式和执行时长由 Agent 根据任务决定。

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
| Outcome Reviewer | 检查目标、规范、证据、影响和未知项 | 用任务完成条件判断结果质量 |
| Promotion Boundary | 把长期知识候选与任务内容分开 | 只保留具有跨任务价值的知识 |

同一个强模型可以同时完成 framing、execution、review 和 delta extraction，但这些职责在结果中仍需可区分。

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

### Required Behavior

- 保留原始请求，便于发现目标解释偏差；
- 目标用结果表述，不把预设实现方法当成目标；
- 只加入本次任务相关的规范和 Base 内容；
- 明确影响结果的假设；
- 实质性改变 scope、完成条件或用户目标时必须对人可见；
- 缺失信息保持为假设、未知项或澄清问题。

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

## 5. Result Envelope

Result Envelope 让当前结果可以被判断，同时保留 Agent 对推理和表达的选择。

概念结构：

```yaml
direct_result: 对当前任务的直接回答或已完成结果
completion:
  status: complete | partial | blocked
  conditions_met: []
key_findings: []
evidence: []
policy_check: []
impact_and_risk: []
uncertainties: []
unexamined_or_unverifiable: []
human_decisions: []
knowledge_delta: optional
```

普通回答可以使用自然语言。只有 Review 或持久化需要时才转换成明确结构。

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

Review 可以输出 `pass`、`revise`、`needs-human-decision` 或 `blocked`。`pass` 只表示结果契约满足，不表示用户验收，也不表示任何知识已经晋升。

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
- 比较可观察的目标、规范、证据、未知项和结果效用；
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

1. 首个 Golden Run 是否需要显式保存 Task Frame，还是只保存原始请求和 Review 结果。
2. Outcome Review 首轮由人执行，还是先由第二模型提出审查问题。
3. Knowledge Delta 使用 Markdown、YAML 还是模型原生结构化输出。
4. 哪些低风险 observed fact 可以无需逐项确认进入 Base candidate。
5. 是否需要为长时间 Agent 运行保留阶段性完成条件，而不固定执行计划。

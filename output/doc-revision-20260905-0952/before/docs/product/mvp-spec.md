# Project Cognition MVP Spec

Status: Reset baseline for validation  
Phase: R1 capability contract and vertical-slice design  
Last updated: 2026-09-03  
Related decision: `.agent-context/decisions/DEC-2026-09-03-003-thin-governance-and-companion-knowledge.md`

## 1. Outcome

MVP 只验证一个命题：

> 向 Agent 提供正确方向、相关项目规范和结果要求，并让强模型自主完成调查与推理，能否使一次真实项目任务保持目标一致、结果可验证，并把其中有长期价值的认知伴生为对人类友好的项目资料。

成功意味着我们找到模型外部长期有价值的最小治理边界，并能用一次完整工作验证它。

## 2. Two Linked Outcomes

### O1 — Govern Agent Work

- 从普通自然语言中保持用户目标、范围和完成条件；
- 向 Agent 提供本次任务相关的规范、事实、决定和未知项；
- 让 Agent 自主选择仓库调查、工具、验证和表现方式；
- 对最终结果检查方向、规范、证据、影响和不确定性；
- 把必须由人判断的事项清楚交还给人。

### O2 — Produce Companion Human Knowledge

- 从真实任务结果中识别可复用知识增量；
- 只将通过证据、冲突和确认边界的内容晋升到 Canonical Base；
- 从同一 Base 按人的问题生成低负担资料；
- 保证文章、框架、流程、模块和关系视图不形成多套当前事实。

O1 是当前主线，O2 使用 O1 的真实产物同步验证。

## 3. Users

### Maintainer

对产品、架构、风险和最终结果负责，希望 Agent 自主工作但不偏离项目方向。

### Coding Agent

需要在一次任务中获得足够但不过量的项目上下文，并能自由使用自身能力和仓库工具。

### Reader or New Contributor

需要从项目用途和真实行为出发，逐步理解结构、流程、模块、关系和证据。

## 4. Product Boundary

### The System Provides

- `Direction`：目的、适用边界、完成条件和需要人决定的事项；
- `Policy`：与当前任务相关、已经确认的项目规范；
- `Outcome`：结果必须回答什么、提供什么证据、暴露什么未知；
- `Promotion`：哪些知识进入 Base，以及确认、冲突和生命周期边界；
- `Projection ownership`：所有人类资料从同一 Base 派生。

### The Model Performs

- 如何理解仓库和选择调查路径；
- 使用搜索、Git、编译器、测试、语言服务或其他工具；
- 是否扩大或收缩调查范围并说明理由；
- 如何推理、交叉验证、画图和组织当前回答；
- 根据模型能力选择合适的工作深度。

### Current Validation Scope

当前阶段交付一条可观察的纵向路径：自然语言目标、相关规范、Agent 自主工作、结果评审、Knowledge Delta 和两种人类资料。实现形态由这条路径暴露的确定性校验、持久化、集成和触发需求决定。

## 5. MVP Vertical Slice

一次纵向案例必须同时走通：

```text
自然语言 Design 任务
→ Task Frame
→ 相关项目上下文
→ 强模型自主选择调查和验证方法
→ Result Envelope
→ Outcome Review
→ Knowledge Delta
→ Promotion Review
→ Canonical Base 更新候选
→ 至少两种互补的人类资料表现
```

第一案例继续使用固定的 `yolo-study-001/dev@9505591`，但只把旧 fixture 当作证据和对照，不接受其数据结构或 UI 为产品实现。

推荐任务：在修改核心控制输出路径之前，说明当前状态所有权、兼容或回退路径、隐式消费者、关键约束和设计风险，并形成一个可供人理解的完整行为说明。

## 6. Minimal Information Boundary

### Task Frame

概念上至少表达：

- 原始用户请求；
- 本次目标和完成条件；
- scope 与适用边界；
- 相关项目规范和已确认决定；
- 结果最低要求；
- 需要人类决定的事项。

Task Frame 可以由 Agent 从自然语言中生成；用户能够看到并核对所有会实质改变目标的解释。

### Result Envelope

概念上至少表达：

- 对当前任务的直接结论；
- 关键证据和适用范围；
- 对项目约束的遵守情况；
- 影响、风险和替代方案；
- 不确定项、未检查部分和需要人类回答的问题；
- 是否满足完成条件；
- Knowledge Delta 候选。

结果结构只统一语义，各类任务可以使用最适合当前读者的版式。

### Knowledge Delta

只包含可能跨任务复用的新增、修正、冲突、失效或待确认知识。任务回答、临时调试记录、完整工具输出和中间推理默认不进入 Delta。

## 7. Functional Requirements

### F1 — Preserve Natural-language Intent

- 用户直接使用自然语言提出任务；
- 系统保留原始请求，并让解释后的目标可比较；
- 发现关键歧义时请求澄清，并让所有影响目标的假设保持可见；
- Agent 可以提出更好的调查方向，但必须标为建议。

### F2 — Select Relevant Context

- 只装配与任务有关的项目事实、规范、决定、风险和未知项；
- Base 不必完整进入模型上下文；
- 来源、scope 和状态随内容一起提供；
- Canonical Base 和人类确认决定拥有长期当前语义；handoff、README 和历史回答分别承担游标、入口和历史职责。

### F3 — Preserve Model Autonomy

- Agent 根据仓库、任务和模型能力选择语言工具、文件顺序、调查深度和推理方式；
- Agent 可以扩大调查范围，但应说明与目标的关系；
- 模型能力提升时，核心契约无需因更好的执行方法而改变；
- 较弱模型需要的额外提示作为可选支持，并保持强模型路径简洁。

### F4 — Review Outcomes

- 检查结果是否回答任务目标和完成条件；
- 检查是否违反相关项目规范；
- 检查关键结论是否有足以支持其强度的证据；
- 检查事实、推断、建议和人类决定是否分开；
- 检查影响、未知项和人工决策点是否充分暴露；
- 结果 Review 通过不等于用户验收或 Knowledge Delta 已晋升。

### F5 — Scale Evidence With Risk

- 局部低风险任务可以使用轻量证据；
- 结构性变更、全局否定结论和正式 Gate 需要更强的范围与盲区说明；
- “没有发现”保留实际调查范围；“项目中不存在”同时提供与结论强度匹配的覆盖说明；
- 运行时或外部系统无法由静态仓库证明时必须明确限制。

### F6 — Promote Durable Knowledge Deliberately

- Delta 内容只有在跨任务有价值时才成为 Base candidate；
- 每项 candidate 保留来源、scope、状态和必要的未知项；
- 用户目标、架构取舍、规范和风险接受需要明确人类确认；
- Base 更新由 Knowledge Delta、来源、scope、冲突检查和确认状态共同决定；
- 持久化内容聚焦可复用知识，并清理重复、任务局部和敏感信息。

### F7 — Produce Human Material From The Same Base

- 根据人的实际问题选择资料形式，不一次生成全部视图；
- 内容从具体用途、输入输出和完整行为开始，再进入内部机制；
- 相同事实和关系跨资料复用同一 Base 身份和来源；
- 生成资料可以删除并重建，不影响长期知识；
- 人类修改中的语义变更形成新的 Base candidate，确认后重新生成资料。

### F8 — Remain Provider-neutral

- 核心语义不依赖某个模型名、上下文长度或供应商工具协议；
- 不同模型可以产生不同调查过程和表达；
- 验收比较方向、规范遵守、证据、未知项和结果效用；
- 只有真实能力差异要求时，才增加可选模型配置或降级策略。

## 8. Success Criteria

纵向案例进入实现前必须证明：

1. 用户可以核对 Agent 对目标和完成条件的理解，没有关键静默改写。
2. 强模型无需固定扫描步骤即可选择与仓库匹配的调查和验证方式。
3. 结果明确回答 Design 问题，并引用足够证据、scope 和未知项。
4. 一个看似完整但偏离目标或违反规范的结果会被 Review 识别。
5. 高风险的全局结论会说明覆盖边界；普通局部任务不会被迫提交完整审计包。
6. Knowledge Delta 明显小于任务回答，只保留跨任务有价值的内容。
7. 推断、建议和人类确认不会自动升级。
8. 至少两种人类资料表现来自同一批已确认知识，没有独立维护重复事实。
9. 不熟悉项目的读者能描述项目用途、一次关键行为和一个主要约束，并能返回证据或模块位置。
10. 机制数量与真实失败相称；模型已经可靠完成的部分保持由模型负责。

首轮不预设漂亮的百分比阈值。先记录失败、人工修正量、有效知识增量和读者困惑，再决定量化门槛。

## 9. Architecture Health Conditions

MVP 持续满足以下条件：

- 体系聚焦任务方向和结果质量，模型保留调查与推理自由；
- Task Frame 比原始请求更易核对，并忠实保持用户意图；
- 每次任务只产生少量可复用 Base 内容；
- 人类资料从 Base 生成并随同一知识更新；
- 模型专用提示保持可选，公共路径保持简洁；
- 工具和 UI 对应已经观察到的确定性需求；
- 治理和复核带来的收益高于其使用成本。

## 10. Work Plan by Task and Function

| Task | Function | Status |
|---|---|---|
| R0 | 确认薄治理与伴生资料双目标 | Accepted |
| R1 | 固定最小 Task Frame、Result Envelope 和 Knowledge Delta 语义 | Current |
| R2 | 对固定项目执行一次由 Agent 自主规划的 Design Golden Run | Next |
| R3 | 根据真实失败缩减或增强契约 | After R2 |
| R4 | 将同一次运行的 Delta 晋升为最小 Base，并生成两种人类资料 | After R3 |
| R5 | 比较另一强模型或独立运行的结果性质 | After R4 |
| R6 | 根据重复缺口选择最小 Skill、Rule、Hook、MCP 或工具 | After validation |

## 11. Open Questions

1. 第一条 Design Golden Run 的确切用户任务和完成条件是什么？
2. 结果 Review 首轮由人直接完成，还是允许第二个模型先提出问题供人判断？
3. 哪些项目规范必须常驻，哪些应按任务从 Base 选择？
4. Knowledge Delta 的最小可审查形式是什么？
5. 第一对人类资料采用“连续技术说明 + 流程/关系图”，还是“应用框架 + 模块详情”？
6. 如何记录读者困惑而不把个人浏览状态写进 Base？
7. 项目正式名称、License 和发布方式是什么？

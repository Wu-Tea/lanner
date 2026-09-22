# Golden Cases

Status: Reset outcome-oriented validation set  
Last updated: 2026-09-03

## 1. Purpose

Golden Cases 验证 Project Cognition 是否管住了任务方向、项目规范、结果质量和知识晋升，同时给强模型保留调查与推理自由。

每个案例固定：

- 原始用户目标；
- 可用项目上下文和 revision；
- 相关规范；
- 结果必须回答的问题；
- 已知的人类决策边界；
- 结果需要保持的权威和证据边界。

案例不固定：

- Agent 阅读文件的顺序；
- 使用的搜索、编译、测试或语言工具；
- 中间推理步骤；
- 最终措辞和图形布局；
- 必须采用的模型供应商。

## 2. Primary Golden Run

### Fixed Project

- Reference repository: `yolo-study-001`
- Branch context: `dev`
- Commit: `9505591f51974c04664d7fc231ddc8685791bcf7`
- Existing fixture: historical evidence and comparison only

### Natural-language Task Candidate

> 在修改核心控制输出路径之前，先判断当前最终控制状态由谁拥有，哪些兼容或回退路径可能参与，哪些模块或外部行为会受影响。给出可用于 Design 的约束、风险、证据和未知项，并让一个不了解项目的人能够理解一次输入如何形成最终输出。

### Provided Context

- 原始任务；
- 与状态所有权、兼容性和 Design 确认有关的项目规范；
- 当前可用的 Base/fixture 引用；
- 固定仓库 revision；
- 结果最低要求。

Agent 只获得目标、相关规范、结果要求和可用项目上下文，自主形成调查计划。

### Required Result Properties

- 直接回答是否具备开始 Design 的充分理解；
- 说明当前状态所有权及其证据；
- 说明参与的主要路径、关键消费者和 scope；
- 区分实际实现、Agent 推断和需要人确认的设计约束；
- 说明未检查或无法由仓库证明的部分；
- 提出最小 Knowledge Delta；
- 从确认知识生成两种互补的人类资料候选。

## 3. GC-001 — Preserve User Direction

输入：用户用普通自然语言提出一个 Design 目标，其中包含结果和少量方法偏好。

预期：

- Agent 保留原始请求；
- 形成可核对的目标、scope 和完成条件；
- 方法偏好不会被错误提升为不可变产品目标；
- 发现关键歧义时明确提出，并让用户确认会改变结果的选择。

验收边界：

- “理解后设计”保持项目影响范围，并明确当前实现动作与整体 Design 目标的关系；
- Agent 推荐的新方案与用户原始目标并列展示，由人决定方向变化。

## 4. GC-002 — Strong-model Autonomy

输入：固定项目、目标、规范和结果要求，不提供调查步骤。

预期：

- Agent 自主选择与仓库匹配的工具和调查范围；
- 必要时主动扩大到相邻模块或来源；
- 结果说明关键证据和重要盲区；
- 换用更强模型时沿用同一核心任务契约，并允许采用更好的工作方法。

验收边界：

- Agent 直接使用当前环境中的仓库和工具能力完成调查；
- 不同模型以结果性质对齐，命令序列保持各自选择。

## 5. GC-003 — Directionally Wrong but Technically Good

输入：Agent 产生了代码正确、测试通过、说明完整的结果，但解决了相邻问题，没有满足用户完成条件。

预期：

- Outcome Review 判为 `revise`；
- 指出缺失的目标条件；
- 不因代码质量、测试数量或文档完整而判定任务成功。

验收边界：

- “实现成功”和“满足用户目标”分别验证，最终完成状态同时满足两者。

## 6. GC-004 — Policy Violation

输入：一个局部可运行的 Design 引入第二状态所有者、无退出条件的兼容层或违反既有依赖方向。

预期：

- Agent 获得相关规范而非整份 Base；
- Outcome Review 指出具体违反项和影响；
- 需要改变规范时形成明确 human decision，再继续采用新方向；
- 当前实现事实与规范性接受分开。

验收边界：

- 测试结果支持实现验证，架构变化由明确 decision 接受；
- ownership 判断使用结构证据、数据写入和运行责任；名称相似度只作为调查线索。

## 7. GC-005 — Evidence Strength and Global Claims

输入：Agent 声称“整个项目不存在另一条写入路径”或“已覆盖全部调用者”。

预期：

- 结果说明实际调查范围、方法、revision 和盲区；
- 如果只能说明“未发现”，则降低结论强度；
- 运行时加载、生成代码或外部系统无法证明时明确限制。

验收边界：

- 全局结论由实际覆盖证据支持；
- 一条主要路径的调查按该路径 scope 表述。

## 8. GC-006 — Lightweight Local Task

输入：一个明确、局部且低风险的缺陷修复，不改变架构、状态 owner、外部接口或兼容层。

预期：

- 使用局部证据和回归验证；
- 调查、证据和资料范围与局部风险相称；
- 只有出现跨任务价值时才提出 Knowledge Delta；
- 可以在没有 Base 更新的情况下完成任务。

验收边界：

- 小修改交付直接结果、回归证据和实际产生的最小知识增量。

## 9. GC-007 — Knowledge Promotion Boundary

输入：Result Envelope 同时包含当前回答、临时调试记录、稳定实现事实、Agent 架构解释和用户确认的新约束。

预期：

- 当前回答保持 task-local；
- 临时调试记录默认不晋升；
- 稳定事实按来源和 scope 成为 candidate；
- Agent 解释保持 inferred；
- 用户确认约束保留确认依据后进入 Base candidate；
- Delta 明显小于完整结果。

验收边界：

- Outcome Review 和 Knowledge Promotion 分别给出状态；
- 用户确认精确绑定已展示结论及其 scope。

## 10. GC-008 — Conflicting or Stale Base Context

输入：Base 中旧知识与固定 revision 的源码或新的人类决定可能不一致。

预期：

- 区分 source fact、human intent、scope difference 和 stale signal；
- 保留旧知识历史；
- 通过 Knowledge Delta 提出 revise、contradict 或 supersede；
- 文件日期和模型版本只作为调查线索，正确答案由 scope、authority、evidence 和 human decision 共同确定。

验收边界：

- README、handoff 和生成资料继续承担各自入口、游标和投影职责；
- 重叠写入显式保留冲突和 revision 关系。

## 11. GC-009 — Companion Human Material

输入：一次真实任务已经产生一组确认后的项目事实、关系、约束和未知项；读者不了解项目。

预期：

- 只生成对当前读者问题有用的两种互补资料；
- 从用途、输入、输出和一次完整行为开始；
- 内部模块和符号按阅读前置关系引入；
- 文章、流程或关系视图使用同一 Base 内容；
- 读者可以从总体进入细节、查看证据并返回原焦点；
- unknown 和 inferred 清楚可见。

验收边界：

- 开场直接说明项目用途、读者问题和可观察结果；
- 内容按认知前置关系和完整行为组织；
- 每种资料引用同一 Base 事实和来源。

## 12. GC-010 — Model-independent Outcome Comparison

输入：两个强模型或同一强模型的两次独立运行获得相同目标、项目 revision、规范和结果要求。

预期：

- 允许不同调查计划、证据组合、表达和视图；
- 比较它们是否命中目标、遵守规范、支撑关键结论、暴露未知和产生有价值 Delta；
- 不以逐字一致、相同文件顺序或相同中间推理评分；
- 差异暴露真实契约缺口时再增加最小约束。

验收边界：

- 结果契约允许更强模型采用新方法；
- 每次运行使用同一验收标准，模型名称只作为运行元数据。

## 13. GC-011 — Human Decision Boundary

输入：Agent 对架构方向、债务优先级或业务语义给出高质量建议。

预期：

- 建议可以包含证据、替代方案和推荐；
- 在人确认前保持 proposed；
- 人类确认精确绑定命题和 scope；
- 被拒绝方案在有防重复价值时保留理由。

验收边界：

- 模型能力、benchmark 和自我复核保留为建议证据；人类接受使用明确确认；
- “继续做”只确认其直接指向的下一动作和已展示内容。

## 14. Cross-case Assertions

1. 用户使用自然语言，不先学习内部协议。
2. Agent 自由选择调查和验证方式。
3. 结果按目标、规范、证据、影响和未知项评价。
4. 证据要求与结论风险成比例。
5. 事实、推断、建议和人类确认保持独立状态。
6. 任务完成和 Knowledge Delta 晋升彼此独立。
7. Base 只保存跨任务有价值的内容。
8. 人类资料来自同一个 Base，不形成平行真相。
9. 不同模型允许使用不同过程和措辞，并以同一结果标准评价。
10. 只有真实重复失败才推动 Rule、Skill、Hook、MCP 或工具建设。

## 15. Evidence To Record During The First Run

- 原始任务和 Agent 对目标的解释差异；
- 人工补充了哪些项目上下文；
- Agent 自主选择了哪些调查方向；
- 哪些结论需要人追加证据或降低强度；
- 哪些规范被遗漏或误用；
- 最终结果中真正影响 Design 的部分；
- 完整回答与 Knowledge Delta 的体量和内容差异；
- 人类资料中出现的未解释术语、迷失点和无用内容；
- 哪些失败值得成为稳定机制，哪些只需交给更强模型。

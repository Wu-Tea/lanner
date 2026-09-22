# Engineering Knowledge Semantics Contract

Status: Semantic contract with collaboration extension; design unverified
Last updated: 2026-09-22

## 1. Purpose

本契约定义 Project Cognition 在任务结果和 Canonical Base 中如何谈论“知道了什么”。它保护知识语义边界，Agent 继续使用适合项目的调查方式，存储 Schema 由纵向案例验证后确定。

## 2. Knowledge Kinds

| Kind | Meaning | Typical Authority |
|---|---|---|
| `derived_fact` | 代码、配置、构建、Git 或工具可直接支持的实现事实 | bound repository source |
| `declared_intent` | 目标、边界、架构理由、规范和非回归原则 | explicit human decision or policy |
| `observed_evidence` | 某次测试、运行、benchmark 或环境观察 | bound execution artifact |
| `inferred_explanation` | Agent 综合一个或多个来源形成的解释 | sourced model inference |
| `ephemeral_context` | 当前任务、下一动作、临时假设和阻塞 | current conversation or handoff |

不同 kind 各自回答不同问题：代码支持实现事实，decision 支持设计理由，测试支持绑定条件下的行为，用户确认支持接受状态，任务上下文支持当前工作游标。

## 3. Independent State Questions

任何需要长期使用的内容都必须能够回答：

- 它是直接观察还是推断？
- 如果涉及取舍，人是否已经确认？
- 它当前有效、已替代还是已退休？
- 证据对当前 scope/revision 是否仍充分？
- 它只是任务候选，还是已经进入 Base？

确切枚举暂不冻结。旧 `schemas/claim.schema.json` 把多个问题压在一个 `status` 中，只是历史验证资产。

## 4. Source Capability

| Source | Can Support | Required Complement |
|---|---|---|
| Source/config/build | 某 revision 的实现、默认值和声明依赖 | 业务原因、推荐策略、真实运行值 |
| Test/build result | 指定命令、环境和 revision 下的结果 | 全局正确、用户验收 |
| Runtime evidence | 一次绑定运行的实际行为 | 长期规范或所有环境行为 |
| Human decision | 目标、规范、取舍和风险接受 | 实现已经完成 |
| Agent inference | 跨来源解释、关系和候选建议 | 人类确认或直接观察 |
| Generated material | 对 Base 的人类解释 | 新的权威事实 |

## 5. Evidence Reference

关键证据至少说明：

- 定位：文件、符号、commit、命令产物、decision 或外部规范；
- scope：仓库、revision、profile、环境或时间；
- 观察方式；
- 实际看到什么；
- 它支持什么结论；
- 哪些相关结论还需要其他来源补充。

普通局部任务可以只引用少量直接证据。结论越全局、风险越高，越需要说明调查范围和盲区。

## 6. Scope and Conflict

只有满足全部条件时才视为 confirmed conflict：

1. topic 相同；
2. scope 明确重叠；
3. value 不兼容；
4. 来源都在回答同一种问题；
5. 没有 revision、时间或 supersede 关系解释差异。

否则应区分：

- `scope difference`：不同 profile、环境、branch 或时间下合法共存；
- `stale signal`：相关来源变化，需要复核但尚未证明错误；
- `needs review`：scope、来源能力或语义不足以判断；
- `competing inference`：相同证据存在多个尚未确认的解释。

## 7. Human Confirmation

human-confirmed 由明确人工动作产生：

- 谁确认；
- 确认了哪个命题和 scope；
- 何时确认；
- 依据哪个任务、评审或 decision。

Agent 完成、测试结果和文件写入分别保留为任务状态、验证证据和持久化事实；人类确认精确绑定已展示命题和 scope。

## 8. Staleness

语义复核由以下依赖和证据变化触发；文件日期可以作为检查提示：

- 被引用的文件、符号、配置或测试消失或改变；
- 上游知识被修正或 supersede；
- 适用 profile、环境或接口改变；
- 人类决定被显式替代；
- 新任务发现与当前知识竞争的证据。

复核前保留旧知识和原始 scope，不静默改写历史。

## 9. Promotion Semantics

知识进入 Base 只代表值得跨任务保存，不代表：

- 它由人类确认；
- 它已经完全验证；
- 它适用于所有 scope；
- 它必须出现在所有人类资料中。

Promotion 必须保留原有 epistemic、acceptance、scope 和 evidence 边界。

## 10. Presentation Semantics

- inferred、proposed、stale 和 human-confirmed 使用文字、图标或可访问标签表达；
- “未记录”不等于“已证明不存在”；
- 间接关系保留路径语义；
- 摘要压缩文字时保留原有结论强度和 scope；
- 读者友好的解释可以由模型重新组织，但必须能回到 Base 或来源。

## 11. Open Decisions

1. 首版持久格式如何表达独立状态维度。
2. 哪些 evidence 只保留定位，哪些需要保留可重复运行摘要。
3. reusable inferred explanation 是否允许按策略自动进入 Base。
4. 如何在允许不同措辞的同时，对齐不同模型结果中的 stable topic。

## 12. 协作记录的语义

参与者的陈述是可观察的交流事实，但其内容不因此成为已验证的项目事实。manager 综合属于有来源的解释；决定须绑定决定者及其授权 scope，Agent 归属不自动提供项目决策权。

工作状态由任务条件与来源支持，session 结束、任务完成、目标达成和人工接受分别表达。tag 是主题线索，不证明工作关联或因果；稳定对象、实际依赖和决定替代关系按来源核实。重复导入不增加命题权威，多个摘要重复同一来源不算独立证据。

跨用户综合保留授权可见范围、read basis 和覆盖缺口，不能凭时间较新覆盖另一个范围的决定。详见[协作契约](project-collaboration-contract.md)。

# Human Knowledge View Contract

Status: Reset draft 0.1  
Phase: companion human knowledge  
Last updated: 2026-09-03

## 1. Purpose

本契约定义如何把真实 Agent 工作中已经晋升的项目认知，组织成对人类友好的资料。

人类资料让读者用较低负担回答一个真实项目问题，并能继续进入所需细节或证据。Base 结构和 Agent 工作过程只在读者当前问题需要时出现。

## 2. Companion Generation

资料生成发生在真实项目任务之后：

```text
Agent completes a real task
→ reusable Knowledge Delta
→ promotion into Canonical Base
→ identify a human question and reader baseline
→ generate the smallest useful projection
```

资料生成范围跟随本次任务产生的可复用知识：局部变化更新局部资料，形成新整体认知时再更新项目入口。

## 3. Reader-first Principles

### Start From Observable Reality

首次接触项目的读者先知道：

1. 这个程序或组件实际做什么；
2. 它接收什么；
3. 它最终产生什么外部可观察结果；
4. 一次完整行为怎样发生；
5. 然后才进入内部模块、类型和机制。

### Order By Prerequisite

- 新名词第一次出现时，用项目中的具体角色解释；
- 后续内容只依赖前面已经建立的概念；
- 不按目录、类列表或 Agent 的调查顺序倾倒内容；
- 章节延续同一上下文，不反复从空泛宏观叙事重新开始。

### Use The Right Form

- 连续因果解释用文章；
- 稳定边界和组成用框架图；
- 时间、控制、数据或状态变化用流程；
- 局部职责和内部机制用模块详情；
- 依赖、调用、读写和 ownership 用关系视图；
- 来源、scope、状态和限制用证据详情。

形式服务问题；每个主题选择能够最直接承载当前关系的形式。

## 4. Minimal View Request

一次资料请求概念上只需要：

```yaml
human_question: 读者要回答什么问题
reader_baseline: 已经知道什么、不知道什么
focus: 当前项目对象、行为或路径
base_read_basis: 使用哪些已确认知识
desired_form: optional
depth: overview | focused | evidence
next_question: 读完后最自然的继续方向
```

Agent 根据内容选择表现形式，固定模板提供一致性辅助，阅读判断决定最终结构。

## 5. View Families

这些是按读者问题选择的表达方式：

| View | Human Question |
|---|---|
| Project entry | 这个项目做什么，我从哪里开始？ |
| Application framework | 有哪些运行单元，边界和外部交互在哪里？ |
| Runtime/data flow | 一次真实行为中的控制、数据或事件怎样移动？ |
| Module detail | 一个模块接收什么、负责什么、怎样完成并产生什么？ |
| Relationship view | 当前对象调用、依赖、读写、拥有或影响什么？ |
| Technical explanation | 一个机制为什么存在、怎样运行、如何验证和排障？ |
| Evidence detail | 这个结论来自哪里，适用到哪里，还有什么不知道？ |
| Task learning path | 为完成一个具体任务，需要按什么顺序理解项目？ |

## 6. Navigation and Mental Location

资料需要支持从总体进入细节，也要能返回：

```text
project landmark
→ select one behavior or object
→ open flow / module / relationship / explanation
→ inspect evidence if needed
→ return to the same focus and parent context
```

要求：

- 当前焦点和来路始终可见；
- 展开局部信息后保留上层对象；
- 跨视图时尽量保持同一 Base 身份；
- 不强迫用户回到首页重新定位；
- 不把所有关系一次铺成全仓库毛球。

页面坐标、缩放、临时筛选、展开和浏览历史由 interaction state 承载；Base 保存项目语义。

## 7. Relationship Presentation

关系视图只展示能够明确表达的关系：

- from 和 to；
- 有意义的关系动词；
- 方向；
- scope 或触发条件；
- observed 或 inferred；
- 需要时可查看证据。

规则：

- “未记录”和“已证明不存在”使用不同状态；
- 间接路径保留完整中间节点和路径语义；
- 语义边由明确关系、scope、状态和证据产生；
- 默认从一个 focus 展示有限邻域，需要时再扩展；
- 关系可以由 Agent 在当前任务中推断，但进入 current 资料前须遵守 Base 状态边界。

## 8. Technical Explanation

一份面向不了解项目的说明，推荐按认知依赖组织：

1. 用途、输入、输出和运行边界；
2. 一次从开始到结果的完整行为；
3. 行为中出现的模块与责任；
4. 关键机制、状态和条件；
5. 失败方式、限制和验证入口；
6. 需要时才展开源码符号和历史理由。

内容持续满足：

- 用具体项目用途和读者问题开场；
- 用可观察行为建立概念；
- 在内部类名出现前说明其所在过程和责任；
- 每章承接前文已经建立的上下文；
- 抽象总结连接完整行为、例子或证据。

## 9. State and Evidence Visibility

- inferred、proposed、human-confirmed、stale 和 unknown 使用文字、图标和颜色共同说明；
- 默认正文保持流畅，不把证据元数据塞进每句话；
- 重要结论能按需展开 source、revision、scope 和 limitation；
- 冲突内容并列显示，不由 renderer 选择“正确答案”；
- preview 与 current 资料必须可区分。

## 10. Burden Controls

首轮评估至少记录：

- 读者能否复述项目用途、输入、输出和一条关键行为；
- 第一次遇到的未解释术语；
- 为找答案发生的来回跳转；
- 进入细节后是否知道自己仍在项目的哪个位置；
- 是否能够返回来源或证据；
- 哪些内容虽然正确但对当前问题没有帮助。

不预先冻结节点数量、字数和页面数量。先用真实读者问题发现负担来源。

## 11. Projection Ownership

- 所有 current 语义来自一个 Base revision；
- 投影可以由 LLM 按需重新编排和表达；
- 同一事实跨文章、流程和关系视图不分别维护；
- 持久化资料至少记录 Base/read basis；
- 人工语义修正先成为 Knowledge Delta；
- 资料可以删除和重建，Base 知识保持完整；
- renderer 和 UI 可以更换而不改变知识身份。

## 12. Historical Fixtures

以下现有内容只作为研究输入：

- `docs/examples/project-cognition-output-walkthrough.md`：早期 L0–L3 渐进输出实验；
- `docs/examples/yolo-study-001-reference-preview.html`：连续技术说明实验；
- `docs/examples/yolo-study-001-base-store/`：多视图和关系交互实验。

它们可以提供阅读反馈、项目证据和失败样本，但不冻结当前数据结构、视图分类、UI 或实现技术。

## 13. Open Decisions

1. 首个伴生资料选择哪两个互补形式。
2. 人类资料按需生成还是选择性保存到 Git。
3. 如何让读者反馈形成 projection 改进，而不污染 Base 事实。
4. 哪些 stable identity 必须在首个纵向案例中保留。
5. 何时需要通用 renderer，何时让模型直接生成最终资料更合适。

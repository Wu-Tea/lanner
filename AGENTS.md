# AGENTS.md

## Startup

- 进入本仓库后，先读 `.agent-context/handoff.md`。
- 再读与当前任务有关的决定、最近日志和规范段落；[README](README.md) 提供按问题选择的入口，无需通读所有资料。
- handoff 与仓库事实出现差异时，先报告差异，再以正确来源重新定位当前任务。
- 案例分析遵循 [案例记录规则](docs/cases/README.md)。基线快照、归档和 `output/` 备份按追溯需要查阅；日常定位先查当前正式文档，避免历史副本混入检索结果。

## Current Phase

- 当前处于 R1：资料、能力边界与逻辑架构设计；主线是“薄治理能力优先，人类资料伴生”。用户于 2026-09-07 要求先整理设计，新的实施指令到来前，Skill 接入、应用开发和 Golden Run 留待后续。
- [能力目标](docs/product/capability-goals.md) 维护产品要求。新应用须方便传播，并比 `agent-context-sync` 更完善、更好用；能力覆盖、可靠接续、人工使用与维护负担分别比较，文件或功能数量不能证明达成。

## Attention Order

说明按“当前任务 → 已有上下文 → 相关规范 → 主要动作 → 可见结果 → 按需展开边界与历史”组织。用正向责任、输入输出和完成条件描述能力，安全、证据与权威性边界保持明确。

## Product Mainline

Project Cognition 稳定维护四件事：

1. `direction`：当前任务目标、scope、完成条件和人类决策点；
2. `policy`：项目已确认并适用于当前任务的规范；
3. `outcome`：结果需要回答、证明和暴露的内容；
4. `knowledge promotion`：任务发现进入长期 Base 的条件。

Agent 自主选择调查、工具、深度、推理、验证和表达，能可靠完成的归纳、画图与自查直接由模型承担。过程约束以真实项目失败为依据，并保持最小充分。

## Work Rules

- 接受普通自然语言任务，保留原请求，用简短 Task Frame 表达目标、scope、完成条件、相关规范和人类决策点；对目标、scope 或完成条件的实质调整须对用户可见。
- 首次接入支持独立全项目调查与建模，不依赖旧会话或开发任务；说明覆盖、来源、关系和未知。从零项目区分目标/设计与已实现事实，无需自建通用解析器。
- 按任务选择事实、规范、决定、风险和未知；目标/方案变化、新增能力、进入新模块或遇到相关失败时，主动查找现有能力、经验和研发路径并核实适用性。
- 新能力、验证过的修复、试验结果和用户纠正及时形成候选，候选捕获与长期准入分开。
- 结果核对目标、规范、证据、影响和未知；重要完成条件绑定实际产物或执行证据，标明核验方式及满足、不满足或尚未验证。细则见 [任务与结果契约](docs/contracts/agent-output-contract.md)。
- 材料与证据强度随任务影响和结论风险变化：普通局部任务保持轻量，全局结论同时说明调查范围与盲区。

## Knowledge Rules

- 写入知识时按 [知识语义](docs/contracts/knowledge-contract.md) 区分种类、来源与生命周期状态；推断标为 inferred，用户确认绑定具体命题与 scope。
- 代码/配置支持实现事实，已确认 decision 支持业务原因与架构取舍，测试/运行证据绑定 revision 与环境。人类明确维护目标、规范、取舍和风险接受。
- Task Result 服务本次任务；Knowledge Delta 提出候选，Promotion 按 [长期知识契约](docs/contracts/base-knowledge-contract.md) 更新 Base，仅保留有跨任务价值的事实、关系、风险、决定与重要未知及其来源、scope、状态和不确定性。
- 冲突比较 topic、scope、value、authority 与 supersede；过期判断依据依赖、影响和证据变化，保留原始历史。

## Human-facing Content

- 资料使用已确认 Base，共享语义身份和来源；语义修改先形成 Delta，经确认更新 Base 后重建资料，见 [资料所有权](docs/contracts/projection-ownership-contract.md)。
- 围绕读者的实际问题，用可观察用途、输入输出、运行边界和完整例子引入概念；按问题选择文章、流程或关系等形式，帮助定位影响、未知与待决定事项。
- 每个入口突出一个问题和主要下一动作；从总体进入细节时保持焦点，能查看证据并返回。细则见 [人类资料契约](docs/contracts/visual-view-contract.md)。

## Implementation Rules

- 先用方向、规范和结果契约解决问题，通过 Golden Case 与真实任务识别重复失败，再选择机制；具体语言、供应商、存储、集成和 UI 按验证需要决定，核心契约保持中立。
- Agent 负责项目语义理解；工具负责确定性校验、记录、引用完整性、持久化、集成、自动触发和可重建投影。
- Skill 聚焦可复用能力并保留执行自由；Hook 触发已确认检查点，人工决定仍需明确确认。职责设计见 [架构](docs/architecture/information-system-architecture.md)。

## Verification

- [Golden Cases](docs/validation/golden-cases.md) 固定目标、可用上下文、revision、规范、预期结果性质和验收边界；跨模型比较方向、规范、证据、未知与结果可用性。
- 确定性实现用机器测试；自评、离线 benchmark、生成成功与真实用户验收分开记录，体验结论区分合成评测和真实反馈。
- 单次成功、后续复用、独立运行、人的实际使用与成本收益各有对应证据。

## Safety and Privacy

- 写入长期资料前清理 secrets、cookies、tokens、私钥、完整私人对话和无关个人信息。
- 破坏性修改、历史重写、生产发布、数据迁移和覆盖用户数据遵循明确授权。

## Context Maintenance

- 重要设计、实现或评审后使用 Agent Context Sync 更新 `.agent-context/`。
- handoff 只保留当前目标、状态、唯一下一动作、阻塞和问题；session-log 保存历史，decision 保存长期理由。细则已有归属时更新其所有者，入口保留摘要或引用。

## Reporting

- 对用户按“任务”和“功能”汇报。
- 完成工作后报告改了什么、为什么、验证结果、剩余限制和下一动作。

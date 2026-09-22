# project-cognition

`project-cognition` 帮助 Coding Agent 在项目中持续做对事情，并把工作中形成的有效认知留给后续 Agent 和人类成员。

用户继续用普通自然语言说明目标。系统为当前任务提供相关项目规范、已确认事实和完成条件；Agent 自主理解仓库、选择工具、执行工作并验证结果；有长期价值的发现经过确认后进入 Canonical Base，再按人的问题生成易于理解的项目资料。

## 首先理解这条工作路径

```text
用户说明要完成的事情
        ↓
系统明确目标、相关规范和完成条件
        ↓
Agent 自主调查、推理、执行和验证
        ↓
交付当前任务结果
        ↓
提取可供后续任务复用的 Knowledge Delta
        ↓
确认后更新 Canonical Base
        ↓
生成当前读者需要的项目资料
```

**当前唯一下一步：** 固定第一条真实 Design 请求、相关项目规范和完成条件，然后让强模型自主完成 [Primary Golden Run](docs/validation/golden-cases.md#2-primary-golden-run)。项目状态和当前问题见 [当前交接](.agent-context/handoff.md)。

## 目标一：让 Agent 的工作持续对齐项目

Project Cognition 为每次工作提供四类稳定条件：

### Direction

说明本次任务要达到的结果、适用范围、完成条件和需要人类决定的事项。原始用户请求会被保留，Agent 对目标的解释可以被核对和修正。

### Policy

提供本次任务真正相关的项目规范、架构约束、既有决定和风险边界。Agent 获得完成任务所需的上下文，同时保留对仓库和工具的自主判断。

### Outcome

检查结果是否回答了用户目标、满足完成条件、遵守项目规范，并用与结论风险相称的证据说明影响和未知项。

### Knowledge Promotion

把当前回答与长期知识分开。稳定事实、重要关系、项目规范、已确认决定、长期风险和关键未知项可以形成 Knowledge Delta，经审查后进入 Canonical Base。

## 目标二：伴生产生人类资料

资料库随着真实项目工作持续生长。每次 Design、实现、评审或排障都可能补充一小部分可复用知识；这些知识进入 Base 后，再根据读者当前的问题组织成合适的形式：

- 项目入口帮助读者建立用途和边界；
- 应用框架说明运行单元和外部交互；
- 流程说明一次控制、数据或事件如何从输入到输出；
- 模块详情解释局部职责和内部机制；
- 关系视图回答调用、依赖、读写、所有权和影响；
- 技术说明把一个完整主题按阅读前置关系连续讲清楚；
- 证据入口让读者核对来源、scope、状态和未知项。

这些资料共享同一个 Base 身份和来源。读者可以从总体进入细节，在不同表现形式之间保持当前焦点，并随时返回上层位置。

## 模型与系统的分工

Agent 发挥模型自身能力完成：

- 识别仓库技术栈和运行边界；
- 选择源码、Git、构建、编译、测试、语言服务或其他工具；
- 决定调查范围、工作深度和验证方式；
- 追踪调用、数据、状态和影响；
- 形成解释、设计、实现、图形和当前任务结果。

Project Cognition 提供持续治理：

- 保持用户方向和完成条件；
- 选择相关项目规范和长期认知；
- 检查结果质量、证据和未知项；
- 管理知识晋升、冲突、确认和生命周期；
- 为人类资料提供统一且可追溯的内容基础。

模型能力提升后可以采用更好的调查、推理和表达方法，以上治理语义保持稳定。

## 当前纵向验证

第一阶段使用固定的 `yolo-study-001/dev@9505591f51974c04664d7fc231ddc8685791bcf7`，完成一次 Design Golden Run：

1. 固定一条真实自然语言任务；
2. 明确相关项目规范和完成条件；
3. 让强模型自主选择调查与验证方法；
4. 评审方向、规范、证据、影响和未知项；
5. 从合格结果中提取最小 Knowledge Delta；
6. 用确认后的知识生成两种互补的人类资料；
7. 根据真实失败决定需要增加的规则、Skill、Hook、MCP 或工具。

完成这次纵向验证后，再选择实现语言、物理 Base、自动化边界和资料承载方式。

## 文档入口

- [MVP 规格](docs/product/mvp-spec.md)
- [信息系统架构](docs/architecture/information-system-architecture.md)
- [Agent 工作与结果契约](docs/contracts/agent-output-contract.md)
- [Base Knowledge 契约](docs/contracts/base-knowledge-contract.md)
- [知识语义契约](docs/contracts/knowledge-contract.md)
- [资料所有权与投影契约](docs/contracts/projection-ownership-contract.md)
- [人类资料视图契约](docs/contracts/visual-view-contract.md)
- [Golden Cases](docs/validation/golden-cases.md)
- [当前交接](.agent-context/handoff.md)

早期 L0–L3 walkthrough、yolo 技术说明、多视图 fixture 和 Claim Schema 保留为研究材料，用于复盘阅读负担、交互和知识表达经验。

## License

License 将在正式发布或引入第三方实现前确定，并同时完成依赖许可审查。

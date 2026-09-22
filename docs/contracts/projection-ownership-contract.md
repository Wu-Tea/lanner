# Information Ownership and Projection Contract

Status: Reset draft 0.1  
Last updated: 2026-09-03

## 1. Purpose

本契约为源码、Base、README、Agent 上下文、任务回答和人类资料分配明确职责，使每类当前信息都有唯一权威所有者。

基本规则：

> 每类信息和 scope 由一个权威所有者维护；其他文件提供证据、当前任务游标、历史或面向特定读者的投影。

## 2. Artifact Roles

| Artifact | Owns | Connects To |
|---|---|---|
| Source/config/build | 指定 revision 的实现和机器声明 | Base 中的来源引用和实现解释 |
| Test/runtime evidence | 绑定条件下的观察 | 被验证命题、revision 和环境 |
| Decision record | 人类确认的理由、替代方案和复核条件 | Base 中受约束的当前知识 |
| Canonical Base | 长期知识的当前登记、scope、状态、关系和来源引用 | 工程来源、decision 和投影 |
| Task Frame | 当前任务方向和完成条件 | 原始用户请求、相关规范和 Base 内容 |
| Result Envelope | 当前任务结果、证据、影响和未知项 | Outcome Review 和 Knowledge Delta |
| Knowledge Delta | 对 Base 的候选变化 | read basis、来源和 promotion decision |
| Human projection | 特定读者的问题和表现 | Base 身份、scope 和证据 |
| README | 项目入口和文档路由 | 当前规格、资料和 handoff |
| AGENTS.md | Agent 行为、证据、写入和汇报规则 | 当前任务和项目规范入口 |
| handoff.md | 当前目标、唯一下一动作、阻塞和引用 | decision、Base 和 session history |
| session-log.md | 历史里程碑 | 当时的 decision、Base revision 和工作结果 |

## 3. Allowed Information Flow

```text
Authoritative sources + human decisions + current Base
→ selected context and Task Frame
→ Agent work and Result Envelope
→ Knowledge Delta candidate
→ promotion / conflict review / confirmation
→ new Canonical Base revision
→ human projections and future Agent context
```

人类在文章、README、图或其他资料中提出语义修改时，该修改形成 Knowledge Delta，经过正常晋升后再生成新的 current 资料。

## 4. README Contract

README 只应包含：

- 一句稳定项目用途；
- 当前主线的简短说明；
- 主要规范、案例和 handoff 的链接；
- 必要的安装或贡献入口。

当前模块、运行路径、依赖、设计理由、风险和冲突通过 Base 投影进入资料；当前 Session 状态由 handoff 提供。README 使用链接和简短入口把读者引向这些所有者。

## 5. AGENTS Contract

AGENTS.md 可以规定：

- 启动读取顺序；
- 模型执行自由和必要的过程边界；
- 方向、规范、结果和知识晋升规则；
- 证据、确认、隐私、验证和汇报要求。

当前应用结构、模块职责和数据流由 Base 管理；AGENTS.md 指向相应读取方式。

## 6. Context Contract

### handoff.md

只保存：

- 当前目标和状态；
- 唯一下一动作；
- 阻塞和当前问题；
- 相关 decision、Base 或 Golden Run 引用；
- 何时应视为过期。

### session-log.md

保存历史里程碑和当时确认状态。当前方向由 handoff 和 Base 提供，历史记录保持当时语境。

### decisions/

保存长期理由、被拒绝替代方案和复核条件。Base 只引用 decision，不复制完整理由。

## 7. Base and Projection

- Base 拥有长期语义身份和当前登记；
- projection 拥有读者、问题、选择范围、解释顺序和表现形式；
- current projection 只使用 accepted Base revision；
- candidate Delta 只能生成显式 preview；
- 投影可以缓存，也可以按需重建；
- 投影可以删除和重建，renderer 可以更换，Base 知识保持完整；
- 相同事实和关系跨视图引用同一 Base 身份和 scope。

首版不强制每个投影生成复杂 manifest。只要投影会被保存为 current，至少需要知道它使用的 Base revision 和关键记录引用。

## 8. Human Editing

| Edit Type | Correct Path |
|---|---|
| 只改变措辞或布局 | 修改 projection instruction/template 后重建 |
| 更正项目事实 | 提出 Knowledge Delta，验证后更新 Base |
| 新增设计理由 | 创建或更新 human-confirmed decision，再引用到 Base |
| 记录临时批注 | 留在任务或个人交互状态，不自动进入 Base |
| 修改生成图的语义边 | 修正 Base relation 或标记 inferred candidate |

## 9. Drift

- Base 改变而保存的资料未更新：projection stale；
- handoff 指向旧任务或旧 Base：context stale；
- Base 与源码可能不一致：Agent 重新调查；
- 两个人类决定冲突：显式 scope 分离或 supersede；
- session history 保留当时状态，当前入口继续使用 handoff 和 Base；
- 人工修改生成资料：保留 diff，判断是表现修改还是新知识。

时间戳提示检查，语义判断继续使用依赖、scope 和来源证据。

## 10. Privacy

- 不把完整私人对话写入 Base 或投影来源；
- 不保存 secrets、cookies、tokens、私钥或无关个人数据；
- 不把本机私有配置自动投影为共享项目规范；
- Agent 读取权限可以大于 Base 和资料写入权限。

## 11. Validation Checklist

- 这个信息主题是否有唯一 owner？
- 当前文件是在提供证据、记录历史、指向任务还是展示 Base？
- 生成资料是否能定位其 Base/read basis？
- 人工语义修改是否经过 Delta 和 promotion？
- 删除投影是否不会丢失长期知识？
- 移除 `.agent-context` 是否不会摧毁 Base？
- README 是否保持清晰入口，并把动态知识交给 Base 投影？
- 同一事实是否没有在多个资料中分别维护？

## 12. Open Decisions

1. 哪些人类资料需要持久化，哪些按需生成。
2. 保存投影的最小 provenance 形式。
3. 未来中立 decision 位置与 `.agent-context/decisions` 的迁移方式。
4. Base 尚未实现时，首个 Golden Run 的 Delta 如何人工审阅而不产生平行真相。

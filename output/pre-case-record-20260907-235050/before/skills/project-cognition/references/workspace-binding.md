# 项目绑定

> 未采纳草稿；仅供设计审阅，未安装或运行。下表是曾提出的映射，当前 Base 的目录与存储形式未确定。状态见 [草稿入口](../SKILL.md)。

本包将通用 Skill 的角色映射到当前项目已有 owner，不要求上游目录结构。

## 在 Project Cognition 仓库内

以下路径相对本仓库根目录；根目录由当前工作区确定，不由 Skill 安装位置猜测。

| 角色 | 读取或写入落点 |
| --- | --- |
| 接续游标、历史和确认理由 | `.agent-context/handoff.md`、`session-log.md`、`decisions/`，遵循 Agent Context Sync |
| 产品目标与验收要求 | `docs/product/mvp-spec.md`；目标导读为 `docs/product/capability-goals.md` |
| 项目规范 | 根 `AGENTS.md` 和当前任务相关契约 |
| Base 与语义来源索引 | `knowledge/base.md`；首次接入仅登记已有确认命题 |
| 知识候选与准入记录 | `knowledge/changes/` |
| 本次运行材料 | `output/` 下本次任务目录；需要跨任务保留的内容另走 Delta |
| 人类资料 | `docs/` 下适合当前读者的落点，记录 Base 读取基点 |

按需读取的语义契约：任务和交付用 `docs/contracts/agent-output-contract.md`；知识准入用 `docs/contracts/base-knowledge-contract.md`；人类资料用 `docs/contracts/visual-view-contract.md`。目录存在不代表运行已验证，索引中的目标也不代表产品已经实现。

## 用于其他项目

先恢复宿主上下文，寻找现有规范、决定、知识和资料 owner。通过现有项目入口或一份简短绑定说明记录落点。继续使用宿主已确认的规则、原有文件和授权边界。

尚无 Base 时，可在用户授权范围内提出或建立最小来源索引；目标和架构取舍引用已有确认，未确认内容保留 candidate。位置尚未确定且写入会覆盖已有资料时，先处理位置或授权问题；当下的调查和任务回答不依赖创建整套记忆文件。

本包不假定全局数据库、固定模型、后台服务、Hook、独立 reviewer 或特定画图平台已经可用。

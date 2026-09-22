# 哪些知识值得后续任务取回

[返回案例](analysis.md) · [业务图](business-map.md) · [推荐详解](route-recommendation.md) · [历史证据](wutea-history.md)

这些是本次 Task Result 提出的 Knowledge Delta，scope 仅为 `yxyw-safe-check` 的 `8af0fc2d4c6ab064efbcc0154a543ba08eb98b3e`。记录状态为 **candidate / proposed**，没有晋升为已确认 Base；observed 描述观察方式，不能替代人工接受。它们不改变 Project Cognition 的核心目标、架构或实施阶段。

第二轮新增 [提交优化方案来源](submission-reassessment.md)。文档对问题和收益的表述记为 document-reported；当前实现记为 observed，措施是否完整落地和效果是否达标分别保留。文档不自动成为人工批准或操作指令。

## 候选清单

| topic / 种类 | 候选知识、来源与状态 | 何时值得取回 / 何时复核 |
| --- | --- | --- |
| YSC-K01 业务骨架 / relationship | 对象—内容—路线—计划—任务—记录/缺陷构成主要业务关系；计划生成任务的责任位于 `InspectLineServiceImpl.createPlan`。observed，来自 [S19–20](evidence/source-catalog.md#s19)、[S38–40](evidence/source-catalog.md#s38)；角色归纳 inferred | 新人接手、改任务生成或路线结构时取回；相关实体、计划生成入口变化时复核 |
| YSC-K02 资产模型翻译 / reusable capability | `TranslateUtils` / `CapitalTranslateHandler` 可补对象模型，来源随 `project.equipment` 分支变化，资产分支读取当前线程项目上下文。observed [S07–09](evidence/source-catalog.md#s07)；“17e722f7 为解决上下文丢失”未证明 | 新增资产字段、换数据源、调整线程时取回；不能默认在任意工作线程直接复用 |
| YSC-K03 推荐输入输出 / capability + risk | 已有推荐入口接受对象 ID 与起点，返回最多三条顺序；结果存在随机距离改写和距离语义不一致。observed [S04–18](evidence/source-catalog.md#s04)、[数值实验](evidence/distance-probe.json) | 用户提出路线排序或优化时先检查现有能力及限制；坐标契约、算法、DTO/VO 改动时失效复核；不是已验收导航能力 |
| YSC-K04 历史访问关系 / risk + unknown | 当前 SQL 按任务分区却按任务创建时间排序，不能由此确定任务内对象访问次序。observed [S11](evidence/source-catalog.md#s11)；真实顺序来源 unknown | 使用历史权重、分析巡检习惯时取回；SQL 或事件记录时间发生变化时复核 |
| YSC-K05 任务执行与逾期 / fact | `runStatus` 与独立 `overdue` 并存；旧枚举中的 4 不能作为唯一逾期依据。observed [S28–30](evidence/source-catalog.md#s28) | 改任务筛选、状态统计、告警时同时查消费者；状态迁移、列表 SQL 或定时器改动时复核 |
| YSC-K06 提交成功边界 / relationship + unknown | V2 的任务处理与部分结果保存跨越同步/MQ 边界；收到 taskId 不证明所有关联表已写完。observed [S23–26](evidence/source-catalog.md#s23)，投递可靠性/幂等效果 unknown | 提交后立即查询、报表缺数据、并发上传和重试需求时取回；生产/消费或 broker 配置变化时复核 |
| YSC-K07 存储尝试 / development path | 扫码记录经历批量→逐条→MQ；“检查明细回退”标题需按实际 diff 校正。observed Git `6a2b50f8`、`403675b6`；回退原因 unknown | 优化保存性能前取回历史定位，再找当时压测/故障证据；不形成“禁止批量”的规范 |
| YSC-K08 时间生成与快照 / relationship + unknown | 发送端取消 inspectTime 赋值，消费保存后快照会解引用该时间；数据库默认值未在已查迁移中定位。observed `8af0fc2d`、[S23–26](evidence/source-catalog.md#s23)、[S36–37](evidence/source-catalog.md#s36) | 修改时间语义、数据库或对象快照时取回；实际 DDL/消费逻辑变化时复核。不能记录“数据库默认值已存在” |
| YSC-K09 可复用维护入口 / capability | 已有路线复制/对象导出、任务委托、对象快照、批量报告和离线预取入口。[S19](evidence/source-catalog.md#s19)、[S27](evidence/source-catalog.md#s27)、[S31–36](evidence/source-catalog.md#s31)；实现定位 observed，完整可用性未验证 | 用户请求同类能力时先核实输入输出与适用条件；运行失败或接口变化时更新能力状态 |
| YSC-K10 历史文档适用性 / stale signal | README 的 Registry 说明与当前构建 Nacos 依赖存在陈旧信号。observed [S01–02](evidence/source-catalog.md#s01)；部署事实 unknown | 准备启动、迁移环境或说明依赖时取回；以实际 profile 和运行日志补证，不能单靠 README 推断 |
| YSC-K11 附件分离 / capability + development path | 文档报告 Base64 内嵌请求改为附件先上传、业务引用 fileToken；V2 有相应后端路径，Base64 兼容路径仍在。[方案对照](submission-reassessment.md)、[S47–48](evidence/source-catalog.md#s47) | 修改离线同步、弱网上传、附件处理时取回；App 版本、文件服务或兼容分支变化时复核；性能收益未独立实测 |
| YSC-K12 异步保障 / design intent + unknown | 文档提出完整性、幂等、Redis 补发、死信及有限延迟重试；当前仅定位部分机制，不能把方案视为全部实现。[方案对照](submission-reassessment.md)、[S46](evidence/source-catalog.md#s46) | 改提交成功语义、重放、消费异常和运维补偿时取回；分别核查设计、代码和运行证据，避免“有 ID 就幂等”的无条件推断 |

这里的 topic 是案例内的稳定引用建议，不是确定的产品字段设计。人类资料与这些候选共同引用源码事实；本轮是候选预览，没有绕过 Base 准入创建第二套已确认知识。

## 两个后续使用场景

**任务：“把路线推荐的前置查询进一步并行化。”** 应取回 K02 与 K03，检查资产翻译读取的线程上下文、模型填充与距离计算顺序，打开 `17e722f7` 的实际 diff。正确使用是基于当前条件判断怎样适配；仅引用“以前同步化过，所以不允许并行”仍不合格。

**任务：“优化巡检批量提交，提交后立即导出报告。”** 应取回 K06、K07、K08，分开任务返回、明细/扫码/附件消费完成和导出读取时间；按真实数据核验。不能根据“有 MQ”认定已保证可靠性，也不能把标题中的“record detail”错误推广到全部明细存储。

以上是 proposed 验收场景，没有派发新任务或执行 Golden Run。后续若观察复用，分别记录知识是否被提供、是否打开来源、是否用于方案判断，以及是否产生了可验证的结果。

## 第二轮修订与仍待补充的历史原因

K06 补入设计依据：文档希望减少同步写库引起的前端等待和确认不一致；保留“返回与最终完成分离”的 observed 关系。K07 中 MQ 选择动机现有 document-reported 来源，扫码批量回退原因仍 unknown。相应候选的实现可用性和风险接受状态没有升级。

需要业务维护者或原始材料补充的命题：

1. 推荐要优化哪种业务目标，三条路线的产品区别是什么，是否允许近似或演示数据？
2. 资产坐标单位/顺序、空间层级命名、真实巡检访问顺序的权威来源是什么？
3. 已有文档说明附件分离和 MQ 选择背景；扫码批量回退、Translate 同步化的具体原因，以及各项修复/性能验收的原始证据是什么？
4. 当前部署是否具有 `inspect_time` 默认值或触发器，它代表实际检查时间还是服务端入库时间？

这些问题不阻碍本次源码资料规整，但会影响业务规则确认、风险接受和后续修复。缺少答案时保留 unknown，不通过重复引用或措辞强化为事实。

## 对当前产品设计只提出验收建议

PC-G0 应检验业务关系与覆盖盲区，不能只数枚举文件；PC-G2 应检验下一次任务是否实际找到并复核入口；PC-G4 应检验“标题—diff—当前实现—执行证据”的差异是否保留；PC-G5 应让人从业务问题到源码和历史，不要求先理解一套知识字段。

这些是对既有目标的案例化验收建议，尚未修改核心能力文档、契约或架构。是否准入案例知识、是否接受某项业务解释和是否采用验收方案，是不同决定。

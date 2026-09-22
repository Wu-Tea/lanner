# 来源与阅读覆盖

案例源码 revision：`8af0fc2d4c6ab064efbcc0154a543ba08eb98b3e`。调查日：2026-09-13。

锚点指向当前本地文件；若源码发生变化，先用 JSON 中的 revision、路径与 SHA-256 复核。源码事实属于目标仓库，本文不保存源码全文、邮箱、配置值或凭据。完整枚举不等于逐文件理解；下表说明实际阅读深度。

Git 历史以 [提交清单](wutea-commits.json) 的完整 hash 和 paths 定位；命令使用 `git show --format=fuller <hash> -- <path>` 时应自行避免转存作者邮箱及敏感配置。

## S01

[README.md:1](E:/work/yxyw/yxyw-safe-check/README.md:1)

生成器说明与历史构建入口。

## S02

[build.gradle:40](E:/work/yxyw/yxyw-safe-check/build.gradle:40)

构建版本、依赖与 profile 分流；未构建。

## S03

[src/main/java/com/ecidi/dam/MicroSafeCheckServiceApp.java:35](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/MicroSafeCheckServiceApp.java:35)

Spring 应用与 Feign / discovery 入口。

## S04

[src/main/java/com/ecidi/dam/modules/controller/InspectLineRecommendController.java:37](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/controller/InspectLineRecommendController.java:37)

推荐 HTTP 契约；读全文件。

## S05

[src/main/java/com/ecidi/dam/modules/dto/RecommendLineQuery.java:13](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/dto/RecommendLineQuery.java:13)

推荐输入；读全文件。

## S06

[src/main/java/com/ecidi/dam/modules/service/impl/InspectLineServiceImpl.java:883](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/service/impl/InspectLineServiceImpl.java:883)

推荐编排；读完整方法。

## S07

[src/main/java/com/ecidi/dam/modules/entity/InspectObject.java:56](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/entity/InspectObject.java:56)

对象关联资产及 Translate 注解；字段核对。

## S08

[src/main/java/com/ecidi/dam/modules/util/TranslateUtils.java:38](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/util/TranslateUtils.java:38)

模型翻译入口及处理链。

## S09

[src/main/java/com/ecidi/dam/modules/util/translate/impl/CapitalTranslateHandler.java:58](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/util/translate/impl/CapitalTranslateHandler.java:58)

资产来源、配置分支、ThreadLocal；读全文件。

## S10

[src/main/java/com/ecidi/dam/client/CapitalClient.java:96](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/client/CapitalClient.java:96)

扩展字段 Feign 契约。

## S11

[src/main/resources/mapper/InspectObjectMapper.xml:85](E:/work/yxyw/yxyw-safe-check/src/main/resources/mapper/InspectObjectMapper.xml:85)

历史边权 SQL；读完整查询。

## S12

[src/main/java/com/ecidi/dam/modules/util/shortpath/DistanceMatrixUtil.java:19](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/util/shortpath/DistanceMatrixUtil.java:19)

距离计算与矩阵；读全文件。

## S13

[src/main/java/com/ecidi/dam/modules/util/shortpath/MatrixWeightUtil.java:11](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/util/shortpath/MatrixWeightUtil.java:11)

空间与历史加权、合并；读全文件。

## S14

[src/main/java/com/ecidi/dam/modules/util/shortpath/PathfindingUtils.java:28](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/util/shortpath/PathfindingUtils.java:28)

起点选择；读全文件。

## S15

[src/main/java/com/ecidi/dam/modules/util/shortpath/algorithm/AStarPathfinding.java:16](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/util/shortpath/algorithm/AStarPathfinding.java:16)

搜索与距离汇总；读全文件。

## S16

[src/main/java/com/ecidi/dam/modules/util/shortpath/model/Node.java:8](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/util/shortpath/model/Node.java:8)

优先队列比较；读全文件。

## S17

[src/main/java/com/ecidi/dam/modules/util/shortpath/model/PathResult.java:99](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/util/shortpath/model/PathResult.java:99)

ETA 计算；读全文件。

## S18

[src/main/java/com/ecidi/dam/modules/vo/LineFinderObjectVo.java:35](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/vo/LineFinderObjectVo.java:35)

输出二次加工；读全文件。

## S19

[src/main/java/com/ecidi/dam/modules/controller/InspectLineController.java:38](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/controller/InspectLineController.java:38)

路线、计划、导出与复制入口；注解/方法核对。

## S20

[src/main/java/com/ecidi/dam/modules/service/impl/InspectLineServiceImpl.java:206](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/service/impl/InspectLineServiceImpl.java:206)

计划展开并直接创建任务；读完整方法。

## S21

[src/main/java/com/ecidi/dam/modules/service/impl/InspectPlanServiceImpl.java:92](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/service/impl/InspectPlanServiceImpl.java:92)

关闭计划及未来任务；读完整方法。

## S22

[src/main/java/com/ecidi/dam/modules/controller/InspectTaskAppController.java:148](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/controller/InspectTaskAppController.java:148)

App 提交、状态及委托入口；注解/方法核对。

## S23

[src/main/java/com/ecidi/dam/modules/service/impl/InspectTaskAppServiceImpl.java:2017](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/service/impl/InspectTaskAppServiceImpl.java:2017)

V2 编排、Redis 与异步边界；读完整方法。

## S24

[src/main/java/com/ecidi/dam/modules/service/impl/InspectTaskAppServiceImpl.java:1525](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/service/impl/InspectTaskAppServiceImpl.java:1525)

提交内部实际生产消息处；定向片段。

## S25

[src/main/java/com/ecidi/dam/util/mq/InspectMqSender.java:25](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/util/mq/InspectMqSender.java:25)

MQ 发布；读全文件。

## S26

[src/main/java/com/ecidi/dam/util/mq/InspectMqConsumer.java:28](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/util/mq/InspectMqConsumer.java:28)

消费持久化、ack/nack/死信；定向核对。

## S27

[src/main/java/com/ecidi/dam/modules/service/impl/InspectTaskAppServiceImpl.java:1957](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/service/impl/InspectTaskAppServiceImpl.java:1957)

委托前置条件与状态更新；读完整方法。

## S28

[src/main/java/com/ecidi/dam/modules/service/impl/InspectTaskRecordServiceImpl.java:576](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/service/impl/InspectTaskRecordServiceImpl.java:576)

任务开始/暂停/结束及负责人；读完整方法。

## S29

[src/main/java/com/ecidi/dam/job/TaskJob.java:59](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/job/TaskJob.java:59)

10 分钟逾期检查、告警和消警；定向片段，仅保存定位。

## S30

[src/main/java/com/ecidi/dam/modules/enums/InspectTaskRunStatus.java:7](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/enums/InspectTaskRunStatus.java:7)

任务状态枚举；读全文件。

## S31

[src/main/java/com/ecidi/dam/modules/controller/AppVersionSyncController.java:42](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/controller/AppVersionSyncController.java:42)

离线下载/合并/预取入口；注解/方法核对。

## S32

[src/main/java/com/ecidi/dam/modules/controller/InspectTaskRecordController.java:349](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/controller/InspectTaskRecordController.java:349)

批量报告；入口及调用核对。

## S33

[src/main/java/com/ecidi/dam/modules/service/impl/InspectTaskRecordServiceImpl.java:1912](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/service/impl/InspectTaskRecordServiceImpl.java:1912)

报告实现定位；方法清单，未完整追踪文件链。

## S34

[src/main/java/com/ecidi/dam/modules/service/impl/BugMainServiceImpl.java:503](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/service/impl/BugMainServiceImpl.java:503)

外部问题回写巡检缺陷；读完整方法。

## S35

[src/main/java/com/ecidi/dam/modules/controller/InspectRecordDetailController.java:41](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/controller/InspectRecordDetailController.java:41)

对象快照入口；读全文件。

## S36

[src/main/java/com/ecidi/dam/modules/service/impl/InspectRecordDetailServiceImpl.java:77](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/service/impl/InspectRecordDetailServiceImpl.java:77)

快照来源与时间字段消费者；读完整方法。

## S37

[src/main/java/com/ecidi/dam/modules/entity/InspectRecordDetail.java:129](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/entity/InspectRecordDetail.java:129)

巡检时间字段；字段核对。

## S38

[src/main/java/com/ecidi/dam/modules/entity/InspectTaskRecord.java:42](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/entity/InspectTaskRecord.java:42)

任务关联计划/路线、状态和负责人；字段核对。

## S39

[src/main/java/com/ecidi/dam/modules/entity/InspectObjectContent.java:28](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/entity/InspectObjectContent.java:28)

对象检查内容；字段核对。

## S40

[src/main/java/com/ecidi/dam/modules/entity/InspectLineObject.java:29](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/entity/InspectLineObject.java:29)

路线与对象关联；字段核对。

## S41

[src/main/java/com/ecidi/dam/modules/controller/InspectObjectController.java:41](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/controller/InspectObjectController.java:41)

对象管理入口；注解/方法核对。

## S42

[src/main/java/com/ecidi/dam/modules/controller/InspectContentController.java:34](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/controller/InspectContentController.java:34)

标准库入口；注解/方法核对。

## S43

[src/main/java/com/ecidi/dam/modules/controller/StatisticsController.java:23](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/controller/StatisticsController.java:23)

统计入口；注解/方法核对。

## S44

[gradle.properties:13](E:/work/yxyw/yxyw-safe-check/gradle.properties:13)

本地构建版本，仅记录非敏感字段定位。

## S45

[gradle/wrapper/gradle-wrapper.properties:3](E:/work/yxyw/yxyw-safe-check/gradle/wrapper/gradle-wrapper.properties:3)

Gradle wrapper 版本。

## S46

[src/main/java/com/ecidi/dam/util/mq/InspectMqConfig.java:27](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/util/mq/InspectMqConfig.java:27)

第二轮：全部队列与 DLX 配置，读全文件。

## S47

[src/main/java/com/ecidi/dam/modules/service/impl/InspectTaskAppServiceImpl.java:1875](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/service/impl/InspectTaskAppServiceImpl.java:1875)

第二轮：保留的 Base64 上传路径；定向片段。

## S48

[src/main/java/com/ecidi/dam/modules/service/impl/InspectTaskAppServiceImpl.java:2240](E:/work/yxyw/yxyw-safe-check/src/main/java/com/ecidi/dam/modules/service/impl/InspectTaskAppServiceImpl.java:2240)

第二轮：V2 随手拍与附件同步保存；读完整方法。

## S49

[src/main/resources/config/application-prod.yml:46](E:/work/yxyw/yxyw-safe-check/src/main/resources/config/application-prod.yml:46)

第二轮：仅核对 listener 确认模式与并发字段，未转存其他配置。

"""Build a source index with revision, line anchors and byte hashes, not source copies."""
from pathlib import Path
import hashlib
import json
import subprocess

ROOT = Path(r'E:\work\yxyw\yxyw-safe-check')
OUT = Path(__file__).resolve().parent
J = 'src/main/java/com/ecidi/dam/'
specs = [
 ('S01','README.md','# microSafeCheckService','生成器说明与历史构建入口'),
 ('S02','build.gradle','sourceCompatibility=1.8','构建版本、依赖与 profile 分流；未构建'),
 ('S03',J+'MicroSafeCheckServiceApp.java','@SpringBootApplication','Spring 应用与 Feign / discovery 入口'),
 ('S04',J+'modules/controller/InspectLineRecommendController.java','@RequestMapping(','推荐 HTTP 契约；读全文件'),
 ('S05',J+'modules/dto/RecommendLineQuery.java','public class','推荐输入；读全文件'),
 ('S06',J+'modules/service/impl/InspectLineServiceImpl.java','public List<LineFinderObjectVo> recommendLines','推荐编排；读完整方法'),
 ('S07',J+'modules/entity/InspectObject.java','private Long capitalId','对象关联资产及 Translate 注解；字段核对'),
 ('S08',J+'modules/util/TranslateUtils.java','public void translateModelStatisticsCost(List','模型翻译入口及处理链'),
 ('S09',J+'modules/util/translate/impl/CapitalTranslateHandler.java','public Object beforeTranslate','资产来源、配置分支、ThreadLocal；读全文件'),
 ('S10',J+'client/CapitalClient.java','ApiResponseBody<List<CapitalExtendVo>> extendList','扩展字段 Feign 契约'),
 ('S11','src/main/resources/mapper/InspectObjectMapper.xml','<select id="historyVisits"','历史边权 SQL；读完整查询'),
 ('S12',J+'modules/util/shortpath/DistanceMatrixUtil.java','private static final BigDecimal EQUATOR_RADIUS','距离计算与矩阵；读全文件'),
 ('S13',J+'modules/util/shortpath/MatrixWeightUtil.java','public class MatrixWeightUtil','空间与历史加权、合并；读全文件'),
 ('S14',J+'modules/util/shortpath/PathfindingUtils.java','public static int findClosestNode(List<InspectObject> objectList, String','起点选择；读全文件'),
 ('S15',J+'modules/util/shortpath/algorithm/AStarPathfinding.java','public PathResult findPath','搜索与距离汇总；读全文件'),
 ('S16',J+'modules/util/shortpath/model/Node.java','public class Node','优先队列比较；读全文件'),
 ('S17',J+'modules/util/shortpath/model/PathResult.java','public void calculateDuration','ETA 计算；读全文件'),
 ('S18',J+'modules/vo/LineFinderObjectVo.java','public static LineFinderObjectVo build','输出二次加工；读全文件'),
 ('S19',J+'modules/controller/InspectLineController.java','@RequestMapping("/api/inspect/line")','路线、计划、导出与复制入口；注解/方法核对'),
 ('S20',J+'modules/service/impl/InspectLineServiceImpl.java','public InspectPlan createPlan','计划展开并直接创建任务；读完整方法'),
 ('S21',J+'modules/service/impl/InspectPlanServiceImpl.java','public void clonePlanAndTask','关闭计划及未来任务；读完整方法'),
 ('S22',J+'modules/controller/InspectTaskAppController.java','@PostMapping("/saveCacheInspectV2")','App 提交、状态及委托入口；注解/方法核对'),
 ('S23',J+'modules/service/impl/InspectTaskAppServiceImpl.java','public Result<Object> saveCacheInspectV2','V2 编排、Redis 与异步边界；读完整方法'),
 ('S24',J+'modules/service/impl/InspectTaskAppServiceImpl.java','inspectMqSender.send(InspectMqEnum.INSPECT_NORMAL','提交内部实际生产消息处；定向片段'),
 ('S25',J+'util/mq/InspectMqSender.java','public void send(','MQ 发布；读全文件'),
 ('S26',J+'util/mq/InspectMqConsumer.java','public class InspectMqConsumer','消费持久化、ack/nack/死信；定向核对'),
 ('S27',J+'modules/service/impl/InspectTaskAppServiceImpl.java','public Result<InspectTaskRecord> assignDelegation','委托前置条件与状态更新；读完整方法'),
 ('S28',J+'modules/service/impl/InspectTaskRecordServiceImpl.java','public Result<Map<String, Object>> updateInspectTaskStatus','任务开始/暂停/结束及负责人；读完整方法'),
 ('S29',J+'job/TaskJob.java','public void updateTaskStatus','10 分钟逾期检查、告警和消警；定向片段，仅保存定位'),
 ('S30',J+'modules/enums/InspectTaskRunStatus.java','public enum','任务状态枚举；读全文件'),
 ('S31',J+'modules/controller/AppVersionSyncController.java','public class AppVersionSyncController','离线下载/合并/预取入口；注解/方法核对'),
 ('S32',J+'modules/controller/InspectTaskRecordController.java','public void batchRecordReport','批量报告；入口及调用核对'),
 ('S33',J+'modules/service/impl/InspectTaskRecordServiceImpl.java','public void batchRecordReport','报告实现定位；方法清单，未完整追踪文件链'),
 ('S34',J+'modules/service/impl/BugMainServiceImpl.java','public Result<Boolean> syncDefectsStatus','外部问题回写巡检缺陷；读完整方法'),
 ('S35',J+'modules/controller/InspectRecordDetailController.java','@GetMapping("/inspect-object-snapshots','对象快照入口；读全文件'),
 ('S36',J+'modules/service/impl/InspectRecordDetailServiceImpl.java','public Result<InspectObjectSnapshotDTO> findByContentResultId','快照来源与时间字段消费者；读完整方法'),
 ('S37',J+'modules/entity/InspectRecordDetail.java','private Date inspectTime','巡检时间字段；字段核对'),
 ('S38',J+'modules/entity/InspectTaskRecord.java','private Long planId','任务关联计划/路线、状态和负责人；字段核对'),
 ('S39',J+'modules/entity/InspectObjectContent.java','public class','对象检查内容；字段核对'),
 ('S40',J+'modules/entity/InspectLineObject.java','public class','路线与对象关联；字段核对'),
 ('S41',J+'modules/controller/InspectObjectController.java','public class','对象管理入口；注解/方法核对'),
 ('S42',J+'modules/controller/InspectContentController.java','public class','标准库入口；注解/方法核对'),
 ('S43',J+'modules/controller/StatisticsController.java','public class','统计入口；注解/方法核对'),
 ('S44','gradle.properties','spring_boot_version=','本地构建版本，仅记录非敏感字段定位'),
 ('S45','gradle/wrapper/gradle-wrapper.properties','distributionUrl=','Gradle wrapper 版本'),
 ('S46',J+'util/mq/InspectMqConfig.java','private Map<String, Object> withDLX','第二轮：全部队列与 DLX 配置，读全文件'),
 ('S47',J+'modules/service/impl/InspectTaskAppServiceImpl.java','public FileInfoDTO getFileId','第二轮：保留的 Base64 上传路径；定向片段'),
 ('S48',J+'modules/service/impl/InspectTaskAppServiceImpl.java','private void saveCachePhotoWithId','第二轮：V2 随手拍与附件同步保存；读完整方法'),
 ('S49','src/main/resources/config/application-prod.yml','acknowledge-mode:','第二轮：仅核对 listener 确认模式与并发字段，未转存其他配置'),
]
revision = subprocess.check_output(['git','-C',str(ROOT),'rev-parse','HEAD'], text=True).strip()
refs = []
for sid, rel, anchor, scope in specs:
    p = ROOT / rel
    raw = p.read_bytes()
    lines = raw.decode('utf-8-sig').splitlines()
    matches = [i for i, line in enumerate(lines, 1) if anchor in line]
    assert len(matches) == 1, (sid, rel, matches)
    refs.append(dict(id=sid, path=rel, line=matches[0], anchor=anchor, total_lines=len(lines),
                     sha256=hashlib.sha256(raw).hexdigest(), scope=scope, revision=revision))
(OUT/'source-refs.json').write_text(json.dumps(refs, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
md = ['# 来源与阅读覆盖', '', f'案例源码 revision：`{revision}`。调查日：2026-09-13。', '',
      '锚点指向当前本地文件；若源码发生变化，先用 JSON 中的 revision、路径与 SHA-256 复核。源码事实属于目标仓库，本文不保存源码全文、邮箱、配置值或凭据。完整枚举不等于逐文件理解；下表说明实际阅读深度。', '',
      'Git 历史以 [提交清单](wutea-commits.json) 的完整 hash 和 paths 定位；命令使用 `git show --format=fuller <hash> -- <path>` 时应自行避免转存作者邮箱及敏感配置。', '']
for ref in refs:
    md += [f'## {ref["id"]}', '', f'[{ref["path"]}:{ref["line"]}]({ROOT.as_posix()}/{ref["path"]}:{ref["line"]})', '', ref['scope']+'。', '']
(OUT/'source-catalog.md').write_text('\n'.join(md), encoding='utf-8')
print(f'Indexed {len(refs)} references in {len(set(r["path"] for r in refs))} distinct source files.')

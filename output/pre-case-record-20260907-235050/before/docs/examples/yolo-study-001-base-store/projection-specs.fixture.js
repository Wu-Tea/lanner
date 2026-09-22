window.YOLO_CASE_PROJECTIONS = {
  fixtureVersion: "0.1",
  baseId: "base.yolo-study-001.native-gamepad",
  focusContract: {
    defaultFocusId: "module.runtime-loop",
    preserveAcrossViews: true,
    fallbackByView: {
      framework: "runtime.cod-native-runtime",
      flow: "flow.default-control-tick",
      detail: "module.runtime-loop",
      relations: "module.runtime-loop",
      evidence: "module.runtime-loop"
    }
  },
  views: [
    {
      id: "view.yolo.application-framework",
      family: "application-framework",
      label: "整体框架",
      question: "这个应用读取什么、在哪里做判断、向哪里输出？",
      defaultFocusId: "runtime.cod-native-runtime",
      query: {
        nodeIds: [
          "external.physical-gamepad",
          "external.game-framebuffer",
          "entry.gamepad-start",
          "runtime.cod-native-runtime",
          "subsystem.input-boundary",
          "subsystem.vision",
          "subsystem.control",
          "subsystem.output",
          "external.game-input",
          "runtime.fusion-canvas"
        ]
      }
    },
    {
      id: "view.yolo.runtime-flow",
      family: "runtime-flow",
      label: "运行链路",
      question: "一次真实控制更新中，数据和控制按什么顺序移动？",
      defaultFocusId: "flow.default-control-tick",
      query: {
        flowIds: [
          "flow.default-control-tick",
          "flow.vision-engine-poll",
          "flow.controller-resolve",
          "flow.output-compose",
          "flow.config-resolution",
          "flow.fusion-observation"
        ]
      }
    },
    {
      id: "view.yolo.module-detail",
      family: "module-detail",
      label: "模块细节",
      question: "一个模块内部如何完成自己的职责，失败边界在哪里？",
      defaultFocusId: "module.runtime-loop",
      query: {
        moduleFlowMap: {
          "module.runtime-loop": "flow.default-control-tick",
          "module.vision-engine": "flow.vision-engine-poll",
          "module.native-gamepad-controller": "flow.controller-resolve",
          "module.output-composer": "flow.output-compose",
          "runtime.fusion-canvas": "flow.fusion-observation"
        }
      }
    },
    {
      id: "view.yolo.relationship-explorer",
      family: "relationship-explorer",
      label: "关系",
      question: "当前对象直接读取、调用、产生、约束或旁路发布什么？",
      defaultFocusId: "module.runtime-loop",
      query: {
        depth: 1,
        direction: "both",
        relationFamilies: ["structure", "call", "data", "authority", "config", "observation"]
      }
    },
    {
      id: "view.yolo.evidence-detail",
      family: "evidence-detail",
      label: "资料与证据",
      question: "这些说明来自哪个固定版本，哪些只是归纳，哪些仍待核对？",
      defaultFocusId: "module.runtime-loop",
      query: {
        includeSources: true,
        includeConflicts: true,
        includeVerification: true,
        includeGuide: true
      }
    }
  ]
};

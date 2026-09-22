window.YOLO_CASE_BASE = {
  meta: {
    baseId: "base.yolo-study-001.native-gamepad",
    revision: "fixture-2026-09-03.1",
    fixtureStatus: "design-evidence",
    title: "yolo-study-001 默认原生手柄路径",
    purpose: "把游戏画面、物理手柄输入和运行配置转成一个虚拟 Xbox 360 手柄状态，并可选发布只读的 Fusion 显示数据。",
    repository: "D:/work/AI/yolo-study-001",
    branchContext: "dev",
    commit: "9505591f51974c04664d7fc231ddc8685791bcf7",
    commitShort: "9505591",
    commitAt: "2026-09-01T20:24:43+08:00",
    capturedAt: "2026-09-03T15:20:00+08:00",
    readerBaseline: "不了解项目，但理解进程、模块、数据流和配置的基本含义",
    transportNote: "JSON-compatible JavaScript fixture; transport is provisional, semantic IDs are the experiment target."
  },

  scope: {
    included: [
      "默认 native C++ gamepad 启动路径",
      "一次控制 tick 的输入、视觉接收、控制求解、输出合成与 ViGEm 交付",
      "VisionEngine / VisionService / VisionDeliveryGate 的新帧边界",
      "TargetCoordinator 到 pre-recoil、AutoFire、recoil 的控制链",
      "可选 Fusion Canvas 观察支路",
      "配置来源合并与固定提交中可见的配置差异"
    ],
    excluded: [
      "参考仓库工作区未提交修改",
      "本机被 Git 忽略的 config.toml",
      "当前环境变量与实际 CLI 参数",
      "Python fallback、训练、recoil 采集工具链的内部结构",
      "音频方向研究",
      "未重新执行的硬件、游戏、DXGI、CUDA、TensorRT 与 ViGEm 实测"
    ],
    runtimeProfile: "production-default-path",
    effectiveRuntimeConfig: "unknown-without-local-file-environment-and-cli"
  },

  semantics: {
    knowledgeKinds: {
      derived_fact: "可由代码、配置或构建/运行声明直接得到的实现事实",
      declared_intent: "项目文档明确表达的目的、边界或维护意图",
      observed_evidence: "测试、运行或文档中记录的结果；不等于本次重新验证",
      ephemeral_context: "只对本次浏览状态有效的信息"
    },
    statuses: {
      observed: "固定提交中直接可见",
      inferred: "由多处证据归纳，未冒充源码原句",
      proposed: "仅为样例中的展示或建模选择",
      human_confirmed: "用户明确确认",
      superseded: "已被后续记录替代"
    }
  },

  sources: [
    {
      id: "src.launch.default-choice",
      type: "git-blob",
      title: "默认启动脚本选择 native runtime",
      path: "scripts/launch/gamepad_start.bat",
      ranges: [[5, 17]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "GAMEPAD_RUNTIME 为空、native、cpp 或 c++ 时进入 native_cpp；Python 必须显式选择。"
    },
    {
      id: "src.launch.native-runtime",
      type: "git-blob",
      title: "原生运行程序启动参数",
      path: "scripts/launch/gamepad_native_cpp_start.bat",
      ranges: [[5, 10], [66, 80]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "启动 cod_native_runtime.exe，并把 config.toml、性能日志和 AutoFire 选择传入进程。"
    },
    {
      id: "src.config.code-defaults",
      type: "git-blob",
      title: "运行配置代码默认值",
      path: "native/controller_native/runtime_config.h",
      ranges: [[12, 31], [172, 175], [201, 232]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "定义无配置覆盖时的视觉、调度和其他运行默认值，并记录每个值的 effective source。"
    },
    {
      id: "src.config.example",
      type: "git-blob",
      title: "维护中的原生配置模板",
      path: "config.native.example.toml",
      ranges: [[1, 19], [30, 47]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "模板使用 balanced profile、640x512 capture、480x384 tensor、160 Hz vision 和 1000 Hz controller tick。"
    },
    {
      id: "src.config.merge",
      type: "git-blob",
      title: "配置解析、覆盖与校验顺序",
      path: "native/controller_native/runtime_config.cpp",
      ranges: [[248, 271], [752, 912], [916, 989]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "以结构体默认值起步，应用 profile/文件、环境变量后校验；CLI 独立覆盖在 main 中继续应用。"
    },
    {
      id: "src.runtime.main",
      type: "git-blob",
      title: "原生进程入口",
      path: "native/runtime_app/main.cpp",
      ranges: [[34, 93], [141, 239], [303, 340]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "解析 CLI、加载配置、应用覆盖、可输出 effective config，随后构造并运行 RuntimeLoop。"
    },
    {
      id: "src.runtime.construct",
      type: "git-blob",
      title: "RuntimeLoop 依赖装配",
      path: "native/runtime_app/runtime_loop.cpp",
      ranges: [[455, 572]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "装配输入读取器、控制器、Viewport、VirtualGamepad、VisionEngine、可选 VisionService 与 Fusion publisher。"
    },
    {
      id: "src.runtime.tick",
      type: "git-blob",
      title: "一次 RuntimeLoop 控制更新",
      path: "native/runtime_app/runtime_loop.cpp",
      ranges: [[624, 803]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "读取物理输入、请求/接收视觉、通过 delivery gate、求解 ControlFrame、合成输出、交付 ViGEm，再执行观察支路。"
    },
    {
      id: "src.vision.service",
      type: "git-blob",
      title: "Vision latest-only mailbox 与交付闸门",
      path: "native/runtime_app/vision_service.h",
      ranges: [[16, 60], [80, 121]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "VisionService 暴露最新快照；VisionDeliveryGate 是进入控制器前的最终交付边界。"
    },
    {
      id: "src.vision.service-logic",
      type: "git-blob",
      title: "视觉快照新鲜度与唯一性检查",
      path: "native/runtime_app/vision_service.cpp",
      ranges: [[66, 99], [159, 247]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "拒绝非更新、无 ID、时间倒退、重复/回退或过期结果，并区分 Fresh 与 NoUpdate。"
    },
    {
      id: "src.vision.engine",
      type: "git-blob",
      title: "VisionEngine 捕获到选择的实现链",
      path: "native/vision_native/src/vision_engine.cpp",
      ranges: [[69, 145], [209, 294], [330, 503]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "DXGI capture 后执行 GPU preprocess、TensorRT、decode、selector，并产生带时序和身份字段的 VisionResult。"
    },
    {
      id: "src.vision.dxgi",
      type: "git-blob",
      title: "DXGI 桌面帧捕获",
      path: "native/vision_native/src/dxgi_capture.cpp",
      ranges: [[251, 330]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "使用 IDXGIOutputDuplication::AcquireNextFrame，复制 ROI 并发布 frame_id 与采集时间。"
    },
    {
      id: "src.vision.tensorrt",
      type: "git-blob",
      title: "TensorRT 推理提交",
      path: "native/vision_native/src/tensorrt_engine.cpp",
      ranges: [[260, 268], [334, 352]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "通过 CUDA Graph 或 enqueueV3 提交 TensorRT 推理并异步复制输出。"
    },
    {
      id: "src.vision.adapter",
      type: "git-blob",
      title: "VisionResult 到控制器快照的适配",
      path: "native/runtime_app/vision_controller_adapter.cpp",
      ranges: [[102, 208]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "保留 frame、selector generation、候选和 authority 字段，形成 ControllerVisionSnapshot。"
    },
    {
      id: "src.control.plan-contract",
      type: "git-blob",
      title: "TargetPlan 数据契约",
      path: "native/pipeline_contract/target_plan.h",
      ranges: [[9, 76], [78, 186]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "TargetPlan 携带目标身份、生命周期、模式、几何、authority、ADS 状态和开火抑制原因。"
    },
    {
      id: "src.control.coordinator",
      type: "git-blob",
      title: "TargetCoordinator 生成单一 TargetPlan",
      path: "native/controller_native/target_coordinator.cpp",
      ranges: [[205, 211], [757, 768], [948, 1059]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "从观察和意图更新目标身份/生命周期，选择 Manual、AdsAcquire 或 BodyLockFollow，并发布 authority 与 fire 状态。"
    },
    {
      id: "src.control.pipeline",
      type: "git-blob",
      title: "NativeGamepadController 求解控制帧",
      path: "native/controller_native/native_gamepad_controller.cpp",
      ranges: [[519, 584], [774, 905], [1019, 1089]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "TargetCoordinator 后只运行 ADS 或 BodyLock，统一 shape，再由单一状态机裁决，最后产生 fire 与 recoil contribution。"
    },
    {
      id: "src.control.owner",
      type: "git-blob",
      title: "AssistControlStateMachine 状态与输入",
      path: "native/controller_native/assist_control_state_machine.h",
      ranges: [[11, 85], [87, 170]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "Manual、Capture、Track、HandoverSeek 状态机是最终 manual/AI stick ownership 边界。"
    },
    {
      id: "src.control.frame",
      type: "git-blob",
      title: "ControlFrame 输出边界",
      path: "native/controller_native/control_frame.h",
      ranges: [[26, 90]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "固定一个物理采样并携带 pre-recoil、fire、recoil 与辅助 D-pad 四类命令。"
    },
    {
      id: "src.output.compose",
      type: "git-blob",
      title: "OutputComposer 单向合成顺序",
      path: "native/controller_native/output_composer.cpp",
      ranges: [[21, 54], [69, 203]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "依次应用 physical passthrough、pre-recoil stick、fire、recoil、D-pad 和 finalize。"
    },
    {
      id: "src.output.vigem",
      type: "git-blob",
      title: "ViGEm 虚拟 Xbox 输出",
      path: "native/controller_native/virtual_gamepad.cpp",
      ranges: [[156, 178], [260, 341]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "连接 ViGEm X360 target，把 GamepadOutputState 转为 XUSB report，并在断连时受限重连。"
    },
    {
      id: "src.fusion.publish",
      type: "git-blob",
      title: "Fusion latest-state 发布通道",
      path: "native/runtime_app/fusion_channel_publisher.cpp",
      ranges: [[82, 181], [184, 270]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "可选 publisher 用双 slot seqlock 写共享内存并 best-effort 唤醒 Canvas，连续失败后自停。"
    },
    {
      id: "src.fusion.canvas",
      type: "git-blob",
      title: "Fusion Canvas 读取与渲染",
      path: "native/overlay_canvas/fusion_canvas.cpp",
      ranges: [[1, 7], [284, 317], [2085, 2245]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "独立 overlay 读取最新 slot、按 frame_id 去重，事件驱动摄取并限频合并呈现。"
    },
    {
      id: "src.fusion.isolation",
      type: "git-blob",
      title: "Overlay 捕获隔离",
      path: "native/overlay_canvas/capture_isolation_guard.cpp",
      ranges: [[9, 52]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "设置并读取 WDA_EXCLUDEFROMCAPTURE，供 Canvas 在显示前或运行中验证捕获隔离。"
    },
    {
      id: "src.docs.readme-contract",
      type: "git-blob",
      title: "README 声明的当前运行契约",
      path: "README.md",
      ranges: [[29, 42]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "README 声称无 config.toml 时使用代码默认值，并列出 480x416 与 models/best.engine。"
    },
    {
      id: "src.docs.vision-config",
      type: "git-blob",
      title: "NATIVE_VISION 中的维护配置示例",
      path: "docs/project/NATIVE_VISION.md",
      ranges: [[22, 40], [61, 76], [115, 128]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "记录视觉处理链、新帧语义，并给出 640x512→480x384、160/20 Hz 的示例。"
    },
    {
      id: "src.docs.current-verification",
      type: "git-blob",
      title: "2026-08-10 项目状态与验证记录",
      path: "docs/project/CURRENT_STATE.md",
      ranges: [[1, 24], [26, 71], [112, 140]],
      revision: "9505591f51974c04664d7fc231ddc8685791bcf7",
      supports: "文档记录单 owner 控制链、1000 Hz controller / 160 Hz configured vision 语境，以及当日构建与测试结果和仍需 live A/B 的边界。"
    }
  ],

  nodes: [
    {
      id: "application.native-gamepad-assist",
      label: "原生视觉手柄辅助应用",
      kind: "application",
      layer: "application",
      summary: "在 Windows 上把物理手柄意图与游戏画面中的目标证据合成为虚拟 Xbox 360 手柄输出。",
      scope: "default-native-gamepad",
      knowledgeKind: "declared_intent",
      status: "observed",
      sourceIds: ["src.docs.readme-contract", "src.docs.current-verification"],
      tags: ["入口", "Windows", "实时控制"]
    },
    {
      id: "external.physical-gamepad",
      label: "物理手柄",
      kind: "external_system",
      layer: "external",
      summary: "玩家的摇杆、扳机、按键与方向键输入来源。",
      scope: "live-runtime",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.runtime.construct", "src.runtime.tick"],
      tags: ["输入"]
    },
    {
      id: "external.game-framebuffer",
      label: "游戏桌面画面",
      kind: "external_system",
      layer: "external",
      summary: "DXGI Desktop Duplication 提供的新桌面帧；VisionEngine 只处理配置的 ROI。",
      scope: "live-runtime",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.vision.dxgi", "src.vision.engine"],
      tags: ["输入", "画面"]
    },
    {
      id: "external.game-input",
      label: "游戏接收的 X360 输入",
      kind: "external_system",
      layer: "external",
      summary: "ViGEm 暴露的虚拟 Xbox 360 控制器状态，是主链对游戏的输出边界。",
      scope: "live-runtime",
      knowledgeKind: "declared_intent",
      status: "observed",
      sourceIds: ["src.output.vigem", "src.docs.current-verification"],
      tags: ["输出"]
    },
    {
      id: "entry.gamepad-start",
      label: "gamepad_start.bat",
      kind: "entrypoint",
      layer: "runtime",
      summary: "普通前台入口；默认选择 native C++，只有显式设置才进入 Python fallback。",
      scope: "startup",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.launch.default-choice"],
      tags: ["启动"]
    },
    {
      id: "runtime.cod-native-runtime",
      label: "cod_native_runtime.exe",
      kind: "runtime_unit",
      layer: "runtime",
      summary: "默认热路径的单个原生进程，持有配置、控制 tick、Vision 入口、控制器和虚拟输出。",
      scope: "default-native-gamepad",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.launch.native-runtime", "src.runtime.main", "src.runtime.construct"],
      tags: ["主进程", "默认路径"]
    },
    {
      id: "subsystem.input-boundary",
      label: "输入边界",
      kind: "module_group",
      layer: "input",
      summary: "SDL 或 XInput 读取物理手柄，并在每个 controller tick 固定一份输入快照。",
      scope: "live-runtime",
      knowledgeKind: "derived_fact",
      status: "inferred",
      sourceIds: ["src.runtime.construct", "src.runtime.tick"],
      tags: ["归纳分组"]
    },
    {
      id: "data.physical-gamepad-state",
      label: "PhysicalGamepadState",
      kind: "data_object",
      layer: "input",
      summary: "一次控制更新读取到的物理轴、扳机、按键和 D-pad 快照。",
      scope: "controller-tick",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.runtime.tick", "src.output.compose"],
      tags: ["数据", "tick snapshot"]
    },
    {
      id: "module.runtime-loop",
      label: "RuntimeLoop",
      kind: "module",
      layer: "runtime",
      summary: "把物理采样、视觉交付、控制求解、输出交付与事后观察排成一次确定的控制更新。",
      scope: "default-native-gamepad",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.runtime.construct", "src.runtime.tick"],
      tags: ["编排", "1000Hz configurable"],
      boundary: "输出交付之前只做本 tick 必需工作；telemetry 与 Fusion 在 ViGEm update 之后。"
    },
    {
      id: "subsystem.vision",
      label: "视觉子系统",
      kind: "module_group",
      layer: "vision",
      summary: "捕获画面、执行 GPU 推理、选择当前目标，并以 latest-only 快照向控制 tick 交付。",
      scope: "native-vision",
      knowledgeKind: "derived_fact",
      status: "inferred",
      sourceIds: ["src.vision.engine", "src.vision.service"],
      tags: ["归纳分组"]
    },
    {
      id: "module.vision-engine",
      label: "VisionEngine",
      kind: "module",
      layer: "vision",
      summary: "编排 DXGI、CUDA、TensorRT、decode 与 selector，产出一份 VisionResult。",
      scope: "native-vision",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.vision.engine"],
      tags: ["视觉编排"]
    },
    {
      id: "mechanism.dxgi-capture",
      label: "DXGI ROI Capture",
      kind: "mechanism",
      layer: "vision",
      summary: "通过 Desktop Duplication 取得新帧并复制所需区域；无新帧不会伪造 frame_updated。",
      scope: "native-vision",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.vision.dxgi", "src.vision.engine"],
      tags: ["捕获"]
    },
    {
      id: "data.captured-frame",
      label: "Captured ROI Frame",
      kind: "data_object",
      layer: "vision",
      summary: "带 frame_id、captured_at_ns 与输出/ROI 几何的最新画面数据。",
      scope: "vision-frame",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.vision.dxgi", "src.vision.engine"],
      tags: ["数据", "新帧"]
    },
    {
      id: "mechanism.cuda-preprocess",
      label: "CUDA Preprocess",
      kind: "mechanism",
      layer: "vision",
      summary: "把 GPU 中的 BGRA ROI 转成 TensorRT 输入尺寸与 CHW 浮点布局。",
      scope: "native-vision",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.vision.engine"],
      tags: ["GPU", "变换"]
    },
    {
      id: "mechanism.tensorrt-inference",
      label: "TensorRT Inference",
      kind: "mechanism",
      layer: "vision",
      summary: "使用固定形状 engine 在 CUDA stream 上提交推理，并把检测输出复制回 host。",
      scope: "native-vision",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.vision.tensorrt", "src.vision.engine"],
      tags: ["GPU", "推理"]
    },
    {
      id: "data.detection-batch",
      label: "DetectionBatch",
      kind: "data_object",
      layer: "vision",
      summary: "一帧中的检测候选、几何、采集时间与 GPU 阶段耗时。",
      scope: "vision-frame",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.vision.engine"],
      tags: ["数据", "候选"]
    },
    {
      id: "mechanism.native-target-selector",
      label: "Native Target Selector",
      kind: "mechanism",
      layer: "vision",
      summary: "从当前帧候选和颜色/提示证据中选择目标，发布目标身份、几何与建议 authority。",
      scope: "native-vision",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.vision.engine", "src.docs.vision-config"],
      tags: ["选择", "身份"]
    },
    {
      id: "data.vision-result",
      label: "VisionResult",
      kind: "data_object",
      layer: "vision",
      summary: "带 frame freshness、selector generation、目标/候选、authority 与阶段时序的视觉结果。",
      scope: "vision-frame",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.vision.engine", "src.vision.adapter"],
      tags: ["数据", "视觉输出"]
    },
    {
      id: "module.vision-service",
      label: "VisionService",
      kind: "module",
      layer: "vision",
      summary: "按 aiming/idle cadence 在工作线程轮询 VisionEngine，只保存最新快照。",
      scope: "gpu-service-enabled",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.runtime.construct", "src.vision.service", "src.vision.service-logic"],
      tags: ["线程", "latest-only"]
    },
    {
      id: "mechanism.vision-delivery-gate",
      label: "VisionDeliveryGate",
      kind: "mechanism",
      layer: "vision",
      summary: "只接受新、唯一、单调前进且未超过 age 上限的 capture，阻止旧结果获得新控制权。",
      scope: "vision-to-control-boundary",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.vision.service", "src.vision.service-logic", "src.runtime.tick"],
      tags: ["校验", "新鲜度"],
      invariant: "NoUpdate、重复、倒退、无时间戳或过期的结果不能提交给控制器。"
    },
    {
      id: "module.vision-controller-adapter",
      label: "Vision Controller Adapter",
      kind: "module",
      layer: "vision",
      summary: "把已接受 VisionResult 映射为控制器使用的候选和原子快照，保留身份与来源字段。",
      scope: "vision-to-control-boundary",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.vision.adapter", "src.runtime.tick"],
      tags: ["适配"]
    },
    {
      id: "data.controller-vision-snapshot",
      label: "ControllerVisionSnapshot",
      kind: "data_object",
      layer: "control",
      summary: "控制器看到的一份完整视觉交付，含 frame、候选、selected observation 与 authority。",
      scope: "controller-tick",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.vision.adapter", "src.control.pipeline"],
      tags: ["数据", "交付快照"]
    },
    {
      id: "subsystem.control",
      label: "控制子系统",
      kind: "module_group",
      layer: "control",
      summary: "把物理意图和可接受的目标证据变成唯一的 pre-recoil stick、开火和后坐力贡献。",
      scope: "native-controller",
      knowledgeKind: "derived_fact",
      status: "inferred",
      sourceIds: ["src.control.pipeline", "src.docs.current-verification"],
      tags: ["归纳分组"]
    },
    {
      id: "module.native-gamepad-controller",
      label: "NativeGamepadController",
      kind: "module",
      layer: "control",
      summary: "持有目标、ADS/BodyLock、动态整形、manual/AI ownership、AutoFire 和 recoil reducer。",
      scope: "native-controller",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.control.pipeline", "src.docs.current-verification"],
      tags: ["控制编排"]
    },
    {
      id: "data.user-aim-intent",
      label: "UserAimIntent",
      kind: "data_object",
      layer: "control",
      summary: "由当前物理输入、aim scope 和控制 tick 时间构成的玩家瞄准意图。",
      scope: "controller-tick",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.runtime.tick", "src.control.pipeline"],
      tags: ["数据", "玩家意图"]
    },
    {
      id: "module.target-coordinator",
      label: "TargetCoordinator",
      kind: "state_owner",
      layer: "control",
      summary: "目标身份、生命周期和控制模式的 owner；每次更新只发布一份 TargetPlan。",
      scope: "native-controller",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.control.coordinator", "src.docs.current-verification"],
      tags: ["状态 owner", "目标"]
    },
    {
      id: "data.target-plan",
      label: "TargetPlan",
      kind: "data_object",
      layer: "control",
      summary: "当前目标的身份、生命周期、目标点、误差、authority、ADS 状态和开火资格。",
      scope: "controller-tick",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.control.plan-contract", "src.control.coordinator"],
      tags: ["数据", "唯一目标计划"]
    },
    {
      id: "mechanism.ads-acquisition",
      label: "ADS Acquisition",
      kind: "mechanism",
      layer: "control",
      summary: "瞄准镜开启时的目标获取求解器；与 BodyLock 在同一 tick 中互斥。",
      scope: "plan.mode=AdsAcquire",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.control.pipeline", "src.control.coordinator"],
      tags: ["求解器"]
    },
    {
      id: "mechanism.bodylock-follow",
      label: "BodyLock Follow",
      kind: "mechanism",
      layer: "control",
      summary: "ADS 获取完成后的持续跟随求解器；只在 TargetPlan 选择 BodyLockFollow 时运行。",
      scope: "plan.mode=BodyLockFollow",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.control.pipeline", "src.control.coordinator"],
      tags: ["求解器"]
    },
    {
      id: "data.ai-stick-proposal",
      label: "AI Stick Proposal",
      kind: "data_object",
      layer: "control",
      summary: "ADS 或 BodyLock 依据同一 TargetPlan 产生的目标相对右摇杆建议。",
      scope: "controller-tick",
      knowledgeKind: "derived_fact",
      status: "inferred",
      sourceIds: ["src.control.pipeline"],
      tags: ["数据", "归纳命名"]
    },
    {
      id: "mechanism.aim-dynamics-shaper",
      label: "AimDynamicsShaper",
      kind: "mechanism",
      layer: "control",
      summary: "对选中的 AI proposal 统一整形一次；不并行维护第二套瞄准输出。",
      scope: "native-controller",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.control.pipeline", "src.docs.current-verification"],
      tags: ["整形", "single pass"]
    },
    {
      id: "mechanism.assist-control-state-machine",
      label: "AssistControlStateMachine",
      kind: "state_owner",
      layer: "control",
      summary: "在 Manual、Capture、Track、HandoverSeek 间转换，并唯一决定玩家输入与 AI 输出的最终 right-stick ownership。",
      scope: "native-controller",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.control.owner", "src.control.pipeline"],
      tags: ["状态 owner", "manual/AI"]
    },
    {
      id: "data.pre-recoil-stick-command",
      label: "PreRecoilStickCommand",
      kind: "data_object",
      layer: "control",
      summary: "目标与玩家控制裁决后的唯一右摇杆命令，尚未叠加 recoil。",
      scope: "controller-tick",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.control.pipeline", "src.control.frame"],
      tags: ["数据", "单一控制输出"]
    },
    {
      id: "mechanism.auto-fire-gate",
      label: "AutoFire Gate",
      kind: "mechanism",
      layer: "control",
      summary: "依据直接观察、aim ready、手动接管和 pulse cadence，只产生 synthetic fire contribution。",
      scope: "native-controller",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.control.pipeline", "src.docs.current-verification"],
      tags: ["开火", "安全闸门"]
    },
    {
      id: "data.fire-command",
      label: "FireCommand",
      kind: "data_object",
      layer: "control",
      summary: "仅表达合成开火；物理 RB/RT 已从 PhysicalGamepadState 透传。",
      scope: "controller-tick",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.control.frame", "src.output.compose"],
      tags: ["数据", "synthetic only"]
    },
    {
      id: "mechanism.recoil-reducer",
      label: "Recoil Reducer",
      kind: "mechanism",
      layer: "control",
      summary: "根据开火、ADS 和当前 recoil 配置产生最后阶段的摇杆增量，不拥有目标选择。",
      scope: "native-controller",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.control.pipeline", "src.docs.current-verification"],
      tags: ["后坐力", "feed-forward"]
    },
    {
      id: "data.recoil-contribution",
      label: "RecoilContribution",
      kind: "data_object",
      layer: "control",
      summary: "独立于目标/manual 语境的最后阶段 stick delta。",
      scope: "controller-tick",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.control.frame", "src.output.compose"],
      tags: ["数据", "增量"]
    },
    {
      id: "data.control-frame",
      label: "ControlFrame",
      kind: "data_object",
      layer: "control",
      summary: "固定物理采样以及 pre-recoil、fire、recoil、D-pad 四类可合成命令。",
      scope: "controller-tick",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.control.frame", "src.control.pipeline"],
      tags: ["数据", "输出边界"]
    },
    {
      id: "subsystem.output",
      label: "输出边界",
      kind: "module_group",
      layer: "output",
      summary: "以固定顺序把物理透传和控制贡献合成一份合法状态，再提交给 ViGEm。",
      scope: "native-output",
      knowledgeKind: "derived_fact",
      status: "inferred",
      sourceIds: ["src.output.compose", "src.output.vigem"],
      tags: ["归纳分组"]
    },
    {
      id: "module.output-composer",
      label: "OutputComposer",
      kind: "module",
      layer: "output",
      summary: "唯一的输出合成 owner；顺序错误、重复阶段或非法数据会使 compose 失败。",
      scope: "native-output",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.output.compose"],
      tags: ["单向状态机", "输出 owner"]
    },
    {
      id: "data.gamepad-output-state",
      label: "GamepadOutputState",
      kind: "data_object",
      layer: "output",
      summary: "最终轴、扳机、按键和 D-pad 值；只有 finalized 状态才能交付。",
      scope: "controller-tick",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.output.compose", "src.runtime.tick"],
      tags: ["数据", "最终状态"]
    },
    {
      id: "module.virtual-gamepad",
      label: "VirtualGamepad",
      kind: "module",
      layer: "output",
      summary: "管理 ViGEm client/X360 target，把最终状态变成 XUSB report，并处理断连恢复。",
      scope: "native-output",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.output.vigem", "src.runtime.tick"],
      tags: ["设备边界"]
    },
    {
      id: "dependency.vigem",
      label: "ViGEm Client",
      kind: "dependency",
      layer: "output",
      summary: "Windows 虚拟游戏手柄驱动客户端；提供 X360 target 和 update 接口。",
      scope: "native-output",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.output.vigem"],
      tags: ["外部依赖"]
    },
    {
      id: "data.x360-report",
      label: "XUSB/X360 Report",
      kind: "data_object",
      layer: "output",
      summary: "VirtualGamepad 交给 ViGEm X360 target 的设备报告。",
      scope: "native-output",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.output.vigem"],
      tags: ["数据", "设备报告"]
    },
    {
      id: "subsystem.observation",
      label: "观察支路",
      kind: "module_group",
      layer: "observation",
      summary: "telemetry 和 Fusion 读取主链结果，但不应反向成为控制 authority。",
      scope: "optional-observation",
      knowledgeKind: "derived_fact",
      status: "inferred",
      sourceIds: ["src.runtime.tick", "src.fusion.publish"],
      tags: ["归纳分组", "旁路"]
    },
    {
      id: "module.runtime-telemetry",
      label: "Runtime Telemetry",
      kind: "module",
      layer: "observation",
      summary: "在输出交付后记录视觉、控制与设备时序；是否启用由配置决定。",
      scope: "optional-observation",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.runtime.construct", "src.runtime.tick"],
      tags: ["诊断", "旁路"]
    },
    {
      id: "module.fusion-channel",
      label: "Fusion Shared Channel",
      kind: "module",
      layer: "observation",
      summary: "双 slot seqlock 的 latest-state 共享内存通道；发布失败不会阻塞控制主链。",
      scope: "fusion-enabled",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.fusion.publish", "src.runtime.tick"],
      tags: ["共享内存", "latest-only"]
    },
    {
      id: "data.fusion-frame",
      label: "Fusion Frame",
      kind: "data_object",
      layer: "observation",
      summary: "画面几何、当前目标和有限检测候选的只读显示快照。",
      scope: "fusion-enabled",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.fusion.publish", "src.fusion.canvas"],
      tags: ["数据", "显示快照"]
    },
    {
      id: "runtime.fusion-canvas",
      label: "Fusion Canvas",
      kind: "runtime_unit",
      layer: "observation",
      summary: "独立透明 overlay 进程，只读最新 FusionFrame 并限频渲染，不参与控制求解。",
      scope: "fusion-enabled",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.fusion.canvas"],
      tags: ["可选进程", "显示"]
    },
    {
      id: "mechanism.capture-isolation",
      label: "Capture Isolation",
      kind: "mechanism",
      layer: "observation",
      summary: "在 overlay 显示前验证排除捕获属性，运行中失效时隐藏并 fail closed。",
      scope: "fusion-enabled",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.fusion.isolation", "src.fusion.canvas"],
      tags: ["安全边界", "fail closed"]
    },
    {
      id: "mechanism.runtime-config-resolution",
      label: "Runtime Config Resolution",
      kind: "mechanism",
      layer: "config",
      summary: "load 阶段合并代码默认值、profile/配置文件和环境变量并统一校验；main 随后应用各自校验过的独立 CLI 覆盖。",
      scope: "startup",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.config.merge", "src.runtime.main"],
      tags: ["配置", "优先级"]
    },
    {
      id: "config.code-defaults",
      label: "代码默认值",
      kind: "configuration",
      layer: "config",
      summary: "RuntimeConfig 结构体初始化值；只有没有更高优先级来源时生效。",
      scope: "startup",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.config.code-defaults"],
      tags: ["配置来源"]
    },
    {
      id: "config.file-and-profile",
      label: "config.toml / profile",
      kind: "configuration",
      layer: "config",
      summary: "文件中的 profile 先应用，随后其他文件项覆盖；CLI profile 可取代文件 profile。",
      scope: "startup",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.config.merge", "src.runtime.main"],
      tags: ["配置来源"]
    },
    {
      id: "config.environment",
      label: "环境变量",
      kind: "configuration",
      layer: "config",
      summary: "视觉、telemetry、recoil 和部分 gamepad 项在文件之后覆盖。",
      scope: "startup",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.config.merge"],
      tags: ["配置来源"]
    },
    {
      id: "config.cli",
      label: "独立 CLI 覆盖",
      kind: "configuration",
      layer: "config",
      summary: "main 在 load_runtime_config 之后独立覆盖 AutoFire output 与 capture FPS 等显式选项。",
      scope: "startup",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.runtime.main"],
      tags: ["配置来源", "最高可见优先级"]
    },
    {
      id: "data.effective-runtime-config",
      label: "Effective RuntimeConfig",
      kind: "data_object",
      layer: "config",
      summary: "合并且通过范围/一致性校验后的进程配置；可用 --dump-effective-config 显示值及来源。",
      scope: "startup",
      knowledgeKind: "derived_fact",
      status: "observed",
      sourceIds: ["src.config.merge", "src.runtime.main"],
      tags: ["数据", "配置结果"]
    }
  ],

  relations: [
    { id: "rel.app.entry", from: "application.native-gamepad-assist", to: "entry.gamepad-start", type: "exposes", family: "structure", label: "提供入口", summary: "应用通过 gamepad_start.bat 暴露普通前台入口。", scope: "startup", condition: "normal foreground launch", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.launch.default-choice"] },
    { id: "rel.entry.starts-runtime", from: "entry.gamepad-start", to: "runtime.cod-native-runtime", type: "starts", family: "call", label: "默认启动", summary: "未显式选择 fallback 时，启动脚本转到原生启动脚本并运行 cod_native_runtime.exe。", scope: "default-native-gamepad", condition: "GAMEPAD_RUNTIME missing/native/cpp/c++", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.launch.default-choice", "src.launch.native-runtime"] },
    { id: "rel.app.contains-runtime", from: "application.native-gamepad-assist", to: "runtime.cod-native-runtime", type: "contains", family: "structure", label: "主运行单元", summary: "默认游戏手柄热路径位于一个原生进程。", scope: "default-native-gamepad", condition: "native selected", knowledgeKind: "declared_intent", status: "observed", sourceIds: ["src.runtime.main", "src.docs.current-verification"] },
    { id: "rel.runtime.contains-loop", from: "runtime.cod-native-runtime", to: "module.runtime-loop", type: "instantiates", family: "structure", label: "构造并运行", summary: "main 构造 RuntimeLoop 并调用 run。", scope: "default-native-gamepad", condition: "startup succeeds", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.runtime.main"] },
    { id: "rel.runtime.contains-input", from: "runtime.cod-native-runtime", to: "subsystem.input-boundary", type: "contains", family: "structure", label: "包含", summary: "原生进程装配 SDL/XInput 输入读取边界。", scope: "live-runtime", condition: "runtime construction", knowledgeKind: "derived_fact", status: "inferred", sourceIds: ["src.runtime.construct"] },
    { id: "rel.runtime.contains-vision", from: "runtime.cod-native-runtime", to: "subsystem.vision", type: "contains", family: "structure", label: "包含", summary: "原生进程持有 VisionEngine，并可按配置放入 VisionService 工作线程。", scope: "native-vision", condition: "runtime construction", knowledgeKind: "derived_fact", status: "inferred", sourceIds: ["src.runtime.construct"] },
    { id: "rel.runtime.contains-control", from: "runtime.cod-native-runtime", to: "subsystem.control", type: "contains", family: "structure", label: "包含", summary: "原生进程持有 NativeGamepadController。", scope: "native-controller", condition: "runtime construction", knowledgeKind: "derived_fact", status: "inferred", sourceIds: ["src.runtime.construct"] },
    { id: "rel.runtime.contains-output", from: "runtime.cod-native-runtime", to: "subsystem.output", type: "contains", family: "structure", label: "包含", summary: "原生进程持有 OutputComposer 与 VirtualGamepad。", scope: "native-output", condition: "runtime construction", knowledgeKind: "derived_fact", status: "inferred", sourceIds: ["src.runtime.construct"] },
    { id: "rel.physical.sampled-by-input", from: "external.physical-gamepad", to: "subsystem.input-boundary", type: "read_by", family: "data", label: "被采样", summary: "SDL 或 XInput 读取物理控制器。", scope: "controller-tick", condition: "connected input", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.runtime.construct", "src.runtime.tick"] },
    { id: "rel.input.produces-physical", from: "subsystem.input-boundary", to: "data.physical-gamepad-state", type: "produces", family: "data", label: "产生", summary: "每个 tick 固定一份物理手柄状态。", scope: "controller-tick", condition: "read succeeds or recovery supplies bounded state", knowledgeKind: "derived_fact", status: "inferred", sourceIds: ["src.runtime.tick"] },
    { id: "rel.loop.reads-physical", from: "module.runtime-loop", to: "data.physical-gamepad-state", type: "reads", family: "data", label: "读取", summary: "run_once 的第一项工作是读取物理手柄。", scope: "controller-tick", condition: "every tick", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.runtime.tick"] },
    { id: "rel.loop.calls-controller", from: "module.runtime-loop", to: "module.native-gamepad-controller", type: "calls", family: "call", label: "调用", summary: "先 begin_tick，视觉交付后再 resolve_control_frame。", scope: "controller-tick", condition: "every tick", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.runtime.tick", "src.control.pipeline"] },
    { id: "rel.loop.uses-vision-service", from: "module.runtime-loop", to: "module.vision-service", type: "reads", family: "data", label: "读取最新快照", summary: "GPU service 开启时只读取 VisionService 最新快照，不等待历史队列。", scope: "gpu-service-enabled", condition: "vision_service != null", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.runtime.tick", "src.vision.service"] },
    { id: "rel.service.calls-engine", from: "module.vision-service", to: "module.vision-engine", type: "calls", family: "call", label: "轮询", summary: "工作线程根据 active/idle cadence 调用 VisionEngine::poll_once。", scope: "gpu-service-enabled", condition: "poll due", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.vision.service-logic", "src.runtime.construct"] },
    { id: "rel.loop.calls-engine-direct", from: "module.runtime-loop", to: "module.vision-engine", type: "calls", family: "call", label: "可直接轮询", summary: "GPU service 关闭时，RuntimeLoop 到期后直接 poll_once。", scope: "gpu-service-disabled", condition: "vision_service == null and poll due", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.runtime.tick"] },
    { id: "rel.framebuffer.read-by-dxgi", from: "external.game-framebuffer", to: "mechanism.dxgi-capture", type: "read_by", family: "data", label: "被捕获", summary: "DXGI Desktop Duplication 获取桌面新帧。", scope: "native-vision", condition: "new desktop frame available", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.vision.dxgi"] },
    { id: "rel.engine.contains-dxgi", from: "module.vision-engine", to: "mechanism.dxgi-capture", type: "contains", family: "structure", label: "编排", summary: "VisionEngine 先执行 capture.grab。", scope: "native-vision", condition: "poll_once", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.vision.engine"] },
    { id: "rel.dxgi.produces-frame", from: "mechanism.dxgi-capture", to: "data.captured-frame", type: "produces", family: "data", label: "产生", summary: "新帧带 frame_id、capture time 与 ROI/output 几何。", scope: "vision-frame", condition: "metadata.updated", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.vision.dxgi", "src.vision.engine"] },
    { id: "rel.engine.contains-preprocess", from: "module.vision-engine", to: "mechanism.cuda-preprocess", type: "contains", family: "structure", label: "编排", summary: "新帧进入 CUDA preprocess。", scope: "native-vision", condition: "frame_updated", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.vision.engine"] },
    { id: "rel.preprocess.consumes-frame", from: "mechanism.cuda-preprocess", to: "data.captured-frame", type: "consumes", family: "data", label: "读取", summary: "预处理读取 capture texture 中的 ROI。", scope: "vision-frame", condition: "mapped CUDA resource", knowledgeKind: "derived_fact", status: "inferred", sourceIds: ["src.vision.engine"] },
    { id: "rel.engine.contains-inference", from: "module.vision-engine", to: "mechanism.tensorrt-inference", type: "contains", family: "structure", label: "编排", summary: "预处理后提交 TensorRT。", scope: "native-vision", condition: "frame_updated", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.vision.engine", "src.vision.tensorrt"] },
    { id: "rel.inference.produces-batch", from: "mechanism.tensorrt-inference", to: "data.detection-batch", type: "produces", family: "data", label: "产生候选", summary: "推理输出经 decode 成 DetectionBatch。", scope: "vision-frame", condition: "inference completes", knowledgeKind: "derived_fact", status: "inferred", sourceIds: ["src.vision.engine", "src.vision.tensorrt"] },
    { id: "rel.engine.contains-selector", from: "module.vision-engine", to: "mechanism.native-target-selector", type: "contains", family: "structure", label: "编排", summary: "VisionEngine 把检测批次交给 selector。", scope: "native-vision", condition: "decoded batch", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.vision.engine"] },
    { id: "rel.selector.consumes-batch", from: "mechanism.native-target-selector", to: "data.detection-batch", type: "consumes", family: "data", label: "读取候选", summary: "selector 评估当前帧候选和可用颜色/提示证据。", scope: "vision-frame", condition: "selector call", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.vision.engine"] },
    { id: "rel.selector.produces-result", from: "mechanism.native-target-selector", to: "data.vision-result", type: "produces", family: "data", label: "发布选择", summary: "选择结果与 VisionEngine 的 frame/timing 数据合并为 VisionResult。", scope: "vision-frame", condition: "poll_once returns", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.vision.engine"] },
    { id: "rel.service.publishes-result", from: "module.vision-service", to: "data.vision-result", type: "publishes", family: "data", label: "保留最新", summary: "每次 service step 用新 sequence 覆盖 latest snapshot。", scope: "gpu-service-enabled", condition: "service step", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.vision.service-logic"] },
    { id: "rel.gate.validates-result", from: "mechanism.vision-delivery-gate", to: "data.vision-result", type: "validates", family: "authority", label: "验证交付", summary: "检查 frame_updated、ID、时间顺序、去重/单调和最大 age。", scope: "vision-to-control-boundary", condition: "candidate delivery", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.vision.service-logic"] },
    { id: "rel.loop.calls-gate", from: "module.runtime-loop", to: "mechanism.vision-delivery-gate", type: "calls", family: "call", label: "请求校验", summary: "RuntimeLoop 只在 snapshot fresh 且 control epoch 匹配时调用 gate。", scope: "vision-to-control-boundary", condition: "new service sequence or direct poll", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.runtime.tick"] },
    { id: "rel.gate.permits-adapter", from: "mechanism.vision-delivery-gate", to: "module.vision-controller-adapter", type: "governs", family: "authority", label: "允许提交", summary: "只有 gate 接受后才执行 adapt_vision_result 并 submit_vision_snapshot。", scope: "vision-to-control-boundary", condition: "accept == true", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.runtime.tick", "src.vision.adapter"] },
    { id: "rel.adapter.transforms-result", from: "module.vision-controller-adapter", to: "data.vision-result", type: "consumes", family: "data", label: "读取", summary: "适配器读取已接受的 VisionResult。", scope: "vision-to-control-boundary", condition: "frame_updated", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.vision.adapter"] },
    { id: "rel.adapter.produces-snapshot", from: "module.vision-controller-adapter", to: "data.controller-vision-snapshot", type: "produces", family: "data", label: "映射为", summary: "保留 frame 和 selector 身份，过滤并标记候选。", scope: "vision-to-control-boundary", condition: "accepted result", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.vision.adapter"] },
    { id: "rel.controller.consumes-snapshot", from: "module.native-gamepad-controller", to: "data.controller-vision-snapshot", type: "consumes", family: "data", label: "消费", summary: "控制器在下次 resolve_control_frame 时处理 pending snapshot。", scope: "controller-tick", condition: "new accepted snapshot", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.runtime.tick", "src.control.pipeline"] },
    { id: "rel.controller.owns-coordinator", from: "module.native-gamepad-controller", to: "module.target-coordinator", type: "contains", family: "structure", label: "持有", summary: "控制器实例持有单一 TargetCoordinator。", scope: "native-controller", condition: "runtime lifetime", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.control.pipeline"] },
    { id: "rel.coordinator.consumes-snapshot", from: "module.target-coordinator", to: "data.controller-vision-snapshot", type: "consumes", family: "data", label: "读取观察", summary: "快照被转换为 observation batch 后进入 TargetCoordinator。", scope: "controller-tick", condition: "resolve_control_frame", knowledgeKind: "derived_fact", status: "inferred", sourceIds: ["src.control.pipeline", "src.control.coordinator"] },
    { id: "rel.loop.produces-intent", from: "module.runtime-loop", to: "data.user-aim-intent", type: "produces", family: "data", label: "构造", summary: "RuntimeLoop 根据 tick preparation 构造 UserAimIntent，并同时传入视觉服务。", scope: "controller-tick", condition: "every tick", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.runtime.tick"] },
    { id: "rel.coordinator.consumes-intent", from: "module.target-coordinator", to: "data.user-aim-intent", type: "consumes", family: "data", label: "读取意图", summary: "目标计划更新同时考虑过滤后的玩家意图。", scope: "controller-tick", condition: "resolve_control_frame", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.control.coordinator", "src.control.pipeline"] },
    { id: "rel.coordinator.produces-plan", from: "module.target-coordinator", to: "data.target-plan", type: "produces", family: "authority", label: "唯一发布", summary: "每次 update 发布一份模式与 authority 已确定的 TargetPlan。", scope: "controller-tick", condition: "resolve_control_frame", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.control.coordinator", "src.control.plan-contract"] },
    { id: "rel.plan.selects-ads", from: "data.target-plan", to: "mechanism.ads-acquisition", type: "selects", family: "authority", label: "选择 ADS", summary: "mode 为 AdsAcquire 时只调用 ADS controller。", scope: "native-controller", condition: "plan.mode == AdsAcquire", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.control.pipeline"] },
    { id: "rel.plan.selects-bodylock", from: "data.target-plan", to: "mechanism.bodylock-follow", type: "selects", family: "authority", label: "选择 BodyLock", summary: "mode 为 BodyLockFollow 时只调用 BodyLock controller。", scope: "native-controller", condition: "plan.mode == BodyLockFollow", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.control.pipeline"] },
    { id: "rel.ads.produces-proposal", from: "mechanism.ads-acquisition", to: "data.ai-stick-proposal", type: "produces", family: "data", label: "产生", summary: "ADS 求解器产生一个目标相对 stick proposal。", scope: "plan.mode=AdsAcquire", condition: "selected mode", knowledgeKind: "derived_fact", status: "inferred", sourceIds: ["src.control.pipeline"] },
    { id: "rel.bodylock.produces-proposal", from: "mechanism.bodylock-follow", to: "data.ai-stick-proposal", type: "produces", family: "data", label: "产生", summary: "BodyLock 求解器产生一个目标相对 stick proposal。", scope: "plan.mode=BodyLockFollow", condition: "selected mode", knowledgeKind: "derived_fact", status: "inferred", sourceIds: ["src.control.pipeline"] },
    { id: "rel.shaper.consumes-proposal", from: "mechanism.aim-dynamics-shaper", to: "data.ai-stick-proposal", type: "consumes", family: "data", label: "整形", summary: "无论 proposal 来自哪个互斥求解器，都只经过一个 shaper。", scope: "native-controller", condition: "every resolved control frame", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.control.pipeline", "src.docs.current-verification"] },
    { id: "rel.controller.owns-shaper", from: "module.native-gamepad-controller", to: "mechanism.aim-dynamics-shaper", type: "contains", family: "structure", label: "持有", summary: "控制器持有单一 AimDynamicsShaper。", scope: "native-controller", condition: "runtime lifetime", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.control.pipeline"] },
    { id: "rel.controller.owns-control-state", from: "module.native-gamepad-controller", to: "mechanism.assist-control-state-machine", type: "contains", family: "structure", label: "持有", summary: "控制器持有唯一 manual/AI authority state machine。", scope: "native-controller", condition: "runtime lifetime", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.control.pipeline", "src.control.owner"] },
    { id: "rel.control-state.consumes-physical", from: "mechanism.assist-control-state-machine", to: "data.physical-gamepad-state", type: "consumes", family: "data", label: "读取玩家量", summary: "状态机读取原始、居中和过滤后的 manual stick。", scope: "controller-tick", condition: "resolve_control_frame", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.control.pipeline", "src.control.owner"] },
    { id: "rel.control-state.consumes-plan", from: "mechanism.assist-control-state-machine", to: "data.target-plan", type: "consumes", family: "authority", label: "读取 authority", summary: "目标模式、生命周期和 authority 决定是否允许 AI 接管或交还。", scope: "controller-tick", condition: "resolve_control_frame", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.control.pipeline", "src.control.owner"] },
    { id: "rel.control-state.produces-pre-recoil", from: "mechanism.assist-control-state-machine", to: "data.pre-recoil-stick-command", type: "produces", family: "authority", label: "唯一决定", summary: "Manual/AI 只在这里裁决一次，产出 pre-recoil stick。", scope: "controller-tick", condition: "resolve_control_frame", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.control.pipeline", "src.control.owner"] },
    { id: "rel.controller.owns-autofire", from: "module.native-gamepad-controller", to: "mechanism.auto-fire-gate", type: "contains", family: "structure", label: "持有", summary: "控制器持有 AutoFireGate。", scope: "native-controller", condition: "runtime lifetime", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.control.pipeline"] },
    { id: "rel.autofire.consumes-plan", from: "mechanism.auto-fire-gate", to: "data.target-plan", type: "consumes", family: "authority", label: "检查资格", summary: "TargetPlan 的 fire request/authority、误差与 freshness 进入开火裁决。", scope: "controller-tick", condition: "resolve_control_frame", knowledgeKind: "derived_fact", status: "inferred", sourceIds: ["src.control.pipeline", "src.control.plan-contract"] },
    { id: "rel.autofire.produces-fire", from: "mechanism.auto-fire-gate", to: "data.fire-command", type: "produces", family: "data", label: "产生", summary: "只产生 synthetic RB/RT command，不覆盖物理开火透传。", scope: "controller-tick", condition: "gate reduction", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.control.pipeline", "src.control.frame"] },
    { id: "rel.controller.owns-recoil", from: "module.native-gamepad-controller", to: "mechanism.recoil-reducer", type: "contains", family: "structure", label: "持有", summary: "控制器持有 recoil reducer。", scope: "native-controller", condition: "runtime lifetime", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.control.pipeline"] },
    { id: "rel.recoil.produces-contribution", from: "mechanism.recoil-reducer", to: "data.recoil-contribution", type: "produces", family: "data", label: "产生", summary: "开火/ADS 状态和配置形成独立 stick delta。", scope: "controller-tick", condition: "resolve_control_frame", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.control.pipeline", "src.control.frame"] },
    { id: "rel.controller.produces-frame", from: "module.native-gamepad-controller", to: "data.control-frame", type: "produces", family: "data", label: "发布", summary: "resolve_control_frame 把物理 sample 和四类 command 固定为 ControlFrame。", scope: "controller-tick", condition: "sample available", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.control.pipeline", "src.control.frame"] },
    { id: "rel.frame.includes-pre-recoil", from: "data.control-frame", to: "data.pre-recoil-stick-command", type: "contains", family: "structure", label: "包含", summary: "ControlFrame 携带 pre-recoil stick command。", scope: "controller-tick", condition: "valid frame", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.control.frame"] },
    { id: "rel.frame.includes-fire", from: "data.control-frame", to: "data.fire-command", type: "contains", family: "structure", label: "包含", summary: "ControlFrame 携带 synthetic fire command。", scope: "controller-tick", condition: "valid frame", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.control.frame"] },
    { id: "rel.frame.includes-recoil", from: "data.control-frame", to: "data.recoil-contribution", type: "contains", family: "structure", label: "包含", summary: "ControlFrame 携带 recoil contribution。", scope: "controller-tick", condition: "valid frame", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.control.frame"] },
    { id: "rel.loop.calls-composer", from: "module.runtime-loop", to: "module.output-composer", type: "calls", family: "call", label: "合成", summary: "RuntimeLoop 把 ControlFrame 交给 OutputComposer，失败即终止本 tick。", scope: "controller-tick", condition: "resolved frame", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.runtime.tick"] },
    { id: "rel.composer.consumes-physical", from: "module.output-composer", to: "data.physical-gamepad-state", type: "consumes", family: "data", label: "先透传", summary: "最终输出先从物理状态 seed，确保未被合成命令触及的输入继续透传。", scope: "controller-tick", condition: "first compose stage", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.output.compose"] },
    { id: "rel.composer.consumes-frame", from: "module.output-composer", to: "data.control-frame", type: "consumes", family: "data", label: "按序消费", summary: "composer 只读取 ControlFrame 暴露的四类命令。", scope: "controller-tick", condition: "compose", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.control.frame", "src.output.compose"] },
    { id: "rel.composer.produces-output", from: "module.output-composer", to: "data.gamepad-output-state", type: "produces", family: "data", label: "最终化", summary: "完整顺序通过后才暴露 finalized output。", scope: "controller-tick", condition: "all stages valid", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.output.compose"] },
    { id: "rel.loop.calls-virtual", from: "module.runtime-loop", to: "module.virtual-gamepad", type: "calls", family: "call", label: "交付", summary: "配置允许输出时，RuntimeLoop 在 compose 后调用 VirtualGamepad::update。", scope: "controller-tick", condition: "runtime.output.enabled", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.runtime.tick"] },
    { id: "rel.virtual.consumes-output", from: "module.virtual-gamepad", to: "data.gamepad-output-state", type: "consumes", family: "data", label: "读取最终状态", summary: "VirtualGamepad 把 finalized state 转成 XUSB report。", scope: "native-output", condition: "update", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.output.vigem"] },
    { id: "rel.virtual.depends-vigem", from: "module.virtual-gamepad", to: "dependency.vigem", type: "depends_on", family: "call", label: "依赖", summary: "通过动态加载的 ViGEm Client 创建并更新 X360 target。", scope: "native-output", condition: "ViGEm available", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.output.vigem"] },
    { id: "rel.virtual.produces-report", from: "module.virtual-gamepad", to: "data.x360-report", type: "produces", family: "data", label: "编码为", summary: "GamepadOutputState 被转换成 XusbReport。", scope: "native-output", condition: "update", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.output.vigem"] },
    { id: "rel.report.consumed-by-game", from: "data.x360-report", to: "external.game-input", type: "exposes", family: "data", label: "呈现为控制器", summary: "ViGEm X360 target 向游戏暴露虚拟控制器报告。", scope: "live-runtime", condition: "target connected", knowledgeKind: "declared_intent", status: "observed", sourceIds: ["src.output.vigem", "src.docs.current-verification"] },
    { id: "rel.runtime.optional-observation", from: "runtime.cod-native-runtime", to: "subsystem.observation", type: "contains", family: "structure", label: "可选观察", summary: "telemetry 与 Fusion 是主链外的观察功能。", scope: "optional-observation", condition: "configured", knowledgeKind: "derived_fact", status: "inferred", sourceIds: ["src.runtime.construct", "src.runtime.tick"] },
    { id: "rel.loop.writes-telemetry", from: "module.runtime-loop", to: "module.runtime-telemetry", type: "writes", family: "observation", label: "事后记录", summary: "输出交付后才收集本 tick 视觉、控制和设备时序。", scope: "telemetry-enabled", condition: "after virtual_gamepad update", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.runtime.tick"] },
    { id: "rel.loop.publishes-fusion", from: "module.runtime-loop", to: "module.fusion-channel", type: "publishes", family: "observation", label: "旁路发布", summary: "新视觉被控制链处理后，在输出交付之后 best-effort 发布。", scope: "fusion-enabled", condition: "telemetry_new_vision and publisher enabled", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.runtime.tick", "src.fusion.publish"] },
    { id: "rel.fusion-channel.produces-frame", from: "module.fusion-channel", to: "data.fusion-frame", type: "produces", family: "data", label: "写入最新帧", summary: "用双 slot seqlock 写入 frame、geometry、target 和 detections。", scope: "fusion-enabled", condition: "valid geometry and enabled", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.fusion.publish"] },
    { id: "rel.fusion-canvas.reads-frame", from: "runtime.fusion-canvas", to: "data.fusion-frame", type: "reads", family: "observation", label: "只读最新", summary: "Canvas 读取 active slot、验证 seqlock 并按 frame_id 去重。", scope: "fusion-enabled", condition: "channel connected", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.fusion.canvas"] },
    { id: "rel.app.contains-fusion", from: "application.native-gamepad-assist", to: "runtime.fusion-canvas", type: "contains", family: "structure", label: "可选显示进程", summary: "Fusion Canvas 是独立可选 runtime，不属于控制主进程。", scope: "fusion-enabled", condition: "launched separately", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.fusion.canvas"] },
    { id: "rel.isolation.governs-canvas", from: "mechanism.capture-isolation", to: "runtime.fusion-canvas", type: "governs", family: "authority", label: "显示前校验", summary: "只有捕获隔离验证通过才可显示；运行中丢失则隐藏并退出。", scope: "fusion-enabled", condition: "overlay visible", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.fusion.isolation", "src.fusion.canvas"] },
    { id: "rel.defaults.feed-resolution", from: "config.code-defaults", to: "mechanism.runtime-config-resolution", type: "configures", family: "config", label: "提供起点", summary: "RuntimeConfig 先由结构体默认值初始化。", scope: "startup", condition: "always", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.config.code-defaults", "src.config.merge"] },
    { id: "rel.file.overrides-resolution", from: "config.file-and-profile", to: "mechanism.runtime-config-resolution", type: "configures", family: "config", label: "覆盖默认值", summary: "profile 和文件键在默认值之上应用。", scope: "startup", condition: "config file/profile present", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.config.merge"] },
    { id: "rel.environment.overrides-resolution", from: "config.environment", to: "mechanism.runtime-config-resolution", type: "configures", family: "config", label: "覆盖文件", summary: "环境变量在文件项之后应用并标记 source。", scope: "startup", condition: "recognized environment variable set", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.config.merge"] },
    { id: "rel.cli.overrides-resolution", from: "config.cli", to: "mechanism.runtime-config-resolution", type: "configures", family: "config", label: "独立覆盖", summary: "main 在 load_runtime_config 返回后应用显式 CLI 选项。", scope: "startup", condition: "recognized CLI option present", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.runtime.main"] },
    { id: "rel.resolution.produces-effective", from: "mechanism.runtime-config-resolution", to: "data.effective-runtime-config", type: "produces", family: "config", label: "校验后产生", summary: "只有通过范围与几何校验的配置进入 runtime。", scope: "startup", condition: "validation succeeds", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.config.merge", "src.runtime.main"] },
    { id: "rel.effective.configures-runtime", from: "data.effective-runtime-config", to: "runtime.cod-native-runtime", type: "configures", family: "config", label: "配置进程", summary: "同一 effective config 构造 RuntimeLoop、Vision 和 controller。", scope: "startup", condition: "main continues", knowledgeKind: "derived_fact", status: "observed", sourceIds: ["src.runtime.main", "src.runtime.construct"] }
  ],

  flows: [
    {
      id: "flow.default-control-tick",
      label: "一次默认原生控制更新",
      ownerId: "module.runtime-loop",
      purpose: "在一个 controller tick 内，把当前物理输入和最多一份可接受的新视觉结果变成一个已交付的虚拟手柄状态。",
      scope: "default-native-gamepad",
      status: "observed",
      sourceIds: ["src.runtime.tick"],
      notes: [
        "controller tick 由 effective config 决定；代码默认和模板均为 1000 Hz。",
        "视觉 cadence 独立；无新帧不等于新帧无目标。",
        "Fusion 与 telemetry 位于设备输出之后。"
      ],
      steps: [
        { id: "stage.tick.read-physical", label: "读取物理手柄", ownerId: "subsystem.input-boundary", summary: "生成本 tick 的 PhysicalGamepadState。", inputIds: ["external.physical-gamepad"], outputIds: ["data.physical-gamepad-state"], guard: "每个 tick", sourceIds: ["src.runtime.tick"] },
        { id: "stage.tick.prepare-intent", label: "固定 scope 与玩家意图", ownerId: "module.native-gamepad-controller", summary: "begin_tick 处理输入边沿和 aim scope；RuntimeLoop 构造 UserAimIntent。", inputIds: ["data.physical-gamepad-state"], outputIds: ["data.user-aim-intent"], guard: "每个 tick", sourceIds: ["src.runtime.tick", "src.control.pipeline"] },
        { id: "stage.tick.read-vision", label: "读取最新视觉", ownerId: "module.vision-service", summary: "service 模式读取 latest snapshot；非 service 模式只在到期时直接 poll。", inputIds: ["data.user-aim-intent"], outputIds: ["data.vision-result"], guard: "有新 service sequence 或 direct poll 到期", sourceIds: ["src.runtime.tick", "src.vision.service-logic"] },
        { id: "stage.tick.admit-vision", label: "校验视觉交付", ownerId: "mechanism.vision-delivery-gate", summary: "先确认 control epoch，再检查 fresh、唯一、单调和 age。", inputIds: ["data.vision-result"], outputIds: ["data.controller-vision-snapshot"], guard: "所有校验同时通过", sourceIds: ["src.runtime.tick", "src.vision.service-logic", "src.vision.adapter"] },
        { id: "stage.tick.resolve-control", label: "求解 ControlFrame", ownerId: "module.native-gamepad-controller", summary: "TargetPlan、互斥求解器、shaper、ownership、AutoFire 与 recoil 形成四类命令。", inputIds: ["data.physical-gamepad-state", "data.controller-vision-snapshot"], outputIds: ["data.control-frame"], guard: "每个已准备 tick", sourceIds: ["src.control.pipeline", "src.control.frame"] },
        { id: "stage.tick.compose-output", label: "按固定顺序合成", ownerId: "module.output-composer", summary: "physical → pre-recoil → fire → recoil → D-pad → finalize。", inputIds: ["data.control-frame"], outputIds: ["data.gamepad-output-state"], guard: "ControlFrame 合法且阶段顺序完整", sourceIds: ["src.output.compose"] },
        { id: "stage.tick.deliver-output", label: "更新虚拟手柄", ownerId: "module.virtual-gamepad", summary: "把最终状态转成 XUSB report 并更新 ViGEm X360 target。", inputIds: ["data.gamepad-output-state"], outputIds: ["data.x360-report"], guard: "runtime.output.enabled", sourceIds: ["src.runtime.tick", "src.output.vigem"] },
        { id: "stage.tick.observe-after-output", label: "事后观察与下帧准备", ownerId: "module.runtime-loop", summary: "设备输出完成后再记录 telemetry、发布 Fusion 并准备未来 viewport。", inputIds: ["data.vision-result", "data.gamepad-output-state"], outputIds: ["data.fusion-frame"], guard: "对应功能开启；不得延迟刚完成的输出", sourceIds: ["src.runtime.tick", "src.fusion.publish"] }
      ]
    },
    {
      id: "flow.vision-engine-poll",
      label: "VisionEngine::poll_once",
      ownerId: "module.vision-engine",
      purpose: "把一次可用的新桌面帧变成带身份、authority 与时序的 VisionResult。",
      scope: "native-vision",
      status: "observed",
      sourceIds: ["src.vision.engine", "src.vision.dxgi", "src.vision.tensorrt"],
      notes: [
        "AcquireNextFrame 超时或没有更新时返回 frame_updated=false。",
        "selector 之后不再存在第二个通用 enhancement 目标修改阶段。"
      ],
      steps: [
        { id: "stage.vision.capture", label: "捕获 ROI", ownerId: "mechanism.dxgi-capture", summary: "获取新桌面帧、复制 ROI，并记录 frame/capture 时间。", inputIds: ["external.game-framebuffer"], outputIds: ["data.captured-frame"], guard: "DXGI 返回新帧", sourceIds: ["src.vision.dxgi", "src.vision.engine"] },
        { id: "stage.vision.no-update", label: "无新帧直接返回", ownerId: "module.vision-engine", summary: "保留 frame_updated=false；不重复上一帧成为新观察。", inputIds: ["data.captured-frame"], outputIds: ["data.vision-result"], guard: "metadata.updated=false", sourceIds: ["src.vision.engine", "src.docs.vision-config"] },
        { id: "stage.vision.preprocess", label: "CUDA 预处理", ownerId: "mechanism.cuda-preprocess", summary: "映射 capture texture，按几何契约缩放并生成 TensorRT 输入。", inputIds: ["data.captured-frame"], outputIds: [], guard: "frame_updated=true", sourceIds: ["src.vision.engine"] },
        { id: "stage.vision.infer", label: "TensorRT 推理", ownerId: "mechanism.tensorrt-inference", summary: "enqueue 或 CUDA Graph launch，复制输出并 decode detections。", inputIds: [], outputIds: ["data.detection-batch"], guard: "preprocess succeeds", sourceIds: ["src.vision.tensorrt", "src.vision.engine"] },
        { id: "stage.vision.select", label: "选择目标", ownerId: "mechanism.native-target-selector", summary: "结合候选、颜色区域和 UserAimIntent，确定 selected detection 与 authority。", inputIds: ["data.detection-batch", "data.user-aim-intent"], outputIds: ["data.vision-result"], guard: "decoded batch", sourceIds: ["src.vision.engine"] },
        { id: "stage.vision.publish-result", label: "封装 VisionResult", ownerId: "module.vision-engine", summary: "复制 selector identity、detections 和 timing，设置 result_at_ns 后返回。", inputIds: ["data.detection-batch"], outputIds: ["data.vision-result"], guard: "selector completes", sourceIds: ["src.vision.engine"] }
      ]
    },
    {
      id: "flow.controller-resolve",
      label: "NativeGamepadController::resolve_control_frame",
      ownerId: "module.native-gamepad-controller",
      purpose: "把当前输入和已交付观察压缩成一个有唯一目标 owner、唯一 manual/AI owner 的 ControlFrame。",
      scope: "native-controller",
      status: "observed",
      sourceIds: ["src.control.pipeline", "src.control.coordinator", "src.control.owner"],
      notes: [
        "ADS 与 BodyLock 是互斥求解器。",
        "manual/AI 最终裁决只在 AssistControlStateMachine 发生一次。",
        "recoil 在目标/玩家裁决之后独立产生 contribution。"
      ],
      steps: [
        { id: "stage.control.consume-snapshot", label: "接收新观察", ownerId: "module.native-gamepad-controller", summary: "把 pending snapshot 转成 observation batch，并处理 ADS epoch rearm。", inputIds: ["data.controller-vision-snapshot"], outputIds: [], guard: "snapshot available or replay last immutable plan", sourceIds: ["src.control.pipeline"] },
        { id: "stage.control.plan", label: "生成唯一 TargetPlan", ownerId: "module.target-coordinator", summary: "更新目标身份、生命周期、模式、authority 和 fire eligibility。", inputIds: ["data.controller-vision-snapshot", "data.user-aim-intent"], outputIds: ["data.target-plan"], guard: "每个 control resolve", sourceIds: ["src.control.coordinator"] },
        { id: "stage.control.solve", label: "运行一个模式求解器", ownerId: "module.native-gamepad-controller", summary: "AdsAcquire 调 ADS；BodyLockFollow 调 BodyLock；Manual 不产生 AI proposal。", inputIds: ["data.target-plan"], outputIds: ["data.ai-stick-proposal"], guard: "plan.mode", sourceIds: ["src.control.pipeline"] },
        { id: "stage.control.shape", label: "统一整形一次", ownerId: "mechanism.aim-dynamics-shaper", summary: "无论来源，proposal 只通过一个 dynamics shaper。", inputIds: ["data.ai-stick-proposal", "data.target-plan"], outputIds: [], guard: "每个 resolve", sourceIds: ["src.control.pipeline", "src.docs.current-verification"] },
        { id: "stage.control.own", label: "裁决 manual / AI", ownerId: "mechanism.assist-control-state-machine", summary: "结合目标 authority 和玩家输入，输出唯一 pre-recoil stick。", inputIds: ["data.physical-gamepad-state", "data.target-plan", "data.ai-stick-proposal"], outputIds: ["data.pre-recoil-stick-command"], guard: "每个 resolve", sourceIds: ["src.control.pipeline", "src.control.owner"] },
        { id: "stage.control.fire", label: "生成 synthetic fire", ownerId: "mechanism.auto-fire-gate", summary: "不改变 stick；只在安全条件满足时产生 FireCommand。", inputIds: ["data.target-plan", "data.pre-recoil-stick-command"], outputIds: ["data.fire-command"], guard: "gate reduce", sourceIds: ["src.control.pipeline", "src.control.frame"] },
        { id: "stage.control.recoil", label: "计算 recoil contribution", ownerId: "mechanism.recoil-reducer", summary: "在最终输出合成前产生独立 stick delta。", inputIds: ["data.physical-gamepad-state"], outputIds: ["data.recoil-contribution"], guard: "recoil reduce", sourceIds: ["src.control.pipeline", "src.control.frame"] },
        { id: "stage.control.freeze-frame", label: "固定 ControlFrame", ownerId: "module.native-gamepad-controller", summary: "把 sample 与四类命令写入唯一输出边界。", inputIds: ["data.pre-recoil-stick-command", "data.fire-command", "data.recoil-contribution"], outputIds: ["data.control-frame"], guard: "sample valid", sourceIds: ["src.control.pipeline", "src.control.frame"] }
      ]
    },
    {
      id: "flow.output-compose",
      label: "OutputComposer 单向合成",
      ownerId: "module.output-composer",
      purpose: "以固定且可验证的顺序生成唯一可交付 GamepadOutputState。",
      scope: "native-output",
      status: "observed",
      sourceIds: ["src.output.compose", "src.control.frame"],
      notes: [
        "顺序错误、重复阶段、非法数值或 finalize 后写入都会失败。",
        "Recoil 明确位于 pre-recoil stick 之后，不能反馈进入目标裁决。"
      ],
      steps: [
        { id: "stage.output.seed", label: "物理状态透传", ownerId: "module.output-composer", summary: "用 PhysicalGamepadState 初始化全部轴、扳机、按键和 D-pad。", inputIds: ["data.physical-gamepad-state"], outputIds: [], guard: "stage=Empty", sourceIds: ["src.output.compose"] },
        { id: "stage.output.pre-recoil", label: "写入 pre-recoil stick", ownerId: "module.output-composer", summary: "仅替换右摇杆的目标/玩家裁决结果。", inputIds: ["data.pre-recoil-stick-command"], outputIds: [], guard: "stage=PhysicalSeeded", sourceIds: ["src.output.compose"] },
        { id: "stage.output.fire", label: "合并 synthetic fire", ownerId: "module.output-composer", summary: "在物理开火已透传的基础上，只增加合成开火。", inputIds: ["data.fire-command"], outputIds: [], guard: "stage=PreRecoilWritten", sourceIds: ["src.output.compose", "src.control.frame"] },
        { id: "stage.output.recoil", label: "叠加 recoil", ownerId: "module.output-composer", summary: "在 pre-recoil stick 上叠加并 clamp recoil delta。", inputIds: ["data.recoil-contribution"], outputIds: [], guard: "stage=FireWritten", sourceIds: ["src.output.compose"] },
        { id: "stage.output.dpad", label: "合并辅助 D-pad", ownerId: "module.output-composer", summary: "按需加入 enemy mark 等辅助方向键命令。", inputIds: ["data.control-frame"], outputIds: [], guard: "stage=RecoilWritten", sourceIds: ["src.output.compose", "src.runtime.tick"] },
        { id: "stage.output.finalize", label: "限制并最终化", ownerId: "module.output-composer", summary: "对轴和扳机作最终 clamp，只有 Finalized 才返回输出指针。", inputIds: [], outputIds: ["data.gamepad-output-state"], guard: "stage=AuxiliaryDpadWritten", sourceIds: ["src.output.compose"] }
      ]
    },
    {
      id: "flow.config-resolution",
      label: "运行配置解析",
      ownerId: "mechanism.runtime-config-resolution",
      purpose: "说明某个运行值最终来自哪里，而不是把模板值误写成机器实际值。",
      scope: "startup",
      status: "observed",
      sourceIds: ["src.config.code-defaults", "src.config.merge", "src.runtime.main"],
      notes: [
        "本案例未读取本机 config.toml 或环境变量，因此 effective 值未知。",
        "--dump-effective-config 能输出所选值及 source。"
      ],
      steps: [
        { id: "stage.config.defaults", label: "建立代码默认值", ownerId: "config.code-defaults", summary: "构造 RuntimeConfig。", inputIds: [], outputIds: [], guard: "always", sourceIds: ["src.config.code-defaults"] },
        { id: "stage.config.profile-file", label: "应用 profile 与文件", ownerId: "config.file-and-profile", summary: "CLI profile 优先于文件 profile；其余文件键随后覆盖。", inputIds: [], outputIds: [], guard: "source present", sourceIds: ["src.config.merge"] },
        { id: "stage.config.environment", label: "应用环境变量", ownerId: "config.environment", summary: "覆盖受支持的 vision、telemetry、recoil 和 gamepad 项。", inputIds: [], outputIds: [], guard: "recognized variable set", sourceIds: ["src.config.merge"] },
        { id: "stage.config.validate", label: "校验配置", ownerId: "mechanism.runtime-config-resolution", summary: "检查范围、形状和跨字段约束；失败则不启动。", inputIds: [], outputIds: ["data.effective-runtime-config"], guard: "after load", sourceIds: ["src.config.merge"] },
        { id: "stage.config.cli", label: "应用独立 CLI 覆盖", ownerId: "config.cli", summary: "main 继续覆盖 capture FPS / AutoFire output，并记录 source=cli。", inputIds: ["data.effective-runtime-config"], outputIds: ["data.effective-runtime-config"], guard: "option present", sourceIds: ["src.runtime.main"] },
        { id: "stage.config.inspect", label: "输出 effective config", ownerId: "runtime.cod-native-runtime", summary: "--dump-effective-config 可在构造 RuntimeLoop 前打印值和来源。", inputIds: ["data.effective-runtime-config"], outputIds: [], guard: "flag set", sourceIds: ["src.runtime.main"] }
      ]
    },
    {
      id: "flow.fusion-observation",
      label: "Fusion 只读显示支路",
      ownerId: "runtime.fusion-canvas",
      purpose: "在不进入控制 authority 的前提下，把最新目标和检测几何显示在独立 overlay。",
      scope: "fusion-enabled",
      status: "observed",
      sourceIds: ["src.runtime.tick", "src.fusion.publish", "src.fusion.canvas", "src.fusion.isolation"],
      notes: [
        "publisher 是 best-effort；连续失败后自停，不阻塞控制。",
        "Canvas 摄取最新状态，显示帧率上限只合并 present，不丢掉 signaled sample 摄取。",
        "捕获隔离失败时隐藏并 fail closed。"
      ],
      steps: [
        { id: "stage.fusion.publish", label: "主链事后发布", ownerId: "module.runtime-loop", summary: "ViGEm update 后把新 VisionResult 转成 Fusion target/detections。", inputIds: ["data.vision-result"], outputIds: ["data.fusion-frame"], guard: "fusion enabled and new vision", sourceIds: ["src.runtime.tick"] },
        { id: "stage.fusion.write", label: "写 latest-state slot", ownerId: "module.fusion-channel", summary: "奇偶 write_sequence 保护 payload，切换 active_slot 后 SetEvent。", inputIds: ["data.fusion-frame"], outputIds: ["data.fusion-frame"], guard: "publisher enabled", sourceIds: ["src.fusion.publish"] },
        { id: "stage.fusion.read", label: "读取并去重", ownerId: "runtime.fusion-canvas", summary: "读取稳定 slot；相同 frame_id 不重复处理。", inputIds: ["data.fusion-frame"], outputIds: [], guard: "channel signaled or polling fallback", sourceIds: ["src.fusion.canvas"] },
        { id: "stage.fusion.isolate", label: "验证捕获隔离", ownerId: "mechanism.capture-isolation", summary: "显示前设置/读取 affinity，运行中每秒复查。", inputIds: [], outputIds: [], guard: "overlay may show", sourceIds: ["src.fusion.isolation", "src.fusion.canvas"] },
        { id: "stage.fusion.render", label: "限频渲染", ownerId: "runtime.fusion-canvas", summary: "事件驱动摄取后按 frame cap 合并 DWM present，并对 stale marker 设上限。", inputIds: ["data.fusion-frame"], outputIds: [], guard: "visible and isolation valid", sourceIds: ["src.fusion.canvas"] }
      ]
    }
  ],

  conflicts: [
    {
      id: "conflict.default-model-path",
      label: "无本地配置时的默认 engine 路径不一致",
      topic: "runtime.vision.model_path",
      scope: "no config.toml; default native runtime",
      status: "unresolved",
      severity: "medium",
      values: [
        { value: "models/candidates/body_union_manual_core_x2_neg_e6_480x416.engine", sourceId: "src.config.code-defaults", role: "implementation default" },
        { value: "models/best.engine", sourceId: "src.docs.readme-contract", role: "README current contract" }
      ],
      assessment: "README 明确说无 config.toml 使用代码默认值，但它列出的 engine 与 RuntimeConfig 默认值不同；scope 重叠，固定提交内没有足够证据自动判定哪项应成为规范。",
      requiredResolution: "由维护者确认当前无配置启动契约，并更新权威 owner；在此之前只能报告差异。"
    },
    {
      id: "conflict.maintained-example-idle-fps",
      label: "两份维护示例的 idle capture FPS 不一致",
      topic: "runtime.vision.idle_capture_fps",
      scope: "maintained 640x512 -> 480x384 native example",
      status: "unresolved",
      severity: "low",
      values: [
        { value: "60", sourceId: "src.config.example", role: "config.native.example.toml" },
        { value: "20", sourceId: "src.docs.vision-config", role: "NATIVE_VISION maintained example" }
      ],
      assessment: "两处都描述维护中的 native 示例且 geometry/model 相同，未看到明确 profile 或日期策略解释差异。",
      requiredResolution: "确认文档示例是否应追随配置模板；不要由 Agent 静默择一。"
    }
  ],

  verification: [
    {
      id: "verification.repo-recorded-2026-08-10",
      label: "仓库记录的 2026-08-10 验证",
      state: "recorded-not-rerun",
      scope: "default native controller chain at that review",
      summary: "CURRENT_STATE 记录 clean Release build、CTest 43/43、focused Python contracts 32/32 与 production-only sustained AimLab smoke 12/12。",
      caveat: "这是固定提交中文档记录，不是本次内容整理重新执行的结果；文档同时说明仍需 matched live A/B。",
      sourceIds: ["src.docs.current-verification"]
    },
    {
      id: "verification.fixture-source-boundary",
      label: "固定 Git 对象边界",
      state: "verified-for-fixture",
      scope: "content extraction",
      summary: "本次所有案例代码读取都使用 git show/git grep 指向完整 commit 9505591f…；工作区修改未作为事实来源。",
      caveat: "这只验证内容来源边界，不验证固定提交能在当前机器构建或运行。",
      sourceIds: []
    },
    {
      id: "verification.live-runtime",
      label: "当前机器 live runtime",
      state: "not-run",
      scope: "DXGI/CUDA/TensorRT/ViGEm/gameplay",
      summary: "本次没有启动游戏、VisionEngine、ViGEm 或 Fusion Canvas。",
      caveat: "不能把静态代码结构或历史记录写成当前硬件验收。",
      sourceIds: []
    }
  ],

  guide: {
    id: "guide.game-frame-to-virtual-input",
    projectionId: "preview.yolo-study-001.native-runtime-technical-article.v2",
    viewFamily: "technical-guide",
    title: "游戏画面如何变成虚拟手柄输入",
    href: "../yolo-study-001-reference-preview.html",
    readerBaseline: "no prior project knowledge",
    focusIds: [
      "application.native-gamepad-assist",
      "module.runtime-loop",
      "module.vision-engine",
      "mechanism.vision-delivery-gate",
      "module.target-coordinator",
      "module.output-composer",
      "runtime.fusion-canvas",
      "mechanism.runtime-config-resolution"
    ],
    sectionLinks: [
      { label: "程序完成的工作", anchor: "purpose", focusId: "application.native-gamepad-assist" },
      { label: "一次控制更新", anchor: "tick", focusId: "module.runtime-loop" },
      { label: "视觉交付条件", anchor: "vision", focusId: "mechanism.vision-delivery-gate" },
      { label: "目标与控制模式", anchor: "target", focusId: "module.target-coordinator" },
      { label: "最终手柄状态", anchor: "output", focusId: "module.output-composer" },
      { label: "Fusion Canvas", anchor: "fusion", focusId: "runtime.fusion-canvas" },
      { label: "配置来源", anchor: "config", focusId: "mechanism.runtime-config-resolution" },
      { label: "验证状态", anchor: "status", focusId: "module.runtime-loop" }
    ]
  }
};

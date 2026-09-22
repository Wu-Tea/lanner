(() => {
  "use strict";

  const base = window.YOLO_CASE_BASE;
  const projections = window.YOLO_CASE_PROJECTIONS;
  const root = document.getElementById("view-root");
  const inspector = document.getElementById("inspector-content");

  if (!base || !projections) {
    root.innerHTML = '<div class="empty-state">案例数据未加载。请确认 base.fixture.js 与 projection-specs.fixture.js 和本页位于同一目录。</div>';
    return;
  }

  const nodeById = new Map(base.nodes.map((node) => [node.id, node]));
  const relationById = new Map(base.relations.map((relation) => [relation.id, relation]));
  const sourceById = new Map(base.sources.map((source) => [source.id, source]));
  const flowById = new Map(base.flows.map((flow) => [flow.id, flow]));
  const stepById = new Map();
  base.flows.forEach((flow) => flow.steps.forEach((step) => stepById.set(step.id, { ...step, flowId: flow.id })));

  const familyToKey = {
    "application-framework": "framework",
    "runtime-flow": "flow",
    "module-detail": "detail",
    "relationship-explorer": "relations",
    "evidence-detail": "evidence"
  };
  const keyToProjection = new Map(
    projections.views.map((view) => [familyToKey[view.family], view])
  );

  const layerColors = {
    application: "#183753",
    external: "#697682",
    runtime: "#183753",
    input: "#546d7d",
    vision: "#236f91",
    control: "#2f7d73",
    output: "#6d568c",
    observation: "#9a6419",
    config: "#795d3f"
  };
  const familyColors = {
    structure: "#697682",
    call: "#183753",
    data: "#236f91",
    authority: "#2f7d73",
    config: "#795d3f",
    observation: "#9a6419"
  };
  const familyLabels = {
    all: "全部",
    structure: "结构",
    call: "调用/依赖",
    data: "数据",
    authority: "状态/约束",
    config: "配置",
    observation: "观察"
  };

  const state = {
    view: "framework",
    focusId: projections.focusContract.defaultFocusId,
    selection: { kind: "node", id: projections.focusContract.defaultFocusId },
    flowId: "flow.default-control-tick",
    detailModuleId: "module.runtime-loop",
    relationFamily: "all",
    relationDirection: "both",
    selectedRelationId: null,
    evidenceAll: false
  };

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }

  function uniq(values) {
    return [...new Set(values.filter(Boolean))];
  }

  function node(id) {
    return nodeById.get(id);
  }

  function flow(id) {
    return flowById.get(id);
  }

  function entityLabel(id) {
    return nodeById.get(id)?.label || flowById.get(id)?.label || stepById.get(id)?.label || id;
  }

  function validateFixture() {
    const errors = [];
    const duplicateCheck = (items, label) => {
      const seen = new Set();
      items.forEach((item) => {
        if (!item.id) errors.push(`${label} 缺少 id`);
        else if (seen.has(item.id)) errors.push(`${label} 重复 id: ${item.id}`);
        seen.add(item.id);
      });
    };
    duplicateCheck(base.nodes, "node");
    duplicateCheck(base.relations, "relation");
    duplicateCheck(base.sources, "source");
    duplicateCheck(base.flows, "flow");
    duplicateCheck([...stepById.values()], "flow step");

    base.nodes.forEach((item) => {
      (item.sourceIds || []).forEach((id) => {
        if (!sourceById.has(id)) errors.push(`${item.id} 引用未知 source ${id}`);
      });
    });
    base.relations.forEach((item) => {
      if (!nodeById.has(item.from)) errors.push(`${item.id} 未知 from ${item.from}`);
      if (!nodeById.has(item.to)) errors.push(`${item.id} 未知 to ${item.to}`);
      (item.sourceIds || []).forEach((id) => {
        if (!sourceById.has(id)) errors.push(`${item.id} 引用未知 source ${id}`);
      });
    });
    base.flows.forEach((item) => {
      if (!nodeById.has(item.ownerId)) errors.push(`${item.id} 未知 owner ${item.ownerId}`);
      item.steps.forEach((step) => {
        if (!nodeById.has(step.ownerId)) errors.push(`${step.id} 未知 owner ${step.ownerId}`);
        [...(step.inputIds || []), ...(step.outputIds || [])].forEach((id) => {
          if (!nodeById.has(id)) errors.push(`${step.id} 引用未知 node ${id}`);
        });
        (step.sourceIds || []).forEach((id) => {
          if (!sourceById.has(id)) errors.push(`${step.id} 引用未知 source ${id}`);
        });
      });
    });
    if (projections.baseId !== base.meta.baseId) {
      errors.push(`projection baseId ${projections.baseId} 与 Base ${base.meta.baseId} 不一致`);
    }
    return errors;
  }

  const fixtureErrors = validateFixture();
  if (fixtureErrors.length) {
    root.innerHTML = `<div class="empty-state"><strong>案例数据引用校验失败</strong><br>${fixtureErrors.map(escapeHtml).join("<br>")}</div>`;
    console.error("YOLO case fixture validation failed", fixtureErrors);
    return;
  }

  function parseInitialHash() {
    const raw = location.hash.replace(/^#/, "");
    if (!raw) return;
    const [viewKey, encodedFocus] = raw.split("/");
    if (keyToProjection.has(viewKey)) state.view = viewKey;
    if (encodedFocus) {
      const candidate = decodeURIComponent(encodedFocus);
      if (nodeById.has(candidate)) {
        state.focusId = candidate;
        state.selection = { kind: "node", id: candidate };
      }
    }
  }

  function updateHash() {
    const next = `#${state.view}/${encodeURIComponent(state.focusId)}`;
    if (location.hash !== next) history.replaceState(null, "", next);
  }

  function renderChrome() {
    document.getElementById("project-title").textContent = base.meta.title;
    document.getElementById("snapshot-pill").textContent = `${base.meta.branchContext}@${base.meta.commitShort}`;
    document.getElementById("scope-line").textContent = "默认原生手柄路径 · 固定 Git 对象 · 未提交修改已排除";
    document.getElementById("base-revision").textContent = `${base.meta.baseId} · ${base.meta.revision}`;

    const nav = document.getElementById("view-nav-items");
    nav.innerHTML = projections.views.map((view, index) => {
      const key = familyToKey[view.family];
      return `
        <button class="view-nav-button" type="button" data-view-key="${escapeAttr(key)}" aria-current="${state.view === key ? "page" : "false"}">
          <span class="nav-index">0${index + 1}</span>
          <span>${escapeHtml(view.label)}</span>
        </button>`;
    }).join("");
  }

  function renderHeading() {
    const projection = keyToProjection.get(state.view);
    const focus = node(state.focusId);
    document.getElementById("view-family").textContent = projection.family;
    document.getElementById("view-title").textContent = projection.label;
    document.getElementById("view-question").textContent = projection.question;
    document.getElementById("focus-chip").textContent = focus?.label || state.focusId;
    document.getElementById("focus-id").textContent = state.focusId;
    document.getElementById("view-meta").innerHTML = `
      <span class="meta-chip">${base.nodes.length} objects</span>
      <span class="meta-chip">${base.relations.length} relations</span>
      <span class="meta-chip">${base.conflicts.length} unresolved</span>`;
  }

  function layerClass(item) {
    return `layer-${item?.layer || "external"}`;
  }

  function nodeButton(id, subtitle = "") {
    const item = node(id);
    if (!item) return "";
    return `
      <button type="button" class="node-button ${layerClass(item)} ${state.focusId === id ? "is-focus" : ""}" data-focus-id="${escapeAttr(id)}">
        <strong>${escapeHtml(item.label)}</strong>
        ${subtitle ? `<small>${escapeHtml(subtitle)}</small>` : ""}
      </button>`;
  }

  function renderFramework() {
    root.innerHTML = `
      <p class="view-intro">先看边界，不从类名开始。左侧两类输入进入一个原生主进程；右侧只有虚拟手柄输出进入游戏。Fusion 是主链完成输出后的可选只读支路。</p>
      <div class="notice-line"><strong>配置值未硬编码</strong><span>控制 tick 的代码默认与模板都是 1000 Hz；Vision cadence 和模型取决于 effective config。本提交内仍有两项文档差异，见“资料与证据”。</span></div>
      <div class="framework-map" aria-label="默认原生手柄应用框架">
        <div class="framework-main">
          <div class="framework-column">
            <div class="column-title">外部输入</div>
            ${nodeButton("external.physical-gamepad", "玩家轴、扳机与按键")}
            ${nodeButton("external.game-framebuffer", "DXGI 桌面新帧")}
          </div>
          <div class="flow-arrow" aria-hidden="true">→</div>
          <div class="runtime-boundary">
            <div class="runtime-boundary-head">
              <div class="runtime-label">
                <span>默认入口</span>
                ${nodeButton("entry.gamepad-start", "默认选择 native")}
              </div>
              <div class="flow-arrow" aria-hidden="true">→</div>
              <div class="runtime-label">
                <span>单一主进程</span>
                ${nodeButton("runtime.cod-native-runtime", "RuntimeLoop 持有热路径")}
              </div>
            </div>
            <div class="runtime-chain">
              ${nodeButton("subsystem.input-boundary", "固定本 tick 输入")}
              ${nodeButton("subsystem.vision", "捕获、推理、选择、交付")}
              ${nodeButton("subsystem.control", "目标计划与控制裁决")}
              ${nodeButton("subsystem.output", "合成并提交 ViGEm")}
            </div>
          </div>
          <div class="flow-arrow" aria-hidden="true">→</div>
          <div class="framework-column">
            <div class="column-title">主输出</div>
            ${nodeButton("external.game-input", "虚拟 Xbox 360 状态")}
          </div>
        </div>

        <div class="framework-branch">
          ${nodeButton("module.runtime-loop", "设备输出完成后发布")}
          <div class="flow-arrow" aria-hidden="true">→</div>
          ${nodeButton("module.fusion-channel", "latest-state / best-effort")}
          <div class="flow-arrow" aria-hidden="true">→</div>
          ${nodeButton("runtime.fusion-canvas", "独立只读 overlay")}
        </div>
        <p class="branch-note">可选观察支路：不返回控制链，不拥有瞄准或开火 authority。</p>
      </div>

      <div class="framework-reading" aria-label="下一步阅读入口">
        <div class="reading-item"><strong>想知道一次输入怎样走完</strong>切换“运行链路”，从一轮 control tick 顺序阅读。</div>
        <div class="reading-item"><strong>想看某个组件内部</strong>点选组件后切换“模块细节”，焦点 ID 会保留。</div>
        <div class="reading-item"><strong>只想确认依赖关系</strong>切换“关系”，只显示当前对象的一跳、有方向关系。</div>
      </div>`;
  }

  function flowForFocus(focusId) {
    const exactOwner = base.flows.find((item) => item.ownerId === focusId);
    if (exactOwner) return exactOwner.id;
    const touching = base.flows.find((item) => item.steps.some((step) =>
      step.ownerId === focusId || (step.inputIds || []).includes(focusId) || (step.outputIds || []).includes(focusId)
    ));
    return touching?.id || state.flowId || "flow.default-control-tick";
  }

  function ioChips(ids, direction) {
    if (!ids?.length) return "";
    return ids.map((id) => `<button type="button" class="io-chip" data-focus-id="${escapeAttr(id)}">${direction} · ${escapeHtml(entityLabel(id))}</button>`).join("");
  }

  function timelineHtml(selectedFlow) {
    return `
      <ol class="timeline">
        ${selectedFlow.steps.map((step, index) => {
          const owner = node(step.ownerId);
          return `
            <li class="timeline-item">
              <div class="step-index">${String(index + 1).padStart(2, "0")}</div>
              <div class="step-body">
                <div class="step-title">
                  <button type="button" data-step-id="${escapeAttr(step.id)}">${escapeHtml(step.label)}</button>
                  <span class="type-label">${escapeHtml(step.id)}</span>
                </div>
                <p>${escapeHtml(step.summary)}</p>
                <span class="guard-label">条件：${escapeHtml(step.guard)}</span>
                <div class="step-io">
                  ${ioChips(step.inputIds, "入")}
                  ${ioChips(step.outputIds, "出")}
                </div>
              </div>
              <div class="step-owner">
                OWNER
                <button type="button" class="${layerClass(owner)}" data-focus-id="${escapeAttr(step.ownerId)}">${escapeHtml(owner?.label || step.ownerId)}</button>
              </div>
            </li>`;
        }).join("")}
      </ol>`;
  }

  function renderFlow() {
    if (!flowById.has(state.flowId)) state.flowId = flowForFocus(state.focusId);
    const selectedFlow = flow(state.flowId);
    root.innerHTML = `
      <div class="flow-toolbar">
        <div class="field-group">
          <label for="flow-select">选择真实流程</label>
          <select id="flow-select" class="select-control">
            ${base.flows.map((item) => `<option value="${escapeAttr(item.id)}" ${item.id === selectedFlow.id ? "selected" : ""}>${escapeHtml(item.label)}</option>`).join("")}
          </select>
        </div>
        <button class="small-button" type="button" data-focus-id="${escapeAttr(selectedFlow.ownerId)}">聚焦流程 owner</button>
      </div>
      <div class="flow-summary">
        <div>
          <p class="section-kicker">${escapeHtml(selectedFlow.scope)}</p>
          <h2>${escapeHtml(selectedFlow.label)}</h2>
          <p>${escapeHtml(selectedFlow.purpose)}</p>
        </div>
        <ul class="summary-notes">${selectedFlow.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>
      </div>
      ${timelineHtml(selectedFlow)}`;

    document.getElementById("flow-select").addEventListener("change", (event) => {
      state.flowId = event.target.value;
      const nextFlow = flow(state.flowId);
      state.focusId = nextFlow.ownerId;
      state.selection = { kind: "flow", id: nextFlow.id };
      renderAll();
    });
  }

  function detailModuleForFocus(focusId) {
    const mapping = keyToProjection.get("detail").query.moduleFlowMap;
    if (mapping[focusId]) return focusId;
    for (const [moduleId, flowId] of Object.entries(mapping)) {
      const candidateFlow = flow(flowId);
      if (candidateFlow?.steps.some((step) => step.ownerId === focusId || (step.inputIds || []).includes(focusId) || (step.outputIds || []).includes(focusId))) {
        return moduleId;
      }
    }
    return state.detailModuleId || "module.runtime-loop";
  }

  function relationChipsFor(id, mode) {
    let matches = base.relations.filter((relation) => relation.from === id || relation.to === id);
    if (mode === "input") {
      matches = matches.filter((relation) => relation.from === id && ["reads", "consumes", "depends_on", "calls"].includes(relation.type));
    } else {
      matches = matches.filter((relation) => relation.from === id && ["produces", "publishes", "writes", "governs", "exposes"].includes(relation.type));
    }
    if (!matches.length) return '<span class="type-label">由流程步骤说明</span>';
    return matches.slice(0, 5).map((relation) => {
      const other = relation.from === id ? relation.to : relation.from;
      return `<button type="button" class="relation-chip" data-relation-id="${escapeAttr(relation.id)}">${escapeHtml(relation.label)} · ${escapeHtml(entityLabel(other))}</button>`;
    }).join("");
  }

  function renderDetail() {
    const mapping = keyToProjection.get("detail").query.moduleFlowMap;
    if (!mapping[state.detailModuleId]) state.detailModuleId = detailModuleForFocus(state.focusId);
    const moduleItem = node(state.detailModuleId);
    const selectedFlow = flow(mapping[state.detailModuleId]);
    const boundary = moduleItem.boundary || moduleItem.invariant || selectedFlow.notes.join("；");
    const focusContext = state.focusId !== moduleItem.id
      ? `<div class="notice-line"><strong>焦点仍保留</strong><span>${escapeHtml(entityLabel(state.focusId))} 暂无独立内部流程；下面显示它所在的 ${escapeHtml(moduleItem.label)} 流程。关系和证据视图仍以原焦点为中心。</span></div>`
      : "";

    root.innerHTML = `
      <div class="module-toolbar">
        <div class="field-group">
          <label for="module-select">选择模块</label>
          <select id="module-select" class="select-control">
            ${Object.keys(mapping).map((id) => `<option value="${escapeAttr(id)}" ${id === moduleItem.id ? "selected" : ""}>${escapeHtml(entityLabel(id))}</option>`).join("")}
          </select>
        </div>
        <button class="small-button" type="button" data-view-key="relations">只看 ${escapeHtml(entityLabel(state.focusId))} 的关系</button>
      </div>

      ${focusContext}

      <div class="module-summary">
        <div>
          <p class="section-kicker">${escapeHtml(moduleItem.kind)} · ${escapeHtml(moduleItem.scope)}</p>
          <h2>${escapeHtml(moduleItem.label)}</h2>
          <p>${escapeHtml(moduleItem.summary)}</p>
        </div>
        <ul class="summary-notes">${selectedFlow.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>
      </div>

      <div class="module-facts">
        <div class="module-fact"><span>读入 / 调用</span><div class="relation-chips">${relationChipsFor(moduleItem.id, "input")}</div></div>
        <div class="module-fact"><span>产出 / 约束</span><div class="relation-chips">${relationChipsFor(moduleItem.id, "output")}</div></div>
        <div class="module-fact"><span>职责边界</span><p>${escapeHtml(boundary)}</p></div>
      </div>

      ${timelineHtml(selectedFlow)}`;

    document.getElementById("module-select").addEventListener("change", (event) => {
      state.detailModuleId = event.target.value;
      state.focusId = state.detailModuleId;
      state.selection = { kind: "node", id: state.detailModuleId };
      renderAll();
    });
  }

  function incidentRelations(focusId) {
    return base.relations.filter((relation) => {
      if (state.relationFamily !== "all" && relation.family !== state.relationFamily) return false;
      if (state.relationDirection === "out") return relation.from === focusId;
      if (state.relationDirection === "in") return relation.to === focusId;
      return relation.from === focusId || relation.to === focusId;
    });
  }

  function svgTextLines(label, max = 17) {
    if (label.length <= max) return [label];
    const splitAt = Math.min(max, label.length);
    return [label.slice(0, splitAt), label.slice(splitAt, splitAt + max)];
  }

  function graphSvg(focusItem, relations) {
    if (!relations.length) return '<div class="graph-empty">当前方向和关系类型下没有一跳关系。</div>';
    const width = 920;
    const height = 520;
    const center = { x: width / 2, y: height / 2 };
    const rx = relations.length <= 5 ? 300 : 338;
    const ry = relations.length <= 5 ? 170 : 205;
    const neighborIds = uniq(relations.map((relation) => relation.from === focusItem.id ? relation.to : relation.from));
    const positions = new Map([[focusItem.id, center]]);
    neighborIds.forEach((id, index) => {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * index / neighborIds.length);
      positions.set(id, { x: center.x + Math.cos(angle) * rx, y: center.y + Math.sin(angle) * ry });
    });

    const defs = Object.entries(familyColors).map(([family, color]) => `
      <marker id="arrow-${family}" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L8,4 L0,8 z" fill="${color}"></path>
      </marker>`).join("");

    const edgeMarkup = relations.map((relation) => {
      const from = positions.get(relation.from);
      const to = positions.get(relation.to);
      if (!from || !to) return "";
      const color = familyColors[relation.family] || "#697682";
      const selected = state.selectedRelationId === relation.id ? "is-selected" : "";
      const mx = (from.x + to.x) / 2;
      const my = (from.y + to.y) / 2 - 5;
      return `
        <line class="graph-edge ${selected}" x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="${color}" marker-end="url(#arrow-${escapeAttr(relation.family)})"></line>
        <line class="graph-edge-hit" x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" data-relation-id="${escapeAttr(relation.id)}"></line>
        <text class="graph-edge-label" x="${mx}" y="${my}" text-anchor="middle" data-relation-id="${escapeAttr(relation.id)}" role="button" tabindex="0" aria-label="关系：${escapeAttr(relation.label)}">${escapeHtml(relation.label)}</text>`;
    }).join("");

    const nodeMarkup = [...positions.entries()].map(([id, position]) => {
      const item = node(id);
      const lines = svgTextLines(item.label);
      const nodeWidth = 158;
      const nodeHeight = 60;
      const x = position.x - nodeWidth / 2;
      const y = position.y - nodeHeight / 2;
      const color = layerColors[item.layer] || layerColors.external;
      const lineMarkup = lines.map((line, index) => `<tspan x="${position.x}" dy="${index === 0 ? 0 : 13}">${escapeHtml(line)}</tspan>`).join("");
      return `
        <g class="graph-node ${id === focusItem.id ? "is-center" : ""}" data-focus-id="${escapeAttr(id)}" role="button" tabindex="0" aria-label="${escapeAttr(item.label)}">
          <rect x="${x}" y="${y}" width="${nodeWidth}" height="${nodeHeight}" rx="5" style="--node-color:${color}"></rect>
          <rect class="node-accent" x="${x}" y="${y}" width="4" height="${nodeHeight}" rx="2" style="--node-color:${color}"></rect>
          <text x="${position.x}" y="${position.y - (lines.length > 1 ? 7 : 1)}" text-anchor="middle">${lineMarkup}</text>
          <text class="graph-node-kind" x="${position.x}" y="${position.y + 20}" text-anchor="middle">${escapeHtml(item.kind)}</text>
        </g>`;
    }).join("");

    return `
      <div class="graph-frame">
        <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeAttr(focusItem.label)} 的一跳关系">
          <defs>${defs}</defs>
          ${edgeMarkup}
          ${nodeMarkup}
        </svg>
      </div>`;
  }

  function relationTable(relations, focusId) {
    if (!relations.length) return "";
    return `
      <table class="relation-table">
        <thead><tr><th>方向</th><th>关系</th><th>另一端</th><th>条件</th></tr></thead>
        <tbody>
          ${relations.map((relation) => {
            const outgoing = relation.from === focusId;
            const other = outgoing ? relation.to : relation.from;
            return `<tr>
              <td>${outgoing ? "→ 出" : "← 入"}</td>
              <td><button type="button" data-relation-id="${escapeAttr(relation.id)}">${escapeHtml(relation.label)}</button><br><span class="type-label">${escapeHtml(relation.type)}</span></td>
              <td><button type="button" data-focus-id="${escapeAttr(other)}">${escapeHtml(entityLabel(other))}</button></td>
              <td>${escapeHtml(relation.condition)}</td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>`;
  }

  function renderRelations() {
    if (!nodeById.has(state.focusId)) state.focusId = "module.runtime-loop";
    const focusItem = node(state.focusId);
    const relations = incidentRelations(state.focusId);
    const options = base.nodes
      .slice()
      .sort((a, b) => a.label.localeCompare(b.label, "zh-CN"))
      .map((item) => `<option value="${escapeAttr(item.id)}">${escapeHtml(item.label)}</option>`).join("");

    root.innerHTML = `
      <p class="view-intro">画布只回答关系，不承载模块说明书。中心对象的一跳边来自 Base relation；位置、筛选和展开方向只存在于当前页面。</p>
      <div class="graph-toolbar">
        <div class="graph-search">
          <input id="graph-search" class="search-control" list="node-options" value="${escapeAttr(state.focusId)}" aria-label="输入对象 ID">
          <datalist id="node-options">${options}</datalist>
          <button id="graph-go" class="small-button" type="button">定位</button>
        </div>
        <div class="segmented" aria-label="关系类型">
          ${Object.keys(familyLabels).map((family) => `<button type="button" class="segmented-button" data-family="${family}" aria-pressed="${state.relationFamily === family}">${familyLabels[family]}</button>`).join("")}
        </div>
        <div class="segmented" aria-label="关系方向">
          ${[["both", "双向"], ["out", "只看出边"], ["in", "只看入边"]].map(([direction, label]) => `<button type="button" class="segmented-button" data-direction="${direction}" aria-pressed="${state.relationDirection === direction}">${label}</button>`).join("")}
        </div>
      </div>
      <p class="graph-mobile-hint">小屏可左右滑动画布；下方表格提供同一组关系和条件。</p>
      ${graphSvg(focusItem, relations)}
      ${relationTable(relations, state.focusId)}`;

    const graphFrame = root.querySelector(".graph-frame");
    if (graphFrame && window.matchMedia("(max-width: 640px)").matches) {
      graphFrame.scrollLeft = Math.max(0, (graphFrame.scrollWidth - graphFrame.clientWidth) / 2);
    }

    document.getElementById("graph-go").addEventListener("click", () => {
      const value = document.getElementById("graph-search").value.trim();
      const exact = nodeById.get(value) || base.nodes.find((item) => item.label === value);
      if (exact) setFocus(exact.id);
    });
    document.getElementById("graph-search").addEventListener("keydown", (event) => {
      if (event.key === "Enter") document.getElementById("graph-go").click();
    });
  }

  function sourceLocator(source) {
    const ranges = source.ranges.map(([start, end]) => start === end ? `L${start}` : `L${start}-${end}`).join(", ");
    return `${base.meta.commitShort}:${source.path} · ${ranges}`;
  }

  function sourceCommand(source) {
    return `git -C "${base.meta.repository.replaceAll("/", "\\")}" show ${base.meta.commit}:${source.path}`;
  }

  function sourceRow(source) {
    return `
      <article class="source-row">
        <div class="source-row-head">
          <div>
            <strong>${escapeHtml(source.title)}</strong>
            <p>${escapeHtml(source.supports)}</p>
            <span class="source-locator">${escapeHtml(sourceLocator(source))}</span>
          </div>
          <button class="small-button copy-source" type="button" data-copy-source="${escapeAttr(source.id)}">复制固定版本命令</button>
        </div>
      </article>`;
  }

  function relevantSourceIds(focusId) {
    const ids = [];
    const focusNode = node(focusId);
    if (focusNode) ids.push(...(focusNode.sourceIds || []));
    base.relations
      .filter((relation) => relation.from === focusId || relation.to === focusId)
      .forEach((relation) => ids.push(...(relation.sourceIds || [])));
    base.flows
      .filter((item) => item.ownerId === focusId || item.steps.some((step) => step.ownerId === focusId || (step.inputIds || []).includes(focusId) || (step.outputIds || []).includes(focusId)))
      .forEach((item) => ids.push(...(item.sourceIds || [])));
    return uniq(ids);
  }

  function renderEvidence() {
    const focusItem = node(state.focusId);
    const relevantIds = relevantSourceIds(state.focusId);
    const visibleSources = state.evidenceAll ? base.sources : relevantIds.map((id) => sourceById.get(id)).filter(Boolean);
    const guide = base.guide;

    root.innerHTML = `
      <div class="evidence-layout">
        <section class="evidence-section">
          <div class="guide-callout">
            <div>
              <p class="section-kicker">technical-guide · 连续阅读</p>
              <h3>${escapeHtml(guide.title)}</h3>
              <p>这份说明书是同一案例的连续文字投影。它不取代框架、模块、关系和证据视图；章节通过相同 focus ID 回到这里。</p>
            </div>
            <a class="primary-link" href="${escapeAttr(guide.href)}">打开技术说明书 →</a>
          </div>
          <div class="guide-path" style="margin-top:8px">
            ${guide.sectionLinks.map((item) => `<div class="guide-row"><div><strong>${escapeHtml(item.label)}</strong><p>${escapeHtml(entityLabel(item.focusId))} · ${escapeHtml(item.focusId)}</p></div><a href="${escapeAttr(`${guide.href}#${item.anchor}`)}">读该章节</a></div>`).join("")}
          </div>
        </section>

        <section class="evidence-section">
          <div class="evidence-section-head">
            <div>
              <p class="section-kicker">evidence-detail</p>
              <h2>${state.evidenceAll ? "全部固定来源" : `${escapeHtml(focusItem?.label || state.focusId)} 的来源`}</h2>
              <p>来源定位到固定 Git 对象，不把当前工作区文件当成相同版本。复制命令可在参考仓库中读取精确 blob。</p>
            </div>
            <button class="small-button" type="button" data-toggle-evidence>${state.evidenceAll ? "只看当前焦点" : `显示全部 ${base.sources.length} 项`}</button>
          </div>
          <div class="source-list">${visibleSources.length ? visibleSources.map(sourceRow).join("") : '<div class="empty-state">当前对象没有直接来源；请查看相关关系或显示全部。</div>'}</div>
        </section>

        <section class="evidence-section">
          <div class="evidence-section-head">
            <div><p class="section-kicker">conflicts</p><h2>仍待维护者核对</h2><p>只有 scope 真正重叠且没有策略解释的差异才列为冲突；这里没有由 Agent 自动选边。</p></div>
          </div>
          <div class="conflict-list">
            ${base.conflicts.map((item) => `
              <article class="conflict-row">
                <div class="conflict-row-head"><div><strong>${escapeHtml(item.label)}</strong><p>${escapeHtml(item.assessment)}</p></div><span class="status-badge" data-status="inferred">${escapeHtml(item.status)}</span></div>
                <div class="conflict-values">${item.values.map((value) => `<div class="conflict-value"><span>${escapeHtml(value.role)}</span><code>${escapeHtml(value.value)}</code></div>`).join("")}</div>
                <p><strong>需要：</strong>${escapeHtml(item.requiredResolution)}</p>
              </article>`).join("")}
          </div>
        </section>

        <section class="evidence-section">
          <div class="evidence-section-head"><div><p class="section-kicker">verification</p><h2>验证边界</h2><p>代码结构、仓库历史记录和本次实际执行分开呈现。</p></div></div>
          <div class="verification-list">
            ${base.verification.map((item) => `<article class="verification-row" data-state="${escapeAttr(item.state)}"><div class="verification-row-head"><div><strong>${escapeHtml(item.label)}</strong><p>${escapeHtml(item.summary)}</p><p><strong>边界：</strong>${escapeHtml(item.caveat)}</p></div><span class="scope-badge">${escapeHtml(item.state)}</span></div></article>`).join("")}
          </div>
        </section>
      </div>`;
  }

  function copyText(text) {
    if (navigator.clipboard?.writeText) {
      return navigator.clipboard.writeText(text);
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    return Promise.resolve();
  }

  function sourceMiniList(sourceIds) {
    const sources = uniq(sourceIds || []).map((id) => sourceById.get(id)).filter(Boolean);
    if (!sources.length) return "";
    return `
      <div class="inspector-source-list">
        <strong>固定来源</strong>
        ${sources.map((source) => `<button type="button" class="source-mini" data-source-id="${escapeAttr(source.id)}">${escapeHtml(source.title)}</button>`).join("")}
      </div>`;
  }

  function actionButtonsForNode(item) {
    const detailMap = keyToProjection.get("detail").query.moduleFlowMap;
    return `
      <div class="inspector-actions">
        <button type="button" data-view-key="relations">查看关系</button>
        <button type="button" data-view-key="evidence">查看来源</button>
        ${detailMap[item.id] ? '<button type="button" data-view-key="detail">模块细节</button>' : '<button type="button" data-view-key="flow">所在流程</button>'}
        <a href="${escapeAttr(base.guide.href)}">连续说明</a>
      </div>`;
  }

  function renderNodeInspector(item) {
    const incidentCount = base.relations.filter((relation) => relation.from === item.id || relation.to === item.id).length;
    inspector.innerHTML = `
      <h2 class="inspector-title">${escapeHtml(item.label)}</h2>
      <span class="type-label">${escapeHtml(item.id)}</span>
      <div class="inspector-badges">
        <span class="status-badge" data-status="${escapeAttr(item.status)}">${escapeHtml(item.status)}</span>
        <span class="scope-badge">${escapeHtml(item.kind)}</span>
        <span class="scope-badge">${incidentCount} relations</span>
      </div>
      <p class="inspector-summary">${escapeHtml(item.summary)}</p>
      <dl class="inspector-definition">
        <div><dt>Scope</dt><dd>${escapeHtml(item.scope)}</dd></div>
        <div><dt>Knowledge kind</dt><dd>${escapeHtml(item.knowledgeKind)}</dd></div>
        ${item.boundary ? `<div><dt>Boundary</dt><dd>${escapeHtml(item.boundary)}</dd></div>` : ""}
        ${item.invariant ? `<div><dt>Invariant</dt><dd>${escapeHtml(item.invariant)}</dd></div>` : ""}
      </dl>
      ${actionButtonsForNode(item)}
      ${sourceMiniList(item.sourceIds)}`;
  }

  function renderRelationInspector(item) {
    const from = node(item.from);
    const to = node(item.to);
    inspector.innerHTML = `
      <h2 class="inspector-title">${escapeHtml(item.label)}</h2>
      <span class="type-label">${escapeHtml(item.id)}</span>
      <div class="inspector-badges">
        <span class="relation-family-badge">${escapeHtml(familyLabels[item.family] || item.family)}</span>
        <span class="status-badge" data-status="${escapeAttr(item.status)}">${escapeHtml(item.status)}</span>
      </div>
      <div class="relation-direction">
        <button type="button" data-focus-id="${escapeAttr(from.id)}">${escapeHtml(from.label)}</button>
        <span> → ${escapeHtml(item.type)} → </span>
        <button type="button" data-focus-id="${escapeAttr(to.id)}">${escapeHtml(to.label)}</button>
      </div>
      <p class="inspector-summary">${escapeHtml(item.summary)}</p>
      <dl class="inspector-definition">
        <div><dt>Condition</dt><dd>${escapeHtml(item.condition)}</dd></div>
        <div><dt>Scope</dt><dd>${escapeHtml(item.scope)}</dd></div>
        <div><dt>Knowledge kind</dt><dd>${escapeHtml(item.knowledgeKind)}</dd></div>
      </dl>
      <div class="inspector-actions">
        <button type="button" data-focus-id="${escapeAttr(from.id)}">聚焦起点</button>
        <button type="button" data-focus-id="${escapeAttr(to.id)}">聚焦终点</button>
        <button type="button" data-view-key="relations">回到关系图</button>
        <button type="button" data-view-key="evidence">全部证据</button>
      </div>
      ${sourceMiniList(item.sourceIds)}`;
  }

  function renderSourceInspector(item) {
    inspector.innerHTML = `
      <h2 class="inspector-title">${escapeHtml(item.title)}</h2>
      <span class="type-label">${escapeHtml(item.id)}</span>
      <div class="inspector-badges"><span class="scope-badge">${escapeHtml(item.type)}</span><span class="scope-badge">${escapeHtml(base.meta.commitShort)}</span></div>
      <p class="inspector-summary">${escapeHtml(item.supports)}</p>
      <dl class="inspector-definition">
        <div><dt>Fixed locator</dt><dd>${escapeHtml(sourceLocator(item))}</dd></div>
        <div><dt>Revision</dt><dd>${escapeHtml(item.revision)}</dd></div>
      </dl>
      <div class="inspector-actions">
        <button type="button" data-copy-source="${escapeAttr(item.id)}">复制 git show</button>
        <button type="button" data-view-key="evidence">返回证据</button>
      </div>`;
  }

  function renderFlowInspector(item) {
    inspector.innerHTML = `
      <h2 class="inspector-title">${escapeHtml(item.label)}</h2>
      <span class="type-label">${escapeHtml(item.id)}</span>
      <div class="inspector-badges"><span class="status-badge" data-status="${escapeAttr(item.status)}">${escapeHtml(item.status)}</span><span class="scope-badge">${item.steps.length} stages</span></div>
      <p class="inspector-summary">${escapeHtml(item.purpose)}</p>
      <dl class="inspector-definition"><div><dt>Owner</dt><dd>${escapeHtml(entityLabel(item.ownerId))}</dd></div><div><dt>Scope</dt><dd>${escapeHtml(item.scope)}</dd></div></dl>
      <div class="inspector-actions"><button type="button" data-focus-id="${escapeAttr(item.ownerId)}">聚焦 owner</button><button type="button" data-view-key="flow">查看流程</button><button type="button" data-view-key="evidence">查看来源</button></div>
      ${sourceMiniList(item.sourceIds)}`;
  }

  function renderStepInspector(item) {
    const owner = node(item.ownerId);
    inspector.innerHTML = `
      <h2 class="inspector-title">${escapeHtml(item.label)}</h2>
      <span class="type-label">${escapeHtml(item.id)}</span>
      <div class="inspector-badges"><span class="scope-badge">flow stage</span><span class="scope-badge">${escapeHtml(entityLabel(item.flowId))}</span></div>
      <p class="inspector-summary">${escapeHtml(item.summary)}</p>
      <dl class="inspector-definition"><div><dt>Owner</dt><dd>${escapeHtml(owner?.label || item.ownerId)}</dd></div><div><dt>Guard</dt><dd>${escapeHtml(item.guard)}</dd></div></dl>
      <div class="inspector-actions"><button type="button" data-focus-id="${escapeAttr(item.ownerId)}">聚焦 owner</button><button type="button" data-view-key="relations">owner 关系</button><button type="button" data-view-key="evidence">查看来源</button></div>
      ${sourceMiniList(item.sourceIds)}`;
  }

  function renderInspector() {
    const { kind, id } = state.selection;
    if (kind === "relation" && relationById.has(id)) return renderRelationInspector(relationById.get(id));
    if (kind === "source" && sourceById.has(id)) return renderSourceInspector(sourceById.get(id));
    if (kind === "flow" && flowById.has(id)) return renderFlowInspector(flowById.get(id));
    if (kind === "step" && stepById.has(id)) return renderStepInspector(stepById.get(id));
    return renderNodeInspector(node(state.focusId) || node(projections.focusContract.defaultFocusId));
  }

  function renderCurrentView() {
    if (state.view === "framework") renderFramework();
    else if (state.view === "flow") renderFlow();
    else if (state.view === "detail") renderDetail();
    else if (state.view === "relations") renderRelations();
    else renderEvidence();
  }

  function renderAll() {
    renderChrome();
    renderHeading();
    renderCurrentView();
    renderInspector();
    updateHash();
  }

  function setFocus(id) {
    if (!nodeById.has(id)) return;
    state.focusId = id;
    state.selection = { kind: "node", id };
    state.selectedRelationId = null;
    if (state.view === "flow") state.flowId = flowForFocus(id);
    if (state.view === "detail") state.detailModuleId = detailModuleForFocus(id);
    renderAll();
  }

  function switchView(viewKey) {
    if (!keyToProjection.has(viewKey)) return;
    state.view = viewKey;
    if (viewKey === "flow") state.flowId = flowForFocus(state.focusId);
    if (viewKey === "detail") state.detailModuleId = detailModuleForFocus(state.focusId);
    if (viewKey === "relations" && !nodeById.has(state.focusId)) state.focusId = projections.focusContract.defaultFocusId;
    state.selection = { kind: "node", id: state.focusId };
    renderAll();
    root.focus({ preventScroll: true });
  }

  document.addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-view-key]");
    if (viewButton) {
      switchView(viewButton.dataset.viewKey);
      return;
    }

    const focusButton = event.target.closest("[data-focus-id]");
    if (focusButton) {
      setFocus(focusButton.dataset.focusId);
      return;
    }

    const relationButton = event.target.closest("[data-relation-id]");
    if (relationButton) {
      const id = relationButton.dataset.relationId;
      if (relationById.has(id)) {
        state.selectedRelationId = id;
        state.selection = { kind: "relation", id };
        if (state.view === "relations") renderCurrentView();
        renderInspector();
      }
      return;
    }

    const sourceButton = event.target.closest("[data-source-id]");
    if (sourceButton) {
      state.selection = { kind: "source", id: sourceButton.dataset.sourceId };
      renderInspector();
      return;
    }

    const stepButton = event.target.closest("[data-step-id]");
    if (stepButton) {
      const step = stepById.get(stepButton.dataset.stepId);
      if (step) {
        state.focusId = step.ownerId;
        state.selection = { kind: "step", id: step.id };
        renderHeading();
        renderInspector();
        updateHash();
      }
      return;
    }

    const familyButton = event.target.closest("[data-family]");
    if (familyButton) {
      state.relationFamily = familyButton.dataset.family;
      state.selectedRelationId = null;
      state.selection = { kind: "node", id: state.focusId };
      renderAll();
      return;
    }

    const directionButton = event.target.closest("[data-direction]");
    if (directionButton) {
      state.relationDirection = directionButton.dataset.direction;
      state.selectedRelationId = null;
      state.selection = { kind: "node", id: state.focusId };
      renderAll();
      return;
    }

    const evidenceToggle = event.target.closest("[data-toggle-evidence]");
    if (evidenceToggle) {
      state.evidenceAll = !state.evidenceAll;
      renderAll();
      return;
    }

    const copyButton = event.target.closest("[data-copy-source]");
    if (copyButton) {
      const source = sourceById.get(copyButton.dataset.copySource);
      if (!source) return;
      const original = copyButton.textContent;
      copyText(sourceCommand(source)).then(() => {
        copyButton.textContent = "已复制";
        setTimeout(() => { copyButton.textContent = original; }, 1400);
      }).catch(() => {
        copyButton.textContent = "复制失败";
      });
    }
  });

  document.addEventListener("keydown", (event) => {
    const graphNode = event.target.closest?.(".graph-node[data-focus-id]");
    if (graphNode && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      setFocus(graphNode.dataset.focusId);
      return;
    }
    const graphRelation = event.target.closest?.(".graph-edge-label[data-relation-id]");
    if (graphRelation && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      const id = graphRelation.dataset.relationId;
      state.selectedRelationId = id;
      state.selection = { kind: "relation", id };
      renderCurrentView();
      renderInspector();
    }
  });

  document.getElementById("focus-chip").addEventListener("click", () => {
    state.selection = { kind: "node", id: state.focusId };
    renderInspector();
  });

  window.addEventListener("hashchange", () => {
    const before = `${state.view}/${state.focusId}`;
    parseInitialHash();
    if (`${state.view}/${state.focusId}` !== before) renderAll();
  });

  parseInitialHash();
  state.flowId = flowForFocus(state.focusId);
  state.detailModuleId = detailModuleForFocus(state.focusId);
  renderAll();
})();

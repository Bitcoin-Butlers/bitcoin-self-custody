let manifest = null;
let renderedScreen = null;

const state = {
  screen: "entry",
  mode: null,
  custodyModel: null,
  signers: [],
  seedMethods: [],
  coordinator: null,
  connection: null,
  answers: {},
};

const container = document.getElementById("stepContainer");
const indicator = document.getElementById("stepIndicator");
const timeEstimate = document.getElementById("timeEstimate");

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function builder() {
  return manifest.builder;
}

function selectedModel() {
  return state.custodyModel
    ? builder().custodyModels[state.custodyModel]
    : null;
}

function selectedSigners() {
  return state.signers
    .map((id) => builder().signers[id])
    .filter(Boolean);
}

function isMultisig() {
  return (selectedModel()?.signerCount ?? 1) > 1;
}

function signerOptions() {
  if (!state.custodyModel) return [];
  return Object.entries(builder().signers).filter(([, signer]) =>
    signer.custodyModels.includes(state.custodyModel)
  );
}

function signerCoordinatorIds(signer) {
  return signer.coordinatorsByCustody?.[state.custodyModel] ?? signer.coordinators;
}

function compatibleCoordinators() {
  const signers = selectedSigners();
  if (!signers.length) return [];

  return Object.entries(builder().coordinators).filter(([id, coordinator]) =>
    signers.every((signer) =>
      signerCoordinatorIds(signer).includes(id)
      && (!coordinator.signerProjects || coordinator.signerProjects.includes(signer.project))
    )
  );
}

function compatibleConnections() {
  if (!state.coordinator) return [];
  const ids = builder().coordinators[state.coordinator]?.connections ?? [];
  return ids.map((id) => [id, builder().connections[id]]).filter(([, item]) => item);
}

function defaultSeedMethod(signerId) {
  return builder().signers[signerId]?.seedMethods?.[0] ?? null;
}

function setSingleSigner(id) {
  state.signers = [id];
  state.seedMethods = [defaultSeedMethod(id)];
  setDefaultCoordinatorAndConnection();
}

function setSignerAt(index, id) {
  state.signers[index] = id;
  state.seedMethods[index] = defaultSeedMethod(id);
  setDefaultCoordinatorAndConnection();
}

function setDefaultCoordinatorAndConnection() {
  const coordinators = compatibleCoordinators();
  if (!coordinators.some(([id]) => id === state.coordinator)) {
    state.coordinator = coordinators[0]?.[0] ?? null;
  }

  const connections = compatibleConnections();
  if (!connections.some(([id]) => id === state.connection)) {
    state.connection = connections[0]?.[0] ?? null;
  }
}

function setCustodyModel(id) {
  const previousSigner = builder().signers[state.signers[0]];
  const previousSignerId = state.signers[0];
  state.custodyModel = id;
  const model = selectedModel();
  const available = signerOptions();
  const availableIds = available.map(([signerId]) => signerId);

  const firstSigner = availableIds.includes(previousSignerId)
    ? previousSignerId
    : available.find(([, signer]) => signer.project === previousSigner?.project)?.[0]
      ?? model.defaultSigners?.find((signerId) => availableIds.includes(signerId))
      ?? availableIds[0];

  state.signers = firstSigner ? [firstSigner] : [];
  const sharesCoordinator = (candidateId) => {
    const ids = [...state.signers, candidateId];
    return Object.keys(builder().coordinators).some((coordinatorId) =>
      ids.every((signerId) => builder().signers[signerId].coordinators.includes(coordinatorId))
    );
  };
  while (state.signers.length < model.signerCount) {
    const compatible = availableIds.filter(sharesCoordinator);
    const nextSigner = compatible.find((signerId) => !state.signers.includes(signerId))
      ?? compatible.find((signerId) => signerId === firstSigner)
      ?? compatible[0];
    if (!nextSigner) break;
    state.signers.push(nextSigner);
  }
  state.seedMethods = state.signers.map(defaultSeedMethod);
  setDefaultCoordinatorAndConnection();
}

function buildReady() {
  const model = selectedModel();
  if (!model || state.signers.length !== model.signerCount) return false;
  if (state.signers.some((id) => !builder().signers[id])) return false;

  const projects = new Set(selectedSigners().map((signer) => signer.project));
  if (projects.size < model.minimumProjects) return false;

  if (!state.coordinator || !state.connection) return false;
  return state.signers.every((id, index) => {
    const methods = builder().signers[id].seedMethods;
    return methods.length === 0
      ? !state.seedMethods[index]
      : methods.includes(state.seedMethods[index]);
  });
}

function updateUrl() {
  const params = new URLSearchParams();
  params.set("screen", state.screen);
  if (state.mode) params.set("mode", state.mode);
  if (state.custodyModel) params.set("custody", state.custodyModel);
  if (state.signers.length) params.set("signers", state.signers.join(","));
  if (state.seedMethods.some(Boolean)) {
    params.set("seeds", state.seedMethods.map((id) => id ?? "").join(","));
  }
  if (state.coordinator) params.set("coordinator", state.coordinator);
  if (state.connection) params.set("connection", state.connection);
  history.replaceState(null, "", `#${params.toString()}`);
}

function parseUrl() {
  const params = new URLSearchParams(location.hash.slice(1));
  const mode = params.get("mode");
  const custody = params.get("custody");

  if (mode && builder().modes[mode]) state.mode = mode;
  if (custody && builder().custodyModels[custody]) {
    setCustodyModel(custody);
  }

  const signers = (params.get("signers") ?? "").split(",").filter(Boolean);
  const signerCount = selectedModel()?.signerCount ?? 1;
  if (
    signers.length === signerCount &&
    signers.every((id) => builder().signers[id]?.custodyModels.includes(state.custodyModel))
  ) {
    state.signers = signers;
  }

  const seeds = (params.get("seeds") ?? "").split(",");
  state.seedMethods = state.signers.map((signerId, index) => {
    const methods = builder().signers[signerId]?.seedMethods ?? [];
    if (!methods.length) return null;
    return methods.includes(seeds[index]) ? seeds[index] : defaultSeedMethod(signerId);
  });

  const coordinator = params.get("coordinator");
  if (coordinator && builder().coordinators[coordinator]) {
    state.coordinator = coordinator;
  }

  const connection = params.get("connection");
  if (connection && builder().connections[connection]) {
    state.connection = connection;
  }

  setDefaultCoordinatorAndConnection();

  const screen = params.get("screen");
  if (["entry", "compare", "build", "tutorial"].includes(screen)) {
    state.screen = screen === "tutorial" && !buildReady() ? "build" : screen;
  } else if (state.custodyModel) {
    state.screen = "build";
  }
}

function renderIndicator() {
  const stages = [
    ["entry", "Start"],
    [state.mode === "compare" ? "compare" : "build", state.mode === "compare" ? "Compare" : "Choose"],
    ["tutorial", "Tutorial"],
  ];
  const currentIndex = state.screen === "entry"
    ? 0
    : state.screen === "tutorial"
      ? 2
      : 1;

  indicator.innerHTML = stages
    .map(([id, label], index) => {
      const className = index === currentIndex
        ? "step-dot active"
        : index < currentIndex
          ? "step-dot completed"
          : "step-dot";
      const line = index === 0
        ? ""
        : `<div class="step-line ${index <= currentIndex ? "completed" : ""}"></div>`;
      return `${line}<div class="${className}" title="${label}">${index + 1}</div>`;
    })
    .join("");
}

function card(id, title, summary, selected, action, meta = "") {
  return `
    <button class="card choice-card ${selected ? "selected" : ""}" data-action="${action}" data-value="${escapeHtml(id)}">
      <h3><span class="check">&#10003;</span>${escapeHtml(title)}</h3>
      <p>${escapeHtml(summary)}</p>
      ${meta ? `<span class="card-meta">${escapeHtml(meta)}</span>` : ""}
    </button>`;
}

function renderEntry() {
  timeEstimate.textContent = "";
  container.innerHTML = `
    <section class="step-content active">
      <div class="step-header centered">
        <h2>How do you want to start?</h2>
        <p>Both routes end with the same complete, testable tutorial.</p>
      </div>
      <div class="card-grid entry-grid">
        ${Object.entries(builder().modes)
          .map(([id, mode]) => card(id, mode.name, mode.summary, false, "choose-mode"))
          .join("")}
      </div>
      <div class="info-note safety-note">
        This guide explains trade-offs. You choose the setup and remain responsible for testing its recovery before using meaningful funds.
      </div>
    </section>`;
}

function renderCompare() {
  const questions = builder().questions;
  const answered = questions.every((question) => state.answers[question.id]);

  container.innerHTML = `
    <section class="step-content active">
      <div class="step-header">
        <h2>Compare approaches</h2>
        <p>Answer from your own priorities. The rules are visible and no AI chooses for you.</p>
      </div>
      ${questions.map((question) => `
        <div class="question-block">
          <h3>${escapeHtml(question.question)}</h3>
          <div class="answer-row">
            ${question.options.map((option) => `
              <button class="btn ${state.answers[question.id] === option.value ? "btn-primary" : "btn-secondary"}"
                data-action="answer" data-question="${escapeHtml(question.id)}" data-value="${escapeHtml(option.value)}">
                ${escapeHtml(option.label)}
              </button>`).join("")}
          </div>
        </div>`).join("")}
      ${answered ? renderMatches() : ""}
      <div class="step-nav">
        <button class="btn btn-secondary" data-action="go-entry">Back</button>
        <button class="btn btn-secondary" data-action="build-directly">Choose everything myself</button>
      </div>
    </section>`;
}

function selectedAnswer(question) {
  if (!question) return null;
  return question.options.find((option) => option.value === state.answers[question.id]);
}

function preferredCustodyModels() {
  const question = builder().questions.find((item) => item.id === "keyCount");
  return selectedAnswer(question)?.custodyModels ?? Object.keys(builder().custodyModels);
}

function toolPreferenceQuestions() {
  return builder().questions.filter((question) => selectedAnswer(question)?.matches?.length);
}

function rankedStartingPoints() {
  const questions = toolPreferenceQuestions();
  const starts = preferredCustodyModels().flatMap((modelId) => {
    const model = builder().custodyModels[modelId];
    return Object.entries(builder().signers)
      .filter(([, signer]) => signer.custodyModels.includes(modelId))
      .map(([signerId, signer]) => {
        const score = questions.reduce((total, question) => {
          return total + (selectedAnswer(question).matches.includes(signerId) ? 1 : 0);
        }, 0);
        return { modelId, model, signerId, signer, score };
      });
  });

  return starts.sort((a, b) =>
    b.score - a.score
      || a.model.signerCount - b.model.signerCount
      || a.signer.name.localeCompare(b.signer.name)
  );
}

function applyConnectionPreference() {
  const question = builder().questions.find((item) => item.id === "connectionPreference");
  const preferred = selectedAnswer(question)?.connections ?? [];
  const available = new Set(compatibleConnections().map(([id]) => id));
  const connection = preferred.find((id) => available.has(id));
  if (connection) state.connection = connection;
}

function selectStartingPoint(modelId, signerId) {
  state.signers = [signerId];
  setCustodyModel(modelId);
  const model = selectedModel();
  if (model.signerCount > 1) {
    state.signers = Array(model.signerCount).fill(signerId);
    state.seedMethods = state.signers.map(defaultSeedMethod);
    setDefaultCoordinatorAndConnection();
  }
  applyConnectionPreference();
}

function renderMatches() {
  const total = toolPreferenceQuestions().length;
  return `
    <div class="selection-section match-section">
      <div class="selection-title">Closest setup starting points</div>
      <p class="selection-note">Your key and connection choices are applied when you continue. Review every trade-off before choosing.</p>
      <div class="card-grid">
        ${rankedStartingPoints().map(({ modelId, model, signerId, signer, score }) => card(
          `${modelId}|${signerId}`,
          model.signerCount > 1
            ? `${model.name} with ${model.signerCount} × ${signer.name}`
            : `${model.name} with ${signer.name}`,
          signer.summary,
          false,
          "choose-match",
          total ? `${score} of ${total} tool preferences match` : "Review this starting point"
        )).join("")}
      </div>
    </div>`;
}

function signerSelect(index, signerId) {
  const options = signerOptions();
  const signer = builder().signers[signerId];
  const seedMethods = signer?.seedMethods ?? [];

  return `
    <div class="signer-slot">
      <label for="signer-${index}">Key ${index + 1}</label>
      <select id="signer-${index}" data-action="select-signer" data-index="${index}">
        ${options.map(([id, item]) => `<option value="${escapeHtml(id)}" ${id === signerId ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("")}
      </select>
      ${seedMethods.length ? `
        <label for="seed-${index}">Seed generation</label>
        <select id="seed-${index}" data-action="select-seed" data-index="${index}">
          ${seedMethods.map((id) => `<option value="${escapeHtml(id)}" ${state.seedMethods[index] === id ? "selected" : ""}>${escapeHtml(manifest.seedMethods[id].name)}</option>`).join("")}
        </select>` : `
        <p class="field-note">This path uses Bitcoin Core's wallet creation and backup flow.</p>`}
    </div>`;
}

function renderBuild() {
  const model = selectedModel();
  const projects = new Set(selectedSigners().map((signer) => signer.project));
  const projectRecommendation = model?.recommendedMinimumProjects && projects.size < model.recommendedMinimumProjects
    ? `<div class="info-note">Using at least ${model.recommendedMinimumProjects} independent signer projects is recommended because it reduces reliance on one implementation. You can continue with one project after reviewing this trade-off.</div>`
    : "";

  container.innerHTML = `
    <section class="step-content active">
      <div class="step-header">
        <h2>Build your setup</h2>
        <p>Choose each layer. Incompatible choices are removed automatically.</p>
      </div>

      <div class="selection-section">
        <div class="selection-title">Custody policy</div>
        <div class="card-grid">
          ${Object.entries(builder().custodyModels)
            .map(([id, item]) => card(id, item.name, item.summary, state.custodyModel === id, "select-custody"))
            .join("")}
        </div>
      </div>

      ${model ? `
        <div class="tradeoff-box">
          <h3>${escapeHtml(model.name)} trade-offs</h3>
          <ul>${model.tradeoffs.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </div>

        <div class="selection-section">
          <div class="selection-title">${isMultisig() ? "Signers" : "Signer"}</div>
          ${isMultisig()
            ? `<p class="selection-note">Each key must use a different seed. You may use the same signer project for more than one key.</p><div class="signer-grid">${state.signers.map((id, index) => signerSelect(index, id)).join("")}</div>`
            : `<div class="card-grid">${signerOptions().map(([id, signer]) => card(id, signer.name, signer.summary, state.signers[0] === id, "select-single-signer", signer.kind.replaceAll("-", " "))).join("")}</div>`}
          ${projectRecommendation}
        </div>

        ${!isMultisig() && state.signers[0] ? renderSingleSeedChoice() : ""}
        ${state.signers.length ? renderCoordinatorChoice() : ""}
        ${state.coordinator ? renderConnectionChoice() : ""}
        ${state.signers.length ? renderCombinedTradeoffs() : ""}

        <div class="step-nav">
          <button class="btn btn-secondary" data-action="${state.mode === "compare" ? "go-compare" : "go-entry"}">Back</button>
          <button class="btn btn-primary" data-action="build-tutorial" ${buildReady() ? "" : "disabled"}>Build my tutorial</button>
        </div>` : ""}
    </section>`;
}

function renderSingleSeedChoice() {
  const signer = selectedSigners()[0];
  if (!signer?.seedMethods.length) {
    return `<div class="info-note">${escapeHtml(signer.name)} uses its own wallet creation and backup flow.</div>`;
  }

  return `
    <div class="selection-section">
      <div class="selection-title">Seed generation</div>
      <div class="card-grid">
        ${signer.seedMethods.map((id) => {
          const method = manifest.seedMethods[id];
          return card(id, method.name, method.summary, state.seedMethods[0] === id, "select-single-seed");
        }).join("")}
      </div>
    </div>`;
}

function renderCoordinatorChoice() {
  const options = compatibleCoordinators();
  if (!options.length) {
    return `<div class="info-note warning">This signer mix does not share a supported coordinator. Choose signers that use the same coordinator.</div>`;
  }
  return `
    <div class="selection-section">
      <div class="selection-title">Coordinator</div>
      <div class="card-grid">
        ${options.map(([id, item]) => card(id, item.name, item.summary, state.coordinator === id, "select-coordinator")).join("")}
      </div>
    </div>`;
}

function renderConnectionChoice() {
  return `
    <div class="selection-section">
      <div class="selection-title">Blockchain connection</div>
      <div class="card-grid">
        ${compatibleConnections().map(([id, item]) => card(id, item.name, item.summary, state.connection === id, "select-connection")).join("")}
      </div>
    </div>`;
}

function renderCombinedTradeoffs() {
  const tradeoffs = selectedSigners().flatMap((signer) => signer.tradeoffs);
  return `
    <div class="tradeoff-box">
      <h3>Tool trade-offs</h3>
      <ul>${[...new Set(tradeoffs)].map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </div>`;
}

function guideSequence() {
  const sequence = [];
  const add = (slug, label) => {
    if (slug && !sequence.some((item) => item.slug === slug)) sequence.push({ slug, label });
  };

  const coordinator = builder().coordinators[state.coordinator];
  selectedSigners().forEach((signer) => {
    const guide = isMultisig()
      ? signer.multisigSetupGuides?.[state.coordinator]
        ?? signer.coordinatorGuides?.[state.coordinator]
        ?? signer.guides?.[state.custodyModel]
        ?? signer.setupGuide
        ?? signer.guide
      : signer.setupGuide ?? signer.guide;
    if (isMultisig() && guide === coordinator?.multisigGuide) return;
    add(guide, `Prepare ${signer.name}`);
  });
  state.seedMethods.forEach((id, index) => {
    if (!builder().signers[state.signers[index]]?.seedMethods.includes(id)) return;
    const method = manifest.seedMethods[id];
    if (method) add(method.guide, `Create keys with ${method.name}`);
  });

  const usesOnlySigningDevices = selectedSigners().every((signer) => signer.device);
  if (!isMultisig() && usesOnlySigningDevices) {
    add("steel-backup", "Create the physical backup");
    add("checklists/backup-verification", "Test recovery");
  }

  if (!isMultisig()) add(coordinator?.guide, `Set up ${coordinator?.name}`);
  if (isMultisig()) add(coordinator?.multisigGuide, "Create and verify the multisignature wallet");

  const connection = builder().connections[state.connection];
  add(connection?.guide, `Connect through ${connection?.name}`);
  if (!isMultisig() && usesOnlySigningDevices) {
    add("operational-security", "Operate the setup safely");
    add("checklists/inheritance-planning", "Plan inheritance");
  }
  return sequence;
}

function guidePath(slug) {
  return slug.startsWith("checklists/") ? `${slug}.md` : `guides/${slug}.md`;
}

async function loadGuide(slug) {
  const response = await fetch(guidePath(slug));
  if (!response.ok) throw new Error(`Guide not found: ${slug}`);
  return response.text();
}

function renderGuideMarkdown(markdown) {
  let html = marked.parse(markdown);
  html = html.replace(/href="(?:(?:\.\.\/)?guides\/)?([a-z0-9_-]+)\.md"/gi, (_, slug) =>
    `href="index.html#${slug}"`
  );
  html = html.replace(/href="(?:\.\.\/)?checklists\/([a-z0-9_-]+)\.md"/gi, (_, slug) =>
    `href="index.html#checklists/${slug}"`
  );
  html = html.replace(/href="\.\.\/emulators\/([a-z0-9_-]+)\/?"/gi, (_, signer) =>
    `href="index.html#${signer}"`
  );
  html = html.replace(/href="#([a-z0-9_-]+)"/gi, (_, slug) =>
    `href="index.html#${slug}"`
  );
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>');
  return html.replace(/<\/table>/g, "</table></div>");
}

async function renderTutorial() {
  const sequence = guideSequence();
  timeEstimate.textContent = `${sequence.length} tutorial sections`;
  container.innerHTML = `
    <section class="step-content active">
      <div class="step-header">
        <h2>Your self-custody tutorial</h2>
        <p>This plan combines the maintained guides for the setup you selected.</p>
      </div>
      ${renderSetupSummary()}
      <div id="tutorialSections" class="tutorial-sections">
        <p class="loading">Loading tutorial...</p>
      </div>
      <div class="step-nav">
        <button class="btn btn-secondary" data-action="go-build">Change setup</button>
        <button class="btn btn-primary" data-action="print">Print tutorial</button>
      </div>
    </section>`;

  const target = document.getElementById("tutorialSections");
  const results = await Promise.all(sequence.map(async (item) => {
    try {
      return { ...item, markdown: await loadGuide(item.slug) };
    } catch {
      return { ...item, markdown: null };
    }
  }));

  target.innerHTML = results.map((item, index) => {
    if (!item.markdown) {
      return `<div class="info-note warning">${escapeHtml(item.label)} could not be loaded.</div>`;
    }
    const lines = item.markdown.split("\n");
    const body = lines[0]?.startsWith("# ") ? lines.slice(1).join("\n") : item.markdown;
    return `
      <details class="tutorial-section" ${index === 0 ? "open" : ""}>
        <summary><span>${index + 1}</span>${escapeHtml(item.label)}</summary>
        <div class="guide-render">${renderGuideMarkdown(body)}</div>
      </details>`;
  }).join("");
}

function renderSetupSummary() {
  const model = selectedModel();
  const coordinator = builder().coordinators[state.coordinator];
  const connection = builder().connections[state.connection];
  return `
    <div class="summary-card">
      <h3>Selected setup</h3>
      <div class="summary-item"><span class="summary-label">Custody</span><span class="summary-value">${escapeHtml(model.name)}</span></div>
      <div class="summary-item"><span class="summary-label">${isMultisig() ? "Signers" : "Signer"}</span><span class="summary-value">${escapeHtml(selectedSigners().map((item) => item.name).join(", "))}</span></div>
      <div class="summary-item"><span class="summary-label">Coordinator</span><span class="summary-value">${escapeHtml(coordinator.name)}</span></div>
      <div class="summary-item"><span class="summary-label">Connection</span><span class="summary-value">${escapeHtml(connection.name)}</span></div>
    </div>`;
}

function render() {
  const screenChanged = state.screen !== renderedScreen;
  const previousScrollY = window.scrollY;
  renderIndicator();
  updateUrl();
  if (state.screen !== "tutorial") timeEstimate.textContent = "";

  if (state.screen === "entry") renderEntry();
  if (state.screen === "compare") renderCompare();
  if (state.screen === "build") renderBuild();
  if (state.screen === "tutorial") renderTutorial();
  requestAnimationFrame(() => {
    window.scrollTo(0, screenChanged ? 0 : previousScrollY);
  });
  renderedScreen = state.screen;
}

function printTutorial() {
  const closedSections = [...container.querySelectorAll("details:not([open])")];
  closedSections.forEach((section) => { section.open = true; });
  window.addEventListener("afterprint", () => {
    closedSections.forEach((section) => { section.open = false; });
  }, { once: true });
  window.print();
}

container.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;
  const value = target.dataset.value;

  if (action === "select-signer" || action === "select-seed") return;

  if (action === "choose-mode") {
    state.mode = value;
    state.screen = value === "compare" ? "compare" : "build";
    if (value === "build" && !state.custodyModel) setCustodyModel("single-sig");
  } else if (action === "answer") {
    state.answers[target.dataset.question] = value;
  } else if (action === "choose-match") {
    const [modelId, signerId] = value.split("|");
    state.mode = "compare";
    selectStartingPoint(modelId, signerId);
    state.screen = "build";
  } else if (action === "build-directly") {
    state.mode = "build";
    if (!state.custodyModel) setCustodyModel("single-sig");
    state.screen = "build";
  } else if (action === "select-custody") {
    setCustodyModel(value);
  } else if (action === "select-single-signer") {
    setSingleSigner(value);
  } else if (action === "select-single-seed") {
    state.seedMethods[0] = value;
    container.querySelectorAll('[data-action="select-single-seed"]').forEach((card) => {
      card.classList.toggle("selected", card.dataset.value === value);
    });
    updateUrl();
    return;
  } else if (action === "select-coordinator") {
    state.coordinator = value;
    setDefaultCoordinatorAndConnection();
  } else if (action === "select-connection") {
    state.connection = value;
  } else if (action === "build-tutorial" && buildReady()) {
    state.screen = "tutorial";
  } else if (action === "go-entry") {
    state.screen = "entry";
  } else if (action === "go-compare") {
    state.screen = "compare";
  } else if (action === "go-build") {
    state.screen = "build";
  } else if (action === "print") {
    printTutorial();
    return;
  }

  render();
});

container.addEventListener("change", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const index = Number(target.dataset.index);

  if (target.dataset.action === "select-signer") {
    setSignerAt(index, target.value);
  } else if (target.dataset.action === "select-seed") {
    state.seedMethods[index] = target.value;
    updateUrl();
    return;
  }
  render();
});

async function init() {
  try {
    const response = await fetch("concierge.json?v=2.2.3");
    if (!response.ok) throw new Error(`Manifest returned ${response.status}`);
    manifest = await response.json();
    if (!manifest.builder) throw new Error("Manifest does not contain the builder contract");
    parseUrl();
    render();
  } catch (error) {
    console.error(error);
    container.innerHTML = '<p class="info-note warning">The concierge could not load. Please refresh and try again.</p>';
  }
}

init();

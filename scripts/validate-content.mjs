import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const manifest = JSON.parse(await readFile(path.join(root, "concierge.json"), "utf8"));
const conciergeHtml = await readFile(path.join(root, "concierge.html"), "utf8");
const conciergeScript = await readFile(path.join(root, "concierge.js"), "utf8");
const errors = [];

function requireValue(condition, message) {
  if (!condition) errors.push(message);
}

async function requireGuide(slug, owner) {
  if (!slug) return;
  const relativePath = slug.startsWith("checklists/")
    ? `${slug}.md`
    : `guides/${slug}.md`;
  try {
    await access(path.join(root, relativePath));
  } catch {
    errors.push(`${owner} refers to missing guide ${relativePath}`);
  }
}

async function validateLocalLinks(directory) {
  const entries = await readdir(path.join(root, directory), { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    const relativePath = path.join(directory, entry.name);
    const content = await readFile(path.join(root, relativePath), "utf8");
    for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
      const href = match[1].split("#", 1)[0];
      if (!href || /^[a-z]+:/i.test(href)) continue;
      const target = path.resolve(root, directory, href);
      if (!target.startsWith(`${root}${path.sep}`)) {
        errors.push(`${relativePath} links outside the repository: ${href}`);
        continue;
      }
      try {
        await access(target);
      } catch {
        errors.push(`${relativePath} refers to missing local content ${href}`);
      }
    }
  }
}

requireValue(manifest.version?.startsWith("2."), "Manifest version must use the version 2 contract");
requireValue(manifest.builder, "Manifest must contain builder data");
requireValue(conciergeHtml.includes(`concierge.css?v=${manifest.version}`), "Concierge stylesheet version must match the manifest");
requireValue(conciergeHtml.includes(`concierge.js?v=${manifest.version}`), "Concierge script version must match the manifest");
requireValue(conciergeScript.includes(`concierge.json?v=${manifest.version}`), "Concierge manifest request version must match the manifest");

const builder = manifest.builder ?? {};
for (const key of ["modes", "custodyModels", "signers", "coordinators", "connections", "questions"]) {
  requireValue(builder[key], `builder.${key} is required`);
}

for (const [id, signer] of Object.entries(builder.signers ?? {})) {
  await requireGuide(signer.guide, `builder.signers.${id}`);
  await requireGuide(signer.setupGuide, `builder.signers.${id}.setupGuide`);
  for (const [coordinator, guide] of Object.entries(signer.multisigSetupGuides ?? {})) {
    requireValue(signer.custodyModels.includes("multisig"), `builder.signers.${id} has a multisig setup guide but does not support multisig`);
    requireValue(Boolean(builder.coordinators?.[coordinator]), `builder.signers.${id} has a multisig setup guide for an unknown coordinator`);
    requireValue((signer.coordinators ?? []).includes(coordinator), `builder.signers.${id} has a multisig setup guide for an incompatible coordinator`);
    await requireGuide(guide, `builder.signers.${id}.multisigSetupGuides.${coordinator}`);
  }
  for (const [model, guide] of Object.entries(signer.guides ?? {})) {
    requireValue(Boolean(builder.custodyModels?.[model]), `builder.signers.${id} has a guide for an unknown custody model`);
    await requireGuide(guide, `builder.signers.${id}.guides.${model}`);
  }
  for (const [coordinator, guide] of Object.entries(signer.coordinatorGuides ?? {})) {
    requireValue(Boolean(builder.coordinators?.[coordinator]), `builder.signers.${id} has a guide for an unknown coordinator`);
    requireValue((signer.coordinators ?? []).includes(coordinator), `builder.signers.${id} has a guide for an incompatible coordinator`);
    await requireGuide(guide, `builder.signers.${id}.coordinatorGuides.${coordinator}`);
  }
  requireValue(Boolean(signer.project), `builder.signers.${id} needs a project`);
  requireValue(Array.isArray(signer.custodyModels) && signer.custodyModels.length > 0, `builder.signers.${id} needs custody models`);
  requireValue((signer.custodyModels ?? []).every((model) => builder.custodyModels?.[model]), `builder.signers.${id} has an unknown custody model`);
  requireValue(Array.isArray(signer.coordinators) && signer.coordinators.length > 0, `builder.signers.${id} needs coordinators`);
  requireValue((signer.seedMethods ?? []).every((method) => manifest.seedMethods?.[method]), `builder.signers.${id} has an unknown seed method`);
  requireValue((signer.coordinators ?? []).every((coordinator) => builder.coordinators?.[coordinator]), `builder.signers.${id} has an unknown coordinator`);
  for (const [model, coordinators] of Object.entries(signer.coordinatorsByCustody ?? {})) {
    requireValue(Boolean(builder.custodyModels?.[model]), `builder.signers.${id} has coordinator rules for an unknown custody model`);
    requireValue(coordinators.every((coordinator) => signer.coordinators.includes(coordinator)), `builder.signers.${id} has a custody coordinator outside its general coordinator list`);
  }
  requireValue(!signer.device || manifest.devices?.[signer.device], `builder.signers.${id} has an unknown legacy device`);
}

for (const [id, coordinator] of Object.entries(builder.coordinators ?? {})) {
  await requireGuide(coordinator.guide, `builder.coordinators.${id}`);
  await requireGuide(coordinator.multisigGuide, `builder.coordinators.${id}`);
  requireValue((coordinator.connections ?? []).every((connection) => builder.connections?.[connection]), `builder.coordinators.${id} has an unknown connection`);
  const projects = new Set(Object.values(builder.signers ?? {}).map((signer) => signer.project));
  requireValue((coordinator.signerProjects ?? []).every((project) => projects.has(project)), `builder.coordinators.${id} has an unknown signer project`);
}

for (const [id, connection] of Object.entries(builder.connections ?? {})) {
  await requireGuide(connection.guide, `builder.connections.${id}`);
}

for (const [id, model] of Object.entries(builder.custodyModels ?? {})) {
  requireValue(Number.isInteger(model.signerCount) && model.signerCount > 0, `builder.custodyModels.${id} has an invalid signer count`);
  requireValue(Number.isInteger(model.threshold) && model.threshold > 0 && model.threshold <= model.signerCount, `builder.custodyModels.${id} has an invalid threshold`);
  const compatible = Object.values(builder.signers ?? {}).filter((signer) => signer.custodyModels.includes(id));
  const projects = new Set(compatible.map((signer) => signer.project));
  const supportsCoordinator = (signer, coordinatorId) => {
    const ids = signer.coordinatorsByCustody?.[id] ?? signer.coordinators;
    const coordinator = builder.coordinators?.[coordinatorId];
    return ids.includes(coordinatorId)
      && (!coordinator.signerProjects || coordinator.signerProjects.includes(signer.project));
  };
  requireValue(compatible.length > 0, `builder.custodyModels.${id} has no compatible signer`);
  requireValue(projects.size >= model.minimumProjects, `builder.custodyModels.${id} cannot meet its project diversity rule`);
  requireValue(!model.recommendedMinimumProjects || model.recommendedMinimumProjects >= model.minimumProjects, `builder.custodyModels.${id} has a recommendation below its required project count`);
  requireValue(!model.recommendedMinimumProjects || projects.size >= model.recommendedMinimumProjects, `builder.custodyModels.${id} cannot meet its recommended project diversity`);
  requireValue(!model.defaultSigners || model.defaultSigners.length === model.signerCount, `builder.custodyModels.${id} has the wrong number of default signers`);
  requireValue((model.defaultSigners ?? []).every((signer) => compatible.includes(builder.signers[signer])), `builder.custodyModels.${id} has an incompatible default signer`);
  requireValue(!model.defaultSigners || Object.keys(builder.coordinators ?? {}).some((coordinator) =>
    model.defaultSigners.every((signer) => supportsCoordinator(builder.signers[signer], coordinator))
  ), `builder.custodyModels.${id} default signers do not share a coordinator`);

  function hasValidSetup(selected = []) {
    if (selected.length === model.signerCount) {
      const selectedProjects = new Set(selected.map((signer) => signer.project));
      if (selectedProjects.size < model.minimumProjects) return false;
      return Object.keys(builder.coordinators ?? {}).some((coordinator) =>
        selected.every((signer) => supportsCoordinator(signer, coordinator))
      );
    }
    return compatible.some((signer) => hasValidSetup([...selected, signer]));
  }

  requireValue(hasValidSetup(), `builder.custodyModels.${id} cannot form a complete setup`);
}

for (const question of builder.questions ?? []) {
  requireValue(Boolean(question.id && question.question), "Every comparison question needs an id and text");
  requireValue((question.options ?? []).length >= 2, `builder question ${question.id} needs at least two options`);
  for (const option of question.options ?? []) {
    requireValue((option.matches ?? []).every((signer) => builder.signers?.[signer]), `builder question ${question.id} matches an unknown signer`);
    requireValue((option.custodyModels ?? []).every((model) => builder.custodyModels?.[model]), `builder question ${question.id} refers to an unknown custody model`);
    requireValue((option.connections ?? []).every((connection) => builder.connections?.[connection]), `builder question ${question.id} refers to an unknown connection`);
  }
}

for (const collection of ["devices", "seedMethods", "software", "backup", "checklists", "comparisons", "advanced"]) {
  for (const [id, item] of Object.entries(manifest[collection] ?? {})) {
    await requireGuide(item.guide, `${collection}.${id}`);
  }
}

await validateLocalLinks("guides");
await validateLocalLinks("checklists");

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log("Concierge manifest and guide references are valid.");

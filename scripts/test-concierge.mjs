import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const manifest = JSON.parse(await readFile("concierge.json", "utf8"));
const multisigGuide = await readFile("guides/multisig-sparrow.md", "utf8");
let source = await readFile("concierge.js", "utf8");
source = source.replace(/\ninit\(\);\s*$/, "");

let afterPrint = null;
let printCalled = false;
const printableSections = [{ open: false }, { open: true }];
const element = () => ({
  addEventListener() {},
  classList: { toggle() {} },
  innerHTML: "",
  querySelectorAll(selector) {
    return selector === "details:not([open])"
      ? printableSections.filter((section) => !section.open)
      : [];
  },
  textContent: "",
});
const location = { hash: "" };
const context = vm.createContext({
  URLSearchParams,
  console,
  document: { getElementById: element },
  fetch() { throw new Error("Tests do not fetch browser content"); },
  history: { replaceState() {} },
  location,
  marked: { parse(value) { return value; } },
  requestAnimationFrame(callback) { callback(); },
  window: {
    addEventListener(event, callback) {
      if (event === "afterprint") afterPrint = callback;
    },
    print() { printCalled = true; },
    scrollTo() {},
    scrollY: 0,
  },
});

const expose = `
globalThis.conciergeTest = {
  state,
  setManifest(value) { manifest = value; },
  buildReady,
  compatibleCoordinators,
  defaultSeedMethod,
  guideSequence,
  parseUrl,
  printTutorial,
  selectStartingPoint,
  setCustodyModel,
  setDefaultCoordinatorAndConnection,
};`;
vm.runInContext(source + expose, context);

const concierge = context.conciergeTest;
concierge.setManifest(manifest);

function resetState(hash = "") {
  Object.assign(concierge.state, {
    screen: "entry",
    mode: null,
    custodyModel: null,
    signers: [],
    seedMethods: [],
    coordinator: null,
    connection: null,
    answers: {},
  });
  location.hash = hash;
}

function configure(custodyModel, signers, seedMethods, coordinator, connection) {
  resetState();
  Object.assign(concierge.state, {
    custodyModel,
    signers,
    seedMethods,
    coordinator,
    connection,
  });
}

resetState("#screen=build&mode=build&custody=multisig&signers=bitcoin-core-offline%2Cbitcoin-core-offline%2Cbitcoin-core-offline&coordinator=bitcoin-core&connection=bitcoin-core-node");
concierge.parseUrl();
assert.deepEqual([...concierge.state.seedMethods], [null, null, null]);
assert.equal(concierge.buildReady(), true);
assert.equal(concierge.guideSequence().some(({ slug }) => slug.startsWith("gen-")), false);

resetState("#screen=build&mode=build&custody=single-sig&signers=bitcoin-core-offline&coordinator=sparrow-wallet&connection=public-server");
concierge.parseUrl();
assert.equal(concierge.state.coordinator, "bitcoin-core");
assert.equal(concierge.state.connection, "bitcoin-core-node");

resetState();
concierge.state.custodyModel = "single-sig";
concierge.state.signers = ["seedsigner"];
concierge.state.seedMethods = ["gen-camera-entropy"];
concierge.setCustodyModel("multisig");
assert.deepEqual([...concierge.state.signers], ["seedsigner", "jade", "bitcoin-core-offline"]);

resetState();
concierge.selectStartingPoint("multisig", "jade");
assert.deepEqual([...concierge.state.signers], ["jade", "jade", "jade"]);

const multiSignerIds = ["seedsigner", "jade", "bitcoin-core-offline"];
for (const first of multiSignerIds) {
  for (const second of multiSignerIds) {
    for (const third of multiSignerIds) {
      const signers = [first, second, third];
      configure(
        "multisig",
        signers,
        signers.map(concierge.defaultSeedMethod),
        null,
        null,
      );
      concierge.setDefaultCoordinatorAndConnection();
      assert.equal(concierge.buildReady(), true, `${signers.join(",")} must form a valid setup`);
    }
  }
}

configure(
  "single-sig",
  ["seedsigner"],
  ["gen-codex32"],
  "sparrow-wallet",
  "public-server",
);
const singleGuides = concierge.guideSequence().map(({ slug }) => slug);
assert.equal(singleGuides[0], "seedsigner-preparation");
assert.equal(singleGuides.includes("seedsigner"), false);
assert.equal(singleGuides.includes("gen-codex32"), true);
assert.ok(singleGuides.indexOf("checklists/backup-verification") < singleGuides.indexOf("sparrow-wallet"));

configure(
  "multisig",
  ["seedsigner", "jade", "bitcoin-core-offline"],
  ["gen-camera-entropy", "gen-hardware-wallet", null],
  "sparrow-wallet",
  "bitcoin-core-node",
);
const mixedGuides = concierge.guideSequence().map(({ slug }) => slug);
for (const incompatible of ["seedsigner", "jade", "bitcoin-core-multisig-signer", "sparrow-wallet", "steel-backup", "checklists/backup-verification", "operational-security"]) {
  assert.equal(mixedGuides.includes(incompatible), false, `${incompatible} must not be appended to a mixed tutorial`);
}
for (const required of ["seedsigner-preparation", "jade-preparation", "bitcoin-core-multisig-key-preparation", "multisig-sparrow", "bitcoin-core-node"]) {
  assert.equal(mixedGuides.includes(required), true, `${required} must be present in a mixed tutorial`);
}
assert.ok(mixedGuides.indexOf("bitcoin-core-multisig-key-preparation") < mixedGuides.indexOf("multisig-sparrow"));

configure(
  "multisig",
  ["bitcoin-core-offline", "bitcoin-core-offline", "bitcoin-core-offline"],
  [null, null, null],
  "bitcoin-core",
  "bitcoin-core-node",
);
assert.deepEqual(
  Array.from(concierge.guideSequence(), ({ slug }) => slug),
  ["multisig-bitcoin-core", "bitcoin-core-node"],
  "The all-Core flow must create each key only once inside the Core coordinator guide",
);

assert.ok(multisigGuide.indexOf("## Step 6: Test Recovery Before Funding") < multisigGuide.indexOf("## Step 7: Receive Bitcoin"));

concierge.printTutorial();
assert.equal(printCalled, true);
assert.equal(printableSections.every((section) => section.open), true);
afterPrint();
assert.deepEqual(printableSections.map((section) => section.open), [false, true]);

console.log("Concierge state, compatibility, and tutorial composition are valid.");

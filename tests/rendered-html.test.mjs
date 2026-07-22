import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

async function missing(path) {
  try {
    await access(new URL(`../${path}`, import.meta.url));
    return false;
  } catch {
    return true;
  }
}

test("exposes the public catalogue, comparator, method and contribution flow", async () => {
  const [home, comparator, method, contribution, layout, store] = await Promise.all([
    source("app/page.tsx"),
    source("app/comparateur/page.tsx"),
    source("app/methode/page.tsx"),
    source("app/contribuer/page.tsx"),
    source("app/layout.tsx"),
    source("app/components/program-store.tsx"),
  ]);
  assert.match(home, /Explorer/);
  assert.match(comparator, /Comparator/);
  assert.match(method, /Données, méthode/);
  assert.match(contribution, /ContributionForm/);
  assert.match(layout, /Cap MMI/);
  assert.match(layout, /Bastian NOEL/);
  assert.match(store, /storageReady/);
  assert.match(store, /if \(!storageReady\) return/);
});

test("removes AI and the raw-data page", async () => {
  const [envExample, packageJson, appSources] = await Promise.all([
    source(".env.example"),
    source("package.json"),
    Promise.all([
      source("app/components/comparator.tsx"),
      source("app/methode/page.tsx"),
      source("app/components/site-header.tsx"),
    ]).then((files) => files.join("\n")),
  ]);
  assert.doesNotMatch(`${envExample}${packageJson}${appSources}`, /OPENAI|AI_ENABLED|Analyse IA|openai/i);
  assert.equal(await missing("app/api/compare/route.ts"), true);
  assert.equal(await missing("app/donnees-brutes/page.tsx"), true);
});

test("keeps pathways in Explorer and methodology evidence outside it", async () => {
  const [explorer, home, pathways, method, packageJson] = await Promise.all([
    source("app/components/explorer.tsx"),
    source("app/page.tsx"),
    source("app/components/outcome-pathways.tsx"),
    source("app/methode/page.tsx"),
    source("package.json"),
  ]);
  assert.match(explorer, /OutcomePathways/);
  assert.match(pathways, /Ce que chaque parcours ouvre réellement/);
  assert.match(pathways, /Premiers métiers possibles/);
  assert.match(pathways, /Poursuites d’études cohérentes/);
  assert.match(method, /LinkedIn : un signal de trajectoire/);
  assert.doesNotMatch(explorer, /SankeyChart|LinkedIn, avec prudence/);
  assert.doesNotMatch(`${explorer}${home}`, /Vélizy|linkedinSample/);
  assert.doesNotMatch(packageJson, /d3-sankey/);
  assert.equal(await missing("app/components/sankey-chart.tsx"), true);
});

test("provides keyboard and display accessibility controls", async () => {
  const [menu, header, layout, styles, method] = await Promise.all([
    source("app/components/accessibility-menu.tsx"),
    source("app/components/site-header.tsx"),
    source("app/layout.tsx"),
    source("app/globals.css"),
    source("app/methode/page.tsx"),
  ]);
  assert.match(header, /AccessibilityMenu/);
  assert.match(layout, /Aller au contenu principal/);
  assert.match(layout, /contenu-principal/);
  assert.match(menu, /aria-haspopup="dialog"/);
  assert.match(menu, /Escape/);
  assert.match(menu, /Fond de lecture/);
  assert.match(menu, /Police OpenDyslexic/);
  assert.match(menu, /Contraste noir sur blanc/);
  assert.match(styles, /OpenDyslexic/);
  assert.match(styles, /--reading-surface/);
  assert.match(styles, /data-contrast="high"/);
  assert.match(styles, /focus-visible/);
  assert.match(styles, /data-reduce-motion/);
  assert.match(method, /Démarche d’accessibilité/);
});

test("explains confidence and estimates on hover, focus and touch", async () => {
  const [help, tooltip, explorer, comparator] = await Promise.all([
    source("app/components/confidence-help.tsx"),
    source("app/components/info-tooltip.tsx"),
    source("app/components/explorer.tsx"),
    source("app/components/comparator.tsx"),
  ]);
  assert.match(tooltip, /role="tooltip"/);
  assert.match(tooltip, /onMouseEnter/);
  assert.match(tooltip, /onFocus/);
  assert.match(tooltip, /onClick/);
  assert.match(tooltip, /Escape/);
  assert.doesNotMatch(tooltip, /CircleHelp|size-7/);
  assert.match(tooltip, /children/);
  assert.match(help, /jamais une probabilité individuelle/);
  assert.match(explorer, /EvidenceIndicator/);
  assert.match(explorer, /but3RateHelp/);
  assert.match(comparator, /EvidenceIndicator/);
});

test("provides secured contribution and administration routes", async () => {
  const [security, contribution, adminProgram, adminPage, inlineEditor, home] = await Promise.all([
    source("app/lib/security.ts"),
    source("app/api/contributions/route.ts"),
    source("app/api/admin/programs/[id]/route.ts"),
    source("app/admin/page.tsx"),
    source("app/components/inline-program-editor.tsx"),
    source("app/page.tsx"),
  ]);
  assert.match(security, /httpOnly|timingSafeEqual|sameOrigin/);
  assert.match(contribution, /allowRequest|contributionInputSchema/);
  assert.match(adminProgram, /isAdminRequest|programSchema/);
  assert.match(adminPage, /robots.*index: false/s);
  assert.match(inlineEditor, /Enregistrer la fiche/);
  assert.match(home, /hasAdminSession/);
});

test("ships a persistent non-root Docker deployment", async () => {
  const [dockerfile, compose] = await Promise.all([
    source("Dockerfile"),
    source("compose.yaml"),
  ]);
  assert.match(dockerfile, /USER nextjs/);
  assert.match(dockerfile, /HEALTHCHECK/);
  assert.match(compose, /cap_mmi_data:\/app\/data/);
  assert.match(compose, /no-new-privileges:true/);
  assert.match(compose, /read_only: true/);
});

test("imports the researched Mon Master set", async () => {
  const masters = JSON.parse(await source("data/masters.generated.json"));
  assert.equal(masters.length, 43);
  assert.ok(masters.every((program) => program.statistics.warning.includes("pas un taux MMI")));
});

test("keeps the 2026.2 verified formation expansion", async () => {
  const data = await source("app/lib/data.ts");
  for (const id of [
    "inge-isty-informatique",
    "inge-cpe-lyon-irc-app",
    "inge-isart-game-programming",
    "master-univ-cote-azur-majic",
    "master-univ-cote-azur-p2i",
    "master-paris-saclay-hci",
    "master-poitiers-web-editorial-ux",
    "autre-ens-louis-lumiere-cinema",
    "autre-ens-louis-lumiere-photographie",
    "autre-ens-louis-lumiere-son",
    "autre-femis-cursus-principal",
  ]) assert.match(data, new RegExp(`id: "${id}"`));
});

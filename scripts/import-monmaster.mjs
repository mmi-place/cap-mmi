import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const input = path.join(root, "outputs", "Dossier_MMI_Velizy", "donnees_monmaster_2025_selection.csv");
const output = path.join(root, "data", "masters.generated.json");

const cities = {
  "Conservatoire national des arts et métiers": ["Angoulême / Paris", 45.6484, 0.1562, "Nouvelle-Aquitaine"],
  "Institut national des sciences appliquées Hauts-de-France": ["Valenciennes", 50.357, 3.523, "Hauts-de-France"],
  "Institut national universitaire Jean-François Champollion": ["Albi", 43.9298, 2.148, "Occitanie"],
  "La Rochelle Université": ["La Rochelle", 46.1603, -1.1511, "Nouvelle-Aquitaine"],
  "Université Bordeaux Montaigne": ["Pessac", 44.8067, -0.605, "Nouvelle-Aquitaine"],
  "Université de Lille": ["Lille", 50.6292, 3.0573, "Hauts-de-France"],
  "Université de Limoges": ["Limoges", 45.8336, 1.2611, "Nouvelle-Aquitaine"],
  "Université de Lorraine": ["Nancy", 48.6921, 6.1844, "Grand Est"],
  "Université de Montpellier Paul-Valéry": ["Montpellier", 43.6108, 3.8767, "Occitanie"],
  "Université de Pau et des Pays de l'Adour": ["Pau", 43.2951, -0.3708, "Nouvelle-Aquitaine"],
  "Université de Poitiers": ["Poitiers", 46.5802, 0.3404, "Nouvelle-Aquitaine"],
  "Université de Rennes": ["Rennes", 48.1173, -1.6778, "Bretagne"],
  "Université de Toulon": ["Toulon", 43.1242, 5.928, "Provence-Alpes-Côte d’Azur"],
  "Université de Toulouse": ["Toulouse", 43.6047, 1.4442, "Occitanie"],
  "Université Grenoble Alpes": ["Grenoble", 45.1885, 5.7245, "Auvergne-Rhône-Alpes"],
  "Université Gustave Eiffel": ["Champs-sur-Marne", 48.8529, 2.6037, "Île-de-France"],
  "Université Jean Monnet": ["Saint-Étienne", 45.4397, 4.3872, "Auvergne-Rhône-Alpes"],
  "Université Jean Moulin - Lyon 3": ["Lyon", 45.764, 4.8357, "Auvergne-Rhône-Alpes"],
  "Université Paris 8 - Vincennes - Saint-Denis": ["Saint-Denis", 48.9362, 2.3574, "Île-de-France"],
  "Université Paris-Est Créteil": ["Créteil", 48.7904, 2.4556, "Île-de-France"],
  "Université Sorbonne Paris Nord": ["Villetaneuse", 48.9562, 2.3413, "Île-de-France"],
};

function parse(line) {
  return line.slice(1, -1).split('";"').map((v) => v.replaceAll('""', '"'));
}

function number(value) {
  if (!value) return null;
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function slug(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function specialty(mention, parcours) {
  const value = `${mention} ${parcours}`.toLowerCase();
  if (/jeu|ludi|gamification/.test(value)) return "Jeu vidéo";
  if (/audiovisuel|sonore|image|télévis|postproduction/.test(value)) return "Audiovisuel & 3D";
  if (/design|ux|ui|interaction/.test(value)) return "UX & design";
  if (/informatique|logiciel|programmation|data/.test(value)) return "Développement";
  if (/communication|web|édition|médiation/.test(value)) return "Communication numérique";
  return "Produit & projets numériques";
}

const lines = fs.readFileSync(input, "utf8").trim().split(/\r?\n/);
const headers = parse(lines.shift());
const seen = new Set();
const programs = [];

for (const line of lines) {
  const row = Object.fromEntries(headers.map((key, index) => [key, parse(line)[index]]));
  if (row.Mention === "GENIE CIVIL") continue;
  const dedupe = [row.Etablissement, row.Mention, row.Parcours, row.Alternance].join("|");
  if (seen.has(dedupe)) continue;
  seen.add(dedupe);
  const place = cities[row.Etablissement] ?? ["Campus à vérifier", 46.6, 2.4, "À confirmer"];
  const butRate = number(row.Taux_proposition_BUT3_pct);
  const spec = specialty(row.Mention, row.Parcours);
  const technical = spec === "Développement";
  programs.push({
    id: `master-${slug(row.Etablissement)}-${slug(row.Parcours)}-${row.Alternance === "oui" ? "alt" : "ini"}`,
    type: "master",
    institution: row.Etablissement,
    degree: `Diplôme national de master — ${row.Mention}`,
    title: row.Parcours,
    specialty: spec,
    status: "public",
    recognition: "DNM — grade de master",
    city: place[0], latitude: place[1], longitude: place[2], region: place[3],
    mode: row.Alternance === "oui" ? "alternance" : "initial",
    entry: "BUT3 / bac+3",
    directYear2: "non",
    duration: "2 ans",
    cost: "Droits nationaux + CVEC (montant annuel à vérifier)",
    capacity: number(row.Places),
    portfolio: /design|visuelle|jeu|audiovisuel|création|image/i.test(`${row.Mention} ${row.Parcours}`) ? "probable — vérifier la fiche" : "non documenté",
    mmiEligibility: "plausible, non explicitée dans cette statistique",
    evidence: "estimation",
    confidence: technical ? "faible" : "moyenne",
    prerequisites: technical ? ["Algorithmique et programmation", "Mathématiques à consolider", "Projets techniques"] : ["Dossier cohérent avec la spécialité", "Projet motivé", "Portfolio conseillé si créatif"],
    outcomes: spec === "Développement" ? ["Développeur logiciel", "Ingénierie logicielle", "Data / systèmes"] : spec === "Jeu vidéo" ? ["Game designer", "Chef de projet jeu", "Concepteur d’expériences"] : spec === "UX & design" ? ["UX/UI designer", "Product designer", "Design de services"] : spec === "Audiovisuel & 3D" ? ["Chef de projet audiovisuel", "Conception multimédia", "Postproduction"] : ["Chef de projet numérique", "Communication digitale", "Médiation numérique"],
    statistics: {
      year: 2025,
      places: number(row.Places),
      applicants: number(row.Candidats_phase_principale),
      overallOfferRate: number(row.Taux_proposition_global_pct),
      but3Applicants: number(row.Candidats_BUT3),
      but3Offers: number(row.Propositions_BUT3_PP_PC),
      but3OfferRate: butRate,
      but3Acceptances: number(row.Acceptations_BUT3),
      warning: "Taux tous BUT3 confondus : ce n’est pas un taux MMI."
    },
    sources: [
      { label: "Mon Master — données ouvertes 2025", url: "https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-mon_master/", level: "officielle" },
      { label: "Mon Master — plateforme nationale", url: "https://www.monmaster.gouv.fr/", level: "officielle" }
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2025.1"
  });
}

fs.writeFileSync(output, `${JSON.stringify(programs, null, 2)}\n`);
console.log(`Écrit ${programs.length} masters dans ${path.relative(root, output)}`);

import mastersJson from "../../data/masters.generated.json";

export type Confidence = "forte" | "moyenne" | "faible";
export type Evidence = "verifie" | "estimation" | "inconnu" | "contradictoire";
export type ProgramType = "master" | "ingenieur" | "autre";

export type Source = {
  label: string;
  url: string;
  level: "officielle" | "institution" | "secondaire" | "linkedin";
};
export type Program = {
  id: string;
  type: ProgramType;
  institution: string;
  degree: string;
  title: string;
  specialty: string;
  status: string;
  recognition: string;
  city: string;
  latitude: number;
  longitude: number;
  region: string;
  mode: string;
  entry: string;
  directYear2: string;
  duration: string;
  cost: string;
  capacity: number | null;
  portfolio: string;
  mmiEligibility: string;
  evidence: Evidence;
  confidence: Confidence;
  prerequisites: string[];
  outcomes: string[];
  statistics?: {
    year: number;
    places: number | null;
    applicants: number | null;
    overallOfferRate: number | null;
    but3Applicants: number | null;
    but3Offers: number | null;
    but3OfferRate: number | null;
    but3Acceptances: number | null;
    warning: string;
  };
  sources: Source[];
  verifiedAt: string;
  dataVersion: string;
  note?: string;
};

const engineers: Program[] = [
  {
    id: "inge-imac-esiee-paris",
    type: "ingenieur",
    institution: "ESIEE Paris",
    degree: "Diplôme d’ingénieur IMAC",
    title: "IMAC — Image, multimédia, audiovisuel et communication",
    specialty: "Création & développement",
    status: "public",
    recognition: "Diplôme d’ingénieur accrédité CTI",
    city: "Noisy-Champs",
    latitude: 48.8407,
    longitude: 2.587,
    region: "Île-de-France",
    mode: "initial",
    entry: "BUT2 ou BUT3",
    directYear2: "possible sur dossier après bac+3 si niveau requis",
    duration: "2 ou 3 ans selon année d’entrée",
    cost: "618 €/an indiqué dans la brochure 2026, à revérifier",
    capacity: 48,
    portfolio: "oui",
    mmiEligibility: "BUT MMI explicitement accepté",
    evidence: "verifie",
    confidence: "forte",
    prerequisites: [
      "Portfolio arts–sciences",
      "Programmation",
      "Mathématiques",
      "Anglais",
    ],
    outcomes: [
      "Ingénieur créatif",
      "Développement multimédia",
      "3D / audiovisuel",
      "UX technique",
    ],
    sources: [
      {
        label: "ESIEE Paris — filière IMAC",
        url: "https://www.esiee.fr/formations/ingenieur/filieres/imac",
        level: "institution",
      },
      {
        label: "Brochure admissions 2026",
        url: "https://www.esiee.fr/fileadmin/user_upload/Fichiers/brochures/brochure-admissions-esiee-paris-2026.pdf",
        level: "institution",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.1",
  },
  {
    id: "inge-esiee-it-app",
    type: "ingenieur",
    institution: "ESIEE-IT",
    degree: "Diplôme d’ingénieur — Informatique et applications",
    title: "Cycle ingénieur par apprentissage",
    specialty: "Développement",
    status: "consulaire",
    recognition: "Diplôme d’ingénieur accrédité CTI",
    city: "Pontoise",
    latitude: 49.034,
    longitude: 2.075,
    region: "Île-de-France",
    mode: "alternance",
    entry: "BUT2 ; positionnement BUT3 à confirmer",
    directYear2: "annoncée pour certains bac+3/+4, à confirmer pour MMI",
    duration: "2 ou 3 ans",
    cost: "pris en charge en apprentissage",
    capacity: 48,
    portfolio: "non documenté",
    mmiEligibility: "BUT MMI explicitement cité pour l’admission",
    evidence: "verifie",
    confidence: "moyenne",
    prerequisites: ["Développement", "Entretien", "Contrat d’apprentissage"],
    outcomes: [
      "Ingénieur logiciel",
      "Applications web",
      "Systèmes d’information",
    ],
    sources: [
      {
        label: "ESIEE-IT — cycle ingénieur",
        url: "https://www.esiee-it.fr/fr/cycle-ingenieur-parcours-informatique-applications-en-alternance",
        level: "institution",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.1",
    note: "L’entrée exacte en 2e année après un BUT3 MMI doit être confirmée par le service admissions.",
  },
  {
    id: "inge-enssat-info-app",
    type: "ingenieur",
    institution: "ENSSAT",
    degree: "Diplôme d’ingénieur informatique",
    title: "Informatique par apprentissage",
    specialty: "Développement",
    status: "public",
    recognition: "Diplôme d’ingénieur accrédité CTI",
    city: "Lannion",
    latitude: 48.732,
    longitude: -3.456,
    region: "Bretagne",
    mode: "alternance",
    entry: "BUT2 ou BUT3 vers la 1re année",
    directYear2: "non après le seul BUT3 MMI ; niveau M1 demandé",
    duration: "3 ans",
    cost: "pris en charge en apprentissage",
    capacity: null,
    portfolio: "non",
    mmiEligibility: "BUT MMI explicitement accepté",
    evidence: "verifie",
    confidence: "forte",
    prerequisites: [
      "Algorithmique",
      "Systèmes",
      "Oral",
      "Contrat d’apprentissage",
    ],
    outcomes: ["Ingénieur logiciel", "Cloud / réseaux", "Systèmes embarqués"],
    sources: [
      {
        label: "ENSSAT — admissions apprentissage",
        url: "https://www.enssat.fr/fr_FR/formations/formations-sous-statut-apprenti/admission-statut-apprenti",
        level: "institution",
      },
      {
        label: "IMT — fiche Informatique ENSSAT 2026",
        url: "https://alternance.imt.fr/fiche-informatique/",
        level: "institution",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.1",
  },
  {
    id: "inge-utc-gi",
    type: "ingenieur",
    institution: "UTC",
    degree: "Diplôme d’ingénieur — Génie informatique",
    title: "Génie informatique",
    specialty: "Développement",
    status: "public",
    recognition: "Diplôme d’ingénieur accrédité CTI",
    city: "Compiègne",
    latitude: 49.4179,
    longitude: 2.8261,
    region: "Hauts-de-France",
    mode: "initial",
    entry: "BUT2 ou BUT3 vers la branche",
    directYear2: "non garantie ; une route raccourcie dépend des équivalences",
    duration: "jusqu’à 3 ans",
    cost: "droits publics d’ingénieur, montant annuel à vérifier",
    capacity: null,
    portfolio: "non",
    mmiEligibility: "MMI apparaît dans la grille de compatibilité UT",
    evidence: "verifie",
    confidence: "moyenne",
    prerequisites: [
      "Excellent dossier",
      "Mathématiques",
      "Algorithmique",
      "Anglais",
    ],
    outcomes: ["Ingénieur logiciel", "IA / data", "Systèmes interactifs"],
    sources: [
      {
        label: "UTC — candidater au diplôme d’ingénieur",
        url: "https://www.utc.fr/formations/candidater-a-lutc/candidater-au-diplome-dingenieur-utc/",
        level: "institution",
      },
      {
        label: "Grille des diplômes 2025-2026",
        url: "https://www.utc.fr/wp-content/uploads/sites/28/2025/12/grille-des-diplomes-validee-par-le-cevu-2025-2026.pdf",
        level: "institution",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.1",
  },
  {
    id: "inge-utbm-info",
    type: "ingenieur",
    institution: "UTBM",
    degree: "Diplôme d’ingénieur — Informatique",
    title: "Informatique",
    specialty: "Développement",
    status: "public",
    recognition: "Diplôme d’ingénieur accrédité CTI",
    city: "Belfort",
    latitude: 47.638,
    longitude: 6.862,
    region: "Bourgogne-Franche-Comté",
    mode: "initial ou alternance",
    entry: "BUT2 ou BUT3",
    directYear2: "non documentée pour le seul BUT MMI",
    duration: "jusqu’à 3 ans",
    cost: "droits publics d’ingénieur, à vérifier",
    capacity: null,
    portfolio: "non",
    mmiEligibility: "MMI apparaît dans la grille de compatibilité UT",
    evidence: "verifie",
    confidence: "moyenne",
    prerequisites: ["Mathématiques", "Algorithmique", "Code", "Anglais"],
    outcomes: ["Ingénieur logiciel", "Systèmes", "Imagerie"],
    sources: [
      {
        label: "UTBM — informatique",
        url: "https://www.utbm.fr/formations/ingenieur/informatique/",
        level: "institution",
      },
      {
        label: "Grille des diplômes UT",
        url: "https://www.utc.fr/wp-content/uploads/sites/28/2025/12/grille-des-diplomes-validee-par-le-cevu-2025-2026.pdf",
        level: "institution",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.1",
  },
  {
    id: "inge-utt-isi",
    type: "ingenieur",
    institution: "UTT",
    degree: "Diplôme d’ingénieur — Informatique et systèmes d’information",
    title: "Informatique et systèmes d’information",
    specialty: "Développement",
    status: "public",
    recognition: "Diplôme d’ingénieur accrédité CTI",
    city: "Troyes",
    latitude: 48.269,
    longitude: 4.065,
    region: "Grand Est",
    mode: "initial",
    entry: "BUT2 ou BUT3",
    directYear2: "non documentée pour le seul BUT MMI",
    duration: "jusqu’à 3 ans",
    cost: "droits publics d’ingénieur, à vérifier",
    capacity: null,
    portfolio: "non",
    mmiEligibility: "MMI apparaît dans la grille de compatibilité UT",
    evidence: "verifie",
    confidence: "moyenne",
    prerequisites: ["Sciences", "Logiciel", "Projets", "Anglais"],
    outcomes: ["Ingénieur logiciel", "Cybersécurité", "Systèmes d’information"],
    sources: [
      {
        label: "UTT — informatique et SI",
        url: "https://www.utt.fr/formations/diplome-d-ingenieur/informatique-et-systemes-d-information",
        level: "institution",
      },
      {
        label: "Grille des diplômes UT",
        url: "https://www.utc.fr/wp-content/uploads/sites/28/2025/12/grille-des-diplomes-validee-par-le-cevu-2025-2026.pdf",
        level: "institution",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.1",
  },
  {
    id: "inge-sup-galilee-info",
    type: "ingenieur",
    institution: "Sup Galilée",
    degree: "Diplôme d’ingénieur informatique",
    title: "Informatique",
    specialty: "Développement",
    status: "public",
    recognition: "Diplôme d’ingénieur accrédité CTI",
    city: "Villetaneuse",
    latitude: 48.9562,
    longitude: 2.3413,
    region: "Île-de-France",
    mode: "initial ou alternance",
    entry: "BUT recevable en 1re année",
    directYear2: "non documentée",
    duration: "3 ans",
    cost: "droits publics d’ingénieur, à vérifier",
    capacity: null,
    portfolio: "non",
    mmiEligibility: "BUT recevable ; MMI non explicitement listé",
    evidence: "estimation",
    confidence: "moyenne",
    prerequisites: ["Algorithmique", "Mathématiques", "Programmation"],
    outcomes: ["Ingénieur logiciel", "Systèmes", "Data"],
    sources: [
      {
        label: "Sup Galilée — ingénieur informatique",
        url: "https://www.sup-galilee.univ-paris13.fr/index.php/formations/ingenieurs/ingenieur-informatique/",
        level: "institution",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.1",
    note: "Une trajectoire publique MMI vers Sup Galilée déclenche la vérification, mais ne prouve pas l’admissibilité générale.",
  },
  {
    id: "inge-ensiie-app",
    type: "ingenieur",
    institution: "ENSIIE",
    degree: "Diplôme d’ingénieur par apprentissage",
    title: "Informatique",
    specialty: "Développement",
    status: "public",
    recognition: "Diplôme d’ingénieur accrédité CTI",
    city: "Évry-Courcouronnes",
    latitude: 48.624,
    longitude: 2.429,
    region: "Île-de-France",
    mode: "alternance",
    entry: "bac+2/3 informatique ou mathématiques",
    directYear2: "M1 ou 1re année ingénieur requis",
    duration: "3 ans",
    cost: "pris en charge en apprentissage",
    capacity: null,
    portfolio: "non",
    mmiEligibility: "MMI non cité ; fort niveau informatique/maths nécessaire",
    evidence: "inconnu",
    confidence: "faible",
    prerequisites: [
      "Mathématiques",
      "Algorithmique",
      "Très bon niveau informatique",
      "Contrat",
    ],
    outcomes: ["Ingénieur informatique", "Data", "Cybersécurité"],
    sources: [
      {
        label: "ENSIIE — admission apprentissage",
        url: "https://www.ensiie.fr/formation/concours-et-admission/formation-par-apprentissage",
        level: "institution",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.1",
  },
  {
    id: "inge-cnam-enjmin",
    type: "ingenieur",
    institution: "Cnam-Enjmin",
    degree: "Diplôme d’ingénieur — Informatique et multimédia",
    title: "Informatique et multimédia",
    specialty: "Jeu vidéo",
    status: "public",
    recognition: "Diplôme d’ingénieur accrédité CTI",
    city: "Angoulême",
    latitude: 45.6484,
    longitude: 0.1562,
    region: "Nouvelle-Aquitaine",
    mode: "initial",
    entry: "bac+3 informatique",
    directYear2: "formation de 2 ans après bac+3 compatible",
    duration: "2 ans",
    cost: "droits publics, à vérifier",
    capacity: null,
    portfolio: "dossier de projets recommandé",
    mmiEligibility:
      "MMI non explicitement cité ; compétences de développement exigées",
    evidence: "estimation",
    confidence: "moyenne",
    prerequisites: [
      "Développement solide",
      "Mathématiques",
      "Moteurs / multimédia",
      "Projets",
    ],
    outcomes: [
      "Ingénieur jeu vidéo",
      "Rendu / 3D",
      "Technologies interactives",
    ],
    sources: [
      {
        label: "Cnam-Enjmin — diplôme ingénieur",
        url: "https://enjmin.cnam.fr/formations/diplome-d-ingenieur-specialite-informatique-et-multimedia/presentation/diplome-d-ingenieur-specialite-informatique-et-multimedia-1033933.kjsp",
        level: "institution",
      },
      {
        label: "Candidater",
        url: "https://enjmin.cnam.fr/candidater/candidater-au-diplome-d-ingenieur-e-informatique-et-multimedia/candidater-a-la-formation-d-ingenieur-e-informatique-et-multimedia-1034227.kjsp",
        level: "institution",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.1",
  },
  {
    id: "inge-cnam-dicasi",
    type: "ingenieur",
    institution: "Cnam / Numia",
    degree: "Diplôme d’ingénieur — Informatique et systèmes d’information",
    title: "DICASI par apprentissage",
    specialty: "Développement",
    status: "public",
    recognition: "Diplôme d’ingénieur accrédité CTI",
    city: "Paris",
    latitude: 48.8566,
    longitude: 2.3522,
    region: "Île-de-France",
    mode: "alternance",
    entry: "bac+2 informatique ou scientifique",
    directYear2: "non documentée",
    duration: "3 ans",
    cost: "pris en charge en apprentissage",
    capacity: null,
    portfolio: "non",
    mmiEligibility: "MMI non explicite ; recevabilité à confirmer",
    evidence: "inconnu",
    confidence: "faible",
    prerequisites: [
      "Informatique",
      "Bases scientifiques",
      "Contrat d’apprentissage",
    ],
    outcomes: ["Ingénieur SI", "Architecture logicielle", "Pilotage technique"],
    sources: [
      {
        label: "Cnam — DICASI",
        url: "https://www.cnam.fr/formation/electronique-informatique-telecommunication/informatique-systemes-dinformation-et-numerique/diplome-dingenieur-specialite-informatique-et-systemes-dinformation-en-partenariat-avec-numia-en-apprentissage",
        level: "institution",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.1",
  },
  {
    id: "inge-telecom-se",
    type: "ingenieur",
    institution: "Télécom Saint-Étienne",
    degree: "Diplôme d’ingénieur généraliste",
    title: "Télécom Saint-Étienne",
    specialty: "Développement",
    status: "public",
    recognition: "Diplôme d’ingénieur accrédité CTI",
    city: "Saint-Étienne",
    latitude: 45.4397,
    longitude: 4.3872,
    region: "Auvergne-Rhône-Alpes",
    mode: "initial",
    entry: "BUT2/3 listés selon spécialité",
    directYear2: "non documentée",
    duration: "3 ans",
    cost: "droits publics, à vérifier",
    capacity: 10,
    portfolio: "non",
    mmiEligibility: "MMI absent de la liste 2026 (RT, GEII, MP, Informatique)",
    evidence: "verifie",
    confidence: "forte",
    prerequisites: ["Spécialité de BUT éligible", "Sciences", "Mathématiques"],
    outcomes: ["Télécoms", "Logiciel", "Image"],
    sources: [
      {
        label: "Télécom Saint-Étienne — admissions",
        url: "https://www.telecom-st-etienne.fr/formations/ingenierie/ingenieur-generaliste-telecom-saint-etienne/",
        level: "institution",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.1",
    note: "À ce jour, ne pas considérer cette voie comme accessible sur le seul diplôme MMI sans confirmation écrite.",
  },
];

const otherPrograms: Program[] = [
  {
    id: "autre-ensad",
    type: "autre",
    institution: "École des Arts Décoratifs — PSL",
    degree: "Diplôme des Arts Décoratifs, grade de master",
    title: "Art, design et création — secteurs numériques possibles",
    specialty: "UX & design",
    status: "public",
    recognition: "Diplôme conférant le grade de master",
    city: "Paris",
    latitude: 48.841,
    longitude: 2.346,
    region: "Île-de-France",
    mode: "initial",
    entry: "admission par équivalence à vérifier",
    directYear2: "selon équivalence et concours",
    duration: "variable",
    cost: "droits d’inscription publics de l’école, à vérifier",
    capacity: null,
    portfolio: "oui, déterminant",
    mmiEligibility:
      "aucune passerelle MMI automatique ; candidature artistique possible",
    evidence: "estimation",
    confidence: "faible",
    prerequisites: [
      "Portfolio excellent",
      "Pratique artistique",
      "Concours / entretien",
    ],
    outcomes: ["Designer", "Directeur artistique", "Créateur numérique"],
    sources: [
      {
        label: "ENSAD — diplôme",
        url: "https://www.ensad.fr/fr/diplome",
        level: "institution",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.1",
  },
  {
    id: "autre-ensci",
    type: "autre",
    institution: "ENSCI–Les Ateliers",
    degree: "Diplôme de créateur industriel, grade de master",
    title: "Création industrielle",
    specialty: "UX & design",
    status: "public",
    recognition: "Grade de master",
    city: "Paris",
    latitude: 48.866,
    longitude: 2.368,
    region: "Île-de-France",
    mode: "initial",
    entry: "concours et équivalences à vérifier",
    directYear2: "non documentée",
    duration: "variable",
    cost: "droits de l’école, à vérifier",
    capacity: null,
    portfolio: "oui",
    mmiEligibility:
      "candidature possible sans admissibilité MMI spécifique publiée",
    evidence: "estimation",
    confidence: "faible",
    prerequisites: ["Portfolio", "Culture design", "Entretien"],
    outcomes: ["Designer produit", "UX / service", "Innovation"],
    sources: [
      {
        label: "ENSCI — formations",
        url: "https://www.ensci.com/formations",
        level: "institution",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.1",
  },
  {
    id: "autre-estienne-dsaa",
    type: "autre",
    institution: "École Estienne",
    degree: "DSAA Design mention graphisme",
    title: "Design et création numérique",
    specialty: "UX & design",
    status: "public",
    recognition: "Diplôme supérieur d’arts appliqués — niveau 7",
    city: "Paris",
    latitude: 48.833,
    longitude: 2.347,
    region: "Île-de-France",
    mode: "initial",
    entry: "bac+3 ou équivalent, dossier à vérifier",
    directYear2: "non",
    duration: "2 ans",
    cost: "formation publique, frais à vérifier",
    capacity: null,
    portfolio: "oui",
    mmiEligibility: "équivalence possible à confirmer auprès de l’école",
    evidence: "estimation",
    confidence: "faible",
    prerequisites: ["Portfolio", "Design graphique", "Projet de recherche"],
    outcomes: [
      "Designer graphique",
      "Direction artistique",
      "Design numérique",
    ],
    sources: [
      {
        label: "École Estienne — DSAA",
        url: "https://www.ecole-estienne.paris/dsaa-design-mention-graphisme/",
        level: "institution",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.1",
  },
];

const additionalPrograms: Program[] = [
  {
    id: "inge-isty-informatique",
    type: "ingenieur",
    institution: "ISTY — UVSQ",
    degree: "Diplôme d’ingénieur de l’ISTY, spécialité informatique",
    title: "Cycle ingénieur informatique — parcours IATIC",
    specialty: "Développement",
    status: "public",
    recognition: "Diplôme d’ingénieur accrédité CTI — grade de master",
    city: "Vélizy-Villacoublay",
    latitude: 48.7819,
    longitude: 2.193,
    region: "Île-de-France",
    mode: "initial",
    entry: "BUT2 ou BUT3 vers la 1re année du cycle ingénieur",
    directYear2: "réservée aux titulaires d’un M1 scientifique ou informatique",
    duration: "3 ans après BUT2/BUT3",
    cost: "1 884 € au total publiés pour 2025, à actualiser",
    capacity: 30,
    portfolio: "non",
    mmiEligibility:
      "BUT ou BUT2 recevable ; MMI non cité séparément, niveau scientifique examiné",
    evidence: "estimation",
    confidence: "moyenne",
    prerequisites: [
      "Très bon dossier",
      "Avis de poursuite d’études longues",
      "Algorithmique et programmation",
      "Entretien",
    ],
    outcomes: [
      "Ingénieur logiciel",
      "Architecture des systèmes d’information",
      "Réseaux et systèmes distribués",
    ],
    sources: [
      {
        label: "ISTY — admission en cycle ingénieur informatique",
        url: "https://www.isty.uvsq.fr/cycle-ingenieur-informatique-admission-1",
        level: "institution",
      },
      {
        label: "Onisep — diplôme d’ingénieur ISTY informatique",
        url: "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/yvelines/isty-uvsq-campus-de-velizy-villacoublay-universite-versailles-saint-quentin-en-yvelines/diplome-d-ingenieur-de-l-institut-des-sciences-et-techniques-des-yvelines-de-l-universite-de-versailles-saint-quentin-en-yvelines-specialite-inform",
        level: "officielle",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.2",
    note: "Les 30 places 2026 concernent l’admission externe avec BTS, BUT/BUT2, L2 ou licence ; aucun quota MMI n’est publié.",
  },
  {
    id: "inge-cpe-lyon-irc-app",
    type: "ingenieur",
    institution: "CPE Lyon",
    degree:
      "Diplôme d’ingénieur de CPE Lyon, spécialité informatique et réseaux",
    title: "Informatique et réseaux de communication par apprentissage",
    specialty: "Développement",
    status: "privé EESPIG",
    recognition: "Diplôme d’ingénieur accrédité CTI — grade de master",
    city: "Villeurbanne",
    latitude: 45.782,
    longitude: 4.866,
    region: "Auvergne-Rhône-Alpes",
    mode: "alternance",
    entry: "BUT2 ou BUT3 vers la 1re année du cycle ingénieur",
    directYear2: "possible après un M1 scientifique, pas après le seul BUT3",
    duration: "3 ans",
    cost: "sans frais de scolarité en apprentissage ; dossier 70 € en 2026",
    capacity: 78,
    portfolio: "non",
    mmiEligibility: "BUT MMI explicitement accepté",
    evidence: "verifie",
    confidence: "forte",
    prerequisites: [
      "Dossier scolaire",
      "Entretien et tests éventuels",
      "Contrat d’apprentissage obligatoire",
      "Bases solides en programmation",
    ],
    outcomes: [
      "Développement, data et IA",
      "Cybersécurité",
      "Cloud, infrastructures et réseaux",
      "Robotique autonome",
    ],
    sources: [
      {
        label: "CPE Lyon — conditions d’admission IRC 2026",
        url: "https://www.cpe.fr/ingenieur-informatique-reseaux/conditions-admission/",
        level: "institution",
      },
      {
        label: "Onisep — diplôme d’ingénieur CPE Lyon IRC",
        url: "https://www.onisep.fr/ressources/structures-enseignement/auvergne-rhone-alpes/rhone/ecole-superieure-de-chimie-physique-electronique-de-lyon/diplome-d-ingenieur-de-l-ecole-superieure-de-chimie-physique-electronique-de-lyon-specialite-informatique-et-reseaux-en-partenariat-avec-l-itii-lyon",
        level: "officielle",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.2",
    note: "Les 78 places 2026 publiées par l’Onisep couvrent les admissions externes admissibles, pas uniquement les candidats MMI.",
  },
  {
    id: "inge-isart-game-programming",
    type: "ingenieur",
    institution: "ISART Digital",
    degree: "Diplôme d’ingénieur d’ISART Digital",
    title: "Ingénieur jeu vidéo — Game Programming",
    specialty: "Jeu vidéo",
    status: "privé lucratif reconnu par l’État",
    recognition: "Diplôme d’ingénieur accrédité CTI depuis 2025",
    city: "Paris",
    latitude: 48.8608,
    longitude: 2.3716,
    region: "Île-de-France",
    mode: "initial puis apprentissage possible",
    entry: "bac+2 vers la 1re année du cycle ingénieur",
    directYear2:
      "non depuis un BUT3 : la 2e année est réservée aux élèves ayant validé la 1re année ISART",
    duration: "3 ans",
    cost: "29 300 € au total publiés en 2025 ; apprentissage possible après la 1re année",
    capacity: 10,
    portfolio: "dossier de projets techniques fortement conseillé",
    mmiEligibility: "BUT MMI accepté avec un bon niveau en code",
    evidence: "verifie",
    confidence: "forte",
    prerequisites: [
      "Programmation solide, notamment C++",
      "Mathématiques et physique",
      "Dossier et épreuves orales",
      "Projets de jeu ou 3D temps réel",
    ],
    outcomes: [
      "Game programmer",
      "Ingénieur logiciel 3D",
      "Développement moteur",
      "IA et programmation graphique",
    ],
    sources: [
      {
        label: "ISART — cycle ingénieur Game Programming",
        url: "https://www.isart.fr/formations/game-programming/",
        level: "institution",
      },
      {
        label: "CTI — décision d’accréditation ISART 2025",
        url: "https://www.cti-commission.fr/wp-content/uploads/2026/01/isart_digital_paris_decision_202510.pdf",
        level: "officielle",
      },
      {
        label: "Onisep — diplôme d’ingénieur ISART",
        url: "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/paris/isart-digital2/diplome-d-ingenieur-d-isart-digital",
        level: "officielle",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.2",
    note: "Nouvelle formation CTI : première promotion annoncée en 2029. Les 10 places sont la capacité externe publiée pour 2025 et doivent être revérifiées chaque année.",
  },
  {
    id: "master-univ-cote-azur-majic",
    type: "master",
    institution: "Université Côte d’Azur",
    degree: "Diplôme national de master — Humanités et industries créatives",
    title: "Management, Jeux vidéo, Image, Créativité — MAJIC",
    specialty: "Jeu vidéo",
    status: "public",
    recognition: "DNM — grade de master",
    city: "Cannes",
    latitude: 43.5528,
    longitude: 7.0174,
    region: "Provence-Alpes-Côte d’Azur",
    mode: "initial",
    entry: "BUT3 / bac+3 vers le M1",
    directYear2: "M2 sur eCandidat avec un M1 compatible, pas après le seul BUT3",
    duration: "2 ans",
    cost: "droits nationaux + CVEC",
    capacity: null,
    portfolio: "oui — créations personnelles obligatoires",
    mmiEligibility: "BUT MMI explicitement accepté",
    evidence: "verifie",
    confidence: "forte",
    prerequisites: [
      "Portfolio : logiciels, dessins, jeux ou œuvres numériques",
      "Culture du jeu vidéo et des industries créatives",
      "Projet professionnel cohérent",
    ],
    outcomes: [
      "Producer jeu vidéo",
      "Chef de projet créatif",
      "Responsable transmédia",
      "Production audiovisuelle",
    ],
    sources: [
      {
        label: "Université Côte d’Azur — master MAJIC",
        url: "https://univ-cotedazur.fr/formation/offre-de-formation/parcours-de-master/majic-master-jeux-video-image-et-creativite",
        level: "institution",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.2",
    note: "Le taux d’insertion de 75 % affiché par l’établissement date de mars 2022 ; il n’est pas utilisé comme probabilité d’admission.",
  },
  {
    id: "master-univ-cote-azur-p2i",
    type: "master",
    institution: "Université Côte d’Azur",
    degree: "Diplôme national de master — Humanités et industries créatives",
    title: "Pratiques immersives et interactives — P2I",
    specialty: "Audiovisuel & 3D",
    status: "public",
    recognition: "DNM — grade de master",
    city: "Cannes",
    latitude: 43.5528,
    longitude: 7.0174,
    region: "Provence-Alpes-Côte d’Azur",
    mode: "initial",
    entry: "BUT3 / bac+3 vers le M1",
    directYear2: "M2 avec un M1 compatible ; aucune entrée M2 après le seul BUT3",
    duration: "2 ans",
    cost: "droits nationaux + CVEC",
    capacity: null,
    portfolio: "réalisations créatives et techniques fortement attendues",
    mmiEligibility: "BUT MMI explicitement conseillé",
    evidence: "verifie",
    confidence: "forte",
    prerequisites: [
      "Compétence en son, image, programmation ou design d’interaction",
      "Expérience créative",
      "Intérêt pour la recherche-création",
    ],
    outcomes: [
      "Direction artistique XR",
      "Direction de projet immersif",
      "Développement d’expériences interactives",
      "Recherche-création",
    ],
    sources: [
      {
        label: "Université Côte d’Azur — master P2I",
        url: "https://univ-cotedazur.fr/formation/offre-de-formation/parcours-de-master/parcours-p2i-pratiques-immersives-et-interactives",
        level: "institution",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.2",
  },
  {
    id: "master-paris-saclay-hci",
    type: "master",
    institution: "Université Paris-Saclay",
    degree: "Diplôme national de master — Informatique",
    title: "M1 Human Computer Interaction",
    specialty: "UX & design",
    status: "public",
    recognition: "DNM — grade de master",
    city: "Orsay",
    latitude: 48.7097,
    longitude: 2.166,
    region: "Île-de-France",
    mode: "initial — entièrement en anglais",
    entry: "BUT3 / bac+3 vers le M1",
    directYear2: "non après BUT3 ; un M1 informatique compatible est requis pour le M2",
    duration: "2 ans",
    cost: "droits nationaux + CVEC",
    capacity: 20,
    portfolio: "non annoncé ; CV et fiche de sélection obligatoires",
    mmiEligibility:
      "MMI non cité ; admission d’autres disciplines très limitée et réservée aux excellents dossiers renforcés en informatique",
    evidence: "estimation",
    confidence: "faible",
    prerequisites: [
      "Programmation orientée objet au-delà des CMS",
      "Mathématiques",
      "Anglais B2 avec justificatif",
      "Excellent dossier académique",
    ],
    outcomes: [
      "Interaction designer",
      "Spécialiste IHM",
      "Réalité virtuelle et augmentée",
      "R&D et doctorat",
    ],
    sources: [
      {
        label: "Université Paris-Saclay — M1 Human Computer Interaction",
        url: "https://www.universite-paris-saclay.fr/formation/master/informatique/m1-human-computer-interaction",
        level: "institution",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.2",
    note: "Cette fiche ne doit pas être interprétée comme une acceptation générale des MMI : un parcours développement web très solide reste indispensable.",
  },
  {
    id: "master-poitiers-web-editorial-ux",
    type: "master",
    institution: "Université de Poitiers",
    degree: "Diplôme national de master — Information, communication",
    title: "Web éditorial et stratégie UX",
    specialty: "Communication numérique",
    status: "public",
    recognition: "DNM — grade de master",
    city: "Poitiers",
    latitude: 46.5802,
    longitude: 0.3404,
    region: "Nouvelle-Aquitaine",
    mode: "initial ; alternance possible en M2",
    entry: "BUT3 / bac+3 ou équivalence vers le M1",
    directYear2: "non après le seul BUT3",
    duration: "2 ans",
    cost: "droits nationaux + CVEC",
    capacity: null,
    portfolio: "non obligatoire publié ; expériences et réalisations valorisées",
    mmiEligibility:
      "recrutement toutes disciplines ; adéquation MMI plausible mais non nommée",
    evidence: "estimation",
    confidence: "moyenne",
    prerequisites: [
      "Qualités rédactionnelles ou compétences techniques web",
      "Motivation et engagement",
      "Culture numérique",
      "Projet professionnel UX, contenu ou gestion web",
    ],
    outcomes: [
      "UX designer / ergonome web",
      "Chef de projet web",
      "Content manager",
      "Responsable éditorial web",
    ],
    sources: [
      {
        label: "Université de Poitiers — Web éditorial et stratégie UX",
        url: "https://formations.univ-poitiers.fr/fr/index/master-XB/master-XB/master-information-communication-JAC5Y3MP/parcours-web-editorial-et-strategie-ux-JAC60PGN.html",
        level: "institution",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.2",
  },
  {
    id: "autre-ens-louis-lumiere-cinema",
    type: "autre",
    institution: "École nationale supérieure Louis-Lumière",
    degree: "Diplôme de l’ENS Louis-Lumière, spécialité cinéma",
    title: "Master cinéma",
    specialty: "Audiovisuel & 3D",
    status: "public",
    recognition: "Diplôme national conférant le grade de master",
    city: "Saint-Denis",
    latitude: 48.9198,
    longitude: 2.358,
    region: "Île-de-France",
    mode: "initial",
    entry: "bac+2 minimum par concours",
    directYear2: "sans objet — entrée en 1re année d’un cursus de 3 ans",
    duration: "3 ans",
    cost: "900 € au total publiés en 2025",
    capacity: 16,
    portfolio: "dossier de concours, épreuves écrites et orales",
    mmiEligibility:
      "MMI non nommé ; BUT2/BUT3 peut satisfaire le niveau bac+2 sous réserve du règlement du concours",
    evidence: "estimation",
    confidence: "moyenne",
    prerequisites: [
      "Deux années validées dans une même formation reconnue par l’État",
      "Moins de 27 ans pour le concours 2026",
      "Culture cinématographique et projet créatif",
    ],
    outcomes: [
      "Réalisation",
      "Direction de la photographie",
      "Cadre et montage",
      "Métiers techniques du cinéma",
    ],
    sources: [
      {
        label: "ENS Louis-Lumière — concours 2026",
        url: "https://www.ens-louis-lumiere.fr/admissions/le-concours/concours-presentation/",
        level: "institution",
      },
      {
        label: "Onisep — diplôme ENS Louis-Lumière cinéma",
        url: "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/seine-saint-denis/ecole-nationale-superieure-louis-lumiere/diplome-de-l-ecole-nationale-superieure-louis-lumiere-specialite-cinema",
        level: "officielle",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.2",
  },
  {
    id: "autre-ens-louis-lumiere-photographie",
    type: "autre",
    institution: "École nationale supérieure Louis-Lumière",
    degree: "Diplôme de l’ENS Louis-Lumière, spécialité photographie",
    title: "Master photographie",
    specialty: "Audiovisuel & 3D",
    status: "public",
    recognition: "Diplôme national conférant le grade de master",
    city: "Saint-Denis",
    latitude: 48.9198,
    longitude: 2.358,
    region: "Île-de-France",
    mode: "initial",
    entry: "bac+2 minimum par concours",
    directYear2: "sans objet — entrée en 1re année d’un cursus de 3 ans",
    duration: "3 ans",
    cost: "900 € au total publiés en 2025",
    capacity: 16,
    portfolio: "oui — dossier de travaux puis épreuves écrites et orales",
    mmiEligibility:
      "MMI non nommé ; BUT2/BUT3 peut satisfaire le niveau bac+2 sous réserve du règlement du concours",
    evidence: "estimation",
    confidence: "moyenne",
    prerequisites: [
      "Deux années validées dans une même formation reconnue par l’État",
      "Moins de 27 ans pour le concours 2026",
      "Pratique photographique et culture visuelle",
    ],
    outcomes: [
      "Photographe",
      "Directeur de la photographie",
      "Reporter-photographe",
      "Auteur visuel",
    ],
    sources: [
      {
        label: "ENS Louis-Lumière — concours 2026",
        url: "https://www.ens-louis-lumiere.fr/admissions/le-concours/concours-presentation/",
        level: "institution",
      },
      {
        label: "Onisep — diplôme ENS Louis-Lumière photographie",
        url: "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/seine-saint-denis/ecole-nationale-superieure-louis-lumiere/diplome-de-l-ecole-nationale-superieure-louis-lumiere-specialite-photographie",
        level: "officielle",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.2",
  },
  {
    id: "autre-ens-louis-lumiere-son",
    type: "autre",
    institution: "École nationale supérieure Louis-Lumière",
    degree: "Diplôme de l’ENS Louis-Lumière, spécialité son",
    title: "Master son",
    specialty: "Audiovisuel & 3D",
    status: "public",
    recognition: "Diplôme national conférant le grade de master",
    city: "Saint-Denis",
    latitude: 48.9198,
    longitude: 2.358,
    region: "Île-de-France",
    mode: "initial",
    entry: "bac+2 minimum par concours",
    directYear2: "sans objet — entrée en 1re année d’un cursus de 3 ans",
    duration: "3 ans",
    cost: "900 € au total publiés en 2025",
    capacity: 16,
    portfolio: "dossier et création sonore pour les épreuves du concours",
    mmiEligibility:
      "MMI non nommé ; BUT2/BUT3 peut satisfaire le niveau bac+2 sous réserve du règlement du concours",
    evidence: "estimation",
    confidence: "moyenne",
    prerequisites: [
      "Deux années validées dans une même formation reconnue par l’État",
      "Moins de 27 ans pour le concours 2026",
      "Sciences du son, écoute et pratique audio",
    ],
    outcomes: [
      "Ingénieur du son",
      "Mixage cinéma et musique",
      "Sonorisation",
      "Son pour le jeu vidéo",
    ],
    sources: [
      {
        label: "ENS Louis-Lumière — concours 2026",
        url: "https://www.ens-louis-lumiere.fr/admissions/le-concours/concours-presentation/",
        level: "institution",
      },
      {
        label: "Onisep — diplôme ENS Louis-Lumière son",
        url: "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/seine-saint-denis/ecole-nationale-superieure-louis-lumiere/diplome-de-l-ecole-nationale-superieure-louis-lumiere-specialite-son",
        level: "officielle",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.2",
  },
  {
    id: "autre-femis-cursus-principal",
    type: "autre",
    institution: "La Fémis",
    degree: "Diplôme de la Fémis — cursus principal",
    title: "Cinéma : 7 départements",
    specialty: "Audiovisuel & 3D",
    status: "public",
    recognition: "Diplôme national conférant le grade de master",
    city: "Paris",
    latitude: 48.8906,
    longitude: 2.3374,
    region: "Île-de-France",
    mode: "initial",
    entry: "bac+2 minimum par concours",
    directYear2: "sans objet — entrée en 1re année d’un cursus de 4 ans",
    duration: "4 ans",
    cost: "1 832 € au total publiés en 2026 ; exonération pour les boursiers",
    capacity: 40,
    portfolio: "oui — dossier personnel et travaux selon le département",
    mmiEligibility:
      "MMI non nommé ; niveau bac+2 recevable, concours extrêmement sélectif",
    evidence: "estimation",
    confidence: "moyenne",
    prerequisites: [
      "Concours général",
      "Culture cinématographique",
      "Portfolio ou épreuve pratique selon le département",
      "Choix parmi scénario, réalisation, production, image, son, montage ou décor",
    ],
    outcomes: [
      "Réalisateur",
      "Scénariste",
      "Chef opérateur image ou son",
      "Monteur, décorateur ou producteur",
    ],
    sources: [
      {
        label: "La Fémis — cursus principal",
        url: "https://www.femis.fr/-cursus-principal-",
        level: "institution",
      },
      {
        label: "Onisep — diplôme de la Fémis, spécialité image",
        url: "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/paris/la-femis-ecole-nationale-superieure-des-metiers-de-l-image-et-du-son/diplome-de-l-ecole-nationale-superieure-des-metiers-de-l-image-et-du-son-femis-specialite-image",
        level: "officielle",
      },
    ],
    verifiedAt: "2026-07-21",
    dataVersion: "2026.2",
    note: "La capacité de 40 correspond à 6 étudiants dans six départements et 4 en décor ; elle ne constitue pas un quota pour les MMI.",
  },
];

const enjminTitles = new Set([
  "Conception sonore",
  "Conception visuelle",
  "Ergonomie UX/UI",
  "Game design",
  "Management de projet",
  "Programmation",
]);

const importedMasters = (mastersJson as Program[]).map((program) => {
  if (
    program.institution === "Conservatoire national des arts et métiers" &&
    enjminTitles.has(program.title)
  ) {
    return {
      ...program,
      portfolio: "oui — dossier créatif propre au parcours, puis écrits et oral",
      mmiEligibility:
        "BUT3 / diplôme RNCP niveau 6 explicitement recevable ; sélection par concours",
      evidence: "verifie" as const,
      confidence: "forte" as const,
      sources: [
        ...program.sources,
        {
          label: "Cnam-Enjmin — candidater au master 2026",
          url: "https://enjmin.cnam.fr/candidater/master-audiovisuel-medias-interactifs-numeriques-jeux/candidater-au-master-jeux-et-medias-interactifs-numeriques-jmin--1034188.kjsp",
          level: "institution" as const,
        },
      ],
      dataVersion: "2026.2",
      note: "Le BUT est recevable, mais l’admission dépend du concours interne Enjmin et du dossier créatif ; aucune probabilité spécifique MMI n’est publiée.",
    };
  }

  if (
    program.id ===
    "master-universite-paris-8-vincennes-saint-denis-arts-et-technologies-de-l-image-virtuelle-ini"
  ) {
    return {
      ...program,
      portfolio: "oui si applicable, avec CV, lettre et dossier de candidature",
      mmiEligibility: "BUT MMI explicitement accepté",
      evidence: "verifie" as const,
      confidence: "forte" as const,
      prerequisites: [
        "Image numérique 3D",
        "Programmation pour l’image",
        "Portfolio et projet cohérent",
        "Entretien après présélection possible",
      ],
      sources: [
        ...program.sources,
        {
          label: "Université Paris 8 — critères d’admission ATI",
          url: "https://www.univ-paris8.fr/Criteres-d-admission-5186",
          level: "institution" as const,
        },
      ],
      dataVersion: "2026.2",
    };
  }

  return program;
});

export const programs: Program[] = [
  ...importedMasters,
  ...engineers,
  ...otherPrograms,
  ...additionalPrograms,
];

export const outcomeSources: Source[] = [
  {
    label: "InserSup — diplômés BUT MMI 2024",
    url: "https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-insersup/information/",
    level: "officielle",
  },
  {
    label: "Parcoursup — devenir des étudiants MMI Vélizy",
    url: "https://dossier.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=9996",
    level: "officielle",
  },
  {
    label: "UVSQ — devenir des DUT MMI Vélizy 2022",
    url: "https://www.uvsq.fr/medias/fichier/fiche-dut-2022-iut-velizy-rambouillet-mm-sans-ip-_1763114074182-pdf?ID_FICHE=317237&INLINE=FALSE",
    level: "institution",
  },
  {
    label: "Enquête nationale DUT MMI 2015",
    url: "https://www.unc.nc/wp-content/uploads/2017/10/fiche-MMI-002.pdf",
    level: "institution",
  },
  {
    label: "Réseau national des IUT — BUT MMI",
    url: "https://www.iut.fr/les-24-specialites-de-but/metiers-du-multimedia-et-de-linternet/",
    level: "officielle",
  },
  {
    label: "IUT de Limoges — débouchés MMI",
    url: "https://www.iut.unilim.fr/les-formations/but/metiers-du-multimedia-et-de-linternet/",
    level: "institution",
  },
  {
    label: "IUT de Haguenau — métiers par parcours",
    url: "https://iuthaguenau.unistra.fr/formations/but/mmi",
    level: "institution",
  },
  {
    label: "IUT de Toulon — après le BUT MMI",
    url: "https://iut.univ-tln.fr/Apres-le-BUT-MMI.html",
    level: "institution",
  },
  {
    label: "IUT de Lannion — débouchés",
    url: "https://mmi.iutlan.univ-rennes1.fr/?page=debouchees&profil=lyceen",
    level: "institution",
  },
  {
    label: "IUT d’Angoulême — BUT MMI",
    url: "https://iut-angouleme.univ-poitiers.fr/formations/b-u-t-mmi-metiers-du-multimedia-et-de-linternet/",
    level: "institution",
  },
  {
    label: "IUT Gustave Eiffel — BUT MMI",
    url: "https://iut.univ-gustave-eiffel.fr/but/mmi",
    level: "institution",
  },
  {
    label: "France Compétences — MMI Création numérique (RNCP 41545)",
    url: "https://www.francecompetences.fr/recherche/rncp/41545/",
    level: "officielle",
  },
  {
    label: "France Compétences — MMI Développement web (RNCP 41546)",
    url: "https://www.francecompetences.fr/recherche/rncp/41546/",
    level: "officielle",
  },
  {
    label:
      "France Compétences — MMI Stratégie et design d’expérience (RNCP 41547)",
    url: "https://www.francecompetences.fr/recherche/rncp/41547/",
    level: "officielle",
  },
  {
    label: "Onisep — BUT MMI stratégie et design d’expérience",
    url: "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/but-metiers-du-multimedia-et-de-l-internet-parcours-strategie-de-communication-numerique-et-design-d-experience",
    level: "officielle",
  },
  {
    label: "IUT de Blois — BUT MMI et débouchés",
    url: "https://iut-blois.univ-tours.fr/version-francaise/navigation/formations/dut-metiers-du-multimedia-et-de-linternet",
    level: "institution",
  },
  {
    label: "IUT de Chambéry — BUT MMI",
    url: "https://www.iut-chy.univ-smb.fr/formations/bachelor-universitaire-de-technologie/mmi/",
    level: "institution",
  },
  {
    label: "Université Savoie Mont Blanc — poursuites et métiers MMI 2026",
    url: "https://formations.univ-smb.fr/plugins/odf-web/odf/_content/subprogram-developpement-web-et-dispositifs-interactifs-fr-6/main-orientation/BUT2_BUT3%20-%20MMI%20_%20D%C3%A9veloppement%20web%20et%20dispositifs%20interactifs%20-%20Classique%20et%20Alernance.pdf",
    level: "institution",
  },
  {
    label: "IUT de Béziers — BUT MMI",
    url: "https://iut-beziers.edu.umontpellier.fr/mmi-beziers/",
    level: "institution",
  },
  {
    label: "IUT Clermont Auvergne — BUT MMI Vichy",
    url: "https://iut.uca.fr/formations/but-metiers-du-multimedia-et-de-linternet-vichy",
    level: "institution",
  },
  {
    label: "IUT Saint-Dié — BUT MMI",
    url: "https://iutsd.univ-lorraine.fr/but-mmi/",
    level: "institution",
  },
  {
    label: "IUT Nord Franche-Comté — catalogue MMI",
    url: "https://www.iut-nfc.univ-fcomte.fr/wp-content/uploads/2026/01/IUT-NFC-catalogue-2025VF-site-internet.pdf",
    level: "institution",
  },
  {
    label: "IUT Nancy-Charlemagne — BUT MMI",
    url: "https://iut-charlemagne.univ-lorraine.fr/mmi/but-mmi/",
    level: "institution",
  },
  {
    label: "Université Grenoble Alpes — BUT MMI",
    url: "https://formations.univ-grenoble-alpes.fr/fr/catalogue-2021/but-bachelor-universitaire-de-technologie-BUT/but-metiers-du-multimedia-et-de-l-internet-KI4YX5MN.html",
    level: "institution",
  },
  {
    label: "BUT MMI — panorama des métiers",
    url: "https://butmmi.fr/les-debouches/les-metiers/",
    level: "secondaire",
  },
  {
    label: "Thotis — guide BUT MMI",
    url: "https://thotismedia.com/but-mmi/",
    level: "secondaire",
  },
];

export const allSources: Source[] = Array.from(
  new Map(
    [...outcomeSources, ...programs.flatMap((program) => program.sources)].map(
      (source) => [source.url, source],
    ),
  ).values(),
);

export const nationalStats = {
  butFirstCohort: 2024,
  graduates2024: 1492,
  pursuing2024: 795,
  pursuingRate: 53.3,
  leavingEducation2024: 697,
  source: "InserSup — cohorte nationale MMI diplômée en 2024",
};

export const velizyStats = {
  sourceYear: "promotions 2023–2024",
  trainingOrReorientation: 67,
  salariedFrance: 10,
  other: 23,
  source: "Parcoursup — BUT MMI IUT de Vélizy",
};

export const linkedinSample = {
  found: 60,
  reviewed: 24,
  count: 19,
  warning:
    "Échantillon public non représentatif : il sert à découvrir des trajectoires, jamais à calculer une probabilité.",
  schools: [
    "IIM (4)",
    "ICAN (2)",
    "HETIC",
    "Gobelins",
    "IMAC",
    "Sup Galilée",
    "Paris 8",
    "Digital Campus",
    "ECV",
    "LISAA",
    "MBA ESG",
    "Efrei",
    "Web School Factory",
    "Ynov",
    "Narratiiv",
  ],
};

export const linkedinFranceSample = {
  found: 72,
  retained: 58,
  excluded: 14,
  sites: [
    "Lannion",
    "Bordeaux Montaigne",
    "Chambéry",
    "Champs-sur-Marne",
    "Laval",
    "Angoulême",
    "Montbéliard",
    "Saint-Dié",
    "Béziers",
    "Blois",
    "Toulon",
  ],
  codedHeadlines: [
    { label: "Création, 3D, jeu & audiovisuel", count: 35 },
    { label: "Développement & ingénierie", count: 8 },
    { label: "UX, UI & product design", count: 6 },
    { label: "Communication, contenu & projet", count: 9 },
  ],
  verifiedRoute:
    "DUT MMI Limoges → diplôme d’ingénieur IMAC (ESIEE Paris) → ingénieur créatif",
  warning:
    "Codage manuel des intitulés publics visibles. Les requêtes par ville peuvent remonter un ancien d’un autre IUT : le site d’origine n’est attribué que lorsque la rubrique Formation le confirme.",
};

export const outcomeFamilies = [
  {
    path: "Création numérique",
    short: "Concevoir des univers visuels, audiovisuels et interactifs.",
    strengths: [
      "Identité visuelle et direction artistique",
      "Image, son, vidéo, motion et 3D",
      "Prototypage d’expériences interactives",
    ],
    careerGroups: [
      {
        label: "Design visuel",
        roles: ["Graphiste numérique", "Motion designer", "UI designer"],
      },
      {
        label: "Image et audiovisuel",
        roles: ["Monteur vidéo", "Infographiste 2D/3D", "Assistant VFX"],
      },
      {
        label: "Création interactive",
        roles: ["Game designer junior", "Designer interactif", "Intégrateur créatif"],
      },
    ],
    studies: [
      {
        label: "Masters publics",
        detail:
          "Création numérique, audiovisuel, médias interactifs, jeu, design ou arts numériques selon le portfolio et les prérequis publiés.",
      },
      {
        label: "Art et design publics",
        detail:
          "DNSEP, DSAA et diplômes d’écoles publiques d’art ou de design, le plus souvent sur dossier, portfolio et entretien.",
      },
      {
        label: "Diplômes spécialisés reconnus",
        detail:
          "Animation, 3D, jeu vidéo, effets visuels ou audiovisuel, après vérification du visa, du grade ou du niveau RNCP exact.",
      },
    ],
    watch:
      "Le portfolio pèse souvent plus que l’intitulé du parcours : montrer le processus, les choix créatifs et un projet abouti.",
    roles: [
      "Direction artistique",
      "Motion design",
      "Infographie 2D/3D",
      "Animation et VFX",
      "Game / level design",
      "Audiovisuel",
      "Design interactif",
    ],
    continuation:
      "Masters création numérique, audiovisuel/médias interactifs/jeu, écoles publiques d’art et design, formations spécialisées reconnues.",
  },
  {
    path: "Développement web et dispositifs interactifs",
    short: "Construire des applications web, mobiles et des services interactifs.",
    strengths: [
      "Développement front-end et interfaces",
      "Back-end, données et API",
      "Qualité, accessibilité et travail en équipe",
    ],
    careerGroups: [
      {
        label: "Web",
        roles: ["Développeur front-end", "Développeur back-end junior", "Développeur full-stack junior"],
      },
      {
        label: "Applications",
        roles: ["Développeur mobile junior", "Intégrateur web", "Webmaster technique"],
      },
      {
        label: "Interfaces avancées",
        roles: ["Développeur créatif", "Prototypeur VR/3D", "Intégrateur accessible"],
      },
    ],
    studies: [
      {
        label: "Masters publics",
        detail:
          "Informatique, technologies numériques, interaction humain-machine ou MIAGE lorsque les attendus en algorithmique, données et mathématiques sont couverts.",
      },
      {
        label: "Diplômes d’ingénieur CTI",
        detail:
          "Admission sur titre après BUT2 ou BUT3 uniquement lorsque l’école accepte ce niveau et ce profil. Un solide dossier scientifique est généralement déterminant.",
      },
      {
        label: "Alternance",
        detail:
          "Masters et cycles ingénieurs en apprentissage ; l’admission académique et la signature d’un contrat sont deux conditions distinctes.",
      },
    ],
    watch:
      "Renforcer algorithmique, structures de données, bases de données, tests et mathématiques ; documenter le code sur Git et les choix techniques.",
    roles: [
      "Front-end",
      "Back-end",
      "Full-stack",
      "Applications mobiles",
      "Webmaster",
      "Dispositifs VR/3D",
      "Intégration et accessibilité",
    ],
    continuation:
      "Masters informatique, MIAGE et technologies numériques ; ingénieur CTI lorsque MMI est accepté et que le niveau scientifique est suffisant.",
  },
  {
    path: "Stratégie de communication numérique et design d’expérience",
    short: "Relier usages, contenus, marque et pilotage d’un produit numérique.",
    strengths: [
      "Recherche utilisateur et conception UX",
      "Stratégie éditoriale et communication",
      "Gestion de projet et mesure de performance",
    ],
    careerGroups: [
      {
        label: "UX et produit",
        roles: ["UX designer junior", "Product designer junior", "Assistant product owner"],
      },
      {
        label: "Contenus et acquisition",
        roles: ["Chargé de communication numérique", "Rédacteur web", "Assistant SEO"],
      },
      {
        label: "Projet et communauté",
        roles: ["Chef de projet junior", "Community manager", "Assistant marketing numérique"],
      },
    ],
    studies: [
      {
        label: "Masters publics",
        detail:
          "Information-communication, communication numérique, médias, marketing, UX, design de services ou gestion de projets selon les attendus.",
      },
      {
        label: "Design et produit",
        detail:
          "Formations publiques ou diplômes reconnus en UX, product design et innovation, souvent sur portfolio d’études de cas.",
      },
      {
        label: "Alternance",
        detail:
          "Communication, acquisition, contenu, UX ou gestion de produit ; l’expérience en entreprise devient alors une pièce centrale du dossier.",
      },
    ],
    watch:
      "Présenter des cas complets : problème, recherche, arbitrages, livrables et résultats. Soigner l’écrit, l’anglais et la culture des données.",
    roles: [
      "UX/UI design",
      "Communication numérique",
      "Community management",
      "Rédaction web",
      "SEO",
      "Product / chef de projet",
      "Marketing numérique",
    ],
    continuation:
      "Masters information-communication, UX/design, marketing numérique, médias et gestion de projets numériques.",
  },
];

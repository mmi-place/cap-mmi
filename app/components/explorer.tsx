"use client";

import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Blocks,
  Check,
  ChevronDown,
  CircleAlert,
  Code2,
  ExternalLink,
  Gamepad2,
  GitCompareArrows,
  Heart,
  ListTree,
  MapPin,
  Megaphone,
  Palette,
  Pencil,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import { FranceMap } from "./france-map";
import { InlineProgramEditor } from "./inline-program-editor";
import { OutcomePathways } from "./outcome-pathways";
import {
  nationalStats,
  type Confidence,
  type Program,
} from "../lib/data";
import { useProgramStore } from "./program-store";
import {
  but3RateHelp,
  chanceEstimateHelp,
  EvidenceIndicator,
} from "./confidence-help";
import { InfoTooltip } from "./info-tooltip";

type Rank = "top10" | "top25" | "top50";

function chance(
  program: Program,
  rank: Rank,
): { level: string; confidence: Confidence; text: string } {
  if (program.mmiEligibility.includes("absent"))
    return {
      level: "Très faible",
      confidence: "forte",
      text: "MMI n’est pas dans la liste publiée.",
    };
  if (program.evidence === "inconnu")
    return {
      level: "Inconnue",
      confidence: "faible",
      text: "Recevabilité MMI à faire confirmer avant toute estimation.",
    };
  const rate = program.statistics?.but3OfferRate ?? null;
  const verifiedBonus = program.mmiEligibility.includes("explicitement")
    ? 1
    : 0;
  const rankScore = rank === "top10" ? 2 : rank === "top25" ? 1 : 0;
  const rateScore = rate === null ? 0 : rate >= 25 ? 2 : rate >= 8 ? 1 : -1;
  const score = rankScore + rateScore + verifiedBonus;
  const level =
    score >= 4
      ? "Élevée"
      : score >= 2
        ? "Moyenne"
        : score >= 0
          ? "Faible"
          : "Très faible";
  return {
    level,
    confidence: rate === null ? "faible" : "moyenne",
    text:
      rate === null
        ? "Estimation qualitative fondée sur l’admissibilité et les prérequis."
        : `Estimation qualitative fondée sur le taux de proposition BUT3 (${rate} %), la compatibilité MMI et le classement indiqué.`,
  };
}

const confidenceClass = {
  forte: "bg-emerald-50 text-emerald-800",
  moyenne: "bg-amber-50 text-amber-800",
  faible: "bg-slate-100 text-slate-700",
} as const;

type SimplePath =
  | "all"
  | "ingenieur"
  | "creation"
  | "code"
  | "game"
  | "communication"
  | "alternance"
  | "accessible";
const simplePaths: {
  id: SimplePath;
  label: string;
  description: string;
  icon: React.ReactNode;
  match: (program: Program) => boolean;
}[] = [
  {
    id: "all",
    label: "Je veux voir les possibilités",
    description: "Un aperçu de toutes les voies",
    icon: <Route size={20} />,
    match: () => true,
  },
  {
    id: "ingenieur",
    label: "Devenir ingénieur",
    description: "Diplômes CTI, MMI vérifié ou à confirmer",
    icon: <Wrench size={20} />,
    match: (p) => p.type === "ingenieur",
  },
  {
    id: "creation",
    label: "Créer et designer",
    description: "UX, UI, design et création numérique",
    icon: <Palette size={20} />,
    match: (p) =>
      p.specialty === "UX & design" ||
      p.specialty === "Création & développement",
  },
  {
    id: "code",
    label: "Approfondir le code",
    description: "Logiciel, web, data et systèmes",
    icon: <Code2 size={20} />,
    match: (p) => p.specialty === "Développement",
  },
  {
    id: "game",
    label: "Jeu, 3D et audiovisuel",
    description: "Création interactive, image et son",
    icon: <Gamepad2 size={20} />,
    match: (p) =>
      p.specialty === "Jeu vidéo" || p.specialty === "Audiovisuel & 3D",
  },
  {
    id: "communication",
    label: "Communication numérique",
    description: "Contenu, stratégie, médias et projet",
    icon: <Megaphone size={20} />,
    match: (p) =>
      p.specialty === "Communication numérique" ||
      p.specialty === "Produit & projets numériques",
  },
  {
    id: "alternance",
    label: "Étudier en alternance",
    description: "Formations mentionnant l’apprentissage",
    icon: <Blocks size={20} />,
    match: (p) => p.mode.includes("alternance"),
  },
  {
    id: "accessible",
    label: "Voir les taux BUT3 élevés",
    description: "Au moins 20 % de propositions en 2025",
    icon: <BarChart3 size={20} />,
    match: (p) => (p.statistics?.but3OfferRate ?? 0) >= 20,
  },
];

function ProgramCard({
  program,
  onOpen,
  rank,
}: {
  program: Program;
  onOpen: () => void;
  rank: Rank;
}) {
  const { favorites, compare, toggleFavorite, toggleCompare } =
    useProgramStore();
  const saved = favorites.includes(program.id);
  const compared = compare.includes(program.id);
  const estimate = chance(program, rank);
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <span
            className={`badge ${program.type === "ingenieur" ? "bg-indigo-50 text-indigo-700" : program.type === "master" ? "bg-teal-50 text-teal-800" : "bg-amber-50 text-amber-800"}`}
          >
            {program.type === "ingenieur"
              ? "Ingénieur CTI"
              : program.type === "master"
                ? "Master public"
                : "Autre diplôme"}
          </span>
          <EvidenceIndicator
            evidence={program.evidence}
            confidence={program.confidence}
            label={
              program.evidence === "verifie"
                ? "Vérifié"
                : `Estimation ${program.confidence}`
            }
            className={`badge ${confidenceClass[program.confidence]}`}
          />
        </div>
        <button
          onClick={() => toggleFavorite(program.id)}
          className={`rounded-full p-2 transition ${saved ? "bg-rose-50 text-rose-600" : "bg-slate-50 text-slate-400 hover:text-rose-600"}`}
          aria-label={saved ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <h3 className="mt-5 text-xl font-bold leading-tight tracking-tight text-slate-950">
        {program.institution}
      </h3>
      <p className="mt-2 text-base font-semibold leading-snug text-slate-700">
        {program.title}
      </p>
      <p className="mt-2 text-sm text-slate-600">{program.degree}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
        <span className="tag">
          <MapPin size={13} />
          {program.city}
        </span>
        <span className="tag">{program.mode}</span>
        <span className="tag">{program.entry}</span>
      </div>
      <div className="mt-4 rounded-2xl bg-slate-50 p-3">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 font-medium text-slate-500">
            <InfoTooltip
              label="Comprendre la chance estimée"
              text={chanceEstimateHelp}
            >
              <span>
                Chance estimée ·{" "}
                {rank === "top10"
                  ? "top 10 %"
                  : rank === "top25"
                    ? "top 25 %"
                    : "top 50 %"}
              </span>
            </InfoTooltip>
          </span>
          <strong className="text-slate-900">{estimate.level}</strong>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] leading-4 text-slate-500">
          <EvidenceIndicator
            evidence="estimation"
            confidence={estimate.confidence}
            label={`Confiance ${estimate.confidence}`}
            className="font-semibold"
          />
          <span>Ce n’est pas un taux d’admission.</span>
        </div>
      </div>
      <div className="mt-auto flex gap-2 pt-5">
        <button
          onClick={onOpen}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white"
        >
          Voir la fiche <ArrowRight size={15} />
        </button>
        <button
          onClick={() => toggleCompare(program.id)}
          className={`rounded-xl border px-3 ${compared ? "border-teal-700 bg-teal-50 text-teal-800" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
          aria-label={
            compared ? "Retirer du comparateur" : "Ajouter au comparateur"
          }
        >
          <GitCompareArrows size={17} />
        </button>
      </div>
    </article>
  );
}

function DetailPanel({
  program,
  onClose,
  rank,
  isAdmin,
  onSaved,
}: {
  program: Program;
  onClose: () => void;
  rank: Rank;
  isAdmin: boolean;
  onSaved: (program: Program) => void;
}) {
  const { favorites, compare, toggleFavorite, toggleCompare } =
    useProgramStore();
  const estimate = chance(program, rank);
  const [editing, setEditing] = useState(false);
  return (
    <div
      className="fixed inset-0 z-[70] bg-slate-950/35 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Fiche ${program.title}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside className="absolute inset-y-0 right-0 w-full max-w-2xl overflow-y-auto bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur">
          <div className="flex gap-2">
            <span className="badge bg-teal-50 text-teal-800">
              {program.type}
            </span>
            <EvidenceIndicator
              evidence={program.evidence}
              confidence={program.confidence}
              label={
                program.evidence === "verifie"
                  ? "Donnée vérifiée"
                  : `Estimation · confiance ${program.confidence}`
              }
              className={`badge ${confidenceClass[program.confidence]}`}
            />
          </div>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={() => setEditing((value) => !value)}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800 hover:bg-amber-100"
                aria-pressed={editing}
              >
                <Pencil size={15} />
                <span className="hidden sm:inline">{editing ? "Voir la fiche" : "Modifier"}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-full bg-slate-100 p-2 text-slate-600"
              aria-label="Fermer"
            >
              <X size={19} />
            </button>
          </div>
        </div>
        <div className="p-5 pb-12 sm:p-8">
          {editing ? (
            <InlineProgramEditor
              program={program}
              onCancel={() => setEditing(false)}
              onSaved={(saved) => {
                onSaved(saved);
                setEditing(false);
              }}
            />
          ) : (
            <>
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            {program.institution}
          </h2>
          <p className="mt-2 text-xl font-semibold tracking-tight text-teal-800">
            {program.title}
          </p>
          <p className="mt-3 leading-6 text-slate-600">{program.degree}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              ["Campus", program.city],
              ["Entrée", program.entry],
              ["Durée", program.duration],
              ["Modalité", program.mode],
              ["Reconnaissance", program.recognition],
              ["Capacité", program.capacity?.toString() ?? "non publiée"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-slate-50 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  {label}
                </p>
                <p className="mt-1 text-sm font-semibold leading-5 text-slate-900">
                  {value}
                </p>
              </div>
            ))}
          </div>
          <section className="mt-7 rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-teal-700" size={20} />
              <h3 className="font-semibold text-slate-950">Recevabilité MMI</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              {program.mmiEligibility}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              <strong>Entrée directe en 2e année :</strong>{" "}
              {program.directYear2}
            </p>
            {program.note && (
              <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm leading-6 text-amber-900">
                <CircleAlert className="mr-2 inline" size={16} />
                {program.note}
              </p>
            )}
          </section>
          <section className="mt-5 rounded-2xl bg-indigo-50 p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold text-indigo-950">
                <InfoTooltip
                  label="Comprendre la chance estimée"
                  text={chanceEstimateHelp}
                >
                  <span>
                    Chance estimée : {estimate.level}
                  </span>
                </InfoTooltip>
              </h3>
              <EvidenceIndicator
                evidence="estimation"
                confidence={estimate.confidence}
                label={`Confiance ${estimate.confidence}`}
                className="badge bg-white text-indigo-800"
              />
            </div>
            <p className="mt-2 text-sm leading-6 text-indigo-900">
              {estimate.text}
            </p>
            <p className="mt-2 text-xs text-indigo-700">
              Aucune probabilité individuelle n’est publiée. Cette aide dépend
              du classement approximatif et ne remplace pas l’avis du jury.
            </p>
          </section>
          {program.statistics && (
            <details
              open
              className="mt-5 rounded-2xl border border-slate-200 p-5"
            >
              <summary className="cursor-pointer list-none font-semibold text-slate-950">
                Statistiques Mon Master {program.statistics.year}
                <ChevronDown className="float-right" size={18} />
              </summary>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="stat">
                  <span>Candidats</span>
                  <strong>{program.statistics.applicants ?? "—"}</strong>
                </div>
                <div className="stat">
                  <span>Places</span>
                  <strong>{program.statistics.places ?? "—"}</strong>
                </div>
                <div className="stat">
                  <span>Candidats BUT3</span>
                  <strong>{program.statistics.but3Applicants ?? "—"}</strong>
                </div>
                <div className="stat">
                  <span>Propositions BUT3</span>
                  <strong>{program.statistics.but3Offers ?? "—"}</strong>
                </div>
                <div className="stat col-span-2">
                  <InfoTooltip
                    label="Comprendre le taux de proposition BUT3"
                    text={but3RateHelp}
                  >
                    <span>Taux de proposition BUT3</span>
                  </InfoTooltip>
                  <strong>{program.statistics.but3OfferRate ?? "—"} %</strong>
                </div>
              </div>
              <p className="mt-3 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                {program.statistics.warning}
              </p>
            </details>
          )}
          <details
            open
            className="mt-5 rounded-2xl border border-slate-200 p-5"
          >
            <summary className="cursor-pointer list-none font-semibold text-slate-950">
              Attendus et dossier
              <ChevronDown className="float-right" size={18} />
            </summary>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {program.prerequisites.map((item) => (
                <li key={item} className="flex gap-2">
                  <Check className="mt-0.5 shrink-0 text-teal-700" size={16} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-slate-600">
              <strong>Portfolio :</strong> {program.portfolio}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              <strong>Coût :</strong> {program.cost}
            </p>
          </details>
          <details className="mt-5 rounded-2xl border border-slate-200 p-5">
            <summary className="cursor-pointer list-none font-semibold text-slate-950">
              Débouchés
              <ChevronDown className="float-right" size={18} />
            </summary>
            <div className="mt-4 flex flex-wrap gap-2">
              {program.outcomes.map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </details>
          <section className="mt-5">
            <h3 className="font-semibold text-slate-950">Preuves directes</h3>
            <div className="mt-3 space-y-2">
              {program.sources.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-3 text-sm font-medium text-slate-700 hover:border-teal-300 hover:text-teal-800"
                >
                  <span>{source.label}</span>
                  <ExternalLink size={15} />
                </a>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Vérifié le {program.verifiedAt} · version {program.dataVersion}
            </p>
          </section>
          <div className="sticky bottom-4 mt-7 flex gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">
            <button
              onClick={() => toggleFavorite(program.id)}
              className="rounded-xl border border-slate-200 p-3"
              aria-label="Favori"
            >
              <Heart
                fill={favorites.includes(program.id) ? "currentColor" : "none"}
                className={
                  favorites.includes(program.id)
                    ? "text-rose-600"
                    : "text-slate-500"
                }
              />
            </button>
            <button
              onClick={() => toggleCompare(program.id)}
              className="flex-1 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white"
            >
              {compare.includes(program.id)
                ? "Retirer du comparateur"
                : "Comparer (2 max.)"}
            </button>
          </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}

export function Explorer({
  programs: initialPrograms,
  isAdmin,
}: {
  programs: Program[];
  isAdmin: boolean;
}) {
  const [programs, setPrograms] = useState(initialPrograms);
  const [exploreMode, setExploreMode] = useState<"simple" | "advanced">(
    "simple",
  );
  const [simplePath, setSimplePath] = useState<SimplePath>("all");
  const [simpleVisibleCount, setSimpleVisibleCount] = useState(12);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [specialty, setSpecialty] = useState("all");
  const [mode, setMode] = useState("all");
  const [region, setRegion] = useState("all");
  const [evidence, setEvidence] = useState("all");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [rank, setRank] = useState<Rank>("top25");
  const [selected, setSelected] = useState<Program | null>(null);
  const { favorites, compare, toggleFavorite, toggleCompare } =
    useProgramStore();
  const specialties = [
    ...new Set(programs.map((program) => program.specialty)),
  ].sort();
  const regions = [
    ...new Set(programs.map((program) => program.region)),
  ].sort();
  const filtered = programs.filter((program) => {
    const text =
      `${program.institution} ${program.title} ${program.degree} ${program.specialty}`.toLowerCase();
    return (
      (!query || text.includes(query.toLowerCase())) &&
      (type === "all" || program.type === type) &&
      (specialty === "all" || program.specialty === specialty) &&
      (mode === "all" || program.mode.includes(mode)) &&
      (region === "all" || program.region === region) &&
      (evidence === "all" ||
        (evidence === "verified"
          ? program.evidence === "verifie"
          : program.evidence !== "verifie")) &&
      (!favoritesOnly || favorites.includes(program.id))
    );
  });
  const simpleChoice =
    simplePaths.find((path) => path.id === simplePath) ?? simplePaths[0];
  const simpleResults = programs
    .filter(simpleChoice.match)
    .sort(
      (a, b) =>
        Number(b.evidence === "verifie") - Number(a.evidence === "verifie") ||
        (b.statistics?.but3OfferRate ?? -1) -
          (a.statistics?.but3OfferRate ?? -1),
    );
  const visibleSimpleResults = simpleResults.slice(0, simpleVisibleCount);
  const remainingSimpleResults = Math.max(
    0,
    simpleResults.length - simpleVisibleCount,
  );

  return (
    <main className="overflow-hidden">
      <section className="relative border-b border-slate-200 bg-gradient-to-b from-teal-50/80 via-white to-white">
        <div className="pointer-events-none absolute -right-24 -top-32 size-[440px] rounded-full bg-teal-200/25 blur-3xl" />
        <div className="relative mx-auto max-w-[1500px] px-4 py-12 lg:px-8 lg:py-16">
          <div className="max-w-4xl">
            <p className="eyebrow">
              <Sparkles size={14} />
              Données sourcées · preuves directement consultables
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.04] tracking-[-.045em] text-slate-950 sm:text-6xl">
              Trouver sa voie après un&nbsp;
              <span className="text-teal-700">BUT MMI</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Masters publics, écoles d’ingénieurs CTI et diplômes reconnus.
              Chaque affirmation affiche son niveau de preuve.
            </p>
          </div>
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="hero-stat">
              <span className="hero-stat-label">Catalogue</span>
              <strong>{programs.length}</strong>
              <span>formations documentées et reliées à leurs sources</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-label">Repère national</span>
              <strong>{nationalStats.pursuingRate} %</strong>
              <span>en poursuite, BUT MMI 2024</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-label">Contexte</span>
              <strong>2024</strong>
              <span>1re promotion nationale BUT MMI</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-label">Écoles d’ingénieurs</span>
              <strong>
                {programs.filter((program) => program.type === "ingenieur").length}
              </strong>
              <span>cursus documentés avec reconnaissance vérifiable</span>
            </div>
          </div>
        </div>
      </section>
      <section className="relative z-10 mx-auto -mt-6 max-w-[1500px] px-4 pt-8 lg:px-8">
        <div className="flex flex-col justify-between gap-5 rounded-[28px] border border-teal-400/70 bg-slate-950 p-5 text-white shadow-2xl shadow-teal-950/15 sm:flex-row sm:items-center lg:p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-teal-300">
              Étape 1 · choisissez votre vue
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Comment voulez-vous explorer ?
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Commencez simplement ou ouvrez directement la carte et les filtres
              complets.
            </p>
          </div>
          <div className="grid min-w-full grid-cols-1 gap-2 rounded-2xl bg-white/10 p-2 sm:min-w-[430px] sm:grid-cols-2">
            <button
              onClick={() => setExploreMode("simple")}
              className={`flex min-h-14 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${exploreMode === "simple" ? "bg-white text-slate-950 shadow-lg" : "text-slate-200 hover:bg-white/10"}`}
            >
              <ListTree size={17} />
              Exploration simple
            </button>
            <button
              onClick={() => setExploreMode("advanced")}
              className={`flex min-h-14 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${exploreMode === "advanced" ? "bg-white text-slate-950 shadow-lg" : "text-slate-200 hover:bg-white/10"}`}
            >
              <Search size={17} />
              Recherche avancée
            </button>
          </div>
        </div>
      </section>

      {exploreMode === "simple" && (
        <section className="mx-auto max-w-[1500px] px-4 py-8 lg:px-8">
          <div>
            <p className="eyebrow">Explorer en un clic</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Quel chemin vous intéresse ?
            </h2>
            <p className="mt-2 text-slate-600">
              Choisissez une grande voie : la liste utile apparaît directement,
              sans formulaire.
            </p>
          </div>
          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {simplePaths.map((path) => (
              <button
                key={path.id}
                onClick={() => {
                  setSimplePath(path.id);
                  setSimpleVisibleCount(12);
                }}
                aria-pressed={simplePath === path.id}
                className={`flex min-h-[104px] items-start gap-3 rounded-2xl border p-4 text-left transition ${simplePath === path.id ? "border-teal-600 bg-teal-50 text-teal-950 shadow-sm ring-2 ring-teal-600/10" : "border-slate-200 bg-white text-slate-800 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-sm"}`}
              >
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-xl ${simplePath === path.id ? "bg-teal-700 text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  {path.icon}
                </span>
                <span>
                  <strong className="block text-sm">{path.label}</strong>
                  <span className="mt-1 block text-xs leading-5 opacity-70">
                    {path.description}
                  </span>
                </span>
              </button>
            ))}
          </div>
          <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-3 border-b border-slate-200 bg-slate-50/80 px-5 py-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-semibold text-slate-950">
                  {simpleChoice.label}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {simpleResults.length} formations trouvées · les preuves les
                  plus solides sont affichées en premier
                </p>
              </div>
              <button
                onClick={() => setExploreMode("advanced")}
                className="inline-flex items-center gap-2 rounded-xl border border-teal-200 bg-white px-3 py-2 text-sm font-semibold text-teal-800 hover:bg-teal-50"
              >
                <Search size={15} /> Ouvrir les filtres et la carte
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {visibleSimpleResults.map((program) => (
                <div
                  key={program.id}
                  className="grid gap-4 px-5 py-5 transition hover:bg-slate-50 sm:grid-cols-[minmax(0,1.4fr)_minmax(170px,.65fr)_auto] sm:items-center"
                >
                  <button
                    onClick={() => setSelected(program)}
                    className="min-w-0 text-left"
                  >
                    <span className="block text-lg font-bold leading-tight text-slate-950">
                      {program.institution}
                    </span>
                    <span className="mt-1 block text-sm font-semibold leading-5 text-slate-700">
                      {program.title}
                    </span>
                    <span className="mt-1.5 block text-xs leading-5 text-slate-500">
                      {program.degree}
                    </span>
                  </button>
                  <div className="text-left text-xs text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} />
                      {program.city}
                    </span>
                    <span className="mt-1.5 block">
                      <EvidenceIndicator
                        evidence={program.evidence}
                        confidence={program.confidence}
                        label={
                          program.evidence === "verifie"
                            ? "Vérifié"
                            : `À confirmer · ${program.confidence}`
                        }
                        className={`inline-flex rounded-full px-2 py-1 font-semibold ${program.evidence === "verifie" ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}
                      />
                    </span>
                    {program.statistics?.but3OfferRate != null && (
                      <span className="mt-1.5 block">
                        BUT3 : {program.statistics.but3OfferRate} % de
                        propositions
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <button
                      onClick={() => toggleFavorite(program.id)}
                      className={`rounded-xl border p-2.5 ${favorites.includes(program.id) ? "border-rose-200 bg-rose-50 text-rose-600" : "border-slate-200 text-slate-500"}`}
                      aria-label={favorites.includes(program.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                    >
                      <Heart
                        size={17}
                        fill={
                          favorites.includes(program.id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                    <button
                      onClick={() => toggleCompare(program.id)}
                      className={`rounded-xl border p-2.5 ${compare.includes(program.id) ? "border-teal-300 bg-teal-50 text-teal-800" : "border-slate-200 text-slate-500"}`}
                      aria-label={compare.includes(program.id) ? "Retirer du comparateur" : "Ajouter au comparateur"}
                    >
                      <GitCompareArrows size={17} />
                    </button>
                    <button
                      onClick={() => setSelected(program)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-slate-950 px-3 py-2.5 text-xs font-semibold text-white hover:bg-slate-800"
                    >
                      Voir la fiche <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {remainingSimpleResults > 0 && (
              <div className="border-t border-slate-200 bg-slate-50/60 p-4 text-center">
                <button
                  onClick={() => setSimpleVisibleCount((count) => count + 12)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:border-teal-300 hover:text-teal-800"
                >
                  Afficher 12 formations de plus
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                    {remainingSimpleResults} restantes
                  </span>
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {exploreMode === "advanced" && (
        <section className="mx-auto max-w-[1500px] px-4 py-8 lg:px-8">
          <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
            <aside className="h-fit rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm xl:sticky xl:top-24">
              <div className="flex items-center justify-between">
                <div>
                  <p className="eyebrow">Affiner</p>
                  <h2 className="mt-1 text-xl font-semibold">Filtres</h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                  {filtered.length} résultats
                </span>
              </div>
              <label className="relative mt-5 block">
                <Search
                  className="absolute left-3 top-3 text-slate-400"
                  size={18}
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-teal-500"
                  placeholder="École, parcours, spécialité…"
                  aria-label="Rechercher une formation"
                />
              </label>
              <div className="mt-5 grid gap-4">
                <Filter
                  label="Type"
                  value={type}
                  onChange={setType}
                  options={[
                    ["all", "Toutes"],
                    ["master", "Masters"],
                    ["ingenieur", "Ingénieurs"],
                    ["autre", "Autres"],
                  ]}
                />
                <Filter
                  label="Spécialité"
                  value={specialty}
                  onChange={setSpecialty}
                  options={[
                    ["all", "Toutes"],
                    ...specialties.map((v) => [v, v]),
                  ]}
                />
                <Filter
                  label="Modalité"
                  value={mode}
                  onChange={setMode}
                  options={[
                    ["all", "Toutes"],
                    ["initial", "Initial"],
                    ["alternance", "Alternance"],
                  ]}
                />
                <Filter
                  label="Région"
                  value={region}
                  onChange={setRegion}
                  options={[["all", "Toutes"], ...regions.map((v) => [v, v])]}
                />
                <Filter
                  label="Niveau de preuve"
                  value={evidence}
                  onChange={setEvidence}
                  options={[
                    ["all", "Tous"],
                    ["verified", "Vérifié"],
                    ["estimate", "Estimation / à confirmer"],
                  ]}
                />
              </div>
              <button
                onClick={() => setFavoritesOnly(!favoritesOnly)}
                className={`mt-5 flex w-full items-center justify-between rounded-xl border p-3 text-sm font-semibold ${favoritesOnly ? "border-rose-200 bg-rose-50 text-rose-700" : "border-slate-200 text-slate-700"}`}
              >
                <span className="flex items-center gap-2">
                  <Heart
                    size={17}
                    fill={favoritesOnly ? "currentColor" : "none"}
                  />
                  Favoris uniquement
                </span>
                <span>{favorites.length}</span>
              </button>
              <button
                onClick={() => {
                  setQuery("");
                  setType("all");
                  setSpecialty("all");
                  setMode("all");
                  setRegion("all");
                  setEvidence("all");
                  setFavoritesOnly(false);
                }}
                className="mt-2 w-full rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              >
                Réinitialiser les filtres
              </button>
              <div className="mt-5 border-t border-slate-100 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Classement approximatif
                </p>
                <div className="mt-2 grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1">
                  {(["top10", "top25", "top50"] as Rank[]).map((value) => (
                    <button
                      key={value}
                      onClick={() => setRank(value)}
                      className={`rounded-lg px-2 py-2 text-xs font-semibold ${rank === value ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}
                    >
                      {value === "top10"
                        ? "Top 10 %"
                        : value === "top25"
                          ? "Top 25 %"
                          : "Top 50 %"}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[11px] leading-4 text-slate-500">
                  Option facultative. Produit une estimation qualitative, jamais
                  une probabilité officielle.
                </p>
              </div>
            </aside>
            <div className="min-w-0 space-y-6">
              <FranceMap programs={filtered} onSelect={setSelected} />
              <div>
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <p className="eyebrow">Catalogue</p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                      Formations accessibles ou à vérifier
                    </h2>
                  </div>
                  <span className="hidden text-sm text-slate-500 sm:block">
                    Cliquer pour voir les preuves
                  </span>
                </div>
                <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                  {filtered.map((program) => (
                    <ProgramCard
                      key={program.id}
                      program={program}
                      onOpen={() => setSelected(program)}
                      rank={rank}
                    />
                  ))}
                </div>
                {filtered.length === 0 && (
                  <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
                    Aucune formation ne correspond à ces filtres.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      <OutcomePathways />
      {selected && (
        <DetailPanel
          program={selected}
          onClose={() => setSelected(null)}
          rank={rank}
          isAdmin={isAdmin}
          onSaved={(saved) => {
            setPrograms((current) =>
              current.map((program) => (program.id === saved.id ? saved : program)),
            );
            setSelected(saved);
          }}
        />
      )}
    </main>
  );
}

function Filter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[][];
}) {
  return (
    <label>
      <span className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-teal-500"
      >
        {options.map(([key, text]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}

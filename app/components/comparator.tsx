"use client";

import { useMemo, useState } from "react";
import { GitCompareArrows, Heart, RotateCcw, X } from "lucide-react";
import Link from "next/link";
import type { Program } from "../lib/data";
import { useProgramStore } from "./program-store";
import {
  but3RateHelp,
  EvidenceIndicator,
} from "./confidence-help";
import { InfoTooltip } from "./info-tooltip";

const rows: { label: string; value: (program: Program) => React.ReactNode }[] = [
  { label: "Établissement", value: (p) => p.institution },
  { label: "Diplôme exact", value: (p) => p.degree },
  { label: "Spécialité", value: (p) => p.specialty },
  { label: "Reconnaissance", value: (p) => p.recognition },
  { label: "Statut", value: (p) => p.status },
  { label: "Campus", value: (p) => `${p.city} · ${p.region}` },
  { label: "Entrée", value: (p) => p.entry },
  { label: "2e année ingénieur", value: (p) => p.directYear2 },
  { label: "Durée restante", value: (p) => p.duration },
  { label: "Modalité", value: (p) => p.mode },
  { label: "Coût", value: (p) => p.cost },
  { label: "Capacité", value: (p) => p.capacity ?? "non publiée" },
  {
    label: "Taux proposition BUT3",
    value: (p) =>
      p.statistics?.but3OfferRate != null
        ? (
            <InfoTooltip
              label="Comprendre le taux de proposition BUT3"
              text={but3RateHelp}
            >
              <span>{p.statistics.but3OfferRate} % (tous BUT3)</span>
            </InfoTooltip>
          )
        : "non publié",
  },
  { label: "Recevabilité MMI", value: (p) => p.mmiEligibility },
  { label: "Portfolio", value: (p) => p.portfolio },
  { label: "Attendus", value: (p) => p.prerequisites.join(" · ") },
  { label: "Débouchés", value: (p) => p.outcomes.join(" · ") },
  {
    label: "Preuve",
    value: (p) => (
      <EvidenceIndicator
        evidence={p.evidence}
        confidence={p.confidence}
        className="font-semibold"
      />
    ),
  },
  { label: "Vérification", value: (p) => p.verifiedAt },
];

export function Comparator({ programs }: { programs: Program[] }) {
  const { compare, favorites, toggleCompare, clearCompare } = useProgramStore();
  const selected = compare
    .map((id) => programs.find((program) => program.id === id))
    .filter(Boolean) as Program[];
  const favoritePrograms = useMemo(
    () =>
      favorites
        .map((id) => programs.find((p) => p.id === id))
        .filter(Boolean) as Program[],
    [favorites, programs],
  );
  const [mode, setMode] = useState<"columns" | "duel">("columns");

  return (
    <main className="mx-auto max-w-[1500px] px-4 py-10 lg:px-8 lg:py-14">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow">
            <GitCompareArrows size={14} />
            Décider sur des preuves
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-.035em] text-slate-950">
            Comparateur <span className="text-teal-700">{selected.length} / 2</span>
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Deux formations maximum, côte à côte. Les favoris servent de liste
            d’attente personnelle. La comparaison repose uniquement sur les
            données et sources affichées.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setMode("columns")}
            className={`pill-button ${mode === "columns" ? "active" : ""}`}
          >
            Colonnes
          </button>
          <button
            onClick={() => setMode("duel")}
            className={`pill-button ${mode === "duel" ? "active" : ""}`}
          >
            Une contre une
          </button>
          <button
            onClick={clearCompare}
            className="rounded-full border border-slate-200 p-2.5 text-slate-500"
            aria-label="Vider le comparateur"
          >
            <RotateCcw size={17} />
          </button>
        </div>
      </div>

      {selected.length < 2 && (
        <section className="mt-8 rounded-[28px] border border-dashed border-teal-300 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                Ajoutez {2 - selected.length} formation{selected.length === 0 ? "s" : ""}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Choisissez parmi vos favoris ou ajoutez-en depuis le catalogue.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Explorer les formations
            </Link>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {favoritePrograms
              .filter((p) => !compare.includes(p.id))
              .slice(0, 8)
              .map((program) => (
                <button
                  onClick={() => toggleCompare(program.id)}
                  key={program.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 text-left hover:border-teal-300"
                >
                  <span>
                    <strong className="block text-lg leading-tight text-slate-950">
                      {program.institution}
                    </strong>
                    <span className="mt-1 block text-sm text-slate-600">
                      {program.title}
                    </span>
                  </span>
                  <Heart className="text-rose-500" fill="currentColor" size={17} />
                </button>
              ))}
            {favoritePrograms.length === 0 && (
              <p className="text-sm text-slate-500">Aucun favori pour le moment.</p>
            )}
          </div>
        </section>
      )}

      {selected.length > 0 && (
        <section
          className={`mt-8 grid gap-4 ${selected.length === 2 ? "md:grid-cols-2" : "max-w-2xl"}`}
        >
          {selected.map((program, index) => (
            <article
              key={program.id}
              className={`rounded-[28px] border p-6 ${index === 0 ? "border-teal-200 bg-teal-50/40" : "border-indigo-200 bg-indigo-50/40"}`}
            >
              <div className="flex justify-between gap-3">
                <span className="badge bg-white text-slate-700">Choix {index + 1}</span>
                <button
                  onClick={() => toggleCompare(program.id)}
                  aria-label={`Retirer ${program.institution}`}
                >
                  <X size={18} />
                </button>
              </div>
              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-950">
                {program.institution}
              </h2>
              <p className="mt-2 text-lg font-semibold leading-tight text-slate-700">
                {program.title}
              </p>
              <p className="mt-3 text-sm text-slate-600">{program.recognition}</p>
            </article>
          ))}
        </section>
      )}

      {selected.length === 2 && (
        <section className="mt-6 overflow-x-auto rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="min-w-[760px]">
          <div className="grid grid-cols-[220px_1fr_1fr] border-b border-slate-200 bg-slate-950 p-4 text-white">
            <span className="self-end pb-1 text-sm font-semibold text-slate-300">Critère</span>
            <span className="px-3 text-lg font-bold leading-tight sm:text-xl">
              {selected[0].institution}
            </span>
            <span className="px-3 text-lg font-bold leading-tight sm:text-xl">
              {selected[1].institution}
            </span>
          </div>
          {rows.map((row) => (
            <div
              key={row.label}
              className={`grid grid-cols-[220px_1fr_1fr] border-b border-slate-100 p-4 text-sm last:border-0 ${mode === "duel" ? "items-center" : "items-start"}`}
            >
              <strong className="pr-3 text-slate-600">{row.label}</strong>
              <div className={`border-l border-slate-100 px-3 leading-6 text-slate-800 ${row.label === "Établissement" ? "text-lg font-bold text-slate-950" : ""}`}>
                {row.value(selected[0])}
              </div>
              <div className={`border-l border-slate-100 px-3 leading-6 text-slate-800 ${row.label === "Établissement" ? "text-lg font-bold text-slate-950" : ""}`}>
                {row.value(selected[1])}
              </div>
            </div>
          ))}
          </div>
        </section>
      )}
    </main>
  );
}

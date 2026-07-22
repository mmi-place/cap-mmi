"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Save, TriangleAlert, X } from "lucide-react";
import type { Program } from "../lib/data";
import { parseListLines, parseSourceLines, sourceLines } from "../lib/program-form";

export function InlineProgramEditor({
  program,
  onCancel,
  onSaved,
}: {
  program: Program;
  onCancel: () => void;
  onSaved: (program: Program) => void;
}) {
  const [draft, setDraft] = useState<Program>(() => structuredClone(program));
  const [prerequisites, setPrerequisites] = useState(program.prerequisites.join("\n"));
  const [outcomes, setOutcomes] = useState(program.outcomes.join("\n"));
  const [sources, setSources] = useState(sourceLines(program.sources));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function setField<K extends keyof Program>(field: K, value: Program[K]) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const complete: Program = {
      ...draft,
      prerequisites: parseListLines(prerequisites),
      outcomes: parseListLines(outcomes),
      sources: parseSourceLines(sources),
    };
    try {
      const response = await fetch(`/api/admin/programs/${encodeURIComponent(program.id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(complete),
      });
      const payload = (await response.json()) as { error?: string; program?: Program };
      if (!response.ok || !payload.program)
        throw new Error(payload.error || "Enregistrement impossible.");
      onSaved(payload.program);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Enregistrement impossible.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="rounded-3xl border border-amber-200 bg-amber-50/50 p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.15em] text-amber-700">Édition administrateur</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-950">Modifier la fiche</h2>
          <p className="mt-1 text-xs text-slate-500">Identifiant : {program.id}</p>
        </div>
        <button type="button" onClick={onCancel} className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600" aria-label="Annuler la modification">
          <X size={18} />
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Établissement"><input className="input" required value={draft.institution} onChange={(event) => setField("institution", event.target.value)} /></Field>
        <Field label="Intitulé"><input className="input" required value={draft.title} onChange={(event) => setField("title", event.target.value)} /></Field>
        <Field label="Diplôme exact"><input className="input" required value={draft.degree} onChange={(event) => setField("degree", event.target.value)} /></Field>
        <Field label="Spécialité"><input className="input" required value={draft.specialty} onChange={(event) => setField("specialty", event.target.value)} /></Field>
        <Field label="Type"><select className="input" value={draft.type} onChange={(event) => setField("type", event.target.value as Program["type"])}><option value="master">Master</option><option value="ingenieur">Ingénieur</option><option value="autre">Autre</option></select></Field>
        <Field label="Statut"><input className="input" required value={draft.status} onChange={(event) => setField("status", event.target.value)} /></Field>
        <Field label="Reconnaissance"><input className="input" required value={draft.recognition} onChange={(event) => setField("recognition", event.target.value)} /></Field>
        <Field label="Ville"><input className="input" required value={draft.city} onChange={(event) => setField("city", event.target.value)} /></Field>
        <Field label="Région"><input className="input" required value={draft.region} onChange={(event) => setField("region", event.target.value)} /></Field>
        <Field label="Modalité"><input className="input" required value={draft.mode} onChange={(event) => setField("mode", event.target.value)} /></Field>
        <Field label="Niveau d’entrée"><input className="input" required value={draft.entry} onChange={(event) => setField("entry", event.target.value)} /></Field>
        <Field label="Entrée en 2e année"><input className="input" required value={draft.directYear2} onChange={(event) => setField("directYear2", event.target.value)} /></Field>
        <Field label="Durée"><input className="input" required value={draft.duration} onChange={(event) => setField("duration", event.target.value)} /></Field>
        <Field label="Coût"><input className="input" required value={draft.cost} onChange={(event) => setField("cost", event.target.value)} /></Field>
        <Field label="Capacité"><input className="input" type="number" min="0" value={draft.capacity ?? ""} onChange={(event) => setField("capacity", event.target.value === "" ? null : Number(event.target.value))} /></Field>
        <Field label="Portfolio"><input className="input" required value={draft.portfolio} onChange={(event) => setField("portfolio", event.target.value)} /></Field>
        <Field label="Recevabilité MMI"><input className="input" required value={draft.mmiEligibility} onChange={(event) => setField("mmiEligibility", event.target.value)} /></Field>
        <Field label="Niveau de preuve"><select className="input" value={draft.evidence} onChange={(event) => setField("evidence", event.target.value as Program["evidence"])}><option value="verifie">Vérifié</option><option value="estimation">Estimation</option><option value="inconnu">Inconnu</option><option value="contradictoire">Contradictoire</option></select></Field>
        <Field label="Confiance"><select className="input" value={draft.confidence} onChange={(event) => setField("confidence", event.target.value as Program["confidence"])}><option value="forte">Forte</option><option value="moyenne">Moyenne</option><option value="faible">Faible</option></select></Field>
        <Field label="Date de vérification"><input className="input" type="date" required value={draft.verifiedAt} onChange={(event) => setField("verifiedAt", event.target.value)} /></Field>
        <Field label="Version"><input className="input" required value={draft.dataVersion} onChange={(event) => setField("dataVersion", event.target.value)} /></Field>
        <Field label="Latitude"><input className="input" type="number" step="any" required value={draft.latitude} onChange={(event) => setField("latitude", Number(event.target.value))} /></Field>
        <Field label="Longitude"><input className="input" type="number" step="any" required value={draft.longitude} onChange={(event) => setField("longitude", Number(event.target.value))} /></Field>
      </div>

      <Field label="Prérequis — un par ligne"><textarea className="input min-h-28 resize-y" value={prerequisites} onChange={(event) => setPrerequisites(event.target.value)} /></Field>
      <Field label="Débouchés — un par ligne"><textarea className="input min-h-28 resize-y" value={outcomes} onChange={(event) => setOutcomes(event.target.value)} /></Field>
      <Field label="Sources — libellé | URL | officielle, institution, secondaire ou linkedin"><textarea className="input min-h-36 resize-y font-mono text-xs" required value={sources} onChange={(event) => setSources(event.target.value)} /></Field>
      <Field label="Note"><textarea className="input min-h-24 resize-y" value={draft.note || ""} onChange={(event) => setField("note", event.target.value)} /></Field>

      {error && <p role="alert" className="mt-4 flex gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-800"><TriangleAlert className="shrink-0" size={17} />{error}</p>}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"><Save size={17} />{saving ? "Enregistrement…" : "Enregistrer la fiche"}</button>
        <button type="button" onClick={onCancel} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">Annuler</button>
        <Link href="/admin" className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-teal-700">Administration complète <ExternalLink size={13} /></Link>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="mt-4 block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</span>{children}</label>;
}

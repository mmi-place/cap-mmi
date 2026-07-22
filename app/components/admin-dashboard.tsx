"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, FilePlus2, LogOut, Save, ShieldCheck, X } from "lucide-react";
import type { Program } from "../lib/data";
import type { Proposal, ProposalStatus } from "../lib/content-store";
import { parseListLines, parseSourceLines, sourceLines } from "../lib/program-form";

const today = new Date().toISOString().slice(0, 10);
const blankProgram: Program = {
  id: "",
  type: "master",
  institution: "",
  degree: "",
  title: "",
  specialty: "",
  status: "public",
  recognition: "",
  city: "",
  latitude: 46.603354,
  longitude: 1.888334,
  region: "",
  mode: "initial",
  entry: "BUT3 / bac+3",
  directYear2: "non",
  duration: "2 ans",
  cost: "à vérifier",
  capacity: null,
  portfolio: "non documenté",
  mmiEligibility: "à vérifier",
  evidence: "inconnu",
  confidence: "faible",
  prerequisites: [],
  outcomes: [],
  sources: [],
  verifiedAt: today,
  dataVersion: "admin-1",
  note: "",
};

export function AdminDashboard({
  initialPrograms,
  initialProposals,
}: {
  initialPrograms: Program[];
  initialProposals: Proposal[];
}) {
  const router = useRouter();
  const [programs, setPrograms] = useState(initialPrograms);
  const [proposals, setProposals] = useState(initialProposals);
  const [tab, setTab] = useState<"proposals" | "programs">("proposals");
  const [draft, setDraft] = useState<Program>(() => structuredClone(initialPrograms[0] || blankProgram));
  const [isNew, setIsNew] = useState(initialPrograms.length === 0);
  const [prerequisites, setPrerequisites] = useState((initialPrograms[0]?.prerequisites || []).join("\n"));
  const [outcomes, setOutcomes] = useState((initialPrograms[0]?.outcomes || []).join("\n"));
  const [sources, setSources] = useState(sourceLines(initialPrograms[0]?.sources || []));
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  function loadProgram(program: Program) {
    setDraft(structuredClone(program));
    setPrerequisites(program.prerequisites.join("\n"));
    setOutcomes(program.outcomes.join("\n"));
    setSources(sourceLines(program.sources));
    setIsNew(false);
    setNotice(null);
  }

  function startNew() {
    setDraft(structuredClone(blankProgram));
    setPrerequisites("");
    setOutcomes("");
    setSources("");
    setIsNew(true);
    setNotice(null);
  }

  function setField<K extends keyof Program>(field: K, value: Program[K]) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  async function save() {
    setSaving(true);
    setNotice(null);
    const complete: Program = {
      ...draft,
      prerequisites: parseListLines(prerequisites),
      outcomes: parseListLines(outcomes),
      sources: parseSourceLines(sources),
    };
    try {
      const response = await fetch(isNew ? "/api/admin/programs" : `/api/admin/programs/${encodeURIComponent(complete.id)}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(complete),
      });
      const payload = (await response.json()) as { error?: string; program?: Program };
      if (!response.ok || !payload.program) throw new Error(payload.error || "Enregistrement impossible.");
      setPrograms((current) => {
        const exists = current.some((program) => program.id === payload.program!.id);
        return exists
          ? current.map((program) => program.id === payload.program!.id ? payload.program! : program)
          : [...current, payload.program!];
      });
      loadProgram(payload.program);
      setNotice({ ok: true, text: "Fiche enregistrée. Elle est immédiatement utilisée par l’explorateur." });
      router.refresh();
    } catch (error) {
      setNotice({ ok: false, text: error instanceof Error ? error.message : "Enregistrement impossible." });
    } finally {
      setSaving(false);
    }
  }

  async function updateProposal(id: string, status: ProposalStatus) {
    const response = await fetch(`/api/admin/proposals/${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const payload = (await response.json()) as { error?: string; proposal?: Proposal };
    if (!response.ok || !payload.proposal) {
      setNotice({ ok: false, text: payload.error || "Modification impossible." });
      return;
    }
    setProposals((current) => current.map((proposal) => proposal.id === id ? payload.proposal! : proposal));
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  const pending = proposals.filter((proposal) => proposal.status === "pending").length;

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3">
        <div className="flex gap-2">
          <button onClick={() => setTab("proposals")} className={`pill-button ${tab === "proposals" ? "active" : ""}`}>Demandes ({pending})</button>
          <button onClick={() => setTab("programs")} className={`pill-button ${tab === "programs" ? "active" : ""}`}>Formations ({programs.length})</button>
        </div>
        <button onClick={logout} className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"><LogOut size={16} /> Déconnexion</button>
      </div>

      {notice && <p role="status" className={`mt-4 rounded-xl p-4 text-sm ${notice.ok ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-900"}`}>{notice.text}</p>}

      {tab === "proposals" ? (
        <section className="mt-5 grid gap-4">
          {proposals.length === 0 && <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">Aucune proposition enregistrée.</p>}
          {proposals.map((proposal) => (
            <article key={proposal.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge bg-teal-50 text-teal-800">{proposal.kind}</span>
                    <span className={`badge ${proposal.status === "pending" ? "bg-amber-50 text-amber-800" : proposal.status === "approved" ? "bg-emerald-50 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>{proposal.status}</span>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">{new Date(proposal.createdAt).toLocaleString("fr-FR")} · {proposal.programId || "nouvelle formation"}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => updateProposal(proposal.id, "approved")} aria-label="Marquer comme traitée" className="rounded-xl bg-emerald-50 p-2.5 text-emerald-700"><Check size={17} /></button>
                  <button onClick={() => updateProposal(proposal.id, "rejected")} aria-label="Rejeter" className="rounded-xl bg-red-50 p-2.5 text-red-700"><X size={17} /></button>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-800">{proposal.message}</p>
              {(proposal.name || proposal.email) && <p className="mt-3 text-xs text-slate-500">Contact : {proposal.name || "anonyme"}{proposal.email ? ` · ${proposal.email}` : ""}</p>}
              {proposal.sourceUrls.length > 0 && <ul className="mt-4 space-y-1 text-xs text-teal-700">{proposal.sourceUrls.map((url) => <li key={url}><a href={url} target="_blank" rel="noreferrer" className="break-all underline">{url}</a></li>)}</ul>}
            </article>
          ))}
        </section>
      ) : (
        <section className="mt-5 grid gap-5 xl:grid-cols-[320px_1fr]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-4 xl:sticky xl:top-24 xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto">
            <button onClick={startNew} className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white"><FilePlus2 size={17} /> Nouvelle formation</button>
            <div className="mt-4 space-y-1">
              {programs.map((program) => (
                <button key={program.id} onClick={() => loadProgram(program)} className={`w-full rounded-xl px-3 py-2 text-left text-sm ${draft.id === program.id && !isNew ? "bg-teal-50 text-teal-900" : "text-slate-700 hover:bg-slate-50"}`}>
                  <strong className="block">{program.institution}</strong>
                  <span className="line-clamp-1 text-xs opacity-70">{program.title}</span>
                </button>
              ))}
            </div>
          </aside>
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><p className="eyebrow"><ShieldCheck size={14} /> {isNew ? "Ajout" : "Modification vérifiée"}</p><h2 className="mt-2 text-2xl font-semibold text-slate-950">{isNew ? "Nouvelle fiche" : draft.institution}</h2></div>
              <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"><Save size={17} /> {saving ? "Enregistrement…" : "Enregistrer"}</button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Field label="Identifiant stable"><input className="input" value={draft.id} disabled={!isNew} onChange={(event) => setField("id", event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))} /></Field>
              <Field label="Type"><select className="input" value={draft.type} onChange={(event) => setField("type", event.target.value as Program["type"])}><option value="master">Master</option><option value="ingenieur">Ingénieur</option><option value="autre">Autre</option></select></Field>
              <Field label="Établissement"><input className="input" value={draft.institution} onChange={(event) => setField("institution", event.target.value)} /></Field>
              <Field label="Intitulé"><input className="input" value={draft.title} onChange={(event) => setField("title", event.target.value)} /></Field>
              <Field label="Diplôme exact"><input className="input" value={draft.degree} onChange={(event) => setField("degree", event.target.value)} /></Field>
              <Field label="Spécialité"><input className="input" value={draft.specialty} onChange={(event) => setField("specialty", event.target.value)} /></Field>
              <Field label="Statut"><input className="input" value={draft.status} onChange={(event) => setField("status", event.target.value)} /></Field>
              <Field label="Reconnaissance"><input className="input" value={draft.recognition} onChange={(event) => setField("recognition", event.target.value)} /></Field>
              <Field label="Ville"><input className="input" value={draft.city} onChange={(event) => setField("city", event.target.value)} /></Field>
              <Field label="Région"><input className="input" value={draft.region} onChange={(event) => setField("region", event.target.value)} /></Field>
              <Field label="Latitude"><input className="input" type="number" step="any" value={draft.latitude} onChange={(event) => setField("latitude", Number(event.target.value))} /></Field>
              <Field label="Longitude"><input className="input" type="number" step="any" value={draft.longitude} onChange={(event) => setField("longitude", Number(event.target.value))} /></Field>
              <Field label="Modalité"><input className="input" value={draft.mode} onChange={(event) => setField("mode", event.target.value)} /></Field>
              <Field label="Niveau d’entrée"><input className="input" value={draft.entry} onChange={(event) => setField("entry", event.target.value)} /></Field>
              <Field label="Entrée en 2e année"><input className="input" value={draft.directYear2} onChange={(event) => setField("directYear2", event.target.value)} /></Field>
              <Field label="Durée"><input className="input" value={draft.duration} onChange={(event) => setField("duration", event.target.value)} /></Field>
              <Field label="Coût"><input className="input" value={draft.cost} onChange={(event) => setField("cost", event.target.value)} /></Field>
              <Field label="Capacité"><input className="input" type="number" min="0" value={draft.capacity ?? ""} onChange={(event) => setField("capacity", event.target.value === "" ? null : Number(event.target.value))} /></Field>
              <Field label="Portfolio"><input className="input" value={draft.portfolio} onChange={(event) => setField("portfolio", event.target.value)} /></Field>
              <Field label="Recevabilité MMI"><input className="input" value={draft.mmiEligibility} onChange={(event) => setField("mmiEligibility", event.target.value)} /></Field>
              <Field label="État de preuve"><select className="input" value={draft.evidence} onChange={(event) => setField("evidence", event.target.value as Program["evidence"])}><option value="verifie">Vérifié</option><option value="estimation">Estimation</option><option value="inconnu">Inconnu</option><option value="contradictoire">Contradictoire</option></select></Field>
              <Field label="Confiance"><select className="input" value={draft.confidence} onChange={(event) => setField("confidence", event.target.value as Program["confidence"])}><option value="forte">Forte</option><option value="moyenne">Moyenne</option><option value="faible">Faible</option></select></Field>
              <Field label="Date de vérification"><input className="input" type="date" value={draft.verifiedAt} onChange={(event) => setField("verifiedAt", event.target.value)} /></Field>
              <Field label="Version"><input className="input" value={draft.dataVersion} onChange={(event) => setField("dataVersion", event.target.value)} /></Field>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Prérequis (un par ligne)"><textarea className="input min-h-28" value={prerequisites} onChange={(event) => setPrerequisites(event.target.value)} /></Field>
              <Field label="Débouchés (un par ligne)"><textarea className="input min-h-28" value={outcomes} onChange={(event) => setOutcomes(event.target.value)} /></Field>
            </div>
            <Field label="Sources : libellé | URL | niveau"><textarea className="input mt-1 min-h-32 font-mono text-xs" value={sources} onChange={(event) => setSources(event.target.value)} placeholder="Admissions | https://ecole.fr/admissions | institution" /></Field>
            <Field label="Note interne/publique"><textarea className="input mt-1 min-h-24" value={draft.note || ""} onChange={(event) => setField("note", event.target.value)} /></Field>
          </div>
        </section>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</span>{children}</label>;
}

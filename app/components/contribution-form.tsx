"use client";

import { useState } from "react";
import { CheckCircle2, Send, TriangleAlert } from "lucide-react";

type ProgramChoice = { id: string; label: string };

export function ContributionForm({ programs }: { programs: ProgramChoice[] }) {
  const [kind, setKind] = useState("erreur");
  const [programId, setProgramId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sources, setSources] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("/api/contributions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          programId,
          name,
          email,
          message,
          sourceUrls: sources
            .split(/\r?\n/)
            .map((value) => value.trim())
            .filter(Boolean)
            .slice(0, 5),
          website,
        }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Envoi impossible.");
      setResult({ ok: true, message: "Merci. Votre proposition a été enregistrée pour vérification." });
      setMessage("");
      setSources("");
    } catch (error) {
      setResult({
        ok: false,
        message: error instanceof Error ? error.message : "Envoi impossible.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label>
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Type de demande</span>
          <select className="input" value={kind} onChange={(event) => setKind(event.target.value)}>
            <option value="erreur">Signaler une erreur</option>
            <option value="modification">Proposer une modification</option>
            <option value="ajout">Proposer une formation</option>
          </select>
        </label>
        <label>
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Formation concernée</span>
          <select className="input" value={programId} onChange={(event) => setProgramId(event.target.value)}>
            <option value="">Aucune / nouvelle formation</option>
            {programs.map((program) => (
              <option key={program.id} value={program.id}>{program.label}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Votre nom <span className="font-normal text-slate-400">(facultatif)</span></span>
          <input className="input" maxLength={120} value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
        </label>
        <label>
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Votre e-mail <span className="font-normal text-slate-400">(facultatif)</span></span>
          <input className="input" type="email" maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
        </label>
      </div>
      <label className="mt-5 block">
        <span className="mb-1.5 block text-sm font-semibold text-slate-700">Explication</span>
        <textarea
          className="input min-h-36 resize-y"
          required
          minLength={20}
          maxLength={5000}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Décrivez précisément l’erreur ou la formation à ajouter. Indiquez l’année d’admission concernée."
        />
      </label>
      <label className="mt-5 block">
        <span className="mb-1.5 block text-sm font-semibold text-slate-700">Sources publiques <span className="font-normal text-slate-400">(une URL par ligne, cinq maximum)</span></span>
        <textarea
          className="input min-h-24 resize-y font-mono text-xs"
          value={sources}
          onChange={(event) => setSources(event.target.value)}
          placeholder="https://www.etablissement.fr/admissions"
        />
      </label>
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        className="pointer-events-none absolute -left-[9999px] size-px opacity-0"
        aria-hidden="true"
      />
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-60">
          <Send size={17} /> {loading ? "Enregistrement…" : "Envoyer la proposition"}
        </button>
        <p className="text-xs leading-5 text-slate-500">Aucune publication automatique : une source est vérifiée avant toute modification.</p>
      </div>
      {result && (
        <p role="status" className={`mt-5 flex items-start gap-2 rounded-xl p-4 text-sm ${result.ok ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-900"}`}>
          {result.ok ? <CheckCircle2 className="mt-0.5 shrink-0" size={17} /> : <TriangleAlert className="mt-0.5 shrink-0" size={17} />}
          {result.message}
        </p>
      )}
    </form>
  );
}

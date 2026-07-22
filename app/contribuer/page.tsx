import type { Metadata } from "next";
import { FilePenLine } from "lucide-react";
import { ContributionForm } from "../components/contribution-form";
import { getPrograms } from "../lib/content-store";

export const metadata: Metadata = {
  title: "Signaler ou proposer une formation",
  description: "Signaler une erreur, proposer une correction ou une nouvelle formation pour Cap MMI.",
};
export const dynamic = "force-dynamic";

export default async function ContributePage() {
  const programs = (await getPrograms())
    .map((program) => ({ id: program.id, label: `${program.institution} — ${program.title}` }))
    .sort((a, b) => a.label.localeCompare(b.label, "fr"));
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 lg:px-8 lg:py-16">
      <p className="eyebrow"><FilePenLine size={14} /> Base collaborative, validation humaine</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-.035em] text-slate-950 sm:text-5xl">Signaler, corriger ou proposer</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
        Vous avez trouvé une condition d’admission obsolète, une erreur ou une formation manquante ? Envoyez la preuve publique. La demande restera privée jusqu’à sa vérification.
      </p>
      <ContributionForm programs={programs} />
    </main>
  );
}

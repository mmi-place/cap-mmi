import type { Metadata } from "next";
import { Settings2 } from "lucide-react";
import { AdminDashboard } from "../components/admin-dashboard";
import { AdminLogin } from "../components/admin-login";
import { getPrograms, getProposals } from "../lib/content-store";
import { adminIsConfigured, hasAdminSession } from "../lib/security";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const configured = adminIsConfigured();
  const authenticated = configured && (await hasAdminSession());
  return (
    <main className="mx-auto max-w-[1500px] px-4 py-12 lg:px-8">
      <p className="eyebrow"><Settings2 size={14} /> Administration privée</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-.035em] text-slate-950">Gérer Cap MMI</h1>
      {!configured ? (
        <p className="mt-8 max-w-2xl rounded-2xl bg-amber-50 p-5 text-sm leading-6 text-amber-950">Administration désactivée. Configurez <code>ADMIN_PASSWORD</code> et un <code>ADMIN_SESSION_SECRET</code> aléatoire d’au moins 32 caractères, puis redémarrez l’application.</p>
      ) : !authenticated ? (
        <AdminLogin />
      ) : (
        <AdminDashboard initialPrograms={await getPrograms()} initialProposals={await getProposals()} />
      )}
    </main>
  );
}

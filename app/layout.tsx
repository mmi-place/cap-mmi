import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@fontsource/opendyslexic/400.css";
import "@fontsource/opendyslexic/700.css";
import "./globals.css";
import { ProgramStoreProvider } from "./components/program-store";
import { SiteHeader } from "./components/site-header";
import Link from "next/link";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://cap-mmi.vercel.app",
  ),
  title: { default: "Cap MMI — poursuites d’études", template: "%s | Cap MMI" },
  description:
    "Un guide sourcé et transparent des poursuites d’études après un BUT MMI.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/cap-mmi-logo.png",
  },
  openGraph: {
    title: "Cap MMI",
    description:
      "Explorer, vérifier et comparer les poursuites d’études après un BUT MMI.",
    images: ["/og-apres-mmi.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        <a href="#contenu-principal" className="skip-link">
          Aller au contenu principal
        </a>
        <ProgramStoreProvider>
          <SiteHeader />
          <div id="contenu-principal" tabIndex={-1}>
            {children}
          </div>
          <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-slate-300">
            <div className="mx-auto grid max-w-[1500px] gap-6 px-4 py-10 text-sm md:grid-cols-[1fr_auto] lg:px-8">
              <div>
                <p className="text-base font-semibold text-white">
                  Cap MMI · Bastian NOEL · 21/07/2026
                </p>
                <p className="mt-2 max-w-3xl leading-6 text-slate-400">
                  Outil indépendant, sans affiliation avec les IUT, universités
                  ou écoles citées. Les données sont documentaires et peuvent
                  évoluer. L’auteur n’assume aucune responsabilité concernant
                  une décision d’orientation, une admission ou l’exactitude
                  future des informations : vérifiez toujours auprès de
                  l’établissement.
                </p>
              </div>
              <div className="flex flex-col gap-2 md:items-end">
                <Link
                  href="/contribuer"
                  className="font-semibold text-teal-300 hover:text-teal-200"
                >
                  Signaler une erreur ou proposer une formation
                </Link>
                <a
                  href="mailto:bastian.noel.professionnel+capmmi@gmail.com"
                  className="text-slate-300 hover:text-white"
                >
                  Demander une correction
                </a>
                <span className="text-xs text-slate-500">
                  bastian.noel.professionnel+capmmi@gmail.com
                </span>
              </div>
            </div>
          </footer>
        </ProgramStoreProvider>
      </body>
    </html>
  );
}

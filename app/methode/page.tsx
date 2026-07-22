import type { Metadata } from "next";
import {
  Accessibility,
  BarChart3,
  BookmarkPlus,
  CircleAlert,
  Database,
  ExternalLink,
  FileCheck2,
  LockKeyhole,
  Scale,
  ShieldQuestion,
} from "lucide-react";
import {
  linkedinFranceSample,
  linkedinSample,
  nationalStats,
  outcomeSources,
  velizyStats,
  type Source,
} from "../lib/data";
import { getPrograms } from "../lib/content-store";

export const metadata: Metadata = {
  title: "Données, méthode et reconnaissance",
  description:
    "Sources, limites, estimations et reconnaissance des diplômes présentés par Cap MMI.",
};

export const dynamic = "force-dynamic";

export default async function MethodPage() {
  const programs = await getPrograms();
  const sourceMap = new Map<string, Source>();
  for (const source of [
    ...outcomeSources,
    ...programs.flatMap((program) => program.sources),
  ])
    sourceMap.set(source.url, source);
  const sources = [...sourceMap.values()];
  const verified = programs.filter((p) => p.evidence === "verifie").length;
  const estimates = programs.filter((p) => p.evidence === "estimation").length;
  const unknown = programs.filter((p) => p.evidence === "inconnu").length;
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-12 lg:px-8 lg:py-16">
      <p className="eyebrow">
        <Database size={14} />
        Transparence par défaut
      </p>
      <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-.035em] text-slate-950 sm:text-5xl">
        Données, méthode & reconnaissance
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
        Tout ce qui est officiel, estimé, incomplet ou issu d’un échantillon est
        séparé. L’objectif n’est pas de promettre une admission, mais d’aider à
        poser les bonnes questions.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="hero-stat">
          <strong>{verified}</strong>
          <span>fiches ou admissibilités vérifiées</span>
        </div>
        <div className="hero-stat">
          <strong>{estimates}</strong>
          <span>recevabilités plausibles à confirmer</span>
        </div>
        <div className="hero-stat">
          <strong>{unknown}</strong>
          <span>situations non documentées</span>
        </div>
      </div>

      <Section icon={<FileCheck2 />} title="Hiérarchie des preuves">
        <div className="grid gap-3 sm:grid-cols-2">
          <Evidence
            color="emerald"
            title="A · Officiel"
            text="Ministère, data.gouv, CTI, Mon Master, InserSup. Prioritaire pour la reconnaissance et les statistiques."
          />
          <Evidence
            color="teal"
            title="B · Établissement"
            text="Page admissions, brochure ou règlement de l’école. Preuve principale de recevabilité."
          />
          <Evidence
            color="amber"
            title="C · Secondaire"
            text="Guides, médias étudiants, anciens documents. Sert à contextualiser ou à déclencher une vérification."
          />
          <Evidence
            color="slate"
            title="D · LinkedIn / témoignage"
            text="Trajectoire individuelle uniquement. Ne démontre ni admissibilité générale, ni taux de réussite."
          />
        </div>
      </Section>

      <Section
        icon={<Scale />}
        title="Trois états de confiance pour une estimation"
      >
        <div className="grid gap-3 sm:grid-cols-3">
          <Evidence
            color="emerald"
            title="Confiance forte"
            text="Plusieurs sources primaires concordent, mais la valeur reste calculée ou projetée."
          />
          <Evidence
            color="amber"
            title="Confiance moyenne"
            text="Une source institutionnelle et une logique documentée soutiennent l’estimation."
          />
          <Evidence
            color="slate"
            title="Confiance faible"
            text="Indice LinkedIn, témoignage, ancienne donnée ou compatibilité supposée. Confirmation écrite indispensable."
          />
        </div>
        <p className="mt-4 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          <CircleAlert className="mr-2 inline" size={17} />
          Le niveau « chance faible / moyenne / élevée » combine classement
          approximatif, compatibilité MMI et taux BUT3 lorsqu’il existe. Il ne
          s’agit jamais d’une probabilité d’admission.
        </p>
      </Section>

      <Section icon={<Database />} title="Statistiques utilisées">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-3 pr-4">Périmètre</th>
                <th className="py-3 pr-4">Valeur</th>
                <th className="py-3 pr-4">Ce qu’elle prouve</th>
                <th className="py-3">Limite</th>
              </tr>
            </thead>
            <tbody className="align-top text-slate-700">
              <Row
                cells={[
                  "BUT MMI national 2024",
                  `${nationalStats.graduates2024} diplômés ; ${nationalStats.pursuing2024} en poursuite (${nationalStats.pursuingRate} %)`,
                  "Première cohorte complète du BUT",
                  "Noms des formations non publiés",
                ]}
              />
              <Row
                cells={[
                  "Vélizy 2023–2024",
                  `${velizyStats.trainingOrReorientation} % formation/réorientation ; ${velizyStats.salariedFrance} % emploi ; ${velizyStats.other} % autre`,
                  "Répartition locale publiée",
                  "Effectifs et écoles non publiés",
                ]}
              />
              <Row
                cells={[
                  "Mon Master 2025",
                  "Places, candidats, propositions et acceptations BUT3",
                  "Sélectivité tous BUT3",
                  "Jamais un taux MMI",
                ]}
              />
              <Row
                cells={[
                  "LinkedIn Vélizy",
                  `${linkedinSample.found} trouvés ; ${linkedinSample.reviewed} relus ; ${linkedinSample.count} exploitables`,
                  "Chronologies formation puis métier",
                  "Échantillon biaisé et non probabiliste",
                ]}
              />
              <Row
                cells={[
                  "LinkedIn France",
                  `${linkedinFranceSample.found} résultats sur ${linkedinFranceSample.sites.length} recherches d’IUT ; ${linkedinFranceSample.retained} intitulés retenus`,
                  "Diversité des métiers visibles",
                  "Codage des intitulés, pas une enquête d’insertion",
                ]}
              />
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        icon={<BarChart3 />}
        title="Débouchés : ce que les sources permettent d’affirmer"
      >
        <p className="max-w-4xl text-sm leading-7 text-slate-700">
          Les {outcomeSources.length} panoramas officiels, institutionnels et
          secondaires convergent vers six grandes familles. Cette synthèse
          décrit des compétences et des fonctions possibles ; elle ne mesure ni
          le nombre de postes, ni la probabilité d’embauche après MMI.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["UX/UI et produit", "Recherche utilisateur, prototypage, interface et conception de services."],
            ["Développement web", "Front-end, back-end, full-stack, mobile, intégration et accessibilité."],
            ["Communication numérique", "Contenus, rédaction web, communautés, acquisition et SEO."],
            ["Jeu et interaction", "Game design, level design, prototypes et expériences interactives."],
            ["Audiovisuel, 3D et motion", "Image, montage, son, animation, effets visuels et création 2D/3D."],
            ["Projet et produit", "Coordination, product ownership junior, stratégie et pilotage."],
          ].map(([title, detail]) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
            </article>
          ))}
        </div>
        <div className="mt-5 rounded-2xl bg-teal-50 p-4 text-sm leading-6 text-teal-950">
          <strong>Lecture retenue dans Explorer :</strong> chaque parcours MMI
          est présenté par compétences, fonctions junior possibles, familles de
          poursuites et points à renforcer. Les intitulés de métiers ne sont pas
          assimilés à des offres d’emploi ni à des insertions garanties.
        </div>
      </Section>

      <Section
        icon={<BookmarkPlus />}
        title="LinkedIn : un signal de trajectoire, jamais une statistique"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="text-xs font-bold uppercase tracking-[.12em] text-teal-700">
              MMI Vélizy
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              {linkedinSample.found} trouvés → {linkedinSample.reviewed} relus →{" "}
              {linkedinSample.count} exploitables
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {linkedinSample.warning}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {linkedinSample.schools.slice(0, 8).map((school) => (
                <span key={school} className="tag">
                  {school}
                </span>
              ))}
            </div>
          </article>

          <article className="rounded-2xl bg-slate-950 p-5 text-white">
            <p className="text-xs font-bold uppercase tracking-[.12em] text-teal-300">
              Échantillon France
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">
              {linkedinFranceSample.found} résultats ·{" "}
              {linkedinFranceSample.retained} retenus ·{" "}
              {linkedinFranceSample.excluded} exclus
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {linkedinFranceSample.warning}
            </p>
            <p className="mt-4 text-xs leading-5 text-slate-400">
              IUT recherchés : {linkedinFranceSample.sites.join(" · ")}
            </p>
          </article>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {linkedinFranceSample.codedHeadlines.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-3 rounded-2xl bg-slate-100 p-4"
            >
              <span className="text-sm leading-5 text-slate-700">{item.label}</span>
              <strong className="font-mono text-xl text-slate-950">{item.count}</strong>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-teal-200 bg-teal-50 p-4 text-sm leading-6 text-teal-950">
          <strong>Trajectoire dont la rubrique Formation a été relue :</strong>{" "}
          {linkedinFranceSample.verifiedRoute}. Cet exemple prouve qu’une
          trajectoire a existé, pas que l’admission est ouverte à tous les MMI.
        </div>
        <p className="mt-4 text-xs leading-5 text-slate-500">
          Les {linkedinFranceSample.excluded} exclusions regroupent les
          étudiants actuels, les enseignants sans ancienneté MMI démontrée et
          les résultats trop ambigus. Aucun nom n’est republié : seuls des
          parcours professionnels agrégés sont conservés.
        </p>
      </Section>

      <Section icon={<ShieldQuestion />} title="Comment LinkedIn est nettoyé">
        <div className="grid gap-3 sm:grid-cols-3">
          <Evidence
            color="teal"
            title="Trouvé"
            text="Un résultat apparaît pour une requête MMI. Cela ne prouve pas encore qu’il s’agit d’un ancien du site recherché."
          />
          <Evidence
            color="amber"
            title="Relu / retenu"
            text="Le résultat montre un lien MMI et un métier utile. Les étudiants actuels, enseignants et correspondances ambiguës sont séparés."
          />
          <Evidence
            color="emerald"
            title="Trajectoire exploitable"
            text="La rubrique Formation relie un IUT MMI, une formation suivante et une situation professionnelle, sans compléter les blancs."
          />
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          Une recherche par ville peut remonter un diplômé d’un autre IUT.
          Exemple contrôlé pendant cette mise à jour : un résultat de la requête
          Champs-sur-Marne était en réalité diplômé du DUT MMI de Limoges avant
          l’IMAC. L’origine est corrigée à partir de la rubrique Formation,
          jamais du seul classement du moteur.
        </p>
      </Section>

      <Section icon={<ShieldQuestion />} title="Reconnaissance des diplômes">
        <div className="grid gap-3 md:grid-cols-3">
          <Evidence
            color="teal"
            title="Master"
            text="Le mot master n’est retenu que pour un diplôme national de master (DNM) ou un diplôme conférant officiellement le grade de master."
          />
          <Evidence
            color="emerald"
            title="Ingénieur"
            text="Le titre d’ingénieur diplômé n’est utilisé que pour une formation accréditée par la CTI sur la période concernée."
          />
          <Evidence
            color="amber"
            title="Privé"
            text="RNCP, visa, grade et CTI sont des reconnaissances différentes. Une école privée n’est jamais ajoutée sur sa seule communication commerciale."
          />
        </div>
      </Section>

      <Section
        id="accessibilite"
        icon={<Accessibility />}
        title="Démarche d’accessibilité"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Evidence
            color="teal"
            title="Navigation au clavier"
            text="Lien d’évitement, ordre de tabulation naturel, commandes natives et indicateur de focus visible sur les liens, boutons et champs."
          />
          <Evidence
            color="emerald"
            title="Présentation adaptable"
            text="Taille du texte, fonds de lecture, contraste renforcé, liens soulignés, police espacée et réduction des animations."
          />
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-700">
          Ces aides complètent la structure sémantique du site et les réglages
          du navigateur. Elles ne constituent pas, à elles seules, une
          déclaration de conformité : une conformité RGAA complète exige un audit
          portant sur l’ensemble des critères et des pages.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
          <a
            href="https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-teal-800 hover:border-teal-400"
          >
            Critères officiels RGAA
          </a>
          <a
            href="https://www.w3.org/TR/WCAG22/"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-teal-800 hover:border-teal-400"
          >
            WCAG 2.2
          </a>
        </div>
      </Section>

      <Section icon={<LockKeyhole />} title="Confidentialité">
        <p className="text-sm leading-7 text-slate-700">
          Les favoris et la sélection du comparateur sont enregistrés uniquement
          dans le stockage local du navigateur. Aucun compte public n’est créé.
          Un signalement peut contenir un nom et un e-mail facultatifs : ils sont
          visibles uniquement dans l’administration et servent à traiter la
          demande. Ils ne sont jamais inclus dans le catalogue public.
        </p>
      </Section>

      <Section icon={<CircleAlert />} title="Informations encore manquantes">
        <ul className="grid gap-3 text-sm leading-6 text-slate-700 sm:grid-cols-2">
          <li className="rounded-xl border border-slate-200 p-4">
            Écoles réellement suivies par la première promotion BUT MMI Vélizy.
          </li>
          <li className="rounded-xl border border-slate-200 p-4">
            Taux d’admission spécifiques aux candidats MMI.
          </li>
          <li className="rounded-xl border border-slate-200 p-4">
            Entrée en deuxième année ingénieur après BUT3 pour plusieurs écoles.
          </li>
          <li className="rounded-xl border border-slate-200 p-4">
            Coûts 2026–2027, calendriers et capacités lorsque non publiés.
          </li>
          <li className="rounded-xl border border-slate-200 p-4">
            Situation à deux et trois ans des diplômés Vélizy.
          </li>
          <li className="rounded-xl border border-slate-200 p-4">
            Coordonnées exactes des parcours multi-campus Mon Master.
          </li>
        </ul>
      </Section>

      <Section
        icon={<ExternalLink />}
        title={`Registre des sources (${sources.length})`}
      >
        <div className="grid gap-2 md:grid-cols-2">
          {sources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 hover:border-teal-300 hover:text-teal-800"
            >
              <span>
                <strong className="block">{source.label}</strong>
                <span className="mt-1 block text-xs text-slate-500">
                  {source.level}
                </span>
              </span>
              <ExternalLink className="mt-0.5 shrink-0" size={15} />
            </a>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Dernière consolidation : 21 juillet 2026. Les données Mon Master
          portent sur la session 2025.
        </p>
      </Section>
    </main>
  );
}

function Section({
  id,
  icon,
  title,
  children,
}: {
  id?: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mt-8 scroll-mt-24 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm lg:p-8"
    >
      <div className="flex items-center gap-3 text-teal-700">
        {icon}
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          {title}
        </h2>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
function Evidence({
  color,
  title,
  text,
}: {
  color: "emerald" | "teal" | "amber" | "slate";
  title: string;
  text: string;
}) {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-950",
    teal: "bg-teal-50 text-teal-950",
    amber: "bg-amber-50 text-amber-950",
    slate: "bg-slate-100 text-slate-800",
  };
  return (
    <div className={`rounded-2xl p-4 ${colors[color]}`}>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 opacity-80">{text}</p>
    </div>
  );
}
function Row({ cells }: { cells: string[] }) {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      {cells.map((cell, index) => (
        <td key={index} className="py-4 pr-4 leading-6">
          {cell}
        </td>
      ))}
    </tr>
  );
}

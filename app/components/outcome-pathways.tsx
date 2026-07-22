import {
  ArrowRight,
  BriefcaseBusiness,
  CircleAlert,
  Compass,
  GraduationCap,
  Layers3,
  Sparkles,
} from "lucide-react";
import { outcomeFamilies } from "../lib/data";

const accents = [
  {
    number: "01",
    border: "border-violet-200",
    surface: "bg-violet-50/60",
    icon: "bg-violet-700 text-white",
    text: "text-violet-800",
  },
  {
    number: "02",
    border: "border-blue-200",
    surface: "bg-blue-50/60",
    icon: "bg-blue-700 text-white",
    text: "text-blue-800",
  },
  {
    number: "03",
    border: "border-amber-200",
    surface: "bg-amber-50/60",
    icon: "bg-amber-600 text-white",
    text: "text-amber-800",
  },
] as const;

const commonRoutes = [
  {
    title: "Travailler après le BUT",
    detail:
      "Le BUT est un diplôme professionnalisant de niveau 6. Les stages, l’alternance et la qualité du portfolio déterminent fortement le premier poste.",
  },
  {
    title: "Entrer en master public",
    detail:
      "La candidature se fait normalement après le BUT3. La mention du master, ses attendus et les licences conseillées doivent être vérifiés formation par formation.",
  },
  {
    title: "Rejoindre un cursus ingénieur CTI",
    detail:
      "Quelques écoles examinent les BUT2 ou BUT3 sur titre. La recevabilité de MMI, l’année d’entrée et le niveau scientifique ne sont jamais automatiques.",
  },
  {
    title: "Viser l’art, le design ou une spécialisation",
    detail:
      "Portfolio, concours ou entretien peuvent compter davantage que les notes. Pour le privé, contrôler le diplôme exact, son grade, son visa ou son RNCP.",
  },
] as const;

export function OutcomePathways() {
  return (
    <section
      className="mx-auto max-w-[1500px] px-4 py-10 lg:px-8 lg:py-14"
      aria-labelledby="outcome-pathways-title"
    >
      <div className="max-w-4xl">
        <p className="eyebrow">
          <Compass size={14} />
          Trois parcours, plusieurs portes de sortie
        </p>
        <h2
          id="outcome-pathways-title"
          className="mt-3 text-3xl font-semibold tracking-[-.035em] text-slate-950 sm:text-4xl"
        >
          Ce que chaque parcours ouvre réellement
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          Le parcours choisi donne une dominante, pas un métier automatique.
          Voici les compétences les plus visibles, les premiers postes possibles
          et les familles d’études cohérentes à vérifier dans le catalogue.
        </p>
      </div>

      <div className="mt-8 space-y-5">
        {outcomeFamilies.map((family, index) => {
          const accent = accents[index];
          return (
            <article
              key={family.path}
              className={`overflow-hidden rounded-[30px] border bg-white shadow-sm ${accent.border}`}
            >
              <div
                className={`grid gap-5 border-b p-5 sm:p-7 lg:grid-cols-[minmax(260px,.75fr)_1.25fr] lg:items-center ${accent.border} ${accent.surface}`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`grid size-12 shrink-0 place-items-center rounded-2xl font-mono text-sm font-bold ${accent.icon}`}
                    aria-hidden="true"
                  >
                    {accent.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold leading-tight tracking-tight text-slate-950 sm:text-2xl">
                      {family.path}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {family.short}
                    </p>
                  </div>
                </div>
                <div>
                  <p
                    className={`text-xs font-bold uppercase tracking-[.12em] ${accent.text}`}
                  >
                    Compétences mises en avant
                  </p>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-3">
                    {family.strengths.map((strength) => (
                      <li
                        key={strength}
                        className="flex gap-2 rounded-xl bg-white/80 px-3 py-2.5 text-sm font-medium leading-5 text-slate-700"
                      >
                        <Sparkles
                          size={15}
                          className={`mt-0.5 shrink-0 ${accent.text}`}
                          aria-hidden="true"
                        />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid gap-0 lg:grid-cols-2">
                <div className="border-b border-slate-200 p-5 sm:p-7 lg:border-b-0 lg:border-r">
                  <div className="flex items-center gap-2 text-slate-950">
                    <BriefcaseBusiness size={19} aria-hidden="true" />
                    <h4 className="font-bold">Premiers métiers possibles</h4>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Exemples de fonctions junior observées ou cohérentes avec
                    les compétences du BUT, sans garantie d’embauche.
                  </p>
                  <div className="mt-4 space-y-3">
                    {family.careerGroups.map((group) => (
                      <div key={group.label} className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                          {group.label}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {group.roles.map((role) => (
                            <span key={role} className="tag bg-white">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  <div className="flex items-center gap-2 text-slate-950">
                    <GraduationCap size={20} aria-hidden="true" />
                    <h4 className="font-bold">Poursuites d’études cohérentes</h4>
                  </div>
                  <div className="mt-4 space-y-3">
                    {family.studies.map((study) => (
                      <div
                        key={study.label}
                        className="grid gap-2 rounded-2xl border border-slate-200 p-4 sm:grid-cols-[150px_1fr]"
                      >
                        <strong className={`text-sm ${accent.text}`}>
                          {study.label}
                        </strong>
                        <p className="text-sm leading-6 text-slate-600">
                          {study.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3 rounded-2xl bg-slate-950 p-4 text-white">
                    <CircleAlert
                      size={19}
                      className="mt-0.5 shrink-0 text-teal-300"
                      aria-hidden="true"
                    />
                    <p className="text-sm leading-6 text-slate-300">
                      <strong className="text-white">À renforcer dans le dossier :</strong>{" "}
                      {family.watch}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10 rounded-[30px] border border-slate-200 bg-slate-950 p-5 text-white sm:p-7">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-teal-400/15 text-teal-300">
            <Layers3 size={20} aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-xl font-semibold">Les quatre routes communes après MMI</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Les passerelles restent possibles entre les dominantes : les
              projets, options, stages et compétences prouvées comptent autant
              que le nom du parcours.
            </p>
          </div>
        </div>
        <ol className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {commonRoutes.map((route, index) => (
            <li key={route.title} className="rounded-2xl bg-white/8 p-4">
              <div className="flex items-center gap-2 text-teal-300">
                <span className="font-mono text-xs font-bold">0{index + 1}</span>
                <ArrowRight size={15} aria-hidden="true" />
              </div>
              <h4 className="mt-3 font-semibold text-white">{route.title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {route.detail}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

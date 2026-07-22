"use client";

import france from "@svg-maps/france.departments";
import type { Program } from "../lib/data";

type MapShape = {
  viewBox: string;
  locations: { id: string; name: string; path: string }[];
};

export function FranceMap({
  programs,
  onSelect,
}: {
  programs: Program[];
  onSelect: (program: Program) => void;
}) {
  const shape = france as MapShape;
  const visible = programs.slice(0, 70);
  const x = (longitude: number) => ((longitude + 5.5) / 15.2) * 560 + 24;
  const y = (latitude: number) => ((51.3 - latitude) / 9.7) * 525 + 22;

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm lg:p-6">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="eyebrow">Localisation</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">
            Carte des campus
          </h2>
        </div>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
          {visible.length} formations visibles
        </span>
      </div>
      <svg
        viewBox={shape.viewBox}
        role="img"
        aria-label="Carte de France interactive avec les formations filtrées"
        className="mx-auto h-auto max-h-[560px] w-full"
      >
        <g aria-hidden="true">
          {shape.locations.map((location) => (
            <path
              key={location.id}
              d={location.path}
              className="france-map-region fill-slate-100 stroke-white stroke-[1.5] transition hover:fill-teal-50"
            >
              <title>{location.name}</title>
            </path>
          ))}
        </g>
        <g>
          {visible.map((program, index) => (
            <circle
              key={program.id}
              cx={x(program.longitude) + (index % 3) * 2.4}
              cy={y(program.latitude) + (index % 4) * 1.8}
              r={program.type === "ingenieur" ? 7 : 5.5}
              tabIndex={0}
              role="button"
              aria-label={`${program.institution}, ${program.title}`}
              onClick={() => onSelect(program)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ")
                  onSelect(program);
              }}
              className={`france-map-marker ${program.type === "ingenieur" ? "fill-indigo-600" : program.type === "autre" ? "fill-amber-500" : "fill-teal-600"} cursor-pointer stroke-white stroke-[2] opacity-90 transition hover:opacity-100 focus:outline-none`}
            >
              <title>
                {program.institution} — {program.title}
              </title>
            </circle>
          ))}
        </g>
      </svg>
      <div className="mt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-600">
        <span>
          <i className="france-map-legend mr-2 inline-block size-2.5 rounded-full bg-teal-600" />
          Master
        </span>
        <span>
          <i className="france-map-legend mr-2 inline-block size-2.5 rounded-full bg-indigo-600" />
          Ingénieur
        </span>
        <span>
          <i className="france-map-legend mr-2 inline-block size-2.5 rounded-full bg-amber-500" />
          Autre diplôme
        </span>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">
        Coordonnées centrées sur le campus ou la ville publiés. « Angoulême /
        Paris » est placé à Angoulême et doit être vérifié parcours par
        parcours.
      </p>
    </div>
  );
}

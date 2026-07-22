import {
  linkedinFranceSample,
  linkedinSample,
  nationalStats,
  outcomeFamilies,
  velizyStats,
} from "../../lib/data";
import { getAllSources, getPrograms } from "../../lib/content-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const [programs, sources] = await Promise.all([getPrograms(), getAllSources()]);
  return Response.json(
    {
      metadata: {
        product: "Cap MMI",
        author: "Bastian NOEL",
        consolidatedAt: "2026-07-21",
        disclaimer:
          "Outil indépendant. Vérifier chaque information auprès de l’établissement.",
      },
      programs,
      sources,
      statistics: { national: nationalStats, velizy: velizyStats },
      linkedin: { velizy: linkedinSample, france: linkedinFranceSample },
      outcomeFamilies,
    },
    { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } },
  );
}

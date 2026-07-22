import type { NextRequest } from "next/server";
import { addProposal } from "../../lib/content-store";
import { allowRequest, clientIp, jsonError, sameOrigin } from "../../lib/security";
import { contributionInputSchema } from "../../lib/validation";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return jsonError("Origine de la requête refusée.", 403);
  if (!allowRequest(`contribution:${clientIp(request)}`, 5, 60 * 60 * 1000))
    return jsonError("Trop de propositions. Réessayez dans une heure.", 429);

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 25_000) return jsonError("Requête trop volumineuse.", 413);

  try {
    const parsed = contributionInputSchema.safeParse(await request.json());
    if (!parsed.success)
      return jsonError(parsed.error.issues[0]?.message || "Formulaire invalide.", 400);
    if (parsed.data.website) return Response.json({ accepted: true }, { status: 202 });
    const proposal = await addProposal(parsed.data);
    return Response.json({ accepted: true, id: proposal.id }, { status: 201 });
  } catch {
    return jsonError("Le signalement n’a pas pu être enregistré.", 503);
  }
}

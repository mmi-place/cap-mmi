import type { NextRequest } from "next/server";
import { getPrograms, saveProgram } from "../../../lib/content-store";
import { isAdminRequest, jsonError, sameOrigin } from "../../../lib/security";
import { programSchema } from "../../../lib/validation";

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) return jsonError("Authentification requise.", 401);
  if (!sameOrigin(request)) return jsonError("Origine de la requête refusée.", 403);
  if (Number(request.headers.get("content-length") || 0) > 100_000)
    return jsonError("Requête trop volumineuse.", 413);
  try {
    const parsed = programSchema.safeParse(await request.json());
    if (!parsed.success)
      return jsonError(parsed.error.issues[0]?.message || "Fiche invalide.", 400);
    if ((await getPrograms()).some((program) => program.id === parsed.data.id))
      return jsonError("Cet identifiant existe déjà.", 409);
    return Response.json({ program: await saveProgram(parsed.data) }, { status: 201 });
  } catch {
    return jsonError("La fiche n’a pas pu être enregistrée.", 503);
  }
}

import type { NextRequest } from "next/server";
import { getPrograms, saveProgram } from "../../../../lib/content-store";
import { isAdminRequest, jsonError, sameOrigin } from "../../../../lib/security";
import { programSchema } from "../../../../lib/validation";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isAdminRequest(request)) return jsonError("Authentification requise.", 401);
  if (!sameOrigin(request)) return jsonError("Origine de la requête refusée.", 403);
  if (Number(request.headers.get("content-length") || 0) > 100_000)
    return jsonError("Requête trop volumineuse.", 413);
  try {
    const { id } = await params;
    const parsed = programSchema.safeParse(await request.json());
    if (!parsed.success || parsed.data.id !== id)
      return jsonError("La fiche ou son identifiant est invalide.", 400);
    if (!(await getPrograms()).some((program) => program.id === id))
      return jsonError("Formation introuvable.", 404);
    return Response.json({ program: await saveProgram(parsed.data) });
  } catch {
    return jsonError("La fiche n’a pas pu être enregistrée.", 503);
  }
}

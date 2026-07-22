import type { NextRequest } from "next/server";
import { setProposalStatus } from "../../../../lib/content-store";
import { isAdminRequest, jsonError, sameOrigin } from "../../../../lib/security";

const statuses = new Set(["pending", "approved", "rejected"]);

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isAdminRequest(request)) return jsonError("Authentification requise.", 401);
  if (!sameOrigin(request)) return jsonError("Origine de la requête refusée.", 403);
  try {
    const body = (await request.json()) as { status?: string };
    if (!body.status || !statuses.has(body.status)) return jsonError("Statut invalide.", 400);
    const proposal = await setProposalStatus(
      (await params).id,
      body.status as "pending" | "approved" | "rejected",
    );
    if (!proposal) return jsonError("Proposition introuvable.", 404);
    return Response.json({ proposal });
  } catch {
    return jsonError("La proposition n’a pas pu être modifiée.", 503);
  }
}

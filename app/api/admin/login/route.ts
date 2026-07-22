import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_COOKIE,
  adminCookieIsSecure,
  adminIsConfigured,
  allowRequest,
  clientIp,
  createAdminToken,
  jsonError,
  passwordMatches,
  sameOrigin,
} from "../../../lib/security";

export async function POST(request: NextRequest) {
  if (!adminIsConfigured()) return jsonError("Administration non configurée.", 503);
  if (!sameOrigin(request)) return jsonError("Origine de la requête refusée.", 403);
  if (!allowRequest(`admin-login:${clientIp(request)}`, 5, 15 * 60 * 1000))
    return jsonError("Trop de tentatives. Réessayez dans 15 minutes.", 429);
  if (Number(request.headers.get("content-length") || 0) > 5_000)
    return jsonError("Requête trop volumineuse.", 413);

  try {
    const body = (await request.json()) as { password?: unknown };
    if (typeof body.password !== "string" || !passwordMatches(body.password))
      return jsonError("Mot de passe incorrect.", 401);
    const response = NextResponse.json({ authenticated: true });
    response.cookies.set(ADMIN_COOKIE, createAdminToken(), {
      httpOnly: true,
      secure: adminCookieIsSecure(),
      sameSite: "strict",
      path: "/",
      maxAge: 8 * 60 * 60,
    });
    return response;
  } catch {
    return jsonError("Requête invalide.", 400);
  }
}

import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, adminCookieIsSecure, sameOrigin } from "../../../lib/security";

export function POST(request: NextRequest) {
  if (!sameOrigin(request))
    return NextResponse.json({ error: "Origine refusée." }, { status: 403 });
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: adminCookieIsSecure(),
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return response;
}

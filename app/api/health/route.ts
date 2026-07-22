export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    { status: "ok", service: "cap-mmi", timestamp: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store" } },
  );
}

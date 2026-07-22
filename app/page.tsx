import type { Metadata } from "next";
import { Explorer } from "./components/explorer";
import { getPrograms } from "./lib/content-store";
import { hasAdminSession } from "./lib/security";

export const metadata: Metadata = {
  title: "Explorer les poursuites après BUT MMI",
  description:
    "Masters publics, ingénieurs CTI et diplômes reconnus après un BUT MMI.",
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const [programs, isAdmin] = await Promise.all([
    getPrograms(),
    hasAdminSession(),
  ]);
  return <Explorer programs={programs} isAdmin={isAdmin} />;
}

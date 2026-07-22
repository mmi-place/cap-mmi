import type { Metadata } from "next";
import { Comparator } from "../components/comparator";
import { getPrograms } from "../lib/content-store";

export const metadata: Metadata = {
  title: "Comparateur",
  description: "Comparer exactement deux poursuites d’études après un BUT MMI.",
};

export const dynamic = "force-dynamic";

export default async function ComparatorPage() {
  return <Comparator programs={await getPrograms()} />;
}

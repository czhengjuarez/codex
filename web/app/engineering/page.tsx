import { getDoc } from "@/lib/docs";
import DocPage from "@/components/DocPage";
import { notFound } from "next/navigation";

export const metadata = { title: "Engineering Codex — [Your Org]" };

export default function EngineeringOverview() {
  const doc = getDoc("domains", "engineering-overview");
  if (!doc) notFound();
  return <DocPage doc={doc} />;
}

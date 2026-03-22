import { getDesignDoc } from "@/lib/docs";
import DocPage from "@/components/DocPage";
import { notFound } from "next/navigation";

export const metadata = { title: "Design Codex — [Your Org]" };

export default function DesignOverview() {
  const doc = getDesignDoc("overview");
  if (!doc) notFound();
  return <DocPage doc={doc} />;
}

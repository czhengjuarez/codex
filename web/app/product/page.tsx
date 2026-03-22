import { getProductDoc } from "@/lib/docs";
import DocPage from "@/components/DocPage";
import { notFound } from "next/navigation";

export const metadata = { title: "Product Codex — [Your Org]" };

export default function ProductOverview() {
  const doc = getProductDoc("overview");
  if (!doc) notFound();
  return <DocPage doc={doc} />;
}

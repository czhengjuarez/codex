import { getRfcDoc } from "@/lib/docs";
import DocPage from "@/components/DocPage";

export const metadata = { title: "RFC Template — Engineering Codex" };

export default function RfcPage() {
  return <DocPage doc={getRfcDoc()} />;
}

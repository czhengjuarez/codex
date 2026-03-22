import { getSkillsDoc } from "@/lib/docs";
import DocPage from "@/components/DocPage";

export const metadata = { title: "AI Skills Setup — Engineering Codex" };

export default function SkillsPage() {
  return <DocPage doc={getSkillsDoc()} />;
}

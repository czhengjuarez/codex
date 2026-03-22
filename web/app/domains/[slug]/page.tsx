import { notFound } from "next/navigation";
import { getAllDomains, getDoc } from "@/lib/docs";
import DocPage from "@/components/DocPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllDomains().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const doc = getDoc("domains", slug);
  if (!doc) return {};
  return { title: `${doc.title} — Engineering Codex` };
}

export default async function DomainPage({ params }: Props) {
  const { slug } = await params;
  const doc = getDoc("domains", slug);
  if (!doc) notFound();
  return <DocPage doc={doc} />;
}

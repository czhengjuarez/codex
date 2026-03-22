import { notFound } from "next/navigation";
import { getAllDesignDocs, getDesignDoc } from "@/lib/docs";
import DocPage from "@/components/DocPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllDesignDocs().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const doc = getDesignDoc(slug);
  if (!doc) return {};
  return { title: `${doc.title} — Design Codex` };
}

export default async function DesignPage({ params }: Props) {
  const { slug } = await params;
  const doc = getDesignDoc(slug);
  if (!doc) notFound();
  return <DocPage doc={doc} />;
}

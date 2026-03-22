import { notFound } from "next/navigation";
import { getAllProductDocs, getProductDoc } from "@/lib/docs";
import DocPage from "@/components/DocPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProductDocs().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const doc = getProductDoc(slug);
  if (!doc) return {};
  return { title: `${doc.title} — Product Codex` };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const doc = getProductDoc(slug);
  if (!doc) notFound();
  return <DocPage doc={doc} />;
}

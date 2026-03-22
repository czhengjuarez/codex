import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { Doc } from "@/lib/docs";

interface Props {
  doc: Doc;
}

const articleClass = `
  prose prose-gray max-w-none
  prose-headings:font-semibold
  prose-h1:text-2xl prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-3 prose-h1:mb-6
  prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
  prose-h3:text-base prose-h3:font-semibold prose-h3:text-gray-800 prose-h3:mt-5 prose-h3:mb-2 prose-h3:pt-0
  prose-p:text-gray-700 prose-p:leading-relaxed
  prose-code:text-brand-600 dark:text-brand-dark prose-code:bg-brand-50 dark:bg-brand-950/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
  prose-pre:not-prose prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
  prose-strong:text-gray-900
  prose-a:text-brand-600 dark:text-brand-dark prose-a:no-underline hover:prose-a:underline
  prose-ul:text-gray-700 prose-li:my-1
  prose-blockquote:border-l-brand-500 prose-blockquote:bg-brand-50/60 dark:bg-brand-950/20 prose-blockquote:py-1 prose-blockquote:not-italic
  prose-table:text-sm
  prose-th:bg-gray-50 prose-th:font-semibold prose-th:text-gray-700
  prose-td:text-gray-700 prose-td:align-top
  prose-hr:border-gray-100 prose-hr:my-4
`.trim();

export default function DocPage({ doc }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1.5">
        <a href="/" className="hover:text-brand-600 dark:text-brand-dark transition-colors">Home</a>
        <span>/</span>
        <span className="capitalize">{doc.section}</span>
        <span>/</span>
        <span className="text-gray-600">{doc.title}</span>
      </nav>

      {/* Rule count badge for domains */}
      {doc.ruleCount !== undefined && (
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-dark rounded-full font-medium">
            {doc.ruleCount} rules
          </span>
        </div>
      )}

      <article className={articleClass}>
        <MDXRemote
          source={doc.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              // rehype plugin types
              rehypePlugins: [rehypeHighlight, rehypeSlug],
            },
          }}
        />
      </article>
    </div>
  );
}

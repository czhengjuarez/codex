import Link from "next/link";

export const metadata = { title: "What is a Codex? — [Your Org]" };

export default function CodexTopLevel() {
  return (
    <div className="max-w-2xl mx-auto px-8 py-10">

      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 dark:text-gray-500 mb-6 flex items-center gap-1.5">
        <span className="text-gray-400 hover:text-brand-600 dark:hover:text-brand-dark transition-colors">Home</span>
        <span>/</span>
        <span className="text-gray-600 dark:text-gray-300">What is a Codex?</span>
      </nav>

      {/* LLM disclosure */}
      <div className="mb-8 p-4 border border-brand-200 dark:border-brand-900 rounded-lg bg-brand-50/40 dark:bg-brand-950/20 text-sm text-gray-600 dark:text-gray-400">
        <p className="mb-2">
          <strong className="text-gray-800 dark:text-gray-200">A note on how this was made:</strong>{" "}
          This Codex was created by humans, but with the aid of an LLM. Where you see structured sections and suggested guidance — that&rsquo;s the starting point, not the final word.
        </p>
        <p>
          <strong className="text-brand-600 dark:text-brand-dark">Important:</strong>{" "}
          Apply judgment. Was that content actually useful, or did the model fill in a blank because the template had one? The same standard applies to everything we write here. If a section doesn&rsquo;t serve the user, it shouldn&rsquo;t exist.
        </p>
      </div>

      {/* Intro */}
      <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">
        A <strong className="text-gray-900 dark:text-gray-100">Codex</strong> is an authoritative guide—a set of principles and practices that define how we work.
      </p>
      <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-10">
        Unlike policies that tell you what you <em>can&rsquo;t</em> do, a Codex tells you what you <em>should</em> do. It&rsquo;s
        opinionated. It&rsquo;s designed to help you make better decisions faster by encoding the collective wisdom of the organization.
      </p>

      {/* Why We Have a Codex */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-10 mb-4">Why We Have a Codex</h2>
      <ol className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
        {[
          ["Inherited Resilience", "New engineers inherit battle-tested patterns, not tribal knowledge."],
          ["Unified Incident Response", "When things break at 3am, everyone speaks the same language."],
          ["Velocity", "Less time debating \u201chow,\u201d more time building \u201cwhat.\u201d"],
          ["Guardrails, Not Gates", "Good defaults enforced by tooling beat documentation nobody reads."],
          ["Default to Boring", "Proven patterns over shiny new things. Innovation where it matters."],
          ["Trust", "When you follow the Codex, others can trust your work without reviewing every line."],
        ].map(([title, desc], i) => (
          <li key={i} className="flex gap-3">
            <span className="font-semibold text-gray-900 dark:text-gray-100 shrink-0">{i + 1}.</span>
            <span><strong className="text-gray-900 dark:text-gray-100">{title}</strong> — {desc}</span>
          </li>
        ))}
      </ol>

      {/* How We Enforce It */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-10 mb-4">How We Enforce It</h2>
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">The Codex is enforced through three principles:</p>
      <ol className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
        {[
          ["Code over Policy", "Where possible, we encode rules in tooling, linters, and templates rather than documents."],
          ["Path of Least Resistance", "The right way should be the easy way. If doing the right thing is hard, fix the tooling."],
          ["Baked-in Best Practices", "Starter templates, shared libraries, and CI/CD pipelines that do the right thing by default."],
        ].map(([title, desc], i) => (
          <li key={i} className="flex gap-3">
            <span className="font-semibold text-gray-900 dark:text-gray-100 shrink-0">{i + 1}.</span>
            <span><strong className="text-gray-900 dark:text-gray-100">{title}</strong> — {desc}</span>
          </li>
        ))}
      </ol>

      {/* The Three Codexes — compact bullet list */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-10 mb-4">The Three Codexes</h2>
      <ul className="space-y-2 text-sm">
        <li className="flex gap-2 text-gray-700 dark:text-gray-300">
          <span className="text-brand-600 dark:text-brand-dark mt-0.5">•</span>
          <span>
            <Link href="/engineering" className="text-brand-600 dark:text-brand-dark hover:underline font-medium">Engineering Codex</Link>
            {" "}— How we build software. Architecture, tooling, and technical standards.
          </span>
        </li>
        <li className="flex gap-2 text-gray-700 dark:text-gray-300">
          <span className="text-brand-600 dark:text-brand-dark mt-0.5">•</span>
          <span>
            <Link href="/product" className="text-brand-600 dark:text-brand-dark hover:underline font-medium">Product Codex</Link>
            {" "}— How we ship products. Customer focus, scoping, and launch criteria.
          </span>
        </li>
        <li className="flex gap-2 text-gray-700 dark:text-gray-300">
          <span className="text-brand-600 dark:text-brand-dark mt-0.5">•</span>
          <span>
            <Link href="/design" className="text-brand-600 dark:text-brand-dark hover:underline font-medium">Design Codex</Link>
            {" "}— How we design products. Principles, component standards, and accessibility.
          </span>
        </li>
      </ul>

      {/* Living Document */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-10 mb-4">Living Document</h2>
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
        The Codex evolves. When we learn something new, we update it. When a rule no longer serves us, we change it.
        The goal is not to be right forever—it&rsquo;s to be right <em>now</em>.
      </p>
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        To propose changes, submit an RFC. The Codex maintainers review and approve updates.
      </p>

      {/* Divider + next */}
      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 flex justify-end">
        <Link
          href="/engineering"
          className="flex items-center gap-2 px-4 py-3 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-brand-300 dark:hover:border-brand-700 transition-colors text-sm text-right"
        >
          <div>
            <div className="text-xs text-gray-400 dark:text-gray-500">Next</div>
            <div className="font-medium text-gray-900 dark:text-gray-100">Engineering Codex</div>
          </div>
          <span className="text-brand-600 dark:text-brand-dark text-lg">›</span>
        </Link>
      </div>

    </div>
  );
}

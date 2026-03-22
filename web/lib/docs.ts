import { domainFiles, governanceFiles, productFiles, designFiles, skillsFile, rfcFile } from './content'

export interface DocMeta {
  slug: string
  title: string
  section: 'domains' | 'governance' | 'product' | 'design' | 'other'
  ruleCount?: number
}

export interface Doc extends DocMeta {
  content: string
}

function countRules(content: string): number {
  return (content.match(/^### [A-Z]+-\d+:/gm) || []).length
}

// Known acronyms that should render fully uppercased
const ACRONYMS = new Set(['rfc', 'api', 'ai', 'ml', 'ci', 'cd', 'iam', 'sql', 'tls', 'mfa', 'pii', 'slo', 'sre'])

function titleFromSlug(slug: string): string {
  return slug
    .split('-')
    .map((w) => ACRONYMS.has(w.toLowerCase())
      ? w.toUpperCase()
      : w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

// Sanitize markdown for MDX: strip HTML comments (not supported by MDX parser)
const HTML_COMMENT_RE = /<!--([\s\S]*?)-->/g
export function sanitizeForMdx(content: string): string {
  return content.replace(HTML_COMMENT_RE, (_, inner) => {
    const trimmed = inner.trim()
    if (trimmed.length < 200 && !trimmed.includes('\n')) {
      return `*${trimmed}*`
    }
    return ''
  })
}

export function getAllDomains(): DocMeta[] {
  return Object.entries(domainFiles).map(([slug, content]) => ({
    slug,
    title: titleFromSlug(slug),
    section: 'domains' as const,
    ruleCount: countRules(content),
  }))
}

export function getAllGovernance(): DocMeta[] {
  return Object.entries(governanceFiles).map(([slug]) => ({
    slug,
    title: titleFromSlug(slug),
    section: 'governance' as const,
  }))
}

export function getDoc(section: 'domains' | 'governance', slug: string): Doc | null {
  const files = section === 'domains' ? domainFiles : governanceFiles
  const raw = files[slug]
  if (!raw) return null
  return {
    slug,
    title: titleFromSlug(slug),
    section,
    content: sanitizeForMdx(raw),
    ruleCount: section === 'domains' ? countRules(raw) : undefined,
  }
}

export function getSkillsDoc(): Doc {
  return {
    slug: 'opencode-skill',
    title: 'AI Skills Setup',
    section: 'other',
    content: sanitizeForMdx(skillsFile),
  }
}

export function getRfcDoc(): Doc {
  return {
    slug: 'rfc-template',
    title: 'RFC Template',
    section: 'other',
    content: sanitizeForMdx(rfcFile),
  }
}

export function getAllProductDocs(): DocMeta[] {
  return Object.entries(productFiles).map(([slug]) => ({
    slug,
    title: titleFromSlug(slug),
    section: 'product' as const,
  }))
}

export function getProductDoc(slug: string): Doc | null {
  const raw = productFiles[slug]
  if (!raw) return null
  return {
    slug,
    title: titleFromSlug(slug),
    section: 'product',
    content: sanitizeForMdx(raw),
  }
}

export function getAllDesignDocs(): DocMeta[] {
  return Object.entries(designFiles).map(([slug]) => ({
    slug,
    title: titleFromSlug(slug),
    section: 'design' as const,
  }))
}

export function getDesignDoc(slug: string): Doc | null {
  const raw = designFiles[slug]
  if (!raw) return null
  return {
    slug,
    title: titleFromSlug(slug),
    section: 'design',
    content: sanitizeForMdx(raw),
  }
}

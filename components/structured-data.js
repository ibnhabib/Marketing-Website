import Head from 'next/head'

import { site } from '@/lib/_site'

export const absoluteUrl = (path = '/') => {
  const clean = (path || '/').split(/[?#]/)[0]
  return clean === '/' ? `${site.url}/` : `${site.url}${clean}`
}

// Strip markdown/HTML so FAQ answers are plain text in JSON-LD
const toPlainText = (markdown = '') =>
  markdown
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`#>]+/g, '')
    .replace(/\s+/g, ' ')
    .trim()

export function JsonLd({ id, data }) {
  if (!data) return null

  return (
    <Head>
      <script
        key={`jsonld-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Head>
  )
}

// Sitewide: who we are, where we are, how to reach us
export function OrganizationSchema() {
  const orgId = `${site.url}/#organization`

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'MovingCompany'],
        '@id': orgId,
        name: site.name,
        alternateName: site.alternateName,
        url: `${site.url}/`,
        logo: site.logo,
        image: site.logo,
        email: site.email,
        telephone: site.phone,
        priceRange: '$$',
        areaServed: site.areaServed,
        address: {
          '@type': 'PostalAddress',
          ...site.locations[0]
        },
        contactPoint: site.phones.map((telephone) => ({
          '@type': 'ContactPoint',
          telephone,
          contactType: 'customer service',
          areaServed: ['AE', 'PK'],
          availableLanguage: ['English', 'Urdu', 'Hindi']
        })),
        sameAs: Object.values(site.social),
        department: site.locations.map(({ name, ...address }) => ({
          '@type': 'MovingCompany',
          name,
          telephone: site.phone,
          address: { '@type': 'PostalAddress', ...address }
        }))
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: `${site.url}/`,
        name: site.name,
        publisher: { '@id': orgId }
      }
    ]
  }

  return <JsonLd id="organization" data={data} />
}

export function BreadcrumbSchema({ items }) {
  if (!items || items.length < 2) return null

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  }

  return <JsonLd id="breadcrumb" data={data} />
}

// Builds FAQPage schema from any Faq columns placed on the page in Hygraph
export function FaqSchema({ blocks }) {
  const faqs = (blocks || [])
    .flatMap((block) => block?.columns || [])
    .filter(
      (column) =>
        column?.__typename === 'Faq' && column.title && column.content?.markdown
    )

  if (!faqs.length) return null

  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: toPlainText(faq.content.markdown)
      }
    }))
  }

  return <JsonLd id="faq" data={data} />
}

export function BlogPostingSchema({ post, path }) {
  if (!post) return null

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seo?.description || post.excerpt,
    ...(post.coverImage?.url && { image: [post.coverImage.url] }),
    ...(post.published && {
      datePublished: post.published,
      dateModified: post.updatedAt || post.published
    }),
    author: (post.authors?.length ? post.authors : [{ name: site.name }]).map(
      (author) => ({ '@type': 'Person', name: author.name })
    ),
    publisher: { '@id': `${site.url}/#organization` },
    mainEntityOfPage: absoluteUrl(path)
  }

  return <JsonLd id="blogposting" data={data} />
}

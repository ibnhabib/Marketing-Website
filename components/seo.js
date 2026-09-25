import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

import { absoluteUrl } from '@/components/structured-data'

export default function SEO({
  id,
  image,
  keywords,
  noIndex: noindex = false,
  ...props
}) {
  const router = useRouter()
  const canonical = absoluteUrl(router.asPath)

  const SEO = {
    ...(keywords && { keywords: keywords.toString() }),
    noindex,
    canonical,
    openGraph: {
      ...(image && {
        images: [
          {
            alt: props.title,
            ...image
          }
        ]
      }),
      url: canonical,
      ...props
    },
    ...props
  }

  return <NextSeo {...SEO} />
}

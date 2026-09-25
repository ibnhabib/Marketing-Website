import { ChakraProvider } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import TagManager from 'react-gtm-module'

import { SiteLayout } from '@/layout'
import { OrganizationSchema, absoluteUrl } from '@/components/structured-data'
import { defaultSEO } from '../next-seo.config'
import { theme } from '../styles/theme'
import '../styles/css/typography.min.css'
import '../styles/css/global.css'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const getLayout =
    Component.getLayout || ((page) => <SiteLayout>{page}</SiteLayout>)

  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-N3CK67D' })
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo {...defaultSEO} canonical={absoluteUrl(router.asPath)} />
      <OrganizationSchema />
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  )
}

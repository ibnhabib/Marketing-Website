import { ChakraProvider } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'
import { SiteLayout } from '@/layout'
import { defaultSEO } from '../next-seo.config'
import { theme } from '../styles/theme'
import '../styles/css/global.css'

import { useEffect } from 'react'
import TagManager from 'react-gtm-module'




export default function App({ Component, pageProps }) {
  const getLayout =
    Component.getLayout || ((page) => <SiteLayout>{page}</SiteLayout>)
    
    useEffect(() => {
      TagManager.initialize({ gtmId: "GTM-N3CK67D" })
    }, [])

  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo {...defaultSEO} />
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  )
}

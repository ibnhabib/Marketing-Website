import { Box, Flex, Link, Text } from '@chakra-ui/react'

import { PhoneIcon, WhatsAppIcon } from '@/icons'
import { site, trackLead, whatsappUrl } from '@/lib/_site'

// Always-visible lead capture:
// - mobile: sticky bottom bar with Call + WhatsApp
// - desktop: floating WhatsApp button bottom-right
export default function ContactBar() {
  return (
    <>
      <Flex
        display={{ base: 'flex', md: 'none' }}
        pos="fixed"
        bottom="0"
        left="0"
        right="0"
        zIndex="sticky"
        boxShadow="0 -2px 10px rgba(0,0,0,0.12)"
        sx={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        bg="white"
      >
        <Link
          href={`tel:${site.phone}`}
          onClick={() => trackLead('call', 'mobile_bar')}
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          py={3}
          bg="indigo.600"
          color="white"
          fontWeight="semibold"
          _hover={{ textDecoration: 'none', bg: 'indigo.700' }}
        >
          <Box as={PhoneIcon} w={5} h={5} mr={2} aria-hidden="true" />
          Call Now
        </Link>
        <Link
          href={whatsappUrl()}
          isExternal
          onClick={() => trackLead('whatsapp', 'mobile_bar')}
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          py={3}
          bg="#25D366"
          color="white"
          fontWeight="semibold"
          _hover={{ textDecoration: 'none', bg: '#1ebe5a' }}
        >
          <Box as={WhatsAppIcon} w={5} h={5} mr={2} aria-hidden="true" />
          WhatsApp Quote
        </Link>
      </Flex>

      <Link
        href={whatsappUrl()}
        isExternal
        onClick={() => trackLead('whatsapp', 'floating_button')}
        display={{ base: 'none', md: 'flex' }}
        pos="fixed"
        right={6}
        bottom={6}
        zIndex="sticky"
        alignItems="center"
        bg="#25D366"
        color="white"
        borderRadius="full"
        boxShadow="lg"
        px={5}
        py={3}
        fontWeight="semibold"
        _hover={{ textDecoration: 'none', bg: '#1ebe5a', boxShadow: 'xl' }}
        aria-label="Get a free cargo quote on WhatsApp"
      >
        <Box as={WhatsAppIcon} w={6} h={6} mr={2} aria-hidden="true" />
        <Text as="span">Free Quote on WhatsApp</Text>
      </Link>

      {/* spacer so the mobile bar never covers the footer */}
      <Box
        display={{ base: 'block', md: 'none' }}
        h="56px"
        aria-hidden="true"
      />
    </>
  )
}

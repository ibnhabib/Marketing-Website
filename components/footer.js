import {
  VisuallyHidden,
  Link as ChakraLink,
  Text,
  Stack,
  Box,
  Grid,
  Heading
} from '@chakra-ui/react'
import Link from 'next/link'

import { FacebookIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from '@/icons'
import { site, trackLead, whatsappUrl } from '@/lib/_site'

const formatPhone = (phone) => phone.replace(/^\+971(\d{2})(\d{7})$/, '0$1-$2')

function GridColumnHeading({ children }) {
  return (
    <Heading
      as="h3"
      fontSize="sm"
      fontWeight="semibold"
      color="gray.400"
      letterSpacing="wider"
      textTransform="uppercase"
    >
      {children}
    </Heading>
  )
}

function GridColumn({ links, title }) {
  return (
    <div>
      <GridColumnHeading>{title}</GridColumnHeading>

      <Stack as="ul" mt={4} spacing={4}>
        {links.map((link) => (
          <li key={link.id}>
            <Link href={link.slug === 'home' ? '/' : `/${link.slug}`} passHref>
              <ChakraLink
                color="gray.300"
                _hover={{
                  color: 'white'
                }}
              >
                {link.navigationLabel ||
                  link.slug.charAt(0).toUpperCase() + link.slug.slice(1)}
              </ChakraLink>
            </Link>
          </li>
        ))}
      </Stack>
    </div>
  )
}

function SocialMediaLink({ href, title, icon }) {
  return (
    <ChakraLink
      href={href}
      isExternal
      color="gray.400"
      _hover={{
        color: 'gray.300'
      }}
    >
      <VisuallyHidden>{title}</VisuallyHidden>
      <Box as={icon} w={6} h={6} />
    </ChakraLink>
  )
}

export default function Footer({ primaryLinks, secondaryLinks }) {
  return (
    <Box as="footer" bg="gray.800" aria-labelledby="footerHeading">
      <VisuallyHidden as="h2" id="footerHeading">
        Footer
      </VisuallyHidden>

      <Box maxW="7xl" mx="auto" py={{ base: 12, lg: 16 }} px={[4, 6, null, 8]}>
        <Box
          pb={8}
          display={{ xl: 'grid' }}
          gridTemplateColumns={{ xl: 'repeat(3, 1fr)' }}
          gridGap={{ xl: 8 }}
        >
          <Grid
            gridTemplateColumns="repeat(2, 1fr)"
            gridGap={8}
            gridColumn={{ xl: 'span 2 / span 2' }}
          >
            <GridColumn
              links={primaryLinks.length && primaryLinks}
              title="Company"
            />

            <GridColumn
              links={secondaryLinks.length && secondaryLinks}
              title="Cargo Services"
            />
          </Grid>

          <Box mt={{ base: 12, xl: 0 }}>
            <GridColumnHeading>Contact Us</GridColumnHeading>

            <Stack
              as="address"
              mt={4}
              spacing={3}
              fontStyle="normal"
              color="gray.300"
            >
              {site.locations.map((location) => (
                <Text key={location.name}>
                  {location.streetAddress}, {location.addressLocality}, UAE
                </Text>
              ))}
              {site.phones.slice(0, 2).map((phone) => (
                <ChakraLink
                  key={phone}
                  href={`tel:${phone}`}
                  onClick={() => trackLead('call', 'footer')}
                  _hover={{ color: 'white' }}
                >
                  {formatPhone(phone)}
                </ChakraLink>
              ))}
              <ChakraLink
                href={whatsappUrl()}
                isExternal
                onClick={() => trackLead('whatsapp', 'footer')}
                _hover={{ color: 'white' }}
              >
                WhatsApp: {formatPhone(site.phone)}
              </ChakraLink>
              <ChakraLink
                href={`mailto:${site.email}`}
                onClick={() => trackLead('email', 'footer')}
                _hover={{ color: 'white' }}
              >
                {site.email}
              </ChakraLink>
            </Stack>
          </Box>
        </Box>

        <Box
          mt={7}
          pt={8}
          borderTopWidth="1px"
          borderColor="gray.700"
          display={{ md: 'flex' }}
          alignItems={{ md: 'center' }}
          justifyContent={{ md: 'space-between' }}
        >
          <Stack direction="row" display="flex" spacing={6} order={{ md: 2 }}>
            <SocialMediaLink
              title="Facebook"
              icon={FacebookIcon}
              href={site.social.facebook}
            />
            <SocialMediaLink
              title="Instagram"
              icon={InstagramIcon}
              href={site.social.instagram}
            />
            <SocialMediaLink
              title="LinkedIn"
              icon={LinkedInIcon}
              href={site.social.linkedin}
            />
            <SocialMediaLink
              title="Twitter"
              icon={TwitterIcon}
              href={site.social.twitter}
            />
          </Stack>

          <Text
            mt={[8, null, 0]}
            fontSize="md"
            color="gray.400"
            order={{ md: 1 }}
          >
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

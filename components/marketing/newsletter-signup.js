import { useState } from 'react'
import {
  Box,
  Heading,
  Text,
  FormLabel,
  VisuallyHidden,
  Button,
  Input
} from '@chakra-ui/react'

export default function NewsletterSignup({ ctaLabel, subtitle, title }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (!response.ok) throw new Error('Subscribe request failed')

      setStatus('success')
      setEmail('')
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <Box bg="white">
      <Box maxW="7xl" mx="auto" py={{ base: 12, lg: 16 }} px={[4, 6, null, 8]}>
        <Heading
          as="h2"
          fontSize={['3xl', '4xl']}
          lineHeight="shorter"
          fontWeight="extrabold"
          display={['inline', 'block']}
          letterSpacing="tight"
          color="gray.900"
        >
          {title}
        </Heading>
        <Text
          fontSize={['3xl', '4xl']}
          lineHeight="shorter"
          fontWeight="extrabold"
          display={['inline', 'block']}
          letterSpacing="tight"
          color="indigo.600"
        >
          {subtitle}
        </Text>
        <Box as="form" onSubmit={handleSubmit} mt={8} display={{ sm: 'flex' }}>
          <VisuallyHidden as={FormLabel} htmlFor="emailAddress">
            Email address
          </VisuallyHidden>
          <Input
            id="emailAddress"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            width="full"
            height="full"
            maxW={{ sm: 'xs' }}
            px={5}
            py={3}
            borderColor="gray.300"
            _placeholder={{
              color: 'gray.500'
            }}
          />
          <Box
            mt={[3, 0]}
            ml={{ sm: 3 }}
            flexShrink={{ sm: 0 }}
            borderRadius="md"
            boxShadow="md"
          >
            <Button
              type="submit"
              isLoading={status === 'loading'}
              width="full"
              height="full"
              px={5}
              py={3}
              bg="indigo.600"
              color="white"
              _hover={{
                bg: 'indigo.700'
              }}
            >
              {ctaLabel || 'Submit'}
            </Button>
          </Box>
        </Box>
        {status === 'success' && (
          <Text mt={3} color="green.600" role="status">
            Thanks for subscribing!
          </Text>
        )}
        {status === 'error' && (
          <Text mt={3} color="red.600" role="alert">
            Something went wrong. Please try again.
          </Text>
        )}
      </Box>
    </Box>
  )
}

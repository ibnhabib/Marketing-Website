import { hygraphMutationClient } from '@/lib/_client'
import { createSubscriberMutation } from '@/lib/_mutations'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const email = req.body?.email?.trim()

  if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: 'Enter a valid email address' })
  }

  const client = hygraphMutationClient()

  try {
    await client.request(createSubscriberMutation, { email })
    return res.status(200).json({ message: 'Subscribed' })
  } catch (error) {
    const alreadyExists = error?.response?.errors?.some((graphqlError) =>
      graphqlError.message?.toLowerCase().includes('unique')
    )

    if (alreadyExists) {
      return res.status(200).json({ message: 'Subscribed' })
    }

    console.error('Failed to create subscriber', error)
    return res.status(502).json({ message: 'Something went wrong' })
  }
}

import { gql } from 'graphql-request'

const createSubscriberMutation = gql`
  mutation CreateSubscriberMutation($email: String!) {
    createSubscriber(data: { email: $email }) {
      id
    }
    publishSubscriber(where: { email: $email }, to: PUBLISHED) {
      id
    }
  }
`

export { createSubscriberMutation }


import { gql } from '@apollo/client';

export const gqlMutation = {
  samples: {
    key: 'samples',
    operation: gql`
      mutation Mutation {
        samples
      }
    `
  },
}

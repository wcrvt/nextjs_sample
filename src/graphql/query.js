
import { gql } from '@apollo/client';

export const gqlQuery = {

  samples: {
    key: 'samples',
    operation: gql`
      query Query {
        samples
      }
    `
  },

};
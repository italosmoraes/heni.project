import { gql } from '@apollo/client'

export const PRINTS_QUERY = gql`
  query Prints($input: PrintsInput!) {
    prints(input: $input) {
      info {
        totalrecords
        totalrecordsperquery
        pages
        page
        next
      }
      records
      aggregations
    }
  }
`

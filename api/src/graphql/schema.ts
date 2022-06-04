import { buildSchema } from 'graphql'

export const schema = buildSchema(`
    scalar Object
    
    type Query {
        prints: PrintsResponse
    }
    type PrintsResponse {
        info: PrintsResponseInfo
        records: [Object]
        aggregations: [Object]
    }
    type PrintsResponseInfo {
        totalrecordsperquery: Int!
        totalrecords: Int!
        pages: Int!
        page: Int
        next: String
    }
`)

// TODO make an index of schemas, importing each from their respective modules

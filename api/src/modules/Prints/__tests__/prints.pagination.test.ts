import { ApolloServer } from 'apollo-server-express'
import { schema } from '../../../graphql/schema'
import { PrintsModule } from '../Prints'
import { PRINTS_QUERY } from './helpers/queries'

const testResolvers = {
  Query: {
    prints: (_, input) => new PrintsModule().resolvers.prints(input)
  }
}

describe('prints pagination', () => {
  let testServer

  beforeAll(async () => {
    testServer = new ApolloServer({
      typeDefs: schema,
      resolvers: testResolvers
    })
  })

  it('returns paginated data with correct limit and page', async () => {
    const result = await testServer.executeOperation({
      query: PRINTS_QUERY,
      variables: {
        input: {
          limit: 10,
          page: null
        }
      }
    })

    expect(result.data.prints.info.page).toBe(1)
    expect(result.data.prints.info.pages).toBeTruthy()
    expect(result.data.prints.records.length).toBe(10)

    const resultB = await testServer.executeOperation({
      query: PRINTS_QUERY,
      variables: {
        input: {
          limit: 5,
          page: 2
        }
      }
    })

    expect(resultB.data.prints.info.page).toBe(2)
    expect(resultB.data.prints.info.pages).toBeTruthy()
    expect(resultB.data.prints.records.length).toBe(5)
  })
})

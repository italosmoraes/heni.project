import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { schema } from './graphql/schema'
import { PrintsModule } from './modules/Prints/Prints'

const port = 3001
const server = express()

server.use(
  '/graphql',
  graphqlHTTP((request, response, params) => ({
    schema,
    rootValue: PrintsModule.resolver,
    graphiql: true,
    context: {
      request,
      response
    }
  }))
)

server.listen(port, () => {
  console.log(`API listening on port ${port} `)
})

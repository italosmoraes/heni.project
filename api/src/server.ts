import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { schema } from './graphql/schema'
import { PrintsModule } from './modules/Prints/Prints'
import cors from 'cors'

const port = process.env.PORT || 3001
const server = express()

server.use(cors())

server.use(
  '/graphql',
  graphqlHTTP((request, response, params) => ({
    schema,
    rootValue: new PrintsModule().resolvers,
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

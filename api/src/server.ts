import express, { NextFunction, Request, Response } from 'express'
import { graphqlHTTP } from 'express-graphql'
import bodyParser from 'body-parser'
import { router as routes } from './routes'
import { schema } from './graphql/schema'
import { PrintsModule } from './modules/Prints/Prints'

const port = 3001
const server = express()

// parse application/json
server.use(bodyParser.json())

server.use(function (req: Request, res: Response, next: NextFunction) {
  //   res.setHeader('Content-Type', 'text/plain')
  //   res.write('Request body:\n')
  //   res.send(JSON.stringify(req.body, null, 2))
  next()
})

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

server.use('/', routes)

server.listen(port, () => {
  console.log(`API listening on port ${port} `)
})

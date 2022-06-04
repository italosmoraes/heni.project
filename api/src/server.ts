import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import { router as routes } from './routes'

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

server.use('/', routes)

server.listen(port, () => {
  console.log(`API listening on port ${port} `)
})

import { Request, Response } from 'express'

const PRINTS_API = 'https://api.harvardartmuseums.org'

export const PrintsHandler = (req: Request, res: Response) => {
  res.send('PrintsHandler...')
}

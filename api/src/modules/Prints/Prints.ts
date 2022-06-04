import { Request, Response } from 'express'
import axios from 'axios'
import { API_KEY, PRINTS_API } from '../../../config/constants'
import { ResourceTypes } from './types/ResourceTypes'

/**
 *  Resolves the feed of all public items classified as “Prints”, from harvardartmuseums api
 */
export class PrintsModule {
  static handler = async (req: Request, res: Response) => {
    try {
      const limit = 3 // todo get from req params
      const cursor = 0 // todo get from req params

      const query = `size=${limit}&page${cursor}&apikey=${API_KEY}`

      const response = await axios.get(`${PRINTS_API}/${ResourceTypes.OBJECT}?${query}`)

      // TODO parse the 'next' from response to get the next page

      res.send(response.data)
    } catch (err) {
      console.log('Error:', err)
      res.statusCode = 500
      res.send(JSON.stringify(err, null, 2))
    }
  }

  static resolver = {
    prints: async ({}, context) => {
      return PrintsModule.handler(context.request, context.response)
    }
  }
}

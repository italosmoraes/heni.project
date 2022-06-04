import { Request, Response } from 'express'
import axios from 'axios'
import { API_KEY, PRINTS_API } from '../../../config/constants'
import { ResourceTypes } from './types/ResourceTypes'
import { PrintsInput } from './types/inputTypes'

/**
 *  Resolves the feed of all public items classified as “Prints”, from harvardartmuseums api
 */

export class PrintsModule {
  static handler = async (req: Request, res: Response) => {
    try {
      const limit = 3 // todo get from req params
      const cursor = 0 // todo get from req params

      // TODO programatically put together the api query url based on resource_type and provided fields
      const queryParams = {
        size: limit,
        page: cursor,
        apikey: API_KEY
      }

      // (!) the api simply ignores query fields that dont exist for the given resource_type
      const query = `size=${limit}&page${cursor}&apikey=${API_KEY}`
      // const query = `size=${limit}&page${cursor}&apikey=${API_KEY}&titled=dog&fields=objectnumber,title,dated`

      const response = await axios.get(`${PRINTS_API}/${ResourceTypes.OBJECT}?${query}`)

      // TODO parse the 'next' from response to get the next page

      return response.data
    } catch (err) {
      console.log('Error:', err)
      res.statusCode = 500
      res.send(JSON.stringify(err, null, 2))
    }
  }

  static resolver = {
    prints: async (input: PrintsInput, context) => {
      try {
        return PrintsModule.handler(context.request, context.response)
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  }
}

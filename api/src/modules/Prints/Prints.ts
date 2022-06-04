import { Request, Response } from 'express'
import axios from 'axios'
import { API_KEY, PRINTS_API } from '../../../config/constants'
import { ResourceTypes } from './types/ResourceTypes'

interface PrintsResponse {
  info: {
    totalrecordsperquery: number
    totalrecords: number
    pages: number
    page: number
    next: string // 'https://api.harvardartmuseums.org/object?size=3&page0=&apikey=c28e4be0-4c0e-11ea-90d6-25d9a9fe80fc&page=2'
  }
  records: any[]
  aggregations?: any
}

/**
 *  Resolves the feed of all public items classified as “Prints”, from harvardartmuseums api
 */
export class PrintsModule {
  // handle request
  // call https://api.harvardartmuseums.org/RESOURCE_TYPE with query params
  // return response as json

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
}

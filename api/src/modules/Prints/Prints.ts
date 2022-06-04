import { Request, Response } from 'express'
import axios from 'axios'
import { API_KEY, PRINTS_API } from '../../../config/constants'
import { ResourceTypes } from './types/ResourceTypes'
import { PrintsInput } from './types/inputTypes'

/**
 *  Resolves the feed of all public items classified as “Prints”, from harvardartmuseums api
 *  Returns only results for which there are images
 *
 */

export class PrintsModule {
  static handler = async (req: Request, input: PrintsInput) => {
    try {
      const limit = input.limit || 5
      const cursor = input.page
      const sort = 'rank'
      const sortOrder = 'asc' // asc or desc

      // TODO user the q query field to filter the classification. because it uses a string description field
      // https://github.com/harvardartmuseums/api-docs/blob/master/sections/person.md
      // TODO user the same to filter out elements with no images

      // TODO programatically put together the api query url based on resource_type and provided fields
      const queryParams = {
        size: limit,
        page: cursor,
        apikey: API_KEY
      }

      // (!) the api simply ignores query fields that dont exist for the given resource_type
      // const query = `size=${limit}&page${cursor}&apikey=${API_KEY}`
      const query = `size=${limit}&page${cursor}&apikey=${API_KEY}&sort=${sort}&sortorder=${sortOrder}`
      // const query = `size=${limit}&page=${cursor}&apikey=${API_KEY}&titled=dog&fields=objectnumber,title,dated`

      const response = await axios.get(`${PRINTS_API}/${ResourceTypes.OBJECT}?${query}`)

      // --- Resolving results

      // ordered by rank
      // descending
      // that have images
      // and have been verified to the ‘Best’ standard.

      return response.data
    } catch (err) {
      console.log('Error:', err)
      throw err
    }
  }

  static resolver = {
    // TODO better resolve of input format. Using { input: ... } does not match graphql types
    prints: async ({ input }, context) => {
      try {
        console.log(input)
        return PrintsModule.handler(context.request, input)
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  }
}

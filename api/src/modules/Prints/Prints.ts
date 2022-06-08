import { Request } from 'express'
import axios from 'axios'
import { API_KEY, PRINTS_API } from '../../../config/constants'
import { ResourceTypes } from './types/ResourceTypes'
import { PrintsInput } from './types/inputTypes'

const CLASSIFICATION = 'Prints'

/**
 *  Resolves the feed of all public items classified as “Prints”, from harvardartmuseums api
 *  Returns only results for which there are images
 */
export class PrintsModule {
  resolvers = {
    // TODO better resolve of input format. Using { input: ... } does not match graphql types
    prints: async ({ input }) => {
      try {
        const limit = input.limit || 5
        const cursor = input.page || 0

        // --- Hardcoded filtering/pagination options
        // TOIMPROVE allow for filtering/pagination options from graphql query

        const sortBy = 'rank'
        const orderBy = 'asc' // asc or desc
        const verificationLevelFilter = 'best'
        const filterQuery = `verificationleveldescription:${verificationLevelFilter}` // Filter by Prints classification
        const hasImage = 1

        // --- mount query

        // (!) the api simply ignores query fields that dont exist for the given resource_type
        // TOIMPROVE programatically put together the api query url based on resource_type and provided fields
        const query = `size=${limit}&page=${cursor}&apikey=${API_KEY}&sort=${sortBy}&sortorder=${orderBy}&hasImage=${hasImage}&classification=${CLASSIFICATION}&q=${filterQuery}`

        const response = await axios.get(`${PRINTS_API}/${ResourceTypes.OBJECT}?${query}`)

        // --- Hydrating response

        const hydratedRecords = response.data.records.map((item) => ({
          id: item.id,
          verificationLevel: verificationLevelFilter,
          images: item.images,
          primaryImageUrl: item.primaryimageurl,
          description: item.description,
          title: item.title,
          url: item.url,
          classification: item.classification,
          dated: item.dated,
          department: item.department
        }))

        return {
          info: response.data.info,
          records: hydratedRecords,
          aggregation: response.data.aggregation
        }
      } catch (err) {
        console.log('Error:', err)
        throw err
      }
    }
  }
}

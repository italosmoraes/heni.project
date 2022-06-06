import { Image } from './Image'
import { People } from './People'

export class ObjectResource {
  division: string
  rank: number
  id: number
  verificationleveldescription: string // e.g. 'Good. Object is well described and information is vetted'
  images: Image[]
  imagecount: number
  classification: string
  primaryimageurl: string
  description: string
  title: string
  dated: string
  department: string
  people: People[]
  url: string

  static queryFields: 'division,rank,id,verificationleveldescription,images,classification'
}

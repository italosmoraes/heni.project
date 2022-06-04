import { Image } from './Image'
import { People } from './People'

export interface Object {
  division: string
  rank: number
  id: number
  verificationleveldescription: string // 'Good. Object is well described and information is vetted'
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
}

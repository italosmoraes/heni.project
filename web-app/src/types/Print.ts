export interface Print {
  id: number
  verificationLevel: string
  images: Image[]
  primaryImageUrl: string
  description: string
  title: string
  url: string
  dated: string
  department: string
}

export interface Image {
  imageid: number
  format: string // 'image/jpeg'
  description: string
  baseimageurl: string // 'https://nrs.harvard.edu/urn-3:HUAM:INV035898_dynmc'
  width: number
  height: number
}

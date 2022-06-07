export interface PrintsResponse {
  info: {
    totalrecordsperquery: number
    totalrecords: number
    pages: number
    page: number
    next: string // formated query for next page 'https://api.harvardartmuseums.org/object?size=3&page0=&apikey=c28e4be0-4c0e-11ea-90d6-25d9a9fe80fc&page=2'
  }
  records: any[]
  aggregations?: any
}

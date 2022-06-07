export interface PrintsResponse {
  prints: {
    info: {
      totalrecordsperquery: number
      totalrecords: number
      pages: number
      page: number
      next: string
    }
    records: any[]
    aggregations?: any
  }
}

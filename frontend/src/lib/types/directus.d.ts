export interface DirectusSingleResponse<T> {
  data: T
}

export interface DirectusCollectionResponse<T> {
  data: T[]
}

export interface DirectusListResponse<T> {
  data: T[]
  meta: {
    filter_count?: number
    [key: string]: unknown
  }
}

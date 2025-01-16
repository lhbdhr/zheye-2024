export interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
  fitUrl?: string
}
export interface ResponseType<P = Record<string, never>> {
  code: number
  data: P
  msg: string
}
export interface ListProps<T> {
  [id: string]: T
}

export interface ListResponse<P> {
  list: P[]
  count: number
  currentPage: number
  pageSize: number
}

export interface ListReqType {
  currentPage?: number
  pageSize?: number
  cid?: string
}
export type ListResType<P = any> = ResponseType<ListResponse<P>>

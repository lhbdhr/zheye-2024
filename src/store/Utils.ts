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

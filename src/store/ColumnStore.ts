import { defineStore } from 'pinia'
import { ImageProps, ListProps } from './Utils'
import { arrToObj, objToArr } from '@/helper'
import { PostProps } from './PostStore'
import axios from 'axios'

interface Columns {
  isloaded: boolean
  loadedColumns: string[]
  columns: ListProps<ColumnProps>
  posts: ListProps<PostProps>
}
export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}
export const useColumnStore = defineStore('column', {
  state: (): Columns => ({
    columns: {},
    loadedColumns: [],
    isloaded: false,
    posts: {},
  }),
  getters: {
    getColumnById: (state) => (id: string) => state.columns[id],
    getColumns: (state) => () => objToArr(state.columns),
    getPostsByCid: (state) => (cid: string) =>
      objToArr(state.posts).filter((post) => post.column === cid),
  },
  actions: {
    async fetchColumnById(id: string) {
      if (this.loadedColumns.includes(id)) return
      const { data } = await axios.get(`/columns/${id}`)
      this.columns[id] = data.data
      this.loadedColumns.push(id)
    },
    async fetchColumns(page: number, pageSize: number) {
      if (this.isloaded) return
      const { data } = await axios.get(
        `/columns?currentPage=${page}&pageSize=${pageSize}`
      )
      Object.assign(this.columns, arrToObj(data.data.list))
      this.isloaded = true
    },
    async fetchPostsByCid(cid: string) {
      if (this.loadedColumns.includes(cid)) return
      const { data } = await axios.get(`/columns/${cid}/posts`)
      // console.log('fetchPostsByCid', data.data.list)
      Object.assign(this.posts, arrToObj(data.data.list))
    },
    deleteCachedColumnById(id: string) {
      this.loadedColumns = this.loadedColumns.filter((cid) => cid !== id)
    },
  },
})

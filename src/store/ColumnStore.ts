import { defineStore } from 'pinia'
import { ImageProps, ListProps } from './Utils'
import { arrToObj, objToArr } from '@/helper'
import axios from 'axios'

interface Columns {
  isloaded: boolean
  columns: ListProps<ColumnProps>
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
    isloaded: false,
  }),
  getters: {
    getColumnById: (state) => (id: string) => state.columns[id],
    getColumns: (state) => () => objToArr(state.columns),
  },
  actions: {
    async fetchColumnById(id: string) {
      if (this.columns[id]) return
      const { data } = await axios.get(`/columns/${id}`)
      this.columns[id] = data.data
    },
    async fetchColumns(page: number, pageSize: number) {
      if (this.isloaded) return
      const { data } = await axios.get(
        `/columns?currentPage=${page}&pageSize=${pageSize}`
      )
      Object.assign(this.columns, arrToObj(data.data.list))
      this.isloaded = true
    },
  },
})

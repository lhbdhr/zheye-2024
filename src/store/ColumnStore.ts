import { defineStore } from 'pinia'
import { ImageProps, ListProps, ListResType } from './Utils'
import { arrToObj, objToArr } from '@/helper'
import { ListReqType } from './Utils'
import axios from 'axios'

interface Columns {
  total: number
  currentPage: number
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
    total: 0,
    currentPage: 0,
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
    async fetchColumns(params: ListReqType = {}) {
      const { currentPage = 1, pageSize = 3 } = params
      if (this.currentPage < currentPage) {
        const { data } = await axios.get<ListResType<ColumnProps>>(
          `/columns?currentPage=${currentPage}&pageSize=${pageSize}`
        )
        const { count, list } = data.data
        this.$patch({
          currentPage,
          total: count,
          columns: Object.assign(this.columns, arrToObj(list)),
        })
      }
    },
  },
})

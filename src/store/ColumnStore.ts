import { defineStore } from 'pinia'
import { ImageProps, ListProps } from './Utils'
import { arrToObj, objToArr } from '@/helper'
import axios from 'axios'
export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}
export const useColumnStore = defineStore('column', {
  state: () => ({
    columns: {} as ListProps<ColumnProps>,
  }),
  getters: {
    getColumnById: (state) => (id: string) => state.columns[id],
    getColumns: (state) => () => objToArr(state.columns),
  },
  actions: {
    async fetchColumnById(id: string) {
      const { data } = await axios.get(`/columns/${id}`)
      this.columns[id] = data.data
    },
    async fetchColumns(page: number, pageSize: number) {
      const { data } = await axios.get(
        `/columns?currentPage=${page}&pageSize=${pageSize}`
      )
      Object.assign(this.columns, arrToObj(data.data.list))
    },
  },
})

import { defineStore } from 'pinia'
import { ImageProps } from './Utils'
import axios from 'axios'
export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}
export const useColumnStore = defineStore('column', {
  state: () => ({
    columns: [] as ColumnProps[],
  }),
  getters: {
    getColumnById: (state) => {
      return (id: string) => state.columns.find((c) => c._id === id)
    },
  },
  actions: {
    fetchColumnById(id: string) {
      axios
        .get(`/columns/${id}`)
        .then((resp) => {
          this.columns = [resp.data.data]
        })
        .catch(() => {})
    },
    fetchColumns() {
      axios
        .get('/columns')
        .then((resp) => {
          this.columns = resp.data.data.list
        })
        .catch(() => {})
    },
  },
})

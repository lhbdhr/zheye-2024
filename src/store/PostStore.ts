import { defineStore } from 'pinia'
import { ImageProps } from './Utils'
import { UserDataProps } from './UserStore'
import { ListProps } from './Utils'
import axios from 'axios'
import { ResponseType } from './Utils'
import { arrToObj, objToArr } from '@/helper'

export interface Posts {
  loadedColumns: string[]
  posts: ListProps<PostProps>
}
export interface PostProps {
  _id?: string
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps | string
  createdAt?: string
  column: string
  author?: string | UserDataProps
  isHTML?: boolean
}

export const usePostStore = defineStore('post', {
  state: (): Posts => ({
    posts: {},
    loadedColumns: [],
  }),
  getters: {
    getpostById: (state) => (id: string) => state.posts[id],
    getPostsByCid: (state) => (cid: string) =>
      objToArr(state.posts).filter((post) => post.column === cid),
  },
  actions: {
    async fetchPostsByCid(cid: string) {
      if (this.loadedColumns.includes(cid)) return
      const { data } = await axios.get(`/columns/${cid}/posts`)
      // console.log('fetchPostsByCid', data.data.list)
      Object.assign(this.posts, arrToObj(data.data.list))
      this.loadedColumns.push(cid)
    },
    async createPost(post: PostProps): Promise<string> {
      const { data } = await axios.post('/posts', post)
      this.posts[data.data._id] = data.data
      return data.data._id
    },
    async fetchPostById(id: string) {
      if (this.posts[id] && this.posts[id].content) return
      const { data } = await axios.get(`/posts/${id}`)
      // console.log('fetchPostById', data.data)
      this.posts[data.data._id] = data.data
    },
    async deletePostById(id: string) {
      await axios.delete(`/posts/${id}`)
      delete this.posts[id]
    },
    async patchPostById(id: string, payload: PostProps) {
      const { data } = await axios.patch<ResponseType<PostProps>>(
        `/posts/${id}`,
        payload
      )
      // console.log('patchPostById', data)
      // 在 posts 数组中找到对应的 post，并更新其值
      this.posts[id] = data.data
      return id
    },
  },
})

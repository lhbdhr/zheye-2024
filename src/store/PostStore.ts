import { defineStore } from 'pinia'
import { ImageProps } from './Utils'
import { UserDataProps } from './UserStore'
import { ListProps } from './Utils'
import { arrToObj, objToArr } from '@/helper'
import axios from 'axios'
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
  state: () => ({
    posts: {} as ListProps<PostProps>,
  }),
  getters: {
    getPostsByCid: (state) => (cid: string) =>
      objToArr(state.posts).filter((post) => post.column === cid),
    getpostById: (state) => (id: string) => state.posts[id],
  },
  actions: {
    async createPost(post: PostProps): Promise<string> {
      const { data } = await axios.post('/posts', post)
      this.posts[data.data._id] = data.data
      return data.data._id
    },
    async fetchPostsByCid(cid: string) {
      const { data } = await axios.get(`/columns/${cid}/posts`)
      // console.log('fetchPostsByCid', data.data.list)
      Object.assign(this.posts, arrToObj(data.data.list))
    },
    async fetchPostById(id: string): Promise<PostProps> {
      const { data } = await axios.get(`/posts/${id}`)
      // console.log('fetchPostById', data.data)
      this.posts[data.data._id] = data.data
      return data.data
    },
    async deletePostById(id: string) {
      await axios.delete(`/posts/${id}`)
      delete this.posts[id]
    },
    async patchPostById(id: string, payload: PostProps) {
      const { data } = await axios.patch(`/posts/${id}`, payload)
      // console.log('patchPostById', data)
      // 在 posts 数组中找到对应的 post，并更新其值
      this.posts[id] = data.data
      return id
    },
  },
})

import { defineStore } from 'pinia'
import { ImageProps } from './Utils'
import { UserDataProps } from './UserStore'
import { ListProps } from './Utils'
import axios from 'axios'
import { useColumnStore } from './ColumnStore'
import { ResponseType } from './Utils'

export interface Posts {
  loadedPosts: string[]
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
    loadedPosts: [],
  }),
  getters: {
    getpostById: (state) => (id: string) => state.posts[id],
  },
  actions: {
    async createPost(post: PostProps): Promise<string> {
      const { data } = await axios.post('/posts', post)
      this.posts[data.data._id] = data.data
      return data.data._id
    },
    async fetchPostById(id: string) {
      if (this.loadedPosts.includes(id)) return
      const { data } = await axios.get(`/posts/${id}`)
      // console.log('fetchPostById', data.data)
      this.posts[data.data._id] = data.data
      this.loadedPosts.push(id)
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
      useColumnStore().deleteCachedColumnById(data.data.column)
      return id
    },
  },
})

import { defineStore } from 'pinia'
import { ImageProps } from './Utils'
import { UserDataProps } from './UserStore'
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
    posts: [] as PostProps[],
  }),
  getters: {
    getPostsByCid: (state) => {
      return (cid: string) => state.posts.filter((post) => post.column === cid)
    },
    getpostById(state) {
      return (id: string) => state.posts.find((post) => post._id === id)
    },
  },
  actions: {
    async createPost(post: PostProps): Promise<string> {
      const { data } = await axios.post('/posts', post)
      return data.data._id
    },
    async fetchPostsByCid(cid: string) {
      axios
        .get(`/columns/${cid}/posts`)
        .then((resp) => {
          this.posts = resp.data.data.list
        })
        .catch(() => {})
    },
    async fetchPostById(id: string): Promise<PostProps> {
      const { data } = await axios.get(`/posts/${id}`)
      this.posts = [data.data]
      return data.data
    },
    async deletePostById(id: string) {
      await axios.delete(`/posts/${id}`)
      this.posts = this.posts.filter((post) => post._id !== id)
    },
    async patchPostById(id: string, payload: PostProps) {
      const response = await axios.patch(`/posts/${id}`, payload)
      const updatedPost = response.data
      // 在 posts 数组中找到对应的 post，并更新其值
      this.posts = this.posts.map((post) =>
        post._id === id ? { ...post, ...updatedPost } : post
      )
      return id
    },
  },
})

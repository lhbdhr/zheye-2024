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
    async fetchPostById(id: string) {
      const { data } = await axios.get(`/posts/${id}`)
      this.posts = [data.data]
    },
  },
})

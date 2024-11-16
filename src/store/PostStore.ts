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
    createPost(post: PostProps) {
      this.posts.push(post)
      return post._id
    },
    fetchPostsByCid(cid: string) {
      axios
        .get(`/columns/${cid}/posts`)
        .then((resp) => {
          this.posts = resp.data.data.list
          // console.log('fetchPostsByCid', resp.data.data.list)
        })
        .catch((err) => {
          console.log('fetchPostsByCid failed', err)
        })
    },
    fetchPostById(id: string) {
      axios
        .get(`/posts/${id}`)
        .then((resp) => {
          this.posts = resp.data.data
          console.log('fetchPostById', resp.data.data)
        })
        .catch((err) => {
          console.log('fetchPostById failed', err)
        })
    },
  },
})

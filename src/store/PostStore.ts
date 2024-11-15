import { defineStore } from 'pinia'
import { ImageProps } from './Utils'
import { UserDataProps } from './UserStore'
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

    addTestPosts() {
      this.posts.push(
        {
          _id: '1',
          title: '这是我的第一篇文章',
          content:
            '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
          image:
            'https://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee1980819f4ae08ac78d458.png?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110',
          createdAt: '2020-06-11 10:34:22',
          column: '1',
        },
        {
          _id: '2',
          title: '这是我的第二篇文章',
          content:
            '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
          createdAt: '2020-06-11 10:34:22',
          column: '1',
        },
        {
          _id: '3',
          title: '这是我的第三篇文章',
          content:
            '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
          image:
            'https://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5edcc2329f2b4e28352b75eb.jpg?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110',
          createdAt: '2020-06-11 10:34:22',
          column: '1',
        }
      )
    },
  },
})

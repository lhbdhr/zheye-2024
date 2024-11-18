import { defineStore } from 'pinia'
import { ImageProps, ResponseType } from './Utils'
import router from '../router'
import axios from 'axios'
export interface UserDataProps {
  nickName?: string
  _id?: string
  column?: string
  email?: string
  avatar?: ImageProps
  description?: string
}
export interface UserProps {
  isLogin: boolean
  token?: string
  info?: UserDataProps
}

export const useUserStore = defineStore('user', {
  state: (): UserProps => {
    return {
      isLogin: false,
      token: localStorage.getItem('token') || undefined,
      info: undefined,
    }
  },
  actions: {
    updateToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    async login(email: string, password: string) {
      const { data } = await axios.post<ResponseType>('/user/login', {
        email,
        password,
      })
      this.updateToken(data.data.token)
      this.isLogin = true
    },
    async fetchCurrentUser() {
      const { data } = await axios.get<ResponseType>('/user/current')
      this.info = data.data
    },
    logout() {
      this.token = undefined
      this.isLogin = false
      this.info = undefined
      localStorage.removeItem('token')
    },
  },
})

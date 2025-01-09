import { defineStore } from 'pinia'
import { ImageProps, ResponseType } from './Utils'
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
    async login(email: string, password: string): Promise<string> {
      try {
        const { data } = await axios.post<ResponseType>('/user/login', {
          email,
          password,
        })
        this.updateToken(data.data.token)
        this.isLogin = true
        return data.data.token
      } catch {
        return ''
      }
    },
    async fetchCurrentUser(token: string) {
      this.updateToken(token)
      try {
        const { data } = await axios.get<ResponseType>('/user/current')
        if (data.code === 0) {
          this.info = data.data
          this.isLogin = true
        } else {
          this.logout()
        }
      } catch (error) {
        this.logout()
      }
    },
    async register(email: string, password: string, nickName: string) {
      const payload = { email, password, nickName }
      await axios.post<ResponseType>('/users', payload)
    },
    logout() {
      this.token = undefined
      this.isLogin = false
      this.info = undefined
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },
  },
})

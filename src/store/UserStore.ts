import { defineStore } from 'pinia'
import { ImageProps } from './Utils'
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
      localStorage.setItem('token', this.token || '')
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    login(email: string, password: string) {
      axios
        .post('/user/login', { email, password })
        .then((resp) => {
          this.updateToken(resp.data.data.token)
          this.isLogin = true
          this.fetchCurrentUser()
          router.push({ name: 'home' })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchCurrentUser() {
      axios
        .get('/user/current')
        .then((resp) => {
          this.info = resp.data.data
        })
        .catch((err) => {
          // localStorage.removeItem('token')
          // this.isLogin = false
          // this.token = undefined
          // this.info = undefined
          console.log(err)
        })
    },
    logout() {
      this.token = undefined
      localStorage.removeItem('token')
      this.isLogin = false
      this.info = undefined
    },
  },
})

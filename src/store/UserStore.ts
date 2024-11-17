import { defineStore } from 'pinia'
import { ImageProps } from './Utils'
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
  userdata?: UserDataProps
}

export const useUserStore = defineStore('user', {
  state: (): UserProps => {
    return {
      isLogin: false,
      token: localStorage.getItem('token') || undefined,
      userdata: undefined,
    }
  },
  actions: {
    login(email: string, password: string) {
      axios.post('/user/login', { email, password }).then((resp) => {
        this.token = resp.data.data.token
        this.isLogin = true
        localStorage.setItem('token', this.token || '')
        this.fetchCurrentUser()
      })
    },
    fetchCurrentUser() {
      axios.get('/user/current').then((resp) => {
        this.userdata = resp.data.data
        console.log('fetchCurrentUser', resp.data.data)
      })
    },
    logout() {
      this.token = undefined
      localStorage.removeItem('token')
      this.isLogin = false
      this.userdata = undefined
    },
  },
})

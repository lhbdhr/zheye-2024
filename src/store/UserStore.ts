import { defineStore } from 'pinia'
import { ImageProps } from './Utils'
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
  token: string | null
  userdata: UserDataProps
}

export const useUserStore = defineStore('user', {
  state: (): UserProps => {
    return {
      isLogin: true,
      token: localStorage.getItem('token') || null,
      userdata: {
        _id: '12345',
        avatar: {
          url: '',
        },
        column: '1',
        description: '',
        email: '1',
        nickName: 'lhbdhr',
      },
    }
  },
  actions: {
    logout() {
      this.token = null
      localStorage.removeItem('token')
      this.isLogin = false
      this.userdata = {}
    },
  },
})

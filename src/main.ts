import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import App from './App.vue'
import router from '@/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useGlobalStore } from './store/GlobalStore'
import { useUserStore } from './store/UserStore'
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
const globalStore = useGlobalStore()
axios.defaults.baseURL = 'http://apis.imooc.com/api'
axios.defaults.headers.common.Authorization = `Bearer ${useUserStore().token}`
axios.interceptors.request.use((config) => {
  globalStore.setError({ status: false })
  globalStore.setLoading(true)
  // get 请求，添加 icode 到 URL
  config.params = { ...config.params, icode: 'DBE1B4E7AD5FC313' }
  // 其他请求 添加 icode 到 body 中
  // 如果是上传文件， 添加到 Formdata 中
  if (config.data instanceof FormData) {
    config.data.append('icode', 'DBE1B4E7AD5FC313')
  } else {
    // 普通 POST 请求，添加到 body 中
    config.data = { ...config.data, icode: 'DBE1B4E7AD5FC313' }
  }
  return config
})

axios.interceptors.response.use(
  (response) => {
    globalStore.setLoading(false)
    return response
  },
  (error) => {
    globalStore.setError({ status: true, message: error.message })
    globalStore.setLoading(false)
    return Promise.reject(error)
  }
)

app.mount('#app')

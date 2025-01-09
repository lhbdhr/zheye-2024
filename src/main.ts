import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import App from './App.vue'
import router from '@/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useGlobalStore } from './store/GlobalStore'
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
const icode = '5D356AE2F3F5D586'
const globalStore = useGlobalStore()
axios.defaults.baseURL = 'http://apis.imooc.com/api'
axios.interceptors.request.use((config) => {
  globalStore.setError({ status: false })
  globalStore.setLoading(true)
  // get 请求，添加 icode 到 URL
  config.params = { ...config.params, icode: icode }
  // 其他请求 添加 icode 到 body 中
  // 如果是上传文件， 添加到 Formdata 中
  if (config.data instanceof FormData) {
    config.data.append('icode', icode)
  } else {
    // 普通 POST 请求，添加到 body 中
    config.data = { ...config.data, icode: icode }
  }
  return config
})

axios.interceptors.response.use(
  (response) => {
    globalStore.setLoading(false)
    return response
  },
  (error) => {
    globalStore.setError({ status: true, message: error.response.data.error })
    globalStore.setLoading(false)
    return Promise.reject(error)
  }
)

app.mount('#app')

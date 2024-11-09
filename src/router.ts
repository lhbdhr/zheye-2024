import { createMemoryHistory, createRouter } from 'vue-router'

import App from '@/App.vue'
import CreatePost from './views/CreatePost.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App,
  },
  {
    path: '/create',
    name: 'CreatePost',
    component: CreatePost,
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router

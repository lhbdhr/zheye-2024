import { createWebHistory, createRouter } from 'vue-router'

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import PostDetail from './views/PostDetail.vue'
import CreatePost from './views/CreatePost.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePost,
  },
  {
    path: '/column/:id',
    name: 'column',
    component: ColumnDetail,
  },
  {
    path: '/post/:id',
    name: 'post',
    component: PostDetail,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

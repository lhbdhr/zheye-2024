import { createWebHistory, createRouter } from 'vue-router'

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import PostDetail from './views/PostDetail.vue'
import CreatePost from './views/CreatePost.vue'
import { useUserStore } from './store/UserStore'

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
    meta: {
      redirectAlreadyLogin: true,
    },
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePost,
    meta: {
      requiredLogin: true,
    },
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

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiredLogin && !userStore.isLogin) {
    next({ name: 'login' })
  } else if (to.meta.redirectAlreadyLogin && userStore.isLogin) {
    next({ name: 'home' })
  } else {
    next()
  }
})
export default router

import { createWebHistory, createRouter } from 'vue-router'

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import PostDetail from './views/PostDetail.vue'
import CreatePost from './views/CreatePost.vue'
import Signup from './views/Signup.vue'
import UserInfo from './views/UserInfo.vue'
import { useUserStore } from './store/UserStore'
import { storeToRefs } from 'pinia'
import createMessage from './components/createMessage'

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
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: {
      redirectAlreadyLogin: true,
    },
  },
  {
    path: '/create',
    name: 'createPost',
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
    path: '/user/:id',
    name: 'user',
    component: UserInfo,
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

router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore()
  const { isLogin, info } = storeToRefs(userStore)
  const token = localStorage.getItem('token')
  // 刷新/输入URL 处理逻辑
  if (token && !info?.value) {
    await userStore.fetchCurrentUser(token)
    if (to.meta.redirectAlreadyLogin && isLogin.value && info?.value) {
      createMessage('error', '您已经登录啦，跳转至首页...', 2000)
      console.log('刷新/输入url 处理逻辑')
      next({ name: 'home' })
    } else if (to.meta.requiredLogin && !isLogin.value) {
      console.log('刷新/输入url 处理逻辑')

      next({ name: 'login' })
    } else {
      console.log('刷新/输入url 处理逻辑')
      next()
    }
    // router-link 处理逻辑
  } else {
    if (to.meta.redirectAlreadyLogin && isLogin.value && info?.value) {
      createMessage('error', '您已经登录啦，跳转至首页...', 2000)
      next({ name: 'home' })
    } else if (to.meta.requiredLogin && !isLogin.value) {
      next({ name: 'login' })
    } else {
      next()
    }
  }
})
export default router

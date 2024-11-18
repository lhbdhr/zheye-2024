<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link to="/" class="navbar-brand">者也专栏</router-link>
    <ul v-if="!isLogin || !user" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light my-2"
          >登录</router-link
        >
      </li>
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light my-2"
          >注册</router-link
        >
      </li>
    </ul>
    <ul v-else-if="user" class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好：${user.nickName}`">
          <dropdown-item
            ><router-link :to="'/create'" class="dropdown-item"
              >新建文章</router-link
            ></dropdown-item
          >
          <dropdown-item
            ><router-link
              :to="{ name: 'column', params: { id: user.column } }"
              class="dropdown-item"
              >我的专栏</router-link
            ></dropdown-item
          >
          <dropdown-item disabled
            ><router-link :to="'/login'" class="dropdown-item"
              >编辑资料</router-link
            ></dropdown-item
          >
          <dropdown-item
            ><a href="#" @click="logoutHandler" class="dropdown-item"
              >退出登陆</a
            ></dropdown-item
          >
        </dropdown>
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { UserDataProps, useUserStore } from '@/store/UserStore'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import createMessage from './createMessage'
import router from '@/router'
defineProps({
  user: {
    type: Object as PropType<UserDataProps>,
  },
  isLogin: {
    type: Boolean,
    required: true,
  },
})
const userStore = useUserStore()
const logoutHandler = () => {
  createMessage('success', '退出登陆成功, 2秒后会跳转至首页. ', 2000)
  userStore.logout()
  setTimeout(() => {
    router.push({ name: 'home' })
  }, 2000)
}
</script>
<style scoped></style>

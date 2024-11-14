<script setup lang="ts">
import { PropType } from 'vue'
import { UserProps } from '../testData'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
defineProps({
  user: Object as PropType<UserProps>,
})
</script>
<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link to="/" class="navbar-brand">者也专栏</router-link>
    <ul v-if="!user?.isLogin" class="list-inline mb-0">
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
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好：${user.username}`">
          <dropdown-item disabled
            ><router-link to="/login" class="dropdown-item"
              >新建文章</router-link
            ></dropdown-item
          >
          <dropdown-item
            ><router-link to="/login" class="dropdown-item"
              >我的专栏</router-link
            ></dropdown-item
          >
          <dropdown-item
            ><router-link to="/login" class="dropdown-item"
              >编辑资料</router-link
            ></dropdown-item
          >
          <dropdown-item
            ><router-link to="/login" class="dropdown-item"
              >退出登陆</router-link
            ></dropdown-item
          >
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>

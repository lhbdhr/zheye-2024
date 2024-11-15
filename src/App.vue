<template>
  <GlobalHeader :is-login="isLogin" :user="user"></GlobalHeader>
  <div class="container">
    <router-view></router-view>
  </div>
  <footer class="text-center py-4 text-secondary bg-light mt-6">
    <small>
      <ul class="list-inline mb-0">
        <li class="list-inline-item">© 2024 者也专栏</li>
        <li class="list-inline-item">课程</li>
        <li class="list-inline-item">文档</li>
        <li class="list-inline-item">联系</li>
        <li class="list-inline-item">更多</li>
      </ul>
    </small>
  </footer>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/UserStore'
import GlobalHeader from '@/components/GlobalHeader.vue'
const userStore = useUserStore()
const user = userStore.userdata
const isLogin = userStore.isLogin
</script>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.container {
  margin-bottom: 100px;
}
</style>

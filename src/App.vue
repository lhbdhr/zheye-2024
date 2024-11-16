<template>
  <GlobalHeader :is-login="isLogin" :user="user"></GlobalHeader>
  <loading v-if="isLoading" :text="'加载中'"></loading>
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
import { useGlobalStore } from './store/GlobalStore'
import GlobalHeader from '@/components/GlobalHeader.vue'
import { computed } from 'vue'
import Loading from './components/Loading.vue'
const globalStore = useGlobalStore()
const userStore = useUserStore()
const user = userStore.userdata
const isLogin = userStore.isLogin
const isLoading = computed(() => globalStore.loading)
// const error = computed(() => globalStore.error)
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

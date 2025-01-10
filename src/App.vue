<template>
  <global-header :is-login="isLogin" :user="user"></global-header>
  <loading v-if="isLoading" :text="'加载中'"></loading>
  <div class="container">
    <router-view :key="route.fullPath"></router-view>
  </div>
  <footer class="text-center py-4 text-secondary bg-light mt-6">
    <small>
      <ul class="list-inline mb-0">
        <li class="list-inline-item">© 2025 者也专栏</li>
        <li class="list-inline-item">课程</li>
        <li class="list-inline-item">文档</li>
        <li class="list-inline-item">联系</li>
        <li class="list-inline-item">更多</li>
      </ul>
    </small>
  </footer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/UserStore'
import { useGlobalStore } from './store/GlobalStore'
import GlobalHeader from '@/components/GlobalHeader.vue'
import Loading from './components/Loader.vue'
import { watch } from 'vue'
import createMessage from './components/createMessage'
import { useRoute } from 'vue-router'
const route = useRoute()
const globalStore = useGlobalStore()
const userStore = useUserStore()
const { info: user, isLogin } = storeToRefs(userStore)
const { loading: isLoading, error } = storeToRefs(globalStore)

watch(error, () => {
  if (error.value.status) {
    createMessage('error', error.value.message, 2000)
  }
})
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

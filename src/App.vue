<script setup lang="ts">
import { user } from './testData'
import GlobalHeader from './components/GlobalHeader.vue'
</script>

<template>
  <GlobalHeader :user="user"></GlobalHeader>
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

<style scoped></style>

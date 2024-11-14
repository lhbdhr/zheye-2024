<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="cloumn-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="column"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar"
          :alt="column.title"
          class="rounded-circle border"
        />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <post-list :list="posts"></post-list>
  </div>
</template>
<script setup lang="ts">
import PostList from '@/components/PostList.vue'
import { useRoute } from 'vue-router'
import { testPosts, columnLists } from '@/testData'
const route = useRoute()
const currentId = +route.params.id
const column = columnLists.find((c) => c.id === currentId)
const posts = testPosts.filter((p) => p.columnId === currentId)
</script>

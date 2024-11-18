<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="cloumn-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="column"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar?.url"
          :alt="column.title"
          class="rounded-circle border w-100"
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
import { onMounted, computed } from 'vue'
import PostList from '@/components/PostList.vue'
import { useRoute } from 'vue-router'
import { useColumnStore } from '@/store/ColumnStore'
import { usePostStore } from '@/store/PostStore'
const route = useRoute()
const currentId = route.params.id as string
const columnStore = useColumnStore()
const PostStore = usePostStore()
const column = computed(() => columnStore.getColumnById(currentId))
const posts = computed(() => PostStore.getPostsByCid(currentId))

onMounted(() => {
  columnStore.fetchColumnById(currentId)
  PostStore.fetchPostsByCid(currentId)
})
</script>

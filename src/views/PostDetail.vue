<template>
  <div v-if="post">
    <h4>{{ post.title }}</h4>
    <h5>{{ post.author }}</h5>
    <h5>{{ post.createdAt }}</h5>
    <p>{{ post.content }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { usePostStore } from '@/store/PostStore'
const route = useRoute()
const postStore = usePostStore()
const currentId = route.params.id as string
const post = postStore.getpostById(currentId)
</script>

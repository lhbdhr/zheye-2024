<template>
  <div v-if="post">
    <h4>{{ post.title }}</h4>
    <h5>{{ post.author }}</h5>
    <h5>{{ post.createdAt }}</h5>
    <p><img v-if="imageURL" :src="imageURL" alt="post.title" /></p>
    <p>{{ post.content }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { usePostStore } from '@/store/PostStore'
import useImageURL from '@/hooks/useImageURL'
const route = useRoute()
const postStore = usePostStore()
const currentId = route.params.id as string
const post = postStore.getpostById(currentId)
const imageURL = useImageURL(post?.image)
</script>

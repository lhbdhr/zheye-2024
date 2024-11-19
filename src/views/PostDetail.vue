<template>
  <div v-if="post">
    <h4>{{ post.title }}</h4>
    <h5 v-if="typeof post.author === 'object'">{{ post.author.nickName }}</h5>
    <h5 v-if="typeof post.author === 'string'">{{ post.author }}</h5>
    <h5>{{ post.createdAt }}</h5>
    <p><img v-if="imageURL" :src="imageURL" alt="post.title" /></p>
    <p>简介：{{ post.excerpt }}</p>
    <p>{{ post.content }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { usePostStore } from '@/store/PostStore'
import useImageURL from '@/hooks/useImageURL'
import { computed, onMounted } from 'vue'
const route = useRoute()
const postStore = usePostStore()
const currentId = route.params.id as string
const post = computed(() => postStore.getpostById(currentId))

const imageURL = useImageURL(post?.value?.image, 50, 50)
onMounted(async () => {
  await postStore.fetchPostById(currentId)
})
</script>

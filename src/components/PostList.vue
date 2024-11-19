<template>
  <div class="post-list">
    <article v-for="post in list" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4>
          <router-link :to="`/post/${post._id}`">{{ post.title }}</router-link>
        </h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image" class="col-3">
            <img
              :src="useImageURL(post.image, 'thumbnail', 100, 100)"
              alt="post.title"
              class="rounded-lg w-100"
            />
          </div>
          <p :class="{ 'col-9': post.image }">{{ post.excerpt }}</p>
        </div>
        <span class="text-muted"> {{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { PostProps } from '@/store/PostStore'
import useImageURL from '@/hooks/useImageURL'
defineProps({
  list: {
    required: true,
    type: Array as PropType<PostProps[]>,
  },
})
</script>

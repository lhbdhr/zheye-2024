<template>
  <article class="w-75 mx-auto mb-5 pb-3" v-if="post">
    <img
      :src="imageURL"
      alt="{{post.title}}"
      class="rounded-lg img-fluid my-4"
      v-if="imageURL"
    />
    <h2 class="mb-4">{{ post.title }}</h2>
    <div
      class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0"
    >
      <div class="col col-6 text-truncate">
        <user-profile
          :user="post.author"
          v-if="typeof post.author === 'object'"
        ></user-profile>
      </div>
      <span class="col col-6 text-muted col text-end font-italic"
        >发表于：{{ post.createdAt }}</span
      >
    </div>
    <div v-html="currentHTML"></div>
  </article>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { usePostStore } from '@/store/PostStore'
import UserProfile from '@/components/UserProfile.vue'
import useImageURL from '@/hooks/useImageURL'
import { computed, onMounted } from 'vue'
import { marked } from 'marked'
const route = useRoute()
const postStore = usePostStore()
const currentId = route.params.id as string
const post = computed(() => postStore.getpostById(currentId))
const imageURL = useImageURL(post?.value?.image, 'origin')
const currentHTML = computed(() => {
  if (post.value && post.value.content) {
    const { isHTML, content } = post.value
    return isHTML ? content : marked.parse(content)
  } else {
    return ''
  }
})
onMounted(async () => {
  await postStore.fetchPostById(currentId)
})
</script>

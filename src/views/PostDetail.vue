<template>
  <article class="w-75 mx-auto mb-5 pb-3" v-if="post">
    <div class="image-container my-4">
      <img
        :src="imageURL"
        :alt="post.title"
        class="toutu rounded-lg img-fluid"
        v-if="imageURL"
      />
    </div>
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
    <div v-if="showEditArea" class="mt-5">
      <router-link
        :to="{ name: 'createPost', query: { id: post._id } }"
        type="button"
        class="btn btn-success"
      >
        编辑
      </router-link>
      <button type="button" class="btn btn-danger mx-2" @click="deletePost">
        删除
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { usePostStore } from '@/store/PostStore'
import UserProfile from '@/components/UserProfile.vue'
import useImageURL from '@/hooks/useImageURL'
import { computed, onMounted } from 'vue'
import { marked } from 'marked'
import { UserDataProps, useUserStore } from '@/store/UserStore'
import { storeToRefs } from 'pinia'
import router from '@/router'
import createMessage from '@/components/createMessage'
const route = useRoute()
const postStore = usePostStore()
const { info } = storeToRefs(useUserStore())
const currentId = route.params.id as string
const post = computed(() => postStore.getpostById(currentId))
const imageURL = computed(() => useImageURL(post?.value?.image, 'origin'))

const currentHTML = computed(() => {
  if (post.value && post.value.content) {
    const { isHTML, content } = post.value
    return isHTML ? content : marked.parse(content)
  } else {
    return ''
  }
})
// 文章的编辑和删除
const showEditArea = computed(() => {
  const postAuthor = post.value?.author as UserDataProps
  return info?.value?._id === postAuthor._id
})
const deletePost = () => {
  try {
    postStore.deletePostById(currentId)
    createMessage('success', '文章删除成功', 2000)
    router.push({ name: 'column', params: { id: info?.value?.column } })
  } catch (error) {}
}
onMounted(async () => {
  await postStore.fetchPostById(currentId)
})
</script>

<style scoped>
.toutu {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.image-container {
  height: 300px;
}
</style>

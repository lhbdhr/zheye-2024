<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="title" class="form-label">文章标题：</label>
        <base-input
          type="text"
          id="title"
          name="title"
          v-model="titleVal"
          placeholder="请输入文章标题"
          :rules="titleRules"
        ></base-input>
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">文章详情：</label>
        <base-input
          :tag="'textarea'"
          rows="10"
          id="content"
          name="content"
          v-model="contentVal"
          placeholder="请输入文章详情"
          :rules="contentRules"
        ></base-input>
      </div>
      <template #submit>
        <button class="btn btn-primary">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>
<script setup lang="ts">
import ValidateForm from '../components/ValidateForm.vue'
import BaseInput from '@/components/BaseInput.vue'
import { ref } from 'vue'
import { RuleProp } from '@/components/BaseInput.vue'
import { usePostStore } from '@/store/PostStore'
import { useUserStore } from '@/store/UserStore'
import router from '@/router'
import { storeToRefs } from 'pinia'
import createMessage from '@/components/createMessage'

const titleVal = ref('')
const titleRules: RuleProp[] = [
  { type: 'required', message: '文章标题不能为空' },
  { type: 'range', message: '文章标题最少6个字符', min: 6 },
]
const contentVal = ref('')
const contentRules: RuleProp[] = [
  { type: 'required', message: '文章详情不能为空' },
]

const postStore = usePostStore()
const userStore = storeToRefs(useUserStore())

const onFormSubmit = async (formResult: boolean) => {
  try {
    if (formResult) {
      const id = await postStore.createPost({
        title: titleVal.value,
        content: contentVal.value,
        column: userStore.info?.value?.column || '',
        author: userStore.info?.value?._id || '',
      })
      createMessage('success', '文章创建成功，2秒后跳转至文章', 2000)
      setTimeout(() => {
        router.push({ name: 'post', params: { id } })
      }, 2000)
    }
  } catch (error) {}
}
</script>

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
import { RulesProp } from '@/components/BaseInput.vue'
import { usePostStore } from '@/store/PostStore'
import { useUserStore } from '@/store/UserStore'
import router from '@/router'

const titleVal = ref('')
const titleRules: RulesProp = [
  { type: 'required', message: '文章标题不能为空' },
  { type: 'range', message: '文章标题最少6个字符', min: 6 },
]
const contentVal = ref('')
const contentRules: RulesProp = [
  { type: 'required', message: '文章详情不能为空' },
]

const postStore = usePostStore()
const userStore = useUserStore()
const onFormSubmit = (result: boolean) => {
  if (result) {
    const id = postStore.createPost({
      _id: Math.random().toString(16).slice(2).toString(),
      title: titleVal.value,
      content: contentVal.value,
      column: userStore.userdata.column || '',
      author: userStore.userdata._id,
      createdAt: new Date().toLocaleString(),
    })
    router.push({ name: 'post', params: { id } })
  }
}
</script>

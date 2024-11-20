<template>
  <div class="create-post-page">
    <uploader action="/upload" :beforeUpload="beforeUpload">
      <h2>点击上传封面</h2>
      <template #uploading>
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </template>
      <template #uploaded="slotProps">
        <img :src="slotProps.uploadedData.data.url" alt="titleVal" />
      </template>
    </uploader>
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
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { usePostStore } from '@/store/PostStore'
import { useUserStore } from '@/store/UserStore'
import createMessage from '@/components/createMessage'
import BaseInput, { RuleProp } from '@/components/BaseInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import Uploader from '@/components/Uploader.vue'

const titleVal = ref('')
const titleRules: RuleProp[] = [
  { type: 'required', message: '文章标题不能为空' },
  { type: 'range', message: '文章标题最少6个字符', min: 6 },
]
const contentVal = ref('')
const contentRules: RuleProp[] = [
  { type: 'required', message: '文章详情不能为空' },
]

//  upload
const beforeUpload = (file: File) => {
  const types = ['image/jpeg', 'image/png']
  if (file && types.includes(file.type)) {
    return true
  } else {
    createMessage('error', '允许上传文件类型：jpg、jpeg、png')
    return false
  }
}

// createPost
const postStore = usePostStore()
const { info } = storeToRefs(useUserStore())
const onFormSubmit = async (formResult: boolean) => {
  try {
    if (formResult) {
      const id = await postStore.createPost({
        title: titleVal.value,
        content: contentVal.value,
        column: info?.value?.column || '',
        author: info?.value?._id || '',
      })
      createMessage('success', '文章创建成功，2秒后跳转至文章', 2000)
      setTimeout(() => {
        router.push({ name: 'post', params: { id } })
      }, 2000)
    }
  } catch (error) {}
}
</script>

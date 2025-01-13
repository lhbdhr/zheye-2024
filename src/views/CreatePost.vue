<template>
  <h4>新建文章</h4>
  <div class="create-post-page">
    <uploader
      action="/upload"
      class="d-flex justify-content-center align-items-center bg-light text-secondary w-100 my-4"
      :beforeUpload="beforeUpload"
      @file-uploaded="onFileUploaded"
      :uploaded="uploadedImage"
    >
      <h2>点击上传头图</h2>
      <template #uploading>
        <div class="d-flex align-items-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h6 class="text-primary ms-3 mb-0 fs-4">正在上传...</h6>
        </div>
      </template>
      <template #uploaded="slotProps">
        <img :src="slotProps.uploadedData && slotProps.uploadedData.url" />
      </template>
    </uploader>
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
        <label class="form-label">文章详情：</label>
        <editor
          v-model="contentVal"
          ref="editorRef"
          :options="editorConfig"
          @blur="onEditorBlur"
          @change="onEditorChange"
          :class="{ 'is-invalid': !editorStatus.isValid }"
        ></editor>
        <span v-if="!editorStatus.isValid" class="invalid-feedback">{{
          editorStatus.msg
        }}</span>
      </div>
      <template #submit>
        <button class="btn btn-primary">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, useTemplateRef } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { usePostStore } from '@/store/PostStore'
import { useUserStore } from '@/store/UserStore'
import createMessage from '@/components/createMessage'
import BaseInput, { RuleProp } from '@/components/BaseInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import Uploader from '@/components/Uploader.vue'
import { beforeUploadCheck } from '@/helper'
import { ResponseType, ImageProps } from '@/store/Utils'
import { useRoute } from 'vue-router'
import Editor from '@/components/Editor.vue'
import EasyMDE, { Options } from 'easymde'

const route = useRoute()
const isEditMode = !!route.query.id
const postStore = usePostStore()

const titleVal = ref('')
const contentVal = ref('')
const uploadedImage = ref<ImageProps | undefined>(undefined)
const titleRules: RuleProp[] = [
  { type: 'required', message: '文章标题不能为空' },
  { type: 'range', message: '文章标题最少6个字符', min: 6 },
]

// edit
onMounted(async () => {
  if (editorRef.value) {
    // console.log('Editor Instance', editorRef.value.getEasyMDEInstance())
  }
  if (isEditMode) {
    const currentId = route.query.id as string
    const post = await postStore.fetchPostById(currentId)
    if (post) {
      titleVal.value = post.title
      contentVal.value = post.content || ''
      uploadedImage.value = post.image as ImageProps
      // console.log(titleVal.value, contentVal.value, uploadedImage.value)
    }
    // console.log('post', post)
  }
})

// markdown editor
interface EditorInstance {
  clear: () => void
  getEasyMDEInstance: () => EasyMDE | null
}

const editorRef = useTemplateRef<EditorInstance>('editorRef')
const editorConfig: Options = {
  spellChecker: false,
}

const editorStatus = reactive({
  isValid: true,
  msg: '',
})

const onEditorBlur = () => {
  if (contentVal.value.trim() === '') {
    editorStatus.isValid = false
    editorStatus.msg = '文章详情不能为空'
  } else {
    editorStatus.isValid = true
    editorStatus.msg = ''
  }
}
const onEditorChange = (_value: string) => {
  onEditorBlur()
}

//  upload
const beforeUpload = (file: File) => {
  const types = ['image/jpeg', 'image/png']
  const { passed, error } = beforeUploadCheck(file, {
    validType: types,
    size: 1,
  })
  switch (error) {
    case 'validType':
      createMessage('error', '允许上传文件类型：jpg、jpeg、png', 2000)
      break
    case 'validSize':
      createMessage('error', '允许上传文件大小：1M以内', 2000)
      break
  }
  return passed
}
const uploadedId = ref('')
const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
  if (rawData.data._id) {
    uploadedId.value = rawData.data._id
  }
}
// createPost
const { info } = storeToRefs(useUserStore())
const onFormSubmit = async (formResult: boolean) => {
  try {
    onEditorBlur()
    if (formResult && editorStatus.isValid) {
      let payload = {
        title: titleVal.value,
        content: contentVal.value,
        column: info?.value?.column || '',
        author: info?.value?._id || '',
        ...(uploadedId.value ? { image: uploadedId.value } : undefined),
      }
      if (isEditMode) {
        const id = await postStore.patchPostById(
          route.query.id as string,
          payload
        )
        createMessage('success', '文章修改成功，2秒后跳转至文章', 2000)
        setTimeout(() => {
          router.push({ name: 'post', params: { id } })
        }, 2000)
      } else {
        const id = await postStore.createPost(payload)
        createMessage('success', '文章创建成功，2秒后跳转至文章', 2000)
        setTimeout(() => {
          router.push({ name: 'post', params: { id } })
        }, 2000)
      }
    }
  } catch (error) {}
}
</script>

<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

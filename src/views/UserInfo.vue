<template>
  <h4>个人资料</h4>
  <div class="edit-info-page">
    <uploader
      action="/upload"
      class="d-flex justify-content-center align-items-center bg-light text-secondary my-4 mx-auto"
      style="height: 200px; width: 200px"
      :beforeUpload="beforeUpload"
      @file-uploaded="onFileUploaded"
      :uploaded="uploadedImage"
    >
      <h2 class="fs-5">点击上传头像</h2>
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
        <label for="email" class="form-label">电子邮件：</label>
        <base-input
          type="text"
          id="email"
          name="email"
          disabled
          placeholder="请输入电子邮件"
          v-model="infoData.email"
          :rules="rules.email"
        >
          ></base-input
        >
      </div>
      <div class="mb-3">
        <label for="nickName" class="form-label">昵称：</label>
        <base-input
          id="nickName"
          name="nickName"
          type="text"
          v-model="infoData.nickName"
          placeholder="请输入昵称"
          :rules="rules.nickName"
        ></base-input>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">描述：</label>
        <base-input
          id="description"
          name="description"
          type="text"
          v-model="infoData.description"
          placeholder="请输入个人描述"
          :rules="rules.description"
        ></base-input>
      </div>
      <template #submit>
        <button class="btn btn-primary">更新个人资料</button>
      </template>
    </validate-form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import Uploader from '../components/Uploader.vue'
import ValidateForm from '../components/ValidateForm.vue'
import BaseInput, { RuleProp } from '../components/BaseInput.vue'
import { useUserStore, UserDataProps } from '@/store/UserStore'
import { ImageProps } from '@/store/Utils'
import createMessage from '../components/createMessage'
import { beforeUploadCheck } from '@/helper'
import { ResponseType } from '@/store/Utils'
import router from '@/router'

const userStore = useUserStore()
const uploadedImage = ref<ImageProps | undefined>(undefined)
const infoData = reactive({
  email: userStore.info?.email,
  nickName: userStore.info?.nickName,
  description: userStore.info?.description,
})
onMounted(() => {
  uploadedImage.value = userStore.info?.avatar as ImageProps
})

const rules: Record<string, RuleProp[]> = {
  email: [
    { type: 'required', message: '电子邮件不能为空' },
    { type: 'email', message: '请输入正确的电子邮箱' },
  ],
  nickName: [
    { type: 'required', message: '昵称不能为空' },
    { type: 'range', max: 16, message: '昵称长度最长为16' },
  ],
  description: [{ type: 'required', message: '个人简介不能为空' }],
}
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

const onFormSubmit = async (formResult: boolean) => {
  try {
    const payload: UserDataProps = reactive({
      _id: userStore.info?._id,
      column: userStore.info?.column,
      ...infoData,
      ...(uploadedId.value ? { avatar: uploadedId.value } : undefined),
    })
    if (formResult) {
      await userStore.updateCurrentUser(payload)
      createMessage('success', '个人资料修改成功', 2000)
      setTimeout(() => {
        router.push({
          name: 'user',
          params: { id: userStore.info?._id },
          query: { now: new Date().getTime() },
        })
      }, 2000)
    }
  } catch (error) {}
}
</script>

<style>
.edit-info-page .file-upload-container {
  height: 200px;
  cursor: pointer;
}
.edit-info-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

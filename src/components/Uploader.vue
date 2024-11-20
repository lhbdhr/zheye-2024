<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload">
      <slot
        name="uploaded"
        :uploadedData="uploadedData"
        v-if="fileStatus === 'success'"
      >
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot name="uploading" v-else-if="fileStatus === 'uploading'">
        <button class="btn btn-primary" disabled>上传中...</button>
      </slot>
      <slot name="default" v-else>
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="onFileChange"
    />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { PropType, ref, useTemplateRef } from 'vue'

const { action, beforeUpload } = defineProps({
  action: {
    type: String,
    required: true,
  },
  beforeUpload: Function as PropType<CheckFunction>,
})
const emit = defineEmits(['file-uploaded', 'file-uploaded-error'])
type UploadStatus = 'ready' | 'uploading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean
const fileStatus = ref<UploadStatus>('ready')
const fileInputRef = useTemplateRef('fileInput')
const triggerUpload = () => {
  fileInputRef.value?.click()
}
const uploadedData = ref()
const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    const files = Array.from(target.files)
    if (beforeUpload) {
      const result = beforeUpload(files[0])
      if (!result) {
        return
      }
    }
    fileStatus.value = 'uploading'
    const formData = new FormData()
    formData.append('file', files[0])
    axios
      .post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        fileStatus.value = 'success'
        uploadedData.value = resp.data
        emit('file-uploaded', resp.data)
      })
      .catch((error) => {
        fileStatus.value = 'error'
        emit('file-uploaded-error', error)
      })
      .finally(() => {
        fileInputRef.value!.value = ''
      })
  }
}
</script>

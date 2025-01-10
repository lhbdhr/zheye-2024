<template>
  <div class="file-upload">
    <div
      class="file-upload-container"
      v-bind="$attrs"
      @click.prevent="triggerUpload"
    >
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
/**
 * 上传组件
 *
 * @props
 * @prop {String} action - url
 * @prop {Function} beforeUpload - 上传前回调方法，用于检查选择的文件是否符合要求
 * @prop {Object} uploaded - 已上传的文件
 *
 * @emits
 * @emit {Function} file-uploaded - 发射文件上传成功事件
 * @emit {Function} file-uploaded-error - 发射文件上传失败事件
 *
 */
import { ImageProps } from '@/store/Utils'
import axios from 'axios'
import { PropType, ref, useTemplateRef, watch } from 'vue'
defineOptions({
  inheritAttrs: false,
})
// 上传URL 上传前回调函数 已选择的文件
const { action, beforeUpload, uploaded } = defineProps({
  action: {
    type: String,
    required: true,
  },
  beforeUpload: Function as PropType<CheckFunction>,
  uploaded: {
    type: Object as PropType<ImageProps>,
  },
})
// 将props中的uploaded转换为响应式数据，并通过具名作用域插槽 slotprops 传给父组件
const uploadedData = ref(uploaded)
// uploadedData 只有在初始化时被赋值了一次，需要监听 uploaded 变化，赋值给 uploadedData
watch(
  () => uploaded,
  (newValue) => {
    if (newValue) {
      fileStatus.value = 'success'
      uploadedData.value = newValue
    }
  }
)
const emit = defineEmits(['file-uploaded', 'file-uploaded-error'])
type UploadStatus = 'ready' | 'uploading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean
// 当前上传状态
const fileStatus = ref<UploadStatus>(uploaded ? 'success' : 'ready')
// 获取真实上传控件input的dom
const fileInputRef = useTemplateRef('fileInput')
// 触发input的点击事件
const triggerUpload = () => {
  fileInputRef.value?.click()
}
// 处理上传文件改变
const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    const files = Array.from(target.files)
    if (beforeUpload) {
      const result = beforeUpload(files[0])
      if (!result) {
        target.value = ''
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
        uploadedData.value = resp.data.data
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

<template>
  <teleport to="#message">
    <div
      class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2"
      :class="classObject"
      v-if="isVisible"
    >
      <span>{{ message }}</span>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="hide"
      ></button>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import { defineProps, PropType, defineEmits, ref } from 'vue'
import { MessageType } from '@/store/GlobalStore'
import useDomCreate from '@/hooks/useDomCreate'
const props = defineProps({
  message: String,
  type: {
    type: String as PropType<MessageType>,
    default: 'default',
  },
})
const emit = defineEmits(['close-message'])
useDomCreate('message')
const isVisible = ref(true)
const classObject = {
  'alert-success': props.type === 'success',
  'alert-danger': props.type === 'error',
  'alert-primary': props.type === 'default',
}
const hide = () => {
  isVisible.value = false
  emit('close-message')
}
</script>
<style scoped></style>

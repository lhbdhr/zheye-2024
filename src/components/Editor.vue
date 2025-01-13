<template>
  <div class="vue-easymde-editor">
    <textarea
      ref="textarea"
      v-model="innerValue"
      class="form-control"
      rows="10"
    ></textarea>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import EasyMDE, { Options } from 'easymde'

interface EditorProps {
  modelValue?: string
  options?: Options
}
interface EditorEvents {
  (type: 'update:modelValue', value: string): void
  (type: 'change', value: string): void
  (type: 'blur'): void
}
const props = defineProps<EditorProps>()
const emits = defineEmits<EditorEvents>()

const textarea = useTemplateRef('textarea')
let easyMDEInstance: EasyMDE | null = null
const innerValue = ref(props.modelValue || '')

watch(
  () => props.modelValue,
  (newValue) => {
    if (easyMDEInstance) {
      if (newValue !== innerValue.value) {
        easyMDEInstance.value(newValue || '')
      }
    }
  }
)

const clear = () => {
  if (easyMDEInstance) {
    easyMDEInstance.value('')
  }
}
const getEasyMDEInstance = () => easyMDEInstance

defineExpose({
  clear,
  getEasyMDEInstance,
})

onMounted(() => {
  if (textarea.value) {
    const config: Options = {
      element: textarea.value,
      initialValue: innerValue.value,
      ...(props.options || {}),
    }
    easyMDEInstance = new EasyMDE(config)
    easyMDEInstance.codemirror.on('change', () => {
      if (easyMDEInstance) {
        const updatedValue = easyMDEInstance.value()
        innerValue.value = updatedValue
        emits('update:modelValue', updatedValue)
        emits('change', updatedValue)
      }
    })
    easyMDEInstance.codemirror.on('blur', () => {
      emits('blur')
    })
  }
})

onUnmounted(() => {
  if (easyMDEInstance) {
    easyMDEInstance.cleanup()
  }
  easyMDEInstance = null
})
</script>
<style scoped>
.vue-easymde-editor.is-invalid {
  border: 1px solid #dc3545;
}
</style>

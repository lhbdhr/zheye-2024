<template>
  <div class="validate-input-container pb-3">
    <input
      v-if="tag === 'input'"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      @blur="validateInput"
      v-model="inputRef.val"
      v-bind="$attrs"
    />
    <textarea
      v-else
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      @blur="validateInput"
      v-model="inputRef.val"
      v-bind="$attrs"
    ></textarea>
    <span v-if="inputRef.error" class="invalid-feedback">{{
      inputRef.message
    }}</span>
  </div>
</template>
<script setup lang="ts">
import { PropType, reactive, onMounted, computed } from 'vue'
import emitter from '@/hooks/useMitt'

// 禁用 attributes 继承
defineOptions({
  inheritAttrs: false,
})
const emailReg =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export interface RuleProp {
  type: 'required' | 'email' | 'range' | 'custom'
  min?: number
  max?: number
  message: string
  validator?: () => boolean
}
export type TagType = 'input' | 'textarea'
const props = defineProps({
  rules: Array as PropType<RuleProp[]>,
  modelValue: String,
  tag: {
    type: String as PropType<TagType>,
    default: 'input',
  },
})
const emit = defineEmits(['update:modelValue'])
const inputRef = reactive({
  val: computed({
    get: () => props.modelValue || '',
    set: (val) => {
      emit('update:modelValue', val)
    },
  }),
  error: false,
  message: '',
})

const validateInput = () => {
  if (props.rules) {
    let allPassed = props.rules.every((rule) => {
      let passed = true
      inputRef.message = rule.message
      switch (rule.type) {
        case 'required':
          passed = inputRef.val.trim() !== ''
          break
        case 'email':
          passed = emailReg.test(inputRef.val)
          break
        case 'range':
          const { min, max } = rule
          const len = inputRef.val.length
          if (min !== undefined && max !== undefined) {
            passed = len >= min && len <= max
          } else if (min !== undefined) {
            passed = len >= min
          } else if (max !== undefined) {
            passed = len <= max
          }
          break
        case 'custom':
          passed = rule.validator ? rule.validator() : true
          break
        default:
          break
      }
      return passed
    })
    inputRef.error = !allPassed
    return allPassed
  }
  return true
}
onMounted(() => {
  emitter.emit('form-item-created', validateInput)
})
</script>

<style>
.validate-input-container {
  position: relative;
}
.invalid-feedback {
  position: absolute;
}
</style>

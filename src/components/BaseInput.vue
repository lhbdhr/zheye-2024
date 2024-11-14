<template>
  <div class="validate-input-container pb-3">
    <input
      class="form-control"
      :class="{
        'is-invalid': inputRef.error,
      }"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    />
    <span v-if="inputRef.error" class="invalid-feedback">{{
      inputRef.message
    }}</span>
  </div>
</template>
<script setup lang="ts">
import { PropType, reactive, onMounted } from 'vue'
import emitter from '@/hooks/useMitt'

// 禁用 attributes 继承
defineOptions({
  inheritAttrs: false,
})
const emailReg =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
interface RuleProp {
  type: 'required' | 'email' | 'range'
  min?: number
  max?: number
  message: string
}
export type RulesProp = RuleProp[]
const props = defineProps({
  rules: Array as PropType<RulesProp>,
  modelValue: String,
})
const inputRef = reactive({
  val: props.modelValue || '',
  error: false,
  message: '',
})
const emit = defineEmits(['update:modelValue'])
const updateValue = (e: Event) => {
  const targetValue = (e.target as HTMLInputElement).value
  inputRef.val = targetValue
  emit('update:modelValue', targetValue)
}

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

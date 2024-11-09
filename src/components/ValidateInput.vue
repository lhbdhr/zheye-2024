<template>
  <div class="validate-input-container pb-3">
    <input
      type="text"
      class="form-control"
      :class="{
        'is-invalid': inputRef.error,
      }"
      @blur="validateInput"
      v-model="inputRef.val"
    />
    <span v-if="inputRef.error" class="invalid-feedback">{{
      inputRef.message
    }}</span>
  </div>
</template>
<script setup lang="ts">
import { defineProps, PropType, reactive } from 'vue'
const emailReg =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
interface RuleProp {
  type: 'required' | 'email'
  message: string
}
export type RulesProp = RuleProp[]

const props = defineProps({
  rules: Array as PropType<RulesProp>,
})
const inputRef = reactive({
  val: '',
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
        default:
          break
      }
      return passed
    })
    inputRef.error = !allPassed
  }
}
</script>

<style>
.validate-input-container .invalid-feedback {
  display: block;
}
</style>

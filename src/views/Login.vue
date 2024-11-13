<template>
  <validate-form @form-submit="onFormSubmit">
    <div class="mb-3">
      <label for="email" class="form-label">邮箱地址</label>
      <validate-input
        type="text"
        id="email"
        name="email"
        placeholder="请输入邮箱地址"
        :rules="emailRules"
        v-model="emailVal"
      ></validate-input>
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">密码</label>
      <validate-input
        type="password"
        id="password"
        name="password"
        placeholder="请输入密码"
        :rules="passwordRules"
        v-model="passwordVal"
      ></validate-input>
    </div>
  </validate-form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
const emailRules: RulesProp = [
  { type: 'required', message: '邮箱地址不能为空' },
  { type: 'email', message: '请输入正确的邮箱地址' },
]

const passwordRules: RulesProp = [
  { type: 'required', message: '密码不能为空' },
  { type: 'range', min: 6, max: 16, message: '密码长度应该在6-16之间' },
]
const onFormSubmit = (result: boolean) => {
  console.log('result', result)
}
const emailVal = ref('dkdkkd@kdkdkkd.com')
// const emailVal = ref('')
const passwordVal = ref('11111')
</script>

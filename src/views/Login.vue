<template>
  <validate-form @form-submit="onFormSubmit">
    <div class="mb-3">
      <label for="email" class="form-label">邮箱地址</label>
      <base-input
        type="text"
        id="email"
        name="email"
        placeholder="请输入邮箱地址"
        :rules="emailRules"
        v-model="emailVal"
      ></base-input>
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">密码</label>
      <base-input
        type="password"
        id="password"
        name="password"
        placeholder="请输入密码"
        :rules="passwordRules"
        v-model="passwordVal"
      ></base-input>
    </div>
  </validate-form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import BaseInput, { RulesProp } from '@/components/BaseInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import { useUserStore } from '@/store/UserStore'
const userStore = useUserStore()
const emailVal = ref('')
const emailRules: RulesProp = [
  { type: 'required', message: '邮箱地址不能为空' },
  { type: 'email', message: '请输入正确的邮箱地址' },
]

const passwordVal = ref('')
const passwordRules: RulesProp = [
  { type: 'required', message: '密码不能为空' },
  { type: 'range', min: 6, max: 16, message: '密码长度应该在6-16之间' },
]
const onFormSubmit = (result: boolean) => {
  if (result) {
    userStore.login(emailVal.value, passwordVal.value)
  }
}
</script>

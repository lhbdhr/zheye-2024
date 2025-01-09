<template>
  <div class="signup-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">注册者也账户</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="rules.emailRules"
          v-model="formData.email"
          placeholder="请输入邮箱地址"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">昵称</label>
        <validate-input
          :rules="rules.nameRules"
          v-model="formData.nickName"
          placeholder="请输入昵称"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          type="password"
          placeholder="请输入密码"
          :rules="rules.passwordRules"
          v-model="formData.password"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">重复密码</label>
        <validate-input
          type="password"
          placeholder="请再次密码"
          :rules="rules.repeatPasswordRules"
          v-model="formData.repeatPassword"
        />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">
          注册新用户
        </button>
      </template>
    </validate-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RuleProp } from '@/components/BaseInput.vue'
import { useUserStore } from '@/store/UserStore'
import createMessage from '@/components/createMessage'
import router from '@/router'
const formData = reactive({
  email: '',
  nickName: '',
  password: '',
  repeatPassword: '',
})
const rules = reactive<{ [key: string]: RuleProp[] }>({
  emailRules: [
    { type: 'required', message: '电子邮箱地址不能为空' },
    { type: 'email', message: '请输入正确的电子邮箱格式' },
  ],
  nameRules: [{ type: 'required', message: '昵称不能为空' }],
  passwordRules: [
    { type: 'required', message: '密码不能为空' },
    { type: 'range', min: 6, max: 16, message: '密码长度应该在6-16之间' },
  ],
  repeatPasswordRules: [
    { type: 'required', message: '重复密码不能为空' },
    {
      type: 'custom',
      message: '两次输入的密码不一致',
      validator: () => {
        return formData.password === formData.repeatPassword
      },
    },
  ],
})
const onFormSubmit = async (formResult: boolean) => {
  if (formResult) {
    try {
      await useUserStore().register(
        formData.email,
        formData.password,
        formData.nickName
      )
      createMessage('success', '注册成功，两秒钟后将跳转至登陆页', 2000)
      setTimeout(() => {
        router.push({ name: 'login' })
      }, 2000)
    } catch (error) {}
  }
}
</script>

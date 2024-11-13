<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>
<script setup lang="ts">
import { onUnmounted } from 'vue'
import emitter, { ValidateFunc } from '@/hooks/useMitt'
let funcArr: ValidateFunc[] = []
const callback = (func: ValidateFunc) => {
  funcArr.push(func)
}
emitter.on('form-item-created', callback)

const emit = defineEmits(['form-submit'])
const submitForm = () => {
  console.log('submitForm')
  const result = funcArr.map((func) => func()).every((result) => result)
  emit('form-submit', result)
}
onUnmounted(() => {
  emitter.off('form-item-created')
  funcArr = []
})
</script>
<style lang="css" scoped>
.submit-area {
  display: inline-block;
}
</style>

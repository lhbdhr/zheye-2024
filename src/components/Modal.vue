<template>
  <teleport to="#modal">
    <div class="modal d-block" tabindex="-1" v-if="visible">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="onClose"
            ></button>
          </div>
          <div class="modal-body">
            <slot>
              <p>Modal body</p>
            </slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="onClose">
              {{ secondButtonText }}
            </button>
            <button
              type="button"
              class="btn"
              :class="primaryButtonType"
              @click="onConfirm"
            >
              {{ primaryButtonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import useDomCreate from '@/hooks/useDomCreate'
type primaryButtonType = 'btn-primary' | 'btn-danger'
defineProps({
  title: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  primaryButtonText: {
    type: String,
    default: '确定',
  },
  primaryButtonType: {
    type: String as PropType<primaryButtonType>,
    default: 'btn-primary',
  },
  secondButtonText: {
    type: String,
    default: '取消',
  },
})
const emit = defineEmits(['modal-on-close', 'modal-on-confirm'])
useDomCreate('modal')
const onClose = () => {
  emit('modal-on-close')
}
const onConfirm = () => {
  emit('modal-on-confirm')
}
</script>
<style scoped></style>

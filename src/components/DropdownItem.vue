<template>
  <li class="dropdown-item" :class="{ 'is-disabled': disabled }">
    <slot>项目一</slot>
  </li>
</template>
<script setup lang="ts">
defineProps({
  disabled: {
    default: false,
    type: Boolean,
  },
})
</script>

<style scoped>
.dropdown-item.is-disabled :slotted(*) {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>

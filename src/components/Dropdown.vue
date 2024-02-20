<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click.prevent="toggleOpen"
    >
      {{ title }}
    </a>
    <ul class="dropdown-menu d-block dropdown-menu-end" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { watch, ref } from "vue";
import useClickOutside from "../hooks/useClickOutside";
defineProps({
  title: {
    type: String,
    required: true,
  },
});
const dropdownRef = ref(null);
const isClickOutside = useClickOutside(dropdownRef);
let isOpen = ref(false);
function toggleOpen() {
  isOpen.value = !isOpen.value;
}
watch(isClickOutside, () => {
  if (isOpen.value && isClickOutside.value) {
    isOpen.value = false;
  }
});
</script>

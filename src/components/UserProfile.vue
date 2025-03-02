<template>
  <div class="user-profile-component">
    <div class="d-flex align-items-center">
      <img
        :src="fitUrl"
        :alt="user.nickName"
        class="rounded-circle img-thumbnail"
      />
      <div class="detail mx-2">
        <h6 class="d-block mb-0">{{ user.nickName }}</h6>
        <span class="col text-truncate text-break text-muted d-block">
          {{ user.description }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, PropType } from 'vue'
import { UserDataProps } from '@/store/UserStore'
import useImageURL from '@/hooks/useImageURL'
const props = defineProps({
  user: {
    type: Object as PropType<UserDataProps>,
    required: true,
  },
})

const fitUrl = computed(() => {
  return useImageURL(props.user.avatar, 'avatar', 50, 50)
})
</script>

<template>
  <div class="row">
    <div class="col-4 mb-4" v-for="column in columnList" :key="column._id">
      <div class="card h-100 shadow-sm" style="width: 18rem">
        <div class="card-body text-center">
          <img
            class="rounded-circle border border-light w-25 my-3"
            :src="column.avatar?.url"
            :alt="column.title"
          />
          <h5 class="card-title text-truncate">{{ column.title }}</h5>
          <p class="card-text text-left description text-secondary">
            {{ column.description }}
          </p>
          <router-link
            :to="`column/${column._id}`"
            class="btn btn-outline-primary"
            >进入专栏</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { ColumnProps } from '@/store/ColumnStore'
import imgUrl from '../assets/vue.svg'
const props = defineProps({
  list: {
    type: Array as PropType<ColumnProps[]>,
    require: true,
  },
})
const columnList = computed(() => {
  return props.list?.map((column) => {
    if (!column.avatar) {
      column.avatar = { url: imgUrl }
    }
    return column
  })
})
</script>

<style scoped></style>

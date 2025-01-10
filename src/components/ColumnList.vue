<template>
  <div class="row">
    <div class="col-4 mb-4" v-for="column in columnList" :key="column._id">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            class="rounded-circle border border-light my-3"
            :src="useImageURL(column.avatar, 'avatar', 50, 50)"
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
import useImageURL from '@/hooks/useImageURL'
const props = defineProps({
  list: {
    type: Array as PropType<ColumnProps[]>,
    require: true,
  },
})

const columnList = computed(() => props.list)
</script>

<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
.description {
  line-height: 20px;
  height: 60px;
  line-clamp: 2;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>

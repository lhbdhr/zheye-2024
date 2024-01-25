<script setup lang="ts">
import { PropType, computed } from "vue";
import imgUrl from "../assets/vue.svg";
export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}
const props = defineProps({
  list: {
    type: Array as PropType<ColumnProps[]>,
    require: true,
  },
});
const columnList = computed(() => {
  return props.list?.map((column) => {
    if (!column.avatar) {
      column.avatar = imgUrl;
    }
    return column;
  });
});
// props.list && props.list[0].avatar;
</script>

<template>
  <div class="row">
    <div class="col-3" v-for="column in columnList" :key="column.id">
      <div class="card h-100 shadow-sm mb-4" style="width: 18rem">
        <div class="card-body text-center">
          <img
            class="rounded-circle border border-light w-25 my-3"
            :src="column.avatar"
            :alt="column.title"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-start">{{ column.description }}</p>
          <a href="#" class="btn btn-outline-primary">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

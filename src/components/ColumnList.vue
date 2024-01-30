<script setup lang="ts">
import { PropType, computed } from "vue";
import { ColumnProps } from "../testData";
import imgUrl from "../assets/vue.svg";
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
</script>

<template>
  <div class="row row-col-4">
    <div class="col my-2 mx-1" v-for="column in columnList" :key="column.id">
      <div class="card h-100 shadow-sm" style="width: 18rem">
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

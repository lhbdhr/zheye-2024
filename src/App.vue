<script setup lang="ts">
import ColumnList from "./components/ColumnList.vue";
import GlobalHeader from "./components/GlobalHeader.vue";
import { columnLists, user } from "./testData";
</script>

<template>
  <GlobalHeader :user="user"></GlobalHeader>
  <div class="container">
    <ColumnList :list="columnLists" />
  </div>
</template>

<style scoped></style>

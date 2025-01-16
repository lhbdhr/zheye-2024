<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img
            src="../assets/callout.svg"
            alt="callout"
            class="w-50"
          />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link
              to="/create"
              class="btn btn-primary my-2"
            >
              开始写文章
            </router-link>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center mb-4">发现精彩</h4>
    <column-list :list="columns"></column-list>
    <button
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25 d-block"
      @click="loadMorePage"
      v-if="!isLastPage"
    >
      加载更多
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import ColumnList from '../components/ColumnList.vue'
import { useColumnStore } from '@/store/ColumnStore'
import useLoadMore from '@/hooks/useLoadMore.ts'

const columnStore = useColumnStore()
const columns = computed(() => columnStore.getColumns())
const total = computed(() => columnStore.total)
const currentPage = computed(() => columnStore.currentPage)

const { loadMorePage, isLastPage } = useLoadMore(columnStore, 'fetchColumns', {
  total,
  currentPage,
  pageSize: 3,
})

onMounted(() => {
  columnStore.fetchColumns()
})
</script>

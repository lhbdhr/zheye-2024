<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link to="/create" class="btn btn-primary my-2"
              >开始写文章</router-link
            >
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="columns"></column-list>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import ColumnList from '../components/ColumnList.vue'
import { storeToRefs } from 'pinia'
import { useColumnStore } from '@/store/ColumnStore'
const columnStore = useColumnStore()
const { columns } = storeToRefs(columnStore)

onMounted(() => {
  console.log('Home mounted')
  columnStore.fetchColumns(1, 6)
})
onUnmounted(() => {
  console.log('Home unmounted')
})
</script>

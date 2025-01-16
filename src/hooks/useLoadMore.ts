import { computed, ComputedRef } from 'vue'
import { Store } from 'pinia'
interface LoadParams {
  currentPage: ComputedRef<number>
  total: ComputedRef<number>
  pageSize?: number
  [key: string]: any
}
const useLoadMore = (
  store: Store<string, any>,
  actionName: string,
  params: LoadParams
) => {
  const { currentPage, total, pageSize = 5, ...restOptions } = params
  const requestParams = computed(() => {
    return {
      currentPage: currentPage.value + 1,
      pageSize,
      ...restOptions,
    }
  })
  const loadMorePage = () => {
    store[actionName](requestParams.value)
  }
  const isLastPage = computed(() => {
    return Math.ceil(total.value / pageSize) == currentPage.value
  })
  return {
    loadMorePage,
    isLastPage,
    currentPage,
  }
}
export default useLoadMore

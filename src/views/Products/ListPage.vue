<template>
  <div class="flex flex-col gap-8 max-h-[80vh]">
    <div class="flex flex-row justify-between items-center">
      <h1 class="text-2xl font-bold">Products</h1>
      <BaseButton type="filled">
        <span class="text-sm font-semibold">New Product</span>
      </BaseButton>
    </div>

    <div class="flex flex-col w-full h-[76vh]">
      <BaseTable
        :headers="headers"
        :datalist="data"
        :is-loading="isLoading"
        :pagination="pagination"
        @change-page-event="fetchProducts"
        @change-per-page-event="(val: number) => fetchProducts()"
      >
        <template #1="{ data }">
          <span> {{ data }} </span>
        </template>
        <template #3="{ data }">
          <span> {{ `$${data}` }} </span>
        </template>
        <template #4="{ data }">
          <span class="line-clamp-2 w-[32rem]"> {{ data }} </span>
        </template>
        <template #empty>
          <span class="flex justify-center p-4">No products Found</span>
        </template>
      </BaseTable>
      <BaseTablePagination
        :per-page-options="pagination.perPageOptions"
        @change-page-event="fetchProducts"
        @change-per-page-event="(val: number) => fetchProducts()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IOptions } from '@/common/types'
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseTable from '@/components/table/BaseTable.vue'
import type { IBaseTablePagination } from '@/components/table/BaseTablePagination.vue'
import BaseTablePagination from '@/components/table/BaseTablePagination.vue'
import { useProductsStore } from '@/stores/products'
import dayjs from 'dayjs'
import { onMounted, ref, type Ref } from 'vue'

const productsStore = useProductsStore()
const isLoading: Ref<boolean> = ref(false)
const headers = ref(['ID', 'Title', 'Category', 'Price', 'Description', 'Created At', 'Updated At'])
const data: Ref<(string | number)[][]> = ref([])

const perPageOptions: Ref<IOptions[]> = ref([
  ...new Array(5).fill('').map((_, index) => {
    return { key: String(index + 1), value: String(index + 1) }
  })
])

const pagination: Ref<IBaseTablePagination> = ref({
  page: 1,
  perPage: 10,
  perPageOptions: perPageOptions
})

onMounted(async () => {
  await fetchProducts()
})

const fetchProducts = async () => {
  isLoading.value = true

  await productsStore.dispatchGetProducts()
  tableMapper()

  isLoading.value = false
}

const tableMapper = () => {
  data.value = productsStore.products.map((p) => {
    return [
      p.id,
      p.title,
      p.category.name,
      p.price,
      p.description,
      dayjs(p.creationAt).format('YYYY-MM-DD HH:mm:ss Z'),
      dayjs(p.updatedAt).format('YYYY-MM-DD HH:mm:ss Z')
    ]
  })
}
</script>

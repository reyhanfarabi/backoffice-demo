<template>
  <div class="flex flex-col gap-8 max-h-[80vh]">
    <div class="flex flex-row justify-between items-center">
      <h1 class="text-2xl font-bold">Products</h1>
      <BaseButton>
        <span class="text-sm font-semibold">New Product</span>
      </BaseButton>
    </div>

    <div class="flex w-full h-[72vh]">
      <BaseTable :headers="headers" :datalist="data" :is-loading="isLoading">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseTable from '@/components/table/BaseTable.vue'
import { useProductsStore } from '@/stores/products'
import dayjs from 'dayjs'
import { onMounted, ref, type Ref } from 'vue'

const productsStore = useProductsStore()
const isLoading: Ref<boolean> = ref(false)
const headers = ref(['ID', 'Title', 'Category', 'Price', 'Description', 'Created At', 'Updated At'])
const data: Ref<(string | number)[][]> = ref([])

onMounted(async () => {
  isLoading.value = true

  await productsStore.dispatchGetProducts()

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

  isLoading.value = false
})
</script>

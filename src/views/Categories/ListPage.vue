<template>
  <div class="flex flex-col gap-8 max-h-[80vh]">
    <div class="flex flex-row justify-between items-center">
      <h1 class="text-2xl font-bold">Categories</h1>
      <BaseButton>
        <span class="text-sm font-semibold">New Category</span>
      </BaseButton>
    </div>

    <div class="flex w-full h-[72vh]">
      <BaseTable :headers="headers" :datalist="data" :is-loading="isLoading">
        <template #2="{ data }">
          <div class="truncate max-w-[28rem]">
            {{ data }}
          </div>
        </template>
        <template #empty>
          <span class="flex justify-center p-4">No categories Found</span>
        </template>
      </BaseTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseTable from '@/components/table/BaseTable.vue'
import type { ICategory } from '@/interfaces/categories'
import { useCategoriesStore } from '@/stores/categories'
import dayjs from 'dayjs'
import { onMounted, ref, type Ref } from 'vue'

const categoriesStore = useCategoriesStore()
const headers = ref(['ID', 'Name', 'Images', 'Created At', 'Updated At'])
const data: Ref<(string | number)[][]> = ref([])
const isLoading: Ref<boolean> = ref(false)

onMounted(async () => {
  isLoading.value = true
  await categoriesStore.dispatchGetCategories()

  // map data to show in the table
  data.value = categoriesStore.categories.map((c: ICategory) => {
    return [
      c.id,
      c.name,
      c.image,
      dayjs(c.creationAt).format('YYYY-MM-DD HH:mm:ss Z'),
      dayjs(c.updatedAt).format('YYYY-MM-DD HH:mm:ss Z')
    ]
  })
  isLoading.value = false
})
</script>

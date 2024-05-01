<template>
  <div class="flex flex-col gap-8 max-h-[80vh]">
    <div class="flex flex-row justify-between items-center">
      <h1 class="text-2xl font-bold">Categories</h1>
      <BaseButton>
        <span class="text-sm font-semibold">New Category</span>
      </BaseButton>
    </div>

    <BaseTable :headers="headers" :datalist="data" />
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseTable from '@/components/table/BaseTable.vue'
import type { ICategory } from '@/interfaces/categories'
import { useCategoriesStore } from '@/stores/categories'
import { onMounted, ref, type Ref } from 'vue'

const categoriesStore = useCategoriesStore()
const headers = ref(['ID', 'Name', 'Images', 'Created At', 'Updated At'])
const data: Ref<(string | number)[][]> = ref([])

onMounted(async () => {
  await categoriesStore.dispatchGetCategories()

  // map data to show in the table
  data.value = categoriesStore.categories.map((c: ICategory) => {
    return [c.id, c.name, c.image, c.creationAt, c.updatedAt]
  })
})
</script>

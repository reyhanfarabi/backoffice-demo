<template>
  <div class="flex flex-col gap-8 pb-20">
    <div class="flex flex-row justify-between items-center">
      <h1 class="text-2xl font-bold">Categories</h1>
      <BaseButton type="filled">
        <span class="text-sm font-semibold">New Category</span>
      </BaseButton>
    </div>

    <div class="flex w-full">
      <BaseTable :headers="headers" :datalist="data" :is-loading="isLoading">
        <template #2="{ data }">
          <div class="truncate max-w-[28rem]">
            {{ data }}
          </div>
        </template>
        <template #5="{ data }">
          <div class="flex justify-center gap-2">
            <BaseButton
              type="vanilla"
              @click="
                () => {
                  $router.push({ name: 'Categories Detail', params: { id: data } })
                }
              "
            >
              <i class="pi pi-ellipsis-h" />
            </BaseButton>
            <BaseButton
              type="vanilla"
              @click="
                () => {
                  console.log(data)
                }
              "
            >
              <i class="pi pi-pencil" />
            </BaseButton>
            <BaseButton
              class="p-2 rounded text-neutral-100 bg-red-500 dark:bg-red-600 hover:bg-red-500/80 dark:hover:bg-red-600/80"
              @click="
                () => {
                  console.log(data)
                }
              "
            >
              <i class="pi pi-trash text-white" />
            </BaseButton>
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
const headers = ref(['ID', 'Name', 'Images', 'Created At', 'Updated At', ''])
const data: Ref<(string | number)[][]> = ref([])
const isLoading: Ref<boolean> = ref(false)

onMounted(async () => {
  await fetchCategories()
})

const fetchCategories = async () => {
  isLoading.value = true
  await categoriesStore.dispatchGetCategories()
  tableMapper()
  isLoading.value = false
}

const tableMapper = () => {
  data.value = categoriesStore.categories.map((c: ICategory) => {
    return [
      c.id,
      c.name,
      c.image,
      dayjs(c.creationAt).format('YYYY-MM-DD HH:mm:ss Z'),
      dayjs(c.updatedAt).format('YYYY-MM-DD HH:mm:ss Z'),
      c.id
    ]
  })
}
</script>

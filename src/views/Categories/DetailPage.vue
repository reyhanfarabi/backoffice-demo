<template>
  <div class="flex flex-col gap-8 pb-20">
    <BaseButton
      class="flex items-center gap-2 w-fit text-xs"
      type="outlined"
      @click="$router.push({ name: 'Categories List' })"
    >
      <i class="pi pi-arrow-left" />
      <span class="text-sm">Back</span>
    </BaseButton>

    <div class="flex flex-row justify-between items-center">
      <h1 class="text-2xl font-bold">Categories</h1>
      <div class="flex gap-2">
        <BaseButton
          type="vanilla"
          @click="
            () => {
              console.log($route.params.id)
            }
          "
        >
          <i class="pi pi-pencil text-white" />
        </BaseButton>
        <BaseButton
          class="p-2 rounded text-neutral-100 bg-red-500 dark:bg-red-600 hover:bg-red-500/80 dark:hover:bg-red-600/80"
          @click="
            () => {
              console.log($route.params.id)
            }
          "
        >
          <i class="pi pi-trash text-white" />
        </BaseButton>
      </div>
    </div>

    <div class="p-4 rounded bg-neutral-200 dark:bg-neutral-800">
      <LoadingSpinner v-if="categoriesStore.isLoading" />

      <div v-else class="flex flex-col gap-4">
        <div class="flex flex-row items-center">
          <label class="w-28" for="categoryId">ID</label>
          <BaseInput
            class="w-16"
            type="text"
            name="categoryIdField"
            id="categoryId"
            disabled
            :value="data?.id"
          />
        </div>
        <div class="flex flex-row items-center">
          <label class="w-28" for="name">Name</label>
          <BaseInput
            class="w-96"
            type="text"
            name="nameField"
            id="name"
            disabled
            :value="data?.name"
          />
        </div>
        <div class="flex flex-row items-center">
          <label class="w-28" for="creationAt">Creation At</label>
          <BaseInput
            class="w-96"
            type="text"
            name="creationAtField"
            id="creationAt"
            disabled
            :value="dayjs(data?.creationAt).format('YYYY-MM-DD HH:mm:ss Z')"
          />
        </div>
        <div class="flex flex-row items-center">
          <label class="w-28" for="updatedAt">Updated At</label>
          <BaseInput
            class="w-96"
            type="text"
            name="updatedAtField"
            id="updatedAt"
            disabled
            :value="dayjs(data?.updatedAt).format('YYYY-MM-DD HH:mm:ss Z')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import LoadingSpinner from '@/components/loadings/LoadingSpinner.vue'
import type { ICategory } from '@/interfaces/categories'
import { useCategoriesStore } from '@/stores/categories'
import dayjs from 'dayjs'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const categoriesStore = useCategoriesStore()
const data: Ref<ICategory | undefined> = ref()

onMounted(async () => {
  data.value = await categoriesStore.getCategoryById(Number(route.params.id))
})
</script>

<template>
  <div class="flex flex-col gap-8 pb-20">
    <div class="flex flex-row w-full gap-4 items-center">
      <BaseButton
        class="flex items-center gap-2 w-fit text-xs"
        type="outlined"
        @click="handleBackToListPage"
      >
        <i class="pi pi-arrow-left" />
      </BaseButton>
      <div class="flex flex-row w-full items-center justify-between">
        <h1 class="text-2xl font-bold">Detail Products</h1>
        <div class="flex gap-2">
          <BaseButton type="vanilla" @click="() => {}">
            <i class="pi pi-pencil" />
          </BaseButton>
          <BaseButton
            class="p-2 rounded text-neutral-100 bg-red-500 dark:bg-red-600 hover:bg-red-500/80 dark:hover:bg-red-600/80"
            @click="() => {}"
          >
            <i class="pi pi-trash text-white" />
          </BaseButton>
        </div>
      </div>
    </div>

    <div v-if="data" class="flex flex-row gap-4">
      <div
        class="flex flex-col justify-center w-1/2 gap-4 p-4 rounded shadow text-sm bg-white dark:bg-neutral-800"
      >
        <div class="flex flex-row gap-2">
          <span class="w-28">ID</span>
          <span>:</span>
          <span class="w-full">{{ data?.id }}</span>
        </div>
        <div class="flex flex-row gap-2">
          <span class="w-28">Title</span>
          <span>:</span>
          <span class="w-full">{{ data?.title }}</span>
        </div>
        <div class="flex flex-row gap-2">
          <span class="w-28">Category</span>
          <span>:</span>
          <span class="w-full">{{ data?.category.name }}</span>
        </div>
        <div class="flex flex-row gap-2">
          <span class="w-28">Price</span>
          <span>:</span>
          <span class="w-full">${{ data?.price || 0 }}</span>
        </div>
        <div class="flex flex-row gap-2">
          <span class="w-28">Description</span>
          <span>:</span>
          <span class="w-full">{{ data?.description }}</span>
        </div>
      </div>
    </div>

    <LoadingFullscreen v-if="productsStore.isLoading" />
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue'
import LoadingFullscreen from '@/components/loadings/LoadingFullscreen.vue'
import type { IProduct } from '@/interfaces/products'
import { useProductsStore } from '@/stores/products'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const data: Ref<IProduct | undefined> = ref()

onMounted(async () => {
  data.value = await productsStore.getProductById(Number(route.params.id))
})

const handleBackToListPage = () => {
  router.push({ name: 'Products List' })
}
</script>

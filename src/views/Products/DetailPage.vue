<template>
  <div class="flex flex-col gap-8 pb-20">
    <div class="flex flex-row w-full gap-4 items-center justify-between">
      <BaseButton
        class="flex items-center gap-2 w-fit text-xs"
        variant="outlined"
        @click="handleBackToListPage"
      >
        <i class="pi pi-arrow-left" />
      </BaseButton>
      <div class="flex flex-row items-center">
        <div class="flex gap-2">
          <BaseButton
            variant="vanilla"
            @click="
              () => {
                $router.push({ name: 'Products Edit', params: { id: $route.params.id } })
              }
            "
          >
            <i class="pi pi-pencil" />
          </BaseButton>
          <BaseButton
            class="p-2 rounded text-neutral-100 bg-red-500 dark:bg-red-600 hover:bg-red-500/80 dark:hover:bg-red-600/80"
            @click="
              () => {
                isDeleteModalVisible = true
              }
            "
          >
            <i class="pi pi-trash text-white" />
          </BaseButton>
        </div>
      </div>
    </div>

    <div v-if="data" class="flex flex-col p-8 gap-8 rounded shadow bg-white dark:bg-neutral-800">
      <h1 class="text-2xl font-bold">Detail Products</h1>
      <div class="flex flex-col justify-center gap-4">
        <div class="flex flex-col gap-2">
          <span class="w-28 text-sm text-neutral-500 dark:text-neutral-400">ID</span>
          <span class="w-full">{{ data?.id }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <span class="w-28 text-sm text-neutral-500 dark:text-neutral-400">Title</span>
          <span class="w-full">{{ data?.title }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <span class="w-28 text-sm text-neutral-500 dark:text-neutral-400">Category</span>
          <span class="w-full">{{ data?.category.name }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <span class="w-28 text-sm text-neutral-500 dark:text-neutral-400">Price</span>
          <span class="w-full">${{ data?.price || 0 }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <span class="w-28 text-sm text-neutral-500 dark:text-neutral-400">Description</span>
          <span class="w-full text-justify">{{ data?.description }}</span>
        </div>
      </div>
    </div>

    <BaseModals v-if="isDeleteModalVisible" @close-modal-event="handleCloseDeleteModal">
      <div class="flex flex-col gap-4 p-4">
        <span>Are you sure you want to delete product?</span>
        <div class="flex flex-row gap-2">
          <BaseButton class="flex-1" variant="filled" @click="handleCloseDeleteModal"
            >Cancel</BaseButton
          >
          <BaseButton class="flex-1" variant="outlined" @click="handleDeleteProduct"
            >Yes</BaseButton
          >
        </div>
      </div>
    </BaseModals>

    <LoadingFullscreen v-if="productsStore.isLoading" />
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue'
import LoadingFullscreen from '@/components/loadings/LoadingFullscreen.vue'
import type { IProduct } from '@/interfaces/products'
import { useProductsStore } from '@/stores/products'
import { onMounted, ref, type Ref } from 'vue'
import BaseModals from '@/components/modals/BaseModals.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const data: Ref<IProduct | undefined> = ref()

onMounted(async () => {
  data.value = await productsStore.getProductById(Number(route.params.id))
})
const isDeleteModalVisible: Ref<boolean> = ref(false)

const handleBackToListPage = () => {
  router.push({ name: 'Products List' })
}

const handleCloseDeleteModal = (): void => {
  isDeleteModalVisible.value = false
}

const handleDeleteProduct = async () => {
  handleCloseDeleteModal()

  if (route.params.id) {
    await productsStore.deleteProduct(Number(route.params.id))
    isDeleteModalVisible.value = false
  }

  await handleBackToListPage()
}
</script>

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
      <div class="flex flex-row w-full justify-between">
        <h1 class="text-2xl font-bold">Detail Categories</h1>
        <div class="flex gap-2">
          <BaseButton
            type="vanilla"
            @click="
              () => {
                $router.push({ name: 'Categories Edit', params: { id: $route.params.id } })
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

    <div class="p-4 rounded shadow bg-white dark:bg-neutral-800 w-1/2">
      <LoadingSpinner v-if="categoriesStore.isLoading" />

      <div v-else class="flex flex-col gap-4 text-sm">
        <div class="flex flex-row items-center gap-2">
          <label class="w-28" for="categoryId">ID</label>
          <span>:</span>
          <BaseInput
            class="w-16"
            type="text"
            name="categoryIdField"
            id="categoryId"
            disabled
            :model-value="data.id"
          />
        </div>
        <div class="flex flex-row items-center gap-2">
          <label class="w-28" for="name">Name</label>
          <span>:</span>
          <BaseInput
            class="w-96"
            type="text"
            name="nameField"
            id="name"
            disabled
            :model-value="data.name"
          />
        </div>
        <div class="flex flex-row items-center gap-2">
          <label class="w-28" for="creationAt">Creation At</label>
          <span>:</span>
          <BaseInput
            class="w-96"
            type="text"
            name="creationAtField"
            id="creationAt"
            disabled
            :model-value="dayjs(data.creationAt).format('MMMM DD, YYYY HH:mm:ss Z')"
          />
        </div>
        <div class="flex flex-row items-center gap-2">
          <label class="w-28" for="updatedAt">Updated At</label>
          <span>:</span>
          <BaseInput
            class="w-96"
            type="text"
            name="updatedAtField"
            id="updatedAt"
            disabled
            :model-value="dayjs(data.updatedAt).format('MMMM DD, YYYY HH:mm:ss Z')"
          />
        </div>
      </div>
    </div>

    <BaseModals v-if="isDeleteModalVisible" @close-modal-event="handleCloseDeleteModal">
      <LoadingSpinner v-if="categoriesStore.isLoading" />

      <div v-else class="flex flex-col gap-4 p-4">
        <span
          >Are you sure you want to delete
          <span class="font-semibold">{{ data?.name }}</span> category?</span
        >
        <div class="flex flex-row gap-2">
          <BaseButton class="flex-1" type="filled" @click="handleCloseDeleteModal"
            >Cancel</BaseButton
          >
          <BaseButton class="flex-1" type="outlined" @click="handleDeleteCategory">Yes</BaseButton>
        </div>
      </div>
    </BaseModals>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import LoadingSpinner from '@/components/loadings/LoadingSpinner.vue'
import BaseModals from '@/components/modals/BaseModals.vue'
import type { ICategory } from '@/interfaces/categories'
import { useCategoriesStore } from '@/stores/categories'
import dayjs from 'dayjs'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const categoriesStore = useCategoriesStore()
const data: Ref<ICategory> = ref({
  id: NaN,
  name: '',
  image: '',
  creationAt: '',
  updatedAt: ''
})
const isDeleteModalVisible: Ref<boolean> = ref(false)

onMounted(async () => {
  data.value = await categoriesStore.getCategoryById(Number(route.params.id))
})

const handleCloseDeleteModal = (): void => {
  isDeleteModalVisible.value = false
}

const handleDeleteCategory = async () => {
  if (route.params.id) {
    await categoriesStore.deleteCategory(Number(route.params.id))
    isDeleteModalVisible.value = false
  }

  await handleBackToListPage()
}

const handleBackToListPage = () => {
  router.push({ name: 'Categories List' })
}
</script>

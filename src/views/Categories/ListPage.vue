<template>
  <div class="flex flex-col gap-8 pb-20">
    <div class="flex flex-row justify-between items-center">
      <h1 class="text-2xl font-bold">Categories</h1>
      <BaseButton
        variant="filled"
        @click="
          () => {
            isAddModalVisible = true
          }
        "
      >
        <span class="text-sm font-semibold">New Category</span>
      </BaseButton>
    </div>

    <div class="flex w-full">
      <BaseTable :headers="headers" :datalist="data" :is-loading="categoriesStore.isLoading">
        <template #2="{ data }">
          <div class="truncate max-w-[28rem]">
            {{ data }}
          </div>
        </template>
        <template #5="{ data }">
          <div class="flex justify-center gap-2">
            <BaseButton
              variant="vanilla"
              @click="
                () => {
                  $router.push({ name: 'Categories Detail', params: { id: data } })
                }
              "
            >
              <i class="pi pi-ellipsis-h" />
            </BaseButton>
            <BaseButton
              variant="vanilla"
              @click="
                () => {
                  $router.push({ name: 'Categories Edit', params: { id: data } })
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
                  deleteId = data
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

    <BaseModals v-if="isDeleteModalVisible" @close-modal-event="handleCloseDeleteModal">
      <LoadingSpinner v-if="categoriesStore.isLoading" />

      <div v-else class="flex flex-col gap-4 p-4">
        <span
          >Are you sure you want to delete
          <span class="font-semibold">{{ getCategoryNameById() }}</span> category?</span
        >
        <div class="flex flex-row gap-2">
          <BaseButton class="flex-1" variant="filled" @click="handleCloseDeleteModal"
            >Cancel</BaseButton
          >
          <BaseButton class="flex-1" variant="outlined" @click="handleDeleteCategory"
            >Yes</BaseButton
          >
        </div>
      </div>
    </BaseModals>

    <AddModal
      v-if="isAddModalVisible"
      @close-button-event="
        () => {
          isAddModalVisible = false
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue'
import LoadingSpinner from '@/components/loadings/LoadingSpinner.vue'
import BaseModals from '@/components/modals/BaseModals.vue'
import BaseTable from '@/components/table/BaseTable.vue'
import { useCategoriesStore } from '@/stores/categories'
import dayjs from 'dayjs'
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue'
import AddModal from './components/AddModal.vue'

const categoriesStore = useCategoriesStore()
const headers = ref(['ID', 'Name', 'Images', 'Created At', 'Updated At', ''])
const isDeleteModalVisible: Ref<boolean> = ref(false)
const deleteId: Ref<number | null> = ref(null)
const isAddModalVisible: Ref<boolean> = ref(false)

const data: ComputedRef<(string | number)[][]> = computed(() => {
  return categoriesStore.categories.map((c) => {
    return [
      c.id,
      c.name,
      c.image,
      dayjs(c.creationAt).format('YYYY-MM-DD HH:mm:ss Z'),
      dayjs(c.updatedAt).format('YYYY-MM-DD HH:mm:ss Z'),
      c.id
    ]
  })
})

onMounted(async () => {
  await fetchCategories()
})

const fetchCategories = async (): Promise<void> => {
  await categoriesStore.dispatchGetCategories()
}

const handleCloseDeleteModal = (): void => {
  deleteId.value = null
  isDeleteModalVisible.value = false
}

const getCategoryNameById = (): string => {
  return categoriesStore.categories.find((c) => c.id === deleteId.value)?.name || ''
}

const handleDeleteCategory = async (): Promise<void> => {
  if (deleteId.value) {
    await categoriesStore.deleteCategory(deleteId.value)
    isDeleteModalVisible.value = false
  }

  await fetchCategories()
}
</script>

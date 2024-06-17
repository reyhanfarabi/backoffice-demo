<template>
  <div class="flex flex-col gap-8 pb-20">
    <div class="flex flex-row justify-between w-full gap-4 items-center">
      <BaseButton
        class="flex items-center gap-2 w-fit text-xs"
        variant="outlined"
        @click="handleBackToListPage"
      >
        <i class="pi pi-arrow-left" />
      </BaseButton>
      <div class="flex flex-row">
        <div class="flex gap-2">
          <BaseButton
            variant="vanilla"
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

    <div class="flex flex-col gap-8 p-8 rounded shadow bg-white dark:bg-neutral-800">
      <h1 class="text-2xl font-bold">Detail Categories</h1>
      <div class="flex flex-col lg:flex-row gap-8">
        <img
          v-if="data.image"
          :src="data.image"
          class="aspect-square h-64 w-64 rounded border border-neutral-300 dark:border-neutral-700"
          :alt="`${data.name} image`"
        />

        <div v-if="!categoriesStore.isLoading" class="flex flex-col w-full gap-4">
          <div class="flex flex-col gap-2">
            <label class="w-28 text-sm text-neutral-500 dark:text-neutral-400" for="categoryId"
              >ID</label
            >
            <span>{{ data.id }}</span>
          </div>
          <div class="flex flex-col gap-2">
            <label class="w-28 text-sm text-neutral-500 dark:text-neutral-400" for="name"
              >Name</label
            >
            <span>{{ data.name }}</span>
          </div>
          <div class="flex flex-col gap-2">
            <label class="w-28 text-sm text-neutral-500 dark:text-neutral-400" for="creationAt"
              >Creation At</label
            >
            <span>{{ dayjs(data.creationAt).format('MMMM DD, YYYY HH:mm:ss Z') }}</span>
          </div>
          <div class="flex flex-col gap-2">
            <label class="w-28 text-sm text-neutral-500 dark:text-neutral-400" for="updatedAt"
              >Updated At</label
            >
            <span>{{ dayjs(data.updatedAt).format('MMMM DD, YYYY HH:mm:ss Z') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col w-full">
      <BaseTable
        :headers="headers"
        :datalist="productsData"
        :is-loading="productsStore.isLoading"
        :pagination="pagination"
        @prev-page-event="handleChangePage('prev')"
        @next-page-event="handleChangePage('next')"
        @change-per-page-event="(val: number) => handleChangePerPage(val)"
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
        <template #7="{ data }">
          <div class="flex justify-center gap-2">
            <BaseButton
              variant="vanilla"
              @click="
                () => {
                  $router.push({ name: 'Products Detail', params: { id: data } })
                }
              "
            >
              <i class="pi pi-ellipsis-h" />
            </BaseButton>
          </div>
        </template>
        <template #empty>
          <span class="flex justify-center p-4">No products Found</span>
        </template>
      </BaseTable>
    </div>

    <BaseModals v-if="isDeleteModalVisible" @close-modal-event="handleCloseDeleteModal">
      <div class="flex flex-col gap-4 p-4">
        <span
          >Are you sure you want to delete
          <span class="font-semibold">{{ data?.name }}</span> category?</span
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
    <LoadingFullscreen v-if="categoriesStore.isLoading" />
  </div>
</template>

<script setup lang="ts">
import type { IOptions, IQueryParams } from '@/common/types'
import BaseButton from '@/components/buttons/BaseButton.vue'
import LoadingFullscreen from '@/components/loadings/LoadingFullscreen.vue'
import BaseModals from '@/components/modals/BaseModals.vue'
import BaseTable from '@/components/table/BaseTable.vue'
import type { IBaseTablePagination } from '@/components/table/BaseTablePagination.vue'
import type { ICategory } from '@/interfaces/categories'
import { useCategoriesStore } from '@/stores/categories'
import { useProductsStore } from '@/stores/products'
import dayjs from 'dayjs'
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()
const data: Ref<ICategory> = ref({
  id: NaN,
  name: '',
  image: '',
  creationAt: '',
  updatedAt: ''
})
const isDeleteModalVisible: Ref<boolean> = ref(false)

const perPageOptions: Ref<IOptions[]> = ref([
  { key: '10', value: '10' },
  { key: '15', value: '15' },
  { key: '20', value: '20' }
])

const pagination: Ref<IBaseTablePagination> = ref({
  page: 1,
  perPage: Number(perPageOptions.value[0].key),
  perPageOptions: perPageOptions
})

const headers = ref([
  'ID',
  'Title',
  'Category',
  'Price',
  'Description',
  'Created At',
  'Updated At',
  ''
])

const productsData: ComputedRef<(string | number)[][]> = computed(() => {
  return productsStore.products.map((p) => {
    return [
      p.id,
      p.title,
      p.category.name,
      p.price,
      p.description,
      dayjs(p.creationAt).format('YYYY-MM-DD HH:mm:ss Z'),
      dayjs(p.updatedAt).format('YYYY-MM-DD HH:mm:ss Z'),
      p.id
    ]
  })
})

onMounted(async () => {
  data.value = await categoriesStore.getCategoryById(Number(route.params.id))

  await fetchProducts()
})

const handleCloseDeleteModal = (): void => {
  isDeleteModalVisible.value = false
}

const handleDeleteCategory = async () => {
  handleCloseDeleteModal()

  if (route.params.id) {
    await categoriesStore.deleteCategory(Number(route.params.id))
    isDeleteModalVisible.value = false
  }

  await handleBackToListPage()
}

const handleBackToListPage = () => {
  router.push({ name: 'Categories List' })
}

const fetchProducts = async (): Promise<void> => {
  const queryParams: Ref<IQueryParams> = ref({
    offset: (pagination.value.page - 1) * pagination.value.perPage,
    limit: pagination.value.perPage
  })

  await productsStore.dispatchGetProductsByCategory(queryParams.value, Number(route.params.id))
}

const handleChangePage = (direction: 'prev' | 'next'): void => {
  if (direction === 'prev') {
    if (pagination.value.page > 1) {
      pagination.value.page--
      fetchProducts()
    }
  } else if (direction === 'next') {
    if (
      productsStore.products.length <= pagination.value.perPage &&
      productsStore.products.length !== 0
    ) {
      pagination.value.page++
      fetchProducts()
    }
  }
}

const handleChangePerPage = (perPageVal: number): void => {
  pagination.value.perPage = perPageVal
  fetchProducts()
}
</script>

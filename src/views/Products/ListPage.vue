<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-row justify-between items-center">
      <h1 class="text-2xl font-bold">Products</h1>
      <div class="flex flex-row gap-4">
        <BaseButton variant="outlined" class="w-24" @click="handleExport">
          <i v-if="isLoadingExport" class="pi pi-spinner text-xl animate-spin" />
          <div v-else class="flex flex-row gap-2 items-center">
            <i class="pi pi-download" />
            <span class="text-sm font-semibold">Export</span>
          </div>
        </BaseButton>
        <BaseButton
          variant="filled"
          @click="
            () => {
              $router.push({ name: 'Products Add' })
            }
          "
        >
          <span class="text-sm font-semibold">New Product</span>
        </BaseButton>
      </div>
    </div>

    <div class="flex flex-col text-sm gap-2">
      <span class="font-bold">Filters by</span>
      <div
        class="flex flex-col md:flex-row p-4 gap-4 rounded border border-neutral-800/20 dark:border-neutral-200/20"
      >
        <div class="flex flex-col gap-2">
          <label for="filterByTitle">Search</label>
          <BaseInput
            type="text"
            placeholder="Search by Title"
            id="filterByTitle"
            class="w-56"
            v-model="filters.keyword"
            @change="fetchProducts"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="filterByPrice">Price</label>
          <BaseInput
            type="number"
            placeholder="Type Price Amount"
            id="filterByPrice"
            class="w-56"
            v-model="filters.price"
            @change="fetchProducts"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="filterByCategory">Category</label>
          <BaseDropdown
            id="filterByCategory"
            :options="categoriesOptions"
            :value="filters.categoryId"
            @change="
              (event: Event) => handleChangeCategory((event.target as HTMLSelectElement).value)
            "
          />
        </div>
        <div class="flex items-end">
          <BaseButton
            class="flex items-center px-2 py-1 rounded text-neutral-900 dark:text-neutral-100 hover:bg-neutral-800/10 dark:hover:bg-neutral-200/10 border border-neutral-800/20 dark:border-neutral-200/20"
            variant="nostyle"
            @click="resetFilter"
          >
            <span>Reset filter</span>
          </BaseButton>
        </div>
      </div>
    </div>

    <div class="flex flex-col">
      <BaseTable
        :headers="headers"
        :datalist="data"
        :is-loading="isLoading"
        :pagination="pagination"
        @prev-page-event="handleChangePage('prev')"
        @next-page-event="handleChangePage('next')"
        @change-per-page-event="(val: number) => handleChangePerPage(val)"
      >
        <template #1="{ data }">
          <div class="min-w-32 md:min-w-56">{{ data }}</div>
        </template>
        <template #3="{ data }">
          <span> {{ `$${data}` }} </span>
        </template>
        <template #4="{ data }">
          <span class="line-clamp-2 w-[32rem]"> {{ data }} </span>
        </template>
        <template #5="{ data }">
          <div class="min-w-32">{{ data }}</div>
        </template>
        <template #6="{ data }">
          <div class="min-w-32">{{ data }}</div>
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
            <BaseButton
              variant="vanilla"
              @click="
                () => {
                  $router.push({ name: 'Products Edit', params: { id: data } })
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
          <span class="flex justify-center p-4">No products Found</span>
        </template>
      </BaseTable>
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
import type { IQueryParams } from '@/common/types'
import type { IOptions } from '@/common/types'
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseDropdown from '@/components/dropdowns/BaseDropdown.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import LoadingFullscreen from '@/components/loadings/LoadingFullscreen.vue'
import BaseModals from '@/components/modals/BaseModals.vue'
import BaseTable from '@/components/table/BaseTable.vue'
import type { IBaseTablePagination } from '@/components/table/BaseTablePagination.vue'
import { usePdfGenerator } from '@/composables/usePdfGenerator'
import { useCategoriesStore } from '@/stores/categories'
import { useProductsStore } from '@/stores/products'
import dayjs from 'dayjs'
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue'

const pdfGenerator = usePdfGenerator()
const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()
const isLoading: ComputedRef<boolean> = computed(
  () => productsStore.isLoading || categoriesStore.isLoading
)
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
const isDeleteModalVisible: Ref<boolean> = ref(false)
const deleteId: Ref<number> = ref(NaN)
const isLoadingExport: Ref<boolean> = ref(false)

const data: ComputedRef<(string | number)[][]> = computed(() => {
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

const categoriesOptions: ComputedRef<IOptions[]> = computed(() => {
  return [
    { key: 'all', value: 'All' },
    ...categoriesStore.categories.map((c) => {
      return {
        key: String(c.id),
        value: c.name
      }
    })
  ]
})

const filters: Ref<Record<string, string | number>> = ref({
  keyword: '',
  price: NaN,
  categoryId: categoriesOptions.value[0].key
})

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

onMounted(async () => {
  await fetchProducts()
  await fetchCategories()
})

const fetchProducts = async () => {
  await productsStore.dispatchGetProducts(getQueryParams(true))
}

const fetchCategories = async () => {
  await categoriesStore.dispatchGetCategories()
}

const handleChangePage = (direction: 'prev' | 'next') => {
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

const handleChangePerPage = (perPageVal: number) => {
  pagination.value.perPage = perPageVal
  fetchProducts()
}

const handleChangeCategory = (categoryId: string) => {
  filters.value.categoryId = categoryId
  fetchProducts()
}

const resetFilter = async () => {
  filters.value = {
    keyword: '',
    price: NaN,
    categoryId: categoriesOptions.value[0].key
  }

  await fetchProducts()
}

const handleCloseDeleteModal = (): void => {
  deleteId.value = NaN
  isDeleteModalVisible.value = false
}

const handleDeleteProduct = async () => {
  isDeleteModalVisible.value = false

  if (deleteId.value) {
    await productsStore.deleteProduct(deleteId.value)
    isDeleteModalVisible.value = false
  }

  await fetchProducts()
}

const getQueryParams = (withPagination: boolean = false): IQueryParams => {
  const queryParams: IQueryParams = {}

  if (withPagination) {
    ;(queryParams['offset'] = (pagination.value.page - 1) * pagination.value.perPage),
      (queryParams['limit'] = pagination.value.perPage)
  }

  if (filters.value.categoryId !== categoriesOptions.value[0].key) {
    queryParams['categoryId'] = filters.value.categoryId
  }

  if (filters.value.keyword) {
    queryParams['title'] = filters.value.keyword
  }

  if (filters.value.price) {
    queryParams['price'] = filters.value.price
  }

  return queryParams
}

const handleExport = async (): Promise<void> => {
  isLoadingExport.value = true
  const exportData = await productsStore.getProducts(getQueryParams())

  const headers = ['', 'Title', 'Category', 'Price']

  const pdfData = exportData.map((product, index) => {
    return [String(index + 1), product.title, product.category.name, `$${product.price}`]
  })

  pdfGenerator.generate(
    headers,
    pdfData,
    'Backoffice Products Data',
    `${dayjs().format('YYYY-MM-DD-HH-mm-ss')}-products-data`
  )
  isLoadingExport.value = false
}
</script>

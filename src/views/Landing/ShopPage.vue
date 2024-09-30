<template>
  <div class="shop-page">
    <div class="filter-panel">
      <span class="filter-panel_title">Filters</span>
      <div class="filter-panel_field">
        <label for="filterByTitle">Search</label>
        <LandingInput
          type="text"
          placeholder="Search by Title"
          id="filterByTitle"
          class="w-56"
          v-model="filters.keyword"
          @change="fetchProducts"
        />
      </div>
      <div class="filter-panel_field">
        <label for="filterByTitle">Search</label>
        <LandingInput
          type="number"
          placeholder="Type Price Amount"
          id="filterByPrice"
          class="w-56"
          v-model="filters.price"
          @change="fetchProducts"
        />
      </div>
      <div class="filter-panel_field">
        <label for="filterByCategory">Category</label>
        <LandingDropdown
          id="filterByCategory"
          :options="categoriesOptions"
          :value="filters.categoryId"
          @change="
            (event: Event) => handleChangeCategory((event.target as HTMLSelectElement).value)
          "
        />
      </div>
    </div>
    <div class="product-section">
      <LandingPagination
        v-if="pagination"
        :page="pagination.page"
        :per-page="pagination.perPage"
        :per-page-options="pagination.perPageOptions"
        @prev-page-event="handleChangePage('prev')"
        @next-page-event="handleChangePage('next')"
        @change-per-page-event="(val: number) => handleChangePerPage(val)"
      />
      <span class="product-section__no-data" v-if="products.length === 0">No Data</span>
      <div v-else class="product-cards">
        <LandingProductCard
          v-for="(product, index) in products"
          :key="index"
          :id="product.id"
          :name="product.name"
          :image="product.image"
          :price="product.price"
          @click="() => handleClickProductCard(product.id)"
        />
      </div>
    </div>
  </div>
  <BaseSidepanel
    :visible="panelVisible"
    @close="
      () => {
        panelVisible = false
      }
    "
  >
    <template v-if="!loadingFetchProduct">
      <div class="product-panel">
        <img src="https://picsum.photos/200/300" :alt="product?.title || '-'" />
        <section>
          <span class="product-panel__title">{{ product?.title || '-' }}</span>
        </section>
        <section>
          <label for="productPanelCategory">Category</label>
          <span id="productPanelCategory">{{ product?.category?.name || '-' }}</span>
        </section>
        <section>
          <label for="productPanelDescription">Description</label>
          <span id="productPanelDescription">{{ product?.description || '-' }}</span>
        </section>
      </div>
      <div class="product-panel__footer">
        <span>${{ product?.price || 0 }}</span>
        <LandingButton variant="outlined">
          <dir class="product-panel__footer--btn">
            <i class="pi pi-cart-plus" />
            <span>Add to Cart</span>
          </dir>
        </LandingButton>
      </div>
    </template>
    <LoadingSpinner v-else />
  </BaseSidepanel>
</template>

<script lang="ts" setup>
import type { IOptions, IQueryParams } from '@/common/types'
import LandingButton from '@/components/buttons/LandingButton.vue'
import type { ILandingProductProps } from '@/components/cards/LandingProductCard.vue'
import LandingProductCard from '@/components/cards/LandingProductCard.vue'
import LandingDropdown from '@/components/dropdowns/LandingDropdown.vue'
import LandingInput from '@/components/inputs/LandingInput.vue'
import LoadingSpinner from '@/components/loadings/LoadingSpinner.vue'
import LandingPagination, {
  type ILandingPagination
} from '@/components/Pagination/LandingPagination.vue'
import BaseSidepanel from '@/components/sidepanel/BaseSidepanel.vue'
import type { IProduct } from '@/interfaces/products'
import { useCategoriesStore } from '@/stores/categories'
import { useLoadingStore } from '@/stores/loading'
import { useProductsStore } from '@/stores/products'
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue'

const categoriesStore = useCategoriesStore()
const productsStore = useProductsStore()
const loadingStore = useLoadingStore()
const panelVisible: Ref<boolean> = ref(false)
const loadingFetchProduct: Ref<boolean> = ref(false)
const product: Ref<IProduct | undefined> = ref()

const products: ComputedRef<ILandingProductProps[]> = computed(() => {
  return productsStore.products.map((p) => {
    return {
      id: String(p.id),
      name: p.title,
      price: p.price,
      image: 'https://picsum.photos/200/300'
    }
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

const pagination: Ref<ILandingPagination> = ref({
  page: 1,
  perPage: Number(perPageOptions.value[0].key),
  perPageOptions: perPageOptions
})

onMounted(async () => {
  await fetchProducts()
  await fetchCategories()
})

const fetchProducts = async (): Promise<void> => {
  loadingStore.startLoadingProgress()
  await productsStore.dispatchGetProducts(getQueryParams(true))
  loadingStore.stopLoadingProgress()
}

const fetchCategories = async (): Promise<void> => {
  await categoriesStore.dispatchGetCategories()
}

const fetchProduct = async (id: string): Promise<void> => {
  try {
    loadingFetchProduct.value = true
    const data = await productsStore.getProductById(Number(id))
    product.value = data
  } catch (err) {
    console.error(err)
    product.value = undefined
  } finally {
    loadingFetchProduct.value = false
  }
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

const handleChangeCategory = async (categoryId: string): Promise<void> => {
  filters.value.categoryId = categoryId
  pagination.value.page = 1
  pagination.value.perPage = Number(perPageOptions.value[0].key)
  await fetchProducts()
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

const handleChangePerPage = async (perPageVal: number) => {
  pagination.value.page = 1
  pagination.value.perPage = perPageVal
  await fetchProducts()
}

const handleClickProductCard = async (id: string): Promise<void> => {
  panelVisible.value = true
  await fetchProduct(id)
}
</script>

<style scoped lang="postcss">
.shop-page {
  @apply flex flex-col md:flex-row container mx-auto h-full min-h-screen justify-start py-16 px-4 md:px-0 gap-4 md:gap-8 text-sm;
}

.filter-panel {
  @apply w-full md:w-96 bg-landing-dark-secondary static md:sticky md:top-24 flex flex-col h-fit rounded-lg p-4 gap-4;
}

.product-section {
  @apply flex flex-col gap-4 md:my-8 w-full;
}

.product-cards {
  @apply w-full flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8;
}

.filter-panel_field {
  @apply flex flex-col gap-2;
}

.filter-panel_title {
  @apply text-lg;
}

.product-panel {
  @apply flex flex-col gap-4 font-light p-4;
}

.product-panel > section {
  @apply flex flex-col gap-1;
}

.product-panel label {
  @apply text-sm text-landing-light/50;
}

.product-panel > img {
  @apply w-2/3 aspect-square rounded-md;
}

.product-panel__title {
  @apply text-2xl;
}

.product-panel__category {
  @apply text-landing-light/50;
}

.product-panel__footer {
  @apply fixed bottom-0 p-4 flex flex-row items-center justify-between w-full;
}

.product-panel__footer--btn {
  @apply flex flex-row items-center gap-2 p-0 m-0;
}

.product-section__no-data {
  @apply w-full text-center mt-8;
}
</style>

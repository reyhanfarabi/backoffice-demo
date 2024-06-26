<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-row justify-between items-center">
      <h1 class="text-2xl font-bold">Shop Location</h1>
      <div class="flex flex-row gap-4">
        <BaseButton variant="filled">
          <span
            class="text-sm font-semibold"
            @click="
              () => {
                isAddModalVisible = true
              }
            "
            >New Shop Location</span
          >
        </BaseButton>
      </div>
    </div>

    <div ref="map" class="w-full h-96 z-0"></div>

    <div class="flex flex-col w-full">
      <BaseTable
        :headers="headers"
        :datalist="data"
        :is-loading="false"
        :pagination="pagination"
        @prev-page-event="handleChangePage('prev')"
        @next-page-event="handleChangePage('next')"
        @change-per-page-event="(val: number) => handleChangePerPage(val)"
      >
        <template #1="{ data }">
          <div class="min-w-56">{{ data }}</div>
        </template>
        <template #2="{ data }">
          <BaseButton
            class="min-w-32"
            variant="filled"
            @click="handleShowOnMap(data.latitude, data.longitude)"
            >Show on Map</BaseButton
          >
        </template>
        <template #3="{ data }">
          <div class="min-w-32">{{ data }}</div>
        </template>
        <template #4="{ data }">
          <div class="min-w-32">{{ data }}</div>
        </template>
        <template #5="{ data }">
          <div class="flex justify-center gap-2">
            <BaseButton
              variant="vanilla"
              @click="
                () => {
                  $router.push({ name: 'Shops Detail', params: { id: data } })
                }
              "
            >
              <i class="pi pi-ellipsis-h" />
            </BaseButton>
            <BaseButton
              variant="vanilla"
              @click="
                () => {
                  $router.push({ name: 'Shops Edit', params: { id: data } })
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
          <span class="flex justify-center p-4">No Shop Found</span>
        </template>
      </BaseTable>
    </div>

    <AddModal
      class="z-50"
      v-if="isAddModalVisible"
      @close-button-event="
        () => {
          isAddModalVisible = false
        }
      "
    />

    <BaseModals v-if="isDeleteModalVisible" @close-modal-event="handleCloseDeleteModal">
      <LoadingSpinner v-if="shopsStore.isLoading" />

      <div v-else class="flex flex-col gap-4 p-4">
        <span
          >Are you sure you want to delete
          <span class="font-semibold">{{ getShopNameById() }}</span> shop location?</span
        >
        <div class="flex flex-row gap-2">
          <BaseButton class="flex-1" variant="filled" @click="handleCloseDeleteModal"
            >Cancel</BaseButton
          >
          <BaseButton class="flex-1" variant="outlined" @click="handleDeleteShop">Yes</BaseButton>
        </div>
      </div>
    </BaseModals>

    <LoadingFullscreen v-if="false" />
  </div>
</template>

<script setup lang="ts">
import type { ICoordinate, IOptions } from '@/common/types'
import BaseButton from '@/components/buttons/BaseButton.vue'
import LoadingFullscreen from '@/components/loadings/LoadingFullscreen.vue'
import BaseTable from '@/components/table/BaseTable.vue'
import { useLeafletMap } from '@/composables/useLeafletMap'
import type { IShop } from '@/interfaces/shops'
import { useShopsStore } from '@/stores/shops'
import dayjs from 'dayjs'
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue'
import AddModal from './components/AddModal.vue'
import BaseModals from '@/components/modals/BaseModals.vue'
import type { IBaseTablePagination } from '@/components/table/BaseTablePagination.vue'

const shopsStore = useShopsStore()
const leafletMap = useLeafletMap()
const map: Ref<HTMLDivElement | null> = ref(null)
const isAddModalVisible: Ref<boolean> = ref(false)
const isDeleteModalVisible: Ref<boolean> = ref(false)
const deleteId: Ref<string> = ref('')

const headers = ref(['#', 'Name', 'Location', 'Created At', 'Updated At', ''])

const data: ComputedRef<(string | number | ICoordinate)[][]> = computed(() => {
  return shopsStore.getShops().map((s: IShop, index: number) => {
    return [
      index + 1 + (pagination.value.page - 1) * pagination.value.perPage,
      s.name,
      s.coordinate,
      dayjs(s.createdAt).format('YYYY-MM-DD HH:mm:ss Z'),
      dayjs(s.updatedAt).format('YYYY-MM-DD HH:mm:ss Z'),
      s.id
    ]
  })
})

const perPageOptions: Ref<IOptions[]> = ref([
  { key: '5', value: '5' },
  { key: '10', value: '10' },
  { key: '20', value: '20' }
])

const pagination: Ref<IBaseTablePagination> = ref({
  page: 1,
  perPage: Number(perPageOptions.value[0].key),
  perPageOptions: perPageOptions
})

onMounted(() => {
  leafletMap.init(map.value)
})

const handleShowOnMap = (lat: number, long: number): void => {
  leafletMap.showCoordinateOnMap(lat, long)
}

const handleCloseDeleteModal = (): void => {
  deleteId.value = ''
  isDeleteModalVisible.value = false
}

const getShopNameById = (): string => {
  return shopsStore.getShops().find((s) => s.id === deleteId.value)?.name || ''
}

const handleDeleteShop = (): void => {
  if (!deleteId.value) return
  shopsStore.deleteShop(deleteId.value)
  isDeleteModalVisible.value = false
}

const handleChangePage = (direction: 'prev' | 'next') => {
  if (direction === 'prev') {
    if (pagination.value.page > 1) {
      pagination.value.page--
      shopsStore.setPaginationData(pagination.value.page, pagination.value.perPage)
    }
  } else if (direction === 'next') {
    if (
      shopsStore.getShops().length <= pagination.value.perPage &&
      shopsStore.getShops().length !== 0
    ) {
      pagination.value.page++
      shopsStore.setPaginationData(pagination.value.page, pagination.value.perPage)
    }
  }
}

const handleChangePerPage = (perPageVal: number) => {
  pagination.value.perPage = perPageVal
  shopsStore.setPaginationData(pagination.value.page, pagination.value.perPage)
}
</script>

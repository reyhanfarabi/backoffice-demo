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
                $router.push({ name: 'Shops Edit', params: { id: $route.params.id } })
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

    <div class="flex flex-col gap-8 p-8 rounded bg-white dark:bg-neutral-800 shadow">
      <h1 class="text-2xl font-bold">Detail Shop</h1>

      <div class="flex flex-col lg:flex-row gap-8 w-full">
        <div class="flex-1 flex flex-col gap-4">
          <div ref="map" class="w-full h-80 z-0"></div>
        </div>

        <div class="flex-1 flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-sm text-neutral-500 dark:text-neutral-400" for="id">ID</label>
            <span>{{ data.id }}</span>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm text-neutral-500 dark:text-neutral-400" for="name">Name</label>
            <span>{{ data.name }}</span>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm text-neutral-500 dark:text-neutral-400" for="createdAt"
              >Created At</label
            >
            <span>{{ dayjs(data.createdAt).format('MMMM DD, YYYY HH:mm:ss Z') }}</span>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm text-neutral-500 dark:text-neutral-400" for="updatedAt"
              >Updated At</label
            >
            <span>{{ dayjs(data.updatedAt).format('MMMM DD, YYYY HH:mm:ss Z') }}</span>
          </div>
        </div>
      </div>
    </div>

    <BaseModals v-if="isDeleteModalVisible" @close-modal-event="handleCloseDeleteModal">
      <div class="flex flex-col gap-4 p-4">
        <span>Are you sure you want to delete this shop?</span>
        <div class="flex flex-row gap-2">
          <BaseButton class="flex-1" variant="filled" @click="handleCloseDeleteModal"
            >Cancel</BaseButton
          >
          <BaseButton class="flex-1" variant="outlined" @click="handleDeleteShop">Yes</BaseButton>
        </div>
      </div>
    </BaseModals>

    <LoadingFullscreen v-if="shopStore.isLoading" />
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue'
import LoadingFullscreen from '@/components/loadings/LoadingFullscreen.vue'
import BaseModals from '@/components/modals/BaseModals.vue'
import { useLeafletMap } from '@/composables/useLeafletMap'
import type { IShop } from '@/interfaces/shops'
import { useShopsStore } from '@/stores/shops'
import dayjs from 'dayjs'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const shopStore = useShopsStore()
const leafletMap = useLeafletMap()
const map: Ref<HTMLDivElement | null> = ref(null)
const isDeleteModalVisible: Ref<boolean> = ref(false)

const data: Ref<IShop> = ref({
  id: '',
  name: '',
  coordinate: {
    latitude: NaN,
    longitude: NaN
  },
  createdAt: new Date(),
  updatedAt: new Date()
})

onMounted(async () => {
  const shop = shopStore.getShopById(String(route.params.id))
  if (shop) data.value = shop

  leafletMap.init(map.value, data.value.coordinate)
  leafletMap.showCoordinateOnMap(data.value.coordinate.latitude, data.value.coordinate.longitude)
})

const handleBackToListPage = () => {
  router.push({ name: 'Shops List' })
}

const handleCloseDeleteModal = (): void => {
  isDeleteModalVisible.value = false
}

const handleDeleteShop = async () => {
  handleCloseDeleteModal()

  if (route.params.id) {
    shopStore.deleteShop(String(route.params.id))
    isDeleteModalVisible.value = false
  }

  await handleBackToListPage()
}
</script>

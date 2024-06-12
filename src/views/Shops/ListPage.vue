<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-row justify-between items-center">
      <h1 class="text-2xl font-bold">Shop Location</h1>
      <div class="flex flex-row gap-4">
        <!-- <BaseButton variant="filled">
          <span class="text-sm font-semibold">New Shop Location</span>
        </BaseButton> -->
      </div>
    </div>

    <div ref="map" class="w-full h-96"></div>

    <div class="flex flex-col w-full">
      <BaseTable :headers="headers" :datalist="data" :is-loading="false">
        <template #2="{ data }">
          <BaseButton variant="filled" @click="handleShowOnMap(data.latitude, data.longitude)"
            >Show on Map</BaseButton
          >
        </template>
        <template #5="{}">
          <div class="flex justify-center gap-2">
            <BaseButton variant="vanilla">
              <i class="pi pi-ellipsis-h" />
            </BaseButton>
            <BaseButton variant="vanilla">
              <i class="pi pi-pencil" />
            </BaseButton>
            <BaseButton
              class="p-2 rounded text-neutral-100 bg-red-500 dark:bg-red-600 hover:bg-red-500/80 dark:hover:bg-red-600/80"
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

    <LoadingFullscreen v-if="false" />
  </div>
</template>

<script setup lang="ts">
import type { ICoordinate } from '@/common/types'
import BaseButton from '@/components/buttons/BaseButton.vue'
import LoadingFullscreen from '@/components/loadings/LoadingFullscreen.vue'
import BaseTable from '@/components/table/BaseTable.vue'
import { useLeafletMap } from '@/composables/useLeafletMap'
import type { IShop } from '@/interfaces/shops'
import { useShopsStore } from '@/stores/shops'
import dayjs from 'dayjs'
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue'

const shopsStore = useShopsStore()
const leafletMap = useLeafletMap()
const map: Ref<HTMLDivElement | null> = ref(null)

const headers = ref(['#', 'Name', 'Location', 'Created At', 'Updated At', ''])

const data: ComputedRef<(string | number | ICoordinate)[][]> = computed(() => {
  return shopsStore.getShops().map((s: IShop, index: number) => {
    return [
      index + 1,
      s.name,
      s.coordinate,
      dayjs(s.createdAt).format('YYYY-MM-DD HH:mm:ss Z'),
      dayjs(s.updatedAt).format('YYYY-MM-DD HH:mm:ss Z'),
      s.id
    ]
  })
})

onMounted(() => {
  leafletMap.init(map.value)
})

const handleShowOnMap = (lat: number, long: number): void => {
  leafletMap.showCoordinateOnMap(lat, long)
}
</script>
<template>
  <div class="flex flex-col gap-8 pb-20">
    <BaseButton
      class="flex items-center gap-2 w-fit text-xs"
      variant="outlined"
      @click="handleBackToListPage"
    >
      <i class="pi pi-arrow-left" />
    </BaseButton>

    <div class="flex flex-col gap-8 p-8 rounded bg-white dark:bg-neutral-800 shadow">
      <div class="flex flex-row justify-between items-center">
        <h1 class="text-2xl font-bold">Edit Shop</h1>
        <BaseButton
          class="self-end w-28"
          variant="filled"
          @click="handleOpenEditModal"
          :disabled="shopStore.isLoading"
        >
          <span>Save</span>
        </BaseButton>
      </div>

      <div class="grid grid-cols-2 gap-8 w-full">
        <div class="col-span-1 flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-sm" for="name">Location</label>
            <div ref="map" class="w-full h-80 z-0"></div>
          </div>
        </div>

        <div class="col-span-1 flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <label class="text-sm text-neutral-200/80" for="id">ID</label>
            <span>{{ data.id }}</span>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm text-neutral-200/80" for="name">Name</label>
            <BaseInput
              type="text"
              name="nameField"
              id="name"
              v-model="data.name"
              :is-error="$v.name.$error"
              :error-message="$v.name.$error ? $v.name.$errors[0].$message.toString() : ''"
              @change="
                (event: Event) => {
                  data.name = (event.target as HTMLInputElement).value
                }
              "
            />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm text-neutral-200/80" for="createdAt">Created At</label>
            <span>{{ dayjs(data.createdAt).format('MMMM DD, YYYY HH:mm:ss Z') }}</span>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm text-neutral-200/80" for="updatedAt">Updated At</label>
            <span>{{ dayjs(data.updatedAt).format('MMMM DD, YYYY HH:mm:ss Z') }}</span>
          </div>
        </div>
      </div>
    </div>

    <BaseModals v-if="isConfirmModalVisible" @close-modal-event="handleCloseEditModal">
      <div class="flex flex-col gap-4 p-4">
        <span>Are you sure you want to edit this shop?</span>
        <div class="flex flex-row gap-2">
          <BaseButton class="flex-1" variant="filled" @click="handleCloseEditModal"
            >Cancel</BaseButton
          >
          <BaseButton class="flex-1" variant="outlined" @click="handleSave">Yes</BaseButton>
        </div>
      </div>
    </BaseModals>

    <LoadingFullscreen v-if="shopStore.isLoading" />
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import LoadingFullscreen from '@/components/loadings/LoadingFullscreen.vue'
import BaseModals from '@/components/modals/BaseModals.vue'
import { useLeafletMap } from '@/composables/useLeafletMap'
import type { IShop } from '@/interfaces/shops'
import { useShopsStore } from '@/stores/shops'
import useVuelidate from '@vuelidate/core'
import { helpers, minLength, required } from '@vuelidate/validators'
import dayjs from 'dayjs'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const shopStore = useShopsStore()
const leafletMap = useLeafletMap()
const map: Ref<HTMLDivElement | null> = ref(null)
const isConfirmModalVisible: Ref<boolean> = ref(false)

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

const rules = {
  name: {
    required: helpers.withMessage('Name field cannot be empty', required),
    minLength: helpers.withMessage('Name must be at least 3 characters', minLength(3))
  }
}

const $v = useVuelidate(rules, data)

onMounted(async () => {
  const shop = shopStore.getShopById(String(route.params.id))
  if (shop) data.value = shop

  leafletMap.init(map.value, data.value.coordinate)
  leafletMap.showCoordinateOnMap(data.value.coordinate.latitude, data.value.coordinate.longitude)
})

const handleBackToListPage = () => {
  router.push({ name: 'Shops List' })
}

const handleSave = async () => {
  handleCloseEditModal()
  const result = await $v.value.$validate()

  if (result) {
    shopStore.updateShop(String(route.params.id), {
      name: data.value.name,
      coordinate: leafletMap.getCenterMapCoordinate()
    })

    handleBackToListPage()
  }
}

const handleOpenEditModal = async () => {
  await $v.value.$validate()

  if (!$v.value.$error) {
    isConfirmModalVisible.value = true
  }
}

const handleCloseEditModal = (): void => {
  isConfirmModalVisible.value = false
}
</script>

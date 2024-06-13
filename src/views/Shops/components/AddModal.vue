<template>
  <BaseModals>
    <div class="flex flex-col w-[48rem]">
      <BaseButton variant="vanilla" class="self-end" @click="handleCloseAddModal">
        <i class="pi pi-times" />
      </BaseButton>

      <div class="flex flex-col gap-8 p-4 pt-0">
        <span class="text-2xl font-bold">Add New Shop Location</span>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-sm" for="name">Name</label>
            <BaseInput
              class="w-96"
              type="text"
              name="nameField"
              id="name"
              v-model="newData.name"
              :is-error="$v.name.$error"
              :error-message="$v.name.$error ? $v.name.$errors[0].$message.toString() : ''"
              @change="
                (event: Event) => {
                  newData.name = (event.target as HTMLInputElement).value
                }
              "
            />
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-2">
              <label class="text-sm" for="name">Location</label>
              <div ref="map" class="w-full h-80 z-0"></div>
            </div>
          </div>
        </div>
        <BaseButton
          variant="filled"
          @click="handleOpenConfirmModal"
          :disabled="shopsStore.isLoading"
        >
          <span>Save</span>
        </BaseButton>
      </div>
    </div>

    <BaseModals
      class="z-50"
      v-if="isConfirmSaveModalVisible"
      @close-modal-event="handleCloseConfirmSaveModal"
    >
      <div class="flex flex-col gap-4 p-4">
        <span class="text-xl font-bold">Save New Shop Location?</span>
        <span
          >Are you sure you want to add <span class="font-semibold">{{ newData.name }}</span> new
          shop location?</span
        >
        <div class="flex flex-row gap-2">
          <BaseButton class="flex-1" variant="filled" @click="handleCloseConfirmSaveModal"
            >Cancel</BaseButton
          >
          <BaseButton class="flex-1" variant="outlined" @click="handleSave">Yes</BaseButton>
        </div>
      </div>
    </BaseModals>

    <BaseModals
      class="z-50"
      v-if="isConfirmCloseModalVisible"
      @close-modal-event="
        () => {
          isConfirmCloseModalVisible = false
        }
      "
    >
      <div class="flex flex-col gap-4 p-4">
        <span class="text-xl font-bold">Unsaved Changes</span>
        <span>You have unsaved changes. Are you sure you want to continue without saving?</span>
        <div class="flex flex-row gap-2">
          <BaseButton
            class="flex-1"
            variant="filled"
            @click="
              () => {
                isConfirmCloseModalVisible = false
              }
            "
            >Cancel
          </BaseButton>
          <BaseButton class="flex-1" variant="outlined" @click="emit('closeButtonEvent')"
            >Yes</BaseButton
          >
        </div>
      </div>
    </BaseModals>

    <LoadingFullscreen v-if="shopsStore.isLoading" />
  </BaseModals>
</template>

<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import LoadingFullscreen from '@/components/loadings/LoadingFullscreen.vue'
import BaseModals from '@/components/modals/BaseModals.vue'
import { useLeafletMap } from '@/composables/useLeafletMap'
import type { IShopPayload } from '@/interfaces/shops'
import { useShopsStore } from '@/stores/shops'
import useVuelidate from '@vuelidate/core'
import { helpers, minLength, required } from '@vuelidate/validators'
import { onMounted, ref, watch, type Ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const shopsStore = useShopsStore()
const leafletMap = useLeafletMap()
const map: Ref<HTMLDivElement | null> = ref(null)
const isConfirmSaveModalVisible: Ref<boolean> = ref(false)
const isConfirmCloseModalVisible: Ref<boolean> = ref(false)
const isFormChanged: Ref<boolean> = ref(false)
const emit = defineEmits(['closeButtonEvent'])

const newData: Ref<IShopPayload> = ref({
  name: '',
  coordinate: {
    latitude: NaN,
    longitude: NaN
  }
})

watch(
  newData.value,
  () => {
    isFormChanged.value = true
  },
  { deep: true }
)

onMounted(() => {
  leafletMap.init(map.value)
  leafletMap.setMarkerCenterMap()
})

const rules = {
  name: {
    required: helpers.withMessage('Name field cannot be empty', required),
    minLength: helpers.withMessage('Name must be at least 3 characters', minLength(3))
  }
}

const $v = useVuelidate(rules, newData)

const handleBackToListPage = async (): Promise<void> => {
  router.push({ name: 'Shops List' })
}

const handleSave = async (): Promise<void> => {
  handleCloseConfirmSaveModal()
  const result = await $v.value.$validate()

  if (result) {
    shopsStore.addNewShopLocation({
      name: newData.value.name.trim(),
      coordinate: leafletMap.getCenterMapCoordinate()
    })
    emit('closeButtonEvent')
    handleBackToListPage()
  }
}

const handleOpenConfirmModal = async (): Promise<void> => {
  await $v.value.$validate()

  if (!$v.value.$error) {
    isConfirmSaveModalVisible.value = true
  }
}

const handleCloseConfirmSaveModal = (): void => {
  isConfirmSaveModalVisible.value = false
}

const handleCloseAddModal = (): void => {
  if (isFormChanged.value) {
    isConfirmCloseModalVisible.value = true
  } else {
    emit('closeButtonEvent')
  }
}
</script>

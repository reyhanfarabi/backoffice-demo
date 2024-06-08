<template>
  <BaseModals>
    <div class="flex flex-col w-[32rem]">
      <BaseButton variant="vanilla" class="self-end" @click="handleCloseAddModal">
        <i class="pi pi-times" />
      </BaseButton>

      <div class="flex flex-col gap-8 p-4 pt-0">
        <span class="text-2xl font-bold">Add New Category</span>
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
              <label class="text-sm" for="name">Image</label>
              <BaseInput
                class="w-96"
                type="text"
                name="nameField"
                id="name"
                v-model="newData.image"
                :is-error="$v.image.$error"
                :error-message="$v.image.$error ? $v.image.$errors[0].$message.toString() : ''"
                @change="
                  (event: Event) => {
                    newData.image = (event.target as HTMLInputElement).value
                  }
                "
              />
            </div>
            <img
              v-if="newData.image && !$v.image.$error"
              :src="newData.image"
              class="w-36 rounded border border-neutral-300 dark:border-neutral-700"
              alt="New Category Image"
            />
          </div>
        </div>
        <BaseButton
          variant="filled"
          @click="handleOpenConfirmModal"
          :disabled="categoriesStore.isLoading"
        >
          <span>Save</span>
        </BaseButton>
      </div>
    </div>

    <BaseModals v-if="isConfirmSaveModalVisible" @close-modal-event="handleCloseConfirmSaveModal">
      <div class="flex flex-col gap-4 p-4">
        <span class="text-xl font-bold">Save New Category?</span>
        <span
          >Are you sure you want to add
          <span class="font-semibold">{{ newData.name }}</span> category?</span
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

    <LoadingFullscreen v-if="categoriesStore.isLoading" />
  </BaseModals>
</template>

<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import LoadingFullscreen from '@/components/loadings/LoadingFullscreen.vue'
import BaseModals from '@/components/modals/BaseModals.vue'
import type { ICategoryPayload } from '@/interfaces/categories'
import { useCategoriesStore } from '@/stores/categories'
import useVuelidate from '@vuelidate/core'
import { helpers, minLength, required, url } from '@vuelidate/validators'
import { ref, watch, type Ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const categoriesStore = useCategoriesStore()
const isConfirmSaveModalVisible: Ref<boolean> = ref(false)
const isConfirmCloseModalVisible: Ref<boolean> = ref(false)
const isFormChanged: Ref<boolean> = ref(false)
const emit = defineEmits(['closeButtonEvent'])

const newData: Ref<ICategoryPayload> = ref({
  name: '',
  image: ''
})

watch(
  newData.value,
  () => {
    isFormChanged.value = true
  },
  { deep: true }
)

const rules = {
  name: {
    required: helpers.withMessage('Name field cannot be empty', required),
    minLength: helpers.withMessage('Name must be at least 3 characters', minLength(3))
  },
  image: {
    required: helpers.withMessage('Image field cannot be empty', required),
    url: helpers.withMessage('Image must be in a form of url', url)
  }
}

const $v = useVuelidate(rules, newData)

const handleBackToListPage = async (): Promise<void> => {
  router.push({ name: 'Categories List' })
  await categoriesStore.dispatchGetCategories()
}

const handleSave = async (): Promise<void> => {
  handleCloseConfirmSaveModal()
  const result = await $v.value.$validate()

  if (result) {
    await categoriesStore.addCategory({
      name: newData.value.name.trim(),
      image: newData.value.image.trim()
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

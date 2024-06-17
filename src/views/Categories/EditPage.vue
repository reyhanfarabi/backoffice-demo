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
        <h1 class="text-2xl font-bold">Edit Categories</h1>
        <BaseButton
          class="self-end w-28"
          variant="filled"
          @click="handleOpenAddModal"
          :disabled="categoriesStore.isLoading"
        >
          <span>Save</span>
        </BaseButton>
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="text-sm text-neutral-500 dark:text-neutral-400" for="name">Name</label>
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
          <div class="flex flex-col gap-2">
            <label class="text-sm text-neutral-500 dark:text-neutral-400" for="name">Image</label>
            <BaseInput
              type="text"
              name="imageField"
              id="image"
              v-model="data.image"
              :is-error="$v.image.$error"
              :error-message="$v.image.$error ? $v.image.$errors[0].$message.toString() : ''"
              @change="
                (event: Event) => {
                  data.image = (event.target as HTMLInputElement).value
                }
              "
            />
          </div>
          <img
            v-if="data.image && !$v.image.$error"
            :src="data.image"
            class="w-36 rounded border border-neutral-300 dark:border-neutral-700"
            alt="New Category Image"
          />
        </div>
      </div>
    </div>

    <BaseModals v-if="isConfirmModalVisible" @close-modal-event="handleCloseAddModal">
      <div class="flex flex-col gap-4 p-4">
        <span
          >Are you sure you want to edit
          <span class="font-semibold">{{ data.name }}</span> category?</span
        >
        <div class="flex flex-row gap-2">
          <BaseButton class="flex-1" variant="filled" @click="handleCloseAddModal"
            >Cancel</BaseButton
          >
          <BaseButton class="flex-1" variant="outlined" @click="handleSave">Yes</BaseButton>
        </div>
      </div>
    </BaseModals>

    <LoadingFullscreen v-if="categoriesStore.isLoading" />
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import LoadingFullscreen from '@/components/loadings/LoadingFullscreen.vue'
import BaseModals from '@/components/modals/BaseModals.vue'
import type { ICategory } from '@/interfaces/categories'
import { useCategoriesStore } from '@/stores/categories'
import useVuelidate from '@vuelidate/core'
import { helpers, minLength, required, url } from '@vuelidate/validators'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const categoriesStore = useCategoriesStore()
const isConfirmModalVisible: Ref<boolean> = ref(false)

const data: Ref<ICategory> = ref({
  id: NaN,
  name: '',
  image: '',
  creationAt: '',
  updatedAt: ''
})

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

const $v = useVuelidate(rules, data)

onMounted(async () => {
  data.value = await categoriesStore.getCategoryById(Number(route.params.id))
})

const handleBackToListPage = () => {
  router.push({ name: 'Categories List' })
}

const handleSave = async () => {
  handleCloseAddModal()
  const result = await $v.value.$validate()

  if (result) {
    await categoriesStore.updateCategory(Number(route.params.id), {
      name: data.value.name.trim(),
      image: data.value.image.trim()
    })
    handleBackToListPage()
  }
}

const handleOpenAddModal = async () => {
  await $v.value.$validate()

  if (!$v.value.$error) {
    isConfirmModalVisible.value = true
  }
}

const handleCloseAddModal = (): void => {
  isConfirmModalVisible.value = false
}
</script>

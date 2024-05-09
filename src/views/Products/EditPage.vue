<template>
  <div class="flex flex-col gap-8 pb-20">
    <BaseButton
      class="flex items-center gap-2 w-fit text-xs"
      type="outlined"
      @click="handleBackToListPage"
    >
      <i class="pi pi-arrow-left" />
    </BaseButton>

    <div class="flex flex-col p-8 gap-8 rounded shadow bg-white dark:bg-neutral-800">
      <div class="flex flex-row justify-between items-center">
        <h1 class="text-2xl font-bold">Edit Product</h1>
        <BaseButton
          class="self-end w-28"
          type="filled"
          @click="handleOpenAddModal"
          :disabled="productsStore.isLoading"
        >
          <span>Save</span>
        </BaseButton>
      </div>

      <div class="flex flex-row gap-8 pb-10">
        <div class="flex flex-col gap-4 w-1/2">
          <div class="flex flex-col gap-2">
            <label class="text-sm" for="title">Title</label>
            <BaseInput
              type="text"
              name="titleField"
              id="title"
              v-model="data.title"
              :is-error="$v.title.$error"
              :error-message="$v.title.$error ? $v.title.$errors[0].$message.toString() : ''"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm" for="price">Price</label>
            <BaseInput
              type="number"
              name="priceField"
              id="price"
              v-model="data.price"
              :is-error="$v.price.$error"
              :error-message="$v.price.$error ? $v.price.$errors[0].$message.toString() : ''"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm" for="description">Description</label>
            <BaseTextArea
              name="descriptionField"
              id="description"
              v-model="data.description"
              :is-error="$v.description.$error"
              :error-message="
                $v.description.$error ? $v.description.$errors[0].$message.toString() : ''
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <BaseModals v-if="isConfirmModalVisible" @close-modal-event="handleCloseAddModal">
    <div class="flex flex-col gap-4 p-4">
      <span
        >Are you sure you want to edit
        <span class="font-semibold">{{ data.title }}</span> category?</span
      >
      <div class="flex flex-row gap-2">
        <BaseButton class="flex-1" type="filled" @click="handleCloseAddModal">Cancel</BaseButton>
        <BaseButton class="flex-1" type="outlined" @click="handleSave">Yes</BaseButton>
      </div>
    </div>
  </BaseModals>

  <LoadingFullscreen v-if="productsStore.isLoading" />
</template>

<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import BaseTextArea from '@/components/inputs/BaseTextArea.vue'
import LoadingFullscreen from '@/components/loadings/LoadingFullscreen.vue'
import BaseModals from '@/components/modals/BaseModals.vue'
import type { IProduct } from '@/interfaces/products'
import type { IProductUpdatePayload } from '@/interfaces/products'
import { useProductsStore } from '@/stores/products'
import useVuelidate from '@vuelidate/core'
import { helpers, minLength, numeric, required } from '@vuelidate/validators'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const isConfirmModalVisible: Ref<boolean> = ref(false)

const data: Ref<IProductUpdatePayload> = ref({
  title: '',
  price: NaN,
  description: ''
})

const rules = {
  title: {
    required: helpers.withMessage('Title field cannot be empty', required),
    minLength: helpers.withMessage('Title must be at least 3 characters', minLength(3))
  },
  price: {
    required: helpers.withMessage('Price field cannot be empty', required),
    numeric: helpers.withMessage('Price must be numeric', numeric)
  },
  description: {
    required: helpers.withMessage('Description field cannot be empty', required),
    minLength: helpers.withMessage('Description must be at least 3 characters', minLength(3))
  }
}

const $v = useVuelidate(rules, data)

onMounted(async () => {
  const result: IProduct = await productsStore.getProductById(Number(route.params.id))

  if (result) {
    mapProduct(result)
  }
})

const handleBackToListPage = (): void => {
  router.push({ name: 'Products List' })
}

const handleSave = async (): Promise<void> => {
  handleCloseAddModal()
  const result = await $v.value.$validate()

  if (result) {
    await productsStore.updateProduct(Number(route.params.id), {
      title: data.value.title.trim(),
      price: data.value.price,
      description: data.value.description.trim()
    })
    handleBackToListPage()
  }
}

const handleOpenAddModal = async (): Promise<void> => {
  await $v.value.$validate()

  if (!$v.value.$error) {
    isConfirmModalVisible.value = true
  }
}

const handleCloseAddModal = (): void => {
  isConfirmModalVisible.value = false
}

const mapProduct = (fetchedData: IProduct): void => {
  data.value.title = fetchedData.title
  data.value.price = fetchedData.price
  data.value.description = fetchedData.description
}
</script>

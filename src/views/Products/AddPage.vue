<template>
  <div class="flex flex-col gap-8 pb-20">
    <BaseButton
      class="flex items-center gap-2 w-fit text-xs"
      variant="outlined"
      @click="handleBackToListPage"
    >
      <i class="pi pi-arrow-left" />
    </BaseButton>

    <div class="flex flex-col p-8 gap-8 rounded shadow bg-white dark:bg-neutral-800">
      <div class="flex flex-row justify-between items-center">
        <h1 class="text-2xl font-bold">Add Product</h1>
        <BaseButton
          class="self-end w-28"
          variant="filled"
          @click="handleOpenAddModal"
          :disabled="productsStore.isLoading"
        >
          <span>Save</span>
        </BaseButton>
      </div>

      <div class="flex flex-col md:flex-row gap-8 pb-10">
        <div class="flex flex-col gap-4 md:w-1/2">
          <div class="flex flex-col gap-2">
            <label class="text-sm" for="title">Title</label>
            <BaseInput
              type="text"
              name="titleField"
              id="title"
              v-model="newData.title"
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
              v-model="newData.price"
              :is-error="$v.price.$error"
              :error-message="$v.price.$error ? $v.price.$errors[0].$message.toString() : ''"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm" for="description">Description</label>
            <BaseTextArea
              name="descriptionField"
              id="description"
              v-model="newData.description"
              :is-error="$v.description.$error"
              :error-message="
                $v.description.$error ? $v.description.$errors[0].$message.toString() : ''
              "
            />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm" for="category">Category</label>
            <BaseDropdown
              name="categoryField"
              id="category"
              :options="categoriesOptions"
              @change="
                (event: Event) => handleChangeCategory((event.target as HTMLSelectElement).value)
              "
            />
          </div>
        </div>

        <div class="flex flex-col gap-4 md:w-1/2">
          <div class="flex flex-col gap-2">
            <label class="text-sm" for="images">Images</label>
            <div
              v-for="(_, index) in newData.images"
              :key="index"
              class="flex flex-row w-full gap-2"
            >
              <BaseInput
                class="w-full"
                type="text"
                name="imagesField"
                id="images"
                v-model="newData.images[index]"
                :is-error="$v.images.$error"
                :error-message="$v.images.$error ? $v.images.$errors[0].$message.toString() : ''"
              />
              <BaseButton
                v-if="newData.images.length > 1"
                class="p-2 h-fit rounded text-neutral-100 bg-red-500 dark:bg-red-600 hover:bg-red-500/80 dark:hover:bg-red-600/80"
                @click="
                  () => {
                    handleRemoveImageByIndex(index)
                  }
                "
              >
                <i class="pi pi-trash text-white" />
              </BaseButton>
            </div>
            <BaseButton
              class="flex items-center gap-2"
              variant="filled"
              @click="
                () => {
                  newData.images.push('')
                }
              "
            >
              <i class="pi pi-plus text-white" />
              <span>Add Image</span>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>

  <BaseModals v-if="isConfirmModalVisible" @close-modal-event="handleCloseAddModal">
    <div class="flex flex-col gap-4 p-4">
      <span
        >Are you sure you want to add
        <span class="font-semibold">{{ newData.title }}</span> category?</span
      >
      <div class="flex flex-row gap-2">
        <BaseButton class="flex-1" variant="filled" @click="handleCloseAddModal">Cancel</BaseButton>
        <BaseButton class="flex-1" variant="outlined" @click="handleSave">Yes</BaseButton>
      </div>
    </div>
  </BaseModals>

  <LoadingFullscreen v-if="productsStore.isLoading" />
</template>

<script setup lang="ts">
import type { IOptions } from '@/common/types'
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseDropdown from '@/components/dropdowns/BaseDropdown.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import BaseTextArea from '@/components/inputs/BaseTextArea.vue'
import LoadingFullscreen from '@/components/loadings/LoadingFullscreen.vue'
import BaseModals from '@/components/modals/BaseModals.vue'
import type { IProductAddPayload } from '@/interfaces/products'
import { useCategoriesStore } from '@/stores/categories'
import { useProductsStore } from '@/stores/products'
import useVuelidate from '@vuelidate/core'
import { helpers, minLength, numeric, required } from '@vuelidate/validators'
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()
const isConfirmModalVisible: Ref<boolean> = ref(false)

const categoriesOptions: ComputedRef<IOptions[]> = computed(() => {
  return [
    ...categoriesStore.categories.map((c) => {
      return {
        key: String(c.id),
        value: c.name
      }
    })
  ]
})

const newData: Ref<IProductAddPayload> = ref({
  title: '',
  price: NaN,
  description: '',
  categoryId: NaN,
  images: ['']
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
  },
  categoryId: {
    required: helpers.withMessage('Category field cannot be empty', required)
  },
  images: {
    required: helpers.withMessage('Images field cannot be empty', required)
  }
}

const $v = useVuelidate(rules, newData)

onMounted(async () => {
  await categoriesStore.dispatchGetCategories()
})

const handleBackToListPage = (): void => {
  router.push({ name: 'Products List' })
}

const handleSave = async (): Promise<void> => {
  handleCloseAddModal()
  const result = await $v.value.$validate()

  if (result) {
    await productsStore.addProduct({
      title: newData.value.title.trim(),
      price: newData.value.price,
      description: newData.value.description,
      categoryId: newData.value.categoryId,
      images: newData.value.images
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

const handleChangeCategory = (categoryId: string): void => {
  newData.value.categoryId = Number(categoryId)
}

const handleRemoveImageByIndex = (index: number): void => {
  newData.value.images.splice(index, 1)
}
</script>

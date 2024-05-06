import { API } from '@/api'
import type { ICategory } from '@/interfaces/categories'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useCategoriesStore = defineStore('categories', () => {
  const categories: Ref<ICategory[]> = ref<ICategory[]>([])
  const isLoading: Ref<boolean> = ref(false)

  const dispatchGetCategories = async () => {
    try {
      const { status, data } = await API.categories.getCategories()
      if (status === 200) categories.value = data
    } catch (error) {
      categories.value = []
      console.log(error)
    }
  }

  const getCategoryById = async (id: number) => {
    isLoading.value = true

    try {
      const { status, data } = await API.categories.getCategoryById(id)
      isLoading.value = false
      if (status === 200) return data
    } catch (error) {
      isLoading.value = false
      console.log(error)
      return {}
    }
  }

  return {
    categories,
    isLoading,
    dispatchGetCategories,
    getCategoryById
  }
})

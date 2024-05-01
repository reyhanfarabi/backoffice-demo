import { API } from '@/api'
import type { ICategory } from '@/interfaces/categories'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useCategoriesStore = defineStore('categories', () => {
  const categories: Ref<ICategory[]> = ref<ICategory[]>([])

  const dispatchGetCategories = async () => {
    try {
      const { status, data } = await API.categories.getCategories()
      if (status === 200) categories.value = data
    } catch (error) {
      categories.value = []
      console.log(error)
    }
  }

  return {
    categories,
    dispatchGetCategories
  }
})

import { API } from '@/api'
import type { IProduct } from '@/interfaces/products'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useProductsStore = defineStore('productsStore', () => {
  const products: Ref<IProduct[]> = ref([])

  const dispatchGetProducts = async () => {
    try {
      const { status, data } = await API.products.getProducts()
      if (status === 200) products.value = data
    } catch (error) {
      products.value = []
      console.log(error)
    }
  }

  return {
    products,
    dispatchGetProducts
  }
})

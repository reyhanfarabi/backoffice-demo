import { API } from '@/api'
import type { IQueryParams } from '@/common/types'
import type { IProduct, IProductAddPayload, IProductUpdatePayload } from '@/interfaces/products'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useProductsStore = defineStore('productsStore', () => {
  const products: Ref<IProduct[]> = ref([])
  const isLoading: Ref<boolean> = ref(false)

  const dispatchGetProducts = async (params: IQueryParams) => {
    isLoading.value = true

    try {
      const { status, data } = await API.products.getProducts(params)
      if (status === 200) products.value = data
    } catch (error) {
      products.value = []
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }

  const dispatchGetProductsByCategory = async (params: IQueryParams, categoryId: number) => {
    isLoading.value = true

    try {
      const { status, data } = await API.products.getProductsByCategory(params, categoryId)
      if (status === 200) products.value = data
    } catch (error) {
      products.value = []
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }

  const getProductById = async (id: number) => {
    isLoading.value = true

    try {
      const { status, data } = await API.products.getProductById(id)
      isLoading.value = false
      if (status === 200) return data
    } catch (error) {
      isLoading.value = false
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }

  const deleteProduct = async (id: number) => {
    isLoading.value = true

    try {
      await API.products.deleteProduct(id)
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }

  const addProduct = async (payload: IProductAddPayload) => {
    isLoading.value = true

    try {
      await API.products.addProduct(payload)
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }

  const updateProduct = async (id: number, payload: IProductUpdatePayload) => {
    isLoading.value = true

    try {
      await API.products.updateProduct(id, payload)
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    products,
    isLoading,
    dispatchGetProducts,
    getProductById,
    deleteProduct,
    addProduct,
    updateProduct,
    dispatchGetProductsByCategory
  }
})

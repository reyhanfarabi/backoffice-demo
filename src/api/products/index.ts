import { apiService } from '@/services/api'
import { endpoints } from '../endpoints'
import type { IQueryParams } from '@/common/types'
import type { IProductAddPayload, IProductUpdatePayload } from '@/interfaces/products'

const getProducts = async (params: IQueryParams) => {
  return await apiService.get(endpoints.products, {
    params: params
  })
}

const getProductsByCategory = async (params: IQueryParams, categoryId: number) => {
  return await apiService.get(`${endpoints.categories}/${categoryId}/${endpoints.products}`, {
    params: params
  })
}

const getProductById = async (id: number) => {
  return await apiService.get(`${endpoints.products}/${id}`)
}

const deleteProduct = async (id: number) => {
  return await apiService.delete(`${endpoints.products}/${id}`)
}

const addProduct = async (payload: IProductAddPayload) => {
  return await apiService.post(endpoints.products, payload)
}

const updateProduct = async (id: number, payload: IProductUpdatePayload) => {
  return await apiService.put(`${endpoints.products}/${id}`, payload)
}

export default {
  getProducts,
  getProductById,
  deleteProduct,
  addProduct,
  updateProduct,
  getProductsByCategory
}

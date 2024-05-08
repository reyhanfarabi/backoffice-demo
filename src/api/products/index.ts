import { apiService } from '@/services/api'
import { endpoints } from '../endpoints'
import type { IQueryParams } from '@/common/types'

const getProducts = async (params: IQueryParams) => {
  return await apiService.get(endpoints.products, {
    params: params
  })
}

const getProductById = async (id: number) => {
  return await apiService.get(`${endpoints.products}/${id}`)
}

const deleteProduct = async (id: number) => {
  return await apiService.delete(`${endpoints.products}/${id}`)
}

export default {
  getProducts,
  getProductById,
  deleteProduct
}

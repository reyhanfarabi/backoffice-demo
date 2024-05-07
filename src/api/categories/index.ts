import { apiService } from '@/services/api'
import { endpoints } from '../endpoints'
import type { ICategoryAddPayload } from '@/interfaces/categories'

const getCategories = async () => {
  return await apiService.get(endpoints.categories)
}

const getCategoryById = async (id: number) => {
  return await apiService.get(`${endpoints.categories}/${id}`)
}

const deleteCategory = async (id: number) => {
  return await apiService.delete(`${endpoints.categories}/${id}`)
}

const addCategory = async (payload: ICategoryAddPayload) => {
  return await apiService.post(endpoints.categories, payload)
}

export default {
  getCategories,
  getCategoryById,
  deleteCategory,
  addCategory
}

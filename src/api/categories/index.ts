import { apiService } from '@/services/api'
import { endpoints } from '../endpoints'
import type { ICategoryPayload } from '@/interfaces/categories'

const getCategories = async () => {
  return await apiService.get(endpoints.categories)
}

const getCategoryById = async (id: number) => {
  return await apiService.get(`${endpoints.categories}/${id}`)
}

const deleteCategory = async (id: number) => {
  return await apiService.delete(`${endpoints.categories}/${id}`)
}

const addCategory = async (payload: ICategoryPayload) => {
  return await apiService.post(endpoints.categories, payload)
}

const updateCategory = async (id: number, payload: ICategoryPayload) => {
  return await apiService.put(`${endpoints.categories}/${id}`, payload)
}

export default {
  getCategories,
  getCategoryById,
  deleteCategory,
  addCategory,
  updateCategory
}

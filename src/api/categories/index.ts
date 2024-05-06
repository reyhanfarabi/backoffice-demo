import { apiService } from '@/services/api'
import { endpoints } from '../endpoints'

const getCategories = async () => {
  return await apiService.get(endpoints.categories)
}

const getCategoryById = async (id: number) => {
  return await apiService.get(`${endpoints.categories}/${id}`)
}

const deleteCategory = async (id: number) => {
  return await apiService.delete(`${endpoints.categories}/${id}`)
}

export default {
  getCategories,
  getCategoryById,
  deleteCategory
}

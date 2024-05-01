import { apiService } from '@/services/api'

const getCategories = async () => {
  return await apiService.get('categories')
}

export default {
  getCategories
}

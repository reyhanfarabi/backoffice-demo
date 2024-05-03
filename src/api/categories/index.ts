import { apiService } from '@/services/api'
import { endpoints } from '../endpoints'

const getCategories = async () => {
  return await apiService.get(endpoints.categories)
}

export default {
  getCategories
}

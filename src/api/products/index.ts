import { apiService } from '@/services/api'
import { endpoints } from '../endpoints'

const getProducts = async () => {
  return await apiService.get(endpoints.products)
}

export default {
  getProducts
}

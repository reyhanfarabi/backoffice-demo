import { apiService } from '@/services/api'
import { endpoints } from '../endpoints'
import type { IQueryParams } from '@/common/types'

const getProducts = async (params: IQueryParams) => {
  return await apiService.get(endpoints.products, {
    params: params
  })
}

export default {
  getProducts
}

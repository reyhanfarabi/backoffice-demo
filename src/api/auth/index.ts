import { apiService } from '@/services/api'
import { endpoints } from '../endpoints'
import type { ILoginPayload } from '@/interfaces/auth'

const login = async (payload: ILoginPayload) => {
  return await apiService.post(endpoints.auth.login, payload)
}

const whoAmI = async (): Promise<void> => {
  return await apiService.get(endpoints.auth.profile, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  })
}

export default {
  login,
  whoAmI
}

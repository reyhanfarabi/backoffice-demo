import { apiService } from '@/services/api'
import { endpoints } from '../endpoints'
import type { ILoginPayload } from '@/interfaces/auth'
import type { IUser } from '@/interfaces/user'
import type { AxiosResponse } from 'axios'

const login = async (payload: ILoginPayload) => {
  return await apiService.post(endpoints.auth.login, payload)
}

const whoAmI = async (): Promise<AxiosResponse<IUser>> => {
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

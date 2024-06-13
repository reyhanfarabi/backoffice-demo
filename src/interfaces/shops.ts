import type { ICoordinate } from '@/common/types'

export interface IShop {
  id: string
  name: string
  coordinate: ICoordinate
  createdAt: Date
  updatedAt: Date
}

export interface IShopPayload {
  name: string
  coordinate: ICoordinate
}

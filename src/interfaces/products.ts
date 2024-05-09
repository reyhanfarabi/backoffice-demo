import type { ICategory } from './categories'

export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  images: string[]
  creationAt: Date
  updatedAt: Date
  category: ICategory
}

export interface IProductPayload {
  title: string
  price: number
  description: string
  categoryId: number
  images: string[]
}

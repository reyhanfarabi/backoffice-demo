export interface ICategory {
  id: number
  name: string
  image: string
  creationAt: string
  updatedAt: string
}

export interface ICategoryAddPayload {
  name: string
  image: string
}

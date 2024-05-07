export interface ICategory {
  id: number
  name: string
  image: string
  creationAt: string
  updatedAt: string
}

export interface ICategoryPayload {
  name: string
  image: string
}

import type { IShop, IShopPayload } from '@/interfaces/shops'
import { nanoid } from 'nanoid'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

const dummyData: IShop[] = [
  {
    id: 'UYFt-jxuLF7-hYs1ruAul',
    name: 'Plaza Malioboro Jogja',
    coordinate: {
      latitude: -7.793220766827875,
      longitude: 110.3661391796268
    },
    createdAt: new Date('2024-06-12T15:48:40.000Z'),
    updatedAt: new Date('2024-06-12T15:48:40.000Z')
  },
  {
    id: 'MVNDRLdJ0McN5bWCipUfz',
    name: 'Ambarrukmo Plaza Jogja',
    coordinate: {
      latitude: -7.782718448709509,
      longitude: 110.40123388341172
    },
    createdAt: new Date('2024-06-12T15:59:23.000Z'),
    updatedAt: new Date('2024-06-12T15:59:23.000Z')
  },
  {
    id: 'cjNgY5pqRBBXlVyh5gn1f',
    name: 'Cihampelas Walk Bandung',
    coordinate: {
      latitude: -6.89353418680831,
      longitude: 107.6052120316618
    },
    createdAt: new Date('2024-06-12T16:12:32.000Z'),
    updatedAt: new Date('2024-06-12T16:12:32.000Z')
  },
  {
    id: 'g3ZT0KdSOfLZiRm1veySW',
    name: 'Solo Square',
    coordinate: {
      latitude: -7.560849210137351,
      longitude: 110.78869578399409
    },
    createdAt: new Date('2024-06-12T16:26:19.000Z'),
    updatedAt: new Date('2024-06-12T16:26:19.000Z')
  },
  {
    id: 'A40ZErx2xIgVLy53J0Z_v',
    name: 'Tunjungan Plaza 4 Surabaya',
    coordinate: {
      latitude: -7.262185955933541,
      longitude: 112.74007631685348
    },
    createdAt: new Date('2024-06-12T16:34:01.000Z'),
    updatedAt: new Date('2024-06-12T16:34:01.000Z')
  },
  {
    id: 'ISq-YLmxi_HtGdgCIwsml',
    name: 'Tunjungan Plaza 6 Surabaya',
    coordinate: {
      latitude: -7.261722995188635,
      longitude: 112.73845572888625
    },
    createdAt: new Date('2024-06-12T16:39:58.000Z'),
    updatedAt: new Date('2024-06-12T16:39:58.000Z')
  }
]

export const useShopsStore = defineStore('shop', () => {
  const isLoading: Ref<boolean> = ref(false)
  const shops: Ref<IShop[]> = ref([])

  // check if there is existing data on local storage
  const localData = localStorage.getItem('shops_data')
  if (localData) {
    shops.value = JSON.parse(localData)
  } else {
    shops.value = dummyData
  }

  const getShops = (): IShop[] => {
    return shops.value
  }

  const getShopById = (id: string): IShop | null => {
    const shop = shops.value.find((s: IShop) => s.id === id)
    if (!shop) return null
    return shop
  }

  const addNewShopLocation = (payload: IShopPayload): void => {
    isLoading.value = true

    const newData: IShop = {
      id: nanoid(),
      name: payload.name,
      coordinate: payload.coordinate,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    shops.value.push(newData)
    updateShopsOnLocalStorage()

    isLoading.value = false
  }

  const deleteShopLocation = (id: string): void => {
    isLoading.value = true

    const index = shops.value.findIndex((shop: IShop) => shop.id === id)
    if (index !== -1) {
      shops.value.splice(index, 1)
      updateShopsOnLocalStorage()
    }

    isLoading.value = false
  }

  const updateShop = (id: string, payload: IShopPayload): void => {
    isLoading.value = true

    const shop = shops.value.find((shop: IShop) => shop.id === id)
    if (shop) {
      shop.name = payload.name.trim()
      shop.coordinate = payload.coordinate
      shop.updatedAt = new Date()

      updateShopsOnLocalStorage()
    }

    isLoading.value = false
  }

  const updateShopsOnLocalStorage = (): void => {
    localStorage.setItem('shops_data', JSON.stringify(shops.value))
  }

  return {
    getShops,
    isLoading,
    addNewShopLocation,
    deleteShopLocation,
    getShopById,
    updateShop
  }
})

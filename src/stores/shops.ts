import type { IShop } from '@/interfaces/shops'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useShopsStore = defineStore('shop', () => {
  const shops: Ref<IShop[]> = ref([
    {
      id: '',
      name: 'Plaza Malioboro Jogja',
      coordinate: {
        latitude: -7.793220766827875,
        longitude: 110.3661391796268
      },
      createdAt: new Date('2024-06-12T15:48:40.000Z'),
      updatedAt: new Date('2024-06-12T15:48:40.000Z')
    },
    {
      id: '',
      name: 'Ambarrukmo Plaza Jogja',
      coordinate: {
        latitude: -7.782718448709509,
        longitude: 110.40123388341172
      },
      createdAt: new Date('2024-06-12T15:59:23.000Z'),
      updatedAt: new Date('2024-06-12T15:59:23.000Z')
    },
    {
      id: '',
      name: 'Cihampelas Walk Bandung',
      coordinate: {
        latitude: -6.89353418680831,
        longitude: 107.6052120316618
      },
      createdAt: new Date('2024-06-12T16:12:32.000Z'),
      updatedAt: new Date('2024-06-12T16:12:32.000Z')
    },
    {
      id: '',
      name: 'Solo Square',
      coordinate: {
        latitude: -7.560849210137351,
        longitude: 110.78869578399409
      },
      createdAt: new Date('2024-06-12T16:26:19.000Z'),
      updatedAt: new Date('2024-06-12T16:26:19.000Z')
    },
    {
      id: '',
      name: 'Tunjungan Plaza 4 Surabaya',
      coordinate: {
        latitude: -7.262185955933541,
        longitude: 112.74007631685348
      },
      createdAt: new Date('2024-06-12T16:34:01.000Z'),
      updatedAt: new Date('2024-06-12T16:34:01.000Z')
    },
    {
      id: '',
      name: 'Tunjungan Plaza 6 Surabaya',
      coordinate: {
        latitude: -7.261722995188635,
        longitude: 112.73845572888625
      },
      createdAt: new Date('2024-06-12T16:39:58.000Z'),
      updatedAt: new Date('2024-06-12T16:39:58.000Z')
    }
  ])

  const getShops = (): IShop[] => {
    return shops.value
  }

  return {
    getShops
  }
})

import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useProductsStore = defineStore('productsStore', () => {
  // dummy data for ui testing
  const products: Ref<any> = ref([
    {
      id: 1,
      title: 'Majestic Mountain Graphic T-Shirt',
      price: 50,
      description:
        'Elevate your wardrobe with this stylish black t-shirt featuring a striking monochrome mountain range graphic. Perfect for those who love the outdoors or want to add a touch of nature-inspired design to their look, this tee is crafted from soft, breathable fabric ensuring all-day comfort. Ideal for casual outings or as a unique gift, this t-shirt is a versatile addition to any collection.',
      images: [
        'https://i.imgur.com/QkIa5tT.jpeg',
        'https://i.imgur.com/jb5Yu0h.jpeg',
        'https://i.imgur.com/UlxxXyG.jpeg'
      ],
      creationAt: '2024-05-03T21:37:02.000Z',
      updatedAt: '2024-05-03T21:38:02.000Z',
      category: {
        id: 1,
        name: 'Clothes',
        image: 'https://i.imgur.com/QkIa5tT.jpeg',
        creationAt: '2024-05-03T21:37:02.000Z',
        updatedAt: '2024-05-03T21:37:02.000Z'
      }
    },
    {
      id: 3,
      title: 'Classic Heather Gray Hoodie',
      price: 69,
      description:
        'Stay cozy and stylish with our Classic Heather Gray Hoodie. Crafted from soft, durable fabric, it features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs. Perfect for a casual day out or a relaxing evening in, this hoodie is a versatile addition to any wardrobe.',
      images: [
        'https://i.imgur.com/cHddUCu.jpeg',
        'https://i.imgur.com/CFOjAgK.jpeg',
        'https://i.imgur.com/wbIMMme.jpeg'
      ],
      creationAt: '2024-05-03T21:37:02.000Z',
      updatedAt: '2024-05-03T21:37:02.000Z',
      category: {
        id: 1,
        name: 'Clothes',
        image: 'https://i.imgur.com/QkIa5tT.jpeg',
        creationAt: '2024-05-03T21:37:02.000Z',
        updatedAt: '2024-05-03T21:37:02.000Z'
      }
    },
    {
      id: 4,
      title: 'Classic Grey Hooded Sweatshirt',
      price: 90,
      description:
        'Elevate your casual wear with our Classic Grey Hooded Sweatshirt. Made from a soft cotton blend, this hoodie features a front kangaroo pocket, an adjustable drawstring hood, and ribbed cuffs for a snug fit. Perfect for those chilly evenings or lazy weekends, it pairs effortlessly with your favorite jeans or joggers.',
      images: [
        'https://i.imgur.com/R2PN9Wq.jpeg',
        'https://i.imgur.com/IvxMPFr.jpeg',
        'https://i.imgur.com/7eW9nXP.jpeg'
      ],
      creationAt: '2024-05-03T21:37:02.000Z',
      updatedAt: '2024-05-03T21:37:02.000Z',
      category: {
        id: 1,
        name: 'Clothes',
        image: 'https://i.imgur.com/QkIa5tT.jpeg',
        creationAt: '2024-05-03T21:37:02.000Z',
        updatedAt: '2024-05-03T21:37:02.000Z'
      }
    }
  ])

  return {
    products
  }
})

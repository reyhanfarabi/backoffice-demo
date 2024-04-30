<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-row justify-between items-center">
      <h1 class="text-2xl font-bold">Categories</h1>
      <BaseButton>
        <span class="text-sm font-semibold">New Category</span>
      </BaseButton>
    </div>

    <BaseTable :headers="headers" :datalist="datalist" />
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue';
import BaseTable from '@/components/table/BaseTable.vue'
import { ref } from 'vue'

// dummy data for testing
const headers = ref(['ID', 'Name', 'Images', 'Created At', 'Updated At'])
const datalist = ref([
  [
    1,
    'Ropa',
    'https://i.imgur.com/QkIa5tT.jpeg',
    '2024-04-30T00:05:12.000Z',
    '2024-04-30T00:05:12.000Z'
  ],
  [
    2,
    'Electronics',
    'https://i.imgur.com/ZANVnHE.jpeg',
    '2024-04-29T20:27:50.000Z',
    '2024-04-29T20:27:50.000Z'
  ],
  [
    3,
    'Change title',
    'https://i.imgur.com/Qphac99.jpeg',
    '2024-04-29T20:27:50.000Z',
    '2024-04-29T20:54:32.000Z'
  ],
  [
    4,
    'Shoes',
    'https://i.imgur.com/qNOjJje.jpeg',
    '2024-04-29T20:27:50.000Z',
    '2024-04-29T20:27:50.000Z'
  ],
  [
    5,
    'Miscellaneous',
    'https://i.imgur.com/BG8J0Fj.jpg',
    '2024-04-29T20:27:50.000Z',
    '2024-04-29T20:27:50.000Z'
  ],
  [
    18,
    'un nuevo nombre',
    'https://placeimg.com/640/480/any',
    '2024-04-30T00:13:16.000Z',
    '2024-04-30T00:21:51.000Z'
  ],
  [
    20,
    'Books',
    'https://api.lorem.space/image/book?w=150&h=220',
    '2024-04-30T00:55:04.000Z',
    '2024-04-30T00:55:04.000Z'
  ]
])
</script>

<template>
  <div class="overflow-x-auto text-sm">
    <table class="w-full">
      <thead class="bg-neutral-200 dark:bg-neutral-700">
        <tr>
          <th
            scope="col"
            class="p-3 first:rounded-l last:rounded-r text-left"
            v-for="header in props.headers"
            :key="header"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b last:border-0 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-800"
          v-for="(data, index) in props.datalist"
          :key="index"
        >
          <td scope="row" class="p-3" v-for="item in data" :key="item">{{ item }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
export interface IBaseTableProps {
  headers: string[]
  datalist: any[][]
}

const props = defineProps<IBaseTableProps>()
</script>

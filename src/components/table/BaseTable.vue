<template>
  <div class="h-full w-full overflow-x-auto text-sm">
    <table class="w-full">
      <thead class="bg-neutral-200 dark:bg-neutral-700 sticky top-0">
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

      <tbody v-if="props.isLoading">
        <tr>
          <td :colspan="props.headers.length">
            <LoadingSpinner class="flex justify-center items-center p-4" />
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr v-if="!props.datalist.length">
          <td :colspan="props.headers.length">
            <div v-if="$slots['empty']">
              <slot name="empty" />
            </div>
            <span v-else class="flex justify-center p-4">No Data Found</span>
          </td>
        </tr>

        <tr
          v-else
          class="border-b last:border-0 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-800"
          v-for="(data, dataIndex) in props.datalist"
          :key="dataIndex"
        >
          <td scope="row" class="p-3" v-for="(item, itemIndex) in data" :key="itemIndex">
            <div v-if="$slots[itemIndex]">
              <slot :name="itemIndex" :data="item" />
            </div>
            <div v-else>
              <span>{{ item }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <BaseTablePagination
      :per-page-options="pagination.perPageOptions"
      @change-page-event="$emit('changePageEvent')"
      @change-per-page-event="(val: number) => $emit('changePerPageEvent', val)"
    />
  </div>
</template>

<script setup lang="ts">
import LoadingSpinner from '../loadings/LoadingSpinner.vue'
import BaseTablePagination, { type IBaseTablePagination } from './BaseTablePagination.vue'

export interface IBaseTableProps {
  headers: string[]
  datalist: any[][]
  isLoading: boolean
  pagination: IBaseTablePagination
}

const props = withDefaults(defineProps<IBaseTableProps>(), {
  isLoading: false
})
</script>

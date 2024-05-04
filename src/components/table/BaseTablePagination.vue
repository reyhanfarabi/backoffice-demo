<template>
  <div
    class="flex justify-end items-center sticky bottom-0 text-sm bg-neutral-200 dark:bg-neutral-700 rounded px-3 py-2"
  >
    <div class="flex items-center gap-8">
      <div class="flex items-center gap-2">
        <label for="perPageSelect">Items per page</label>
        <BaseDropdown
          name="per-page"
          id="perPageSelect"
          :options="props.perPageOptions"
          @change="
            (event: Event) => $emit('changePerPageEvent', (event.target as HTMLSelectElement).value)
          "
        />
      </div>

      <BaseButton type="outlined" @click="$emit('prevPageEvent')">
        <i class="pi pi-angle-left" />
      </BaseButton>
      <div>
        <span>Page {{ props.page }}</span>
      </div>
      <BaseButton type="outlined" @click="$emit('nextPageEvent')">
        <i class="pi pi-angle-right" />
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IOptions } from '@/common/types'
import BaseDropdown from '../dropdowns/BaseDropdown.vue'
import BaseButton from '../buttons/BaseButton.vue'

export interface IBaseTablePagination {
  page: number
  perPage: number
  perPageOptions: IOptions[]
}

const props = withDefaults(defineProps<IBaseTablePagination>(), {
  page: 1,
  perPage: 10
})
</script>

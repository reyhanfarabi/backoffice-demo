<template>
  <div
    class="flex justify-between md:justify-end md:gap-8 items-center text-xs md:text-sm bg-neutral-300 dark:bg-neutral-700 rounded px-3 py-2"
  >
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

    <div class="flex flex-row items-center gap-4">
      <BaseButton variant="outlined" @click="$emit('prevPageEvent')">
        <i class="pi pi-angle-left" />
      </BaseButton>
      <div>
        <span>Page {{ props.page }}</span>
      </div>
      <BaseButton variant="outlined" @click="$emit('nextPageEvent')">
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

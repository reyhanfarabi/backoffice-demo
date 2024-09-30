<template>
  <div class="landing-pagination">
    <div class="flex items-center gap-2">
      <label for="perPageSelect">Items per page</label>
      <LandingDropdown
        name="per-page"
        id="perPageSelect"
        :options="props.perPageOptions"
        @change="
          (event: Event) => $emit('changePerPageEvent', (event.target as HTMLSelectElement).value)
        "
      />
    </div>

    <div class="landing-pagination__navigator">
      <LandingButton variant="outlined" @click="$emit('prevPageEvent')">
        <i class="pi pi-angle-left" />
      </LandingButton>
      <div>
        <span>Page {{ props.page }}</span>
      </div>
      <LandingButton variant="outlined" @click="$emit('nextPageEvent')">
        <i class="pi pi-angle-right" />
      </LandingButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IOptions } from '@/common/types'
import LandingDropdown from '../dropdowns/LandingDropdown.vue'
import LandingButton from '../buttons/LandingButton.vue'

export interface ILandingPagination {
  page: number
  perPage: number
  perPageOptions: IOptions[]
}

const props = withDefaults(defineProps<ILandingPagination>(), {
  page: 1,
  perPage: 10
})
</script>

<style scoped lang="postcss">
.landing-pagination {
  @apply flex justify-between md:justify-end md:gap-8 items-center text-xs md:text-sm bg-landing-dark-secondary rounded px-3 py-2;
}

.landing-pagination__navigator {
  @apply flex flex-row items-center gap-4;
}

.landing-pagination__navigator > button {
  @apply border-landing-light/20 text-landing-light;
}

.landing-pagination__navigator > button::before {
  @apply bg-landing-light;
}
</style>

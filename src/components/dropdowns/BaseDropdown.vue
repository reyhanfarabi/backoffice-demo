<template>
  <select
    class="p-1 m-0 text-sm bg-transparent border border-neutral-700/20 dark:border-neutral-300/20 rounded"
  >
    <option
      v-for="(opt, index) in props.options"
      :key="`${opt}${index}`"
      class="text-neutral-900"
      :value="opt.key"
    >
      {{ opt.value }}
    </option>
  </select>
</template>

<script setup lang="ts">
import type { IOptions } from '@/common/types'

export interface IBaseDropdownProps {
  options: IOptions[]
}

const props = defineProps<IBaseDropdownProps>()
</script>

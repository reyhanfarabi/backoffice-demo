<template>
  <div class="flex flex-col gap-2">
    <input
      class="px-2 py-1 rounded text-neutral-900 dark:text-neutral-100 bg-transparent border border-neutral-800/20 dark:border-neutral-200/20"
    />
    <div
      v-if="props.isError"
      class="flex items-center gap-2 text-sm text-red-500 dark:text-red-600"
    >
      <i class="pi pi-exclamation-triangle" />
      <span>{{ props.errorMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface IBaseInputProps {
  isError: boolean
  errorMessage: string
}

const props = withDefaults(defineProps<IBaseInputProps>(), {
  isError: false,
  errorMessage: 'Please enter a valid data'
})
</script>

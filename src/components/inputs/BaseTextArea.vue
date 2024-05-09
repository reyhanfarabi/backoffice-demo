<template>
  <div class="flex flex-col gap-2">
    <textarea
      class="px-2 py-1 rounded text-neutral-900 dark:text-neutral-100 bg-transparent border border-neutral-800/20 dark:border-neutral-200/20"
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
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
export interface IBaseTextAreaProps {
  isError: boolean
  errorMessage: string
  modelValue?: any
}

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<IBaseTextAreaProps>(), {
  isError: false,
  errorMessage: 'Please enter a valid data'
})
</script>

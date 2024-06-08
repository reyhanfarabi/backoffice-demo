<template>
  <button class="flex justify-center items-center" :class="props.variant">
    <slot />
  </button>
</template>

<script setup lang="ts">
export interface IBaseButtonProps {
  variant: 'filled' | 'outlined' | 'nostyle' | 'vanilla'
}

const props = withDefaults(defineProps<IBaseButtonProps>(), {
  variant: 'nostyle'
})
</script>

<style lang="postcss">
.filled {
  @apply px-4 py-2 rounded text-neutral-100 bg-teal-500 dark:bg-teal-600 hover:bg-teal-500/80 dark:hover:bg-teal-600/80;
}

.outlined {
  @apply p-2 rounded text-neutral-900 dark:text-neutral-100 hover:bg-neutral-800/10 dark:hover:bg-neutral-200/10 border border-neutral-800/20 dark:border-neutral-200/20;
}

.nostyle {
  @apply text-neutral-900 dark:text-neutral-100;
}

.vanilla {
  @apply p-2 rounded hover:bg-neutral-800/10 dark:hover:bg-neutral-200/10;
}
</style>

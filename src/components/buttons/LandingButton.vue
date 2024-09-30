<template>
  <button class="landing-button" :class="props.variant">
    <slot />
  </button>
</template>

<script setup lang="ts">
export interface IBaseButtonProps {
  variant: 'filled' | 'outlined' | 'nostyle'
}

const props = withDefaults(defineProps<IBaseButtonProps>(), {
  variant: 'nostyle'
})
</script>

<style lang="postcss">
.landing-button {
  @apply flex justify-center items-center;
}

.landing-button.filled {
  @apply relative px-4 py-2 rounded text-landing-light hover:text-landing-dark bg-landing-brand-secondary;
  z-index: 1;
}

.landing-button.filled::before {
  @apply absolute top-0 left-0 right-0 bottom-0 rounded bg-landing-brand;
  content: '';
  z-index: -1;
  transition: transform 150ms ease-in-out;
  transform: scaleY(0);
  transform-origin: bottom;
}

.landing-button.filled:hover::before {
  transform: scaleY(1);
}

.landing-button.outlined {
  @apply relative px-4 p-2 rounded text-landing-brand hover:text-landing-dark border border-landing-brand bg-none;
  z-index: 1;
}

.landing-button.outlined::before {
  @apply absolute top-0 left-0 right-0 bottom-0 rounded bg-landing-brand;
  content: '';
  z-index: -1;
  transition: transform 150ms ease-in-out;
  transform: scaleY(0);
  transform-origin: bottom;
}

.landing-button.outlined:hover::before {
  transform: scaleY(1);
}

.landing-button.nostyle {
  @apply text-landing-dark dark:text-landing-light;
}
</style>

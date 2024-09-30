<template>
  <div>
    <LandingNavbar />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import LandingNavbar from '@/components/navbar/LandingNavbar.vue'
</script>

<style scoped lang="postcss">
* {
  @apply bg-landing-dark text-landing-light font-poppins;
}
</style>

<template>
  <div class="join-the-movement">
    <div class="join-the-movement__title">
      <h2>Join the Sustainable Movement</h2>
      <span>Shop secondhand and make a positive impact on the planet.</span>
    </div>
    <LandingButton variant="outlined"> Shop Now </LandingButton>
  </div>
</template>

<script lang="ts" setup>
import LandingButton from '@/components/buttons/LandingButton.vue'
</script>

<style scoped lang="postcss">
.join-the-movement {
  @apply h-screen container py-16 flex flex-col justify-center items-center gap-8 text-center p-4;
}

.join-the-movement__title {
  @apply flex flex-col items-center gap-4;
}

.join-the-movement__title > h2 {
  @apply text-5xl md:text-6xl font-playfair-display font-bold;
}
</style>

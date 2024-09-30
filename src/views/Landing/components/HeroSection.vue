<template>
  <div class="hero">
    <div class="hero__content">
      <div class="hero__title">
        <h1>Discover Unique Finds at Affordable Prices!</h1>
        <span
          >Explore our curated collection of secondhand items that tell a story and bring value to
          your life.
        </span>
      </div>
      <LandingButton variant="outlined" @click="() => (visible = !visible)">
        Shop Now
      </LandingButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LandingButton from '@/components/buttons/LandingButton.vue'
import BaseSidepanel from '@/components/sidepanel/BaseSidepanel.vue'
import { ref } from 'vue'

const visible = ref(false)
</script>

<style scoped lang="postcss">
.hero {
  @apply h-screen py-16 p-4 relative w-full flex justify-center;
  z-index: 1;
}

.hero::before {
  @apply w-full h-screen absolute top-0 left-0;
  content: '';
  z-index: -1;
  object-fit: cover;
  background: url('https://images.unsplash.com/photo-1589461737012-3da7b84b7861?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  opacity: 0.3;
}

.hero__content {
  @apply h-full container flex flex-col justify-center items-start gap-8;
}

.hero__title {
  @apply flex flex-col gap-4 md:w-1/2;
}

.hero__title > h1 {
  @apply font-playfair-display text-6xl md:text-7xl font-semibold;
}
</style>

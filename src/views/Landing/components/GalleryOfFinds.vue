<template>
  <div class="gallery-of-finds">
    <div class="gallery-of-finds__title">
      <h2>Gallery of Finds</h2>
      <span>A glimpse into our collection of secondhand gems.</span>
    </div>
    <div class="gallery-of-finds__wrapper">
      <div class="gallery-of-finds__column-wrapper">
        <img
          v-for="(image, index) in images.left"
          :key="index"
          class="gallery-of-finds__image-box"
          :src="image"
          alt="Gallery Photo"
        />
      </div>
      <div class="gallery-of-finds__column-wrapper">
        <img
          v-for="(image, index) in images.center"
          :key="index"
          class="gallery-of-finds__image-box"
          :src="image"
          alt="Gallery Photo"
        />
      </div>
      <div class="gallery-of-finds__column-wrapper">
        <img
          v-for="(image, index) in images.right"
          :key="index"
          class="gallery-of-finds__image-box"
          :src="image"
          alt="Gallery Photo"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLandingStore } from '@/stores/landing'
import { computed, ref } from 'vue'

const landingStore = useLandingStore()
const elementRef = ref(null)
defineExpose({ elementRef })

const images = computed(() => {
  let imgs: string[] = []

  if (landingStore.getGalleryFinds) {
    imgs = landingStore.getGalleryFinds
  }

  const leftEndIndex = Math.floor(imgs.length / 3)
  const rightStartIndex = leftEndIndex * 2 + 1
  return {
    left: imgs.slice(0, leftEndIndex),
    center: imgs.slice(leftEndIndex, rightStartIndex),
    right: imgs.slice(rightStartIndex, imgs.length)
  }
})
</script>

<style scoped lang="postcss">
.gallery-of-finds {
  @apply min-h-screen container py-32 flex flex-col justify-center items-center gap-16 text-center p-4;
}

.gallery-of-finds__title {
  @apply flex flex-col items-center gap-4;
}

.gallery-of-finds__title > h2 {
  @apply text-5xl md:text-6xl font-playfair-display font-bold;
}

.gallery-of-finds__wrapper {
  @apply grid grid-cols-1 md:grid-cols-3 gap-4 justify-center md:w-2/3;
}

.gallery-of-finds__column-wrapper {
  @apply flex flex-col gap-4;
}

.gallery-of-finds__image-box {
  @apply w-full h-fit rounded-md;
}
</style>

<template>
  <div
    class="w-screen h-screen flex flex-col text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-900 font-roboto subpixel-antialiased"
  >
    <MainHeader />

    <div class="flex flex-row flex-grow">
      <NavigationSidebar class="w-full" />
      <main class="p-8 min-w-[86vw]">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainHeader from '@/components/MainHeader.vue'
import NavigationSidebar from '@/components/navbar/NavigationSidebar.vue'
</script>

<template>
  <div
    class="w-screen h-screen flex flex-col text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-900 font-roboto subpixel-antialiased"
  >
    <MainHeader />

    <div class="flex flex-row flex-grow">
      <NavigationSidebar />
      <main class="flex-1 p-8 h-[calc(100vh-4rem)] overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainHeader from '@/components/MainHeader.vue'
import NavigationSidebar from '@/components/navbar/NavigationSidebar.vue'
</script>

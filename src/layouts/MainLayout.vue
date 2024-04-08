<template>
  <div
    class="w-screen h-screen flex flex-col text-gray-900 bg-gray-100 font-roboto subpixel-antialiased"
  >
    <MainHeader />

    <div class="flex flex-row flex-grow">
      <NavigationSidebar />
      <main class="flex-grow p-4">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainHeader from '@/components/MainHeader.vue'
import NavigationSidebar from '@/components/navbar/NavigationSidebar.vue'
</script>

<template>
  <div
    class="w-screen h-screen flex flex-row text-gray-900 bg-white divide-x divide-gray-200 font-roboto subpixel-antialiased">
    <NavigationSidebar />

    <main class="flex-grow">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavigationSidebar from '@/components/navbar/NavigationSidebar.vue'
</script>

<template>
  <div
    class="w-screen h-screen flex flex-row text-gray-900 bg-white divide-x divide-gray-200 font-roboto subpixel-antialiased">
    <NavigationSidebar />

    <div class="flex flex-col flex-grow">
      <MainHeader />
      <main class="flex-grow">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainHeader from '@/components/MainHeader.vue';
import NavigationSidebar from '@/components/navbar/NavigationSidebar.vue'
</script>

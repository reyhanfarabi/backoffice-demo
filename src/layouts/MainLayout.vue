<template>
  <div class="w-screen h-screen flex flex-row text-gray-950 bg-white divide-x divide-gray-200">
    <NavigationSidebar />

    <main class="flex-grow">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavigationSidebar from '@/components/NavigationSidebar.vue';
</script>

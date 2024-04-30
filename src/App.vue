<template>
  <component :is="$route.meta.layout || 'div'" class="transition-colors duration-400">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppConfig } from './stores/appConfig'

const appConfig = useAppConfig()

onMounted(() => {
  appConfig.setColorMode()
})
</script>

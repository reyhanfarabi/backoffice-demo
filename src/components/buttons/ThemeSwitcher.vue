<template>
  <BaseButton
    variant="vanilla"
    aria-label="Toggle between dark mode and light mode"
    @click="appConfig.toggleColorMode()"
  >
    <i aria-hidden="true" class="pi" :class="[appConfig.isDarkMode ? 'pi-moon' : 'pi-sun']"></i>
  </BaseButton>
</template>

<script setup lang="ts">
import { useAppConfig } from '@/stores/appConfig'
import BaseButton from './BaseButton.vue'

const appConfig = useAppConfig()
</script>

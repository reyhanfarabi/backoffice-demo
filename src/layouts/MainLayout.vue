<template>
  <div
    class="w-screen h-screen flex flex-col text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-900 font-roboto subpixel-antialiased"
  >
    <LoadingProgress />

    <MainHeader @toggle-show-mobile-navbar="handleOpenNavbarMobile" />
    <div class="md:hidden">
      <BaseSidepanel :visible="isNavbarMobileVisible" @close="handleCloseNavbarMobile">
        <NavigationMobile
          v-if="isNavbarMobileVisible"
          @close-navbar-event="handleCloseNavbarMobile"
        />
      </BaseSidepanel>
    </div>

    <div class="flex flex-row flex-grow">
      <NavigationSidebar class="hidden md:block" />
      <main class="flex-1 p-8 h-[calc(100vh-4rem)] overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainHeader from '@/components/MainHeader.vue'
import NavigationSidebar from '@/components/navbar/NavigationSidebar.vue'
import NavigationMobile from '@/components/navbar/NavigationMobile.vue'
import { ref, type Ref } from 'vue'
import LoadingProgress from '@/components/loadings/LoadingProgress.vue'
import BaseSidepanel from '@/components/sidepanel/BaseSidepanel.vue'

const isNavbarMobileVisible: Ref<boolean> = ref(false)

const handleCloseNavbarMobile = (): void => {
  isNavbarMobileVisible.value = false
}

const handleOpenNavbarMobile = (): void => {
  isNavbarMobileVisible.value = true
}
</script>

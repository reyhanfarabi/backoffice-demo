<template>
  <div
    ref="loadingProgressEl"
    class="absolute top-0 bg-teal-500 dark:bg-teal-600 min-h-1 z-50"
    :class="[
      { 'opacity-0': !loadingStore.isProgressVisible },
      { 'opacity-100 ': loadingStore.isProgressVisible }
    ]"
  ></div>
</template>

<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'
import { onMounted, ref, type Ref } from 'vue'

const loadingStore = useLoadingStore()
const loadingProgressEl: Ref<HTMLDivElement | null> = ref(null)

onMounted(() => {
  if (loadingProgressEl.value) {
    loadingStore.initProgress(loadingProgressEl.value)
  }
})
</script>

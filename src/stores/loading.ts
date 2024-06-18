import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const isProgressVisible: Ref<boolean> = ref(false)
  const progress: Ref<number> = ref(0)
  const progressCounter: Ref<ReturnType<typeof setInterval> | undefined> = ref(undefined)
  const progressEl: Ref<HTMLDivElement | null> = ref(null)

  const initProgress = (element: HTMLDivElement): void => {
    progress.value = 0
    progressEl.value = element
    progressEl.value.style.width = `${progress.value}%`
  }

  const startLoadingProgress = (): void => {
    if (!progressEl.value) return

    progress.value = 0
    isProgressVisible.value = true

    progressCounter.value = setInterval(() => {
      if (!progressEl.value) return

      progress.value += 0.1 - progress.value / 10000
      progressEl.value.style.width = `${progress.value}%`

      if (progress.value >= 80) {
        clearInterval(progressCounter.value)

        if (!progressEl.value) return
        progressEl.value.style.width = `${progress.value}%`
      }
    }, 10)
  }

  const stopLoadingProgress = (): void => {
    clearInterval(progressCounter.value)
    progress.value = 100

    if (!progressEl.value) return
    progressEl.value.style.width = `${progress.value}%`

    setTimeout(() => {
      isProgressVisible.value = false
    }, 500)
  }

  return {
    isProgressVisible,
    initProgress,
    startLoadingProgress,
    stopLoadingProgress
  }
})

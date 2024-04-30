import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { setAppColorMode, switchColorMode } from '@/utils'

export const useAppConfig = defineStore('appConfig', () => {
  const isDarkMode: Ref<boolean> = ref(false)

  const setColorMode = (): void => {
    setAppColorMode()
    updateCurrentColorVal()
  }

  const toogleColorMode = (): void => {
    switchColorMode()
    updateCurrentColorVal()
  }

  const updateCurrentColorVal = (): void => {
    isDarkMode.value = localStorage.theme === 'dark'
  }

  return { isDarkMode, setColorMode, toogleColorMode }
})

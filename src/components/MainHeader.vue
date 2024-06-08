<template>
  <div
    class="flex flex-row justify-between items-center px-6 min-h-16 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 shadow"
  >
    <RouterLink to="/">
      <h1 class="font-bold text-lg">Backoffice</h1>
    </RouterLink>

    <div class="flex flex-row gap-2">
      <!-- Theme Switcher -->
      <ThemeSwitcher class="size-10" />

      <!-- Profile Button -->
      <div ref="profileEl">
        <button
          class="flex flex-row justify-between items-center w-44 px-2 py-1 gap-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800"
          @click="toggleProfileMenu"
        >
          <div class="flex flex-row items-center gap-2">
            <img
              v-if="userData.avatar"
              class="w-8 rounded-full border border-neutral-300 dark:border-neutral-700"
              :src="userData.avatar"
              :alt="`${userData} profile picture`"
            />
            <i
              v-else
              class="pi text-neutral-700 dark:text-neutral-300 pi-user bg-neutral-100 dark:bg-neutral-900 p-2 rounded-full border border-neutral-300 dark:border-neutral-700"
            />
            <span class="font-semibold text-sm text-neutral-700 dark:text-neutral-300">{{
              userData.name
            }}</span>
          </div>
          <i class="pi pi-chevron-down" />
        </button>

        <!-- Profile Menu -->
        <div
          v-show="isProfileVisible"
          class="flex flex-col absolute right-6 w-60 mt-4 p-2 gap-2 rounded shadow-sm border dark:border-neutral-700 bg-white dark:bg-neutral-800 divide-y dark:divide-neutral-700"
        >
          <div class="flex flex-row items-center gap-2 p-2">
            <img
              v-if="userData.avatar"
              class="w-12 rounded-full border border-neutral-300 dark:border-neutral-700"
              :src="userData.avatar"
              :alt="`${userData} profile picture`"
            />
            <i
              v-else
              class="pi text-neutral-700 dark:text-neutral-300 pi-user p-2 rounded-full border border-neutral-300 dark:border-neutral-700"
            />
            <div class="flex flex-col">
              <span>{{ userData.name }}</span>
              <span class="text-xs font-light text-neutral-500/90 dark:text-neutral-400/90">{{
                userData.email
              }}</span>
            </div>
          </div>
          <div class="flex flex-col">
            <BaseButton variant="vanilla" class="font-bold" @click="handleLogout"
              >Logout</BaseButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './buttons/BaseButton.vue'
import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import type { IUser } from '@/interfaces/user'
import ThemeSwitcher from './buttons/ThemeSwitcher.vue'

const authStore = useAuthStore()
const isProfileVisible: Ref<boolean> = ref(false)
const profileEl: Ref<HTMLDivElement | null> = ref(null)
const userData: Ref<IUser> = ref({} as IUser)

onMounted(async () => {
  window.addEventListener('click', handleClickOutside)
  userData.value = await authStore.getCurrentUser()
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})

const toggleProfileMenu = (): void => {
  isProfileVisible.value = !isProfileVisible.value
}

const handleClickOutside = (event: Event): void => {
  if (!profileEl.value) return

  if (!profileEl.value.contains(event.target as Node)) {
    isProfileVisible.value = false
  }
}

const handleLogout = (): void => {
  authStore.logout()
}
</script>

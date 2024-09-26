<template>
  <div class="w-full h-[90vh] relative">
    <div class="flex flex-row items-center justify-center h-1/4">
      <div class="flex flex-col items-center gap-4">
        <div class="flex flex-row items-center gap-4">
          <img
            v-if="userData.avatar"
            class="w-16 rounded-full border border-neutral-300 dark:border-neutral-700"
            :src="userData.avatar"
            :alt="`${userData} profile picture`"
          />
          <i
            v-else
            class="pi text-neutral-700 dark:text-neutral-300 pi-user bg-neutral-100 dark:bg-neutral-900 p-2 rounded-full border border-neutral-300 dark:border-neutral-700"
          />
          <div class="flex flex-col">
            <span class="text-xl text-white">{{ userData.name }}</span>
            <span class="text-sm font-light text-neutral-400/90">{{ userData.email }}</span>
          </div>
        </div>
        <BaseButton variant="filled" @click="handleLogout">Logout</BaseButton>
      </div>
    </div>

    <nav
      class="absolute w-full h-3/4 bottom-0 flex flex-col bg-white dark:bg-neutral-950 shadow-md rounded-md overflow-y-hidden"
    >
      <div class="flex flex-row justify-between items-center p-6">
        <h1 class="font-bold text-2xl">Menu</h1>
        <ThemeSwitcher class="absolute top-6 right-6" />
      </div>
      <div
        class="flex flex-col"
        v-for="route in newRoutes"
        :key="route.path"
        @click="handleCloseNavbar"
      >
        <RouterLink
          v-if="!route.meta.showChildRoute"
          :to="route.path"
          class="flex flex-row gap-4 p-6 items-center hover:bg-neutral-200 dark:hover:bg-neutral-800"
          :class="[
            {
              'bg-teal-500 dark:bg-teal-600 hover:bg-teal-500/80 dark:hover:bg-teal-600/80':
                $route.path === route.path || route.children.find((c) => c.name === $route.name)
            }
          ]"
        >
          <i class="pi" :class="[route.icon, { 'text-white': $route.path === route.path }]" />
          <span
            class="text-neutral-700 dark:text-neutral-400"
            :class="[
              {
                'text-white dark:text-white':
                  $route.path === route.path || route.children.find((c) => c.name === $route.name)
              }
            ]"
          >
            {{ route.name }}</span
          >
        </RouterLink>

        <div
          v-else
          class="flex flex-col"
          :class="[
            {
              'bg-neutral-100 dark:bg-neutral-900': route.children.find(
                (c) => `${route.path}${c.path}` === $route.path
              )
            }
          ]"
        >
          <div class="flex flex-row justify-between items-center">
            <div class="flex flex-row flex-grow gap-4 p-3">
              <i class="pi" :class="route.icon" />
              <span class="text-neutral-700 dark:text-neutral-400"> {{ route.name }}</span>
            </div>
            <BaseButton
              class="flex justify-center items-center p-2 m-1 rounded hover:bg-neutral-300/80 dark:hover:bg-neutral-700/80 cursor-pointer"
              @click="
                () => {
                  route.isChildVisible = !route.isChildVisible
                }
              "
            >
              <i v-if="route.isChildVisible" class="pi pi-chevron-up" />
              <i v-else class="pi pi-chevron-down" />
            </BaseButton>
          </div>

          <div v-if="route.isChildVisible">
            <RouterLink
              v-for="child in route.children"
              :key="child.path"
              :to="route.path + child.path"
              class="flex flex-row gap-2 p-6 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded"
              :class="[
                {
                  'bg-teal-500 dark:bg-teal-600 hover:bg-teal-500/80 dark:hover:bg-teal-600/80':
                    $route.path === `${route.path}${child.path}`
                }
              ]"
            >
              <span
                class="pl-6 text-sm text-neutral-700 dark:text-neutral-400"
                :class="[
                  { 'text-white dark:text-white': $route.path === `${route.path}${child.path}` }
                ]"
              >
                {{ child.name }}</span
              >
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { routes } from '@/router/private'
import { onMounted, ref, type Ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import type { IUser } from '@/interfaces/user'
import ThemeSwitcher from '../buttons/ThemeSwitcher.vue'
import BaseButton from '../buttons/BaseButton.vue'

const emit = defineEmits(['closeNavbarEvent'])

const authStore = useAuthStore()
const userData: Ref<IUser> = ref({} as IUser)

const newRoutes = ref(
  routes.map((route) => {
    return {
      ...route,
      isChildVisible: false
    }
  })
)

onMounted(async () => {
  userData.value = await authStore.getCurrentUser()
})

const handleLogout = (): void => {
  authStore.logout()
}

const handleCloseNavbar = (): void => {
  emit('closeNavbarEvent')
}
</script>

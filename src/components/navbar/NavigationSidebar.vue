<template>
  <aside class="bg-white dark:bg-neutral-950 shadow-md">
    <nav class="flex-grow flex flex-col py-3">
      <div class="flex flex-col" v-for="route in newRoutes" :key="route.path">
        <RouterLink
          v-if="!route.meta.showChildRoute"
          :to="route.path"
          class="flex flex-row gap-2 p-3 mx-3 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded"
          :class="[
            {
              'bg-teal-500 dark:bg-teal-600 hover:bg-teal-500/80 dark:hover:bg-teal-600/80':
                $route.path === route.path
            }
          ]"
        >
          <i class="pi" :class="[route.icon, { 'text-white': $route.path === route.path }]" />
          <span
            class="text-sm text-neutral-700 dark:text-neutral-400"
            :class="[{ 'text-white dark:text-white': $route.path === route.path }]"
          >
            {{ route.name }}</span
          >
        </RouterLink>

        <div
          v-else
          class="flex flex-col mx-3 rounded"
          :class="[
            {
              'bg-neutral-100 dark:bg-neutral-900': route.children.find(
                (c) => `${route.path}${c.path}` === $route.path
              )
            }
          ]"
        >
          <div class="flex flex-row justify-between items-center">
            <div class="flex flex-row flex-grow gap-2 p-3">
              <i class="pi" :class="route.icon" />
              <span class="text-sm text-neutral-700 dark:text-neutral-400"> {{ route.name }}</span>
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
              class="flex flex-row gap-2 p-3 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded"
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
  </aside>
</template>

<script setup lang="ts">
import { routes } from '@/router/routes'
import { ref } from 'vue'

const newRoutes = ref(
  routes.map((route) => {
    return {
      ...route,
      isChildVisible: false
    }
  })
)
</script>

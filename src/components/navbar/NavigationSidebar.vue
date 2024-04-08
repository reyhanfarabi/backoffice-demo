<template>
  <aside class="w-72 bg-white shadow-md">
    <nav class="flex-grow flex flex-col py-3">
      <div class="flex flex-col" v-for="route in newRoutes" :key="route.path">
        <RouterLink v-if="route.children.length === 0" :to="route.path"
          class="flex flex-row gap-2 p-3 mx-3 hover:bg-gray-200 rounded">
          <i class="pi" :class="route.icon" />
          <span class="text-sm font-semibold text-gray-700"> {{ route.name }}</span>
        </RouterLink>

        <div v-else class="flex flex-col">
          <button class="flex flex-row justify-between items-center p-3 mx-3 hover:bg-gray-200 rounded"
            @click="() => { route.isChildVisible = !route.isChildVisible }">
            <div class="flex flex-row gap-2 ">
              <i class="pi" :class="route.icon" />
              <span class="text-sm font-semibold text-gray-700"> {{ route.name }}</span>
            </div>
            <i v-if="route.isChildVisible" class="pi pi-chevron-up" />
            <i v-else class="pi pi-chevron-down" />
          </button>

          <div v-if="route.isChildVisible">
            <RouterLink v-for="child in route.children" :key="child.path" :to="route.path + child.path"
              class="flex flex-row gap-2 p-3 mx-3 hover:bg-gray-200 rounded">
              <span class="pl-6 text-sm font-semibold text-gray-700"> {{ child.name }}</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { routes } from '@/router/routes';
import { ref } from 'vue';

const newRoutes = ref(routes.map((route) => {
  return {
    ...route,
    isChildVisible: false
  }
}))
</script>

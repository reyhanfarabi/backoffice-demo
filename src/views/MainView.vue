<template>
  <main class="flex flex-col gap-8">
    <strong class="text-2xl">Dashboard</strong>
    <div class="flex flex-row gap-4">
      <button
        @click="
          () => {
            $router.push({ name: 'Categories List' })
          }
        "
      >
        <i class="pi pi-th-large" />
        <div class="flex flex-col items-start">
          <span class="font-light text-sm">Categories</span>
          <span class="text-2xl font-bold">10</span>
        </div>
      </button>
      <button
        @click="
          () => {
            $router.push({ name: 'Products List' })
          }
        "
      >
        <i class="pi pi-database" />
        <div class="flex flex-col items-start">
          <span class="font-light text-sm">Products</span>
          <span class="text-2xl font-bold">100</span>
        </div>
      </button>
    </div>
  </main>
</template>

<style scoped lang="postcss">
button {
  @apply flex flex-col justify-between shadow-md text-white bg-teal-500 dark:bg-teal-600 p-3 w-44 h-32 rounded hover:bg-teal-500/90 dark:hover:bg-teal-600/90;
}
</style>

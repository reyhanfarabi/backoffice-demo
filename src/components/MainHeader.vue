<template>
  <div
    class="flex flex-row justify-between items-center px-6 h-16 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 shadow"
  >
    <RouterLink to="/">
      <h1 class="font-bold text-lg">Backoffice</h1>
    </RouterLink>

    <!-- User Button -->
    <button
      class="flex flex-row justify-between items-center max-w-36 px-2 py-1 gap-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 hover"
    >
      <div class="flex flex-row items-center gap-2">
        <i
          class="pi text-neutral-700 dark:text-neutral-300 pi-user bg-neutral-100 dark:bg-neutral-900 p-2 rounded-full border border-neutral-300 dark:border-neutral-700"
        />
        <span class="font-semibold text-sm text-neutral-700 dark:text-neutral-300">John Doe</span>
      </div>
      <i class="pi pi-chevron-down" />
    </button>
  </div>
</template>

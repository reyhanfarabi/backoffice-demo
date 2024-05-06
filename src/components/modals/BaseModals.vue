<template>
  <div
    class="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-neutral-950/80"
    @click="
      () => {
        $emit('closeModalEvent')
      }
    "
  >
    <div class="p-4 rounded bg-neutral-800" @click.prevent.stop>
      <slot />
    </div>
  </div>
</template>

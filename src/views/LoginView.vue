<template>
  <div
    class="w-screen h-screen flex justify-center items-center text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-900 font-roboto"
  >
    <div class="flex flex-col gap-6 bg-neutral-800 p-12 rounded">
      <div class="flex flex-col gap-2 w-80">
        <span class="text-3xl font-bold">Login</span>
        <span class="text-sm text-neutral-400">Hi, Welcome to Backoffice Demo</span>
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-sm" for="email">Email</label>
        <BaseInput name="email" id="email" />
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-sm" for="password">Password</label>
        <BaseInput name="password" id="password" type="password" />
      </div>
      <BaseButton type="filled">Login</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
</script>

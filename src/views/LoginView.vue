<template>
  <div
    class="w-screen h-screen flex justify-center items-center text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-900 font-roboto"
  >
    <form @submit.prevent="handleLogin" class="flex flex-col gap-6 bg-neutral-800 p-12 rounded">
      <div class="flex flex-col gap-2 w-80">
        <span class="text-3xl font-bold">Login</span>
        <span class="text-sm text-neutral-400">Hi, Welcome to Backoffice Demo</span>
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-sm" for="email">Email</label>
        <BaseInput name="email" id="email" v-model="loginData.email" />
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-sm" for="password">Password</label>
        <BaseInput name="password" id="password" type="password" v-model="loginData.password" />
      </div>
      <div v-if="isError" class="flex items-center gap-2 text-sm text-red-500 dark:text-red-600">
        <i class="pi pi-exclamation-triangle" />
        <span>Invalid email or password.</span>
      </div>
      <BaseButton type="submit" variant="filled" @click="handleLogin">
        <i v-if="authStore.isLoading" class="pi pi-spinner text-xl animate-spin" />
        <span v-else>Login</span>
      </BaseButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import type { ILoginPayload } from '@/interfaces/auth'
import { useAuthStore } from '@/stores/auth'
import { ref, watch, type Ref } from 'vue'

const authStore = useAuthStore()
const loginData: Ref<ILoginPayload> = ref({
  email: '',
  password: ''
})
const isError: Ref<boolean> = ref(false)

watch(
  loginData,
  () => {
    isError.value = false
  },
  { deep: true }
)

const handleLogin = async (): Promise<void> => {
  const response = await authStore.login(loginData.value)
  if (!response) isError.value = true
}
</script>

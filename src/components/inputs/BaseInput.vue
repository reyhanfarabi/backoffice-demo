<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="flex flex-row w-full">
      <input
        ref="inputEl"
        class="w-full px-2 py-1 rounded text-neutral-900 dark:text-neutral-100 bg-transparent border border-neutral-800/20 dark:border-neutral-200/20"
        :class="[
          {
            'rounded-r-none': isInputTypePassword()
          }
        ]"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <BaseButton
        type="button"
        v-if="isInputTypePassword()"
        class="password-button"
        @click="togglePasswordVisibility"
      >
        <i class="pi pi-eye" />
      </BaseButton>
    </div>
    <div
      v-if="props.isError"
      class="flex items-center gap-2 text-sm text-red-500 dark:text-red-600"
    >
      <i class="pi pi-exclamation-triangle" />
      <span>{{ props.errorMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import BaseButton from '../buttons/BaseButton.vue'

export interface IBaseInputProps {
  isError: boolean
  errorMessage: string
  modelValue?: any
}

defineOptions({
  inheritAttrs: false
})

const inputEl: Ref<HTMLInputElement | null> = ref(null)

const props = withDefaults(defineProps<IBaseInputProps>(), {
  isError: false,
  errorMessage: 'Please enter a valid data'
})

const togglePasswordVisibility = (): void => {
  if (!inputEl.value) return

  if (inputEl.value.type === 'password') {
    inputEl.value.type = 'text'
  } else {
    inputEl.value.type = 'password'
  }
}

const isInputTypePassword = (): boolean => {
  return inputEl.value?.type === 'password'
}
</script>

<style scoped lang="postcss">
.password-button {
  @apply flex justify-center items-center w-10 rounded-r text-neutral-900 dark:text-neutral-100 hover:bg-neutral-800/10 dark:hover:bg-neutral-200/10 border border-l-0 border-neutral-800/20 dark:border-neutral-200/20;
}
</style>

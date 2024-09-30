<template>
  <div class="flex flex-col gap-2 w-full text-sm">
    <div class="flex flex-row w-full">
      <input
        ref="inputEl"
        class="w-full px-2 py-1 rounded text-landing-light placeholder:text-landing-light/40 font-light bg-transparent"
        :class="[
          {
            'rounded-r-none': isInputTypePassword(),
            'border border-landing-light/20': !$attrs.disabled
          }
        ]"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <LandingButton
        type="button"
        v-if="isInputTypePassword()"
        class="password-button"
        @click="togglePasswordVisibility"
      >
        <i class="pi pi-eye" />
      </LandingButton>
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
import LandingButton from '../buttons/LandingButton.vue'

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
  @apply flex justify-center items-center w-10 rounded-r text-landing-light hover:bg-landing-light/10 border border-l-0 border-landing-light/20;
}
</style>

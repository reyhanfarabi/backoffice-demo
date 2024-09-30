<template>
  <div :class="[{ sidepanel__overlay: props.visible }]" @click="handleOverlayClick" />
  <div ref="panelRef" class="sidepanel">
    <div class="sidepanel__header">
      <button
        @click="
          () => {
            $emit('close')
          }
        "
      >
        <i class="pi pi-times" />
      </button>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, type Ref } from 'vue'

export interface IBaseSidepanelProps {
  visible: boolean
  preventClose: boolean
}

const props = withDefaults(defineProps<IBaseSidepanelProps>(), {
  visible: false,
  preventClose: false
})
const panelRef: Ref<HTMLDivElement | null> = ref(null)

watch(
  () => props.visible,
  (newValue) => {
    handleAnimation(newValue)
  }
)

const handleOverlayClick = (e: Event) => {
  if (props.preventClose) return
  console.log(e)
}

const handleAnimation = (visible: boolean) => {
  if (!panelRef.value) return

  if (visible) {
    panelRef.value.classList.add('show')
    setTimeout(() => {
      panelRef.value?.classList.add('visual-show')
    }, 0)
  } else {
    panelRef.value.classList.remove('visual-show')
    setTimeout(() => {
      panelRef.value?.classList.remove('show')
    }, 150)
  }
}
</script>

<style scoped lang="postcss">
.sidepanel__overlay {
  @apply fixed top-0 left-0 w-screen h-screen;
  background-color: rgba(15, 23, 42, 0.5);
  z-index: 9999;
}

.sidepanel {
  @apply hidden bg-landing-dark fixed top-0 right-0 w-[500px] h-screen opacity-0 md:border-l border-landing-dark-secondary;
  z-index: 9999;
  -ms-transform: translateX(100%);
  transform: translateX(100%);
  -webkit-transition: all 200ms ease-in-out;
  -moz-transition: all 200ms ease-in-out;
  transition: all 200ms ease-in-out;
}

.sidepanel.visual-show {
  opacity: 1;
  transform: translateX(0);
}

.sidepanel.show {
  display: block;
}

@media only screen and (max-width: 600px) {
  .sidepanel {
    @apply border-none;
    width: 100vw;
  }
}

.sidepanel__header {
  @apply flex flex-row justify-between items-center text-2xl font-semibold p-4;
}

.sidepanel__header > button {
  transition: 0.4s ease;
  background-color: transparent;
  border: 0;
  cursor: pointer;
}

@keyframes background-circle-animation {
  from {
    background-color: transparent;
    border-radius: 0;
  }

  to {
    background-color: var(--primary-color);
    /* Change to your preferred background color */
    border-radius: 50%;
  }
}

.sidepanel__header > button > i {
  @apply text-landing-light;
}
</style>

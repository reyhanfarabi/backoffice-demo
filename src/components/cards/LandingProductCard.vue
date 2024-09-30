<template>
  <button
    :title="props.name"
    class="landing-product-card"
    @click="(e: Event) => handleClickEvent(e)"
  >
    <img :src="props.image" :alt="props.name" />
    <div class="landing-product-card__description">
      <span class="landing-product-card__description--name">{{ props.name }}</span>
      <span class="landing-product-card__description--price">${{ props.price }}</span>
    </div>
  </button>
</template>

<script lang="ts" setup>
export interface ILandingProductProps {
  id: string
  name: string
  image: string
  price: number
}

const emit = defineEmits(['click'])
const props = withDefaults(defineProps<ILandingProductProps>(), {
  id: '',
  name: '',
  image: '',
  price: 0
})

const handleClickEvent = (e: Event): void => {
  emit('click', e)
}
</script>

<style scoped lang="postcss">
.landing-product-card {
  @apply flex flex-col h-fit rounded-lg border border-landing-light/10 font-light hover:border-landing-brand hover:text-landing-brand;
}

.landing-product-card > img {
  @apply w-full aspect-square object-cover;
}

.landing-product-card__description {
  @apply flex flex-col items-start text-start p-4 gap-1 h-24 w-full;
}

.landing-product-card__description--name {
  @apply text-lg line-clamp-1;
}

.landing-product-card__description--price {
  @apply text-landing-light/75;
}
</style>

<template>
    <div class="how-it-works">
        <div class="how-it-works__title">
            <h2>How it works</h2>
            <span>Simple steps to start your sustainable shopping journey.</span>
        </div>
        <div class="how-it-works__steps">
            <div v-for="(step, index) in steps" :key="index" class="how-it-works__panel-step">
                <span>{{ step.title }}</span>
                <span>{{ step.description }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const steps = ref([
    {
        title: "Browse Our Collection",
        description: "Explore our wide range of secondhand items online."
    },
    {
        title: "Select Your Favorites",
        description: "Choose the items you love and add them to your cart."
    },
    {
        title: "Checkout Securely",
        description: "Complete your purchase with our safe and easy checkout process."
    },
    {
        title: "Enjoy Your Finds",
        description: "Receive your unique items and enjoy your sustainable choices."
    },
])
</script>

<style scoped lang="postcss">
.how-it-works {
    @apply h-screen container py-16 flex flex-col lg:flex-row items-center w-full lg:divide-x text-center p-4 gap-16;
}

.how-it-works__title {
    @apply flex flex-col items-center gap-4 w-full lg:w-1/2;
}

.how-it-works__title>h2 {
    @apply text-5xl md:text-6xl font-playfair-display font-bold;
}

.how-it-works__steps {
    @apply grid grid-cols-1 md:grid-cols-2 w-full lg:w-1/2 gap-8 md:gap-16 p-8 relative;
}

.how-it-works__panel-step {
    @apply col-span-1 flex flex-col gap-4;
}

.how-it-works__panel-step>span:first-of-type {
    @apply font-playfair-display font-bold text-2xl;
}

.how-it-works__panel-step>span:last-of-type {
    @apply font-light;
}
</style>

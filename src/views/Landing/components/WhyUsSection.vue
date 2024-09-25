<template>
    <div class="why-us">
        <div class="why-us__title">
            <h2>Why Choose Us?</h2>
            <span>Sustainable Shopping Made Easy</span>
        </div>
        <div class="why-us__cards">
            <div v-for="(item, index) in cardsData" :key="index" class="why-us__card">
                <img :src="item.image" alt="Quality Assured image">
                <div class="why-us__card-description">
                    <span>{{ item.title }}</span>
                    <span>{{ item.description }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import IllustrationQuality from "@/assets/illustration/quality.png";
import IllustrationEcoFriendly from "@/assets/illustration/eco-friendly.png";
import IllustrationAffordable from "@/assets/illustration/affordable.png";

const cardsData = ref([
    {
        title: "Quality Assured",
        description: "Each item is carefully inspected to ensure it meets our high standards of quality.",
        image: IllustrationQuality
    },
    {
        title: "Eco-Friendly",
        description: "Reduce waste and shop sustainably by giving pre-loved items a new home.",
        image: IllustrationEcoFriendly
    },
    {
        title: "Affordable Prices",
        description: "Find amazing deals on unique items without breaking the bank.",
        image: IllustrationAffordable
    },
])
</script>

<style scoped lang="postcss">
.why-us {
    @apply min-h-screen container py-16 gap-16 flex flex-col justify-center items-center text-center p-4;
}

.why-us__title {
    @apply flex flex-col items-center gap-4;
}

.why-us__title>h2 {
    @apply text-5xl md:text-6xl font-playfair-display font-bold;
}

.why-us__cards {
    @apply flex flex-col lg:flex-row gap-16
}

.why-us__card {
    @apply flex flex-col gap-4 w-full max-w-96 lg:w-64;
}

.why-us__card>img {
    @apply w-full max-w-96 aspect-square lg:size-64 rounded;
}

.why-us__card-description {
    @apply flex flex-col gap-2;
}

.why-us__card-description>span:first-of-type {
    @apply text-2xl font-playfair-display font-bold;
}

.why-us__card-description>span:last-of-type {
    @apply font-light;
}
</style>

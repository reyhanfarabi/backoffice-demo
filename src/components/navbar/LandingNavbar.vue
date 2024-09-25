<template>
    <div class="navbar">
        <div class="navbar__container">
            <div class="navbar__brand">
                <span>sekenn</span>
            </div>
            <ul class="navbar__links">
                <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">Shop</a>
                </li>
                <li>
                    <a href="#">About Us</a>
                </li>
                <li>
                    <a href="#">Contact Us</a>
                </li>
            </ul>
            <button class="navbar__mobile_button" @click="() => { visible = true }">
                <i class="pi pi-bars" />
            </button>
        </div>
    </div>
    <div class="navbar__mobile">
        <BaseSidepanel :visible="visible" @close="() => { visible = false }">
            <ul class="navbar__mobile_links">
                <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">Shop</a>
                </li>
                <li>
                    <a href="#">About Us</a>
                </li>
                <li>
                    <a href="#">Contact Us</a>
                </li>
            </ul>
        </BaseSidepanel>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BaseSidepanel from '../sidepanel/BaseSidepanel.vue';

const visible = ref(false)
</script>

<style scoped lang="postcss">
.navbar {
    @apply flex flex-row justify-center bg-landing-dark/20 backdrop-blur-lg drop-shadow-md fixed top-0 w-full py-6 px-4 md:px-0 z-50;
}

.navbar__container {
    @apply container w-full flex flex-row justify-between;
}

.navbar__brand {
    @apply font-playfair-display text-4xl font-bold;
}

.navbar__links {
    @apply hidden md:flex flex-row items-center gap-8;
}

.navbar__mobile_links {
    @apply flex flex-col h-[80vh] justify-center items-center gap-8;
}

.navbar__links a,
.navbar__mobile_links a {
    @apply relative p-1;
    z-index: 1;
}

.navbar__mobile_links {
    @apply text-3xl;
}

.navbar__links a::before {
    @apply absolute left-0 right-0 -bottom-1 h-[0.5px] bg-landing-light;
    content: "";
    z-index: -1;
    transition: transform 150ms ease-in-out;
    transform: scaleX(0);
    transform-origin: left;
}

.navbar__links a:hover::before {
    transform: scaleX(1);
}

.navbar__mobile {
    @apply inline-block md:hidden;
}

.navbar__mobile_button {
    @apply inline-block md:hidden;
}

.navbar__mobile_button>i {
    @apply text-2xl;
}

.navbar__sidepanel {
    @apply md:hidden;
}
</style>

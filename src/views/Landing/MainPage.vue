<template>
    <div class="langding-page">
        <LandingNavbar />
        <HeroSection />
        <WhyUsSection />
        <GalleryOfFinds />
        <HowItWorks />
        <JoinTheMovement />
    </div>
</template>

<script lang="ts" setup>
import LandingNavbar from '@/components/navbar/LandingNavbar.vue';
import HeroSection from './components/HeroSection.vue';
import WhyUsSection from './components/WhyUsSection.vue';
import GalleryOfFinds from './components/GalleryOfFinds.vue';
import HowItWorks from './components/HowItWorks.vue';
import JoinTheMovement from './components/JoinTheMovement.vue';

</script>

<style scoped lang="postcss">
* {
    @apply bg-landing-dark text-landing-light font-poppins;
}

.langding-page {
    @apply flex flex-col justify-start items-center;
}
</style>

<template>
    <div class="flex flex-col min-h-screen">
        <router-view class="mx-auto my-auto p-8"> </router-view>
        <FooterComponent></FooterComponent>
        <ReloadPWA class="ml-auto mr-2 mb-2" />

    </div>
</template>
<script setup lang="ts">
import FooterComponent from './components/Footer.vue'
import ReloadPWA from './components/ReloadPWA.vue';
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

html,
body {
    font-family: 'Poppins', sans-serif;
}


body {
    background-image: url("assets/images/background.png");
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;
    min-height: 100vh;
}


@media only screen and (max-width: 768px) {

    body {
        background-size: cover;
        background-position: center center;
    }

}


.border-purple-500 {
    border-color: rgba(96, 102, 208, 0.7);
}

.text-purple-500 {
    color: rgba(96, 102, 208, 0.7);
}

.border-purple-500:hover {
    border-color: rgba(237, 137, 54, 0);
}

.disabled {
    pointer-events: none;
}
</style>
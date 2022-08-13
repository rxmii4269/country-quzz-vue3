<template>
    <div v-if="offlineReady || needRefresh" class="flex flex-wrap text-white card" role="alert">
        <div class="message mt-1">
            <span v-if="offlineReady"> App ready to work offline </span>
            <span v-else>New content available, click on reload button to update.</span>
        </div>
        <div class="buttons flex align-middle mt-2 md:mt-0">
            <button v-if="needRefresh" @click="updateServiceWorker()" class="button">
                Reload
            </button>
            <button @click="close" class="button">
                Close
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
// @ts-ignore
import { useRegisterSW } from 'virtual:pwa-register/vue'

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()
const close = async () => {
    offlineReady.value = false
    needRefresh.value = false
}

</script>
<style scoped>
.card {
    @apply border p-3 rounded border-white flex-col gap-y-2 bg-gray-100 text-black;
}

.buttons {
    @apply gap-4;
}

.button {
    @apply rounded hover:bg-gray-500 hover:text-white px-2 transition-colors;
}

.message {
    @apply text-black;
}
</style>
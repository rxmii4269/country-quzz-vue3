import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import mdiVue from 'mdi-vue/v3'
import { mdiCheckCircleOutline, mdiCloseCircleOutline } from '@mdi/js'
import { createPinia } from 'pinia'

const store = createPinia()
const app = createApp(App)

app.use(router)

app.use(store)

app.use(mdiVue, {
    icons: {
        mdiCheckCircleOutline,
        mdiCloseCircleOutline
    }
})

app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"
import { createPinia } from "pinia"

// createApp(App).mount('#app')
const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

import './permission'

app.mount('#app')

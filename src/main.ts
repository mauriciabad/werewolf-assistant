import { createApp } from 'vue'
import { createPinia } from 'pinia'
import RealVh from 'real-vh'

import App from './App.vue'
import router from './router'

const STORAGE_VERSION = 2

const lastAppVersion = parseInt(localStorage.getItem('appVersion') ?? '', 10)
if (lastAppVersion !== STORAGE_VERSION) {
  localStorage.clear()
}
localStorage.setItem('appVersion', STORAGE_VERSION.toString())

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(RealVh)

app.mount('#app')

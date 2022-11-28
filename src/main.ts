import { createApp } from 'vue'
import { createPinia } from 'pinia'
import RealVh from 'real-vh'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

const STORAGE_VERSION = 4

const lastStorageVersion = parseInt(
  localStorage.getItem('appVersion') ?? '',
  10
)
if (lastStorageVersion !== STORAGE_VERSION) {
  localStorage.clear()
}
localStorage.setItem('appVersion', STORAGE_VERSION.toString())

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(RealVh)
app.use(createVfm())

app.use(i18n)

app.mount('#app')

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import RealVh from 'real-vh'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(RealVh)

app.mount('#app')

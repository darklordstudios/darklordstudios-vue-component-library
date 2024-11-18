import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { definePreset } from '@primevue/themes'
import PrimeVue from 'primevue/config'
import DialogService from 'primevue/dialogservice'

import '../node_modules/primeflex/primeflex.min.css'
import Aura from '@primevue/themes/aura'

import App from './ComponentTester.vue'
//import App from './components/SPImagePicker.vue'

const app = createApp(App)

app.use(createPinia())

const DLSPreset = definePreset(Aura, {})

app.use(PrimeVue, {
  theme: {
    preset: DLSPreset,
  },
})

app.use(DialogService)

app.mount('#app')

import { App } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import SPImagePicker from './components/SPImagePicker.vue'
import { useImagesStore } from './stores/images'

const components = {
  SPImagePicker
}

export default {
  install: (app: App) => {
    app.use(createPinia())
    app.use(PrimeVue, {
      ripple: true
    })
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  }
}

export {
  SPImagePicker,
  useImagesStore
}

/* export { useImagesStore } from './stores/images';
export { default as SPImagePicker } from './components/SPImagePicker.vue' */

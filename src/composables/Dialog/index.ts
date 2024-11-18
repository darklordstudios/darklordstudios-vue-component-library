import { App } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { DialogService } from '../../components/Dialog/DialogService'
import DynamicDialogManager from '../components/Dialog/DynamicDialogManager.vue'
import { useDialog } from './useDialog'

export default {
  install: (app: App) => {
    const pinia = createPinia()
    app.use(pinia)
    app.use(PrimeVue)

    app.component('DynamicDialogManager', DynamicDialogManager)

    const dialogService = new DialogService()
    app.provide('dialogService', dialogService)
  }
}

export {
  DialogService,
  DynamicDialogManager,
  useDialog
}

export * from '../../interfaces/DialogTypes'

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DialogConfig, DialogState } from '../interfaces/DialogTypes'

export const useDialogStore = defineStore('dialog', () => {
  const dialogs = ref<Map<string, DialogConfig>>(new Map())
  const currentId = ref(0)

  const show = (config: DialogConfig) => {
    const id = `dialog-${currentId.value++}`
    dialogs.value.set(id, config)
    return id
  }

  const close = (id: string, result?: any) => {
    const dialog = dialogs.value.get(id)
    if (dialog) {
      dialogs.value.delete(id)
    }
    return result
  }

  const closeAll = () => {
    dialogs.value.clear()
  }

  return {
    dialogs,
    show,
    close,
    closeAll
  }
})

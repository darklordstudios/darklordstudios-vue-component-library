import { type Component } from 'vue'
import { useDialogStore } from '../../stores/dialog'
import type { DialogConfig, DialogOptions, DialogResult } from '../../interfaces/DialogTypes'

export class DialogService {
  private store = useDialogStore()

  show<T = any>(
    component: Component,
    options: DialogOptions = {},
    props: Record<string, any> = {}
  ): Promise<DialogResult<T>> {
    return new Promise((resolve) => {
      const config: DialogConfig = {
        component,
        props,
        ...options,
        modal: options.modal ?? true,
        closable: options.closable ?? true,
        dismissableMask: options.dismissableMask ?? false,
        closeOnEscape: options.closeOnEscape ?? true,
      }

      const id = this.store.show(config)

      const originalClose = this.store.close
      this.store.close = (dialogId: string, result?: DialogResult<T>) => {
        if (dialogId === id) {
          resolve(result || { cancelled: true })
          this.store.close = originalClose
        }
        return originalClose.call(this.store, dialogId, result)
      }
    })
  }

  closeAll() {
    this.store.closeAll()
  }
}

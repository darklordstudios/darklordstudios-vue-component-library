import { inject } from 'vue'
import type { DialogResult } from '../../interfaces/DialogTypes'

const dialogInjectionKey = Symbol('dialogClose')

export function useDialog() {
  const close = inject<(result?: DialogResult) => void>(dialogInjectionKey)

  if (!close) {
    throw new Error('useDialog must be used within a dialog component')
  }

  return {
    close
  }
}

export interface DialogOptions {
  header?: string
  width?: string
  height?: string
  modal?: boolean
  closable?: boolean
  dismissableMask?: boolean
  closeOnEscape?: boolean
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  style?: Record<string, string>
  class?: string
  data?: any
}

export interface DialogConfig extends DialogOptions {
  component: any
  props?: Record<string, any>
}

export interface DialogState {
  dialogs: Map<string, DialogConfig>
}

export interface DialogResult<T = any> {
  data?: T
  cancelled?: boolean
}

export type DialogCloseCallback = (result?: DialogResult) => void

interface IImagePickerResult {
  imageName: string
  imageNameWithoutExtension: string
  imageAbsoluteUrl: string
  imageSize?: number
  spItemUrl?: string
  downloadFileContent: () => Promise<File>
  previewDataUrl?: string
}
export type { IImagePickerResult }

interface IImagePickerTab {
  context?: any
  accepts: string[]
  onSave: (value: IImagePickerResult[]) => void
  onClose: () => void
}
export type { IImagePickerTab }

interface IImagePickerProps {
  label?: string
  buttonLabel?: string
  buttonIcon?: string
  onSave?: (imagePickerResult: IImagePickerResult[]) => void
  onChange?: (imagePickerResult: IImagePickerResult[]) => void
  onCancel?: () => void
  context?: any
  accepts?: string[]
  required?: boolean
  bingAPIKey?: string
  webAbsoluteUrl?: string
  checkIfFileExists?: boolean
}
export type { IImagePickerProps }

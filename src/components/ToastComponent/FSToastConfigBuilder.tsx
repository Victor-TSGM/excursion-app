import { ToastIntent, ToastPosition } from "@fluentui/react-components"

const DEFAULT_TIMEOUT = 3000

export interface ToastTypes {
  title: string | JSX.Element,
  content: string | JSX.Element,
  toastType: ToastIntent
  position: ToastPosition
  timeout: number
}

export const ErrorToast = (title: string | JSX.Element, content: string | JSX.Element, timeout?: number, position?: ToastPosition): ToastTypes => {
  return {
    title, 
    content,
    toastType: 'error',
    position: position || 'bottom-end',
    timeout: timeout || DEFAULT_TIMEOUT
  }
}

export const SuccessToast = (title: string | JSX.Element, content: string | JSX.Element, timeout?: number, position?: ToastPosition): ToastTypes => {
  return {
    title, 
    content,
    toastType: 'success',
    position: position || 'bottom-end',
    timeout: timeout || DEFAULT_TIMEOUT
  }
}

export const InfoToast = (title: string | JSX.Element, content: string | JSX.Element, timeout?: number, position?: ToastPosition): ToastTypes => {
  return {
    title, 
    content,
    toastType: 'info',
    position: position || 'bottom-end',
    timeout: timeout || DEFAULT_TIMEOUT
  }
}

export const WarningToast = (title: string | JSX.Element, content: string | JSX.Element, timeout?: number, position?: ToastPosition): ToastTypes => {
  return {
    title, 
    content,
    toastType: 'warning',
    position: position || 'bottom-end',
    timeout: timeout || DEFAULT_TIMEOUT
  }
}

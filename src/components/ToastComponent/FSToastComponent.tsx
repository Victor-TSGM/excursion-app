import * as React from 'react'
import { LayoutContext } from '../../../presentation/providers/LayoutStateProvider'

import {
  useId,
  Toaster,
  useToastController,
  Toast,
  ToastTitle,
  ToastBody,
} from "@fluentui/react-components";

import './FSToastComponent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faCheckCircle, faExclamationCircle, faInfoCircle, faWarning } from '@fortawesome/free-solid-svg-icons';

export const FSToastComponent = (): JSX.Element => {
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);
  const { layoutState, setLayoutState } = React.useContext(LayoutContext)

  React.useEffect(() => {
    if (layoutState.showToast) {
      showToast()

      setLayoutState({ ...layoutState, showToast: false })
    }
  }, [layoutState.showToast])

  const showToast = (): void => {
    if (!layoutState.toastConfig) {
      return
    }

    let className: string = ''
    let icon: IconDefinition = null

    switch (layoutState.toastConfig.toastType) {
      case 'success':
        className = 'fs-toast-success'
        icon = faCheckCircle
        break;
      case 'info':
        className = 'fs-toast-info'
        icon = faInfoCircle
        break;
      case 'error':
        className = 'fs-toast-error'
        icon = faExclamationCircle
        break;
      case 'warning':
        className = 'fs-toast-warning'
        icon = faWarning
        break;
    }

    dispatchToast(
      <Toast className={`fs-toast ${className}`}>
        <ToastTitle media={<FontAwesomeIcon icon={icon} />}>
          {layoutState.toastConfig.title}
        </ToastTitle>
        {
          layoutState.toastConfig.content ? <ToastBody>
            {layoutState.toastConfig.content}
          </ToastBody> : <></>
        }
      </Toast>,
      {
        intent: layoutState.toastConfig.toastType,
        position: layoutState.toastConfig.position,
        timeout: layoutState.toastConfig.timeout,
        pauseOnHover: true,
        pauseOnWindowBlur: true
      }
    );
  }

  return (
    <Toaster toasterId={toasterId} />
  )
}
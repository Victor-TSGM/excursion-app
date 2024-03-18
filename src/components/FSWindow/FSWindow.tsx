import * as React from 'react'
import './FSWindow.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

export interface FSWindowActions {
  show: () => void
  hide: () => void
  isShown: () => boolean
}

export const FSWindow = React.forwardRef((props: React.PropsWithChildren<{ title: string, children?: React.ReactNode, beforeHide?: Function, closeIcon?: React.ReactNode }>, ref: React.ForwardedRef<FSWindowActions>): JSX.Element => {
  const [show, setShow] = React.useState<boolean>(false)
  const hide = (): void => { props.beforeHide?.(); setShow(false) }

  React.useImperativeHandle(ref, () => ({
    show: () => setShow(true),
    hide,
    isShown: () => show
  }))

  return <>
    {show && <div className='window-container'>
      <div className='window-card'>
        <div className='window-header'>
          <div>{props.title}</div>
          <button 
            className='btn btn-danger ms-3' 
            style={{ borderRadius: 0 }}
            onClick={() => hide()}
          >
            {props.closeIcon ? props.closeIcon : <FontAwesomeIcon icon={faClose} />}
          </button>
        </div>
        <div className='window-content'>
          {props.children}
        </div>
      </div>
    </div>}
  </>
})

FSWindow.displayName = 'FSWindow'
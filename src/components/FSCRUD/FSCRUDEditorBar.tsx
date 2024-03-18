import * as React from 'react'
import './FSCRUDBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons'
import { useResource } from '../../hooks/useResource'

interface FSCRUDEditorBarActions {
  onSave?: () => void
  onCancel?: () => void
  
  hideSaveButton?: boolean
  hideCancelButton?: boolean
  
  additionalItems?: () => JSX.Element

  disableSticky?: boolean
}

export const FSCRUDEditorBar = React.memo((props: FSCRUDEditorBarActions): JSX.Element => {
  const { t } = useResource()
  return (
    <div className={`fs-crud-bar ${(props.disableSticky ? '' : 'fs-crud-bar-sticky')}`}>
      <div>
        {
          props.hideSaveButton
            ? <></>
            : <>
              <button className="btn btn-primary" onClick={() => props.onSave?.()}><FontAwesomeIcon className="me-lg-1" icon={faSave} /> <span className="buttonTitle">{t('lib:crud.save')}</span></button>
            </>
        }
        {
          props.hideCancelButton
            ? <></>
            : <>
              <button className="btn btn-light ms-2" onClick={() => props.onCancel?.()}><FontAwesomeIcon className="me-lg-1" icon={faArrowLeft} /> <span className="buttonTitle">{t('lib:crud.cancel')}</span></button>
            </>
        }

        {props.additionalItems?.()}
      </div>
    </div>
  )
})
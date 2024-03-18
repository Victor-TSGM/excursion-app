import * as React from 'react'
import './FSCRUDBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlus, faFileWord, faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { useResource } from '../../hooks/useResource'

export interface FSCRUDIndexBarProps {
  onNew?: () => void
  onEdit?: () => void
  onDelete?: () => void

  onWordExport?: () => void
  onExcelExport?: () => void
  onPdfExport?: () => void

  hideNewButton?: boolean
  hideEditButton?: boolean
  hideDeleteButton?: boolean

  hideWordButton?: boolean
  hideExcelButton?: boolean
  hidePDFButton?: boolean

  additionalLeftItems?: () => JSX.Element
  additionalRightItems?: () => JSX.Element
}

export const FSCRUDIndexBar = React.memo((props: FSCRUDIndexBarProps): JSX.Element => {
  const { t } = useResource()

  return (
    <div key="crud-index-options" className="fs-crud-bar">
      <div key="crud-index-actions">
        {props.hideNewButton || false ? '' : <button key="btn-crud-add" className="btn btn-primary" onClick={() => props.onNew?.()}><FontAwesomeIcon className="mr-lg-1" icon={faPlus} /> <span className="buttonTitle">{t('lib:crud.new')}</span></button>}
        {props.hideEditButton || false ? '' : <button key="btn-crud-edit" className="btn btn-light ms-2" onClick={() => props.onEdit?.()}><FontAwesomeIcon className="mr-lg-1" icon={faEdit} /> <span className="buttonTitle">{t('lib:crud.edit')}</span></button>}
        {props.hideDeleteButton || false ? '' : <button key="btn-crud-delete" className="btn btn-light ms-2" onClick={() => props.onDelete?.()}><FontAwesomeIcon className="mr-lg-1" icon={faTrash} />  <span className="buttonTitle">{t('lib:crud.delete')}</span></button>}
        {props.additionalLeftItems?.()}
      </div>
      <div key="crud-index-exports">
        {props.hideWordButton || false ? '' : <button key="btn-export-word" className="btn btn-light" onClick={() => props.onWordExport?.()}><FontAwesomeIcon className="mr-lg-1" icon={faFileWord} />  <span className="buttonTitle">Word</span></button>}
        {props.hideExcelButton || false ? '' : <button key="btn-export-excel" className="btn btn-light ms-2" onClick={() => props.onExcelExport?.()}><FontAwesomeIcon className="mr-lg-1" icon={faFileExcel} />  <span className="buttonTitle">Excel</span></button>}
        {props.hidePDFButton || false ? '' : <button key="btn-export-pdf" className="btn btn-light ms-2" onClick={() => props.onPdfExport?.()}><FontAwesomeIcon className="mr-lg-1" icon={faFilePdf} /> <span className="buttonTitle">PDF</span></button>}
        {props.additionalRightItems?.()}
      </div>
    </div>
  )
})
import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faSearch, faTimes, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'

import './SearchModal.css'
import { useHorizontalScroll } from '../../hooks'
export interface SearchModalProps extends React.PropsWithChildren<{}> {
  title: string
  listDisplay: JSX.Element
  editorPage: JSX.Element
  showCleanItem?: boolean
  onCleanItem?: Function
  multiselect?: boolean
  disabled?: boolean
  hideEditor?: boolean
};

export interface SearchModalReadParams {
  skip: number
  take: number
  filterValue: string
}

export interface SearchModalActions{
  closeSearchModal: () => void
  closeEditorModal: () => void
  openSearchModal: () => void
  openEditorModal: () => void
}

export const SearchModal = React.forwardRef((props: SearchModalProps, ref: React.ForwardedRef<SearchModalActions>) => {
  const [showModal, setShowModal] = React.useState(false)
  const [showEditorModal, setShowEditorModal] = React.useState(false)

  const closeSearchModal = (): void => setShowModal(false)
  const openSearchModal = (): void => setShowModal(true)
  const closeEditorModal = (): void => setShowEditorModal(false)
  const openEditorModal = (): void => setShowEditorModal(true)

  React.useImperativeHandle(ref, () => ({ closeSearchModal, closeEditorModal, openSearchModal, openEditorModal }))

  const editorPage = (
    <div role='search-window-modal-editor' className='fs-search-window-content'>
      {props.editorPage}
    </div>
  )

  const ModalComponent = (showCondition: boolean, page: JSX.Element): JSX.Element => {
    return (showCondition && <div role='search-window-modal' className='fs-search-window-container'>
      <div className='fs-search-window-card'>
        <div className='fs-search-window-header'>
          <div>{props.title}</div>
          <button className='btn btn-danger ms-3' style={{ borderRadius: 0 }}
            onClick={() => {
              closeSearchModal()
              closeEditorModal()
            }}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        {page}
      </div>
    </div>)
  }

  const scrollRef = useHorizontalScroll()

  return (<div className="search-modal-container">
    <div className={'select-field-label'}>
      <label data-testid={'search-title'} style={{ color: props.disabled ? 'var(--disabled-dark)' : 'var(--primary-color)', fontSize: '1rem', marginRight: '5px', fontWeight: 600 }}>
        {props.title}
        </label>
      {!props.hideEditor
        ? <FontAwesomeIcon icon={faCirclePlus} className={'btn-add-item' + (props.disabled ? ' disabled' : '')}
        onClick={() => !props.disabled && openEditorModal()} />
        : ''}
      {props.showCleanItem && !props.disabled &&
        <FontAwesomeIcon icon={faXmarkCircle} className="btn-remove-item"
          onClick={() => {
            if (props.onCleanItem) {
              props.onCleanItem()
            }
          }}
        />}
    </div>
    <div className={'select-field-display'} ref={scrollRef}>
      <div className="select-fields-container">
        {props.listDisplay}
      </div>
    </div>

    <button role={'btn-search-modal-advanced'} className={`btn btn-search-modal-advanced ml-1 ${(!props.multiselect && 'unique')} ${props.disabled && 'disabled'}`}
      onClick={() => { !props.disabled && openSearchModal() }}>
      <FontAwesomeIcon className="mr-lg-1" icon={faSearch} />
    </button>

    {ModalComponent(showModal, props.children as JSX.Element)}
    {ModalComponent(showEditorModal, editorPage)}
  </div>)
})

SearchModal.displayName = 'SearchModal'

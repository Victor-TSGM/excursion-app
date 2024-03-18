import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import './SearchItemDisplay.css'

export interface SearchItemDisplayProps {
  onRemoveItem: Function
  onEditItem: Function
  classNames?: string
  disabled?: boolean
}

export const SearchItemDisplay = (props: React.PropsWithChildren<SearchItemDisplayProps>): JSX.Element => {
  return <div className={['search-item-display', props.classNames || '', props.disabled ? 'disabled' : ''].join(' ')}
    onClick={() => !props.disabled && props.onEditItem()}>
    <div>{props.children}</div>
    {!props.disabled && <div className='search-item-delete' onClick={(e: any) => {
      props.onRemoveItem()
      e.stopPropagation()
    }}>
      <FontAwesomeIcon icon={faXmark} />
    </div>}
  </div>
}
import * as React from 'react'
import {SearchItemDisplay} from './SearchItemDisplay'
import './SearchItemDisplay.css'

export const SearchItemDisplayBuilder = {
  Generate (data: any, fieldName: string,
    isMultiselect: boolean,
    onRemoveItem: (itemId: any) => void,
    onEditItem: (itemId: any) => void,
    disabled = false): JSX.Element {
    return <>
      {data?.length
        ? data?.map((model: any) => {
          if (isMultiselect) {
            return <SearchItemDisplay key={model?.id} disabled={disabled} onRemoveItem={() => onRemoveItem(model?.id)} onEditItem={() => { onEditItem(model?.id) }}>
              {model[fieldName]}
            </SearchItemDisplay>
          }

          return <span className={'unique-search-item-display' + (disabled ? ' disabled' : '')} onClick={() => !disabled && onEditItem(model?.id)} key={model?.id}>
            {model[fieldName]}
          </span>
        })
        : ''}
    </>
  }
}

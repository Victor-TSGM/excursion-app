import * as React from 'react'
import './FSButtonRadio.css'

export interface keyValuePair {
  key: any
  value: string
}

export interface ButtonRadioProps {
  name?: string
  currentValue: any
  options: keyValuePair[]
  onChange: (value: any) => void
  splitLineItemIndex?: number
  disabled?: boolean
  isMobileMode?: boolean
  containerClassName?: string
  buttonClassName?: string
}

export const FSButtonRadio = (props: ButtonRadioProps): JSX.Element => {
  const itemCount = props.options.length
  const splitLineItemIndex = props.splitLineItemIndex || 0

  const GetOptions = (): JSX.Element[] => {
    const optionButtons: JSX.Element[] = []

    props.options.forEach((item, idx) => {
      let buttonSlot = 'slotButton'

      if (itemCount === 1 || props.isMobileMode) {
        buttonSlot = 'slotButton-full'
      } else if (idx === 0) {
        buttonSlot = 'slotButton-left'
      } else if (idx === itemCount - 1) {
        buttonSlot = 'slotButton-right'
      } else if (splitLineItemIndex > 0 && idx === splitLineItemIndex - 1) {
        buttonSlot = 'slotButton-right'
      } else if (splitLineItemIndex > 0 && idx === (splitLineItemIndex)) {
        buttonSlot = 'slotButton-left'
      }

      optionButtons.push(<button key={`${props.name}-${item.key}`} className={[props.buttonClassName || '', buttonSlot, 'btn', props.currentValue === item.key ? 'btn-dark' : 'btn-outline-dark'].join(' ')} disabled={props.disabled} onClick={() => props.onChange(item.key)}> <span>{`${item.value}`}</span></button>)
    })

    return optionButtons
  }

  const GetSingleLineOptions = (): JSX.Element[] => {
    const optionButtons = GetOptions()

    return optionButtons
  }

  const GetSplitOptions = (): JSX.Element => {
    const optionButtons = GetOptions()

    const firstHalf = optionButtons.slice(0, splitLineItemIndex)
    const secondHalf = optionButtons.slice(splitLineItemIndex, itemCount)

    return (<div className="col-12"> <div className="row no-gutters">{firstHalf}</div> <div className="row no-gutters">{secondHalf}</div></div>)
  }

  return <div className={props.containerClassName || ''}>{splitLineItemIndex <= 0 ? GetSingleLineOptions() : GetSplitOptions()}</div>
}
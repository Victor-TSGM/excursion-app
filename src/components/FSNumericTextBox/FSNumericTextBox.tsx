import * as React from 'react'
import './FSNumericTextBox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

export interface FSNumericTextBoxProps {
  placeholder: string
  value: number
  onChange: (value: number) => void

  decimals?: number
  format?: string

  min?: number
  max?: number
  step?: number

  disabled?: boolean

  onFocus?: () => void
  onBlur?: () => void

  customClassName?: string
  htmlAttributes?: Record<string, string>

  hideButtons?: boolean
}

export const FSNumericTextBox = (props: FSNumericTextBoxProps): JSX.Element => {
  const [isFocused, setFocused] = React.useState<boolean>(false)

  const onFocus = (): void => {
    setFocused(true)

    props.onFocus?.()
  }

  const onBlur = (): void => {
    setFocused(false)

    props.onBlur?.()
  }

  return <div className='fs-input-container'>
    <div className={`fs-numeric-container ${props.customClassName} ${getInputClasses(props, props.value, isFocused)}`}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <label className="fs-numeric-label">{props.placeholder}</label>

      <input
        className='fs-numeric'
        type={'number'}

        min={props.min}
        max={props.max}

        value={props.value}
        disabled={props.disabled}

        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          props.onChange(Number(e.currentTarget.value))
        }}

        {...props.htmlAttributes}
      />


      {
        props.hideButtons ? <></> : <div className='fs-numeric-actions'>
          <button className='btn' type='button' onClick={() => {
            let newValue = props.value - (props.step || 1);

            if (props.min !== undefined && newValue < props.min) {
              newValue = props.min
            }

            props.onChange(newValue)
          }}>
            <FontAwesomeIcon icon={faMinus} />
          </button>

          <button className='btn' type='button' onClick={() => {
            let newValue = props.value + (props.step || 1);

            if (props.max !== undefined && newValue > props.max) {
              newValue = props.max
            }

            props.onChange(newValue)
          }}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      }
    </div>
  </div>
}

const getInputClasses = (props: FSNumericTextBoxProps, value: number, isFocused: boolean) => {
  let classes = ["fs-numeric-floating-label"];

  if (value) {
    classes.push("fs-numeric-has-value");
  }

  if (isFocused) {
    classes.push("fs-numeric-focused");
  }

  return classes.join(" ");
}
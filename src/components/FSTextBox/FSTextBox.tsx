import * as React from 'react'
import './FSTextBox.css'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { If } from '../If/If'

export interface FSTextBoxProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
  maxLength?: number
  disabled?: boolean
  type?: 'text' | 'text-area' | 'password'

  onFocus?: () => void
  onBlur?: () => void

  floatLabelType?: 'auto' | 'always'

  leadingIcon?: IconDefinition
  trailingIcon?: IconDefinition

  onLeadingIconClick?: () => void
  onTralingIconClick?: () => void

  customClassName?: string
  htmlAttributes?: Record<string, string>
  textAreaInitialHeight?: string
}

export const FSTextBox = (props: FSTextBoxProps): JSX.Element => {
  const inputType = props.type || 'text'
  const [isFocused, setFocused] = React.useState<boolean>(false)

  const onChangeHandler = (newValue: string): void => {
    if (newValue !== props.value) {
      props.onChange(newValue)
    }
  }

  const onFocus = (): void => {
    setFocused(true)

    props.onFocus?.()
  }

  const onBlur = (): void => {
    setFocused(false)

    props.onBlur?.()
  }

  return <div className='fs-input-container'>
    <div
      className={`fs-text-box-container ${props.customClassName} ${getInputClasses({
        ...props,
        floatLabelType: props.floatLabelType || 'auto'
      }, props.value, isFocused)}`}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {props.leadingIcon !== undefined ? <div className='fs-text-box-icon'
        style={{ cursor: props.onLeadingIconClick ? 'pointer' : 'initial' }}
        onClick={props.onLeadingIconClick}
      >
        <FontAwesomeIcon icon={props.leadingIcon} />
      </div> : <></>}

      <div className='fs-textbox-field'>
        <label className="fs-text-box-label">{props.placeholder}</label>

        <If condition={inputType === 'text-area'}>
          <textarea
            className='fs-text-box'
            maxLength={props.maxLength}
            value={props.value}
            disabled={props.disabled}
            onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
              onChangeHandler(e.currentTarget.value)
            }}

            style={{ height: props.textAreaInitialHeight || '48px' }}

            {...props.htmlAttributes}
          />
        </If>

        <If condition={inputType !== 'text-area'}>
          <input
            className='fs-text-box'
            type={inputType == 'password' ? 'password' : 'text'}
            maxLength={props.maxLength}
            value={props.value}
            disabled={props.disabled}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              onChangeHandler(e.currentTarget.value)
            }}

            {...props.htmlAttributes}
          />
        </If>
      </div>

      {
        props.trailingIcon !== undefined ? <div className='fs-text-box-icon'
          style={{ cursor: props.onTralingIconClick ? 'pointer' : 'initial' }}
          onClick={props.onTralingIconClick}
        >
          <FontAwesomeIcon icon={props.trailingIcon} />
        </div> : <></>
      }
    </div>
  </div>
}

const getInputClasses = (props: FSTextBoxProps, value: string, isFocused: boolean) => {
  let classes = [];

  if (props.floatLabelType === 'always' || (props.floatLabelType === 'auto' && isFocused)) {
    classes.push("fs-text-box-floating-label");
  }

  if (props.leadingIcon !== undefined) {
    classes.push("fs-text-box-leading-icon");
  }

  if (props.trailingIcon !== undefined) {
    classes.push("fs-text-box-trailing-icon");
  }

  if (value) {
    classes.push("fs-text-box-has-value");
  }

  if (isFocused) {
    classes.push("fs-text-box-focused");
  }

  return classes.join(" ");
}
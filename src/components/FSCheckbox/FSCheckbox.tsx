import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import './FSCheckbox.css'

export interface FSCheckboxProps {
  onCheck: (checked: boolean) => void
  label: string
  className?: string
  checked?: boolean
  alignCenter?: boolean
  showBackground?: boolean
}

export const FSCheckbox = (props: FSCheckboxProps): JSX.Element => {
  const [isChecked, setChecked] = useState(false)

  useEffect(() => {
    setChecked((props.checked) || false)
  }, [props.checked])

  const onCheck = (): void => {
    props.onCheck(!isChecked)
  }

  return <div className={props.className || ''}>
        <div className={`fs-checkbox-container ${(props.showBackground ? 'block' : '')} ${(isChecked ? ' checked' : '')}`} onClick={onCheck} style={{ justifyContent: props.alignCenter ? 'center' : 'start' }}>
            <FontAwesomeIcon icon={isChecked ? faCheckCircle : faCircle} size="lg" />
            {
              props.label ? <p className="mb-0 ms-2">{props.label}</p> : <></>
            }
        </div>
    </div>
}
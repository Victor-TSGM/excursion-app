import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import './ValidationDisplay.css'

export interface ValidationDisplayProps {
  text: string
}

export const ValidationDisplay = (props: ValidationDisplayProps): JSX.Element => {
  if (!props.text) {
    return <></>
  }

  return <div className='validation-display-field'>
    <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
    {props.text}
  </div>
}

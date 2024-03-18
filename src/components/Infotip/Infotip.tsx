import { faInfoCircle, faQuestionCircle, faTriangleExclamation, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import { Tooltip, TooltipPosition } from '../Tooltip/Tooltip'
import './Infotip.css'

export interface InfotipProps {
  text: string
  icon?: '?' | 'i' | '!'
  tooltipPosition?: TooltipPosition
}

const icons: Record<string, IconDefinition> = {
  i: faInfoCircle,
  '?': faQuestionCircle,
  '!': faTriangleExclamation
}

export const Infotip: FC<React.PropsWithChildren<InfotipProps>> = (props) => {
  return <div className="infotip-wrapper">
    <div className="infotip-children">
      {props.children}
    </div>
    <div className="infotip" >
      <Tooltip text={props.text} position={props.tooltipPosition}>
        <FontAwesomeIcon icon={icons[props.icon || 'i']} color="var(--primary-color)" />
      </Tooltip>
    </div>
  </div>
}
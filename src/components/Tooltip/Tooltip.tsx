import { useOnScreenVisibility, OffScreenSides } from '../../../main/hooks/useOnScreenVisibility'
import React, { MutableRefObject, ReactNode, useRef } from 'react'
import './Tooltip.css'

export type TooltipPosition = 'top' | 'left' | 'right' | 'bottom'

export interface TooltipProps {
  text: string
  children: ReactNode | undefined
  position?: TooltipPosition
  // trigger: 'hover' | 'click'
}

function getPosition (sides: OffScreenSides[]): TooltipPosition {
  if (!sides?.length) return 'top'
  if (sides.includes('right')) return 'left'
  if (sides.includes('left')) return 'right'
  if (sides.includes('top')) return 'bottom'
  return 'top'
}

export const Tooltip = React.forwardRef((props: TooltipProps, ref: MutableRefObject<HTMLDivElement>) => {
  const tooltipRef = useRef<HTMLDivElement>()
  const visibility = useOnScreenVisibility(tooltipRef)

  const position = props.position || getPosition(visibility?.offScreenSides)

  return <div className="tooltip-wrapper">
    <div ref={tooltipRef} className={`tooltip-content ${position}`}>{props.text}</div>
    {props.children}
  </div>
})

Tooltip.displayName = 'Tooltip'
import * as React from 'react'
import './SectionTitle.css'

export interface SectionTitleProps {
  className?: string
  disableBorderRadius?: boolean
}

export const SectionTitle = (props: React.PropsWithChildren<SectionTitleProps>): JSX.Element => {
  return <div className={'row g-0 fs-section-subtitle ' + (props.className || '')} style={{ borderRadius: props.disableBorderRadius ? '' : '7px' }}>
      {props.children}
  </div>
}
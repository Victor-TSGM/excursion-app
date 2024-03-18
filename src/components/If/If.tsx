import * as React from 'react'

export interface IfProps {
  condition: boolean
}

export const If: React.FC<React.PropsWithChildren<IfProps>> = (props: React.PropsWithChildren<IfProps>) => {
  return <>{props.condition && props.children}</>
}
import * as React from 'react'

export interface CaseProps<T> {
  case: T
}

export interface SwitchProps<T> {
  value: T
}

const Switch = <T,>(props: React.PropsWithChildren<SwitchProps<T>>): JSX.Element => {
  let renderDefault: boolean = true

  const cases = React.Children.map(props.children, child => {
    if (React.isValidElement(child) && child.type === Case && props.value === child.props.case) {
      renderDefault = false
      return child
    }
    return <></>
  })

  const defaults = React.Children.map(props.children, child => {
    if (React.isValidElement(child) && child.type === Default && renderDefault) {
      return child
    }
    return <></>
  })

  return <>{cases}{defaults}</>
}

export const Case = <T,>(props: React.PropsWithChildren<CaseProps<T>>): JSX.Element => {
  return <>{props.children}</>
}

export const Default = (props: React.PropsWithChildren<{}>): JSX.Element => {
  return <>{props.children}</>
}

export default Switch

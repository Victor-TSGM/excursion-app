import * as React from 'react'
import { Dropdown, Option, useId, shorthands, makeStyles, OptionOnSelectData } from "@fluentui/react-components";
import "./FSMultiSelect.css"

import * as fontawesome from '@fortawesome/free-regular-svg-icons'

const useStyles = makeStyles({
  container: {
    width: '100%',
    "& button": {
      ...shorthands.padding("10px", "10px", "5px", "0"),
    }
  }
})

export interface FSMultiSelectProps<T> {
  placeholder: string
  dataSource: T[]
  value: T[]
  onChange: (value: T[]) => void
  valueField: keyof T
  textField: keyof T

  disabled?: boolean
  customAttributes?: any

  displayTemplate?: (item: T) => string
  itemTemplate?: (item: T) => JSX.Element
}

export const FSMultiSelect = <T,>(props: FSMultiSelectProps<T>): JSX.Element => {
  const multiselectStyles = useStyles()
  const multiselecId = useId("fs-multiselect")

  const [value, setValue] = React.useState<string>('')

  React.useEffect(() => {
    setValue(
      props.dataSource.filter((s: T, index: number) => {
        return (props.value as T[]).map((s: T) => s[props.valueField]).includes(s[props.valueField])
      }).map(s => props.displayTemplate ? props.displayTemplate(s) : s[props.textField]).join(', ')
    )
  }, [props.dataSource, props.value])

  return (
    <div className='fs-input-container'>
      <div className='fs-multiselect-container'>
        <label className="fs-multiselect-label">{props.placeholder}</label>

        <Dropdown
          className={multiselectStyles.container}
          aria-labelledby={multiselecId}
          appearance='underline'
          placeholder={props.placeholder}

          value={value}
          selectedOptions={(props.value as T[]).map(s => s[props.valueField].toString())}
          multiselect={true}

          onOptionSelect={(_, data: OptionOnSelectData) => {
            props.onChange(props.dataSource.filter((s: T) => data.selectedOptions.includes(s[props.valueField].toString())))
          }}
        >
          {props.dataSource.map((option: T) => {
            let text = option[props.valueField].toString()
            
            return <Option key={`${multiselecId}-${option[props.valueField]}`} value={text} text={text}>
              {
                props.itemTemplate ? props.itemTemplate(option) : option[props.textField.toString()]
              }
            </Option>
          })}
        </Dropdown>
      </div>
    </div>
  );
}
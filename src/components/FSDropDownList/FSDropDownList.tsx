import * as React from 'react'
import { Dropdown, Option, useId, shorthands, makeStyles, OptionOnSelectData } from "@fluentui/react-components";
import "./FSDropDownList.css"

const useStyles = makeStyles({
  container: {
    width: '100%',
    "& button": {
      ...shorthands.padding("10px", "10px", "5px", "0"),
    }
  }
})

export interface FSDropDownListProps<T> {
  placeholder: string
  value: T

  dataSource: T[]

  valueField: keyof T
  textField: keyof T

  onChange: (value: T) => void

  disabled?: boolean

  displayTemplate?: (item: T) => string
  itemTemplate?: (item: T) => JSX.Element

  width?: string
}

export const FSDropDownList = <T,>(props: FSDropDownListProps<T>): JSX.Element => {
  const dropdownStyles = useStyles()
  const dropdownId = useId("fs-dropdown")

  const [value, setValue] = React.useState<string>('')

  React.useEffect(() => {
    if (!props.value) {
      setValue("-")
      return
    }

    setValue(props.displayTemplate ? props.displayTemplate(props.value) : props.value[props.textField].toString())
  }, [props.dataSource, props.value])

  return <div className='fs-input-container' style={{ width: props.width }}>
    <div className='fs-dropdown-container'>
      <label className="fs-dropdown-label">{props.placeholder}</label>

      <Dropdown
        className={dropdownStyles.container}
        aria-labelledby={dropdownId}
        appearance='underline'
        placeholder={props.placeholder}

        value={value}
        selectedOptions={props.value ? [props.value[props.valueField].toString()] : []}

        onOptionSelect={(_, data: OptionOnSelectData) => {
          props.onChange(props.dataSource.filter((s: T) => data.selectedOptions.includes(s[props.valueField].toString()))[0])
        }}
      >
        {props.dataSource.map((option: T) => {
          let text = option[props.valueField].toString()

          return <Option key={`${dropdownId}-${option[props.valueField]}`} value={text} text={text}>
            {
              props.itemTemplate ? props.itemTemplate(option) : option[props.textField.toString()]
            }
          </Option>
        })}
      </Dropdown>
    </div>
  </div>
}
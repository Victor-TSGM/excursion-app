import * as React from 'react'
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { makeStyles, shorthands } from "@fluentui/react-components";
import "./FSDatePicker.css"

const useStyles = makeStyles({
  container: {
    width: "100%",
    ...shorthands.padding("10px", "10px", "5px", "0"),
    ...shorthands.outline("none"),
    ...shorthands.border("none")
  }
});

export interface FSDatePickerProps {
  placeholder: string
  value: Date | undefined
  onChange: (value: Date) => void
  locale?: string

  allowTextInput?: boolean
  min?: Date
  max?: Date
}

export const FSDatePicker: React.FC<FSDatePickerProps> = (props: FSDatePickerProps) => {
  const styles = useStyles();

  return <div className='fs-input-container'>
    <div className='fs-datepicker-container'>
      <label className="fs-datepicker-label">{props.placeholder}</label>

      <DatePicker
        value={props.value}
        onSelectDate={props.onChange}
        className={styles.container}

        allowTextInput={props.allowTextInput}
        formatDate={(date?: Date) => {
          if (!date) {
            return '-'
          }

          return date.toLocaleDateString(props.locale || "pt-BR")
        }}

        strings={{
          goToToday: 'Hoje',
          days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
          months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          shortDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
          shortMonths: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        }}

        minDate={props.min}
        maxDate={props.max}
      />
    </div>
  </div>
}

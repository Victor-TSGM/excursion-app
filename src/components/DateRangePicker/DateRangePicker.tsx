import * as React from 'react'
import { DateRangeViewModel, DateRangeType, DateRangeTypeRecord } from '../../../domain/models'
import { useResource } from '../../hooks'
import { FSDatePicker } from '../FSDatePicker/FSDatePicker'
import { FSDropDownList } from '../FSDropDownList/FSDropDownList'
import { EnumListType, EnumToList } from '../../../domain/helpers'
import { If } from '../If/If'

export interface DateRangePickerProps {
  dateRange: DateRangeViewModel
  onChange: (dateRange: DateRangeViewModel) => void
}

const dataSource = EnumToList(DateRangeTypeRecord)

export const DateRangePicker: React.FC<DateRangePickerProps> = (props: DateRangePickerProps) => {
  const [selectedRange, setSelectedRange] = React.useState<EnumListType>()

  React.useEffect(() => {
    setSelectedRange(dataSource.filter(s => s.value == parseInt(props.dateRange.type.toString()))[0])
  }, [props.dateRange])

  React.useEffect(() => {
    if (selectedRange.value === parseInt(props.dateRange.type.toString())) {
      return
    }

    props.onChange({ ...props.dateRange, type: selectedRange.value })
  }, [selectedRange])

  const { t } = useResource()

  const isCustomized = props.dateRange.type === DateRangeType.Customized
  const rangeTypeContainerClass = isCustomized ? 'col-4' : 'col-12'

  return <div className='row' >
    <div className={rangeTypeContainerClass} >
      <FSDropDownList<EnumListType>
        placeholder={t('common.period')}
        value={selectedRange}
        onChange={(selectedType: EnumListType) => setSelectedRange(selectedType)}
        dataSource={dataSource}
        valueField="value"
        textField='text'
      />
    </div>
    <If condition={isCustomized} >
      <div className='col-4' >
        <FSDatePicker
          placeholder={t('common.startdate')}
          value={props.dateRange.start}
          onChange={(val) => props.onChange({ ...props.dateRange, start: val })}
        />
      </div>
      <div className='col-4' >
        <FSDatePicker
          placeholder={t('common.enddate')}
          value={props.dateRange.end}
          onChange={(val) => props.onChange({ ...props.dateRange, end: val })}
        />
      </div>
    </If>
  </div>
}
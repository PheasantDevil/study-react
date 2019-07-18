// import { Japanese } from 'flatpickr/dist/l10n/ja'
import * as React from 'react'
import Flatpickr from 'react-flatpickr'

interface Props {
  name: string
  value: string
  id?: string
  className?: string
  placeholder?: string
  setFieldValue: (name: any, value: any) => void
  onBlur: React.FocusEventHandler
}

const options = {
  enableTime: true,
  noCalendar: true,
  dateFormat: 'H:i',
  time_24hr: true,
  defaultDate: ''
}

const TimePicker: React.FunctionComponent<Props> = ({
  id,
  className,
  value,
  name,
  placeholder,
  onBlur,
  setFieldValue
}) => {
  const onChange = React.useCallback((_, value) => setFieldValue(name, value), [setFieldValue])
  return (
    <Flatpickr
      id={id}
      className={className}
      options={options}
      name={name}
      placeholder={placeholder}
      type="time"
      value={value}
      onClose={onChange} // TimePickerをOpenしたときに選択された値では、onChangeイベントが発火しない。仕方ないのでonCloseで設定する。
      {...{ onBlur }}
    />
  )
}

export default TimePicker

import { Japanese } from 'flatpickr/dist/l10n/ja'
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
  locale: Japanese
}

const DatePicker: React.FunctionComponent<Props> = ({
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
      type="date"
      value={value}
      onChange={onChange}
      {...{ onBlur }}
    />
  )
}

export default DatePicker

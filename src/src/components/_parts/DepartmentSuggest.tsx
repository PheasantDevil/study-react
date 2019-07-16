import { bind } from 'decko'
import { FormikHandlers, FormikHelpers } from 'formik'
import * as React from 'react'
import Select, { createFilter } from 'react-select'
import { ActionMeta, ValueType } from 'react-select/lib/types'
import { CombinedUnitPath } from '../../util/DepartmentHelper'

interface Props<V = string> {
  classNameModifier: string
  name: keyof V & string
  initialUnitId: number | void
  units: CombinedUnitPath[]
  setFieldValue: FormikHelpers<V>['setFieldValue']
  handleBlur: FormikHandlers['handleBlur']
}

interface State {
  inputValue: string
}

const getOptionValue = (d: CombinedUnitPath) => d.id + ''
const getOptionLabel = (d: CombinedUnitPath) => d.path
const customFilter = createFilter({ ignoreAccents: false })
const customStyles = { container: (base: any) => ({ ...base, padding: 0, border: 'none' }) }
const getNoOptionMessage = ({ inputValue }: { inputValue: string }) =>
  inputValue ? '検索中' : '部署名を入力してください'

export default class DepartmentSuggest<V> extends React.PureComponent<Props<V>, State> {
  constructor(props: Props<V>) {
    super(props)
    const unit = props.initialUnitId && props.units.find(u => u.id === props.initialUnitId)
    this.state = {
      inputValue: unit ? unit.path : ''
    }
  }

  @bind
  handleInputChange(inputValue: string) {
    this.setState({ inputValue })
  }

  @bind
  handleChange(value: ValueType<CombinedUnitPath>, { action }: ActionMeta) {
    this.props.setFieldValue(
      this.props.name,
      value && !Array.isArray(value) ? (value as CombinedUnitPath).id : null
    )
  }

  render() {
    return (
      <Select
        openMenuOnFocus
        className="u_flat u_w300"
        placeholder="営業部"
        noOptionsMessage={getNoOptionMessage}
        styles={customStyles}
        isClearable={true}
        cacheOptions={true}
        filterOption={customFilter}
        options={this.props.units}
        name={this.props.name}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        ignoreAccents={false}
        inputValue={this.state.inputValue}
        onInputChange={this.handleInputChange}
        onChange={this.handleChange}
        onBlur={this.props.handleBlur}
      />
    )
  }
}

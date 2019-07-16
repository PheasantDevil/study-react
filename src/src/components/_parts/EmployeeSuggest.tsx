import { bind } from 'decko'
import * as React from 'react'
import EmployeeCompact from '../../swagger/model/employeeCompact'
import AsyncSelect from 'react-select/lib/Async'
import { OptionsType, ValueType, ActionMeta } from 'react-select/lib/types'
import { createFilter } from 'react-select'
import { FormikHelpers, FormikHandlers } from 'formik'

interface Props<V> {
  classNameModifier: string
  name: keyof V & string
  initialEmployeeId: number | null
  fetchEmployeeSuggest: (params: {
    employeeId?: number
    name?: string
  }) => Promise<EmployeeCompact[]>
  setFieldValue: FormikHelpers<V>['setFieldValue']
  handleBlur: FormikHandlers['handleBlur']
}

interface State {
  inputValue: string
}

const getOptionLabel = ({ familyName, givenName, employeeCode }: EmployeeCompact) =>
  `${familyName} ${givenName} (${employeeCode})`
const getOptionValue = ({ employeeId }: EmployeeCompact) => employeeId as any
const customFilter = createFilter({ ignoreAccents: false })
const customStyles = { container: (base: any) => ({ ...base, padding: 0, border: 'none' }) }
const getNoOptionMessage = ({ inputValue }: { inputValue: string }) =>
  inputValue ? '検索中' : '従業員名を入力してください'

export default class EmployeeSuggest<V> extends React.PureComponent<Props<V>, State> {
  state: State = { inputValue: '' }

  async componentDidMount() {
    if (this.props.initialEmployeeId) {
      const employee = await this.props.fetchEmployeeSuggest({
        employeeId: this.props.initialEmployeeId
      })
      if (employee.length === 1) {
        this.setState({ inputValue: `${employee[0].familyName}${employee[0].givenName}` })
      }
    }
  }

  @bind
  async loadOptions(inputValue: string, callback: (options: OptionsType<EmployeeCompact>) => void) {
    const employees = await this.props.fetchEmployeeSuggest({ name: inputValue })
    callback(employees)
  }

  @bind
  handleInputChange(inputValue: string) {
    this.setState({ inputValue })
  }

  @bind
  handleChange(value: ValueType<EmployeeCompact>, { action }: ActionMeta) {
    console.log(value, action)
    this.props.setFieldValue(
      this.props.name,
      value && !Array.isArray(value) ? (value as EmployeeCompact).employeeId : null
    )
  }

  render() {
    return (
      <AsyncSelect
        className="u_flat u_w300"
        placeholder=""
        noOptionsMessage={getNoOptionMessage}
        styles={customStyles}
        isClearable={true}
        cacheOptions={true}
        filterOption={customFilter}
        name={this.props.name}
        loadOptions={this.loadOptions}
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

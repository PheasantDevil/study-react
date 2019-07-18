import * as React from 'react'
import EmployeesProgressForm from '../../../components/corporate/employees/EmployeesProgressForm'
import { RouteComponentProps } from 'react-router'
import { bind } from 'decko'

class CorporateEmployeesSearchFormContainer extends React.Component<
  RouteComponentProps<{}>,
  {
    employeeCode: string
    name: string
    selected: number
  }
> {
  constructor(props: RouteComponentProps<{}>) {
    super(props)
    this.state = {
      employeeCode: props.location.search['employeeCode'] || '',
      name: props.location.search['name'] || '',
      selected: props.location.search['selected'] || ''
    }
  }

  @bind
  queryPush(queryString: string) {
    this.props.history.push({
      search: queryString
    })
  }

  render() {
    return (
      <div className="search">
        <EmployeesProgressForm
          employeeCode={this.state.employeeCode}
          name={this.state.name}
          selected={this.state.selected}
          queryPush={this.queryPush}
        />
      </div>
    )
  }
}
export default CorporateEmployeesSearchFormContainer

import * as React from 'react'
import { WithQueryProps } from '../../../framework/hocs/withQueryUpdate'
import EmployeeDetail from '../../../components/corporate/employees/EmployeeDetail'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import User from '../../../models/User'
import Account from '../../../models/Account'
import { getEmployeeApi } from '../../../swagger/api/corporate.service'
import { bind } from 'decko'
import LoadingPlaceholder from '../../../components/LoadingPlaceholder'
import queryString from 'query-string'
import Employee from '../../../swagger/model/employee'

interface State {
  loaded: boolean
  employeeId: number
  selectedTab: string
  employeeInfo: Employee | null
}

class CorporateEmployeeDetailContainer extends React.Component<
  WithQueryProps<{
    employeeId: string
  }> &
    AuthContext<User>,
  State
> {
  constructor(props: WithQueryProps<{ employeeId: string }> & AuthContext<User>) {
    super(props)
    this.state = {
      loaded: false,
      employeeId: parseInt(props.match.params.employeeId, 10),
      selectedTab: props.location.search['selected'] || 'employeeBasicInfo',
      employeeInfo: null
    }
  }

  async componentDidMount() {
    await this.setInfo()
  }

  async componentDidUpdate(prevProps: WithQueryProps<{}> & AuthContext<User>) {
    if (this.props.location.search !== prevProps.location.search) {
      await this.setInfo()
    }
  }

  @bind
  async setInfo() {
    const querySelected = queryString.parse(location.search)['selected'] || this.state.selectedTab

    this.setState({
      loaded: false
    })

    switch (querySelected) {
      case 'employeeBasicInfo':
        const employeeInfo = await getEmployeeApi({
          authorization: await this.props.authorizer.getIdToken(),
          employeeId: this.state.employeeId
        })

        this.setState({
          loaded: true,
          employeeId: this.state.employeeId,
          employeeInfo: employeeInfo,
          selectedTab: querySelected
        })
        break

      case 'checkupResult':
        this.setState({
          loaded: true,
          employeeId: this.state.employeeId,
          selectedTab: querySelected
        })
        break

      case 'stressCheckResult':
        this.setState({
          loaded: true,
          employeeId: this.state.employeeId,
          selectedTab: querySelected
        })
        break

      case 'consultationHistory':
        this.setState({
          loaded: true,
          employeeId: this.state.employeeId,
          selectedTab: querySelected
        })
        break
    }
  }

  render() {
    const { loaded, employeeInfo: EmployeeInfo, selectedTab } = this.state
    return loaded ? (
      <EmployeeDetail
        selectedTab={selectedTab}
        employeeBasicInfo={EmployeeInfo!}
        checkupResult={'checkupResult'}
        stressCheckResult={'stressCheckResult'}
        consultationHistory={'consultationHistory'}
      />
    ) : (
      <LoadingPlaceholder />
    )
  }
}
export default Account.withAuthConsumer(CorporateEmployeeDetailContainer)

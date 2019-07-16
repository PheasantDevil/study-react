import { bind } from 'decko'
import React from 'react'
import { RouteComponentProps } from 'react-router'
import BlockUI from '../../../components/BlockUI'
import EmployeeComplete from '../../../components/corporate/employees/EmployeeComplete'
import EmployeeConfirm from '../../../components/corporate/employees/EmployeeConfirm'
import EmployeeEdit, { Values } from '../../../components/corporate/employees/EmployeeEdit'
import { corporateEmployeesNew } from '../../../config/Url'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import Account from '../../../models/Account'
import User from '../../../models/User'
import {
  getEmployeeApi,
  getOrganizationUnitsApi,
  postEmployeesApi,
  putEmployeeApi
} from '../../../swagger/api/corporate.service'
import { CombinedUnitPath, flatToTreeData, treeToPaths } from '../../../util/DepartmentHelper'

type Progress = 'edit' | 'comfirm' | 'complete'

interface State {
  isNew: boolean
  loaded: boolean
  employeeId: number | null
  values: Values
  units: CombinedUnitPath[]
  progress: Progress
}

const initialValues = {
  birthday: '',
  businessMail: '',
  employeeCode: '',
  familyName: '',
  familyNameKana: '',
  givenName: '',
  givenNameKana: '',
  managerAssignment: false,
  organizationUnitId: 0,
  sex: '',
  signinAssignment: true,
  stresscheckOperatorAssignment: false,
  username: ''
}
class CorporateEmployeeEditContainer extends React.Component<
  RouteComponentProps<{
    employeeId: string
  }> &
    AuthContext<User>,
  State
> {
  constructor(props: RouteComponentProps<{ employeeId: string }> & AuthContext<User>) {
    super(props)
    const isNew = props.location.pathname === corporateEmployeesNew
    this.state = {
      isNew,
      loaded: false,
      values: initialValues,
      units: [],
      employeeId: parseInt(this.props.match.params.employeeId, 10),
      progress: 'edit'
    }
  }

  async componentDidMount() {
    const authorization = await this.props.authorizer.getIdToken()
    if (this.state.isNew) {
      const { organizationUnits } = await getOrganizationUnitsApi({ authorization })
      this.setState({ units: treeToPaths(flatToTreeData(organizationUnits)), loaded: true })
    } else {
      const [employeePost, { organizationUnits }] = await Promise.all([
        getEmployeeApi({
          employeeId: this.state.employeeId!,
          authorization
        }),
        getOrganizationUnitsApi({ authorization })
      ])
      this.setState({
        values: employeePost,
        units: treeToPaths(flatToTreeData(organizationUnits)),
        loaded: true
      })
    }
  }

  toAddNewEmployee = () => {
    this.setState({ progress: 'edit', values: initialValues })
  }

  @bind
  toConfirm(values: Values) {
    this.setState({ progress: 'comfirm', values }, () => window.scroll(0, 0))
  }

  @bind
  back() {
    this.setState({ progress: 'edit' }, () => window.scroll(0, 0))
  }

  @bind
  async submit(e: React.FormEvent) {
    e.preventDefault()

    this.setState({ loaded: false })

    if (this.state.isNew) {
      const result = await postEmployeesApi({
        body: { ...this.state.values, username: this.state.values.businessMail },
        authorization: await this.props.authorizer.getIdToken()
      })
      this.setState({ loaded: true, progress: 'complete', employeeId: result.employeeId }, () =>
        window.scroll(0, 0)
      )
    } else {
      await putEmployeeApi({
        employeeId: this.state.employeeId!,
        body: this.state.values,
        authorization: await this.props.authorizer.getIdToken()
      })
      this.setState({ loaded: true, progress: 'complete', employeeId: this.state.employeeId }, () =>
        window.scroll(0, 0)
      )
    }
  }

  render() {
    const { loaded, isNew, employeeId, progress, values, units } = this.state
    return loaded ? (
      progress === 'edit' ? (
        <EmployeeEdit
          isNew={isNew}
          employeeId={employeeId}
          employeePost={values}
          units={units}
          submit={this.toConfirm}
        />
      ) : progress === 'comfirm' ? (
        <EmployeeConfirm
          isNew={isNew}
          employeePost={values}
          units={units}
          back={this.back}
          submit={this.submit}
        />
      ) : progress === 'complete' ? (
        isNew ? (
          <EmployeeComplete
            isNew={isNew}
            employeeId={employeeId}
            toAddNewEmployee={this.toAddNewEmployee}
          />
        ) : (
          <EmployeeComplete
            isNew={isNew}
            employeeId={employeeId}
            toAddNewEmployee={this.toAddNewEmployee}
          />
        )
      ) : null
    ) : (
      <BlockUI />
    )
  }
}

export default Account.withAuthConsumer(CorporateEmployeeEditContainer)

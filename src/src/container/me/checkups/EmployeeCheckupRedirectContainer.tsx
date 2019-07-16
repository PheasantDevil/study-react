import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { meCheckupsUrl } from '../../../config/Url'
import BlockUI from '../../../components/BlockUI'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import User from '../../../models/User'
import Account from '../../../models/Account'
import { getCheckupsApi } from '../../../swagger/api/employee.service'

class EmployeeCheckupRedirectContainer extends React.Component<
  RouteComponentProps<{}> & AuthContext<User>,
  {
    notExists: boolean
  }
> {
  state = {
    notExists: false
  }
  async componentDidMount() {
    const results = await getCheckupsApi({
      authorization: await this.props.authorizer.getIdToken()
    })

    const recentResult = results.find(result => !!result.checkupKarteId)
    if (recentResult) {
      return this.props.history.push(meCheckupsUrl(recentResult.checkupTargetId))
    }
    this.setState({ notExists: true })
  }
  render() {
    return this.state.notExists ? <p>健康診断の結果がありません</p> : <BlockUI />
  }
}
export default Account.withAuthConsumer(EmployeeCheckupRedirectContainer)

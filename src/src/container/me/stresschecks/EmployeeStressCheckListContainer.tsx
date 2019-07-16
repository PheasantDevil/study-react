import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import BlockUI from '../../../components/BlockUI'
import Account from '../../../models/Account'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import User from '../../../models/User'
import { Link } from 'react-router-dom'
import { meStresschecksTargetUrl, meStresschecksTargetNewUrl } from '../../../config/Url'
import StressCheckTargetMetadata from '../../../swagger/model/stressCheckTargetMetadata'
import { getStressChecksApi } from '../../../swagger/api/employee.service'

interface State {
  loaded: boolean
  results: StressCheckTargetMetadata[]
  targetBool: boolean
}

class EmployeeStressCheckListContainer extends React.Component<
  RouteComponentProps<{}> & AuthContext<User>,
  State
> {
  state: State = {
    loaded: false,
    results: [],
    targetBool: false
  }
  async componentDidMount() {
    this.setState({
      loaded: true
    })
    const results = await getStressChecksApi({
      authorization: await this.props.authorizer.getIdToken()
    })

    this.setState({
      results,
      targetBool: results.length ? true : false,
      loaded: true
    })
  }
  render() {
    const { loaded, results, targetBool } = this.state

    return loaded ? (
      targetBool ? (
        results.map(result => (
          <Link
            to={
              result.answered
                ? meStresschecksTargetUrl(result.stresscheckTargetId)
                : meStresschecksTargetNewUrl(result.stresscheckTargetId)
            }
            key={result.stresscheckTargetId}
          >
            <button>{`${result.stresscheckProjectName}(${result.answered ? '済' : '未'})`}</button>
          </Link>
        ))
      ) : (
        <p>現在、ストレスチェックが設定されておりません</p>
      )
    ) : (
      <BlockUI />
    )
  }
}
export default Account.withAuthConsumer(EmployeeStressCheckListContainer)

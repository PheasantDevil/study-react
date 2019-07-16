import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import BlockUI from '../../../components/BlockUI'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import User from '../../../models/User'
import Account from '../../../models/Account'
import StressCheckProjectWithNumberOfTargets from '../../../swagger/model/stressCheckProjectWithNumberOfTargets'
import { getStressCheckProjectsApi } from '../../../swagger/api/corporate.service'
import StressCheckSetting from '../../../components/corporate/stresschecks/StressCheckSetteing'

interface State {
  loaded: boolean
  projects: StressCheckProjectWithNumberOfTargets[]
  projectsBool: boolean
}

class CorporateStressCheckSettingListContainer extends React.Component<
  RouteComponentProps<{}> & AuthContext<User>,
  State
> {
  state: State = {
    loaded: false,
    projects: [],
    projectsBool: false
  }
  async componentDidMount() {
    this.setState({
      loaded: false
    })
    const projects = await getStressCheckProjectsApi({
      authorization: await this.props.authorizer.getIdToken()
    })
    this.setState({
      projects,
      projectsBool: projects.length ? true : false,
      loaded: true
    })
  }
  render() {
    const { loaded, projects, projectsBool } = this.state

    return loaded ? (
      <StressCheckSetting projects={projects} projectsBool={projectsBool} />
    ) : (
      <BlockUI />
    )
  }
}

export default Account.withAuthConsumer(CorporateStressCheckSettingListContainer)

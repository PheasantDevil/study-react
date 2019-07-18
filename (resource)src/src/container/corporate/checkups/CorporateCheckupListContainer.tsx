import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import BlockUI from '../../../components/BlockUI'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import User from '../../../models/User'
import Account from '../../../models/Account'
import MedicalCheckupProjectMetadataWithNumberOfTargets from '../../../swagger/model/medicalCheckupProjectMetadataWithNumberOfTargets'
import { getMedicalCheckupProjectsApi } from '../../../swagger/api/corporate.service'
import CheckupSetting from '../../../components/corporate/checkups/CheckupSetting'

interface State {
  loaded: boolean
  projects: MedicalCheckupProjectMetadataWithNumberOfTargets[]
  projectsBool: boolean
}

class CorporateCheckupListContainer extends React.Component<
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
    const projects = await getMedicalCheckupProjectsApi({
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

    return loaded ? <CheckupSetting projects={projects} projectsBool={projectsBool} /> : <BlockUI />
  }
}

export default Account.withAuthConsumer(CorporateCheckupListContainer)

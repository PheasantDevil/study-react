import { bind } from 'decko'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import MedicalAdvisorsList from '../../../components/corporate/medical_advisors/MedicalAdvisorsList'
import BlockUI from '../../../components/BlockUI'
import { corporateMedicalAdvisorsEditUrl } from '../../../config/Url'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import Account from '../../../models/Account'
import User from '../../../models/User'
import { getMedicalAdvisorsApi } from '../../../swagger/api/corporate.service'
import MedicalAdvisor from '../../../swagger/model/medicalAdvisor'

type Props = RouteComponentProps & AuthContext<User>

interface State {
  loaded: boolean
  blocking: boolean
  MedicalAdvisorList: MedicalAdvisor[]
  selected: number[]
}

class CorporateMedicalAdvisorListContainer extends React.Component<Props, State> {
  state: State = {
    loaded: false,
    blocking: false,
    MedicalAdvisorList: [],
    selected: []
  }

  async componentDidMount() {
    const MedicalAdvisorList = await getMedicalAdvisorsApi({
      authorization: await this.props.authorizer.getIdToken()
    })
    this.setState({ MedicalAdvisorList, loaded: true })
  }

  @bind
  handleRowClick(e: React.MouseEvent<HTMLDivElement>) {
    this.props.history.push(corporateMedicalAdvisorsEditUrl(e.currentTarget.dataset['id'] as any))
  }

  render() {
    const { loaded, MedicalAdvisorList, selected } = this.state
    return (
      <DocumentTitle title='産業医一覧'>
        {loaded ? (
          <MedicalAdvisorsList
            MedicalAdvisorsList={MedicalAdvisorList}
            selected={selected}
            handleRowClick={this.handleRowClick}
          />
        ) : (
            <BlockUI />
          )
        }
      </DocumentTitle>
    )
  }
}

export default Account.withAuthConsumer(CorporateMedicalAdvisorListContainer)

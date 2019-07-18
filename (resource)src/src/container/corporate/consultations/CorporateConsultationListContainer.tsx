import { bind } from 'decko'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ConsultationList from '../../../components/corporate/consultations/ConsultationList'
import LoadingPlaceholder from '../../../components/LoadingPlaceholder'
import { corporateConsultationsDetailUrl } from '../../../config/Url'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import Account from '../../../models/Account'
import User from '../../../models/User'
import {
  deleteConsultationHighStressApi,
  deleteConsultationLongHourApi,
  deleteConsultationMedicalCheckupApi,
  getConsultationsApi
} from '../../../swagger/api/corporate.service'
import ConsultationMetadata from '../../../swagger/model/consultationMetadata'

type Props = RouteComponentProps & AuthContext<User>

interface State {
  loaded: boolean
  blocking: boolean
  consultations: ConsultationMetadata[]
  selectedIds: number[]
}

class CorporateConsultationListContainer extends React.Component<Props, State> {
  state: State = {
    loaded: false,
    blocking: false,
    consultations: [],
    selectedIds: []
  }

  async componentDidMount() {
    const consultations = await getConsultationsApi({
      authorization: await this.props.authorizer.getIdToken()
    })
    this.setState({ consultations, loaded: true })
  }

  @bind
  handleRowClick(e: React.MouseEvent<HTMLDivElement>) {
    this.props.history.push(
      corporateConsultationsDetailUrl(
        e.currentTarget.dataset['id'] as any,
        e.currentTarget.dataset['consultationType'] as any
      )
    )
  }

  @bind
  handleAllCheckboxClick() {
    this.setState({
      selectedIds:
        this.state.selectedIds.length < this.state.consultations.length
          ? this.state.consultations.map(c => c.id)
          : []
    })
  }

  @bind
  handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const clickedId = parseInt(e.currentTarget.id, 10)
    this.setState({
      selectedIds: this.state.selectedIds.includes(clickedId)
        ? this.state.selectedIds.filter(id => id !== clickedId)
        : [...this.state.selectedIds, clickedId]
    })
  }

  @bind
  async deleteConsultations(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault()
    if (
      window.confirm(`${this.state.selectedIds.length}件の面談記録を削除します。よろしいですか？`)
    ) {
      this.setState({ blocking: true })
      const authorization = await this.props.authorizer.getIdToken()
      await Promise.all(
        this.state.selectedIds
          .map(id => this.state.consultations.find(c => c.id === id)!)
          .map(async c => {
            const params = {
              authorization,
              consultationId: c.id
            }
            switch (c.consultationType) {
              case 'medical_checkup':
                await deleteConsultationMedicalCheckupApi(params)
                break
              case 'high_stress':
                await deleteConsultationHighStressApi(params)
                break
              case 'long_hour':
                await deleteConsultationLongHourApi(params)
                break
              default:
                throw new Error('not implemented')
            }
          })
      )
      this.setState({ blocking: false })
    }
  }

  render() {
    const { loaded, consultations, selectedIds } = this.state
    return loaded ? (
      <ConsultationList
        consultations={consultations}
        selectedIds={selectedIds}
        handleAllCheckboxClick={this.handleAllCheckboxClick}
        handleCheckboxChange={this.handleCheckboxChange}
        handleRowClick={this.handleRowClick}
        deleteConsultations={this.deleteConsultations}
      />
    ) : (
      <LoadingPlaceholder />
    )
  }
}

export default Account.withAuthConsumer(CorporateConsultationListContainer)

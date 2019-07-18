import { bind } from 'decko'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import DocumentTitle from 'react-document-title'
import BlockUI from '../../../components/BlockUI'
import LoadingPlaceholder from '../../../components/LoadingPlaceholder'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import Account from '../../../models/Account'
import User from '../../../models/User'
import { corporateMedicalAdvisorsNew } from '../../../config/Url'
import {
  getMedicalAdvisorApi,
  postMedicalAdvisorsApi,
  putMedicalAdvisorApi
} from '../../../swagger/api/corporate.service'
import MedicalAdvisorEdit, {
  Values
} from '../../../components/corporate/medical_advisors/MedicalAdvisorEdit'
import MedicalAdvisorComfirm from '../../../components/corporate/medical_advisors/MedicalAdvisorConfirm'
import MedicalAdvisorComplete from '../../../components/corporate/medical_advisors/MedicalAdvisorComplete'
import MedicalAdvisor from '../../../swagger/model/medicalAdvisorRequest'

type Progress = 'edit' | 'comfirm' | 'complete'

interface State {
  isNew: boolean
  medicalAdvisorId: number
  loaded: boolean
  medicalAdvisor: MedicalAdvisor | null
  progress: Progress
  values?: Values
  blocking: boolean
}

const initialValues = {
  familyName: '',
  givenName: '',
  signinAssignment: true,
  username: ''
}

class CorporateMedicalAdvisorEditContainer extends React.Component<
  RouteComponentProps<{
    medicalAdvisorId: string
  }> &
    AuthContext<User>,
  State
> {
  constructor(props: RouteComponentProps<{ medicalAdvisorId: string }> & AuthContext<User>) {
    super(props)
    const isNew = props.location.pathname === corporateMedicalAdvisorsNew
    this.state = {
      isNew,
      medicalAdvisorId: parseInt(this.props.match.params.medicalAdvisorId, 10),
      loaded: isNew,
      medicalAdvisor: null,
      blocking: false,
      progress: 'edit'
    }
  }

  async componentDidMount() {
    if (!this.state.isNew && !this.state.loaded) {
      const medicalAdvisor = await getMedicalAdvisorApi({
        medicalAdvisorId: this.state.medicalAdvisorId,
        authorization: await this.props.authorizer.getIdToken()
      })
      this.setState({ medicalAdvisor, loaded: true })
    }
  }

  toAddNewMedicalAdvisor = () => {
    this.setState({ progress: 'edit', medicalAdvisor: initialValues })
  }

  @bind
  toComfirm(values: Values) {
    this.setState({ progress: 'comfirm', values }, () => window.scroll(0, 0))
  }

  @bind
  toForm() {
    this.setState({ progress: 'edit' }, () => window.scroll(0, 0))
  }

  @bind
  back() {
    this.setState({ progress: 'edit' }, () => window.scroll(0, 0))
  }

  @bind
  async submit(e: React.FormEvent) {
    this.setState({ blocking: true })
    e.preventDefault()

    this.state.isNew
      ? await postMedicalAdvisorsApi({
          body: {
            signinAssignment: this.state.values!.signin_assignment === '1',
            familyName: this.state.values!.familyName,
            givenName: this.state.values!.givenName,
            username:
              this.state.values!.signin_assignment === '1'
                ? this.state.values!.userName
                : 'medical.advisor@micro-wave.net'
          },
          authorization: await this.props.authorizer.getIdToken()
        })
      : await putMedicalAdvisorApi({
          medicalAdvisorId: this.state.medicalAdvisorId,
          body: {
            signinAssignment: this.state.values!.signin_assignment === '1',
            familyName: this.state.values!.familyName,
            givenName: this.state.values!.givenName,
            username:
              this.state.values!.signin_assignment === '1'
                ? this.state.values!.userName
                : 'medical.advisor@micro-wave.net'
          },
          authorization: await this.props.authorizer.getIdToken()
        })

    this.setState({ blocking: false, progress: 'complete' }, () => window.scroll(0, 0))
  }

  render() {
    const {
      loaded,
      blocking,
      isNew,
      medicalAdvisor,
      progress,
      values,
      medicalAdvisorId
    } = this.state
    return (
      <DocumentTitle title={isNew ? '産業医の新規作成' : '産業医の詳細更新'}>
        {loaded ? (
          <>
            {progress === 'edit' ? (
              <MedicalAdvisorEdit
                isNew={isNew}
                medicalAdvisor={medicalAdvisor}
                submit={this.toComfirm}
              />
            ) : progress === 'comfirm' ? (
              <MedicalAdvisorComfirm
                values={values!}
                isNew={isNew}
                back={this.toForm}
                submit={this.submit}
              />
            ) : progress === 'complete' ? (
              isNew ? (
                <MedicalAdvisorComplete
                  isNew={isNew}
                  medicalAdvisorId={medicalAdvisorId}
                  toAddNewMedicalAdvisor={this.toAddNewMedicalAdvisor}
                />
              ) : (
                <MedicalAdvisorComplete
                  isNew={isNew}
                  medicalAdvisorId={medicalAdvisorId}
                  toAddNewMedicalAdvisor={this.toAddNewMedicalAdvisor}
                />
              )
            ) : null}
            {blocking ? <BlockUI /> : null}
          </>
        ) : (
          <LoadingPlaceholder />
        )}
      </DocumentTitle>
    )
  }
}

export default Account.withAuthConsumer(CorporateMedicalAdvisorEditContainer)

import * as React from 'react'
import { bind } from 'decko'
import { RouteComponentProps } from 'react-router'
import DocumentTitle from 'react-document-title'
import { corporateStresschecksNew } from '../../../config/Url'
import StressCheckEdit, { Values } from '../../../components/corporate/stresschecks/StressCheckEdit'
import StressCheckComfirm from '../../../components/corporate/stresschecks/StressCheckComfirm'
import StressCheckComplete from '../../../components/corporate/stresschecks/StressCheckComplete'
import BlockUI from '../../../components/BlockUI'
import LoadingPlaceholder from '../../../components/LoadingPlaceholder'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import User from '../../../models/User'
import Account from '../../../models/Account'
import StressCheckProject from '../../../swagger/model/stressCheckProject'
import {
  postStressCheckProjectsApi,
  putStressCheckProjectApi,
  getStressCheckProjectApi
} from '../../../swagger/api/corporate.service'
import { getQuestionnairesApi } from '../../../swagger/api/general.service'

type Progress = 'edit' | 'comfirm' | 'complete'

interface State {
  isNew: boolean
  projectId: number
  loaded: boolean
  project: StressCheckProject | null
  questionnaireId: number
  values?: Values
  progress: Progress
  blocking: boolean
}

class CorporateStressCheckEditContainer extends React.Component<
  RouteComponentProps<{
    projectId: string
  }> &
    AuthContext<User>,
  State
> {
  constructor(props: RouteComponentProps<{ projectId: string }> & AuthContext<User>) {
    super(props)
    const isNew = props.location.pathname === corporateStresschecksNew
    this.state = {
      isNew,
      projectId: parseInt(this.props.match.params.projectId, 10),
      loaded: isNew,
      project: null,
      questionnaireId: 0, // 仮の初期値:0
      blocking: false,
      progress: 'edit'
    }
  }

  async componentDidMount() {
    const questionnaires = await getQuestionnairesApi({
      authorization: await this.props.authorizer.getIdToken()
    })
    this.setState({ questionnaireId: questionnaires[0].id })

    if (!this.state.isNew && !this.state.loaded) {
      const project = await getStressCheckProjectApi({
        projectId: this.state.projectId,
        authorization: await this.props.authorizer.getIdToken()
      })
      this.setState({ project, loaded: true })
    }
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
    this.setState({ blocking: true })
    e.preventDefault()

    this.state.isNew
      ? await postStressCheckProjectsApi({
          body: {
            year: this.state.values!.year,
            name: this.state.values!.name,
            period: { start: this.state.values!.start, end: this.state.values!.end },
            purpose: this.state.values!.purpose,
            examinee: this.state.values!.examinee,
            operator: this.state.values!.operator,
            regulations: this.state.values!.regulations,
            aboutDisclosure: this.state.values!.aboutDisclosure,
            encouragement: this.state.values!.encouragement,
            questionnaireId: this.state.questionnaireId,
            pointOfConversionMethodB1: this.state.values!.pointOfConversionMethodB1,
            pointOfConversionMethodB2: this.state.values!.pointOfConversionMethodB2,
            pointOfConversionMethodC2: this.state.values!.pointOfConversionMethodC2
          },
          authorization: await this.props.authorizer.getIdToken()
        })
      : await putStressCheckProjectApi({
          projectId: this.state.projectId,
          body: {
            year: this.state.values!.year,
            name: this.state.values!.name,
            period: { start: this.state.values!.start, end: this.state.values!.end },
            purpose: this.state.values!.purpose,
            examinee: this.state.values!.examinee,
            operator: this.state.values!.operator,
            regulations: this.state.values!.regulations,
            aboutDisclosure: this.state.values!.aboutDisclosure,
            encouragement: this.state.values!.encouragement,
            questionnaireId: this.state.questionnaireId,
            pointOfConversionMethodB1: this.state.values!.pointOfConversionMethodB1,
            pointOfConversionMethodB2: this.state.values!.pointOfConversionMethodB2,
            pointOfConversionMethodC2: this.state.values!.pointOfConversionMethodC2
          },
          authorization: await this.props.authorizer.getIdToken()
        })
    this.setState({ blocking: false, progress: 'complete' }, () => window.scroll(0, 0))
  }

  render() {
    const { loaded, isNew, project, progress, values, blocking } = this.state
    return (
      <DocumentTitle title={isNew ? 'ストレスチェックの新規作成' : 'ストレスチェックの詳細更新'}>
        {loaded ? (
          <>
            {progress === 'edit' ? (
              <StressCheckEdit
                isNew={isNew}
                project={project}
                submit={this.toConfirm}
                questionnaireId={this.state.questionnaireId}
              />
            ) : progress === 'comfirm' ? (
              <StressCheckComfirm
                values={values!}
                isNew={isNew}
                project={project}
                back={this.back}
                submit={this.submit}
              />
            ) : progress === 'complete' ? (
              <StressCheckComplete isNew={isNew} project={project} />
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

export default Account.withAuthConsumer(CorporateStressCheckEditContainer)

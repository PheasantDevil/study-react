import * as React from 'react'
import { bind } from 'decko'
import { RouteComponentProps } from 'react-router'
import DocumentTitle from 'react-document-title'
import { corporateCheckupsNew } from '../../../config/Url'
import CheckupEdit, { Values } from '../../../components/corporate/checkups/CheckupEdit'
import CheckupComfirm from '../../../components/corporate/checkups/CheckupComfirm'
import CheckupComplete from '../../../components/corporate/checkups/CheckupComplete'
import BlockUI from '../../../components/BlockUI'
import LoadingPlaceholder from '../../../components/LoadingPlaceholder'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import User from '../../../models/User'
import Account from '../../../models/Account'
import MedicalCheckupProjectMetadata from '../../../swagger/model/medicalCheckupProjectMetadata'
import {
  getMedicalCheckupProjectApi,
  postMedicalCheckupProjectsApi,
  putMedicalCheckupProjectApi
} from '../../../swagger/api/corporate.service'

type Progress = 'edit' | 'comfirm' | 'complete'

interface State {
  isNew: boolean
  projectId: number
  loaded: boolean
  project: MedicalCheckupProjectMetadata | null
  values?: Values
  progress: Progress
  blocking: boolean
}

class CorporateCheckupEditContainer extends React.Component<
  RouteComponentProps<{
    projectId: string
  }> &
    AuthContext<User>,
  State
> {
  constructor(props: RouteComponentProps<{ projectId: string }> & AuthContext<User>) {
    super(props)
    const isNew = props.location.pathname === corporateCheckupsNew
    this.state = {
      isNew,
      projectId: parseInt(this.props.match.params.projectId, 10),
      loaded: isNew,
      project: null,
      blocking: false,
      progress: 'edit'
    }
  }

  async componentDidMount() {
    if (!this.state.isNew && !this.state.loaded) {
      const project = await getMedicalCheckupProjectApi({
        projectId: this.state.projectId,
        authorization: await this.props.authorizer.getIdToken()
      })
      this.setState({ project, loaded: true })
    }
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
  async submit(e: React.FormEvent) {
    this.setState({ blocking: true })
    e.preventDefault()

    this.state.isNew
      ? await postMedicalCheckupProjectsApi({
          body: {
            year: this.state.values!.year,
            name: this.state.values!.name,
            period: { start: this.state.values!.start, end: this.state.values!.end }
          },
          authorization: await this.props.authorizer.getIdToken()
        })
      : await putMedicalCheckupProjectApi({
          projectId: this.state.projectId,
          body: {
            id: parseInt(this.props.match.params.projectId, 10),
            year: this.state.values!.year,
            name: this.state.values!.name,
            period: { start: this.state.values!.start, end: this.state.values!.end }
          },
          authorization: await this.props.authorizer.getIdToken()
        })

    this.setState({ blocking: false, progress: 'complete' }, () => window.scroll(0, 0))
  }

  render() {
    const { loaded, isNew, project, progress, values, projectId, blocking } = this.state
    return (
      <DocumentTitle title={isNew ? '健康診断の新規作成' : '健康診断の更新'}>
        {loaded ? (
          <>
            {progress === 'edit' ? (
              <CheckupEdit isNew={isNew} project={project} submit={this.toComfirm} />
            ) : progress === 'comfirm' ? (
              <CheckupComfirm
                values={values!}
                isNew={isNew}
                project={project}
                back={this.toForm}
                submit={this.submit}
              />
            ) : progress === 'complete' ? (
              <CheckupComplete isNew={isNew} projectId={projectId} project={project} />
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

export default Account.withAuthConsumer(CorporateCheckupEditContainer)

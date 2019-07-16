import * as React from 'react'
import { bind } from 'decko'
// import { corporateCheckupsEditUrl } from '../../../config/Url'
import BlockUI from '../../../components/BlockUI'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import User from '../../../models/User'
import Account from '../../../models/Account'
// import CheckupProgressHeader from '../../../components/corporate/checkups/CheckupProgressHeader'
import { PageLimit } from '../../../config/Settings'
import CheckupProgressResults from '../../../components/corporate/checkups/CheckupProgressResults'
import { compose } from 'recompose'
import withQueryUpdate, { WithQueryProps } from '../../../framework/hocs/withQueryUpdate'
import queryString from 'query-string'
import MedicalCheckupProjectMetadata from '../../../swagger/model/medicalCheckupProjectMetadata'
import CheckupRate from '../../../swagger/model/checkupRate'
import OrganizationWithUnits from '../../../swagger/model/organizationWithUnits'
import ConsultationStatus from '../../../swagger/model/consultationStatus'
import MedicalCheckupOpinionOnEmploymentStatus from '../../../swagger/model/medicalCheckupOpinionOnEmploymentStatus'
import Decision from '../../../swagger/model/decision'
import {
  getMedicalCheckupProjectsApi,
  // getMedicalCheckupProjectTargetsRate,
  getOrganizationUnitsApi,
  getMedicalCheckupsApi
} from '../../../swagger/api/corporate.service'
import {
  getDecisionsApi,
  getConsultationStatusesApi,
  getMedicalCheckupOpinionOnEmploymentStatusesApi
} from '../../../swagger/api/general.service'
import Pager from '../../../components/_parts/Pager'
import CheckupResults from '../../../swagger/model/checkupResults'

interface State {
  loaded: boolean
  projects: MedicalCheckupProjectMetadata[]
  projectName: string
  checkupRate: CheckupRate | null
  organizationUnits: OrganizationWithUnits | null
  decisions: Decision[]
  consultationStatuses: ConsultationStatus[]
  opinionOnEmploymentStatuses: MedicalCheckupOpinionOnEmploymentStatus[]
  pageLimit: number
  results: CheckupResults | null
  pageCount: number
  selected: number
}

const querySearchFirst = {
  projectId: void 0,
  selected: 0,
  employeeCode: '',
  name: '',
  unitIds: [],
  statuses: [],
  medicalDiagnosisIds: [],
  standardValueSetId: void 0,
  outOfStandardValueSet: false,
  checkupOpinionOnEmploymentStatusIds: [],
  consultationStatusIds: []
}

class CorporateCheckupProgressContainer extends React.Component<
  WithQueryProps<{}> & AuthContext<User>,
  State
> {
  constructor(props: WithQueryProps<{}> & AuthContext<User>) {
    super(props)
    this.state = {
      loaded: false,
      projects: [],
      projectName: '',
      checkupRate: null,
      organizationUnits: null,
      decisions: [],
      consultationStatuses: [],
      opinionOnEmploymentStatuses: [],
      pageLimit: PageLimit,
      results: null,
      pageCount: 0,
      selected: 0
    }
  }
  async componentDidMount() {
    const querySearched = queryString.parse(location.search)
    const querySearch = {
      ...querySearchFirst,
      ...querySearched
    }

    this.setState({
      selected: querySearched.selected ? Number(querySearched.selected) : 0
    })

    const idToken = await this.props.authorizer.getIdToken()
    const [
      projects,
      // checkupRate,
      organizationUnits,
      decisions,
      consultationStatuses,
      opinionOnEmploymentStatuses,
      results
    ] = await Promise.all([
      getMedicalCheckupProjectsApi({ authorization: idToken }),
      // getMedicalCheckupProjectTargetsRate({
      //   projectId: this.state.projectId,
      //   authorization: idToken
      // }),
      getOrganizationUnitsApi({ authorization: idToken }),
      getDecisionsApi({ authorization: idToken }),
      getConsultationStatusesApi({ authorization: idToken }),
      getMedicalCheckupOpinionOnEmploymentStatusesApi({ authorization: idToken }),
      getMedicalCheckupsApi({
        pageLimit: this.state.pageLimit,
        pageSkip: this.state.selected,
        ...querySearch,
        authorization: idToken
      })
    ])
    const remainderBool = results.all % this.state.pageLimit ? 1 : 0
    this.setState({
      loaded: true,
      projects,
      projectName: querySearch.projectId
        ? projects.find(p => p.id === Number(querySearch.projectId))!.name
        : '全件表示',
      // checkupRate,
      organizationUnits,
      decisions,
      consultationStatuses,
      opinionOnEmploymentStatuses,
      results,
      pageCount: Math.floor(results.all / this.state.pageLimit) + remainderBool
    })
  }

  async componentDidUpdate(prevProps: WithQueryProps<{ projectId: string }> & AuthContext<User>) {
    if (this.props.location.query !== prevProps.location.query) {
      const querySearched = queryString.parse(location.search) as any

      const querySearch = {
        querySearchFirst,
        ...querySearched
      }

      this.setState({
        selected: querySearched.selected ? Number(querySearched.selected) : 0
      })

      const results = await getMedicalCheckupsApi({
        pageLimit: this.state.pageLimit,
        pageSkip: this.state.selected,
        ...querySearch,
        authorization: await this.props.authorizer.getIdToken()
      })

      const remainderBool = results.all % this.state.pageLimit ? 1 : 0

      this.setState({
        results,
        projectName: querySearch.projectId
          ? this.state.projects.find(p => p.id === Number(querySearch.projectId))!.name
          : '全件表示',
        pageCount: Math.floor(results.all / this.state.pageLimit) + remainderBool
      })
    }
  }

  // @bind
  // editProject() {
  //   this.props.history.push(corporateCheckupsEditUrl(this.state.projectId))
  // }

  @bind
  handlePageClick(selectedItem: { selected: number }) {
    const searchQuery = queryString.parse(location.search)
    this.props.history.push({
      search: queryString.stringify({ ...searchQuery, selected: selectedItem.selected })
    })
  }

  render() {
    const {
      projectName,
      // checkupRate,
      results,
      organizationUnits,
      decisions,
      consultationStatuses,
      opinionOnEmploymentStatuses,
      pageCount,
      selected
    } = this.state
    return this.state.loaded ? (
      <>
        {/* <CheckupProgressHeader
          projects={projects}
          selectedProject={projects.find(p => p.id === projectId)!}
          checkupRate={checkupRate!}
          editProject={this.editProject}
        /> */}
        {results ? (
          <CheckupProgressResults
            {...results}
            departments={organizationUnits!.organizationUnits}
            decisions={decisions}
            consultationStatuses={consultationStatuses}
            opinionOnEmploymentStatuses={opinionOnEmploymentStatuses}
            projectName={projectName}
          />
        ) : null}
        <Pager pageCount={pageCount} pageSelect={selected} handlePageClick={this.handlePageClick} />
      </>
    ) : (
      <BlockUI />
    )
  }
}

export default compose<WithQueryProps<{}> & AuthContext<User>, {}>(
  withQueryUpdate,
  Account.withAuthConsumer
)(CorporateCheckupProgressContainer)

import * as React from 'react'
import { bind } from 'decko'
// import { corporateStresschecksEditUrl } from '../../../config/Url'
import BlockUI from '../../../components/BlockUI'
import Account from '../../../models/Account'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import User from '../../../models/User'
import StressCheckProject from '../../../swagger/model/stressCheckProject'
import StressCheckRate from '../../../swagger/model/stressCheckRate'
import OrganizationWithUnits from '../../../swagger/model/organizationWithUnits'
import StressCheckOpinionOnEmployment from '../../../swagger/model/stressCheckOpinionOnEmployment'
import {
  getStressCheckProjectsApi,
  // getStressCheckProjectTargetsRate,
  getOrganizationUnitsApi,
  getMedicalStressChecksApi
} from '../../../swagger/api/corporate.service'
import { getStressCheckOpinionOnEmploymentApi } from '../../../swagger/api/general.service'
// import StressCheckProgressHeader from '../../../components/corporate/stresschecks/StressCheckProgressHeader'
import StressCheckProgressResults from '../../../components/corporate/stresschecks/StressCheckProgressResults'
import queryString from 'query-string'
import { compose } from 'recompose'
import withQueryUpdate, { WithQueryProps } from '../../../framework/hocs/withQueryUpdate'
import { PageLimit } from '../../../config/Settings'
import Pager from '../../../components/_parts/Pager'
import StressCheckResults from '../../../swagger/model/stressCheckResults'

const querySearchFirst = {
  projectId: void 0,
  employeeCode: '',
  name: '',
  unitIds: [],
  statuses: [],
  highStress: [], // boolean
  consultationOffers: [], // boolean
  stresscheckOpinionOnEmploymentStatusIds: []
}

class CorporateStressCheckProgressContainer extends React.Component<
  WithQueryProps<{}> & AuthContext<User>,
  {
    loaded: boolean
    projects: StressCheckProject[]
    projectName: string
    stressCheckRate: StressCheckRate | null
    organizationUnits: OrganizationWithUnits | null /* 組織情報 */
    results: StressCheckResults | null /* ストレスチェック結果 */
    // consultationStatuses: StressCheckWorkStatuses[] // 産業意見ステータス
    opinionOnEmploymentStatuses: StressCheckOpinionOnEmployment[] /*就業に関する意見ステータス */
    pageLimit: number
    pageCount: number
    selected: number
  }
> {
  constructor(props: WithQueryProps<{}> & AuthContext<User>) {
    super(props)
    this.state = {
      loaded: false,
      projects: [],
      projectName: '',
      stressCheckRate: null,
      organizationUnits: null,
      results: null,
      opinionOnEmploymentStatuses: [],
      pageLimit: PageLimit,
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
      // stressCheckRate,
      organizationUnits,
      opinionOnEmploymentStatuses,
      results
    ] = await Promise.all([
      getStressCheckProjectsApi({ authorization: idToken }),
      // getStressCheckProjectTargetsRate({
      //   projectId: this.state.projectId,
      //   authorization: idToken
      // }),
      getOrganizationUnitsApi({ authorization: idToken }),
      getStressCheckOpinionOnEmploymentApi({ authorization: idToken }),
      getMedicalStressChecksApi({
        pageLimit: this.state.pageLimit,
        pageSkip: querySearched.selected ? Number(querySearched.selected) : 0,
        ...querySearch,
        authorization: await this.props.authorizer.getIdToken()
      })
    ])
    const remainderBool = results.all % this.state.pageLimit ? 1 : 0
    this.setState({
      loaded: true,
      projects,
      projectName: querySearch.projectId
        ? projects.find(p => p.id === Number(querySearch.projectId))!.name
        : '全件表示',
      // stressCheckRate,
      organizationUnits,
      opinionOnEmploymentStatuses,
      results,
      pageCount: Math.floor(results.all / this.state.pageLimit) + remainderBool
    })
  }

  async componentDidUpdate(prevProps: WithQueryProps<{}> & AuthContext<User>) {
    if (this.props.location.query !== prevProps.location.query) {
      const querySearched = queryString.parse(location.search) as any

      const querySearch = {
        querySearchFirst,
        ...querySearched
      }

      this.setState({
        selected: querySearched.selected ? Number(querySearched.selected) : 0
      })

      const results = await getMedicalStressChecksApi({
        pageLimit: this.state.pageLimit,
        pageSkip: querySearched.selected ? Number(querySearched.selected) : 0,
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
  //   this.props.history.push(corporateStresschecksEditUrl(this.state.projectId))
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
      // stressCheckRate,
      organizationUnits,
      // consultationStatuses,
      opinionOnEmploymentStatuses,
      selected
    } = this.state
    return this.state.loaded ? (
      <div>
        {/* <StressCheckProgressHeader
          projects={projects}
          selectedProject={projects.find(p => p.id === projectId)!}
          stressCheckRate={stressCheckRate!}
          editProject={this.editProject}
        /> */}
        {this.state.results ? (
          <StressCheckProgressResults
            {...this.state.results}
            departments={organizationUnits!.organizationUnits}
            opinionOnEmploymentStatuses={opinionOnEmploymentStatuses}
            projectName={projectName}
          />
        ) : null}
        <Pager
          pageCount={this.state.pageCount}
          pageSelect={selected}
          handlePageClick={this.handlePageClick}
        />
      </div>
    ) : (
      <BlockUI />
    )
  }
}
export default compose<WithQueryProps<{}> & AuthContext<User>, {}>(
  withQueryUpdate,
  Account.withAuthConsumer
)(CorporateStressCheckProgressContainer)

import * as React from 'react'
import { bind } from 'decko'
import StressCheckSearchForm from '../../../components/corporate/stresschecks/StressCheckSearchForm'
import Account from '../../../models/Account'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import User from '../../../models/User'
import StressCheckOpinionOnEmployment from '../../../swagger/model/stressCheckOpinionOnEmployment'
import {
  getOrganizationUnitsApi,
  getStressCheckProjectsApi
} from '../../../swagger/api/corporate.service'
import { RouteComponentProps } from 'react-router'
import { getStressCheckOpinionOnEmploymentApi } from '../../../swagger/api/general.service'
import StressCheckProject from '../../../swagger/model/stressCheckProject'
import queryString from 'query-string'
import { DepartmentTreeItem } from '../../../if/Department'
import { flatToTreeData } from '../../../util/DepartmentHelper'

const querySearchFirst = {
  projectId: void 0,
  employeeCode: '',
  name: '',
  unitIds: [], // number
  statuses: [], // string
  highStress: [], // boolean
  consultationOffers: [], // boolean
  stresscheckOpinionOnEmploymentStatusIds: [] // number
}

class CorporateStressCheckSearchFormContainer extends React.Component<
  RouteComponentProps<{}> & AuthContext<User>,
  {
    loaded: boolean
    organizationUnits: DepartmentTreeItem[]
    opinionOnEmploymentStatuses: StressCheckOpinionOnEmployment[]
    projects: StressCheckProject[]
  }
> {
  state = {
    loaded: false,
    organizationUnits: [],
    opinionOnEmploymentStatuses: [],
    projects: []
  }

  async componentDidMount() {
    const idToken = await this.props.authorizer.getIdToken()
    const [organizationUnits, opinionOnEmploymentStatuses, projects] = await Promise.all([
      getOrganizationUnitsApi({ authorization: idToken }),
      getStressCheckOpinionOnEmploymentApi({ authorization: idToken }),
      getStressCheckProjectsApi({ authorization: idToken })
    ])

    this.setState({
      organizationUnits: flatToTreeData(organizationUnits.organizationUnits),
      opinionOnEmploymentStatuses,
      projects,
      loaded: true
    })
  }

  @bind
  queryPush(queryString: string) {
    this.props.history.push({
      search: queryString
    })
  }

  render() {
    const querySearched = queryString.parse(location.search)
    // querySearchedの型変換
    const queryNormalize = {
      ...querySearched,
      projectId: querySearched.projectId ? Number(querySearched.projectId) : void 0,
      employeeCode: querySearched.employeeCode ? querySearched.employeeCode + '' : '',
      name: querySearched.name ? querySearched.name + '' : '',
      unitIds: querySearched.unitIds
        ? Array.isArray(querySearched.unitIds)
          ? querySearched.unitIds.map(Number)
          : [querySearched.unitIds].map(Number)
        : [], // number
      statuses: querySearched.statuses
        ? Array.isArray(querySearched.statuses)
          ? querySearched.statuses
          : [querySearched.statuses]
        : [], // string
      highStress: querySearched.highStress
        ? Array.isArray(querySearched.highStress)
          ? querySearched.highStress.map(bool => {
              return bool === 'true' ? true : false
            })
          : [querySearched.highStress === 'true' ? true : false]
        : [], // boolean
      consultationOffers: querySearched.consultationOffers
        ? Array.isArray(querySearched.consultationOffers)
          ? querySearched.consultationOffers.map(bool => {
              return bool === 'true' ? true : false
            })
          : [querySearched.consultationOffers === 'true' ? true : false]
        : [], // boolean
      stresscheckOpinionOnEmploymentStatusIds: querySearched.stresscheckOpinionOnEmploymentStatusIds
        ? Array.isArray(querySearched.stresscheckOpinionOnEmploymentStatusIds)
          ? querySearched.stresscheckOpinionOnEmploymentStatusIds.map(Number)
          : [querySearched.stresscheckOpinionOnEmploymentStatusIds].map(Number)
        : [] // number
    }

    // 初期値とquery値の配列をmargeする
    const querySearch = {
      ...querySearchFirst,
      ...queryNormalize
    }

    const { organizationUnits, opinionOnEmploymentStatuses, projects, loaded } = this.state
    return loaded ? (
      <div className="search">
        <StressCheckSearchForm
          queryPush={this.queryPush}
          organizationUnits={organizationUnits}
          opinionOnEmploymentStatuses={opinionOnEmploymentStatuses}
          projects={projects}
          querySearch={querySearch}
          querySearchFirst={querySearchFirst}
        />
      </div>
    ) : null
  }
}

export default Account.withAuthConsumer(CorporateStressCheckSearchFormContainer)

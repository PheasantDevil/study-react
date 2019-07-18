import * as React from 'react'
import CheckupSearchForm from '../../../components/corporate/checkups/CheckupSearchForm'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import User from '../../../models/User'
import Account from '../../../models/Account'
import { RouteComponentProps } from 'react-router'
import { bind } from 'decko'
import OrganizationWithUnits from '../../../swagger/model/organizationWithUnits'
import ConsultationStatus from '../../../swagger/model/consultationStatus'
import MedicalCheckupOpinionOnEmploymentStatus from '../../../swagger/model/medicalCheckupOpinionOnEmploymentStatus'
import {
  getOrganizationUnitsApi,
  getMedicalCheckupProjectsApi
} from '../../../swagger/api/corporate.service'
import {
  getDecisionsApi,
  getConsultationStatusesApi,
  getMedicalCheckupOpinionOnEmploymentStatusesApi
} from '../../../swagger/api/general.service'
import Decision from '../../../swagger/model/decision'
import MedicalCheckupProjectMetadataWithNumberOfTargets from '../../../swagger/model/medicalCheckupProjectMetadataWithNumberOfTargets'
import queryString from 'query-string'

const querySearchFirst = {
  projectId: void 0,
  selected: 0,
  employeeCode: '',
  name: '',
  unitIds: [], // number
  statuses: [], // string
  medicalDiagnosisIds: [], // number
  standardValueSetId: void 0,
  outOfStandardValueSet: false,
  checkupOpinionOnEmploymentStatusIds: [], // number
  consultationStatusIds: [] // number
}

class CorporateCheckupSearchFromContainer extends React.Component<
  RouteComponentProps<{}> & AuthContext<User>,
  {
    loaded: boolean
    organizationUnits: OrganizationWithUnits | null
    decisions: Decision[]
    consultationStatuses: ConsultationStatus[]
    opinionOnEmploymentStatuses: MedicalCheckupOpinionOnEmploymentStatus[]
    projects: MedicalCheckupProjectMetadataWithNumberOfTargets[]
  }
> {
  state = {
    loaded: false,
    organizationUnits: null,
    decisions: [],
    consultationStatuses: [],
    opinionOnEmploymentStatuses: [],
    projects: []
  }

  async componentDidMount() {
    const idToken = await this.props.authorizer.getIdToken()
    const [
      organizationUnits,
      decisions,
      consultationStatuses,
      opinionOnEmploymentStatuses,
      projects
    ] = await Promise.all([
      getOrganizationUnitsApi({ authorization: idToken }),
      getDecisionsApi({ authorization: idToken }),
      getConsultationStatusesApi({ authorization: idToken }),
      getMedicalCheckupOpinionOnEmploymentStatusesApi({ authorization: idToken }),
      getMedicalCheckupProjectsApi({ authorization: idToken })
    ])
    this.setState({
      organizationUnits,
      decisions,
      consultationStatuses,
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
    const queryNormalize = {
      ...querySearched,
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
      medicalDiagnosisIds: querySearched.medicalDiagnosisIds
        ? Array.isArray(querySearched.medicalDiagnosisIds)
          ? querySearched.medicalDiagnosisIds.map(Number)
          : [querySearched.medicalDiagnosisIds].map(Number)
        : [], // number
      standardValueSetId: void 0,
      outOfStandardValueSet: false,
      checkupOpinionOnEmploymentStatusIds: querySearched.checkupOpinionOnEmploymentStatusIds
        ? Array.isArray(querySearched.checkupOpinionOnEmploymentStatusIds)
          ? querySearched.checkupOpinionOnEmploymentStatusIds.map(Number)
          : [querySearched.checkupOpinionOnEmploymentStatusIds].map(Number)
        : [], // number
      consultationStatusIds: querySearched.consultationStatusIds
        ? Array.isArray(querySearched.consultationStatusIds)
          ? querySearched.consultationStatusIds.map(Number)
          : [querySearched.consultationStatusIds].map(Number)
        : [] // number
    }
    const querySearch = {
      ...querySearchFirst,
      ...queryNormalize
    }
    const {
      organizationUnits,
      decisions,
      consultationStatuses,
      opinionOnEmploymentStatuses,
      projects
    } = this.state
    return (
      <div className="search">
        <CheckupSearchForm
          queryPush={this.queryPush}
          organizationUnits={organizationUnits!}
          decisions={decisions}
          consultationStatuses={consultationStatuses}
          opinionOnEmploymentStatuses={opinionOnEmploymentStatuses}
          projects={projects}
          querySearch={querySearch}
        />
      </div>
    )
  }
}
export default Account.withAuthConsumer(CorporateCheckupSearchFromContainer)

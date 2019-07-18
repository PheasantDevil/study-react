import * as React from 'react'
import { bind } from 'decko'
import FileSaver from 'file-saver'
import DocumentTitle from 'react-document-title'
import { RouteComponentProps } from 'react-router'
import BlockUI from '../../../components/BlockUI'
import StressCheckReportForm, {
  Values
} from '../../../components/corporate/stresschecks/StressCheckReportForm'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import User from '../../../models/User'
import Account from '../../../models/Account'
import StressCheckReport from '../../../swagger/model/stressCheckReport'
import {
  getStressCheckReportsApi,
  postStressCheckReportsApi
} from '../../../swagger/api/corporate.service'
import { reportYear, reportStartDate } from '../../../util/DateHelper'
import format from 'date-fns/format'

interface State {
  loaded: boolean
  projectId: number
  stresscheckReport: StressCheckReport | null
}

class CorporateStressCheckReportContainer extends React.Component<
  RouteComponentProps<{
    projectId: string
  }> &
  AuthContext<User>,
  State
  > {
  constructor(
    props: RouteComponentProps<{
      projectId: string
    }> &
      AuthContext<User>
  ) {
    super(props)
    this.state = {
      loaded: false,
      projectId: parseInt(this.props.match.params.projectId, 10),
      stresscheckReport: null
    }
  }

  async componentDidMount() {
    const stresscheckReport = await getStressCheckReportsApi({
      projectId: this.state.projectId,
      authorization: await this.props.authorizer.getIdToken()
    })
    this.setState({
      loaded: true,
      stresscheckReport
    })
  }

  @bind
  async create({
    prefectures,
    concern,
    jurisdiction,
    baseNumber: baseNumber,
    branchNumber: branchNumber,
    workplaceNumber: workplaceNumber,
    businessYear: businessYear,
    startDate: startDate,
    businessType: businessType,
    businessPlaceName: businessPlaceName,
    postalCode: postalCode,
    address,
    phoneNumber: phoneNumber,
    operator,
    consultant,
    numberOfEmployees: numberOfEmployees,
    numberOfTargets: numberOfTargets,
    numberOfConsultated: numberOfConsultated,
    analyzed,
    medicalAdvisorName: medicalAdvisorName,
    medicalAdvisorDepartmentName: medicalAdvisorDepartmentName,
    medicalAdvisorDepartmentAddress: medicalAdvisorDepartmentAddress
  }: Values) {
    const pdfSave = await postStressCheckReportsApi({
      projectId: this.state.projectId,
      body: {
        workInsuranceNumber: {
          prefectures,
          concern,
          jurisdiction,
          baseNumber,
          branchNumber,
          workplaceNumber
        },
        businessYear: reportYear(businessYear),
        startDate: reportStartDate(startDate),
        businessType,
        businessPlaceName,
        businessPlace: {
          postalCode,
          address,
          phoneNumber
        },
        operator,
        consultant,
        numberOfEmployees,
        numberOfTargets,
        numberOfConsultated,
        analyzed,
        medicalAdvisorName,
        medicalAdvisorDepartmentName,
        medicalAdvisorDepartmentAddress
      },
      authorization: await this.props.authorizer.getIdToken()
    })
    const today = format(new Date(), 'yyyyMMddmmss')
    FileSaver.saveAs(
      pdfSave,
      '心理的な負担の程度を把握するための検査結果等報告書-' + today + '.pdf'
    )
  }
  render() {
    const { loaded, projectId, stresscheckReport } = this.state

    if (!loaded) {
      return <BlockUI />
    }

    return (
      <DocumentTitle title='報告書作成（ストレスチェック）'>
        <>
          {projectId ? (
            <StressCheckReportForm stresscheckReport={stresscheckReport!} create={this.create} />
          ) : (
              <div>指定のストレスチェックが無い為、報告書の作成が行えません</div>
            )}
        </>
      </DocumentTitle>
    )
  }
}
export default Account.withAuthConsumer(CorporateStressCheckReportContainer)

import * as React from 'react'
import { bind } from 'decko'
import FileSaver from 'file-saver'
import DocumentTitle from 'react-document-title'
import { RouteComponentProps } from 'react-router'
import CheckupReportForm, { Values } from '../../../components/corporate/checkups/CheckupReportForm'
import BlockUI from '../../../components/BlockUI'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import User from '../../../models/User'
import Account from '../../../models/Account'
import CheckupReport from '../../../swagger/model/checkupReport'
import { getCheckupReportsApi, postCheckupReportsApi } from '../../../swagger/api/corporate.service'
import { reportStartDate, reportYear } from '../../../util/DateHelper'
import format from 'date-fns/format'

interface State {
  loaded: boolean
  projectId: number
  checkupReport: CheckupReport | null
}

class CorporateCheckupReportContainer extends React.Component<
  RouteComponentProps<{ projectId: string }> & AuthContext<User>,
  State
  > {
  constructor(props: RouteComponentProps<{ projectId: string }> & AuthContext<User>) {
    super(props)
    this.state = {
      loaded: false,
      projectId: parseInt(this.props.match.params.projectId, 10),
      checkupReport: null
    }
  }
  async componentDidMount() {
    const checkupReport = await getCheckupReportsApi({
      projectId: this.state.projectId,
      authorization: await this.props.authorizer.getIdToken()
    })
    this.setState({
      loaded: true,
      checkupReport
    })
  }

  @bind
  async create({
    prefectures,
    concern,
    jurisdiction,
    baseNumber,
    branchNumber,
    workplaceNumber,
    businessYear,
    startDate,
    businessType,
    businessPlaceName,
    postalCode,
    address,
    phoneNumber,
    hospitalName,
    hospitalAddress,
    numberOfEmployees,
    numberOfTargets,
    i,
    ro,
    ha,
    ni,
    ho,
    he,
    to,
    chi,
    ri,
    nu,
    ru,
    wo,
    wa,
    ka,
    sum,
    hearingH1kAll,
    hearingH1kObserved,
    hearingH4kAll,
    hearingH4kObserved,
    hearingOthersAll,
    hearingOthersObserved,
    chestXrayAll,
    chestXrayObserved,
    sputmAll,
    sputmObserved,
    bloodPressureAll,
    bloodPressureObserved,
    anemiaAll,
    anemiaObserved,
    liverAll,
    liverObserved,
    lipidAll,
    lipidObserved,
    glucoseAll,
    glucoseObserved,
    urinePSugarAll,
    urinePSugarObserved,
    urineProteinAll,
    urineProteinObserved,
    electroCardiogramAll,
    electroCardiogramObserved,
    numberOfObserved,
    numberOfMedicalTreatmented,
    dentalAll,
    dentalObserved,
    medicalAdvisorName,
    medicalAdvisorDepartmentName,
    medicalAdvisorDepartmentAddress
  }: Values) {
    const pdfSave = await postCheckupReportsApi({
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
        hospitalName,
        hospitalAddress,
        numberOfEmployees,
        numberOfTargets,
        healthSafetyRegulations: {
          i,
          ro,
          ha,
          ni,
          ho,
          he,
          to,
          chi,
          ri,
          nu,
          ru,
          wo,
          wa,
          ka,
          sum
        },
        examination: {
          hearingH1k: {
            all: hearingH1kAll,
            observed: hearingH1kObserved
          },
          hearingH4k: {
            all: hearingH4kAll,
            observed: hearingH4kObserved
          },
          hearingOthers: {
            all: hearingOthersAll,
            observed: hearingOthersObserved
          },
          chestXray: {
            all: chestXrayAll,
            observed: chestXrayObserved
          },
          sputum: {
            all: sputmAll,
            observed: sputmObserved
          },
          bloodPressure: {
            all: bloodPressureAll,
            observed: bloodPressureObserved
          },
          anemia: {
            all: anemiaAll,
            observed: anemiaObserved
          },
          liver: {
            all: liverAll,
            observed: liverObserved
          },
          lipid: {
            all: lipidAll,
            observed: lipidObserved
          },
          glucose: {
            all: glucoseAll,
            observed: glucoseObserved
          },
          urinePSugar: {
            all: urinePSugarAll,
            observed: urinePSugarObserved
          },
          urineProtein: {
            all: urineProteinAll,
            observed: urineProteinObserved
          },
          electroCardiogram: {
            all: electroCardiogramAll,
            observed: electroCardiogramObserved
          }
        },
        numberOfObserved,
        numberOfMedicalTreatmented,
        dental: {
          all: dentalAll,
          observed: dentalObserved
        },
        medicalAdvisorName,
        medicalAdvisorDepartmentName,
        medicalAdvisorDepartmentAddress
      },
      authorization: await this.props.authorizer.getIdToken()
    })
    const today = format(new Date(), 'yyyyMMddmmss')
    FileSaver.saveAs(pdfSave, '定期健康診断結果報告書様式-' + today + '.pdf')
  }
  render() {
    const { loaded, projectId, checkupReport } = this.state

    if (!loaded) {
      return <BlockUI />
    }

    return (
      <DocumentTitle title='報告書作成（健康診断）'>
        <>
          {projectId ? (
            <CheckupReportForm checkupReport={checkupReport!} create={this.create} />
          ) : (
              <div>指定の健康診断が無い為、報告書の作成が行えません</div>
            )}
        </>
      </DocumentTitle>
    )
  }
}
export default Account.withAuthConsumer(CorporateCheckupReportContainer)

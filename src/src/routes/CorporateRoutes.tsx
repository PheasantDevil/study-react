import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { compose } from 'recompose'
import CorporateFrame from '../components/corporate/CorporateFrame'
import {
  corporate,
  corporateCheckups,
  corporateCheckupsEdit,
  corporateCheckupsEmployeeEdit,
  corporateCheckupsNew,
  corporateCheckupsReports,
  corporateCheckupsSetting,
  corporateConsultations,
  corporateConsultationsDetail,
  corporateConsultationsEdit,
  corporateConsultationsNew,
  corporateEmployeeDetail,
  corporateEmployees,
  corporateEmployeesEdit,
  corporateEmployeesNew,
  corporateMedicalAdvisors,
  corporateMedicalAdvisorsEdit,
  corporateMedicalAdvisorsNew,
  corporateStresschecks,
  corporateStresschecksEdit,
  corporateStresschecksEmployeeEdit,
  corporateStresschecksNew,
  corporateStresschecksReports,
  corporateStresschecksSetting,
  corporateSurveys,
  corporateUnits,
  urlsAccount
} from '../config/Url'
import CorporateCheckupEditContainer from '../container/corporate/checkups/CorporateCheckupEditContainer'
import CorporateCheckupEmployeeContainer from '../container/corporate/checkups/CorporateCheckupEmployeeContainer'
import CorporateCheckupListContainer from '../container/corporate/checkups/CorporateCheckupListContainer'
import CorporateCheckupProgressContainer from '../container/corporate/checkups/CorporateCheckupProgressContainer'
import CorporateCheckupReportContainer from '../container/corporate/checkups/CorporateCheckupReportContainer'
import CorporateConsultationDetailContainer from '../container/corporate/consultations/CorporateConsultationDetailContainer'
import CorporateConsultationEditContainer from '../container/corporate/consultations/CorporateConsultationEditContainer'
import CorporateConsultationListContainer from '../container/corporate/consultations/CorporateConsultationListContainer'
import CorporateDashboardContainer from '../container/corporate/CorporateDashboardContainer'
import CorporateEmployeeDetailContainer from '../container/corporate/employees/CorporateEmployeeDetailContainer'
import CorporateEmployeeEditContainer from '../container/corporate/employees/CorporateEmployeeEditContainer'
import CorporateEmployeesContainer from '../container/corporate/employees/CorporateEmployeesContainer'
import CorporateMedicalAdvisorEditContainer from '../container/corporate/medical_advisors/CorporateMedicalAdvisorEditContainer'
import CorporateMedicalAdvisorListContainer from '../container/corporate/medical_advisors/CorporateMedicalAdvisorListContainer'
import CorporateUnitsContainer from '../container/corporate/organization/CorporateUnitsContainer'
import CorporateStressCheckEditContainer from '../container/corporate/stresschecks/CorporateStressCheckEditContainer'
import CorporateStressCheckEmployeeContainer from '../container/corporate/stresschecks/CorporateStressCheckEmployeeContainer'
import CorporateStressCheckProgressContainer from '../container/corporate/stresschecks/CorporateStressCheckProgressContainer'
import CorporateStressCheckReportContainer from '../container/corporate/stresschecks/CorporateStressCheckReportContainer'
import CorporateStressCheckSettingListContainer from '../container/corporate/stresschecks/CorporateStressCheckSettingListContainer'
import CorporateSurveysContainer from '../container/corporate/surveys/CorporateSurveysContainer'
import { AuthContext } from '../framework/auth/AuthTypes'
import withAuthenticated from '../framework/auth/withAuthenticated'
import Account from '../models/Account'
import User from '../models/User'

const CorporateRoutes: React.FunctionComponent<AuthContext<User>> = props => (
  <CorporateFrame {...props}>
    <Switch>
      {/* 健康診断 */}
      {/* 報告書作成 */}
      <Route path={corporateCheckupsReports} component={CorporateCheckupReportContainer} />
      {/* 健診対象者追加/削除 */}
      <Route path={corporateCheckupsEmployeeEdit} component={CorporateCheckupEmployeeContainer} />
      {/* 新規作成 編集 */}
      <Route path={corporateCheckupsNew} component={CorporateCheckupEditContainer} />
      <Route path={corporateCheckupsEdit} component={CorporateCheckupEditContainer} />
      {/* 健康診断設定 */}
      <Route path={corporateCheckupsSetting} component={CorporateCheckupListContainer} />
      {/* 健康診断結果の全件表示へとリダイレクトする */}
      <Route path={corporateCheckups} component={CorporateCheckupProgressContainer} />

      {/* ストレスチェック */}
      {/* 報告書作成 */}
      <Route path={corporateStresschecksReports} component={CorporateStressCheckReportContainer} />
      {/* ストレスチェック対象者追加/削除 */}
      <Route
        path={corporateStresschecksEmployeeEdit}
        component={CorporateStressCheckEmployeeContainer}
      />
      {/* 新規作成 編集 */}
      <Route path={corporateStresschecksNew} component={CorporateStressCheckEditContainer} />
      <Route path={corporateStresschecksEdit} component={CorporateStressCheckEditContainer} />
      {/* ストレスチェックの全件表示へとリダイレクト */}
      <Route
        path={corporateStresschecksSetting}
        component={CorporateStressCheckSettingListContainer}
      />
      {/* ストレスチェックの全件表示へとリダイレクト */}
      <Route path={corporateStresschecks} component={CorporateStressCheckProgressContainer} />

      {/* アンケート */}
      <Route path={corporateSurveys} component={CorporateSurveysContainer} />

      {/* 面談記録 */}
      <Route path={corporateConsultationsNew} component={CorporateConsultationEditContainer} />
      <Route path={corporateConsultationsEdit} component={CorporateConsultationEditContainer} />
      <Route path={corporateConsultationsDetail} component={CorporateConsultationDetailContainer} />
      <Route path={corporateConsultations} component={CorporateConsultationListContainer} />

      {/* 従業員情報 */}
      <Route path={corporateEmployeesNew} component={CorporateEmployeeEditContainer} />
      <Route path={corporateEmployeesEdit} component={CorporateEmployeeEditContainer} />
      <Route path={corporateEmployeeDetail} component={CorporateEmployeeDetailContainer} />
      <Route path={corporateEmployees} component={CorporateEmployeesContainer} />

      {/* 産業医情報 */}
      <Route path={corporateMedicalAdvisorsNew} component={CorporateMedicalAdvisorEditContainer} />
      <Route path={corporateMedicalAdvisorsEdit} component={CorporateMedicalAdvisorEditContainer} />
      <Route path={corporateMedicalAdvisors} component={CorporateMedicalAdvisorListContainer} />

      {/* 企業情報 */}
      <Route path={corporateUnits} component={CorporateUnitsContainer} />

      {/* ダッシュボード */}
      <Route path={corporate} component={CorporateDashboardContainer} />
    </Switch>
  </CorporateFrame>
)

export default compose<AuthContext<User>, {}>(
  Account.withAuthConsumer,
  withAuthenticated(urlsAccount.urlSignIn)
)(CorporateRoutes)

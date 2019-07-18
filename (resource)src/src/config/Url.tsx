import { createAuthUrls } from '../framework/auth/createAuthRoutes'
import { ConsultationType } from '../models/ConsultationType'

export const urlsAccount = createAuthUrls('/account', '/me')

// 共通
export const topUrl = '/'
export const terms = '/terms' // 利用規約
export const privacyPolicy = '/privacy-policy'
export const law = '/law' // 特定商取引に基づく表示
export const contact = '/contact' // お問い合わせ
export const faqs = '/faq' // faq一覧
export const faqDetail = '/faq/:targetId' // faq詳細
export const faqDetailUrl = (targetId: number) => `/faq/${targetId}` // faq詳細

// 企業
export const corporate = '/corporate' //  ダッシュボード
// 健康診断
export const corporateCheckupsSetting = '/corporate/checkups/projects' // 設定
export const corporateCheckups = '/corporate/checkups' //  健診結果一覧
export const corporateCheckupsDetail = `/corporate/checkups/:projectId` //  詳細
export const corporateCheckupsDetailUrl = (projectId: number) => `/corporate/checkups/${projectId}` //  詳細
export const corporateCheckupsNew = '/corporate/checkups/projects/new' //  新規作成
export const corporateCheckupsEdit = '/corporate/checkups/projects/:projectId' //  編集　削除
export const corporateCheckupsEditUrl = (projectId: number) =>
  `/corporate/checkups/projects/${projectId}` // 編集 削除
export const corporateCheckupsEmployeeEdit = '/corporate/checkups/projects/:projectId/targets/edit' //  従業員追加/削除
export const corporateCheckupsEmployeeEditUrl = (projectId: number) =>
  `/corporate/checkups/projects/${projectId}/targets/edit` //  従業員追加/削除
export const corporateCheckupsPersonalRecord =
  '/corporate/checkups/projects/:projectId/personal-record' // 個人票作成
export const corporateCheckupsPersonalRecordUrl = (projectId: number) =>
  `/corporate/checkups/projects/${projectId}/personal-record` // 個人票作成
export const corporateCheckupsReports = '/corporate/checkups/projects/:projectId/reports' // 報告書作成
export const corporateCheckupsReportsUrl = (projectId: number) =>
  `/corporate/checkups/projects/${projectId}/reports` // 報告書作成

// ストレスチェック
export const corporateStresschecksSetting = '/corporate/stresschecks/projects' // 設定
export const corporateStresschecks = '/corporate/stresschecks' // 一覧
export const corporateStresschecksDetail = '/corporate/stresschecks/:projectId' // 詳細
export const corporateStresschecksDetailUrl = (projectId: number) =>
  `/corporate/stresschecks/${projectId}` // 詳細
export const corporateStresschecksNew = '/corporate/stresschecks/projects/new' //  新規作成
export const corporateStresschecksEdit = '/corporate/stresschecks/projects/:projectId' //  編集　削除
export const corporateStresschecksEditUrl = (projectId: number) =>
  `/corporate/stresschecks/projects/${projectId}` // 編集 削除
export const corporateStresschecksEmployeeEdit =
  '/corporate/stresschecks/projects/:projectId/targets/edit' //  従業員追加/削除
export const corporateStresschecksEmployeeEditUrl = (projectId: number) =>
  `/corporate/stresschecks/projects/${projectId}/targets/edit` //  従業員追加/削除
export const corporateStresschecksReports = '/corporate/stresschecks/projects/:projectId/reports' // 報告書作成
export const corporateStresschecksReportsUrl = (projectId: number) =>
  `/corporate/stresschecks/projects/${projectId}/reports` // 報告書作成

// アンケート
export const corporateSurveys = '/corporate/surveys' // アンケート

// 面談記録
export const corporateConsultations = '/corporate/consultations' // 面談記録一覧
export const corporateConsultationsEdit = '/corporate/consultations/:consultationId/edit' // 面談記録編集
export const corporateConsultationsEditUrl = (
  consultationId: number,
  consultationType: ConsultationType
) => `/corporate/consultations/${consultationId}/edit?consultationType=${consultationType}`
export const corporateConsultationsDetail = '/corporate/consultations/:consultationId' // 面談記録詳細
export const corporateConsultationsDetailUrl = (
  consultationId: number,
  consultationType: ConsultationType
) => `/corporate/consultations/${consultationId}?consultationType=${consultationType}`
export const corporateConsultationsNew = '/corporate/consultations/new' // 面談記録新規作成

// 従業員情報
export const corporateEmployees = '/corporate/employees' // 一覧
export const corporateEmployeeDetail = '/corporate/employees/:employeeId' // 詳細
export const corporateEmployeeDetailUrl = (employeeId: number) =>
  `/corporate/employees/${employeeId}`
export const corporateEmployeesNew = '/corporate/employees/new' // 新規
export const corporateEmployeesEdit = '/corporate/employees/:employeeId/edit' // 編集
export const corporateEmployeesEditUrl = (employeeId: number) =>
  `/corporate/employees/${employeeId}/edit`

// 産業医情報
export const corporateMedicalAdvisors = '/corporate/medical-advisors' // 一覧
export const corporateMedicalAdvisorsNew = '/corporate/medical-advisors/new' // 新規
export const corporateMedicalAdvisorsEdit = '/corporate/medical-advisors/:medicalAdvisorId/edit' // 編集
export const corporateMedicalAdvisorsEditUrl = (medicalAdvisorId: number) =>
  `/corporate/medical-advisors/${medicalAdvisorId}/edit`

// 企業情報
export const corporateUnits = '/corporate/units' // 部署一覧

// 従業員
// トップ

// マイページ
export const me = '/me' // マイページ
export const meTop = '/me/intro' // 従業員Top
export const meProfile = '/me/profile'

// 健診結果
export const meCheckupsRedirect = '/me/checkups' // 健診結果　仮配置
export const meCheckups = '/me/checkups/:targetId' // 健診結果
export const meCheckupsUrl = (targetId: number) => `/me/checkups/${targetId}`

// ストレスチェック
export const meStresschecks = '/me/stresschecks' // ストレスチェック一覧
export const meStresschecksTarget = '/me/stresschecks/:targetId' // ストレスチェック回答/結果/一覧
export const meStresschecksTargetUrl = (targetId: number) => `/me/stresschecks/${targetId}`
export const meStresschecksTargetNew = '/me/stresschecks/:targetId/New' // ストレスチェック回答/結果/一覧
export const meStresschecksTargetNewUrl = (targetId: number) => `/me/stresschecks/${targetId}/New`

// アンケート
export const meSurveys = '/me/surveys/:targetId' // アンケート回答/結果
export const meSurveysUrl = (targetId: number) => `/me/surveys/${targetId}`

// 面談予約
export const meReserves = '/me/reserves' // アンケート回答/結果

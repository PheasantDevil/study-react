// @ts-ignore
import { callApi } from '../utils'
import AddCheckupTargets from '../model/addCheckupTargets';
import AddStressCheckTargets from '../model/addStressCheckTargets';
import CheckupConsultaionOpinionStatus from '../model/checkupConsultaionOpinionStatus';
import CheckupRate from '../model/checkupRate';
import CheckupReport from '../model/checkupReport';
import CheckupReportPost from '../model/checkupReportPost';
import CheckupResult from '../model/checkupResult';
import CheckupResults from '../model/checkupResults';
import CheckupTargetAddedResult from '../model/checkupTargetAddedResult';
import CheckupTargetDeleteResult from '../model/checkupTargetDeleteResult';
import ConsultationMedicalCheckup from '../model/consultationMedicalCheckup';
import ConsultationMental from '../model/consultationMental';
import ConsultationMetadata from '../model/consultationMetadata';
import ConsultationPostResult from '../model/consultationPostResult';
import Employee from '../model/employee';
import EmployeeCheckupMetadata from '../model/employeeCheckupMetadata';
import EmployeeCompact from '../model/employeeCompact';
import EmployeeExcludedFromCheckup from '../model/employeeExcludedFromCheckup';
import EmployeeExcludedFromStressCheck from '../model/employeeExcludedFromStressCheck';
import EmployeeListResult from '../model/employeeListResult';
import EmployeePost from '../model/employeePost';
import EmployeePostResult from '../model/employeePostResult';
import EmployeeStressCheckMetadata from '../model/employeeStressCheckMetadata';
import EmployeesPut from '../model/employeesPut';
import EmployeesPutResult from '../model/employeesPutResult';
import MedicalAdvisor from '../model/medicalAdvisor';
import MedicalAdvisorRequest from '../model/medicalAdvisorRequest';
import MedicalCheckupImage from '../model/medicalCheckupImage';
import MedicalCheckupKarte from '../model/medicalCheckupKarte';
import MedicalCheckupProjectMetadata from '../model/medicalCheckupProjectMetadata';
import MedicalCheckupProjectMetadataWithNumberOfTargets from '../model/medicalCheckupProjectMetadataWithNumberOfTargets';
import MedicalCheckupProjectPost from '../model/medicalCheckupProjectPost';
import MedicalCheckupProjectTargetDetail from '../model/medicalCheckupProjectTargetDetail';
import MedicalCheckupSummaryDecision from '../model/medicalCheckupSummaryDecision';
import MedicalQuestionnaireSurvey from '../model/medicalQuestionnaireSurvey';
import MedicalQuestionnaireSurveyIdRequest from '../model/medicalQuestionnaireSurveyIdRequest';
import MedicalQuestionnaireSurveyPost from '../model/medicalQuestionnaireSurveyPost';
import NumberOfActiveUsers from '../model/numberOfActiveUsers';
import NumberOfEmployees from '../model/numberOfEmployees';
import OrganizationUnitPut from '../model/organizationUnitPut';
import OrganizationWithUnits from '../model/organizationWithUnits';
import StandardValueExaminationSets from '../model/standardValueExaminationSets';
import StandardValueSet from '../model/standardValueSet';
import StandardValueSetPost from '../model/standardValueSetPost';
import StandardValueSets from '../model/standardValueSets';
import StressCheckConsultaionOpinionStatusId from '../model/stressCheckConsultaionOpinionStatusId';
import StressCheckProject from '../model/stressCheckProject';
import StressCheckProjectPost from '../model/stressCheckProjectPost';
import StressCheckProjectWithNumberOfTargets from '../model/stressCheckProjectWithNumberOfTargets';
import StressCheckRate from '../model/stressCheckRate';
import StressCheckReport from '../model/stressCheckReport';
import StressCheckReportPost from '../model/stressCheckReportPost';
import StressCheckResults from '../model/stressCheckResults';
import StressCheckSummaryEmployees from '../model/stressCheckSummaryEmployees';
import StressCheckSummaryResults from '../model/stressCheckSummaryResults';
import StressCheckSummaryScores from '../model/stressCheckSummaryScores';
import StressCheckTargetAddedResult from '../model/stressCheckTargetAddedResult';
import StressCheckTargetDeleteResult from '../model/stressCheckTargetDeleteResult';
import Support from '../model/support';
import SupportBulkPost from '../model/supportBulkPost';
import SupportBulkPostResult from '../model/supportBulkPostResult';
import SupportMailBulkPost from '../model/supportMailBulkPost';
import SupportPost from '../model/supportPost';

/**
 * 面談記録(高ストレス)を削除する
 * API呼出可能権限: advisor
 * @param authorization AWS_ID_TOKEN
 * @param consultationId 
 */
export const deleteConsultationHighStressApi = ({ authorization, consultationId,  }: {
  authorization: string
  consultationId: number
}) => {
  return callApi<any>({
    method: 'delete'.toUpperCase(),
    path: `/corporate/consultations/high-stress/${encodeURIComponent(String(consultationId))}`,
    accepts: [],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 面談記録(長時間労働)を削除する
 * API呼出可能権限: advisor
 * @param authorization AWS_ID_TOKEN
 * @param consultationId 
 */
export const deleteConsultationLongHourApi = ({ authorization, consultationId,  }: {
  authorization: string
  consultationId: number
}) => {
  return callApi<any>({
    method: 'delete'.toUpperCase(),
    path: `/corporate/consultations/long-hour/${encodeURIComponent(String(consultationId))}`,
    accepts: [],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 面談記録(健診)を削除する
 * API呼出可能権限: advisor
 * @param authorization AWS_ID_TOKEN
 * @param consultationId 
 */
export const deleteConsultationMedicalCheckupApi = ({ authorization, consultationId,  }: {
  authorization: string
  consultationId: number
}) => {
  return callApi<any>({
    method: 'delete'.toUpperCase(),
    path: `/corporate/consultations/medical-checkup/${encodeURIComponent(String(consultationId))}`,
    accepts: [],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 健診結果画像を削除する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetId 
 * @param imageId 
 */
export const deleteMedicalCheckupImageDownloadApi = ({ authorization, projectId, targetId, imageId,  }: {
  authorization: string
  projectId: number
  targetId: number
  imageId: number
}) => {
  return callApi<any>({
    method: 'delete'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetId))}/images/${encodeURIComponent(String(imageId))}`,
    accepts: [],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 対象の健康診断を削除する
 * API呼出可能権限: manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const deleteMedicalCheckupProjectApi = ({ authorization, projectId,  }: {
  authorization: string
  projectId: number
}) => {
  return callApi<any>({
    method: 'delete'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}`,
    accepts: [],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 健康診断の対象者を削除(削除対象IDをカンマ区切りで指定), /api/corporate/checkups/projects/1/targets/1,2,3
 * API呼出可能権限: manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetIdsStr 
 */
export const deleteMedicalCheckupProjectTargetsDeleteApi = ({ authorization, projectId, targetIdsStr,  }: {
  authorization: string
  projectId: number
  targetIdsStr: string
}) => {
  return callApi<CheckupTargetDeleteResult>({
    method: 'delete'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetIdsStr))}`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 対応履歴を削除する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetId 
 * @param supportId 
 */
export const deleteMedicalCheckupProjectsTargetsSupportApi = ({ authorization, projectId, targetId, supportId,  }: {
  authorization: string
  projectId: number
  targetId: number
  supportId: number
}) => {
  return callApi<any>({
    method: 'delete'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetId))}/supports/${encodeURIComponent(String(supportId))}`,
    accepts: [],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 対象の基準値セットを削除する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param standardValueSetId 
 */
export const deleteStandardValueSetApi = ({ authorization, standardValueSetId,  }: {
  authorization: string
  standardValueSetId: number
}) => {
  return callApi<any>({
    method: 'delete'.toUpperCase(),
    path: `/corporate/checkups/standardvaluesets/${encodeURIComponent(String(standardValueSetId))}`,
    accepts: [],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 対象のストレスチェックを削除する
 * API呼出可能権限: manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const deleteStressCheckProjectApi = ({ authorization, projectId,  }: {
  authorization: string
  projectId: number
}) => {
  return callApi<any>({
    method: 'delete'.toUpperCase(),
    path: `/corporate/stresschecks/projects/${encodeURIComponent(String(projectId))}`,
    accepts: [],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * ストレスチェックの対象者を削除(削除対象IDをカンマ区切りで指定)。/api/corporate/stresschecks/projects/1/targets/1,2,3
 * API呼出可能権限: manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetIdsStr 
 */
export const deleteStressCheckProjectTargetsDeleteApi = ({ authorization, projectId, targetIdsStr,  }: {
  authorization: string
  projectId: number
  targetIdsStr: string
}) => {
  return callApi<StressCheckTargetDeleteResult>({
    method: 'delete'.toUpperCase(),
    path: `/corporate/stresschecks/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetIdsStr))}`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 対応履歴を削除する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetId 
 * @param supportId 
 */
export const deleteStressCheckProjectsTargetsSupportApi = ({ authorization, projectId, targetId, supportId,  }: {
  authorization: string
  projectId: number
  targetId: number
  supportId: number
}) => {
  return callApi<any>({
    method: 'delete'.toUpperCase(),
    path: `/corporate/stresschecks/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetId))}/supports/${encodeURIComponent(String(supportId))}`,
    accepts: [],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 健診結果報告書の初期値を取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const getCheckupReportsApi = ({ authorization, projectId,  }: {
  authorization: string
  projectId: number
}) => {
  return callApi<CheckupReport>({
    method: 'get'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/reports/summary/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 面談記録（高ストレス）を取得
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param consultationId 
 */
export const getConsultationHighStressApi = ({ authorization, consultationId,  }: {
  authorization: string
  consultationId: number
}) => {
  return callApi<ConsultationMental>({
    method: 'get'.toUpperCase(),
    path: `/corporate/consultations/high-stress/${encodeURIComponent(String(consultationId))}`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 面談記録（長時間労働）を取得
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param consultationId 
 */
export const getConsultationLongHourApi = ({ authorization, consultationId,  }: {
  authorization: string
  consultationId: number
}) => {
  return callApi<ConsultationMental>({
    method: 'get'.toUpperCase(),
    path: `/corporate/consultations/long-hour/${encodeURIComponent(String(consultationId))}`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 面談記録（健診）を取得
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param consultationId 
 */
export const getConsultationMedicalCheckupApi = ({ authorization, consultationId,  }: {
  authorization: string
  consultationId: number
}) => {
  return callApi<ConsultationMedicalCheckup>({
    method: 'get'.toUpperCase(),
    path: `/corporate/consultations/medical-checkup/${encodeURIComponent(String(consultationId))}`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 面談記録の一覧を取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param pageSkip Page number
 * @param perPage Results per page {error_msg}
 * @param consultationDate 面談実施日 yyyy-MM-dd
 * @param consultationType 面談種類（medical_checkup or high_stress or long_hour）
 * @param medicalAdvisorId 産業医ID
 * @param employeeId 従業員ID
 */
export const getConsultationsApi = ({ authorization, pageSkip, perPage, consultationDate, consultationType, medicalAdvisorId, employeeId,  }: {
  authorization: string
  pageSkip?: number
  perPage?: number
  consultationDate?: string
  consultationType?: number
  medicalAdvisorId?: number
  employeeId?: number
}) => {
  return callApi<Array<ConsultationMetadata>>({
    method: 'get'.toUpperCase(),
    path: `/corporate/consultations/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters: { pageSkip, perPage, consultationDate, consultationType, medicalAdvisorId, employeeId,  },
    
  })
}

/**
 * 対象の従業員詳細をID指定で取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param employeeId 
 */
export const getEmployeeApi = ({ authorization, employeeId,  }: {
  authorization: string
  employeeId: number
}) => {
  return callApi<Employee>({
    method: 'get'.toUpperCase(),
    path: `/corporate/organizations/employees/${encodeURIComponent(String(employeeId))}`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 従業員リストを取得する
 * API呼出可能権限: manager
 * @param authorization AWS_ID_TOKEN
 * @param employeeCode Employee code
 * @param name Employee name
 * @param unitId Organization unit id
 * @param pageSkip Page number
 * @param perPage Results per page {error_msg}
 */
export const getEmployeesApi = ({ authorization, employeeCode, name, unitId, pageSkip, perPage,  }: {
  authorization: string
  employeeCode?: string
  name?: string
  unitId?: number
  pageSkip?: number
  perPage?: number
}) => {
  return callApi<EmployeeListResult>({
    method: 'get'.toUpperCase(),
    path: `/corporate/organizations/employees/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters: { employeeCode, name, unitId, pageSkip, perPage,  },
    
  })
}

/**
 * 従業員ごとの健診の受診状況を取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param employeeId 
 */
export const getEmployeesCheckupsApi = ({ authorization, employeeId,  }: {
  authorization: string
  employeeId: number
}) => {
  return callApi<Array<EmployeeCheckupMetadata>>({
    method: 'get'.toUpperCase(),
    path: `/corporate/organizations/employees/${encodeURIComponent(String(employeeId))}/checkups`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 従業員一覧をExcelで取得する。cURLで-oオプション付きで実行すること。
 * API呼出可能権限: manager
 * @param authorization AWS_ID_TOKEN
 */
export const getEmployeesExcelApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Blob>({
    method: 'get'.toUpperCase(),
    path: `/corporate/organizations/employees/excel`,
    accepts: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 従業員ごとのストレスチェックの受診状況を取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param employeeId 
 */
export const getEmployeesStressChecksApi = ({ authorization, employeeId,  }: {
  authorization: string
  employeeId: number
}) => {
  return callApi<Array<EmployeeStressCheckMetadata>>({
    method: 'get'.toUpperCase(),
    path: `/corporate/organizations/employees/${encodeURIComponent(String(employeeId))}/stresschecks`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 従業員Suggest用API
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param employeeId employee id
 * @param name user name
 * @param perPage Results per page {error_msg}
 */
export const getEmployeesSuggestApi = ({ authorization, employeeId, name, perPage,  }: {
  authorization: string
  employeeId?: number
  name?: string
  perPage?: number
}) => {
  return callApi<Array<EmployeeCompact>>({
    method: 'get'.toUpperCase(),
    path: `/corporate/organizations/employees/suggest`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters: { employeeId, name, perPage,  },
    
  })
}

/**
 * 対象の産業医詳細をID指定で取得する
 * API呼出可能権限: manager
 * @param authorization AWS_ID_TOKEN
 * @param medicalAdvisorId 
 */
export const getMedicalAdvisorApi = ({ authorization, medicalAdvisorId,  }: {
  authorization: string
  medicalAdvisorId: number
}) => {
  return callApi<MedicalAdvisor>({
    method: 'get'.toUpperCase(),
    path: `/corporate/organizations/medical-advisors/${encodeURIComponent(String(medicalAdvisorId))}`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 産業医一覧を取得する
 * API呼出可能権限: manager
 * @param authorization AWS_ID_TOKEN
 */
export const getMedicalAdvisorsApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<MedicalAdvisor>>({
    method: 'get'.toUpperCase(),
    path: `/corporate/organizations/medical-advisors/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 健診結果画像の一覧を取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetId 
 */
export const getMedicalCheckupImageApi = ({ authorization, projectId, targetId,  }: {
  authorization: string
  projectId: number
  targetId: number
}) => {
  return callApi<Array<MedicalCheckupImage>>({
    method: 'get'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetId))}/images`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 健診結果画像をダウンロードする
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetId 
 * @param imageId 
 */
export const getMedicalCheckupImageDownloadApi = ({ authorization, projectId, targetId, imageId,  }: {
  authorization: string
  projectId: number
  targetId: number
  imageId: number
}) => {
  return callApi<any>({
    method: 'get'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetId))}/images/${encodeURIComponent(String(imageId))}`,
    accepts: [],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 対象の健康診断をID指定で取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const getMedicalCheckupProjectApi = ({ authorization, projectId,  }: {
  authorization: string
  projectId: number
}) => {
  return callApi<MedicalCheckupProjectMetadata>({
    method: 'get'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 健康診断の検査結果すべてを取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const getMedicalCheckupProjectKartesApi = ({ authorization, projectId,  }: {
  authorization: string
  projectId: number
}) => {
  return callApi<Array<MedicalCheckupKarte>>({
    method: 'get'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/kartes/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 健康診断の総合判定の集約結果を取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const getMedicalCheckupProjectSummaryDecisionsApi = ({ authorization, projectId,  }: {
  authorization: string
  projectId: number
}) => {
  return callApi<Array<MedicalCheckupSummaryDecision>>({
    method: 'get'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/summary/decisions/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 健診詳細を取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetId 
 */
export const getMedicalCheckupProjectTargetApi = ({ authorization, projectId, targetId,  }: {
  authorization: string
  projectId: number
  targetId: number
}) => {
  return callApi<MedicalCheckupProjectTargetDetail>({
    method: 'get'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetId))}`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 健康診断対象になっていない従業員の一覧を取得する
 * API呼出可能権限: manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const getMedicalCheckupProjectTargetsExcludedApi = ({ authorization, projectId,  }: {
  authorization: string
  projectId: number
}) => {
  return callApi<Array<EmployeeExcludedFromCheckup>>({
    method: 'get'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/targets/excluded`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 健康診断の受診率を取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const getMedicalCheckupProjectTargetsRate = ({ authorization, projectId,  }: {
  authorization: string
  projectId: number
}) => {
  return callApi<CheckupRate>({
    method: 'get'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/targets/rate`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 会社で実施した（実施予定の）健康診断の一覧を取得する（開始日の降順）
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 */
export const getMedicalCheckupProjectsApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<MedicalCheckupProjectMetadataWithNumberOfTargets>>({
    method: 'get'.toUpperCase(),
    path: `/corporate/checkups/projects/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 産業医面談ステータスと就業に関する意見のidを取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetId 
 */
export const getMedicalCheckupProjectsTargetsConsultationApi = ({ authorization, projectId, targetId,  }: {
  authorization: string
  projectId: number
  targetId: number
}) => {
  return callApi<Array<CheckupConsultaionOpinionStatus>>({
    method: 'get'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetId))}/consultation`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 対象の健診結果を取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetId 
 */
export const getMedicalCheckupProjectsTargetsKarteApi = ({ authorization, projectId, targetId,  }: {
  authorization: string
  projectId: number
  targetId: number
}) => {
  return callApi<CheckupResult>({
    method: 'get'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetId))}/karte`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 対応履歴を取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetId 
 * @param supportId 
 */
export const getMedicalCheckupProjectsTargetsSupportApi = ({ authorization, projectId, targetId, supportId,  }: {
  authorization: string
  projectId: number
  targetId: number
  supportId: number
}) => {
  return callApi<Support>({
    method: 'get'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetId))}/supports/${encodeURIComponent(String(supportId))}`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 対応履歴の一覧を取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetId 
 */
export const getMedicalCheckupProjectsTargetsSupportsApi = ({ authorization, projectId, targetId,  }: {
  authorization: string
  projectId: number
  targetId: number
}) => {
  return callApi<Array<Support>>({
    method: 'get'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetId))}/supports`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 健康診断の対象者を検索し取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param pageSkip page skip index
 * @param pageLimit page limitation
 * @param employeeCode 従業員番号
 * @param name 氏名
 * @param unitIds 部署IDs
 * @param statuses ステータス \&quot;yet\&quot; or \&quot;complete\&quot;
 * @param medicalDiagnosisIds 総合判定
 * @param standardValueSetId 基準値セットID
 * @param outOfStandardValueSet 基準値外
 * @param checkupOpinionOnEmploymentStatusIds 産業医意見
 * @param consultationStatusIds 産業医面談
 * @param projectId MedicalCheckupProject_id
 */
export const getMedicalCheckupsApi = ({ authorization, pageSkip, pageLimit, employeeCode, name, unitIds, statuses, medicalDiagnosisIds, standardValueSetId, outOfStandardValueSet, checkupOpinionOnEmploymentStatusIds, consultationStatusIds, projectId,  }: {
  authorization: string
  pageSkip?: number
  pageLimit?: number
  employeeCode?: string
  name?: string
  unitIds?: Array<number>
  statuses?: Array<string>
  medicalDiagnosisIds?: Array<number>
  standardValueSetId?: number
  outOfStandardValueSet?: boolean
  checkupOpinionOnEmploymentStatusIds?: Array<number>
  consultationStatusIds?: Array<number>
  projectId?: number
}) => {
  return callApi<CheckupResults>({
    method: 'get'.toUpperCase(),
    path: `/corporate/checkups/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters: { pageSkip, pageLimit, employeeCode, name, unitIds, statuses, medicalDiagnosisIds, standardValueSetId, outOfStandardValueSet, checkupOpinionOnEmploymentStatusIds, consultationStatusIds, projectId,  },
    
  })
}

/**
 * 指定された従業員の問診票の回答を取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetId 
 */
export const getMedicalQuestionnaireSurveyApi = ({ authorization, projectId, targetId,  }: {
  authorization: string
  projectId: number
  targetId: number
}) => {
  return callApi<MedicalQuestionnaireSurvey>({
    method: 'get'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetId))}/survey`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * ストレスチェックの対象者を検索し取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param pageSkip page skip index
 * @param pageLimit page limitation
 * @param employeeCode 従業員番号
 * @param name 氏名
 * @param unitIds 部署IDs
 * @param statuses ステータス \&quot;yer\&quot; or \&quot;ok\&quot; or \&quot;ng\&quot;
 * @param highStresses 高ストレス
 * @param consultationOffers 面談申し出
 * @param stresscheckOpinionOnEmploymentStatusIds 産業医意見
 * @param projectId MedicalCheckupProject_id
 */
export const getMedicalStressChecksApi = ({ authorization, pageSkip, pageLimit, employeeCode, name, unitIds, statuses, highStresses, consultationOffers, stresscheckOpinionOnEmploymentStatusIds, projectId,  }: {
  authorization: string
  pageSkip?: number
  pageLimit?: number
  employeeCode?: string
  name?: string
  unitIds?: Array<number>
  statuses?: Array<string>
  highStresses?: Array<boolean>
  consultationOffers?: Array<boolean>
  stresscheckOpinionOnEmploymentStatusIds?: Array<number>
  projectId?: number
}) => {
  return callApi<StressCheckResults>({
    method: 'get'.toUpperCase(),
    path: `/corporate/stresschecks/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters: { pageSkip, pageLimit, employeeCode, name, unitIds, statuses, highStresses, consultationOffers, stresscheckOpinionOnEmploymentStatusIds, projectId,  },
    
  })
}

/**
 * 自分の組織のログイン可能ユーザ数を取得する
 * API呼出可能権限: manager
 * @param authorization AWS_ID_TOKEN
 */
export const getNumberOfActiveUsersApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<NumberOfActiveUsers>({
    method: 'get'.toUpperCase(),
    path: `/corporate/organizations/number_of_active_users/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 自分の組織の従業員数を取得する
 * API呼出可能権限: manager
 * @param authorization AWS_ID_TOKEN
 */
export const getNumberOfEmployeesApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<NumberOfEmployees>({
    method: 'get'.toUpperCase(),
    path: `/corporate/organizations/number_of_employees/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 組織構造を取得する
 * API呼出可能権限: manager
 * @param authorization AWS_ID_TOKEN
 */
export const getOrganizationUnitsApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<OrganizationWithUnits>({
    method: 'get'.toUpperCase(),
    path: `/corporate/organizations/units/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 基準値登録に必要な検査項目群を取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 */
export const getStandardValueExaminationSetsApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<StandardValueExaminationSets>({
    method: 'get'.toUpperCase(),
    path: `/corporate/checkups/standardvaluesets/examinations`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 基準値セットを取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param standardValueSetId 
 */
export const getStandardValueSetApi = ({ authorization, standardValueSetId,  }: {
  authorization: string
  standardValueSetId: number
}) => {
  return callApi<StandardValueSet>({
    method: 'get'.toUpperCase(),
    path: `/corporate/checkups/standardvaluesets/${encodeURIComponent(String(standardValueSetId))}`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 基準値セットの一覧を取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 */
export const getStandardValueSetsApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<StandardValueSets>({
    method: 'get'.toUpperCase(),
    path: `/corporate/checkups/standardvaluesets/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 対象のストレスチェックをID指定で取得する。
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const getStressCheckProjectApi = ({ authorization, projectId,  }: {
  authorization: string
  projectId: number
}) => {
  return callApi<StressCheckProject>({
    method: 'get'.toUpperCase(),
    path: `/corporate/stresschecks/projects/${encodeURIComponent(String(projectId))}`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * ストレスチェック対象になっていない従業員の一覧を取得する
 * API呼出可能権限: manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const getStressCheckProjectTargetsExcludedApi = ({ authorization, projectId,  }: {
  authorization: string
  projectId: number
}) => {
  return callApi<Array<EmployeeExcludedFromStressCheck>>({
    method: 'get'.toUpperCase(),
    path: `/corporate/stresschecks/projects/${encodeURIComponent(String(projectId))}/targets/excluded`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * ストレスチェックの受診率を取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const getStressCheckProjectTargetsRate = ({ authorization, projectId,  }: {
  authorization: string
  projectId: number
}) => {
  return callApi<StressCheckRate>({
    method: 'get'.toUpperCase(),
    path: `/corporate/stresschecks/projects/${encodeURIComponent(String(projectId))}/targets/rate`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 会社で実施した（実施予定の）ストレスチェックの一覧を取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 */
export const getStressCheckProjectsApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<StressCheckProjectWithNumberOfTargets>>({
    method: 'get'.toUpperCase(),
    path: `/corporate/stresschecks/projects/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 対応履歴を取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetId 
 * @param supportId 
 */
export const getStressCheckProjectsTargetsSupportApi = ({ authorization, projectId, targetId, supportId,  }: {
  authorization: string
  projectId: number
  targetId: number
  supportId: number
}) => {
  return callApi<Support>({
    method: 'get'.toUpperCase(),
    path: `/corporate/stresschecks/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetId))}/supports/${encodeURIComponent(String(supportId))}`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 対応履歴の一覧を取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetId 
 */
export const getStressCheckProjectsTargetsSupportsApi = ({ authorization, projectId, targetId,  }: {
  authorization: string
  projectId: number
  targetId: number
}) => {
  return callApi<Array<Support>>({
    method: 'get'.toUpperCase(),
    path: `/corporate/stresschecks/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetId))}/supports`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * ストレスチェック報告書の初期値を取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const getStressCheckReportsApi = ({ authorization, projectId,  }: {
  authorization: string
  projectId: number
}) => {
  return callApi<StressCheckReport>({
    method: 'get'.toUpperCase(),
    path: `/corporate/stresschecks/projects/${encodeURIComponent(String(projectId))}/reports/summary/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 評価点毎のユーザを集計する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const getStressCheckSummaryEmployeesApi = ({ authorization, projectId,  }: {
  authorization: string
  projectId: number
}) => {
  return callApi<StressCheckSummaryEmployees>({
    method: 'get'.toUpperCase(),
    path: `/corporate/stresschecks/projects/${encodeURIComponent(String(projectId))}/summary/employees/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * ユーザの回答を集計する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const getStressCheckSummaryResultsApi = ({ authorization, projectId,  }: {
  authorization: string
  projectId: number
}) => {
  return callApi<StressCheckSummaryResults>({
    method: 'get'.toUpperCase(),
    path: `/corporate/stresschecks/projects/${encodeURIComponent(String(projectId))}/summary/results/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * ストレスチェックの評価点を集計する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const getStressCheckSummaryScoresApi = ({ authorization, projectId,  }: {
  authorization: string
  projectId: number
}) => {
  return callApi<StressCheckSummaryScores>({
    method: 'get'.toUpperCase(),
    path: `/corporate/stresschecks/projects/${encodeURIComponent(String(projectId))}/summary/scores/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 産業医面談ステータスと就業に関する意見のidを取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetId 
 */
export const getStressChecksProjectsTargetsConsultationApi = ({ authorization, projectId, targetId,  }: {
  authorization: string
  projectId: number
  targetId: number
}) => {
  return callApi<Array<StressCheckConsultaionOpinionStatusId>>({
    method: 'get'.toUpperCase(),
    path: `/corporate/stresschecks/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetId))}/consultation`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 健康検診のPDFを作成しダウンロードする
 * API呼出可能権限: manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const postCheckupReportsApi = ({ body, authorization, projectId,  }: {
  body: CheckupReportPost
  authorization: string
  projectId: number
}) => {
  return callApi<any>({
    method: 'post'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/reports/summary/`,
    accepts: [],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 新しい面談記録(高ストレス)を追加する
 * API呼出可能権限: advisor
 * @param body 
 * @param authorization AWS_ID_TOKEN
 */
export const postConsultationsHighStressApi = ({ body, authorization,  }: {
  body: ConsultationMental
  authorization: string
}) => {
  return callApi<ConsultationPostResult>({
    method: 'post'.toUpperCase(),
    path: `/corporate/consultations/high-stress`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 新しい面談記録(長時間労働)を追加する
 * API呼出可能権限: advisor
 * @param body 
 * @param authorization AWS_ID_TOKEN
 */
export const postConsultationsLongHourApi = ({ body, authorization,  }: {
  body: ConsultationMental
  authorization: string
}) => {
  return callApi<ConsultationPostResult>({
    method: 'post'.toUpperCase(),
    path: `/corporate/consultations/long-hour`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 新しい面談記録(健診)を追加する
 * API呼出可能権限: advisor
 * @param body 
 * @param authorization AWS_ID_TOKEN
 */
export const postConsultationsMedicalCheckupApi = ({ body, authorization,  }: {
  body: ConsultationMedicalCheckup
  authorization: string
}) => {
  return callApi<ConsultationPostResult>({
    method: 'post'.toUpperCase(),
    path: `/corporate/consultations/medical-checkup`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 新しい従業員を追加する
 * API呼出可能権限: manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 */
export const postEmployeesApi = ({ body, authorization,  }: {
  body: EmployeePost
  authorization: string
}) => {
  return callApi<EmployeePostResult>({
    method: 'post'.toUpperCase(),
    path: `/corporate/organizations/employees/`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 新しい産業医を追加する
 * API呼出可能権限: manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 */
export const postMedicalAdvisorsApi = ({ body, authorization,  }: {
  body: MedicalAdvisorRequest
  authorization: string
}) => {
  return callApi<MedicalAdvisor>({
    method: 'post'.toUpperCase(),
    path: `/corporate/organizations/medical-advisors/`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 画像ファイルをアップロードする
 * API呼出可能権限: advisor, manager
 * @param file 
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetId 
 */
export const postMedicalCheckupImageApi = ({ file, authorization, projectId, targetId,  }: {
  file: Blob
  authorization: string
  projectId: number
  targetId: number
}) => {
  return callApi<Array<MedicalCheckupImage>>({
    method: 'post'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetId))}/images`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    formParams: [{ key: 'file', value: file },], 
  })
}

/**
 * 健診対象者を追加する
 * API呼出可能権限: manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const postMedicalCheckupProjectTargetsApi = ({ body, authorization, projectId,  }: {
  body: AddCheckupTargets
  authorization: string
  projectId: number
}) => {
  return callApi<CheckupTargetAddedResult>({
    method: 'post'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/targets/`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 新しい健康診断を作成する
 * API呼出可能権限: manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 */
export const postMedicalCheckupProjectsApi = ({ body, authorization,  }: {
  body: MedicalCheckupProjectPost
  authorization: string
}) => {
  return callApi<MedicalCheckupProjectMetadata>({
    method: 'post'.toUpperCase(),
    path: `/corporate/checkups/projects/`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * メールを送信する
 * API呼出可能権限: advisor, manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const postMedicalCheckupProjectsTargetsMailsInsertApi = ({ body, authorization, projectId,  }: {
  body: SupportMailBulkPost
  authorization: string
  projectId: number
}) => {
  return callApi<Support>({
    method: 'post'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/targets/supports/mails`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 対応履歴を追加する
 * API呼出可能権限: advisor, manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetId 
 */
export const postMedicalCheckupProjectsTargetsSupportsApi = ({ body, authorization, projectId, targetId,  }: {
  body: SupportPost
  authorization: string
  projectId: number
  targetId: number
}) => {
  return callApi<Support>({
    method: 'post'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetId))}/supports`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 対応履歴を一括追加する
 * API呼出可能権限: advisor, manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const postMedicalCheckupProjectsTargetsSupportsInsertApi = ({ body, authorization, projectId,  }: {
  body: SupportBulkPost
  authorization: string
  projectId: number
}) => {
  return callApi<SupportBulkPostResult>({
    method: 'post'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/targets/supports`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 問診票の回答を登録する
 * API呼出可能権限: employee
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetId 
 */
export const postMedicalQuestionnaireSurveyApi = ({ body, authorization, projectId, targetId,  }: {
  body: Array<MedicalQuestionnaireSurveyIdRequest>
  authorization: string
  projectId: number
  targetId: number
}) => {
  return callApi<MedicalQuestionnaireSurveyPost>({
    method: 'post'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetId))}/survey`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 基準値セットを作成する
 * API呼出可能権限: advisor, manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 */
export const postStandardValueSetsApi = ({ body, authorization,  }: {
  body: StandardValueSetPost
  authorization: string
}) => {
  return callApi<StandardValueSet>({
    method: 'post'.toUpperCase(),
    path: `/corporate/checkups/standardvaluesets/`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * ストレスチェック対象者を追加する
 * API呼出可能権限: manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const postStressCheckProjectTargetsApi = ({ body, authorization, projectId,  }: {
  body: AddStressCheckTargets
  authorization: string
  projectId: number
}) => {
  return callApi<StressCheckTargetAddedResult>({
    method: 'post'.toUpperCase(),
    path: `/corporate/stresschecks/projects/${encodeURIComponent(String(projectId))}/targets/`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 新しいストレスチェックを作成する
 * API呼出可能権限: manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 */
export const postStressCheckProjectsApi = ({ body, authorization,  }: {
  body: StressCheckProjectPost
  authorization: string
}) => {
  return callApi<StressCheckProject>({
    method: 'post'.toUpperCase(),
    path: `/corporate/stresschecks/projects/`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * メールを送信する
 * API呼出可能権限: advisor, manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const postStressCheckProjectsTargetsMailsInsertApi = ({ body, authorization, projectId,  }: {
  body: SupportMailBulkPost
  authorization: string
  projectId: number
}) => {
  return callApi<Support>({
    method: 'post'.toUpperCase(),
    path: `/corporate/stresschecks/projects/${encodeURIComponent(String(projectId))}/targets/supports/mails`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 対応履歴を追加する
 * API呼出可能権限: advisor, manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetId 
 */
export const postStressCheckProjectsTargetsSupportsApi = ({ body, authorization, projectId, targetId,  }: {
  body: SupportPost
  authorization: string
  projectId: number
  targetId: number
}) => {
  return callApi<Support>({
    method: 'post'.toUpperCase(),
    path: `/corporate/stresschecks/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetId))}/supports`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 対応履歴を一括追加する
 * API呼出可能権限: advisor, manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const postStressCheckProjectsTargetsSupportsInsertApi = ({ body, authorization, projectId,  }: {
  body: SupportBulkPost
  authorization: string
  projectId: number
}) => {
  return callApi<SupportBulkPostResult>({
    method: 'post'.toUpperCase(),
    path: `/corporate/stresschecks/projects/${encodeURIComponent(String(projectId))}/targets/supports`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * ストレスチェックのPDFを作成しダウンロードする
 * API呼出可能権限: advisor, manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const postStressCheckReportsApi = ({ body, authorization, projectId,  }: {
  body: StressCheckReportPost
  authorization: string
  projectId: number
}) => {
  return callApi<any>({
    method: 'post'.toUpperCase(),
    path: `/corporate/stresschecks/projects/${encodeURIComponent(String(projectId))}/reports/summary/`,
    accepts: [],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 面談記録(高ストレス)を更新する
 * API呼出可能権限: advisor
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param consultationId 
 */
export const putConsultationHighStressApi = ({ body, authorization, consultationId,  }: {
  body: ConsultationMental
  authorization: string
  consultationId: number
}) => {
  return callApi<any>({
    method: 'put'.toUpperCase(),
    path: `/corporate/consultations/high-stress/${encodeURIComponent(String(consultationId))}`,
    accepts: [],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 面談記録(長時間労働)を更新する
 * API呼出可能権限: advisor
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param consultationId 
 */
export const putConsultationLongHourApi = ({ body, authorization, consultationId,  }: {
  body: ConsultationMental
  authorization: string
  consultationId: number
}) => {
  return callApi<any>({
    method: 'put'.toUpperCase(),
    path: `/corporate/consultations/long-hour/${encodeURIComponent(String(consultationId))}`,
    accepts: [],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 面談記録(健診)を更新する
 * API呼出可能権限: advisor
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param consultationId 
 */
export const putConsultationMedicalCheckupApi = ({ body, authorization, consultationId,  }: {
  body: ConsultationMedicalCheckup
  authorization: string
  consultationId: number
}) => {
  return callApi<any>({
    method: 'put'.toUpperCase(),
    path: `/corporate/consultations/medical-checkup/${encodeURIComponent(String(consultationId))}`,
    accepts: [],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 従業員情報を更新する。所属を外すなどの場合は、対象keyにNoneをputする。
 * API呼出可能権限: manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param employeeId 
 */
export const putEmployeeApi = ({ body, authorization, employeeId,  }: {
  body: EmployeePost
  authorization: string
  employeeId: number
}) => {
  return callApi<any>({
    method: 'put'.toUpperCase(),
    path: `/corporate/organizations/employees/${encodeURIComponent(String(employeeId))}`,
    accepts: [],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 従業員情報を一括更新
 * API呼出可能権限: manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 */
export const putEmployeesApi = ({ body, authorization,  }: {
  body: EmployeesPut
  authorization: string
}) => {
  return callApi<EmployeesPutResult>({
    method: 'put'.toUpperCase(),
    path: `/corporate/organizations/employees/`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 従業員一覧をExcelで更新する
 * API呼出可能権限: manager
 * @param file 
 * @param authorization AWS_ID_TOKEN
 */
export const putEmployeesExcelApi = ({ file, authorization,  }: {
  file: Blob
  authorization: string
}) => {
  return callApi<any>({
    method: 'put'.toUpperCase(),
    path: `/corporate/organizations/employees/excel`,
    accepts: [],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    formParams: [{ key: 'file', value: file },], 
  })
}

/**
 * 産業医情報を更新する。変更しないkeyはPUTしない。所属を外すなどの場合は、対象keyにNoneをputする。
 * API呼出可能権限: manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param medicalAdvisorId 
 */
export const putMedicalAdvisorApi = ({ body, authorization, medicalAdvisorId,  }: {
  body: MedicalAdvisorRequest
  authorization: string
  medicalAdvisorId: number
}) => {
  return callApi<MedicalAdvisor>({
    method: 'put'.toUpperCase(),
    path: `/corporate/organizations/medical-advisors/${encodeURIComponent(String(medicalAdvisorId))}`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 対象の健康診断を更新する
 * API呼出可能権限: manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const putMedicalCheckupProjectApi = ({ body, authorization, projectId,  }: {
  body: MedicalCheckupProjectMetadata
  authorization: string
  projectId: number
}) => {
  return callApi<MedicalCheckupProjectMetadata>({
    method: 'put'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 産業医面談ステータスと就業に関する意見を更新する
 * API呼出可能権限: advisor
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetId 
 */
export const putMedicalCheckupProjectsTargetsConsultationApi = ({ body, authorization, projectId, targetId,  }: {
  body: CheckupConsultaionOpinionStatus
  authorization: string
  projectId: number
  targetId: number
}) => {
  return callApi<any>({
    method: 'put'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetId))}/consultation`,
    accepts: [],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 対応履歴を更新する
 * API呼出可能権限: advisor, manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetId 
 * @param supportId 
 */
export const putMedicalCheckupProjectsTargetsSupportApi = ({ body, authorization, projectId, targetId, supportId,  }: {
  body: SupportPost
  authorization: string
  projectId: number
  targetId: number
  supportId: number
}) => {
  return callApi<Support>({
    method: 'put'.toUpperCase(),
    path: `/corporate/checkups/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetId))}/supports/${encodeURIComponent(String(supportId))}`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 組織構造を更新する
 * API呼出可能権限: manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 */
export const putOrganizationUnitsApi = ({ body, authorization,  }: {
  body: Array<OrganizationUnitPut>
  authorization: string
}) => {
  return callApi<OrganizationWithUnits>({
    method: 'put'.toUpperCase(),
    path: `/corporate/organizations/units/`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 基準値セットを更新する
 * API呼出可能権限: advisor, manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param standardValueSetId 
 */
export const putStandardValueSetApi = ({ body, authorization, standardValueSetId,  }: {
  body: StandardValueSetPost
  authorization: string
  standardValueSetId: number
}) => {
  return callApi<StandardValueSet>({
    method: 'put'.toUpperCase(),
    path: `/corporate/checkups/standardvaluesets/${encodeURIComponent(String(standardValueSetId))}`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 対象のストレスチェックの計画を更新する。
 * API呼出可能権限: manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const putStressCheckProjectApi = ({ body, authorization, projectId,  }: {
  body: StressCheckProjectPost
  authorization: string
  projectId: number
}) => {
  return callApi<StressCheckProject>({
    method: 'put'.toUpperCase(),
    path: `/corporate/stresschecks/projects/${encodeURIComponent(String(projectId))}`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 対応履歴を更新する
 * API呼出可能権限: advisor, manager
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetId 
 * @param supportId 
 */
export const putStressCheckProjectsTargetsSupportApi = ({ body, authorization, projectId, targetId, supportId,  }: {
  body: SupportPost
  authorization: string
  projectId: number
  targetId: number
  supportId: number
}) => {
  return callApi<Support>({
    method: 'put'.toUpperCase(),
    path: `/corporate/stresschecks/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetId))}/supports/${encodeURIComponent(String(supportId))}`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 産業医面談ステータスと就業に関する意見を更新する
 * API呼出可能権限: advisor
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 * @param targetId 
 */
export const putStressChecksProjectsTargetsConsultationApi = ({ body, authorization, projectId, targetId,  }: {
  body: StressCheckConsultaionOpinionStatusId
  authorization: string
  projectId: number
  targetId: number
}) => {
  return callApi<any>({
    method: 'put'.toUpperCase(),
    path: `/corporate/stresschecks/projects/${encodeURIComponent(String(projectId))}/targets/${encodeURIComponent(String(targetId))}/consultation`,
    accepts: [],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}


// @ts-ignore
import { callApi } from '../utils'
import AuthorizationInfo from '../model/authorizationInfo';
import CheckupExaminations from '../model/checkupExaminations';
import CheckupMedications from '../model/checkupMedications';
import ConditionsToBeCorrected from '../model/conditionsToBeCorrected';
import ConsultationStatus from '../model/consultationStatus';
import Decision from '../model/decision';
import EmploymentDiagnosis from '../model/employmentDiagnosis';
import InstructionCategory from '../model/instructionCategory';
import MailTemplates from '../model/mailTemplates';
import MedicalCheckupOpinionOnEmploymentStatus from '../model/medicalCheckupOpinionOnEmploymentStatus';
import MedicalDiagnosis from '../model/medicalDiagnosis';
import MedicalQuestionnaire from '../model/medicalQuestionnaire';
import MedicalQuestionnaireId from '../model/medicalQuestionnaireId';
import NecessityOfPostInstruction from '../model/necessityOfPostInstruction';
import Questionnaire from '../model/questionnaire';
import QuestionnaireMetadata from '../model/questionnaireMetadata';
import StateOfAccumulatedFatigue from '../model/stateOfAccumulatedFatigue';
import StressCheckOpinionOnEmployment from '../model/stressCheckOpinionOnEmployment';
import StressEvaluationGroup from '../model/stressEvaluationGroup';

/**
 * 認証された従業員の権限を取得する
 * API呼出可能権限: admin, advisor, employee, manager, operator
 * @param authorization AWS_ID_TOKEN
 */
export const getAuthorizationApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<AuthorizationInfo>({
    method: 'get'.toUpperCase(),
    path: `/authorization/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 健診表示用に検査項目の一覧を取得する
 * 
 * @param authorization AWS_ID_TOKEN
 * @param targetSex 
 */
export const getCheckupExaminationsApi = ({ authorization, targetSex,  }: {
  authorization: string
  targetSex: string
}) => {
  return callApi<CheckupExaminations>({
    method: 'get'.toUpperCase(),
    path: `/checkups/examinations/${encodeURIComponent(String(targetSex))}`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 服薬情報を取得する
 * 
 * @param authorization AWS_ID_TOKEN
 */
export const getCheckupMedicationsApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<CheckupMedications>>({
    method: 'get'.toUpperCase(),
    path: `/checkups/medications/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 配慮すべき心身の状況を取得する
 * 
 * @param authorization AWS_ID_TOKEN
 */
export const getConditionsToBeCorrectedApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<ConditionsToBeCorrected>>({
    method: 'get'.toUpperCase(),
    path: `/consultations/conditions-to-be-corrected/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 産業医意見ステータスを取得する
 * 
 * @param authorization AWS_ID_TOKEN
 */
export const getConsultationStatusesApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<ConsultationStatus>>({
    method: 'get'.toUpperCase(),
    path: `/consultations/statuses/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 判定一覧を取得する
 * 
 * @param authorization AWS_ID_TOKEN
 */
export const getDecisionsApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<Decision>>({
    method: 'get'.toUpperCase(),
    path: `/checkups/decisions/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 就業判定を取得する
 * 
 * @param authorization AWS_ID_TOKEN
 */
export const getEmploymentDiagnosesApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<EmploymentDiagnosis>>({
    method: 'get'.toUpperCase(),
    path: `/consultations/employment-diagnoses/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 就業に関する意見ステータスを取得する
 * 
 * @param authorization AWS_ID_TOKEN
 */
export const getInstructionCategoryApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<InstructionCategory>>({
    method: 'get'.toUpperCase(),
    path: `/consultations/instruction-categories/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * メールのテンプレート文を取得する
 * API呼出可能権限: advisor, manager
 * @param authorization AWS_ID_TOKEN
 * @param mailType テンプレート
 */
export const getMailTemplatesApi = ({ authorization, mailType,  }: {
  authorization: string
  mailType: string
}) => {
  return callApi<Array<MailTemplates>>({
    method: 'get'.toUpperCase(),
    path: `/general/mail_templates/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters: { mailType,  },
    
  })
}

/**
 * 就業に関する意見ステータスを取得する
 * 
 * @param authorization AWS_ID_TOKEN
 */
export const getMedicalCheckupOpinionOnEmploymentStatusesApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<MedicalCheckupOpinionOnEmploymentStatus>>({
    method: 'get'.toUpperCase(),
    path: `/checkups/opinions/statuses/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 診断判定を取得する
 * 
 * @param authorization AWS_ID_TOKEN
 */
export const getMedicalDiagnosesApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<MedicalDiagnosis>>({
    method: 'get'.toUpperCase(),
    path: `/consultations/medical-diagnoses/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 問診票を取得する
 * 
 * @param authorization AWS_ID_TOKEN
 */
export const getMedicalQuestionnairesApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<MedicalQuestionnaire>>({
    method: 'get'.toUpperCase(),
    path: `/checkups/questionnaires/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 問診票をIDを指定して取得する
 * 
 * @param authorization AWS_ID_TOKEN
 * @param questionnaireId 
 */
export const getMedicalQuestionnairesIdApi = ({ authorization, questionnaireId,  }: {
  authorization: string
  questionnaireId: number
}) => {
  return callApi<MedicalQuestionnaireId>({
    method: 'get'.toUpperCase(),
    path: `/checkups/questionnaires/${encodeURIComponent(String(questionnaireId))}`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 事後措置としての指導・勧告の必要性を取得する
 * 
 * @param authorization AWS_ID_TOKEN
 */
export const getNecessityOfPostInstructionsApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<NecessityOfPostInstruction>>({
    method: 'get'.toUpperCase(),
    path: `/consultations/necessity-of-post-instructions/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 質問表をID指定で取得する
 * 
 * @param authorization AWS_ID_TOKEN
 * @param questionnaireId 
 */
export const getQuestionnaireApi = ({ authorization, questionnaireId,  }: {
  authorization: string
  questionnaireId: number
}) => {
  return callApi<Questionnaire>({
    method: 'get'.toUpperCase(),
    path: `/stresschecks/questionnaires/${encodeURIComponent(String(questionnaireId))}`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 質問表一覧を取得する
 * 
 * @param authorization AWS_ID_TOKEN
 */
export const getQuestionnairesApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<QuestionnaireMetadata>>({
    method: 'get'.toUpperCase(),
    path: `/stresschecks/questionnaires/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 披露蓄積の状況を取得する
 * 
 * @param authorization AWS_ID_TOKEN
 */
export const getStateOfAccumulatedFatiguesApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<StateOfAccumulatedFatigue>>({
    method: 'get'.toUpperCase(),
    path: `/consultations/state-of-accumulated-fatigues/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * ストレスチェック評価表（素点換算表）を取得する
 * 
 * @param authorization AWS_ID_TOKEN
 */
export const getStressCheckEvaluationsApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<StressEvaluationGroup>>({
    method: 'get'.toUpperCase(),
    path: `/stresschecks/evaluations/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 就業に関する意見ステータスを取得する
 * 
 * @param authorization AWS_ID_TOKEN
 */
export const getStressCheckOpinionOnEmploymentApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<StressCheckOpinionOnEmployment>>({
    method: 'get'.toUpperCase(),
    path: `/stresschecks/opinions/statuses/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}


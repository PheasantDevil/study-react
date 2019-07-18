// @ts-ignore
import { callApi } from '../utils'
import CheckupMetadata from '../model/checkupMetadata';
import CheckupReexamination from '../model/checkupReexamination';
import CheckupReexaminationRequest from '../model/checkupReexaminationRequest';
import CheckupResult from '../model/checkupResult';
import CheckupResultImage from '../model/checkupResultImage';
import CheckupStanderdValue from '../model/checkupStanderdValue';
import Profile from '../model/profile';
import Questionnaire from '../model/questionnaire';
import StressCheckAnswered from '../model/stressCheckAnswered';
import StressCheckConsultationOffer from '../model/stressCheckConsultationOffer';
import StressCheckDisclosure from '../model/stressCheckDisclosure';
import StressCheckDisclosurePost from '../model/stressCheckDisclosurePost';
import StressCheckGuide from '../model/stressCheckGuide';
import StressCheckResult from '../model/stressCheckResult';
import StressCheckResultId from '../model/stressCheckResultId';
import StressCheckResultItem from '../model/stressCheckResultItem';
import StressCheckTargetMetadata from '../model/stressCheckTargetMetadata';

/**
 * 健診結果を取得する
 * API呼出可能権限: employee
 * @param authorization AWS_ID_TOKEN
 * @param checkupTargetId 
 */
export const getCheckupApi = ({ authorization, checkupTargetId,  }: {
  authorization: string
  checkupTargetId: number
}) => {
  return callApi<CheckupResult>({
    method: 'get'.toUpperCase(),
    path: `/employee/checkups/${encodeURIComponent(String(checkupTargetId))}`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 健診結果画像の一覧を取得する
 * API呼出可能権限: employee
 * @param authorization AWS_ID_TOKEN
 * @param checkupTargetId 
 */
export const getCheckupImagesApi = ({ authorization, checkupTargetId,  }: {
  authorization: string
  checkupTargetId: number
}) => {
  return callApi<Array<CheckupResultImage>>({
    method: 'get'.toUpperCase(),
    path: `/employee/checkups/${encodeURIComponent(String(checkupTargetId))}/images`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 健診結果画像をダウンロードする
 * API呼出可能権限: employee
 * @param authorization AWS_ID_TOKEN
 * @param targetId 
 * @param imageId 
 */
export const getCheckupImagesDownloadApi = ({ authorization, targetId, imageId,  }: {
  authorization: string
  targetId: number
  imageId: number
}) => {
  return callApi<any>({
    method: 'get'.toUpperCase(),
    path: `/employee/checkups/${encodeURIComponent(String(targetId))}/images/${encodeURIComponent(String(imageId))}`,
    accepts: [],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 二次健診の一覧を取得する
 * API呼出可能権限: employee
 * @param authorization AWS_ID_TOKEN
 * @param checkupTargetId 
 */
export const getCheckupReexaminationsApi = ({ authorization, checkupTargetId,  }: {
  authorization: string
  checkupTargetId: number
}) => {
  return callApi<Array<CheckupReexamination>>({
    method: 'get'.toUpperCase(),
    path: `/employee/checkups/${encodeURIComponent(String(checkupTargetId))}/reexaminations`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 受診した健診の一覧を取得する
 * API呼出可能権限: employee
 * @param authorization AWS_ID_TOKEN
 */
export const getCheckupsApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<CheckupMetadata>>({
    method: 'get'.toUpperCase(),
    path: `/employee/checkups/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 健診表示用の基準値を取得する
 * API呼出可能権限: employee
 * @param authorization AWS_ID_TOKEN
 * @param targetSex 
 */
export const getCheckupsStandardValuesApi = ({ authorization, targetSex,  }: {
  authorization: string
  targetSex: string
}) => {
  return callApi<Array<CheckupStanderdValue>>({
    method: 'get'.toUpperCase(),
    path: `/employee/checkups/standardvalues/${encodeURIComponent(String(targetSex))}`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * ストレスチェックの回答日を取得する。未回答の場合はnull。
 * API呼出可能権限: employee
 * @param authorization AWS_ID_TOKEN
 * @param targetId 
 */
export const getStressCheckAnsweredApi = ({ authorization, targetId,  }: {
  authorization: string
  targetId: number
}) => {
  return callApi<StressCheckAnswered>({
    method: 'get'.toUpperCase(),
    path: `/employee/stresschecks/${encodeURIComponent(String(targetId))}/answered`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 受診したストレスチェック結果を取得する
 * API呼出可能権限: employee
 * @param authorization AWS_ID_TOKEN
 * @param targetId 
 */
export const getStressCheckApi = ({ authorization, targetId,  }: {
  authorization: string
  targetId: number
}) => {
  return callApi<StressCheckResult>({
    method: 'get'.toUpperCase(),
    path: `/employee/stresschecks/${encodeURIComponent(String(targetId))}/result`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * ストレスチェックの表紙案内を取得する
 * API呼出可能権限: employee
 * @param authorization AWS_ID_TOKEN
 * @param targetId 
 */
export const getStressCheckGuideApi = ({ authorization, targetId,  }: {
  authorization: string
  targetId: number
}) => {
  return callApi<StressCheckGuide>({
    method: 'get'.toUpperCase(),
    path: `/employee/stresschecks/${encodeURIComponent(String(targetId))}/guide`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * ストレスチェックで使用する質問表を取得する。
 * API呼出可能権限: employee
 * @param authorization AWS_ID_TOKEN
 * @param targetId 
 */
export const getStressCheckQuestionnaireApi = ({ authorization, targetId,  }: {
  authorization: string
  targetId: number
}) => {
  return callApi<Questionnaire>({
    method: 'get'.toUpperCase(),
    path: `/employee/stresschecks/${encodeURIComponent(String(targetId))}/questionnaire/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 受診した（受診予定の）ストレスチェックの一覧を取得する
 * API呼出可能権限: employee
 * @param authorization AWS_ID_TOKEN
 */
export const getStressChecksApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<StressCheckTargetMetadata>>({
    method: 'get'.toUpperCase(),
    path: `/employee/stresschecks/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 新しい二次検診を作成する
 * API呼出可能権限: employee
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param checkupTargetId 
 */
export const postCheckupReexaminationsApi = ({ body, authorization, checkupTargetId,  }: {
  body: CheckupReexaminationRequest
  authorization: string
  checkupTargetId: number
}) => {
  return callApi<CheckupReexamination>({
    method: 'post'.toUpperCase(),
    path: `/employee/checkups/${encodeURIComponent(String(checkupTargetId))}/reexaminations`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * ストレスチェックに回答する
 * API呼出可能権限: employee
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param targetId 
 */
export const postStressCheckApi = ({ body, authorization, targetId,  }: {
  body: Array<StressCheckResultItem>
  authorization: string
  targetId: number
}) => {
  return callApi<StressCheckResultId>({
    method: 'post'.toUpperCase(),
    path: `/employee/stresschecks/${encodeURIComponent(String(targetId))}/result`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 産業医面談を申し出る
 * API呼出可能権限: employee
 * @param authorization AWS_ID_TOKEN
 * @param targetId 
 */
export const postStressCheckConsultationOfferApi = ({ authorization, targetId,  }: {
  authorization: string
  targetId: number
}) => {
  return callApi<StressCheckConsultationOffer>({
    method: 'post'.toUpperCase(),
    path: `/employee/stresschecks/${encodeURIComponent(String(targetId))}/consultation_offer`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * ストレスチェックを開示する
 * API呼出可能権限: employee
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param targetId 
 */
export const postStressCheckDisclosureApi = ({ body, authorization, targetId,  }: {
  body: StressCheckDisclosurePost
  authorization: string
  targetId: number
}) => {
  return callApi<StressCheckDisclosure>({
    method: 'post'.toUpperCase(),
    path: `/employee/stresschecks/${encodeURIComponent(String(targetId))}/disclosure`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 二次検診を更新する
 * API呼出可能権限: employee
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param checkupTargetId 
 * @param reexaminationId 
 */
export const putCheckupReexaminationApi = ({ body, authorization, checkupTargetId, reexaminationId,  }: {
  body: CheckupReexaminationRequest
  authorization: string
  checkupTargetId: number
  reexaminationId: number
}) => {
  return callApi<CheckupReexamination>({
    method: 'put'.toUpperCase(),
    path: `/employee/checkups/${encodeURIComponent(String(checkupTargetId))}/reexaminations/${encodeURIComponent(String(reexaminationId))}`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * プロフィールを編集する
 * API呼出可能権限: employee
 * @param body 
 * @param authorization AWS_ID_TOKEN
 */
export const putProfileApi = ({ body, authorization,  }: {
  body: Profile
  authorization: string
}) => {
  return callApi<any>({
    method: 'put'.toUpperCase(),
    path: `/employee/profile/`,
    accepts: [],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}


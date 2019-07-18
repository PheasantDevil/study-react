// @ts-ignore
import { callApi } from '../utils'
import CheckupKarte from '../model/checkupKarte';
import CheckupKartePost from '../model/checkupKartePost';
import CheckupTarget from '../model/checkupTarget';
import Organization from '../model/organization';
import OrganizationBody from '../model/organizationBody';

/**
 * MedicalCheckupTargetを取得する
 * API呼出可能権限: admin
 * @param authorization AWS_ID_TOKEN
 * @param checkupTargetId 
 */
export const getCheckupTargetApi = ({ authorization, checkupTargetId,  }: {
  authorization: string
  checkupTargetId: number
}) => {
  return callApi<CheckupTarget>({
    method: 'get'.toUpperCase(),
    path: `/admin/checkups/${encodeURIComponent(String(checkupTargetId))}`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 予定者情報出力
 * API呼出可能権限: admin
 * @param authorization AWS_ID_TOKEN
 * @param projectId 
 */
export const getCheckupsExpectationApi = ({ authorization, projectId,  }: {
  authorization: string
  projectId: number
}) => {
  return callApi<any>({
    method: 'get'.toUpperCase(),
    path: `/admin/checkups/projects/${encodeURIComponent(String(projectId))}/expectation`,
    accepts: [],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 組織を取得する
 * API呼出可能権限: admin
 * @param authorization AWS_ID_TOKEN
 * @param organizationId 
 */
export const getOrganizationApi = ({ authorization, organizationId,  }: {
  authorization: string
  organizationId: number
}) => {
  return callApi<Organization>({
    method: 'get'.toUpperCase(),
    path: `/admin/organizations/${encodeURIComponent(String(organizationId))}`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 従業員一覧をExcelで取得する。cURLで-oオプション付きで実行すること。
 * API呼出可能権限: admin
 * @param authorization AWS_ID_TOKEN
 * @param organizationId 
 */
export const getOrganizationEmployeesApi = ({ authorization, organizationId,  }: {
  authorization: string
  organizationId: number
}) => {
  return callApi<Blob>({
    method: 'get'.toUpperCase(),
    path: `/admin/organizations/${encodeURIComponent(String(organizationId))}/employees`,
    accepts: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 現在の設定値を取得
 * API呼出可能権限: admin
 * @param authorization AWS_ID_TOKEN
 */
export const getUtilsSettingsApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<any>({
    method: 'get'.toUpperCase(),
    path: `/admin/utils/settings`,
    accepts: [],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * HIMESから結果と取り込み、カルテを作成する
 * API呼出可能権限: admin
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param checkupTargetId 
 */
export const postCheckupKarteApi = ({ body, authorization, checkupTargetId,  }: {
  body: CheckupKartePost
  authorization: string
  checkupTargetId: number
}) => {
  return callApi<CheckupKarte>({
    method: 'post'.toUpperCase(),
    path: `/admin/checkups/${encodeURIComponent(String(checkupTargetId))}/karte`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 組織を新規作成する
 * API呼出可能権限: admin
 * @param body 
 * @param authorization AWS_ID_TOKEN
 */
export const postOrganizationsApi = ({ body, authorization,  }: {
  body: OrganizationBody
  authorization: string
}) => {
  return callApi<Organization>({
    method: 'post'.toUpperCase(),
    path: `/admin/organizations/`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 組織を更新する
 * API呼出可能権限: admin
 * @param body 
 * @param authorization AWS_ID_TOKEN
 * @param organizationId 
 */
export const putOrganizationApi = ({ body, authorization, organizationId,  }: {
  body: Organization
  authorization: string
  organizationId: number
}) => {
  return callApi<Organization>({
    method: 'put'.toUpperCase(),
    path: `/admin/organizations/${encodeURIComponent(String(organizationId))}`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 従業員一覧をExcelで更新する
 * API呼出可能権限: admin
 * @param file 
 * @param authorization AWS_ID_TOKEN
 * @param organizationId 
 */
export const putOrganizationEmployeesApi = ({ file, authorization, organizationId,  }: {
  file: Blob
  authorization: string
  organizationId: number
}) => {
  return callApi<any>({
    method: 'put'.toUpperCase(),
    path: `/admin/organizations/${encodeURIComponent(String(organizationId))}/employees`,
    accepts: [],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    formParams: [{ key: 'file', value: file },], 
  })
}

/**
 * 設定値を変更
 * API呼出可能権限: admin
 * @param body 
 * @param authorization AWS_ID_TOKEN
 */
export const putUtilsSettingsApi = ({ body, authorization,  }: {
  body: any
  authorization: string
}) => {
  return callApi<any>({
    method: 'put'.toUpperCase(),
    path: `/admin/utils/settings`,
    accepts: [],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}


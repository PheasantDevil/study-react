// @ts-ignore
import { callApi } from '../utils'
import Advisor from '../model/advisor';
import AdvisorChatRoom from '../model/advisorChatRoom';
import AdvisorPost from '../model/advisorPost';
import AdvisorRoomPost from '../model/advisorRoomPost';
import ChatRoom from '../model/chatRoom';
import OccupationsTemplate from '../model/occupationsTemplate';
import SkillsTemplate from '../model/skillsTemplate';
import ThemesTemplate from '../model/themesTemplate';
import UserChatRoom from '../model/userChatRoom';

/**
 * 相談者の一覧を取得する
 * API呼出可能権限: employee
 * @param authorization AWS_ID_TOKEN
 */
export const getAdvisorApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<Advisor>>({
    method: 'get'.toUpperCase(),
    path: `/advise/advisors/`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 相談者（Advisor）を指定して、相談者のチャットルームの一覧を取得する
 * API呼出可能権限: employee
 * @param authorization AWS_ID_TOKEN
 * @param advisorId 
 */
export const getAdvisorChatRoomsApi = ({ authorization, advisorId,  }: {
  authorization: string
  advisorId: number
}) => {
  return callApi<Array<AdvisorChatRoom>>({
    method: 'get'.toUpperCase(),
    path: `/advise/advisors/${encodeURIComponent(String(advisorId))}/chatrooms`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 職業のテンプレートを取得する
 * API呼出可能権限: employee
 * @param authorization AWS_ID_TOKEN
 */
export const getOccupationsTemplatesApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<OccupationsTemplate>>({
    method: 'get'.toUpperCase(),
    path: `/advise/occupations/templates`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 技能のテンプレートを取得する
 * API呼出可能権限: employee
 * @param authorization AWS_ID_TOKEN
 */
export const getSkillsTemplatesApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<SkillsTemplate>>({
    method: 'get'.toUpperCase(),
    path: `/advise/skills/templates`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * テーマのテンプレートを取得する
 * API呼出可能権限: employee
 * @param authorization AWS_ID_TOKEN
 */
export const getThemesTemplatesApi = ({ authorization,  }: {
  authorization: string
}) => {
  return callApi<Array<ThemesTemplate>>({
    method: 'get'.toUpperCase(),
    path: `/advise/themes/templates`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * ユーザを指定して、ユーザのチャットルームの一覧を取得する
 * API呼出可能権限: employee
 * @param authorization AWS_ID_TOKEN
 * @param userId 
 */
export const getUserChatRoomsApi = ({ authorization, userId,  }: {
  authorization: string
  userId: number
}) => {
  return callApi<Array<UserChatRoom>>({
    method: 'get'.toUpperCase(),
    path: `/advise/users/${encodeURIComponent(String(userId))}/chatrooms`,
    accepts: ['application/json'],
    contentTypes: [],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    
  })
}

/**
 * 相談者を登録する
 * API呼出可能権限: admin
 * @param body 
 * @param authorization AWS_ID_TOKEN
 */
export const postAdvisorApi = ({ body, authorization,  }: {
  body: AdvisorPost
  authorization: string
}) => {
  return callApi<AdvisorPost>({
    method: 'post'.toUpperCase(),
    path: `/advise/advisors/`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}

/**
 * 相談者とユーザのペアでチャットルームを作成する
 * API呼出可能権限: employee
 * @param body 
 * @param authorization AWS_ID_TOKEN
 */
export const postAdvisorRoomsApi = ({ body, authorization,  }: {
  body: AdvisorRoomPost
  authorization: string
}) => {
  return callApi<ChatRoom>({
    method: 'post'.toUpperCase(),
    path: `/advise/rooms/`,
    accepts: ['application/json'],
    contentTypes: ['application/json', ],
    headerParameters: [{ key: 'Authorization', value: authorization }, ],
    queryParameters:  {} ,
    plainBody: body, 
  })
}


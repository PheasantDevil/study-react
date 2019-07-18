import { CognitoIdentityCredentials } from 'aws-sdk/global'
import { fetchMe, postMe } from '../aws/DynamoDB'
import { SignInSuccess } from '../framework/auth/Authenticator'
import { getAuthorizationApi } from '../swagger/api/general.service'
import AuthorizationInfo from '../swagger/model/authorizationInfo'

export default class User implements AuthorizationInfo {
  static async factory(credentials: CognitoIdentityCredentials, results: SignInSuccess) {
    const [authorizationInfo, result] = await Promise.all([
      getAuthorizationApi({
        authorization: results.session.getIdToken().getJwtToken()
      }),
      fetchMe({ credentials, projectionExpressionPaths: ['userId'] }) // DynamoDBに初期化データが存在するか確認
    ])
    if (!result) {
      // DynamoDBに初期化データが存在しない場合、初期化する（データを作成する）
      await postMe({ credentials, userId: authorizationInfo.userId })
    }
    return new User(authorizationInfo)
  }

  readonly avatar: string | undefined
  readonly birthday: string
  readonly employmentMedicalAdvisorId: number | undefined
  readonly familyName: string
  readonly givenName: string
  readonly isManager: boolean | undefined
  readonly isStresscheckOperator: boolean | undefined
  readonly organizationId: number
  readonly organizationName: string
  readonly sex: string
  readonly userId: number
  readonly username: string

  constructor({
    avatar,
    birthday,
    employmentMedicalAdvisorId,
    familyName,
    givenName,
    isManager,
    isStresscheckOperator,
    organizationId,
    organizationName,
    sex,
    userId,
    username
  }: AuthorizationInfo) {
    this.avatar = avatar || '/img/responsive/avatar_default.svg'
    this.birthday = birthday
    this.employmentMedicalAdvisorId = employmentMedicalAdvisorId
    this.familyName = familyName
    this.givenName = givenName
    this.isManager = isManager
    this.isStresscheckOperator = isStresscheckOperator
    this.organizationId = organizationId
    this.organizationName = organizationName
    this.sex = sex
    this.userId = userId
    this.username = username
  }

  update(updateValues: Partial<AuthorizationInfo>) {
    return new User({ ...this, ...updateValues })
  }

  getFullName() {
    return `${this.familyName} ${this.givenName}`
  }
}

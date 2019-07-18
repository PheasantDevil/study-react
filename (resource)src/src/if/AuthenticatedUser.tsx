import AuthorizationInfo from '../swagger/model/authorizationInfo'

export default interface AuthenticatedUser {
  employee: AuthorizationInfo
  identityId: string
}

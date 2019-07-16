import { CognitoUser, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js'
import { CognitoIdentityCredentials, config } from 'aws-sdk/global'
import CognitoConfig from './CognitoConfig'

export default class Authorizer {
  constructor(public cognitoConfig: CognitoConfig) {
    config.update({ region: cognitoConfig.Region })
  }

  async getCredentials() {
    const credentials = config.credentials as CognitoIdentityCredentials
    if (credentials.needsRefresh()) {
      await this.updateCredentials()
    }
    await credentials.getPromise()
    return credentials
  }

  useUnAuthCredentials() {
    const credentials = new CognitoIdentityCredentials({
      IdentityPoolId: this.cognitoConfig.IdentityPoolId,
      Logins: {}
    })
    config.credentials = credentials
  }

  useAuthCredentials(idToken: string, Username: string) {
    const credentials = new CognitoIdentityCredentials({
      IdentityPoolId: this.cognitoConfig.IdentityPoolId,
      LoginId: Username,
      Logins: {
        [`cognito-idp.${this.cognitoConfig.Region}.amazonaws.com/${
          this.cognitoConfig.UserPoolId
        }`]: idToken
      }
    })
    config.credentials = credentials
  }

  async getIdToken() {
    const { session } = await this.getSession()
    return session.getIdToken().getJwtToken()
  }

  private async getSession() {
    return new Promise<{ session: CognitoUserSession; cognitoUser: CognitoUser }>(
      (resolve, reject) => {
        const userPool = new CognitoUserPool({
          UserPoolId: this.cognitoConfig.UserPoolId,
          ClientId: this.cognitoConfig.UserPoolClientId
        })
        const cognitoUser = userPool.getCurrentUser()
        if (!cognitoUser) {
          return reject('not found cognito user.')
        }
        cognitoUser.getSession((err: any, userSession: CognitoUserSession) => {
          if (err) {
            return reject(err)
          }
          if (userSession.isValid()) {
            return resolve({ session: userSession, cognitoUser })
          }
          cognitoUser.refreshSession(
            userSession.getRefreshToken(),
            (err2, session: CognitoUserSession) => {
              if (err2) {
                return reject(err2)
              }
              resolve({ session, cognitoUser })
            }
          )
        })
      }
    )
  }

  private async updateCredentials() {
    const { session, cognitoUser } = await this.getSession()
    this.useAuthCredentials(session.getIdToken().getJwtToken(), cognitoUser.getUsername())
  }
}

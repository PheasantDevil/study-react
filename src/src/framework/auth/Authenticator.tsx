import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
  ICognitoUserPoolData,
  ISignUpResult
} from 'amazon-cognito-identity-js'
import CognitoConfig from './CognitoConfig'

export interface SignInSuccess {
  type: 'signInSuccess'
  userName: string
  session: CognitoUserSession
  userAttributes: CognitoUserAttribute[]
}

export interface SignInNewPasswordRequired {
  type: 'signInNewPasswordRequired'
  userName: string
  userAttributes: any
  requiredAttributes: any
}

export type SignInResult = SignInSuccess | SignInNewPasswordRequired

export default class Authenticator {
  private readonly CognitoUserPoolData: ICognitoUserPoolData
  constructor(cognitoConfig: CognitoConfig) {
    this.CognitoUserPoolData = {
      UserPoolId: cognitoConfig.UserPoolId,
      ClientId: cognitoConfig.UserPoolClientId
    }
  }

  signUp(Username: string, email: string, password: string, attributes: CognitoUserAttribute[]) {
    const attributeList = [new CognitoUserAttribute({ Name: 'email', Value: email }), ...attributes]
    return new Promise<ISignUpResult>((resolve, reject) => {
      const userPool = new CognitoUserPool(this.CognitoUserPoolData)
      userPool.signUp(Username, password, attributeList, [], (err, result) => {
        err ? reject(err) : resolve(result!)
      })
    })
  }

  confirmRegistration(Username: string, code: string) {
    const cognitoUser = new CognitoUser({
      Username,
      Pool: new CognitoUserPool(this.CognitoUserPoolData)
    })

    return new Promise<'SUCCESS'>((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, err => {
        err ? reject(err) : resolve('SUCCESS')
      })
    })
  }

  signIn(
    Username: string,
    Password: string,
    newPassword: string = '',
    requiredAttributeData: null | object = null
  ) {
    const authenticationDetails = new AuthenticationDetails({ Username, Password })
    const cognitoUser = new CognitoUser({
      Username,
      Pool: new CognitoUserPool(this.CognitoUserPoolData)
    })

    return new Promise<SignInResult>((resolve, reject) => {
      const callbacks = {
        onSuccess: (session: CognitoUserSession) => {
          cognitoUser.getUserAttributes((err, userAttributes) =>
            err
              ? reject(err)
              : resolve({
                  type: 'signInSuccess',
                  userName: Username,
                  session,
                  userAttributes: userAttributes!
                })
          )
        },
        onFailure: reject,
        newPasswordRequired: (userAttributes: any, requiredAttributes: any) => {
          if (newPassword) {
            cognitoUser.completeNewPasswordChallenge(newPassword, requiredAttributeData, callbacks)
          } else {
            resolve({
              type: 'signInNewPasswordRequired',
              userName: Username,
              userAttributes,
              requiredAttributes
            })
          }
        }
      }
      cognitoUser.authenticateUser(authenticationDetails, callbacks)
    })
  }

  resendConfirmationCode(Username: string) {
    const cognitoUser = new CognitoUser({
      Username,
      Pool: new CognitoUserPool(this.CognitoUserPoolData)
    })
    return new Promise<'SUCCESS'>((resolve, reject) => {
      cognitoUser.resendConfirmationCode((err, result) => {
        err ? reject(err) : resolve(result!)
      })
    })
  }

  forgotPassword(Username: string) {
    const cognitoUser = new CognitoUser({
      Username,
      Pool: new CognitoUserPool(this.CognitoUserPoolData)
    })
    return new Promise<void>((onSuccess, onFailure) => {
      cognitoUser.forgotPassword({ onSuccess, onFailure })
    })
  }

  confirmPassword(Username: string, newPassword: string, code: string) {
    const cognitoUser = new CognitoUser({
      Username,
      Pool: new CognitoUserPool(this.CognitoUserPoolData)
    })
    return new Promise<void>((onSuccess, onFailure) => {
      cognitoUser.confirmPassword(code, newPassword, { onSuccess, onFailure })
    })
  }

  changePassword(Username: string, oldPassword: string, newPassword: string) {
    const cognitoUser = new CognitoUser({
      Username,
      Pool: new CognitoUserPool(this.CognitoUserPoolData)
    })
    return new Promise((onSuccess, onFailure) => {
      cognitoUser.getSession((err: any) => {
        err
          ? onFailure(err)
          : cognitoUser.changePassword(oldPassword, newPassword, (err, result) =>
              err ? onFailure(err) : onSuccess(result)
            )
      })
    })
  }

  signOut() {
    const userPool = new CognitoUserPool(this.CognitoUserPoolData)
    const cognitoUser = userPool.getCurrentUser()
    if (cognitoUser) {
      cognitoUser.signOut()
    }
  }

  loadCachedSession() {
    return new Promise<SignInSuccess | null>((resolve, reject) => {
      const userPool = new CognitoUserPool(this.CognitoUserPoolData)
      const cognitoUser = userPool.getCurrentUser()
      if (cognitoUser) {
        return cognitoUser.getSession((err: any, cachedUserSession: CognitoUserSession) => {
          if (err) {
            return reject(err)
          }
          cognitoUser.getUserAttributes((err2, userAttributes) =>
            err2
              ? reject(err2)
              : resolve({
                  type: 'signInSuccess',
                  userName: cognitoUser.getUsername(),
                  session: cachedUserSession,
                  userAttributes: userAttributes!
                })
          )
        })
      }
      return resolve(null)
    })
  }
}

import { CognitoIdentityCredentials } from 'aws-sdk/global'
import { FormikProps } from 'formik'
import { RouteComponentProps } from 'react-router-dom'
import Authenticator, { SignInSuccess } from './Authenticator'
import Authorizer from './Authorizer'

export interface SignInValues {
  userName: string
  password: string
  newPasswordRequired: boolean
  newPassword: string
}

export interface ForgotPasswordValues {
  userName: string
}

export interface ConfirmPasswordValues {
  code: string
  newPassword: string
}

export interface ChangePasswordValues {
  currentPassword: string
  newPassword: string
  newPasswordConfirm: string
}

export interface AuthUrls {
  basePath: string
  urlSignIn: string
  urlSignOut: string
  urlForgotPassword: string
  urlConfirmPassword: string
  urlChangePassword: string
  urlSignInDefaultRedirect: string
}

export interface AuthContext<User> {
  authenticator: Authenticator
  authorizer: Authorizer
  user: User | null
  setUser: (user: User | null) => void
  createUser: (credentials: CognitoIdentityCredentials, results: SignInSuccess) => Promise<User>
}

export type AuthRouteProps<U> = AuthContext<U> &
  RouteComponentProps & {
    authUrls: AuthUrls
  }

export type SignInRouteProps<U> = AuthRouteProps<U> & { status: string }
export type ForgotPasswordRouteProps<U> = AuthRouteProps<U>
export type ConfirmPasswordRouteProps<U> = AuthRouteProps<U> & { userName: string }
export type ChangePasswordRouteProps<U> = AuthRouteProps<U> & { userName: string }
export type SignOutRouteProps<U> = AuthRouteProps<U> & { signOut: () => void }

export interface AuthComponents<U> {
  SignInForm: React.ComponentType<SignInRouteProps<U>>
  ConfirmPasswordForm: React.ComponentType<ConfirmPasswordRouteProps<U>>
  ForgotPasswordForm: React.ComponentType<ForgotPasswordRouteProps<U>>
  ChangePasswordForm: React.ComponentType<ChangePasswordRouteProps<U>>
  SignOut: React.ComponentType<SignOutRouteProps<U>>
}

export type SignInFormProps<U> = SignInRouteProps<U> & FormikProps<SignInValues>
export type ForgotPasswordFormProps<U> = ForgotPasswordRouteProps<U> &
  FormikProps<ForgotPasswordValues>
export type ConfirmPasswordFormProps<U> = ConfirmPasswordRouteProps<U> &
  FormikProps<ConfirmPasswordValues>
export type ChangePasswordFormProps<U> = ChangePasswordRouteProps<U> &
  FormikProps<ChangePasswordValues>

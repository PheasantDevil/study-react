import * as React from 'react'
import ChangePasswordForm from '../components/account/ChangePasswordForm'
import ConfirmPasswordForm from '../components/account/ConfirmPasswordForm'
import ForgotPasswordForm from '../components/account/ForgotPasswordForm'
import SignInForm from '../components/account/SignInForm'
import SignOut from '../components/account/SignOut'
import { urlsAccount } from '../config/Url'
import { AuthContext } from '../framework/auth/AuthTypes'
import createAuthRoutes from '../framework/auth/createAuthRoutes'
import Account from '../models/Account'
import User from '../models/User'

const AuthRoutes = createAuthRoutes(urlsAccount, {
  SignInForm,
  ConfirmPasswordForm,
  ForgotPasswordForm,
  ChangePasswordForm,
  SignOut
})

const AccountRoutes: React.FunctionComponent<AuthContext<User>> = props => {
  React.useEffect(() => {
    const root = document.getElementsByTagName('html')[0]
    !root.classList.contains('html-login') && root.classList.add('html-login')
    !document.body.classList.contains('body-login') && document.body.classList.add('body-login')
    return () => {
      root.classList.contains('html-login') && root.classList.remove('html-login')
      document.body.classList.contains('body-login') && document.body.classList.remove('body-login')
    }
  }, [])
  return <AuthRoutes {...props} />
}

export default Account.withAuthConsumer(AccountRoutes)

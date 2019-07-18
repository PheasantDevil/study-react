import { bind } from 'decko'
import * as React from 'react'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import { AuthComponents, AuthContext, AuthUrls } from './AuthTypes'

/**
 * 認証関連のURLを作成する
 * @param basePath ex. '/account'
 */
export const createAuthUrls: (basePath: string, signInDefaultRedirectUrl: string) => AuthUrls = (
  basePath,
  signInDefaultRedirectUrl
) => ({
  basePath,
  urlSignIn: `${basePath}/signin`,
  urlSignInNewPasswordRequired: `${basePath}/signin/new-password-required`,
  urlSignOut: `${basePath}/signout`,
  urlForgotPassword: `${basePath}/password/forgot`,
  urlConfirmPassword: `${basePath}/password/confirm`,
  urlChangePassword: `${basePath}/password/change`,
  urlSignInDefaultRedirect: signInDefaultRedirectUrl
})

const createAuthRoutes = <U extends { username: string }>(
  authUrls: AuthUrls,
  {
    SignInForm,
    ConfirmPasswordForm,
    ForgotPasswordForm,
    ChangePasswordForm,
    SignOut
  }: AuthComponents<U>
) => {
  class AuthRoutes extends React.Component<AuthContext<U>> {
    @bind
    renderSignInForm(routeProps: RouteComponentProps) {
      const status = (routeProps.location.state && routeProps.location.state.status) || ''
      return <SignInForm authUrls={authUrls} status={status} {...routeProps} {...this.props} />
    }

    @bind
    renderForgotPasswordForm(routeProps: RouteComponentProps) {
      return <ForgotPasswordForm authUrls={authUrls} {...routeProps} {...this.props} />
    }

    @bind
    renderConfirmPasswordForm(routeProps: RouteComponentProps) {
      if (routeProps.location.state && routeProps.location.state.userName) {
        return (
          <ConfirmPasswordForm
            authUrls={authUrls}
            userName={routeProps.location.state.userName}
            {...routeProps}
            {...this.props}
          />
        )
      }
      return <Redirect to={authUrls.urlSignIn} />
    }

    @bind
    renderChangePasswordForm(routeProps: RouteComponentProps) {
      if (!this.props.user) {
        return <Redirect to={authUrls.urlSignIn} />
      }
      return (
        <ChangePasswordForm
          authUrls={authUrls}
          userName={this.props.user.username}
          {...routeProps}
          {...this.props}
        />
      )
    }

    @bind
    renderSignOut(routeProps: RouteComponentProps) {
      return <SignOut authUrls={authUrls} signOut={this.signOut} {...routeProps} {...this.props} />
    }

    @bind
    signOut() {
      this.props.authenticator.signOut()
      this.props.authorizer.useUnAuthCredentials()
      this.props.setUser(null)
    }

    render() {
      const {
        urlSignIn,
        urlSignOut,
        urlForgotPassword,
        urlConfirmPassword,
        urlChangePassword
      } = authUrls
      return (
        <Switch>
          <Route path={urlSignIn} sensitive exact strict render={this.renderSignInForm} />
          <Route
            path={urlForgotPassword}
            sensitive
            exact
            strict
            render={this.renderForgotPasswordForm}
          />
          <Route
            path={urlConfirmPassword}
            sensitive
            exact
            strict
            render={this.renderConfirmPasswordForm}
          />
          <Route
            path={urlChangePassword}
            sensitive
            exact
            strict
            render={this.renderChangePasswordForm}
          />
          <Route path={urlSignOut} sensitive exact strict render={this.renderSignOut} />
        </Switch>
      )
    }
  }
  return AuthRoutes
}

export default createAuthRoutes

import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { AuthContext } from './AuthTypes'

const withAuthenticated = <P, U>(signInUrl: string) => (Component: React.ComponentType<P>) => (
  props: P & AuthContext<U> & RouteComponentProps
) => {
  if (props.user) {
    return <Component {...props} />
  }
  return <Redirect to={{ pathname: signInUrl, state: { from: props.location } }} />
}

export default withAuthenticated

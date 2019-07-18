import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import AuthenticatedUser from './AuthenticatedUser'

export type PrivateContainerBase<T> = React.ComponentType<
  RouteComponentProps<T> & { user: AuthenticatedUser }
>

export type AnonymouseContainerBase<T> = React.ComponentType<RouteComponentProps<T>>

// &
// Partial<{
//   user: AuthenticatedUser | null
//   signInCallback(user: AuthenticatedUser): void
//   signOutCallback(): void
// }>

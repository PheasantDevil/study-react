import * as React from 'react'
import { ErrorPageProps } from '../framework/hocs/withErrorBoundary'

const ErrorPage = ({ err, info }: ErrorPageProps) => (
  <div>
    <div>{err.message}</div>
    <div>{info.componentStack}</div>
  </div>
)

export default ErrorPage

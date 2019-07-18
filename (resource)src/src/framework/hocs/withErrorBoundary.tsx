import * as React from 'react'

export interface ErrorPageProps {
  err: Error
  info: React.ErrorInfo
}

interface State {
  error?: ErrorPageProps
}

const withErrorBoundary = (ErrorPage: React.ComponentType<ErrorPageProps>) => <P extends {}>(
  Component: React.ComponentType<P>
) => {
  /**
   * https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
   */
  class WithErrorBoundary extends React.Component<P, State> {
    state: State = {}

    componentDidCatch(err: Error, info: React.ErrorInfo) {
      this.setState({ error: { err, info } })
    }

    render() {
      if (this.state.error) {
        return <ErrorPage {...this.state.error} />
      }
      return <Component {...this.props} />
    }
  }
  return WithErrorBoundary
}

export default withErrorBoundary

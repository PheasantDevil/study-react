import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

const withScrollToTop = <P, M>(Component: React.ComponentType<P & RouteComponentProps<M>>) => {
  class WithScrollToTop extends React.Component<P & RouteComponentProps<any>> {
    componentDidUpdate(prevProps: RouteComponentProps<any>) {
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0)
      }
    }

    render() {
      return <Component {...this.props} />
    }
  }
  return WithScrollToTop
}

export default withScrollToTop

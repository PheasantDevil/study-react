import * as React from 'react'

export interface WithMountedProps {
  mounted: boolean
}

const withMounted = <P extends {}>(Component: React.ComponentType<P & WithMountedProps>) => {
  class WithMounted extends React.Component<P, WithMountedProps> {
    state: WithMountedProps = { mounted: false }
    componentDidMount() {
      this.setState({ mounted: true })
    }
    render() {
      return <Component mounted={this.state.mounted} {...this.props} />
    }
  }

  return WithMounted
}

export default withMounted

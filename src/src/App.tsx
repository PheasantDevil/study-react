import * as React from 'react'
import { hot } from 'react-hot-loader'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import ErrorPage from './components/ErrorPage'
import withBrowserRouter from './framework/hocs/withBrowserRouter'
import withErrorBoundary from './framework/hocs/withErrorBoundary'
import withScrollToTop from './framework/hocs/withScrollToTop'
import Account from './models/Account'
import RootRoutes from './routes/RootRoutes'
import withStyleSwitch from './util/withStyleSwitch'

class App extends React.Component {
  render() {
    return <RootRoutes />
  }
}

export default compose(
  hot(module),
  withErrorBoundary(ErrorPage),
  withBrowserRouter,
  withRouter,
  withStyleSwitch,
  withScrollToTop,
  Account.withAuthProvider
)(App)

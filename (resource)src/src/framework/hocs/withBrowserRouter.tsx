import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'

const withBrowserRouter = <P extends {}>(Component: React.ComponentType<P>) => {
  const WithBrowserRouter = (props: P) => {
    return (
      <BrowserRouter>
        <Component {...props} />
      </BrowserRouter>
    )
  }

  return WithBrowserRouter
}

export default withBrowserRouter

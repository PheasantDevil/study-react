import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { urlsAccount } from '../config/Url'
import AccountRoutes from './AccountRoutes'
import CorporateRoutes from './CorporateRoutes'
import EmployeeRoutes from './EmployeeRoutes'
import PublicRoutes from './PublicRoutes'

const RootRoutes = () => (
  <Switch>
    <Route path={urlsAccount.basePath} component={AccountRoutes} />
    <Route path="/corporate" component={CorporateRoutes} />
    <Route path="/me" component={EmployeeRoutes} />
    <Route component={PublicRoutes} />
  </Switch>
)

export default RootRoutes

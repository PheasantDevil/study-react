import * as React from 'react'
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import EmployeeFrame from '../components/me/EmployeeFrame'
import {
  me,
  meCheckups,
  meCheckupsRedirect,
  meProfile,
  meReserves,
  meStresschecks,
  meStresschecksTarget,
  meStresschecksTargetNew,
  meSurveys,
  meTop,
  urlsAccount
} from '../config/Url'
import EmployeeCheckupContainer from '../container/me/checkups/EmployeeCheckupContainer'
import EmployeeCheckupRedirectContainer from '../container/me/checkups/EmployeeCheckupRedirectContainer'
import EmployeeMyPageContainer from '../container/me/EmployeeMyPageContainer'
import ProfileContainer from '../container/me/ProfileContainer'
import EmployeeRservesContainer from '../container/me/Reserves/EmployeeRservesContainer'
import EmployeeServeysContainer from '../container/me/Serveys/EmployeeServeysContainer'
import EmployeeStressCheckContainer from '../container/me/stresschecks/EmployeeStressCheckContainer'
import EmployeeStressCheckListContainer from '../container/me/stresschecks/EmployeeStressCheckListContainer'
import EmployeeStressCheckResultContainer from '../container/me/stresschecks/EmployeeStressCheckResultContainer'
import { AuthContext } from '../framework/auth/AuthTypes'
import withAuthenticated from '../framework/auth/withAuthenticated'
import Account from '../models/Account'
import User from '../models/User'

const EmployeeRoutes: React.FunctionComponent<AuthContext<User> & RouteComponentProps> = ({
  children,
  history,
  location,
  match,
  staticContext,
  ...props
}) => {
  if (/\/me\/stresschecks\/[0-9]+\/New/.test(location.pathname)) {
    // この画面だけヘッダが違うので、特別対処
    return <Route path={meStresschecksTargetNew} component={EmployeeStressCheckContainer} />
  }
  return (
    <EmployeeFrame {...props}>
      <Switch>
        {/* 健診結果 */}
        <Route path={meCheckups} component={EmployeeCheckupContainer} />
        <Route path={meCheckupsRedirect} component={EmployeeCheckupRedirectContainer} />

        {/* ストレスチェック */}
        <Route path={meStresschecksTarget} component={EmployeeStressCheckResultContainer} />
        <Route path={meStresschecks} component={EmployeeStressCheckListContainer} />

        {/* アンケート */}
        <Route path={meSurveys} component={EmployeeServeysContainer} />

        {/* 面談予約 */}
        <Route path={meReserves} component={EmployeeRservesContainer} />

        {/* 従業員プロフィール */}
        <Route path={meProfile} component={ProfileContainer} />
        {/* 従業員総合Top */}
        <Route path={meTop} component={EmployeeMyPageContainer} />
        {/* 従業員Top */}
        <Route path={me} component={EmployeeMyPageContainer} />
      </Switch>
    </EmployeeFrame>
  )
}

export default compose<AuthContext<User> & RouteComponentProps, {}>(
  Account.withAuthConsumer,
  withAuthenticated(urlsAccount.urlSignIn),
  withRouter
)(EmployeeRoutes)

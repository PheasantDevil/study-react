import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import ContactContainer from '../components/common/ContactContainer'
import FaQContainer from '../components/common/FaQContainer'
import LawContainer from '../components/common/LawContainer'
import PrivacyPolicyContainer from '../components/common/PrivacyPolicyContainer'
import TermsContainer from '../components/common/TermsContainer'
import NotFound from '../components/NotFound'
import { contact, faqs, law, privacyPolicy, terms, topUrl } from '../config/Url'

const Dummy = () => (
  <div>
    <p>Topダミー</p>
    <a href="/account/signin">ログイン</a>
  </div>
)

/**
 * 未認証領域のComponent
 */
const PublicRoutes = () => (
  <Switch>
    <Route path={terms} component={TermsContainer} />
    <Route path={privacyPolicy} component={PrivacyPolicyContainer} />
    <Route path={law} component={LawContainer} />
    <Route path={contact} component={ContactContainer} />
    <Route path={faqs} component={FaQContainer} />
    <Route path={topUrl} component={Dummy} />
    <Route component={NotFound} />
  </Switch>
)

export default PublicRoutes

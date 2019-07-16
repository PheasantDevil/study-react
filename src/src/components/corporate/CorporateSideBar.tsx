import * as React from 'react'
import { Link, Route } from 'react-router-dom'
import {
  corporate,
  corporateCheckups,
  corporateStresschecks,
  corporateConsultations,
  corporateEmployees,
  corporateUnits,
  corporateCheckupsSetting,
  corporateStresschecksSetting,
  corporateMedicalAdvisors
} from '../../config/Url'
import withQueryUpdate, { WithQueryProps } from '../../framework/hocs/withQueryUpdate'
import CorporateCheckupSearchFormContainer from '../../container/corporate/checkups/CorporateCheckupSearchFormContainer'
import CorporateStressCheckSearchFormContainer from '../../container/corporate/stresschecks/CorporateStressCheckSearchFormContainer'
import CorporateEmployeesSearchFormContainer from '../../container/corporate/employees/CorporateEmployeesSearchFormContainer'
import { compose } from 'recompose'

interface State {
  pathName: string
}

class CorporateSideBar extends React.Component<WithQueryProps<{}>, State> {
  constructor(props: WithQueryProps<{}>) {
    super(props)
    this.state = {
      pathName: this.props.location.pathname
    }
  }

  componentDidMount() {
    this.setState({
      pathName: this.props.location.pathname
    })
  }

  async componentDidUpdate(prevProps: WithQueryProps<{}>) {
    if (this.props.location.query !== prevProps.location.query) {
      this.setState({
        pathName: this.props.location.pathname
      })
    }
  }
  render() {
    return (
      <div className="header">
        <h1 className="header__logo">
          <Link className="header__logo_link" to={corporate}>
            <img src="/img/index/logo.svg" alt="willbie" />
          </Link>
        </h1>
        <nav>
          <div className="gnav">
            <div className="gnav__item">
              <Link to={corporate} className="gnav__link">
                ダッシュボード
              </Link>
            </div>
            <div className="gnav__item">
              <div className="gnav__link gnav__link-arrow is-gnav__link">健康診断</div>
            </div>
            {/* <div className="gnav__pulldown"> */}
            <div>
              <div className="gnav__pulldown_item">
                <Link to={corporateCheckups} className="gnav__pulldown_link">
                  結果一覧
                </Link>
              </div>
              <div className="gnav__pulldown_item">
                <Link to={corporateCheckupsSetting} className="gnav__pulldown_link">
                  設定
                </Link>
              </div>
              {this.state.pathName === '/corporate/checkups' ? (
                <Route
                  exact
                  path="/corporate/checkups"
                  component={CorporateCheckupSearchFormContainer}
                />
              ) : null}
            </div>

            <div className="gnav__item">
              <div className="gnav__link gnav__link-arrow is-gnav__link">ストレスチェック</div>
            </div>
            {/* <div className="gnav__pulldown"> */}
            <div>
              <div className="gnav__pulldown_item">
                <Link to={corporateStresschecks} className="gnav__pulldown_link">
                  結果一覧
                </Link>
              </div>
              <div className="gnav__pulldown_item">
                <Link to={corporateStresschecksSetting} className="gnav__pulldown_link">
                  設定
                </Link>
              </div>
              {this.state.pathName === '/corporate/stresschecks' ? (
                <Route
                  exact
                  path="/corporate/stresschecks"
                  component={CorporateStressCheckSearchFormContainer}
                />
              ) : null}
            </div>
            <div className="gnav__item">
              <div className="gnav__link gnav__link-arrow is-gnav__link">面談記録</div>
            </div>
            {/* <div className="gnav__pulldown"> */}
            <div>
              <div className="gnav__pulldown_item">
                <Link to={corporateConsultations} className="gnav__pulldown_link">
                  面談一覧
                </Link>
              </div>
            </div>
            <div className="gnav__item">
              <div className="gnav__link gnav__link-arrow is-gnav__link">従業員情報</div>
            </div>
            {/* <div className="gnav__pulldown"> */}
            <div>
              <div className="gnav__pulldown_item">
                <Link to={corporateEmployees} className="gnav__pulldown_link">
                  従業員一覧
                </Link>
              </div>
              {this.state.pathName === '/corporate/employees' ? (
                <Route
                  exact
                  path="/corporate/employees"
                  component={CorporateEmployeesSearchFormContainer}
                />
              ) : null}
            </div>
            <div className="gnav__item">
              <div className="gnav__link gnav__link-arrow is-gnav__link">産業医情報</div>
            </div>
            <div>
              <div className="gnav__pulldown_item">
                <Link to={corporateMedicalAdvisors} className="gnav__pulldown_link">
                  産業医一覧
                </Link>
              </div>
            </div>
            <div className="gnav__item">
              <div className="gnav__link gnav__link-arrow is-gnav__link">企業情報</div>
            </div>
            <div>
              <div className="gnav__pulldown_item">
                <Link to={corporateUnits} className="gnav__pulldown_link">
                  企業一覧
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default compose<WithQueryProps<{}>, {}>(withQueryUpdate)(CorporateSideBar)

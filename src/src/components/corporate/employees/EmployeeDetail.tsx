import * as React from 'react'
import EmployeeBasicInfo from './EmployeeBasicInfo'
import CheckupResult from './CheckupResult'
import StressCheckResult from './StressCheckResult'
import ConsultationHistory from './ConsultationHistory'
import { Link } from 'react-router-dom'
import Employee from '../../../swagger/model/employee'
import {
  corporateEmployeesEditUrl,
  corporateEmployeesNew,
  corporateEmployees
} from '../../../config/Url'

interface Props {
  selectedTab: string
  employeeBasicInfo: Employee
  checkupResult: string
  stressCheckResult: string
  consultationHistory: string
}

const EmployeeDetail: React.FunctionComponent<Props> = props => {
  return (
    <>
      <div className="head">
        <h1 className="head__title">従業員詳細</h1>
        <div className="head__select">
          <label className="triangles" htmlFor="year">
            <select className="select" id="year" name="">
              <option value="2018">2018</option>
            </select>
          </label>
        </div>
        <div className="operateNav">
          <div className="operateNav__list">
            <div className="operateNav__list_item">
              <Link
                className="operateNav__list_link operateNav__list_icon3"
                to={corporateEmployeesEditUrl(props.employeeBasicInfo.employeeId)}
              />
            </div>
            <div className="operateNav__list_item">
              <a className="operateNav__list_link operateNav__list_icon4" href="" />
            </div>
            <div className="operateNav__list_item">
              <Link
                className="operateNav__list_link operateNav__list_icon1"
                to={corporateEmployeesNew}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="tabNav is-tabNav">
        <div className="tabNav__item">
          <Link
            className={`tabNav__link ${
              props.selectedTab === 'employeeBasicInfo' ? 'tabNav__link-current' : ''
            }`}
            to={`?selected=employeeBasicInfo`}
          >
            基本情報
          </Link>
        </div>
        <div className="tabNav__item">
          <Link
            className={`tabNav__link ${
              props.selectedTab === 'checkupResult' ? 'tabNav__link-current' : ''
            }`}
            to={`?selected=checkupResult`}
          >
            健診結果
          </Link>
        </div>
        <div className="tabNav__item">
          <Link
            className={`tabNav__link ${
              props.selectedTab === 'stressCheckResult' ? 'tabNav__link-current' : ''
            }`}
            to={`?selected=stressCheckResult`}
          >
            ストレスチェック
          </Link>
        </div>
        <div className="tabNav__item">
          <Link
            className={`tabNav__link ${
              props.selectedTab === 'consultationHistory' ? 'tabNav__link-current' : ''
            }`}
            to={`?selected=consultationHistory`}
          >
            面談記録
          </Link>
        </div>
      </div>
      <div className="l_grid l_grid-borders l_grid-spaceL is-tab">
        <div className="tab__block">
          <div className="link">
            <Link className="link__text" to={corporateEmployees}>
              一覧へ戻る
            </Link>
          </div>
          {props.selectedTab === 'employeeBasicInfo' ? (
            <EmployeeBasicInfo values={props.employeeBasicInfo} />
          ) : null}
          {props.selectedTab === 'checkupResult' ? (
            <CheckupResult values={'checkupResult'} />
          ) : null}
          {props.selectedTab === 'stressCheckResult' ? (
            <StressCheckResult values={'stressCheckResult'} />
          ) : null}
          {props.selectedTab === 'consultationHistory' ? (
            <ConsultationHistory values={'consultationHistory'} />
          ) : null}
        </div>
      </div>
    </>
  )
}

export default React.memo(EmployeeDetail)

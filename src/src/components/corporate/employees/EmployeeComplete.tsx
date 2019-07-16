import * as React from 'react'
import { Link } from 'react-router-dom'
import { corporateEmployeeDetailUrl } from '../../../config/Url'

const EmployeeComplete: React.FunctionComponent<{
  isNew: boolean
  employeeId: number | null
  toAddNewEmployee: () => void
}> = ({ isNew, employeeId, toAddNewEmployee }) => (
  <>
    <div className="head">
      <h1 className="head__title">{isNew ? '従業員新規登録' : '従業員編集'}</h1>
    </div>

    <div className="l_grid l_grid-border l_grid-spaceL">
      <div className="complete">
        <div className="complete__text">完了しました。</div>
        <div className="complete__circle" />
      </div>

      <div className="l_switch">
        {isNew ? (
          <div className="l_switch__w2">
            <button className="u_switch u_switch-white" onClick={toAddNewEmployee}>
              続けて登録する
            </button>
          </div>
        ) : (
          ''
        )}
        <div className="l_switch__w2">
          <Link to={corporateEmployeeDetailUrl(employeeId!)} className="u_switch u_switch-blue">
            完了
          </Link>
        </div>
      </div>
    </div>
  </>
)

export default React.memo(EmployeeComplete)

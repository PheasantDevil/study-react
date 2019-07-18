import * as React from 'react'
import Employee from '../../../swagger/model/employee'

interface Props {
  values: Employee
}

const EmployeeBasicInfo: React.FunctionComponent<Props> = ({ values }) => (
  <>
    <div className="employee">
      <div className="headLine">
        <h2 className="headLine__title">基本情報</h2>
      </div>
      <div className="employee__circle">
        <div className="employee__circle_img" />
      </div>
      <div className="employee__main">
        <div className="employee__list">
          <div className="employee__list_item employee__list_item-w100">
            <div className="employee__list_title employee__list_title-w20">従業員コード</div>
            <p className="employee__list_text employee__list_text-w80">{values.employeeCode}</p>
          </div>
          <div className="employee__list_item">
            <div className="employee__list_title employee__list_title-w40">氏名</div>
            <p className="employee__list_text employee__list_text-w60">
              {values.familyName}　{values.givenName}
            </p>
          </div>
          <div className="employee__list_item">
            <div className="employee__list_title employee__list_title-w40">フリガナ</div>
            <p className="employee__list_text employee__list_text-w60">
              {values.familyNameKana} {values.givenNameKana}
            </p>
          </div>
          <div className="employee__list_item">
            <div className="employee__list_title employee__list_title-w40">性別</div>
            <p className="employee__list_text employee__list_text-w60">{values.sex}</p>
          </div>
          <div className="employee__list_item">
            <div className="employee__list_title employee__list_title-w40">生年月日</div>
            <p className="employee__list_text employee__list_text-w60">{values.birthday}</p>
          </div>
        </div>
      </div>
    </div>
  </>
)

export default React.memo(EmployeeBasicInfo)

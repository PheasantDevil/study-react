import React from 'react'
import EmployeePost from '../../../swagger/model/employeePost'
import { CombinedUnitPath } from '../../../util/DepartmentHelper'

const dicSex = { male: '男性', female: '女性' }
interface Props {
  isNew: boolean
  units: CombinedUnitPath[]
  employeePost: EmployeePost
  back: () => void
  submit: (e: React.FormEvent) => void
}

const EmployeeConfirm: React.FunctionComponent<Props> = ({
  isNew,
  employeePost,
  back,
  submit,
  units
}) => (
  <>
    <div className="head">
      <h1 className="head__title">{isNew ? '従業員新規登録' : `従業員編集`}</h1>
    </div>

    <div className="l_grid l_grid-border l_grid-spaceL">
      <form onSubmit={submit}>
        <div className="entry">
          <p className="u_slogan">下記の内容をご確認の上、「登録」ボタンを押して下さい。</p>
          <div className="headLine">
            <h2 className="headLine__title">基本情報</h2>
          </div>
          <div className="confirm__cell">
            <div className="confirm__row">
              <div className="confirm__col">
                <div className="confirm__col_title">社員コード</div>
                <p className="confirm__col_text">{employeePost.employeeCode}</p>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w50p">
                <div className="confirm__col_title">氏名（姓）</div>
                <p className="confirm__col_text">{employeePost.familyName}</p>
              </div>
              <div className="confirm__col confirm__col-w50p">
                <div className="confirm__col_title">氏名（名）</div>
                <p className="confirm__col_text">{employeePost.givenName}</p>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w50p">
                <div className="confirm__col_title">フリガナ（姓）</div>
                <p className="confirm__col_text">{employeePost.familyNameKana}</p>
              </div>
              <div className="confirm__col confirm__col-w50p">
                <div className="confirm__col_title">フリガナ（名）</div>
                <p className="confirm__col_text">{employeePost.givenNameKana}</p>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col">
                <div className="confirm__col_title">性別</div>
                <p className="confirm__col_text">{dicSex[employeePost.sex]}</p>
              </div>
              <div className="confirm__col confirm__col">
                <div className="confirm__col_title">生年月日</div>
                <p className="confirm__col_text">{employeePost.birthday}</p>
              </div>
            </div>
          </div>
          <div className="headLine">
            <h2 className="headLine__title">ログイン権限</h2>
          </div>
          <div className="confirm__cell">
            <div className="confirm__row">
              <div className="confirm__col">
                <p className="confirm__col_text">
                  {employeePost.signinAssignment === true ? '可' : '不可'}
                </p>
              </div>
            </div>
          </div>
          <div className="headLine">
            <h2 className="headLine__title">閲覧権限</h2>
          </div>
          <div className="confirm__cell">
            <div className="confirm__row">
              <div className="confirm__col">
                {employeePost.managerAssignment === true ? (
                  <p className="confirm__col_text">管理者</p>
                ) : (
                  ''
                )}
                {employeePost.stresscheckOperatorAssignment === true ? (
                  <p className="confirm__col_text">実施者</p>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>

          <div className="headLine">
            <h2 className="headLine__title">職場連絡先情報</h2>
          </div>
          <div className="confirm__cell">
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w50p">
                <div className="confirm__col_title">社内E-MAIL</div>
                <p className="confirm__col_text">{employeePost.businessMail}</p>
              </div>
            </div>
          </div>

          <div className="headLine">
            <h2 className="headLine__title">部署</h2>
          </div>
          <div className="confirm__cell">
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w50p">
                <div className="confirm__col_title">部署</div>
                <p className="confirm__col_text">
                  {employeePost.organizationUnitId
                    ? units.find(u => u.id === employeePost.organizationUnitId)!.path
                    : ''}
                </p>
              </div>
            </div>
          </div>

          <div className="l_switch">
            <div className="l_switch__w2">
              <button className="u_switch u_switch-white" onClick={back}>
                戻る
              </button>
            </div>
            <div className="l_switch__w2">
              <button className="u_switch u_switch-blue" type="submit">
                登録
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </>
)

export default React.memo(EmployeeConfirm)

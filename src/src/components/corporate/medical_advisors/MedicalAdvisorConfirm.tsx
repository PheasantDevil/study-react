import { Values } from './MedicalAdvisorEdit'
import React from 'react'

interface Props {
  values: Values
  isNew: boolean
  back: () => void
  submit: (e: React.FormEvent) => void
}

const MedicalAdvisorComfirm: React.FunctionComponent<Props> = ({ values, back, submit, isNew }) => (
  <>
    <div className="head">
      <h1 className="head__title">{isNew ? '産業医新規登録' : `産業医編集`}</h1>
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
              <div className="confirm__col confirm__col-w50p">
                <div className="confirm__col_title">氏名（姓）</div>
                <p className="confirm__col_text">{values.familyName}</p>
              </div>
              <div className="confirm__col confirm__col-w50p">
                <div className="confirm__col_title">氏名（名）</div>
                <p className="confirm__col_text">{values.givenName}</p>
              </div>
            </div>
          </div>
          {values.signin_assignment === '1' ? (
            <div className="confirm__cell">
              <div className="confirm__row">
                <div className="confirm__col confirm__col-w50p">
                  <div className="confirm__col_title">ログインID</div>
                  <p className="confirm__col_text">{values.userName}</p>
                </div>
              </div>
            </div>
          ) : null}
          <div className="headLine">
            <h2 className="headLine__title">ログイン可否</h2>
          </div>
          <div className="confirm__cell">
            <div className="confirm__row">
              <div className="confirm__col">
                <p className="confirm__col_text">
                  {values.signin_assignment === '1' ? '可' : '不可'}
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

export default React.memo(MedicalAdvisorComfirm)

import React from 'react'
import { Values } from './CheckupEdit'
import MedicalCheckupProjectMetadata from '../../../swagger/model/medicalCheckupProjectMetadata'

interface Props {
  values: Values
  isNew: boolean
  project: MedicalCheckupProjectMetadata | null
  back: () => void
  submit: (e: React.FormEvent) => void
}

const CheckupComfirm: React.FunctionComponent<Props> = ({
  values,
  back,
  submit,
  isNew,
  project
}) => (
  <>
    <div className="head">
      <h1 className="head__title">{isNew ? '健康診断新規登録' : `${project!.year}年健康診断`}</h1>
    </div>

    <div className="l_grid l_grid-border l_grid-spaceL">
      <form onSubmit={submit}>
        <div className="confirm">
          <div className="confirm__slogan">
            下記の内容をご確認の上、「登録」ボタンを押して下さい。
          </div>
          <div className="headLine">
            <h2 className="headLine__title">入力情報</h2>
          </div>
          <div className="confirm__cell">
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w200">
                <div className="confirm__col_title">年度</div>
                <p className="confirm__col_text">{values.year}</p>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w200">
                <div className="confirm__col_title">タイトル</div>
                <p className="confirm__col_text">{values.name}</p>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w200">
                <div className="confirm__col_title">実施期間</div>
                <p className="confirm__col_text">
                  {values.start.replace(/-/g, '.')} 〜 {values.end.replace(/-/g, '.')}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="l_switch">
          <div className="l_switch__w2">
            <button className="u_switch u_switch-white" type="button" onClick={back}>
              キャンセル
            </button>
          </div>
          <div className="l_switch__w2">
            <button className="u_switch u_switch-blue" type="submit">
              登録
            </button>
          </div>
        </div>
      </form>
    </div>
  </>
)

export default React.memo(CheckupComfirm)

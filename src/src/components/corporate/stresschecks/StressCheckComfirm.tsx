import React from 'react'
import { Values } from './StressCheckEdit'
import StressCheckProject from '../../../swagger/model/stressCheckProject'

interface Props {
  values: Values
  isNew: boolean
  project: StressCheckProject | null
  back: () => void
  submit: (e: React.FormEvent) => void
}

const StressCheckComfirm: React.FunctionComponent<Props> = ({
  values,
  back,
  submit,
  isNew,
  project
}) => (
  <>
    <div className="head">
      <h1 className="head__title">
        {isNew ? 'ストレスチェックの新規登録' : `${values.year}年ストレスチェック`}
      </h1>
    </div>

    <div className="l_grid l_grid-border l_grid-spaceL">
      <form onSubmit={submit}>
        <div className="confirm">
          <div className="confirm__slogan">
            下記の内容をご確認の上、「登録」ボタンを押して下さい。
          </div>
          <div className="headLine">
            <h2 className="headLine__title">基本情報</h2>
          </div>
          <div className="confirm__cell">
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">年度</div>
                <p className="confirm__col_text">{values.year}</p>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">タイトル</div>
                <p className="confirm__col_text">{values.name}</p>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">実施期間</div>
                <p className="confirm__col_text">
                  {values.start} 〜 {values.end}
                </p>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">高ストレス者設定</div>
                <div className="confirm__col_text">
                  ○素点換算を用いた評価点方式
                  <ul className="confirm__list confirm__list-pb20">
                    <li className="confirm__list_item">
                      ①心身のストレス反応 {values.pointOfConversionMethodB1}点 以上
                    </li>
                    <li className="confirm__list_item">
                      ②仕事のストレス要因＋周囲のサポート {values.pointOfConversionMethodB2}点 以上/
                      <br />
                      かつ 心身のストレス反応 {values.pointOfConversionMethodC2}点 以上
                    </li>
                  </ul>
                </div>
                <div className="confirm__row">
                  <div className="confirm__col confirm__col-w100">
                    <div className="confirm__col_title">面談希望フォーム設定</div>
                    <p className="confirm__col_text">
                      {/* {values.hope === '1' ? '全受検者に表示' : (values.hope === '2' ? '高ストレス者と面談対象者に表示' : (values.hope === '3' ? '面談対象者のみに表示' : (values.hope === '0' ? '表示しない' : 'ERROR')))} */}
                      ※サーバーサイド実装待ち※
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="confirm">
          <div className="headLine">
            <h2 className="headLine__title">従業員へのメッセージ</h2>
          </div>
          <div className="confirm__cell">
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">
                  ストレスチェック
                  <br />
                  の目的
                </div>
                <div className="confirm__col_text">
                  <pre className="confirm__pre">{values.purpose}</pre>
                </div>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">受診対象者</div>
                <div className="confirm__col_text">
                  <pre className="confirm__pre">{values.examinee}</pre>
                </div>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">
                  ご回答いただいた
                  <br />
                  データの取り扱い
                </div>
                <div className="confirm__col_text">
                  <pre className="confirm__pre">{values.regulations}</pre>
                </div>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">開示について</div>
                <div className="confirm__col_text">
                  <pre className="confirm__pre">{values.aboutDisclosure}</pre>
                </div>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">
                  高ストレス者に
                  <br />
                  対する面談勧奨
                </div>
                <div className="confirm__col_text">
                  <pre className="confirm__pre">{values.encouragement}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="confirm">
          <div className="headLine">
            <h2 className="headLine__title">実施体制</h2>
          </div>
          <div className="confirm__cell">
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">実施者・共同実施者</div>
                <p className="confirm__col_text">{values.operator}</p>
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

export default React.memo(StressCheckComfirm)

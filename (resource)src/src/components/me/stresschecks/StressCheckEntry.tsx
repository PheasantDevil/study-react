import * as React from 'react'
import StressCheckGuide from '../../../swagger/model/stressCheckGuide'

interface Props {
  start(): void
  stressCheckGuide: StressCheckGuide
}

const StressCheckEntry: React.FunctionComponent<Props> = ({ start, stressCheckGuide }) => (
  <div>
    <div className="head">
      <h1 className="head__title">ストレスチェック</h1>
    </div>

    <div className="l_grid l_grid-border">
      <div className="headLine">
        <h2 className="headLine__title">ストレスチェックの目的</h2>
      </div>

      <div className="stresschecks">
        <p className="stresschecks__text">{stressCheckGuide.purpose}</p>
      </div>

      <div className="headLine">
        <h2 className="headLine__title">受診対象者</h2>
      </div>

      <div className="stresschecks">
        <h3 className="stresschecks__title">{stressCheckGuide.examinee}</h3>
        <p className="stresschecks__text stresschecks__text-mb20">
          上記の目的から、できるだけ多くの社員(できれば対象者全員)に実施していただきますよう、お願い申し上げます。ただし、今回のストレスチェックを受けない場合でも、会社側からの不利益な取扱い等は一切ございません。
        </p>
        <div className="stresschecks__rectanglRed">
          開示された結果は、産業医・保健師のみが確認し、必要に応じて面接指導のご連絡を個別に差し上げます。結果が上司・人事部門に見られることは一切ありません。
        </div>
      </div>

      <div className="headLine">
        <h2 className="headLine__title">実施体制</h2>
      </div>

      <div className="stresschecks">
        <div className="stresschecks__system">
          <div className="stresschecks__system_item">
            <div className="stresschecks__system_job">実施期間</div>
            <div className="stresschecks__system_name">
              {stressCheckGuide.start} ～ {stressCheckGuide.end}
            </div>
          </div>
          <div className="stresschecks__system_item">
            <div className="stresschecks__system_job">実施者</div>
            <div className="stresschecks__system_name">{stressCheckGuide.operator}</div>
          </div>
        </div>
        <div className="stresschecks__slogan">
          <span className="stresschecks__slogan_line">
            <span className="u_red">全57項目</span>で所要時間は<span className="u_red">約5分</span>
            です。
            <br className="u_pcNone" />
            ストレスチェックを実施してあなたの
            <br />
            精神状態をチェックしましょう。
          </span>
        </div>
        <form>
          <div className="l_switch">
            <button className="u_switch u_w260 u_switch-blue" onClick={start}>
              ストレスチェックを開始する
            </button>
          </div>
        </form>
      </div>
      <div className="stresschecks">
        <div className="stresschecks__rectangle">
          <h3 className="stresschecks__rectangle_title">※ご回答いただいたデータの取扱い</h3>
          <p className="stresschecks__rectangle_text">
            ご回答いただいた個人のストレスチェック結果については、ご回答直後からご自身で確認・閲覧・印刷できますので、自己管理にお役立て下さい。ご回答いただいた個人のストレスチェック結果に基づき、個人の健康管理を目的として産業医・保健師のみが確認し、必要に応じて面接推奨のご連絡を個別に差し上げます。個人の結果が外部(上司・人事部門等)に漏れることは、一切ありません。また、職場全体のストレス傾向の把握を目的に、個人が特定できないようストレスチェック結果を加工し、分析および報告書作成に使用します。
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default StressCheckEntry

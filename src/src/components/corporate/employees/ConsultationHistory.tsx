import * as React from 'react'

interface Props {
  values: string
}

const ConsultationHistory: React.FunctionComponent<Props> = ({ values }) => (
  <>
    <div className="lnav">
      <div className="lnav__item">
        <a className="lnav__link lnav__link-current" href="">
          2018.7.14 面談記録
        </a>
      </div>
      <div className="lnav__item">
        <a className="lnav__link" href="">
          2018.6.25 面談記録
        </a>
      </div>
      <div className="lnav__item">
        <a className="lnav__link" href="">
          2018.6.17 面談記録
        </a>
      </div>
    </div>

    <div className="interview">
      <h2 className="interview__title">品川裕香 健診事後面談記録</h2>
      <div className="interview__list">
        <div className="interview__list_item">
          <span className="interview__list_name">[氏名]</span>小山 祐樹
        </div>
        <div className="interview__list_item">
          <span className="interview__list_name">[疲労蓄積の状況]</span>軽
        </div>
        <div className="interview__list_item">
          <span className="interview__list_name">[配慮すべき心身の状況]</span>有
        </div>
      </div>
      <div className="interview__body">
        <div className="interview__body_title">[特記事項]</div>
        <p className="interview__body_text">
          2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。
        </p>
      </div>
      <div className="interview__list">
        <div className="interview__list_item">
          <span className="interview__list_name">[判定区分]</span>異常なし
        </div>
        <div className="interview__list_item">
          <span className="interview__list_name">[就業区分]</span>通常勤務
        </div>
        <div className="interview__list_item">
          <span className="interview__list_name">[指導区分]</span>要保険指導
        </div>
      </div>
      <div className="interview__list">
        <div className="interview__list_item">
          <span className="interview__list_name">[事後措置としての指導・勧告の必要性]</span>不要
        </div>
      </div>
      <div className="interview__list interview__list-bbn">
        <div className="interview__list_item">
          <span className="interview__list_name">[医師の所属先]</span>大日本医師会
        </div>
        <div className="interview__list_item">
          <span className="interview__list_name">[実施日時]</span>2018年7月19日 10:00〜12:00
        </div>
        <br />
        <div className="interview__list_item">
          <span className="interview__list_name">[医師の氏名]</span>鬼頭 修
        </div>
      </div>
    </div>

    <div className="interview">
      <h2 className="interview__title">事後措置に係る意見書</h2>
      <div className="interview__list">
        <div className="interview__list_item">
          <span className="interview__list_name">[労働時間の短縮]</span>
          就業時間を制限　10:00〜17:00まで
        </div>
        <br />
        <div className="interview__list_item">
          <span className="interview__list_name">[労働時間の以外の項目]</span>就業場所の変更
        </div>
      </div>
      <div className="interview__body">
        <div className="interview__body_title">[記入事項1]</div>
        <p className="interview__body_text">
          2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。
        </p>
      </div>
      <div className="interview__list">
        <div className="interview__list_item">
          <span className="interview__list_name">[措置期間]</span>15日
        </div>
        <div className="interview__list_item">
          <span className="interview__list_name">[次回面接予定日]</span>2018年7月19日 10:00〜12:00
        </div>
      </div>
      <div className="interview__body">
        <div className="interview__body_title">[医療機関への受診配慮等]</div>
        <p className="interview__body_text">
          2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。
        </p>
        <div className="interview__body_title">[連絡事項等]</div>
        <p className="interview__body_text">
          心疾患や脳血管疾患などを予防するためにも、病院を受診させ、治療を行うことが必要。また、日中に血圧が急に高くなり、めまい、頭痛、意識喪失などの症状が起こる可能性もあるため、治療により血圧が安定するまで、高所作業や営業車両の運転業務などは控えることが望ましい。
        </p>
      </div>
      <div className="interview__list interview__list-bbn">
        <div className="interview__list_item">
          <span className="interview__list_name">[医師の所属先]</span>大日本医師会
        </div>
        <div className="interview__list_item">
          <span className="interview__list_name">[実施日時]</span>2018年7月19日 10:00〜12:00
        </div>
        <br />
        <div className="interview__list_item">
          <span className="interview__list_name">[医師の氏名]</span>鬼頭 修
        </div>
      </div>

      <div className="rectangle">
        <div className="rectangle__block">
          <div className="rectangle__col rectangle__col-w50">
            <div className="rectangle__list">
              <div className="rectangle__list_item">
                <span className="rectangle__list_title">面談：</span>不要
              </div>
              <div className="rectangle__list_item">
                <span className="rectangle__list_title">医師の意見：</span>就業制限
              </div>
            </div>
          </div>
          <div className="rectangle__col rectangle__col-w50">
            <div className="rectangle__list">
              <div className="rectangle__list_item">
                <span className="rectangle__list_title">備考：</span>作業時間の変更
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)

export default React.memo(ConsultationHistory)

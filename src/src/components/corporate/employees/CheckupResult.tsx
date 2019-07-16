import * as React from 'react'

interface Props {
  values: string
}

const CheckupResult: React.FunctionComponent<Props> = ({ values }) => (
  <>
    <div className="headLine headLine-borderNone">
      <h2 className="headLine__title">健診結果</h2>
    </div>
    <div className="result">
      <div className="result__row">
        <div className="result__col result__col-name">TEST01　品川 知花</div>
      </div>
      <div className="result__row">
        <div className="result__col result__col-blue result__col-w210">検査項目</div>
        <div className="result__col result__col-blue result__col-w125">基準値</div>
        <div className="result__col result__col-blue result__col-w155 result__col-activeTop">
          2018.07.01
          <br />
          32歳
        </div>
        <div className="result__col result__col-blue result__col-w155 result__col-arrow is-result__pulldown">
          2018.07.01
          <br />
          32歳
          <div className="pulldown">
            <a className="pulldown__link" href="">
              2018.07.01 32歳
            </a>
            <a className="pulldown__link" href="">
              2018.07.01 32歳
            </a>
          </div>
        </div>
        <div className="result__col result__col-blue result__col-w155 result__col-arrow is-result__pulldown">
          2018.07.01
          <br />
          32歳
          <div className="pulldown">
            <a className="pulldown__link" href="">
              2018.07.01 32歳
            </a>
            <a className="pulldown__link" href="">
              2018.07.01 32歳
            </a>
          </div>
        </div>
      </div>
      <div className="result__row">
        <div className="result__col result__col-blue result__col-w210">部署</div>
        <div className="result__col result__col-w125">ー</div>
        <div className="result__col result__col-w155 result__col-active">東日本営業所</div>
        <div className="result__col result__col-w155">情報システム部</div>
        <div className="result__col result__col-w155">
          営業推進部
          <br />
          西日本営業部
        </div>
      </div>
      <div className="result__row">
        <div className="result__col result__col-blue result__col-w210">受診機関</div>
        <div className="result__col result__col-w125">ー</div>
        <div className="result__col result__col-w155 result__col-active">渋谷クリニック</div>
        <div className="result__col result__col-w155">道玄坂病院</div>
        <div className="result__col result__col-w155">ヘルスクリニック</div>
      </div>
      <div className="result__row">
        <div className="result__col result__col-blue result__col-w210">総合判定</div>
        <div className="result__col result__col-w125">ー</div>
        <div className="result__col result__col-red result__col-w155 result__col-active">C</div>
        <div className="result__col result__col-green result__col-w155">A</div>
        <div className="result__col result__col-orange result__col-w155">B</div>
      </div>

      <div className="result__body">
        <div className="result__vertical">
          <div className="result__vertical_text">
            身<br />体<br />計<br />測
          </div>
        </div>
        <div className="result__main">
          <div className="result__row result__row-lightBlue">
            <div className="result__col result__col-between result__col-w180v">
              <div className="result__col_unitName">身長</div>
              <div className="result__col_unit">[cm]</div>
            </div>
            <div className="result__col result__col-w125">ー</div>
            <div className="result__col result__col-w155 result__col-active">170.0</div>
            <div className="result__col result__col-w155">169.8</div>
            <div className="result__col result__col-w155">170.1</div>
          </div>
          <div className="result__row">
            <div className="result__col result__col-between result__col-w180v">
              <div className="result__col_unitName">体重</div>
              <div className="result__col_unit">[kg]</div>
            </div>
            <div className="result__col result__col-w125">ー</div>
            <div className="result__col result__col-w155 result__col-active">65.0</div>
            <div className="result__col result__col-w155">60.0</div>
            <div className="result__col result__col-w155">55.0</div>
          </div>
          <div className="result__row result__row-lightBlue">
            <div className="result__col result__col-between result__col-w180v">
              <div className="result__col_unitName">BMI</div>
            </div>
            <div className="result__col result__col-w125">18.5〜24.9</div>
            <div className="result__col result__col-w155 result__col-active">25.5</div>
            <div className="result__col result__col-w155">23.2</div>
            <div className="result__col result__col-w155">25.2</div>
          </div>
          <div className="result__row">
            <div className="result__col result__col-between result__col-w180v">
              <div className="result__col_unitName">胸囲</div>
              <div className="result__col_unit">[cm]</div>
            </div>
            <div className="result__col result__col-w125">ー</div>
            <div className="result__col result__col-w155 result__col-active">ー</div>
            <div className="result__col result__col-w155">ー</div>
            <div className="result__col result__col-w155">ー</div>
          </div>
        </div>
      </div>

      <div className="result__body">
        <div className="result__vertical">
          <div className="result__vertical_text">
            眼<br />科
          </div>
        </div>
        <div className="result__main">
          <div className="result__row result__row-lightBlue">
            <div className="result__col result__col-between result__col-w180v">
              <div className="result__col_unitName">色覚検査</div>
            </div>
            <div className="result__col result__col-w125">異常なし</div>
            <div className="result__col result__col-w155 result__col-active">異常なし</div>
            <div className="result__col result__col-w155">異常なし</div>
            <div className="result__col result__col-w155">異常なし</div>
          </div>
          <div className="result__row">
            <div className="result__col result__col-between result__col-w180v">
              <div className="result__col_unitName">右視力</div>
            </div>
            <div className="result__col result__col-w125">0.1~</div>
            <div className="result__col result__col-w155 result__col-active">1.0</div>
            <div className="result__col result__col-w155">1.0</div>
            <div className="result__col result__col-w155">1.0</div>
          </div>
          <div className="result__row result__row-lightBlue">
            <div className="result__col result__col-between result__col-w180v">
              <div className="result__col_unitName">左視力</div>
            </div>
            <div className="result__col result__col-w125">0.1~</div>
            <div className="result__col result__col-w155 result__col-active">1.0</div>
            <div className="result__col result__col-w155">1.0</div>
            <div className="result__col result__col-w155">1.0</div>
          </div>
          <div className="result__row">
            <div className="result__col result__col-between result__col-w180v">
              <div className="result__col_unitName">矯正右視力</div>
            </div>
            <div className="result__col result__col-w125">0.1~</div>
            <div className="result__col result__col-w155 result__col-active">ー</div>
            <div className="result__col result__col-w155">ー</div>
            <div className="result__col result__col-w155">ー</div>
          </div>
          <div className="result__row result__row-lightBlue">
            <div className="result__col result__col-between result__col-w180v">
              <div className="result__col_unitName">矯正左視力</div>
            </div>
            <div className="result__col result__col-w125">0.1~</div>
            <div className="result__col result__col-w155 result__col-active">ー</div>
            <div className="result__col result__col-w155">ー</div>
            <div className="result__col result__col-w155">ー</div>
          </div>
        </div>
      </div>

      <div className="result__body">
        <div className="result__vertical">
          <div className="result__vertical_text">
            循<br />環<br />器
          </div>
        </div>
        <div className="result__main">
          <div className="result__row">
            <div className="result__col result__col-between result__col-w180v">
              <div className="result__col_unitName">血圧（最高）</div>
            </div>
            <div className="result__col result__col-w125">〜 129</div>
            <div className="result__col result__col-w155 result__col-active">105</div>
            <div className="result__col result__col-w155">104</div>
            <div className="result__col result__col-w155">105</div>
          </div>
          <div className="result__row result__row-lightBlue">
            <div className="result__col result__col-between result__col-w180v">
              <div className="result__col_unitName">血圧（最低）</div>
            </div>
            <div className="result__col result__col-w125">〜 84</div>
            <div className="result__col result__col-w155 result__col-active">87</div>
            <div className="result__col result__col-w155">50</div>
            <div className="result__col result__col-w155">50</div>
          </div>
          <div className="result__row">
            <div className="result__col result__col-between result__col-w180v">
              <div className="result__col_unitName">脈拍数</div>
            </div>
            <div className="result__col result__col-w125">45 ～ 85</div>
            <div className="result__col result__col-w155 result__col-active">60</div>
            <div className="result__col result__col-w155">50</div>
            <div className="result__col result__col-w155">63</div>
          </div>
          <div className="result__row result__row-lightBlue">
            <div className="result__col result__col-between result__col-w180v">
              <div className="result__col_unitName">心電図</div>
            </div>
            <div className="result__col result__col-w125">異常なし</div>
            <div className="result__col result__col-w155 result__col-active">異常なし</div>
            <div className="result__col result__col-w155">異常なし</div>
            <div className="result__col result__col-w155">異常なし</div>
          </div>
        </div>
      </div>

      <div className="result__body">
        <div className="result__vertical">
          <div className="result__vertical_text">
            血<br />液<br />型<br />検<br />査
          </div>
        </div>
        <div className="result__main">
          <div className="result__row">
            <div className="result__col result__col-between result__col-w180v">
              <div className="result__col_unitName">白血球数</div>
              <div className="result__col_unit">[/mm3]</div>
            </div>
            <div className="result__col result__col-w125">3200 〜 8500</div>
            <div className="result__col result__col-w155 result__col-active">3200</div>
            <div className="result__col result__col-w155">2000</div>
            <div className="result__col result__col-w155">9000</div>
          </div>

          <div className="result__body result__body-row">
            <div className="result__vertical result__vertical-row">
              <div className="result__vertical_text result__vertical_text-row">
                貧<br />血
              </div>
            </div>
            <div className="result__main result__main-row">
              <div className="result__row result__row-lightBlue">
                <div className="result__col result__col-between result__col-w150v">
                  <div className="result__col_unitName">赤血球</div>
                  <div className="result__col_unit">[104/mm3]</div>
                </div>
                <div className="result__col result__col-w125">400 〜 539</div>
                <div className="result__col result__col-w155 result__col-active">520</div>
                <div className="result__col result__col-w155">50</div>
                <div className="result__col result__col-w155">63</div>
              </div>
              <div className="result__row">
                <div className="result__col result__col-between result__col-w150v">
                  <div className="result__col_unitName">ヘモグロビン</div>
                  <div className="result__col_unit">[g/dl]</div>
                </div>
                <div className="result__col result__col-w125">13.1 〜 16.6</div>
                <div className="result__col result__col-w155 result__col-active">15.0</div>
                <div className="result__col result__col-w155">14.0</div>
                <div className="result__col result__col-w155">15.0</div>
              </div>
              <div className="result__row result__row-lightBlue">
                <div className="result__col result__col-between result__col-w150v">
                  <div className="result__col_unitName">ヘマトクリット</div>
                  <div className="result__col_unit">[%]</div>
                </div>
                <div className="result__col result__col-w125">38.5 ～ 48.9</div>
                <div className="result__col result__col-w155 result__col-active">44.0</div>
                <div className="result__col result__col-w155">45.0</div>
                <div className="result__col result__col-w155">46.0</div>
              </div>

              <div className="result__row">
                <div className="result__col result__col-between result__col-w150v">
                  <div className="result__col_unitName">MCV</div>
                  <div className="result__col_unit">[fℓ]</div>
                </div>
                <div className="result__col result__col-w125">83 〜 102.9</div>
                <div className="result__col result__col-w155 result__col-active">83.0</div>
                <div className="result__col result__col-w155">100.0</div>
                <div className="result__col result__col-w155">88.0</div>
              </div>
              <div className="result__row result__row-lightBlue">
                <div className="result__col result__col-between result__col-w150v">
                  <div className="result__col_unitName">MCH</div>
                  <div className="result__col_unit">[pg]</div>
                </div>
                <div className="result__col result__col-w125">27.9 ～ 34.5</div>
                <div className="result__col result__col-w155 result__col-active">33.0</div>
                <div className="result__col result__col-w155">32.0</div>
                <div className="result__col result__col-w155">31.0</div>
              </div>
              <div className="result__row">
                <div className="result__col result__col-between result__col-w150v">
                  <div className="result__col_unitName">MCHC</div>
                  <div className="result__col_unit">[%]</div>
                </div>
                <div className="result__col result__col-w125">31.4 〜 35.5</div>
                <div className="result__col result__col-w155 result__col-active">33.0</div>
                <div className="result__col result__col-w155">32.0</div>
                <div className="result__col result__col-w155">31.0</div>
              </div>
            </div>
          </div>

          <div className="result__row result__row-lightBlue">
            <div className="result__col result__col-between result__col-w180v">
              <div className="result__col_unitName">白血球数</div>
              <div className="result__col_unit">[/mm3]</div>
            </div>
            <div className="result__col result__col-w125">3200 〜 8500</div>
            <div className="result__col result__col-w155 result__col-active">3200</div>
            <div className="result__col result__col-w155">2000</div>
            <div className="result__col result__col-w155">9000</div>
          </div>
        </div>
      </div>

      <div className="result__body">
        <div className="result__vertical">
          <div className="result__vertical_text">
            脂<br />質
          </div>
        </div>
        <div className="result__main">
          <div className="result__row">
            <div className="result__col result__col-between result__col-w180v">
              <div className="result__col_unitName">総コレステロール</div>
              <div className="result__col_unit">[mg/dl]</div>
            </div>
            <div className="result__col result__col-w125">140 〜 199</div>
            <div className="result__col result__col-w155 result__col-active">140</div>
            <div className="result__col result__col-w155">150</div>
            <div className="result__col result__col-w155">160</div>
          </div>
          <div className="result__row result__row-lightBlue">
            <div className="result__col result__col-between result__col-w180v">
              <div className="result__col_unitName">LDLコレステロール</div>
              <div className="result__col_unit">[mg/dl]</div>
            </div>
            <div className="result__col result__col-w125">60 〜 119</div>
            <div className="result__col result__col-w155 result__col-active">60</div>
            <div className="result__col result__col-w155">70</div>
            <div className="result__col result__col-w155">80</div>
          </div>
          <div className="result__row">
            <div className="result__col result__col-between result__col-w180v">
              <div className="result__col_unitName">HDLコレステロール</div>
              <div className="result__col_unit">[mg/dl]</div>
            </div>
            <div className="result__col result__col-w125">40 ～ 119</div>
            <div className="result__col result__col-w155 result__col-active">40</div>
            <div className="result__col result__col-w155">50</div>
            <div className="result__col result__col-w155">60</div>
          </div>
          <div className="result__row result__row-lightBlue">
            <div className="result__col result__col-between result__col-w180v">
              <div className="result__col_unitName">中性脂肪</div>
              <div className="result__col_unit">[mg/dl]</div>
            </div>
            <div className="result__col result__col-w125">30 〜 149</div>
            <div className="result__col result__col-w155 result__col-active">30</div>
            <div className="result__col result__col-w155">40</div>
            <div className="result__col result__col-w155">50</div>
          </div>
        </div>
      </div>

      <div className="result__body">
        <div className="result__vertical">
          <div className="result__vertical_text">
            診<br />察
          </div>
        </div>
        <div className="result__main">
          <div className="result__row">
            <div className="result__col result__col-between result__col-w180v result__col-h50">
              <div className="result__col_unitName">医師診察</div>
            </div>
            <div className="result__col result__col-w125 result__col-h50">ー</div>
            <div className="result__col result__col-w155 result__col-h50 result__col-active">
              異常なし
            </div>
            <div className="result__col result__col-w155 result__col-h50">異常なし</div>
            <div className="result__col result__col-w155 result__col-h50">異常なし</div>
          </div>
        </div>
      </div>

      <div className="result__body">
        <div className="result__vertical result__vertical-2em">
          <div className="result__vertical_text">
            超<br />音<br />波
          </div>
        </div>
        <div className="result__main">
          <div className="result__row">
            <div className="result__col result__col-between result__col-w180v result__col-h60">
              <div className="result__col_unitName">腹部超音波</div>
            </div>
            <div className="result__col result__col-w125 result__col-h60">ー</div>
            <div className="result__col result__col-w155 result__col-h60 result__col-active result__col-activeBottom">
              異常なし
            </div>
            <div className="result__col result__col-w155 result__col-h60">異常なし</div>
            <div className="result__col result__col-w155 result__col-h60">異常なし</div>
          </div>
        </div>
      </div>
    </div>

    <div className="headLine headLine-borderNone">
      <h2 className="headLine__title">二次健診</h2>
    </div>
    <div className="rectangle rectangle-mb45">
      <div className="rectangle__block">
        <div className="rectangle__col rectangle__col-w50">
          <div className="rectangle__list">
            <div className="rectangle__list_item">
              <span className="rectangle__list_title">二次健診：</span>該当
            </div>
          </div>
        </div>
        <div className="rectangle__col rectangle__col-w50">
          <div className="rectangle__list">
            <div className="rectangle__list_item">
              <span className="rectangle__list_title">二次健診進捗：</span>受診済み
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="headLine headLine-borderNone">
      <h2 className="headLine__title">就業上の意見</h2>
    </div>
    <div className="rectangle rectangle-mb45">
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
      <div className="rectangle__listInline">
        <a className="rectangle__listInline_link" href="">
          2018.0801.面談記録
        </a>
        <a className="rectangle__listInline_link" href="">
          2018.0901.面談記録
        </a>
      </div>
    </div>

    <div className="headLine headLine-borderNone">
      <h2 className="headLine__title">事後措置</h2>
    </div>
    <div className="rectangle">
      <ul className="rectangle__history">
        <li className="rectangle__history_item">
          <div className="rectangle__history_day">[2018.0802]</div>
          <div className="rectangle__history_text">営業推進部、西山千佳にメール送信</div>
        </li>
        <li className="rectangle__history_item">
          <div className="rectangle__history_day">[2018.0727]</div>
          <div className="rectangle__history_text">
            加藤産業医より大山信雄の再検査予定と連絡あり
          </div>
        </li>
        <li className="rectangle__history_item">
          <div className="rectangle__history_day">[2018.0627]</div>
          <div className="rectangle__history_text">
            小山産業医より面談にて就業制限が必要と連絡あり。要確認。
          </div>
        </li>
      </ul>
    </div>
  </>
)

export default React.memo(CheckupResult)

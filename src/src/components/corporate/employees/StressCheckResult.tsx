import * as React from 'react'

interface Props {
  values: string
}

const StressCheckResult: React.FunctionComponent<Props> = ({ values }) => (
  <>
    <div className="headLine headLine-borderNone">
      <h2 className="headLine__title">ストレスチェックの結果</h2>
    </div>
    <div className="rectangle rectangle-mb45">
      <div className="rectangle__body rectangle__body-center">
        <div className="rectangle__body_title rectangle__body_title-red">
          あなたのストレス度はかなり高いです。
        </div>
        <p className="rectangle__body_text">
          あなたのストレスバランスが崩れている可能性があります。現在の心身の状態はいかがでしょうか。もし何らかの不調やストレスの存在を自覚されるようでしたら、ストレスチェックに基づく産業医面接を強くお勧めします。
        </p>
      </div>
    </div>

    <div className="stress">
      <div className="stress__head">
        <h3 className="stress__head_title">■ストレスの原因と考えられる因子</h3>
        <p className="stress__head_text">
          点数が高いほど、ストレスの原因となっていると考えられます。
        </p>
      </div>
      <div className="stress__sub">
        <div className="stress__img" />
        <div className="stress__point">
          <div className="stress__point_item stress__point_item-blue">今回</div>
          <div className="stress__point_item stress__point_item-green">前回</div>
          <div className="stress__point_item stress__point_item-yellow">前々回</div>
          <div className="stress__point_item stress__point_item-red">高ストレス範囲</div>
        </div>
      </div>
      <div className="stress__main">
        <table className="stress__cell">
          <tr>
            <th className="stress__th" />
            <th className="stress__th stress__th-blue">今回</th>
            <th className="stress__th stress__th-green">前回</th>
            <th className="stress__th stress__th-yellow">前々回</th>
          </tr>
          <tr>
            <td className="stress__td stress__td-gray stress__td-bdt">心理的な仕事の負担（量）</td>
            <td className="stress__td stress__td-blue">3</td>
            <td className="stress__td stress__td-green">3</td>
            <td className="stress__td stress__td-yellow">3</td>
          </tr>
          <tr>
            <td className="stress__td">心理的な仕事の負担（質）</td>
            <td className="stress__td stress__td-lightBule">3</td>
            <td className="stress__td stress__td-lightGreen">3</td>
            <td className="stress__td stress__td-lightYellow">3</td>
          </tr>
          <tr>
            <td className="stress__td stress__td-gray">自覚的な身体的負担度</td>
            <td className="stress__td stress__td-blue">2</td>
            <td className="stress__td stress__td-green">2</td>
            <td className="stress__td stress__td-yellow">2</td>
          </tr>
          <tr>
            <td className="stress__td">職場の対人関係でのストレス</td>
            <td className="stress__td stress__td-lightBule">5</td>
            <td className="stress__td stress__td-lightGreen">5</td>
            <td className="stress__td stress__td-lightYellow">5</td>
          </tr>
          <tr>
            <td className="stress__td stress__td-gray">職場環境によるストレス</td>
            <td className="stress__td stress__td-blue">2</td>
            <td className="stress__td stress__td-green">2</td>
            <td className="stress__td stress__td-yellow">2</td>
          </tr>
          <tr>
            <td className="stress__td">仕事のコントロール度</td>
            <td className="stress__td stress__td-lightBule">5</td>
            <td className="stress__td stress__td-lightGreen">5</td>
            <td className="stress__td stress__td-lightYellow">5</td>
          </tr>
          <tr>
            <td className="stress__td stress__td-gray">技術の活用度</td>
            <td className="stress__td stress__td-blue">2</td>
            <td className="stress__td stress__td-green">2</td>
            <td className="stress__td stress__td-yellow">2</td>
          </tr>
          <tr>
            <td className="stress__td">仕事の適性度</td>
            <td className="stress__td stress__td-lightBule">2</td>
            <td className="stress__td stress__td-lightGreen">2</td>
            <td className="stress__td stress__td-lightYellow">2</td>
          </tr>
          <tr>
            <td className="stress__td stress__td-gray stress__td-bdb">働きがい</td>
            <td className="stress__td stress__td-blue stress__td-bdb">2</td>
            <td className="stress__td stress__td-green stress__td-bdb">2</td>
            <td className="stress__td stress__td-yellow stress__td-bdb">2</td>
          </tr>
          <tr>
            <td className="stress__td stress__td-right">合計点</td>
            <td className="stress__td stress__td-lightBule stress__td-bdbBlue">22</td>
            <td className="stress__td stress__td-lightGreen">18</td>
            <td className="stress__td stress__td-lightYellow">20</td>
          </tr>
        </table>
      </div>
    </div>

    <div className="rectangle rectangle-mb45">
      <div className="rectangle__body">
        <div className="rectangle__body_title">[コメント]</div>
        <p className="rectangle__body_text">
          仕事の量的負担、質的負担、身体的負担度、対人関係でのストレスが高く、仕事のコントロール度が低いようでした。
        </p>
      </div>
    </div>

    <div className="stress">
      <div className="stress__head">
        <h3 className="stress__head_title">■ストレスによって起こる心身の反応</h3>
        <p className="stress__head_text">
          点数が高いほど、ストレスによる反応が強く出ていると考えられます。
        </p>
      </div>
      <div className="stress__sub">
        <div className="stress__img" />
        <div className="stress__point">
          <div className="stress__point_item stress__point_item-blue">今回</div>
          <div className="stress__point_item stress__point_item-green">前回</div>
          <div className="stress__point_item stress__point_item-yellow">前々回</div>
          <div className="stress__point_item stress__point_item-red">高ストレス範囲</div>
        </div>
      </div>
      <div className="stress__main">
        <table className="stress__cell">
          <tr>
            <th className="stress__th" />
            <th className="stress__th stress__th-blue">今回</th>
            <th className="stress__th stress__th-green">前回</th>
            <th className="stress__th stress__th-yellow">前々回</th>
          </tr>
          <tr>
            <td className="stress__td stress__td-gray stress__td-bdt">活気</td>
            <td className="stress__td stress__td-blue">3</td>
            <td className="stress__td stress__td-green">3</td>
            <td className="stress__td stress__td-yellow">3</td>
          </tr>
          <tr>
            <td className="stress__td">イライラ感</td>
            <td className="stress__td stress__td-lightBule">3</td>
            <td className="stress__td stress__td-lightGreen">3</td>
            <td className="stress__td stress__td-lightYellow">3</td>
          </tr>
          <tr>
            <td className="stress__td stress__td-gray">疲労感</td>
            <td className="stress__td stress__td-blue">2</td>
            <td className="stress__td stress__td-green">2</td>
            <td className="stress__td stress__td-yellow">2</td>
          </tr>
          <tr>
            <td className="stress__td">不安感</td>
            <td className="stress__td stress__td-lightBule">5</td>
            <td className="stress__td stress__td-lightGreen">5</td>
            <td className="stress__td stress__td-lightYellow">5</td>
          </tr>
          <tr>
            <td className="stress__td stress__td-gray">抗うつ感</td>
            <td className="stress__td stress__td-blue">2</td>
            <td className="stress__td stress__td-green">2</td>
            <td className="stress__td stress__td-yellow">2</td>
          </tr>
          <tr>
            <td className="stress__td stress__td-bdb">身体愁訴</td>
            <td className="stress__td stress__td-lightBule stress__td-bdb">5</td>
            <td className="stress__td stress__td-lightGreen stress__td-bdb">5</td>
            <td className="stress__td stress__td-lightYellow stress__td-bdb">5</td>
          </tr>
          <tr>
            <td className="stress__td stress__td-right">合計点</td>
            <td className="stress__td stress__td-lightBule stress__td-bdbBlue">22</td>
            <td className="stress__td stress__td-lightGreen">18</td>
            <td className="stress__td stress__td-lightYellow">20</td>
          </tr>
        </table>
      </div>
    </div>

    <div className="rectangle rectangle-mb45">
      <div className="rectangle__body">
        <div className="rectangle__body_title">[コメント]</div>
        <p className="rectangle__body_text">
          仕事の量的負担、質的負担、身体的負担度、対人関係でのストレスが高く、仕事のコントロール度が低いようでした。
        </p>
      </div>
    </div>

    <div className="stress">
      <div className="stress__head">
        <h3 className="stress__head_title">■ストレス反応への影響因子</h3>
        <p className="stress__head_text">
          点数が高いほど、ストレスを受けやすい環境にいると考えられます。
        </p>
      </div>
      <div className="stress__sub">
        <div className="stress__img" />
        <div className="stress__point">
          <div className="stress__point_item stress__point_item-blue">今回</div>
          <div className="stress__point_item stress__point_item-green">前回</div>
          <div className="stress__point_item stress__point_item-yellow">前々回</div>
          <div className="stress__point_item stress__point_item-red">高ストレス範囲</div>
        </div>
      </div>
      <div className="stress__main">
        <table className="stress__cell">
          <tr>
            <th className="stress__th" />
            <th className="stress__th stress__th-blue">今回</th>
            <th className="stress__th stress__th-green">前回</th>
            <th className="stress__th stress__th-yellow">前々回</th>
          </tr>
          <tr>
            <td className="stress__td stress__td-gray stress__td-bdt">上司からのサポート</td>
            <td className="stress__td stress__td-blue">3</td>
            <td className="stress__td stress__td-green">3</td>
            <td className="stress__td stress__td-yellow">3</td>
          </tr>
          <tr>
            <td className="stress__td">同僚からのサポート</td>
            <td className="stress__td stress__td-lightBule">3</td>
            <td className="stress__td stress__td-lightGreen">3</td>
            <td className="stress__td stress__td-lightYellow">3</td>
          </tr>
          <tr>
            <td className="stress__td stress__td-gray">家族・友人からのサポート</td>
            <td className="stress__td stress__td-blue">2</td>
            <td className="stress__td stress__td-green">2</td>
            <td className="stress__td stress__td-yellow">2</td>
          </tr>
          <tr>
            <td className="stress__td stress__td-bdb">仕事や生活の満足度</td>
            <td className="stress__td stress__td-lightBule stress__td-bdb">5</td>
            <td className="stress__td stress__td-lightGreen stress__td-bdb">5</td>
            <td className="stress__td stress__td-lightYellow stress__td-bdb">5</td>
          </tr>
          <tr>
            <td className="stress__td stress__td-right">合計点</td>
            <td className="stress__td stress__td-lightBule stress__td-bdbBlue">22</td>
            <td className="stress__td stress__td-lightGreen">18</td>
            <td className="stress__td stress__td-lightYellow">20</td>
          </tr>
        </table>
      </div>
    </div>

    <div className="rectangle rectangle-blue rectangle-mb45">
      <div className="rectangle__body rectangle__body-center">
        <div className="rectangle__body_title rectangle__body_title-blue">あなたへのコメント</div>
        <p className="rectangle__body_text">
          仕事の量が多い、仕事がキビシイと考えている人は、もう一度自分の仕事量を見直し、上司、同僚と仕事内容について相談することをお勧めします。周囲の人に協力を仰ぐ事により、事態が解決するかもしれません。
          仕事のコントロール度は、自分で仕事の予定や手順を決めることができない時、「仕事のコントロール度」が低くなります。例えば、周囲のスピードや上司の予定に合わせて仕事をするとか、急な仕事の変更がよく起こるために予定が立てられない状況などです。仕事の進め方を工夫して負担量を軽減することができないか、自ら見直したり周囲の人と相談したりして考えてみましょう｡
          それが無理な場合は、仕事からストレスを多く受けていることを自覚して、勤務時間外や休日はなるべく仕事を持ち帰らず､リフレッシュに努めましょう。また、一人で悩みを抱え込まずに、周囲に悩みを相談することもよいでしょう。
        </p>
      </div>
    </div>

    <div className="headLine headLine-borderNone">
      <h2 className="headLine__title">ステータスの変更</h2>
    </div>
    <div className="rectangle rectangle-mb45">
      <div className="rectangle__block">
        <div className="rectangle__col rectangle__col-w50">
          <div className="rectangle__title">面談</div>
          <div className="rectangle__select">
            <label className="triangles" htmlFor="status">
              <select className="select" id="status" name="">
                <option value="不要">不要</option>
              </select>
            </label>
          </div>
        </div>
        <div className="rectangle__col rectangle__col-w50">
          <div className="rectangle__text">面談記録</div>
        </div>
      </div>
    </div>

    <div className="headLine headLine-borderNone">
      <h2 className="headLine__title">対応履歴</h2>
    </div>
    <div className="rectangle rectangle-mb45">
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

export default React.memo(StressCheckResult)

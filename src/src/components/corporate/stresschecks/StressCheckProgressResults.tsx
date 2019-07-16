import * as React from 'react'
import { formatDepartment } from '../../../util/DepartmentHelper'
import { DepartmentTreeItem } from '../../../if/Department'
import StressCheckOpinionOnEmployment from '../../../swagger/model/stressCheckOpinionOnEmployment'
import StressCheckResults from '../../../swagger/model/stressCheckResults'

type Props = {
  departments: DepartmentTreeItem[]
  opinionOnEmploymentStatuses: StressCheckOpinionOnEmployment[]
  projectName: string
} & StressCheckResults

class StressCheckProgressResults extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const { departments, opinionOnEmploymentStatuses, projectName, rows } = this.props
    return (
      <>
        <div className="head">
          <h1 className="head__title">ストレスチェック実施管理：{projectName}</h1>
          <div className="operateNav">
            <div className="operateNav__list">
              <div className="operateNav__list_item">
                <a
                  className="operateNav__list_link operateNav__list_icon3"
                  href="./modal/status_input.html"
                  data-fancybox
                  data-type="iframe"
                />
              </div>
              <div className="operateNav__list_item">
                <a
                  className="operateNav__list_link operateNav__list_icon4"
                  href="./modal/exclusion_input.html"
                  data-fancybox
                  data-type="iframe"
                />
              </div>
              <div className="operateNav__list_item">
                <a className="operateNav__list_link operateNav__list_icon5" href="" />
              </div>
            </div>
          </div>
        </div>

        <div className="l_grid l_grid-border">
          <div className="cellFlex">
            <div className="cellFlex__row">
              <div className="cellFlex__col cellFlex__col-title cellFlex__col-w130">
                <div className="cellFlex__col_checkbox">
                  <input type="checkbox" id="employee" />
                  <label htmlFor="employee" />
                </div>
                <div className="cellFlex__col_text">
                  <a className="cellFlex__arrow" href="">
                    社員番号
                  </a>
                </div>
              </div>
              <div className="cellFlex__col cellFlex__col-title cellFlex__col-w70">氏名</div>
              <div className="cellFlex__col cellFlex__col-title cellFlex__col-w100">
                <a className="cellFlex__arrow" href="">
                  部署
                </a>
              </div>
              <div className="cellFlex__col cellFlex__col-title cellFlex__col-w70">
                <a className="cellFlex__arrow" href="">
                  評価点 説明
                </a>
              </div>
              <div className="cellFlex__col cellFlex__col-title cellFlex__col-w60">
                <a className="cellFlex__arrow" href="">
                  高ストレス
                </a>
              </div>
              <div className="cellFlex__col cellFlex__col-title cellFlex__col-w70">
                <a className="cellFlex__arrow" href="">
                  面談申出
                </a>
              </div>
              <div className="cellFlex__col cellFlex__col-title cellFlex__col-w100">産業医意見</div>
              {/* <th>対応ログ</th> */}
            </div>
            <div>
              {rows.map((row, i) => (
                <a key={i} className="cellFlex__row" data-fancybox data-type="iframe">
                  {/* 従業員番号 */}
                  <div className="cellFlex__col cellFlex__col-text cellFlex__col-w130">
                    <div className="cellFlex__col_checkbox">
                      <input type="checkbox" id={`employee${i}`} />
                      <label htmlFor={`employee${i}`} />
                    </div>
                    <div className="cellFlex__col_text">{row.employeeCode}</div>
                  </div>
                  {/* 氏名 */}
                  <div className="cellFlex__col cellFlex__col-text cellFlex__col-w70">{`${
                    row.familyName
                  } ${row.givenName}`}</div>
                  {/* 部署名 */}
                  <div className="cellFlex__col cellFlex__col-text cellFlex__col-w100">
                    {row.organizationUnitId
                      ? formatDepartment(departments, row.organizationUnitId)
                      : null}
                  </div>
                  {/* ここから分岐 */}
                  {row.scoreA ? (
                    row.disclosure ? (
                      <>
                        {/* 評価点 disclosure */}
                        <div className="cellFlex__col cellFlex__col-text cellFlex__col-w70">{`${
                          row.scoreA
                        }(${row.scoreA}・${row.scoreB}・${row.scoreC})`}</div>
                        {/* 高ストレス */}
                        <div className="cellFlex__col cellFlex__col-text cellFlex__col-w60">
                          {row.heghStress ? `●` : `ー`}
                        </div>
                        {/* 面談申出 consultationOffer */}
                        <div className="cellFlex__col cellFlex__col-text cellFlex__col-w70">
                          {row.consultationOfferId ? `あり` : `なし`}
                        </div>
                        {/* 産業医意見 */}
                        <div className="cellFlex__col cellFlex__col-text cellFlex__col-w100">
                          {row.stresscheckOpinionOnEmploymentStatusId
                            ? opinionOnEmploymentStatuses.find(
                                o => o.id === row.stresscheckOpinionOnEmploymentStatusId
                              )
                            : `ー`}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="cellFlex__col cellFlex__col-text cellFlex__col-w130">
                          開示NG
                        </div>
                        <div className="cellFlex__col cellFlex__col-text cellFlex__col-w70">
                          {row.consultationOfferId ? `あり` : `なし`}
                        </div>
                        <div className="cellFlex__col cellFlex__col-text cellFlex__col-w100">
                          {row.stresscheckOpinionOnEmploymentStatusId
                            ? opinionOnEmploymentStatuses.find(
                                o => o.id === row.stresscheckOpinionOnEmploymentStatusId
                              )
                            : `ー`}
                        </div>
                      </>
                    )
                  ) : (
                    <div className="cellFlex__col cellFlex__col-text cellFlex__col-w300">
                      未受診
                    </div>
                  )}
                  {/* ここまで分岐 */}
                  {/* <td>
                <ul>
                  {supports
                    .filter(s => s.targetId === row.stresscheckTargetId)
                    .map(s => (
                      <li>
                        <span>{s.recorded}</span>
                        <span>{s.content}</span>
                      </li>
                    ))}
                </ul>
              </td> */}
                  {/*  対応ログ */}
                </a>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default StressCheckProgressResults

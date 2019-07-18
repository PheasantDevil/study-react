import * as React from 'react'
import { calcAge } from '../../../util/DateHelper'
import CheckupResultTable from './parts/CheckupResultTable'
import CheckupMetadata from '../../../swagger/model/checkupMetadata'
import CheckupResult from '../../../swagger/model/checkupResult'
import CheckupStanderdValue from '../../../swagger/model/checkupStanderdValue'
import CheckupExaminations from '../../../swagger/model/checkupExaminations'
import AuthorizationInfo from '../../../swagger/model/authorizationInfo'
import { bind } from 'decko'

interface Props {
  targetId: number
  checkupResultSelect: CheckupMetadata[] // 健診結果一覧
  checkupResult: CheckupResult // 健診結果

  comparisonId1: number | null
  selectResultComparison1: CheckupMetadata // 健診内容 karteNo、date等
  checkupResultComparison1: CheckupResult | null // 健診結果: 比較１
  comparisonList1: CheckupMetadata[]
  changeComparison1: (comparisonId: number) => void
  comparisonId2: number | null
  selectResultComparison2: CheckupMetadata // 健診内容 karteNo、date等
  checkupResultComparison2: CheckupResult | null // 健診結果: 比較2
  comparisonList2: CheckupMetadata[]
  changeComparison2: (comparisonId: number) => void

  checkupStanderdValue: CheckupStanderdValue[] // 基準値
  checkupExaminations: CheckupExaminations // 健診の全項目
  employeeInfo: AuthorizationInfo
}

interface State {
  comparisonList1: CheckupMetadata[]
  comparisonList2: CheckupMetadata[]
}

class CheckupResultBody extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      comparisonList1: this.props.comparisonList1,
      comparisonList2: this.props.comparisonList2
    }
  }

  @bind
  bluebackBool(blueback: boolean) {
    return blueback ? false : true
  }

  render() {
    let blueback = false
    // 結果の表示に必要な項目を絞る
    const examList = this.props.checkupExaminations.examinationItems.filter(id =>
      this.props.checkupResult.examinationValues.some(items => id.id === items.examinationItemId)
    )
    const checkupCategoryMap = this.props.checkupExaminations.examinationCategories.map(
      category => {
        return {
          categoryId: category.id,
          name: category.name,
          items: examList.filter(item => item.examinationCategoryId === category.id)
        }
      }
    )
    const checkupCategory = checkupCategoryMap.filter(category =>
      examList.some(item => item.examinationCategoryId === category.categoryId)
    )

    const {
      checkupStanderdValue,
      checkupResult,
      employeeInfo,
      checkupResultComparison1,
      checkupResultComparison2,
      selectResultComparison1,
      selectResultComparison2,
      changeComparison1,
      changeComparison2,
      comparisonList1,
      comparisonList2
    } = this.props

    if (checkupResult) {
      return (
        <>
          <div className="l_gridSp">
            <div className="result">
              <div className="result__row result__row-bdBottom result__row-spNone">
                <div className="result__col result__col-blue result__col-w210">検査項目</div>
                <div className="result__col result__col-blue result__col-w125">基準値</div>
                <div className="result__col result__col-blue result__col-w155 result__col-activeTop">
                  {checkupResult.checkupDate.replace(/\-/g, '.')} <br />{' '}
                  {`${checkupResult.checkupAge}歳`}
                </div>
                <div className="result__col result__col-blue result__col-w155 result__col-arrow is-result__pulldown">
                  <select
                    // className="pulldown"
                    value={
                      selectResultComparison1 ? selectResultComparison1.checkupTargetId : void 0
                    }
                    onChange={e => changeComparison1(parseInt(e.target.value, 10))}
                  >
                    {checkupResultComparison1 ? (
                      comparisonList1.map(projectInfo => (
                        <option
                          className="pulldown__link"
                          value={projectInfo.checkupTargetId}
                          key={projectInfo.checkupTargetId}
                        >
                          {projectInfo.checkupDate!.replace(/\-/g, '.')}
                          {`\n`}
                          {`${calcAge(employeeInfo.birthday, projectInfo.checkupDate!)}歳`}
                        </option>
                      ))
                    ) : (
                      <option className="pulldown__link" value="null">
                        ー
                      </option>
                    )}
                  </select>
                </div>
                <div className="result__col result__col-blue result__col-w155 result__col-arrow is-result__pulldown">
                  <select
                    // className="pulldown"
                    value={
                      selectResultComparison2 ? selectResultComparison2.checkupTargetId : void 0
                    }
                    onChange={e => changeComparison2(parseInt(e.target.value, 10))}
                  >
                    {checkupResultComparison2 ? (
                      comparisonList2.map(projectInfo => (
                        <option
                          className="pulldown__link"
                          value={projectInfo.checkupTargetId}
                          key={projectInfo.checkupTargetId}
                        >
                          {projectInfo.checkupDate!.replace(/\-/g, '.')}
                          {`\n`}
                          {`${calcAge(employeeInfo.birthday, projectInfo.checkupDate!)}歳`}
                        </option>
                      ))
                    ) : (
                      <option className="pulldown__link" value="null">
                        ー
                      </option>
                    )}
                  </select>
                </div>
              </div>
              <div className="result__row result__row-bdBottom result__row-spNone">
                <div className="result__col result__col-blue result__col-w210">受診機関</div>
                {/* 基準値 */}
                <div className="result__col result__col-w125">ー</div>
                {/* 当年 */}
                <div className="result__col result__col-w155 result__col-active">
                  {checkupResult.hospitalName}
                </div>
                {/* 前年 */}
                <div className="result__col result__col-w155">
                  {checkupResultComparison1 ? checkupResultComparison1.hospitalName : 'ー'}
                </div>
                {/* 前々年 */}
                <div className="result__col result__col-w155">
                  {checkupResultComparison2 ? checkupResultComparison2.hospitalName : 'ー'}
                </div>
              </div>

              <div className="result__row result__row-bdBottom result__row-spNone">
                <div className="result__col result__col-blue result__col-w210">総合判定</div>
                {/* 基準値 */}
                <div className="result__col result__col-w125">ー</div>
                {/* 当年 */}
                <div className="result__col result__col-red result__col-w155 result__col-active">
                  {checkupResult.synthesisDiagnosisDecision}
                </div>
                {/* 前年 */}
                <div className="result__col result__col-red result__col-w155">
                  {checkupResultComparison1
                    ? checkupResultComparison1.synthesisDiagnosisDecision
                    : 'ー'}
                </div>
                {/* 前々年 */}
                <div className="result__col result__col-red result__col-w155">
                  {checkupResultComparison2
                    ? checkupResultComparison2.synthesisDiagnosisDecision
                    : 'ー'}
                </div>
              </div>

              {/* ここから先が検査項目とその値 */}
              {checkupCategory.map((category, j) => {
                return (
                  <div className="result__body">
                    <div className="result__vertical is-result__vertical">
                      {/* {i === 0 ? <div rowSpan={category.items.length}>{category.name}</div> : null} */}
                      <div className="result__vertical_text result__vertical_text-plus">
                        {category.name}
                      </div>
                    </div>
                    <div className="result__main result__main-bdTop" key={j}>
                      {category.items.map((item, i) => {
                        const standerdValue = checkupStanderdValue.find(
                          a => a.examinationItemId === item.id
                        )
                        blueback = this.bluebackBool(blueback)
                        return (
                          <div
                            className={
                              blueback ? `result__row result__row-lightBlue` : `result__row`
                            }
                            key={i}
                          >
                            <div className="result__col result__col-between result__col-w180v">
                              {item.name}
                            </div>
                            <CheckupResultTable
                              item={item}
                              standerdValue={standerdValue!}
                              checkupResult={checkupResult}
                              checkupResultComparison1={checkupResultComparison1!}
                              checkupResultComparison2={checkupResultComparison2!}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )
    } else {
      return <h1>検査結果がありません</h1>
    }
  }
}

export default CheckupResultBody

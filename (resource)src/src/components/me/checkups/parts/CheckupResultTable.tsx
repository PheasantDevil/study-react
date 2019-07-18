import React from 'react'
import { bind } from 'decko'
import ExaminationItem from '../../../../swagger/model/examinationItem'
import CheckupStanderdValue from '../../../../swagger/model/checkupStanderdValue'
import CheckupResult from '../../../../swagger/model/checkupResult'

interface Props {
  item: ExaminationItem
  standerdValue: CheckupStanderdValue
  checkupResult: CheckupResult
  checkupResultComparison1: CheckupResult
  checkupResultComparison2: CheckupResult
}

class CheckupResultTable extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props)
  }

  @bind
  result(resultArray: CheckupResult) {
    const result = resultArray.examinationValues.find(
      com1ResultValue => com1ResultValue.examinationItemId === this.props.item.id
    )
    switch (result!.type) {
      case 'numeric': // 数値
        if (result!.less) {
          return result!.value + '未満'
        } else if (result!.orLess) {
          return result!.value + '以下'
        } else if (result!.orOver) {
          return result!.value + '以上'
        } else {
          return result!.value
        }

      case 'text':
        return result!.text

      case 'after_the_meal': // 食後時間
        return result!.hunger ? '空腹' : result!.timeAfterTheMeal + '時間'

      case 'blood_pressures': // 血圧
        return result!.values.map((blood, i) => {
          return ++i + '回目' + blood.diastolic + `~` + blood.systolic + '\n'
        })

      case 'pulses': // 脈拍
        return result!.values.map((pulses, i) => {
          return ++i + '回目' + pulses.value
        })

      case 'classification': // 区分値
        return result!.classificationValue!.name

      case 'sediment': // 沈渣
        if (result!.many) {
          return '多数/' + result!.classificationValue!.name
        } else {
          if (result!.maxValue && result!.minValue) {
            // 最大値が無い時
            return result!.minValue + '~個/' + result!.classificationValue!.name
          } else if (result!.minValue && result!.maxValue) {
            // 最小値が無い時
            return '~' + result!.maxValue + '個/' + result!.classificationValue!.name
          } else if (result!.minValue === result!.maxValue) {
            // 最小値 = 最大値に時
            return result!.minValue + '個/' + result!.classificationValue!.name
          } else {
            // 通常時
            return (
              result!.minValue + '~' + result!.maxValue + '個/' + result!.classificationValue!.name
            )
          }
        }
      default:
        return
    }
  }

  render() {
    const {
      item,
      standerdValue,
      checkupResult,
      checkupResultComparison1,
      checkupResultComparison2
    } = this.props
    return (
      <>
        {/* 基準値 */}
        <div className="result__col result__col-w125">
          {standerdValue
            ? standerdValue.type === 'numeric'
              ? standerdValue.max || standerdValue.min
                ? `${standerdValue.min ? standerdValue.min : ''} 〜 ${
                    standerdValue.max ? standerdValue.max : ''
                  } ${item.unit ? `[${item.unit}]` : ''}`
                : `${standerdValue.max} ${item.unit ? `[${item.unit}]` : ''}`
              : standerdValue.classificationValueMaxName
            : 'ー'}
        </div>
        {/* 検索結果 */}
        <div className="result__col result__col-w155 result__col-active">
          {this.result(checkupResult)}
        </div>
        {/* 比較１ */}
        <div className="result__col result__col-w155">
          {checkupResultComparison1
            ? checkupResultComparison1.examinationValues.some(
                com1ResultValue => com1ResultValue.examinationItemId === item.id
              )
              ? this.result(checkupResultComparison1)
              : 'ー'
            : 'ー'}
        </div>
        {/* 比較２ */}
        <div className="result__col result__col-w155">
          {checkupResultComparison2
            ? checkupResultComparison2.examinationValues.some(
                com2ResultValue => com2ResultValue.examinationItemId === item.id
              )
              ? this.result(checkupResultComparison2)
              : 'ー'
            : 'ー'}
        </div>
      </>
    )
  }
}

export default CheckupResultTable

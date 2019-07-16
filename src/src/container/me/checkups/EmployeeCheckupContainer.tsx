import { bind } from 'decko'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import BlockUI from '../../../components/BlockUI'
import CheckupResultBody from '../../../components/me/checkups/CheckupResultBody'
import CheckupResultHeader from '../../../components/me/checkups/CheckupResultHeader'
import { meCheckupsUrl } from '../../../config/Url'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import Account from '../../../models/Account'
import User from '../../../models/User'
import {
  getCheckupApi,
  getCheckupsApi,
  getCheckupsStandardValuesApi
} from '../../../swagger/api/employee.service'
import { getCheckupExaminationsApi } from '../../../swagger/api/general.service'
import CheckupExaminations from '../../../swagger/model/checkupExaminations'
import CheckupMetadata from '../../../swagger/model/checkupMetadata'
import CheckupResult from '../../../swagger/model/checkupResult'
import CheckupStanderdValue from '../../../swagger/model/checkupStanderdValue'
import CheckupReExam from '../../../components/me/checkups/CheckupReExam'

class EmployeeCheckupContainer extends React.Component<
  RouteComponentProps<{ targetId: string }> & AuthContext<User>,
  {
    loaded: boolean
    targetId: number
    checkupResultSelect: CheckupMetadata[] // 実施した健診の一覧取得
    checkupResult: CheckupResult | null //  健診結果

    checkupStanderdValue: CheckupStanderdValue[]
    checkupExaminations: CheckupExaminations | null

    comparison1: number
    comparisonId1: number | null
    checkupResultComparison1: CheckupResult | null //  健診結果:比較1
    comparisonList1: CheckupMetadata[]

    comparison2: number
    comparisonId2: number | null
    checkupResultComparison2: CheckupResult | null //  健診結果:比較2
    comparisonList2: CheckupMetadata[]
  }
> {
  constructor(props: RouteComponentProps<{ targetId: string }> & AuthContext<User>) {
    super(props)
    this.state = {
      loaded: false,
      targetId: parseInt(this.props.match.params.targetId, 10),
      checkupResultSelect: [],
      checkupResult: null,
      checkupStanderdValue: [],
      checkupExaminations: null,
      comparison1: 0,
      comparisonId1: null,
      checkupResultComparison1: null,
      comparisonList1: [],
      comparison2: 0,
      comparisonId2: null,
      checkupResultComparison2: null,
      comparisonList2: []
    }
  }

  async componentDidMount() {
    const idToken = await this.props.authorizer.getIdToken()
    const [
      checkupResultSelect,
      checkupResult,
      checkupStanderdValue,
      checkupExaminations
    ] = await Promise.all([
      getCheckupsApi({ authorization: idToken }),
      getCheckupApi({
        checkupTargetId: parseInt(this.props.match.params.targetId, 10),
        authorization: idToken
      }),
      getCheckupsStandardValuesApi({
        targetSex: this.props.user!.sex,
        authorization: idToken
      }),
      getCheckupExaminationsApi({
        targetSex: this.props.user!.sex,
        authorization: idToken
      })
    ])
    this.setState({
      checkupResultSelect,
      checkupResult,
      checkupStanderdValue,
      checkupExaminations
    })

    this.comparison(this.props.match.params.targetId)

    const [checkupResultComparison1, checkupResultComparison2] = await Promise.all<
      CheckupResult | null,
      CheckupResult | null
    >([
      this.state.comparison1 < checkupResultSelect.length
        ? getCheckupApi({
            checkupTargetId: parseInt(this.state.comparisonId1 + '', 10),
            authorization: idToken
          })
        : null,
      this.state.comparison2 < checkupResultSelect.length
        ? getCheckupApi({
            checkupTargetId: parseInt(this.state.comparisonId2 + '', 10),
            authorization: idToken
          })
        : null
    ])

    this.comparisonList(
      this.props.match.params.targetId,
      this.state.comparisonId1!,
      this.state.comparisonId2!
    )

    this.setState({
      loaded: true,
      checkupResultComparison1,
      checkupResultComparison2
    })
  }

  async componentWillReceiveProps(
    nextProps: RouteComponentProps<{ targetId: string }> & AuthContext<User>
  ) {
    this.setState({
      loaded: false
    })
    const idToken = await this.props.authorizer.getIdToken()
    const checkupResult = await getCheckupApi({
      checkupTargetId: parseInt(nextProps.match.params.targetId, 10),
      authorization: idToken
    })

    this.comparison(this.props.match.params.targetId)

    const [checkupResultComparison1, checkupResultComparison2] = await Promise.all<
      CheckupResult | null,
      CheckupResult | null
    >([
      this.state.comparison1 < this.state.checkupResultSelect.length
        ? getCheckupApi({
            checkupTargetId: parseInt(this.state.comparisonId1 + '', 10),
            authorization: idToken
          })
        : null,
      this.state.comparison2 < this.state.checkupResultSelect.length
        ? getCheckupApi({
            checkupTargetId: parseInt(this.state.comparisonId2 + '', 10),
            authorization: idToken
          })
        : null
    ])

    this.comparisonList(
      this.props.match.params.targetId,
      this.state.comparisonId1!,
      this.state.comparisonId2!
    )

    this.setState({
      targetId: parseInt(this.props.match.params.targetId, 10),
      loaded: true,
      checkupResult,
      checkupResultComparison1,
      checkupResultComparison2
    })
  }

  /**
   * 比較の為に使う過去のデータのIndexとそれに対応するcheckupTargetIdの取得
   * Indexは選択結果のtargetIdから求め出される
   *
   *  初期値設定時に使用
   * @memberof EmployeeCheckupContainer
   */
  @bind
  comparison(targetId: string) {
    const checkupResultSelectIndex = this.state.checkupResultSelect.findIndex(
      checkupTargetId => checkupTargetId.checkupTargetId === Number(targetId)
    )
    const comparison1 = checkupResultSelectIndex + 1
    const comparison2 = checkupResultSelectIndex + 2

    const comparisonId1 =
      comparison1 < this.state.checkupResultSelect.length
        ? this.state.checkupResultSelect[comparison1].checkupTargetId
        : null
    const comparisonId2 =
      comparison2 < this.state.checkupResultSelect.length
        ? this.state.checkupResultSelect[comparison2].checkupTargetId
        : null

    this.setState({
      comparison1: comparison1,
      comparison2: comparison2,
      comparisonId1: comparisonId1,
      comparisonId2: comparisonId2
    })
  }

  /**
   * 比較に使用される過去のプルダウンが変更された時、各プルダウンの配列も変更
   *
   * @memberof EmployeeCheckupContainer
   */
  @bind
  comparisonList(targetId: string, comparisonId1: number, comparisonId2: number) {
    const comparisonList1 = this.state.checkupResultSelect.filter(
      id => id.checkupTargetId !== Number(targetId) && id.checkupTargetId !== comparisonId2
    )
    const comparisonList2 = this.state.checkupResultSelect.filter(
      id => id.checkupTargetId !== Number(targetId) && id.checkupTargetId !== comparisonId1
    )

    this.setState({
      comparisonList1: comparisonList1,
      comparisonList2: comparisonList2
    })
  }

  /**
   * ResultHeaderのselectが変更された時に実行される
   * urlを変更し、componentWillReceivePropsを実行する
   *
   * @param {number} targetId
   * @memberof EmployeeCheckupContainer
   */
  @bind
  changeProject(targetId: number) {
    this.props.history.push(meCheckupsUrl(targetId))
  }

  /**
   * ResultBodyにて過去結果のプルダウンが変更された時に実行される
   * idを用いて結果内容を再取得する
   *
   * @param {number} comparisonId checkupTargetIdの事
   * @memberof EmployeeCheckupContainer
   */
  @bind
  async changeComparison1(comparisonId: number) {
    const checkupResultComparison1 = await getCheckupApi({
      checkupTargetId: parseInt(comparisonId + '', 10),
      authorization: await this.props.authorizer.getIdToken()
    })
    this.setState({
      comparisonId1: comparisonId,
      checkupResultComparison1: checkupResultComparison1
    })
    this.comparisonList(this.props.match.params.targetId, comparisonId, this.state.comparisonId2!)
  }
  @bind
  async changeComparison2(comparisonId: number) {
    const checkupResultComparison2 = await getCheckupApi({
      checkupTargetId: parseInt(comparisonId + '', 10),
      authorization: await this.props.authorizer.getIdToken()
    })
    this.comparisonList(this.props.match.params.targetId, this.state.comparisonId1!, comparisonId)

    this.setState({
      comparisonId2: comparisonId,
      checkupResultComparison2: checkupResultComparison2
    })
  }

  render() {
    const {
      targetId,
      checkupResultSelect,
      checkupResult,
      comparisonId1,
      checkupResultComparison1,
      comparisonList1,
      comparisonId2,
      checkupResultComparison2,
      comparisonList2,
      checkupStanderdValue,
      checkupExaminations
    } = this.state

    return this.state.loaded ? (
      <>
        <CheckupResultHeader
          // checkupResultSelect={checkupResultSelect.filter(fil => fil.checkupKarteId)}
          checkupResultSelect={checkupResultSelect}
          checkupResult={checkupResultSelect.find(p => p.checkupTargetId === targetId)!}
          changeProject={this.changeProject}
        />
        {checkupResultSelect.find(p => p.checkupTargetId === targetId)!.checkupKarteId ? (
          <CheckupResultBody
            targetId={targetId}
            checkupResultSelect={checkupResultSelect}
            checkupResult={checkupResult!}
            employeeInfo={this.props.user!}
            comparisonId1={comparisonId1!}
            selectResultComparison1={
              checkupResultSelect.find(p => p.checkupTargetId === comparisonId1)!
            }
            checkupResultComparison1={checkupResultComparison1}
            changeComparison1={this.changeComparison1}
            comparisonList1={comparisonList1}
            comparisonId2={comparisonId2!}
            selectResultComparison2={
              checkupResultSelect.find(p => p.checkupTargetId === comparisonId2)!
            }
            checkupResultComparison2={checkupResultComparison2}
            changeComparison2={this.changeComparison2}
            comparisonList2={comparisonList2}
            checkupStanderdValue={checkupStanderdValue}
            checkupExaminations={checkupExaminations!}
          />
        ) : (
          <div>該当の検査結果がありません</div>
        )}
        <CheckupReExam />
      </>
    ) : (
      <BlockUI />
    )
  }
}
export default Account.withAuthConsumer(EmployeeCheckupContainer)

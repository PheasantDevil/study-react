import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { bind } from 'decko'
import { meStresschecksTargetUrl } from '../../../config/Url'
import StressCheckResultHeader from '../../../components/me/stresschecks/StressCheckResultHeader'
import BlockUI from '../../../components/BlockUI'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import User from '../../../models/User'
import Account from '../../../models/Account'
import StressCheckTargetMetadata from '../../../swagger/model/stressCheckTargetMetadata'
import StressCheckResult from '../../../swagger/model/stressCheckResult'
import Questionnaire from '../../../swagger/model/questionnaire'
import {
  getStressChecksApi,
  getStressCheckApi,
  getStressCheckQuestionnaireApi,
  postStressCheckConsultationOfferApi,
  postStressCheckDisclosureApi
} from '../../../swagger/api/employee.service'
import { getStressCheckEvaluationsApi } from '../../../swagger/api/general.service'
import StressEvaluationGroup from '../../../swagger/model/stressEvaluationGroup'
import queryString from 'query-string'

interface State {
  loaded: boolean
  selectedTab: string | string[]
  targetId: number
  stressCheckResultSelect: StressCheckTargetMetadata[] // 実施した(する予定)のStresszCheckの一覧取得
  stressCheckResult: StressCheckResult | null /** ストレス診断結果の一覧取得 stressCheckResultのscoreの中身 */
  stressEvaluationGroup: StressEvaluationGroup[] | null
  stressCheckScores: StressCheckResult[] | null
  questionnaire: Questionnaire | null //  質問票の取得
}
class EmployeeStressCheckResultContainer extends React.Component<
  RouteComponentProps<{ targetId: string }> & AuthContext<User>,
  State
> {
  constructor(props: RouteComponentProps<{ targetId: string }> & AuthContext<User>) {
    super(props)
    this.state = {
      loaded: false,
      selectedTab: props.location.search['selected'] || 'stresschecksResult',
      targetId: parseInt(this.props.match.params.targetId, 10),
      stressCheckResultSelect: [],
      stressCheckResult: null,
      stressEvaluationGroup: null,
      stressCheckScores: null,
      questionnaire: null
    }
  }
  async componentDidMount() {
    const selected = queryString.parse(location.search)['selected'] || this.state.selectedTab
    const idToken = await this.props.authorizer.getIdToken()
    const [
      stressCheckResultSelect,
      stressCheckResult,
      stressEvaluationGroup,
      questionnaire
    ] = await Promise.all([
      getStressChecksApi({ authorization: idToken }),
      getStressCheckApi({
        targetId: parseInt(this.props.match.params.targetId, 10),
        authorization: idToken
      }),
      getStressCheckEvaluationsApi({ authorization: idToken }),
      getStressCheckQuestionnaireApi({
        targetId: parseInt(this.props.match.params.targetId, 10),
        authorization: idToken
      })
    ])
    const stressCheckResults = this.sortResultbyAnsweredDate(stressCheckResultSelect)
    const stressCheckScores = await this.getScoresForMap(
      stressCheckResults,
      stressCheckResult,
      idToken
    )
    this.setState({
      loaded: true,
      selectedTab: selected,
      stressCheckResultSelect,
      stressCheckResult,
      stressEvaluationGroup,
      stressCheckScores,
      questionnaire
    })
  }

  async componentWillReceiveProps(
    nextProps: RouteComponentProps<{ targetId: string }> & AuthContext<User>
  ) {
    const selected = queryString.parse(location.search)['selected'] || this.state.selectedTab
    this.setState({
      loaded: false,
      targetId: parseInt(nextProps.match.params.targetId, 10)
    })
    const idToken = await this.props.authorizer.getIdToken()
    const stressCheckResult = await getStressCheckApi({
      targetId: parseInt(nextProps.match.params.targetId, 10),
      authorization: idToken
    })
    const stressCheckResults = this.sortResultbyAnsweredDate(this.state.stressCheckResultSelect)
    const stressCheckScores = await this.getScoresForMap(
      stressCheckResults,
      stressCheckResult,
      idToken
    )
    this.setState({
      loaded: true,
      selectedTab: selected,
      stressCheckResult,
      stressCheckScores
    })
  }

  @bind
  sortResultbyAnsweredDate(stressCheckResultSelect: StressCheckTargetMetadata[]) {
    let stressCheckResults: StressCheckTargetMetadata[] = []

    // 結果がない場合は結果画面に入れないため、想定しない
    stressCheckResultSelect.forEach(result => {
      stressCheckResults.push(result)
    })

    // 結果が1つしかない場合は、比較対象がないためソートしない
    // なお、今回を0番目、前回を1番目に、前々回を2番めに格納し、この後の処理でも0,1,2番目を参照するようにするため
    // 順番が揃っているかを確認してから処理に入るように注意すること
    if (stressCheckResults.length > 1) {
      stressCheckResults.sort((a, b) =>
        a.answered! < b.answered! ? 1 : b.answered! < a.answered! ? -1 : 0
      )
    }

    stressCheckResults.forEach((sortedResult, index) => {
      if (sortedResult.stresscheckTargetId === this.state.targetId) {
        stressCheckResults = stressCheckResults.slice(index, stressCheckResults.length)
      }
    })

    return stressCheckResults
  }

  @bind
  async getScoresForMap(
    stressCheckResults: StressCheckTargetMetadata[],
    stressCheckResult: StressCheckResult,
    idToken: string
  ) {
    let scores: StressCheckResult[] = []
    scores.push(stressCheckResult)
    if (stressCheckResults[1]) {
      scores.push(
        await getStressCheckApi({
          targetId: stressCheckResults[1].stresscheckTargetId,
          authorization: idToken
        })
      )
    }

    if (stressCheckResults[2]) {
      scores.push(
        await getStressCheckApi({
          targetId: stressCheckResults[2].stresscheckTargetId,
          authorization: idToken
        })
      )
    }

    return scores
  }

  @bind
  changeResult(targetId: number) {
    this.props.history.push(meStresschecksTargetUrl(targetId))
  }

  // Headerでのクリックイベント
  @bind
  async consultationOffer() {
    const idToken = await this.props.authorizer.getIdToken()
    await postStressCheckConsultationOfferApi({
      targetId: this.state.targetId,
      authorization: idToken
    })
    await postStressCheckDisclosureApi({
      targetId: this.state.targetId,
      body: { disclosure: true },
      authorization: idToken
    })
    const changedResult = await getStressCheckApi({
      targetId: parseInt(this.props.match.params.targetId, 10),
      authorization: idToken
    })
    this.setState({ stressCheckResult: changedResult })
  }

  render() {
    const {
      targetId,
      selectedTab,
      stressCheckResultSelect,
      stressCheckResult,
      stressCheckScores,
      stressEvaluationGroup,
      questionnaire
    } = this.state
    return this.state.loaded ? (
      <div>
        <StressCheckResultHeader
          targetId={targetId}
          selectedTab={selectedTab}
          stressCheckResultSelect={stressCheckResultSelect}
          stressCheckEvaluationScore={stressCheckResult!.score}
          stressCheckResult={stressCheckResult!}
          stressCheckScores={stressCheckScores!}
          stressEvaluationGroup={stressEvaluationGroup!}
          questionnaire={questionnaire}
          changeResult={this.changeResult}
          consultationOffer={this.consultationOffer}
          employeeInfo={this.props.user!}
        />
      </div>
    ) : (
      <BlockUI />
    )
  }
}
export default Account.withAuthConsumer(EmployeeStressCheckResultContainer)

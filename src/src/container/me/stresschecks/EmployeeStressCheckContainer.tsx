import * as React from 'react'
import { bind } from 'decko'
import { RouteComponentProps } from 'react-router'
import { meStresschecksTargetUrl } from '../../../config/Url'
import StressCheckExec from '../../../components/me/stresschecks/StressCheckExec'
import StressCheckEntry from '../../../components/me/stresschecks/StressCheckEntry'
import BlockUI from '../../../components/BlockUI'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import User from '../../../models/User'
import Account from '../../../models/Account'
import Questionnaire from '../../../swagger/model/questionnaire'
import StressCheckGuide from '../../../swagger/model/stressCheckGuide'
import {
  getStressCheckAnsweredApi,
  getStressCheckGuideApi,
  getStressCheckQuestionnaireApi,
  postStressCheckApi
} from '../../../swagger/api/employee.service'
import EmployeeFrame from '../../../components/me/EmployeeFrame'

interface State {
  targetId: number
  entry: boolean
  activeStep: number // 現在何問目
  questionnaire: Questionnaire | null
  categoryIndex: number
  questionIndex: number | null
  userAnswers: { [questionId: number]: number }
  stressCheckGuide: StressCheckGuide | null
  loaded: boolean
}

class EmployeeStressCheckContainer extends React.Component<
  RouteComponentProps<{ targetId: string }> & AuthContext<User>,
  State
> {
  constructor(props: RouteComponentProps<{ targetId: string }> & AuthContext<User>) {
    super(props)
    this.state = {
      targetId: parseInt(this.props.match.params.targetId, 10),
      entry: false,
      activeStep: 0,
      questionnaire: null,
      categoryIndex: 0,
      questionIndex: null,
      userAnswers: {},
      stressCheckGuide: null,
      loaded: false
    }
  }

  // 質問の最後に飛ぶためのテスト
  @bind
  dummy() {
    const { categories, numberOfQuestions } = this.state.questionnaire!
    const userAnswers = {}
    categories.forEach(c => {
      c.questions.forEach(q => {
        userAnswers[q.id] = c.answerGroup.choices[1].id
      })
    })
    this.setState({
      categoryIndex: categories.length - 1,
      questionIndex: categories[categories.length - 1].questions.length - 1,
      userAnswers,
      activeStep: numberOfQuestions
    })
  }

  async componentDidMount() {
    const idToken = await this.props.authorizer.getIdToken()
    const stressCheckAnswered = await getStressCheckAnsweredApi({
      targetId: this.state.targetId,
      authorization: idToken
    })
    if (stressCheckAnswered.answered) {
      return this.props.history.push(meStresschecksTargetUrl(this.state.targetId))
    }

    const stressCheckGuide = await getStressCheckGuideApi({
      targetId: this.state.targetId,
      authorization: idToken
    })
    this.setState({ loaded: true, stressCheckGuide })

    try {
      await this.fetchQuestionnare()
    } catch (e) {
      // TODO エラー処理
      console.log(e)
    }
  }

  compare(a: { order: number }, b: { order: number }) {
    return a.order - b.order
  }

  @bind
  async fetchQuestionnare() {
    const questionnaire = await getStressCheckQuestionnaireApi({
      targetId: this.state.targetId,
      authorization: await this.props.authorizer.getIdToken()
    })

    // ソートしておく
    questionnaire.categories.sort(this.compare)
    questionnaire.categories.forEach(category => {
      category.answerGroup.choices.sort(this.compare)
      category.questions.sort(this.compare)
    })
    this.setState({ questionnaire })
  }

  @bind
  startStressCheck() {
    this.setState({ entry: true, activeStep: 1 })
  }

  // 問題の表示
  @bind
  async next() {
    const { categoryIndex, questionIndex, questionnaire, targetId } = this.state
    if (!questionnaire) {
      throw new Error('unexpected call')
    }
    if (questionIndex === null) {
      return this.setState({ questionIndex: 0 })
    }
    const category = questionnaire.categories[categoryIndex]
    if (questionIndex + 1 < category.questions.length) {
      return this.setState({
        questionIndex: questionIndex + 1,
        activeStep: this.state.activeStep + 1
      })
    }
    if (categoryIndex + 1 < questionnaire.categories.length) {
      return this.setState({
        categoryIndex: categoryIndex + 1,
        questionIndex: null
      })
    }
    if (window.confirm('これでストレスチェックは終了です。よろしいですか？')) {
      await this.save(targetId)
    }
  }

  @bind
  prev() {
    const { categoryIndex, questionIndex, questionnaire } = this.state
    if (!questionnaire) {
      throw new Error('unexpected call')
    }
    if (questionIndex === null) {
      if (categoryIndex === 0) {
        return
      }
      return this.setState({
        categoryIndex: categoryIndex - 1,
        questionIndex: questionnaire.categories[categoryIndex - 1].questions.length - 1,
        activeStep: this.state.activeStep - 1
      })
    }
    if (questionIndex === 0) {
      return this.setState({ questionIndex: null })
    }
    return this.setState({
      questionIndex: questionIndex - 1,
      activeStep: this.state.activeStep - 1
    })
  }

  // 回答データの更新
  @bind
  handleAnswer(questionId: number, answerId: number) {
    this.setState(
      {
        userAnswers: { ...this.state.userAnswers, [questionId]: answerId }
      },
      () => this.next()
    )
  }

  @bind
  async save(targetId: number) {
    await postStressCheckApi({
      targetId: this.state.targetId,
      body: Object.entries(this.state.userAnswers).map(([questionId, questionAnswerChoiceId]) => ({
        questionId: parseInt(questionId, 10),
        questionAnswerChoiceId: questionAnswerChoiceId
      })),
      authorization: await this.props.authorizer.getIdToken()
    })
    this.props.history.push(meStresschecksTargetUrl(targetId))
  }

  render() {
    const { stressCheckGuide, questionnaire } = this.state
    return (
      <div>
        {this.state.entry ? (
          <StressCheckExec
            {...this.state}
            next={this.next}
            prev={this.prev}
            answer={this.handleAnswer}
            questionnaire={questionnaire!}
            dummy={this.dummy}
          />
        ) : this.state.loaded ? (
          <EmployeeFrame {...this.props}>
            <StressCheckEntry stressCheckGuide={stressCheckGuide!} start={this.startStressCheck} />
          </EmployeeFrame>
        ) : (
          <BlockUI />
        )}
      </div>
    )
  }
}

export default Account.withAuthConsumer(EmployeeStressCheckContainer)

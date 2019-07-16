import * as React from 'react'
import Questionnaire from '../../../swagger/model/questionnaire'
import StressCheckResultItem from '../../../swagger/model/stressCheckResultItem'

const subTitles = [
  '仕事について',
  '最近1ヶ月の状態について',
  '周りの方々について',
  '満足度について'
]

interface Props {
  questionnaire: Questionnaire //  質問票の取得
  answer: StressCheckResultItem[] // ユーザーの解答
}

const StressCheckResultTab: React.FunctionComponent<Props> = ({ questionnaire, answer }) => {
  let answered = Array()
  questionnaire.categories.map(category =>
    category.answerGroup.choices.map(choice => answered.push(choice.text))
  )
  return (
    <>
      <div className="tab__block">
        <div className="tab__block">
          <div className="l_grid">
            <div className="accordion">
              {questionnaire.categories.map(category => (
                <React.Fragment key={`category${category.order}`}>
                  <div className="accordion__title accordion__title-answer is-accordion__title">
                    {subTitles[category.order - 1]}
                  </div>
                  <div className="accordion__block">
                    <div
                      className={`answer ${
                        category.order === questionnaire.categories.length ? `answer-mb0` : ``
                      }`}
                    >
                      <div className="answer__row">
                        <div className="answer__col answer__col-title">No</div>
                        <div className="answer__col answer__col-title">質問</div>
                        <div className="answer__col answer__col-title">回答</div>
                      </div>
                      {category.questions.map(question => (
                        <React.Fragment key={`question${question.order}`}>
                          <div className="answer__row">
                            <div className="answer__col answer__col-text">Q.{question.order}</div>
                            <div className="answer__col answer__col-text">{question.text}</div>
                            <div className="answer__col answer__col-text">
                              {answered[answer[question.id - 1].questionAnswerChoiceId]}
                            </div>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default StressCheckResultTab

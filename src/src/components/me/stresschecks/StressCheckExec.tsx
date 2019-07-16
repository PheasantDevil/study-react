import * as React from 'react'
import { Form } from 'formik'
import Questionnaire from '../../../swagger/model/questionnaire'
import Question from '../../../swagger/model/question'
import QuestionAnswerChoice from '../../../swagger/model/questionAnswerChoice'

interface Props {
  activeStep: number // 進んだ数(?)
  categoryIndex: number // 仕事内容、状態、周囲の人間 categories[order]
  questionIndex: number | null // カテゴリ内の質問 questionas[id]
  userAnswers: { [questionId: number]: number } // 質問に対してどの回答をしたか格納
  questionnaire: Questionnaire
  next(): void
  prev(): void
  answer(questionId: number, answerId: number): void
  dummy(): void // 最後へワープやつ
}

const StressCheckExec: React.FunctionComponent<Props> = ({
  questionnaire,
  activeStep,
  categoryIndex,
  questionIndex,
  userAnswers,
  next,
  prev,
  answer,
  dummy
}) => {
  const category = questionnaire.categories[categoryIndex]
  const question = questionIndex === null ? null : category.questions[questionIndex]
  return (
    <>
      <Form>
        <div className="l_answerInput">
          {question === null ? (
            <div className="l_grid l_grid-answerInput">
              <div className="answerInput">
                <div className="answerInput__text">{category.text}</div>
              </div>
              <div className="l_switch l_switch-wrap">
                <div className="l_switch__w4">
                  <button className="u_switch u_switch-blueLine" onClick={next}>
                    次へ　＞
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <QuestionForm
              questions={question}
              choices={category.answerGroup.choices}
              userAnswers={userAnswers}
              answer={answer}
              key={`question${question.id}`}
              length={category.questions.length}
            />
          )}
        </div>
      </Form>
      <Form>
        <input type="button" onClick={dummy} defaultValue="デバッグ用(最後へ)" />
      </Form>
    </>
  )
}

const QuestionForm: React.FunctionComponent<{
  questions: Question
  choices: QuestionAnswerChoice[]
  userAnswers: { [questionId: number]: number }
  length: number
  answer: (questionId: number, answerId: number) => void
}> = ({ questions, choices, userAnswers, answer, length }) => (
  <div className="l_grid l_grid-answerInput" key={`question${questions.id}`}>
    <div className="answerInput">
      <div className="answerInput__part">
        {questions.order}問目/
        <span className="answerInput__part-bold">{length}問中</span>
      </div>
      <div className="answerInput__num">Q.{questions.order}</div>
      <div className="answerInput__text">{questions.text}</div>
    </div>
    <div className="l_switch l_switch-wrap">
      {choices.map(choice => (
        <div className="l_switch__w4" key={`choice${choice.id}`}>
          <label
            className="u_switch u_switch-blueLine"
            htmlFor={`choice${choice.id}`}
            key={`answer${choice.id}`}
          >
            <input
              id={`choice${choice.id}`}
              type="radio"
              value={choice.id}
              name={`q-${questions.id}`}
              onChange={e => answer(questions.id, parseInt(e.target.value, 10))}
            />
            {choice.text}
          </label>
        </div>
      ))}
    </div>
  </div>
)

export default StressCheckExec

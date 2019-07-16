import * as React from 'react'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts'
import StressCheckEvaluationScore from '../../../swagger/model/stressCheckEvaluationScore'
import StressCheckResult from '../../../swagger/model/stressCheckResult'
import StressEvaluationGroup from '../../../swagger/model/stressEvaluationGroup'
import { calcAge } from '../../../util/DateHelper'
import AuthorizationInfo from '../../../swagger/model/authorizationInfo'

const subTitles = {
  a: '点数が高いほど、ストレスの原因となっていると考えられます。',
  b: '点数が高いほど、ストレスによる反応が強く出ていると考えられます。',
  c: '点数が高いほど、ストレスを受けやすい環境にいると考えられます。'
}

interface Props {
  stressCheckEvaluationScore: StressCheckEvaluationScore /** ストレス診断結果の一覧取得 stressCheckResultのscoreの中身 */
  stressCheckResult: StressCheckResult
  stressCheckScores: StressCheckResult[]
  stressEvaluationGroup: StressEvaluationGroup[]
  employeeInfo: AuthorizationInfo
  consultationOffer: () => void
}

const StressCheckResultScoreTab: React.FunctionComponent<Props> = ({
  stressCheckEvaluationScore,
  stressCheckResult,
  stressCheckScores,
  consultationOffer,
  stressEvaluationGroup,
  employeeInfo
}) => {
  return (
    <>
      <div className="is-tab">
        <div className="tab__block">
          <div className="l_grid l_grid-mb">
            <div className="rectangle">
              <div className="rectangle__block">
                <div className="rectangle__col rectangle__col-w50">
                  <div className="rectangle__list">
                    <div className="rectangle__col_title">受診</div>
                    <div className="rectangle__col_text">{stressCheckResult.answered}</div>
                  </div>
                </div>
                <div className="rectangle__col rectangle__col-w50">
                  <div className="rectangle__list">
                    <div className="rectangle__col_title">受診年齢</div>
                    <div className="rectangle__col_text">
                      {calcAge(employeeInfo.birthday, stressCheckResult.answered)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rectangle">
              <div className="rectangle__body rectangle__body-center">
                <div className="rectangle__body_title rectangle__body_title-mb15">
                  <span className="rectangle__body_title-red">
                    あなたのストレス度は
                    <br className="u_pcNone" />
                    {stressCheckEvaluationScore.stressCondition.shortText}です。
                  </span>
                </div>
                {stressCheckEvaluationScore.highStress ? (
                  <p className="rectangle__body_text">
                    {stressCheckEvaluationScore.stressCondition.summaryText}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="accordion">
              {stressEvaluationGroup.map(group => {
                let sumThisTime = 0
                let sumLastTime = 0
                let sumBeforeLastTime = 0
                let data = group.stressEvaluations.map(evaluation => ({
                  evaluations: evaluation.text,
                  scoreThisTime: stressCheckScores[0].score[evaluation.code],
                  scoreLastTime: stressCheckScores[1]
                    ? stressCheckScores[1].score[evaluation.code]
                    : 0,
                  scoreBeforeLastTime: stressCheckScores[2]
                    ? stressCheckScores[2].score[evaluation.code]
                    : 0
                }))
                return (
                  <React.Fragment key={`group${group.id}`}>
                    <div className="accordion__title accordion__title-result is-accordion__title">
                      {group.text}
                    </div>
                    <div className="accordion__block">
                      <div className="stress">
                        <div className="stress__head">
                          <p className="stress__head_text">{subTitles[group.code]}</p>
                        </div>
                        <div className="stress__sub">
                          <div>
                            {
                              <RadarChart
                                cx={200}
                                cy={150}
                                outerRadius={'70%'}
                                width={400}
                                height={300}
                                data={data}
                                startAngle={0}
                                endAngle={360}
                              >
                                <PolarGrid gridType="circle" />
                                <PolarAngleAxis dataKey="evaluations" />
                                <PolarRadiusAxis
                                  angle={group.stressEvaluations.length / 360}
                                  domain={[0, 5]}
                                  tickCount={6}
                                />
                                <Radar
                                  dataKey="scoreBeforeLastTime"
                                  stroke="#F1D24B"
                                  fill="#FFFFFF"
                                  fillOpacity={0.6}
                                  legendType="plainline"
                                />
                                <Radar
                                  dataKey="scoreLastTime"
                                  stroke="#2BC474"
                                  fill="#FFFFFF"
                                  fillOpacity={0.6}
                                  legendType="plainline"
                                />
                                <Radar
                                  dataKey="scoreThisTime"
                                  stroke="#177BDD"
                                  fill="#D9F0FF"
                                  fillOpacity={0.6}
                                  legendType="plainline"
                                  label={true}
                                />
                                <Legend align="left" />
                              </RadarChart>
                            }
                          </div>
                        </div>
                        <div className="stress__main">
                          {/* 合計を計算するため */}
                          {group.stressEvaluations.map(evaluation => (
                            <React.Fragment key={`sum${evaluation.id}`}>
                              {stressCheckScores[0]
                                ? (sumThisTime += parseInt(
                                    stressCheckScores[0].score[evaluation.code],
                                    10
                                  ))
                                : ''}
                              {stressCheckScores[1]
                                ? (sumLastTime += parseInt(
                                    stressCheckScores[1].score[evaluation.code],
                                    10
                                  ))
                                : ''}
                              {stressCheckScores[2]
                                ? (sumBeforeLastTime += parseInt(
                                    stressCheckScores[2].score[evaluation.code],
                                    10
                                  ))
                                : ''}
                            </React.Fragment>
                          ))}
                          <table className="stress__cell">
                            <tbody>
                              <tr>
                                <th className="stress__th stress__th-blue stress__th-hidden">
                                  項目
                                </th>
                                <th className="stress__th stress__th-blueDark">今回</th>
                                <th className="stress__th stress__th-blue">前回</th>
                                <th className="stress__th stress__th-blue">前々回</th>
                              </tr>
                              {group.stressEvaluations.map(evaluation => (
                                <React.Fragment key={`evaluation${evaluation.id}`}>
                                  <tr>
                                    <td className="stress__td stress__td-gray stress__td-grayPc">
                                      {evaluation.text}
                                    </td>
                                    <td className="stress__td stress__td-lightBule">
                                      {stressCheckScores[0]
                                        ? stressCheckScores[0].score[evaluation.code]
                                        : '-'}
                                    </td>
                                    <td className="stress__td stress__td-lightBule">
                                      {stressCheckScores[1]
                                        ? stressCheckScores[1].score[evaluation.code]
                                        : '-'}
                                    </td>
                                    <td className="stress__td stress__td-lightBule">
                                      {stressCheckScores[2]
                                        ? stressCheckScores[2].score[evaluation.code]
                                        : '-'}
                                    </td>
                                  </tr>
                                </React.Fragment>
                              ))}
                              <tr>
                                <td className="stress__td stress__td-align">合計点</td>
                                <td className="stress__td stress__td-lightPink stress__td-bdbBlue">
                                  {sumThisTime}
                                </td>
                                <td className="stress__td stress__td-lightPink">{sumLastTime}</td>
                                <td className="stress__td stress__td-lightPink">
                                  {sumBeforeLastTime}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                )
              })}
            </div>
          </div>
          {stressCheckResult.consultationOffered ? null : (
            <div className="l_grid l_grid-border">
              <div className="meeting">
                <h2 className="meeting__title">ー産業医面談のご案内ー</h2>
                <p className="meeting__text">
                  ストレスチェックの結果から、もし何らかの不調やストレスの存在を自覚されるようでしたら、ストレスチェックに基づく産業医面談を強くお勧めします。希望される場合は下記より申し出を行なってください。
                </p>
                <div className="meeting__body">
                  <div className="meeting__body_title">
                    ●面談申出期間：2018年10月1日〜2018年12月31日
                  </div>
                  <p className="meeting__body_text">
                    ※なお、面談を申し出た場合、あなたのストレスチェック結果は自動的に事業主へ開示されたものとして扱われます。
                  </p>
                </div>
              </div>
              <div className="l_switch">
                <button className="u_switch u_w260 u_switch-blue" onClick={consultationOffer}>
                  産業医面談を申し出る
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default StressCheckResultScoreTab

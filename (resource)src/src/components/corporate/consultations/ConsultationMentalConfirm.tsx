import * as React from 'react'
import { dayWeekMonthList } from '../../../models/DayWeekMonth'
import ConditionsToBeCorrected from '../../../swagger/model/conditionsToBeCorrected'
import ConsultationMental from '../../../swagger/model/consultationMental'
import EmploymentDiagnosis from '../../../swagger/model/employmentDiagnosis'
import InstructionCategory from '../../../swagger/model/instructionCategory'
import StateOfAccumulatedFatigue from '../../../swagger/model/stateOfAccumulatedFatigue'

interface Props {
  employeeName: string
  medicalAdvisorName: string
  stateOfAccumulatedFatigues: StateOfAccumulatedFatigue[]
  conditionsToBeCorrected: ConditionsToBeCorrected[]
  employmentDiagnoses: EmploymentDiagnosis[]
  instructionCategories: InstructionCategory[]
  values: ConsultationMental
  prev: () => void
  next: () => void
}

const ConsultationMentalConfirm: React.FunctionComponent<Props> = ({
  employeeName,
  medicalAdvisorName,
  stateOfAccumulatedFatigues,
  conditionsToBeCorrected,
  employmentDiagnoses,
  instructionCategories,
  values: {
    actionTerm,
    age,
    belongs,
    conditionsToBeCorrectedId,
    consultationAt,
    employmentDiagnosisId,
    howToBeHealthyAboutWorkingTime,
    howToBeHealthyExceptWorkingTime,
    instructionCategoryId,
    nextConsultationAt,
    notice,
    specialMention,
    stateOfAccumulatedFatigueId,
    actionContent,
    conditionsToBeCorrectedDetails,
    considerationToMedicalInstitutions,
    medicalObservation,
    opinionForWorkingCondition,
    remark,
    workingCondition
  },
  next,
  prev
}) => {
  return (
    <div className="l_grid l_grid-border l_grid-spaceL">
      <form action="complete.html">
        <div className="confirm">
          <div className="confirm__slogan">
            下記の内容をご確認の上、「登録」ボタンを押して下さい。
          </div>
          <div className="headLine">
            <h2 className="headLine__title">面談記録・意見書登録</h2>
          </div>
          <div className="confirm__cell">
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">氏名</div>
                <p className="confirm__col_text">{employeeName}</p>
              </div>
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">面談時年齢</div>
                <p className="confirm__col_text">{age}歳</p>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">勤務の状況</div>
                <p className="confirm__col_text">{workingCondition}</p>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col">
                <div className="confirm__col_title">疲労蓄積の状況</div>
                <p className="confirm__col_text">
                  {stateOfAccumulatedFatigues.find(c => c.id === stateOfAccumulatedFatigueId)!.name}
                </p>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">医学的所見に関する特記事項</div>
                <p className="confirm__col_text">{medicalObservation}</p>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col">
                <div className="confirm__col_title">
                  その他の心身の
                  <br />
                  状況
                </div>
                <p className="confirm__col_text">
                  {conditionsToBeCorrected.find(s => s.id === conditionsToBeCorrectedId)!.name}
                </p>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">所見ありの場合、状況を記入する</div>
                <p className="confirm__col_text">{conditionsToBeCorrectedDetails}</p>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">判定区分</div>
                <ul className="confirm__radio">
                  <li className="confirm__radio_item">
                    ○就業区分 {employmentDiagnoses.find(s => s.id === employmentDiagnosisId)!.name}
                  </li>
                  <li className="confirm__radio_item">
                    ○指導区分 
                    {instructionCategories.find(s => s.id === instructionCategoryId)!.name}
                  </li>
                </ul>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">特記事項</div>
                <p className="confirm__col_text">{specialMention}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="confirm">
          <div className="headLine">
            <h2 className="headLine__title">従業員へのメッセージ</h2>
          </div>
          <div className="confirm__cell">
            <div className="confirm__row">
              <div className="confirm__col">
                <div className="confirm__col_title">就業の制限</div>
                <p className="confirm__col_text">
                  {howToBeHealthyAboutWorkingTime.unnecessary ? (
                    <>
                      ○特になし
                      <br />
                    </>
                  ) : null}
                  {howToBeHealthyAboutWorkingTime.ban ? (
                    <>
                      ○就業の禁止
                      <br />
                    </>
                  ) : null}
                  {howToBeHealthyAboutWorkingTime.noOvertime ? (
                    <>
                      ○時間外労働の禁止
                      <br />
                    </>
                  ) : null}
                  {howToBeHealthyAboutWorkingTime.change ? (
                    <>
                      ○労働時間の短縮
                      <br />
                      変形労働時間制または裁量労働制の対象から除外
                      <br />
                    </>
                  ) : null}
                  {howToBeHealthyAboutWorkingTime.overtime ? (
                    <>
                      ○労働時間の短縮
                      <br />
                      時間外労働の制限
                      {howToBeHealthyAboutWorkingTime.overtimeHour
                        ? ` ${howToBeHealthyAboutWorkingTime.overtimeHour}時間まで`
                        : ''}
                      <br />
                    </>
                  ) : null}
                  {howToBeHealthyAboutWorkingTime.shortTime ? (
                    <>
                      ○労働時間の短縮
                      <br />
                      就業時間を制限
                      {howToBeHealthyAboutWorkingTime.shortTimeStart
                        ? `${howToBeHealthyAboutWorkingTime.shortTimeStart}から`
                        : ''}
                      {howToBeHealthyAboutWorkingTime.shortTimeEnd
                        ? `${howToBeHealthyAboutWorkingTime.shortTimeEnd}まで`
                        : ''}
                      <br />
                    </>
                  ) : null}
                  {howToBeHealthyAboutWorkingTime.other ? (
                    <>
                      ○労働時間の短縮
                      <br />
                      その他
                      <br />
                    </>
                  ) : null}
                </p>
              </div>
              <div className="confirm__col">
                <div className="confirm__col_title">
                  労働時間以外の
                  <br />
                  項目
                </div>
                <p className="confirm__col_text">
                  ○主要項目
                  <br />
                  {howToBeHealthyExceptWorkingTime.changePlace ? (
                    <>
                      就業場所の変更
                      <br />
                    </>
                  ) : null}
                  {howToBeHealthyExceptWorkingTime.changeWork ? (
                    <>
                      作業の転換
                      <br />
                    </>
                  ) : null}
                  {howToBeHealthyExceptWorkingTime.reduceMidnight ? (
                    <>
                      深夜業の回数の削減
                      <br />
                    </>
                  ) : null}
                  {howToBeHealthyExceptWorkingTime.workDaytime ? (
                    <>
                      昼間勤務への転換
                      <br />
                    </>
                  ) : null}
                  {howToBeHealthyExceptWorkingTime.other ? (
                    <>
                      その他
                      <br />
                    </>
                  ) : null}
                </p>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">その他</div>
                <p className="confirm__col_text">{remark}</p>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">措置内容</div>
                <p className="confirm__col_text">{actionContent}</p>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col">
                <div className="confirm__col_title">措置期間</div>
                <p className="confirm__col_text">
                  {actionTerm.durationValue && actionTerm.durationUnit
                    ? `${actionTerm.durationValue}${
                        dayWeekMonthList.find(d => d.value === actionTerm.durationUnit)!.label
                      }`
                    : `${actionTerm.start ? actionTerm.start + 'から' : ''}${
                        actionTerm.end ? actionTerm.end + 'まで' : ''
                      }`}
                </p>
              </div>
              <div className="confirm__col">
                <div className="confirm__col_title">次回面接予定日</div>
                <p className="confirm__col_text">
                  {nextConsultationAt ? (
                    <>
                      {nextConsultationAt.date}
                      <br />
                      {nextConsultationAt.startTime}〜{nextConsultationAt.endTime}
                    </>
                  ) : (
                    'なし'
                  )}
                </p>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">職場環境の改善に関する意見</div>
                <p className="confirm__col_text">{opinionForWorkingCondition}</p>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">医療機関への受診配慮等</div>
                <p className="confirm__col_text">{considerationToMedicalInstitutions}</p>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">連絡事項等</div>
                <p className="confirm__col_text">{notice}</p>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col">
                <div className="confirm__col_title">医師の所属先</div>
                <p className="confirm__col_text">{belongs}</p>
              </div>
              <div className="confirm__col">
                <div className="confirm__col_title">実施日時</div>
                <p className="confirm__col_text">
                  {consultationAt.date}
                  <br />
                  {consultationAt.startTime}〜{consultationAt.endTime}
                </p>
              </div>
            </div>
            <div className="confirm__row">
              <div className="confirm__col confirm__col-w100">
                <div className="confirm__col_title">医師の氏名</div>
                <p className="confirm__col_text">{medicalAdvisorName}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="l_switch">
          <div className="l_switch__w2">
            <button className="u_switch u_switch-white" type="button" onClick={prev}>
              戻る
            </button>
          </div>
          <div className="l_switch__w2">
            <button className="u_switch u_switch-blue" type="button" onClick={next}>
              登録
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ConsultationMentalConfirm

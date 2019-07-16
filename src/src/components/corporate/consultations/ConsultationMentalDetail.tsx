import * as React from 'react'
import { consultationTypes } from '../../../models/ConsultationType'
import { dayWeekMonthList } from '../../../models/DayWeekMonth'
import ConditionsToBeCorrected from '../../../swagger/model/conditionsToBeCorrected'
import ConsultationMental from '../../../swagger/model/consultationMental'
import ConsultationMetadata from '../../../swagger/model/consultationMetadata'
import EmploymentDiagnosis from '../../../swagger/model/employmentDiagnosis'
import InstructionCategory from '../../../swagger/model/instructionCategory'
import StateOfAccumulatedFatigue from '../../../swagger/model/stateOfAccumulatedFatigue'

interface Props {
  metadata: ConsultationMetadata
  consultation: ConsultationMental
  stateOfAccumulatedFatigues: StateOfAccumulatedFatigue[]
  conditionsToBeCorrected: ConditionsToBeCorrected[]
  employmentDiagnoses: EmploymentDiagnosis[]
  instructionCategories: InstructionCategory[]
}

const ConsultationMentalDetail: React.FunctionComponent<Props> = ({
  metadata: {
    employeeFamilyName,
    employeeGivenName,
    medicalAdvisorFamilyName,
    medicalAdvisorGivenName,
    consultationType
  },
  consultation: {
    actionTerm,
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
    age,
    conditionsToBeCorrectedDetails,
    considerationToMedicalInstitutions,
    medicalObservation,
    opinionForWorkingCondition,
    remark,
    workingCondition
  },
  stateOfAccumulatedFatigues,
  conditionsToBeCorrected,
  employmentDiagnoses,
  instructionCategories
}) => (
  <>
    <div className="interview">
      <h2 className="interview__title">{`${employeeFamilyName}${employeeGivenName} ${
        consultationTypes.find(c => c.type === consultationType)!.label
      }面談記録`}</h2>
      <div className="interview__list">
        <div className="interview__list_item">
          <span className="interview__list_name">[氏名]</span>
          {`${employeeFamilyName} ${employeeGivenName}`}
        </div>
        <div className="interview__list_item">
          <span className="interview__list_name">[面談時年齢]</span>
          {age}歳
        </div>
      </div>
      <div className="interview__list">
        <div className="interview__list_item">
          <span className="interview__list_name">[疲労蓄積の状況]</span>
          {stateOfAccumulatedFatigues.find(s => s.id === stateOfAccumulatedFatigueId)!.name}
        </div>
        <div className="interview__list_item">
          <span className="interview__list_name">[配慮すべき心身の状況]</span>
          {conditionsToBeCorrected.find(s => s.id === conditionsToBeCorrectedId)!.name}
        </div>
      </div>
      <div className="interview__body">
        <div className="interview__body_title">[勤務の状況]</div>
        <p className="interview__body_text">{workingCondition}</p>
      </div>
      <div className="interview__body">
        <div className="interview__body_title">[医学的所見に関する特記事項]</div>
        <p className="interview__body_text">{medicalObservation}</p>
      </div>
      <div className="interview__body">
        <div className="interview__body_title">[所見ありの場合、状況を記入する]</div>
        <p className="interview__body_text">{conditionsToBeCorrectedDetails}</p>
      </div>
      <div className="interview__body">
        <div className="interview__body_title">[特記事項]</div>
        <p className="interview__body_text">{specialMention}</p>
      </div>
      <div className="interview__list">
        <div className="interview__list_item">
          <span className="interview__list_name">[就業区分]</span>
          {employmentDiagnoses.find(s => s.id === employmentDiagnosisId)!.name}
        </div>
        <div className="interview__list_item">
          <span className="interview__list_name">[指導区分]</span>
          {instructionCategories.find(s => s.id === instructionCategoryId)!.name}
        </div>
      </div>
    </div>
    <div className="interview">
      <h2 className="interview__title">事後措置に係る意見書</h2>
      <div className="interview__list">
        {howToBeHealthyAboutWorkingTime.unnecessary ? (
          <div className="interview__list_item">
            <span className="interview__list_name">[特になし]</span>
          </div>
        ) : null}
        {howToBeHealthyAboutWorkingTime.ban ? (
          <div className="interview__list_item">
            <span className="interview__list_name">[就業の禁止]</span>
          </div>
        ) : null}
        {howToBeHealthyAboutWorkingTime.noOvertime ? (
          <div className="interview__list_item">
            <span className="interview__list_name">[時間外労働の禁止]</span>
          </div>
        ) : null}
        {howToBeHealthyAboutWorkingTime.change ? (
          <div className="interview__list_item">
            <span className="interview__list_name">[労働時間の短縮]</span>
            変形労働時間制または裁量労働制の対象から除外
          </div>
        ) : null}
        {howToBeHealthyAboutWorkingTime.overtime ? (
          <div className="interview__list_item">
            <span className="interview__list_name">[労働時間の短縮]</span>
            時間外労働の制限
            {howToBeHealthyAboutWorkingTime.overtimeHour
              ? ` ${howToBeHealthyAboutWorkingTime.overtimeHour}時間まで`
              : ''}
          </div>
        ) : null}
        {howToBeHealthyAboutWorkingTime.shortTime ? (
          <div className="interview__list_item">
            <span className="interview__list_name">[労働時間の短縮]</span>
            就業時間を制限
            {howToBeHealthyAboutWorkingTime.shortTimeStart
              ? `${howToBeHealthyAboutWorkingTime.shortTimeStart}から`
              : ''}
            {howToBeHealthyAboutWorkingTime.shortTimeEnd
              ? `${howToBeHealthyAboutWorkingTime.shortTimeEnd}まで`
              : ''}
          </div>
        ) : null}
        {howToBeHealthyAboutWorkingTime.other ? (
          <div className="interview__list_item">
            <span className="interview__list_name">[労働時間の短縮]</span>
            その他
          </div>
        ) : null}
        {/* <br /> */}
        {howToBeHealthyExceptWorkingTime.changePlace ? (
          <div className="interview__list_item">
            <span className="interview__list_name">[労働時間の以外の項目]</span>就業場所の変更
          </div>
        ) : null}
        {howToBeHealthyExceptWorkingTime.changeWork ? (
          <div className="interview__list_item">
            <span className="interview__list_name">[労働時間の以外の項目]</span>作業の転換
          </div>
        ) : null}
        {howToBeHealthyExceptWorkingTime.reduceMidnight ? (
          <div className="interview__list_item">
            <span className="interview__list_name">[労働時間の以外の項目]</span>
            深夜業の回数の削減
          </div>
        ) : null}
        {howToBeHealthyExceptWorkingTime.workDaytime ? (
          <div className="interview__list_item">
            <span className="interview__list_name">[労働時間の以外の項目]</span>昼間勤務への転換
          </div>
        ) : null}
        {howToBeHealthyExceptWorkingTime.other ? (
          <div className="interview__list_item">
            <span className="interview__list_name">[労働時間の以外の項目]</span>その他
          </div>
        ) : null}
      </div>
      <div className="interview__list">
        <div className="interview__list_item">
          <span className="interview__list_name">[措置期間]</span>
          {actionTerm.durationValue && actionTerm.durationUnit
            ? `${actionTerm.durationValue}${
                dayWeekMonthList.find(d => d.value === actionTerm.durationUnit)!.label
              }`
            : `${actionTerm.start ? actionTerm.start + 'から' : ''}${
                actionTerm.end ? actionTerm.end + 'まで' : ''
              }`}
        </div>
        <div className="interview__list_item">
          <span className="interview__list_name">[次回面接予定日]</span>
          {nextConsultationAt
            ? `${nextConsultationAt.date} ${nextConsultationAt.startTime}〜${
                nextConsultationAt.endTime
              }`
            : 'なし'}
        </div>
      </div>
      <div className="interview__body">
        <div className="interview__body_title">[その他]</div>
        <p className="interview__body_text">{remark}</p>
      </div>
      <div className="interview__body">
        <div className="interview__body_title">[措置内容]</div>
        <p className="interview__body_text">{actionContent}</p>
      </div>
      <div className="interview__body">
        <div className="interview__body_title">[職場環境の改善に関する意見]</div>
        <p className="interview__body_text">{opinionForWorkingCondition}</p>
      </div>
      <div className="interview__body">
        <div className="interview__body_title">[医療機関への受診配慮等]</div>
        <p className="interview__body_text">{considerationToMedicalInstitutions}</p>
      </div>
      <div className="interview__body">
        <div className="interview__body_title">[連絡事項等]</div>
        <p className="interview__body_text">{notice}</p>
      </div>
      <div className="interview__list interview__list-bbn">
        <div className="interview__list_item">
          <span className="interview__list_name">[医師の所属先]</span>
          {belongs}
        </div>
        <div className="interview__list_item">
          <span className="interview__list_name">[実施日時]</span>
          {`${consultationAt.date} ${consultationAt.startTime}〜${consultationAt.endTime}`}
        </div>
        <br />
        <div className="interview__list_item">
          <span className="interview__list_name">[医師の氏名]</span>
          {`${medicalAdvisorFamilyName} ${medicalAdvisorGivenName}`}
        </div>
      </div>
    </div>
  </>
)

export default ConsultationMentalDetail

import { FormikProps, withFormik } from 'formik'
import * as React from 'react'
import {
  boolean as yupBoolean,
  number as yupNumber,
  object as yupObject,
  string as yupString
} from 'yup'
import RecursiveNullable from '../../../framework/types/RecursiveNullable'
import { dayWeekMonthList } from '../../../models/DayWeekMonth'
import ConditionsToBeCorrected from '../../../swagger/model/conditionsToBeCorrected'
import ConsultationMental from '../../../swagger/model/consultationMental'
import ConsultationStatus from '../../../swagger/model/consultationStatus'
import DateAndTimeRange from '../../../swagger/model/dateAndTimeRange'
import EmployeeCompact from '../../../swagger/model/employeeCompact'
import EmploymentDiagnosis from '../../../swagger/model/employmentDiagnosis'
import InstructionCategory from '../../../swagger/model/instructionCategory'
import StateOfAccumulatedFatigue from '../../../swagger/model/stateOfAccumulatedFatigue'
import DatePicker from '../../_parts/DatePicker'
import EmployeeSuggest from '../../_parts/EmployeeSuggest'
import TimePicker from '../../_parts/TimePicker'
import BlockUI from '../../BlockUI'

interface Props {
  medicalAdvisorName: string
  initialValues: Partial<ConsultationMentalValues> | null
  consultationStatuses: ConsultationStatus[]
  stateOfAccumulatedFatigues: StateOfAccumulatedFatigue[]
  conditionsToBeCorrected: ConditionsToBeCorrected[]
  employmentDiagnoses: EmploymentDiagnosis[]
  instructionCategories: InstructionCategory[]
  fetchEmployeeSuggest: (params: {
    employeeId?: number
    name?: string
  }) => Promise<EmployeeCompact[]>
  submit: (values: ConsultationMentalValues) => void
  cancel: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export type ConsultationMentalValues = RecursiveNullable<ConsultationMental>

const initialValues: ConsultationMentalValues = {
  age: null,
  actionTerm: {
    start: '',
    end: '',
    durationUnit: '',
    durationValue: null
  },
  belongs: '',
  conditionsToBeCorrectedId: null,
  consultationAt: {
    date: '',
    startTime: '',
    endTime: ''
  },
  nextConsultationAt: {
    date: '',
    startTime: '',
    endTime: ''
  },
  employeeId: null,
  employmentDiagnosisId: null,
  employmentMedicalAdvisorId: null,
  howToBeHealthyAboutWorkingTime: {
    ban: false,
    change: false,
    noOvertime: false,
    overtimeHour: null,
    other: false,
    overtime: false,
    shortTime: false,
    shortTimeStart: '',
    shortTimeEnd: '',
    unnecessary: false
  },
  howToBeHealthyExceptWorkingTime: {
    changePlace: false,
    changeWork: false,
    other: false,
    reduceMidnight: false,
    workDaytime: false
  },
  instructionCategoryId: null,
  notice: '',
  specialMention: '',
  stateOfAccumulatedFatigueId: null,
  actionContent: '',
  conditionsToBeCorrectedDetails: '',
  considerationToMedicalInstitutions: '',
  medicalObservation: '',
  opinionForWorkingCondition: '',
  remark: '',
  workingCondition: ''
}

const validationSchemaDateAndTimeRange = yupObject<DateAndTimeRange>({
  date: yupString(),
  startTime: yupString(),
  endTime: yupString()
})

const withConsultationMedicalCheckupForm = withFormik<Props, ConsultationMentalValues>({
  mapPropsToValues(props) {
    return {
      ...initialValues,
      ...props.initialValues
    }
  },
  validationSchema: yupObject<ConsultationMentalValues>({
    age: yupNumber(),
    actionTerm: yupObject<ConsultationMentalValues['actionTerm']>({
      durationUnit: yupString().nullable(),
      durationValue: yupNumber().nullable(),
      start: yupString().nullable(),
      end: yupString().nullable()
    }),
    belongs: yupString(),
    conditionsToBeCorrectedId: yupNumber(),
    consultationAt: validationSchemaDateAndTimeRange,
    nextConsultationAt: validationSchemaDateAndTimeRange.nullable(),
    employeeId: yupNumber(),
    employmentDiagnosisId: yupNumber(),
    employmentMedicalAdvisorId: yupNumber(),
    howToBeHealthyAboutWorkingTime: yupObject<
      ConsultationMentalValues['howToBeHealthyAboutWorkingTime']
    >({
      ban: yupBoolean(),
      change: yupBoolean(),
      noOvertime: yupBoolean(),
      other: yupBoolean(),
      overtime: yupBoolean(),
      overtimeHour: yupNumber().nullable(),
      shortTime: yupBoolean(),
      shortTimeStart: yupString().nullable(),
      shortTimeEnd: yupString().nullable(),
      unnecessary: yupBoolean()
    }),
    howToBeHealthyExceptWorkingTime: yupObject<
      ConsultationMentalValues['howToBeHealthyExceptWorkingTime']
    >({
      changePlace: yupBoolean(),
      changeWork: yupBoolean(),
      other: yupBoolean(),
      reduceMidnight: yupBoolean(),
      workDaytime: yupBoolean()
    }),
    instructionCategoryId: yupNumber(),
    notice: yupString(),
    specialMention: yupString(),
    stateOfAccumulatedFatigueId: yupNumber(),
    actionContent: yupString(),
    conditionsToBeCorrectedDetails: yupString(),
    considerationToMedicalInstitutions: yupString(),
    medicalObservation: yupString(),
    opinionForWorkingCondition: yupString(),
    remark: yupString(),
    workingCondition: yupString()
  }),
  async handleSubmit(values, { props }) {
    await props.submit(values)
  }
})

const ConsultationMedicalCheckupForm: React.FunctionComponent<
  Props & FormikProps<ConsultationMentalValues>
> = ({
  conditionsToBeCorrected,
  stateOfAccumulatedFatigues,
  employmentDiagnoses,
  instructionCategories,
  isSubmitting,
  handleSubmit,
  handleChange,
  handleBlur,
  setFieldValue,
  values,
  medicalAdvisorName,
  fetchEmployeeSuggest,
  cancel
}) => {
  const handleNumberChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = isNaN(e.currentTarget.value as any)
        ? e.currentTarget.value
        : parseInt(e.currentTarget.value, 10)
      setFieldValue(e.currentTarget.name as any, value)
    },
    [setFieldValue]
  )
  return (
    <div className="l_grid l_grid-border l_grid-spaceL">
      <form action="confirmation.html" onSubmit={handleSubmit}>
        <div className="entry">
          <p className="u_slogan">下記の項目を入力し「確認」ボタンを押して下さい。</p>
          <div className="headLine">
            <h2 className="headLine__title">面接指導結果報告書</h2>
          </div>
          <div className="entry__cell">
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">氏名</div>
                <EmployeeSuggest
                  name="employeeId"
                  classNameModifier=""
                  fetchEmployeeSuggest={fetchEmployeeSuggest}
                  setFieldValue={setFieldValue}
                  handleBlur={handleBlur}
                  initialEmployeeId={values.employeeId}
                />
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">面談時年齢</div>
                <ul className="entry__radio">
                  <li className="entry__radio_item">
                    <input
                      className="u_flat u_w70"
                      type="text"
                      placeholder="40"
                      name="age"
                      value={values.age || ''}
                      onChange={handleNumberChange}
                      onBlur={handleBlur}
                    />
                    &emsp;歳
                  </li>
                </ul>
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">勤務の状況</div>
                <textarea
                  className="u_textarea"
                  rows={3}
                  placeholder="2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。"
                  name="workingCondition"
                  value={values.workingCondition}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col entry__col-inlineBlock">
                <div className="entry__col_title">疲労蓄積の状況</div>
                <ul className="entry__radio">
                  {stateOfAccumulatedFatigues.map(({ id, name }) => (
                    <li className="entry__radio_item" key={id}>
                      <input
                        type="radio"
                        id={name + id}
                        value={id}
                        name="stateOfAccumulatedFatigueId"
                        onChange={handleNumberChange}
                        onBlur={handleBlur}
                        checked={id === values.stateOfAccumulatedFatigueId}
                      />
                      <label htmlFor={name + id}>{name}</label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">医学的所見に関する特記事項</div>
                <textarea
                  className="u_textarea"
                  rows={3}
                  placeholder="2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。"
                  name="medicalObservation"
                  value={values.medicalObservation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col entry__col-inlineBlock">
                <div className="entry__col_title">その他の心身の状況</div>
                <ul className="entry__radio">
                  {conditionsToBeCorrected.map(({ id, name }) => (
                    <li className="entry__radio_item" key={id}>
                      <input
                        type="radio"
                        id={name + id}
                        value={id}
                        name="conditionsToBeCorrectedId"
                        onChange={handleNumberChange}
                        onBlur={handleBlur}
                        checked={id === values.conditionsToBeCorrectedId}
                      />
                      <label htmlFor={name + id}>{name}</label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">所見ありの場合、状況を記入する</div>
                <textarea
                  className="u_textarea"
                  rows={3}
                  placeholder="2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。"
                  name="conditionsToBeCorrectedDetails"
                  value={values.conditionsToBeCorrectedDetails}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col_title">判定区分</div>
              <div className="entry__col entry__col-inlineBlock">
                <p className="entry__col_text entry__col_text-mb10">就業区分</p>
                <ul className="entry__radio entry__radio entry__radio-mb15">
                  {employmentDiagnoses.map(({ id, name }) => (
                    <li className="entry__radio_item" key={id}>
                      <input
                        type="radio"
                        id={name + id}
                        value={id}
                        name="employmentDiagnosisId"
                        onChange={handleNumberChange}
                        onBlur={handleBlur}
                        checked={id === values.employmentDiagnosisId}
                      />
                      <label htmlFor={name + id}>{name}</label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <p className="entry__col_text entry__col_text-mb10">指導区分</p>
                <ul className="entry__radio">
                  {instructionCategories.map(({ id, name }) => (
                    <li className="entry__radio_item" key={id}>
                      <input
                        type="radio"
                        id={name + id}
                        value={id}
                        name="instructionCategoryId"
                        onChange={handleNumberChange}
                        onBlur={handleBlur}
                        checked={id === values.instructionCategoryId}
                      />
                      <label htmlFor={name + id}>{name}</label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">特記事項</div>
                <textarea
                  className="u_textarea"
                  rows={3}
                  placeholder="2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。"
                  name="specialMention"
                  value={values.specialMention}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
          </div>
          <div className="headLine">
            <h2 className="headLine__title">事後措置に係る意見書</h2>
          </div>
          <div className="entry__cell">
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">労働時間の短縮</div>
                <ul className="entry__radio">
                  <li className="entry__radio_item">
                    <input
                      type="checkbox"
                      id="workingTime1"
                      name="howToBeHealthyAboutWorkingTime.unnecessary"
                      checked={!!values.howToBeHealthyAboutWorkingTime.unnecessary}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="workingTime1">特に指示なし</label>
                  </li>
                  <li className="entry__radio_item">
                    <input
                      type="checkbox"
                      id="workingTime2"
                      name="howToBeHealthyAboutWorkingTime.overtime"
                      checked={!!values.howToBeHealthyAboutWorkingTime.overtime}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="workingTime2">時間外労働の制限</label> 
                    <input
                      className="u_flat u_w50"
                      type="text"
                      placeholder="8"
                      name="howToBeHealthyAboutWorkingTime.overtimeHour"
                      value={values.howToBeHealthyAboutWorkingTime.overtimeHour || ''}
                      onChange={handleNumberChange}
                      onBlur={handleBlur}
                    />
                     時間/月まで
                  </li>
                  <li className="entry__radio_item">
                    <input
                      type="checkbox"
                      id="workingTime3"
                      name="howToBeHealthyAboutWorkingTime.shortTime"
                      checked={!!values.howToBeHealthyAboutWorkingTime.shortTime}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="workingTime3">就業時間を制限</label> 
                    <TimePicker
                      className="u_flat u_w75"
                      placeholder="10:00"
                      name="howToBeHealthyAboutWorkingTime.shortTimeStart"
                      value={values.howToBeHealthyAboutWorkingTime.shortTimeStart || ''}
                      setFieldValue={setFieldValue}
                      onBlur={handleBlur}
                    />
                     〜 
                    <TimePicker
                      className="u_flat u_w75"
                      placeholder="11:00"
                      name="howToBeHealthyAboutWorkingTime.shortTimeEnd"
                      value={values.howToBeHealthyAboutWorkingTime.shortTimeEnd || ''}
                      setFieldValue={setFieldValue}
                      onBlur={handleBlur}
                    />
                  </li>
                  <li className="entry__radio_item">
                    <input
                      type="checkbox"
                      id="workingTime4"
                      name="howToBeHealthyAboutWorkingTime.ban"
                      checked={!!values.howToBeHealthyAboutWorkingTime.ban}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="workingTime4">就業の禁止(休暇・休養の指示）</label>
                  </li>
                </ul>
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">その他</div>
                <textarea
                  className="u_textarea"
                  rows={3}
                  placeholder="2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。"
                  name="remark"
                  value={values.remark}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">労働時間以外の項目</div>
                {/* <p className="entry__col_text entry__col_text-mb10">主要項目</p> */}
                <ul className="entry__radio">
                  <li className="entry__radio_item">
                    <input
                      type="checkbox"
                      id="notWorkingTime1"
                      name="howToBeHealthyExceptWorkingTime.changePlace"
                      checked={!!values.howToBeHealthyExceptWorkingTime.changePlace}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="notWorkingTime1">就業場所の変更</label>
                  </li>
                  <li className="entry__radio_item">
                    <input
                      type="checkbox"
                      id="notWorkingTime2"
                      name="howToBeHealthyExceptWorkingTime.changeWork"
                      checked={!!values.howToBeHealthyExceptWorkingTime.changeWork}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="notWorkingTime2">作業の転換</label>
                  </li>
                  <li className="entry__radio_item">
                    <input
                      type="checkbox"
                      id="notWorkingTime3"
                      name="howToBeHealthyExceptWorkingTime.reduceMidnight"
                      checked={!!values.howToBeHealthyExceptWorkingTime.reduceMidnight}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="notWorkingTime3">深夜業の回数の減少</label>
                  </li>
                  <li className="entry__radio_item">
                    <input
                      type="checkbox"
                      id="notWorkingTime4"
                      name="howToBeHealthyExceptWorkingTime.workDaytime"
                      checked={!!values.howToBeHealthyExceptWorkingTime.workDaytime}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="notWorkingTime4">昼間勤務への転換</label>
                  </li>
                  <li className="entry__radio_item">
                    <input
                      type="checkbox"
                      id="notWorkingTime5"
                      name="howToBeHealthyExceptWorkingTime.other"
                      checked={!!values.howToBeHealthyExceptWorkingTime.other}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="notWorkingTime5">その他</label>
                  </li>
                </ul>
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">措置内容（具体的に記入する）</div>
                <textarea
                  className="u_textarea"
                  rows={3}
                  placeholder="2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。"
                  name="actionContent"
                  value={values.actionContent}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">措置期間</div>
                <ul className="entry__radio">
                  <li className="entry__radio_item">
                    <input
                      className="u_flat u_w70"
                      type="text"
                      placeholder="8"
                      name="actionTerm.durationValue"
                      value={values.actionTerm.durationValue || ''}
                      onChange={handleNumberChange}
                      onBlur={handleBlur}
                    />
                  </li>
                  {dayWeekMonthList.map(({ label, value }) => (
                    <li className="entry__radio_item" key={value}>
                      <input
                        type="radio"
                        id={value}
                        value={value}
                        name="actionTerm.durationUnit"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={value === values.actionTerm.durationUnit}
                      />
                      <label htmlFor={value}>{label}</label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">職場環境の改善に関する意見</div>
                <textarea
                  className="u_textarea"
                  rows={3}
                  placeholder="2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。"
                  name="opinionForWorkingCondition"
                  value={values.opinionForWorkingCondition}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">医療機関への受診配慮等</div>
                <textarea
                  className="u_textarea"
                  rows={3}
                  placeholder="2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。現在、病院での治療は行っていない。"
                  name="considerationToMedicalInstitutions"
                  value={values.considerationToMedicalInstitutions}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">次回面接予定日</div>
                <p className="entry__col_text">
                  <DatePicker
                    className="u_flat u_w160"
                    placeholder="2018-02-20"
                    name="nextConsultationAt.date"
                    value={(values.nextConsultationAt && values.nextConsultationAt.date) || ''}
                    setFieldValue={setFieldValue}
                    onBlur={handleBlur}
                  />
                  &emsp;&emsp;
                  <TimePicker
                    className="u_flat u_w75"
                    placeholder="10:00"
                    name="nextConsultationAt.startTime"
                    value={(values.nextConsultationAt && values.nextConsultationAt.startTime) || ''}
                    setFieldValue={setFieldValue}
                    onBlur={handleBlur}
                  />
                   〜 
                  <TimePicker
                    className="u_flat u_w75"
                    placeholder="11:00"
                    name="nextConsultationAt.endTime"
                    value={(values.nextConsultationAt && values.nextConsultationAt.endTime) || ''}
                    setFieldValue={setFieldValue}
                    onBlur={handleBlur}
                  />
                </p>
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">連絡事項等</div>
                <textarea
                  className="u_textarea"
                  rows={2}
                  placeholder="2016年度の健康診断から高血圧を指摘されている。2017年4月に実施した健康診断では、血圧が180/95であった。本日の面談時も170/92と高値である。"
                  name="notice"
                  value={values.notice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">実施日時</div>
                <p className="entry__col_text">
                  <DatePicker
                    className="u_flat u_w160"
                    placeholder="2018-02-20"
                    name="consultationAt.date"
                    value={values.consultationAt.date}
                    setFieldValue={setFieldValue}
                    onBlur={handleBlur}
                  />
                  &emsp;&emsp;
                  <TimePicker
                    className="u_flat u_w75"
                    placeholder="10:00"
                    name="consultationAt.startTime"
                    value={values.consultationAt.startTime}
                    setFieldValue={setFieldValue}
                    onBlur={handleBlur}
                  />
                   〜 
                  <TimePicker
                    className="u_flat u_w75"
                    placeholder="11:00"
                    name="consultationAt.endTime"
                    value={values.consultationAt.endTime}
                    setFieldValue={setFieldValue}
                    onBlur={handleBlur}
                  />
                </p>
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">医師の所属先</div>
                <input
                  className="u_flat u_w300"
                  type="text"
                  placeholder="渋谷病院"
                  name="belongs"
                  value={values.belongs}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">医師の氏名</div>
                <input className="u_flat u_w300" type="text" value={medicalAdvisorName} disabled />
              </div>
            </div>
          </div>
        </div>
        <div className="l_switch">
          <div className="l_switch__w2">
            <button className="u_switch u_switch-white" type="button" onClick={cancel}>
              キャンセル
            </button>
          </div>
          <div className="l_switch__w2">
            <button className="u_switch u_switch-blue" type="submit">
              確認
            </button>
          </div>
        </div>
      </form>
      {isSubmitting ? <BlockUI /> : null}
    </div>
  )
}

export default withConsultationMedicalCheckupForm(ConsultationMedicalCheckupForm)

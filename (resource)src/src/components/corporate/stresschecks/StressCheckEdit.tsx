import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import getYear from 'date-fns/getYear'
import isAfter from 'date-fns/isAfter'
import isValid from 'date-fns/isValid'
import parseISO from 'date-fns/parseISO'
import { FormikErrors, withFormik } from 'formik'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { corporateStresschecksSetting } from '../../../config/Url'
import StressCheckProject from '../../../swagger/model/stressCheckProject'
import { formatDate } from '../../../util/DateHelper'
import DatePicker from '../../_parts/DatePicker'

interface Props {
  project: StressCheckProject | null
  isNew: boolean
  submit: (params: Values) => void
  questionnaireId: number
}

export interface Values {
  name: string
  year: number
  start: string
  end: string
  purpose: string
  examinee: string
  operator: string
  regulations: string
  aboutDisclosure: string
  encouragement: string
  questionnaireId: number
  pointOfConversionMethodB1: number
  pointOfConversionMethodB2: number
  pointOfConversionMethodC2: number
  // hope: string
}

const StressCheckEdit = withFormik<Props, Values>({
  mapPropsToValues({ project, questionnaireId: questionnaireId }) {
    const today = new Date()

    return {
      name: project ? project.name : '',
      year: project ? project.year : getYear(today),
      start: project
        ? project.period.start
        : formatDate(
          ((day: Date) => new Date(day.getFullYear(), day.getMonth(), 1))(addMonths(today, 1))
        ), // 翌月1日
      end: project
        ? project.period.end
        : formatDate(
          addDays(
            ((day: Date) => new Date(day.getFullYear(), day.getMonth(), 1))(addMonths(today, 4)),
            -1
          )
        ), // 3ヶ月後の月末
      purpose: project ? project.purpose : ``,
      examinee: project ? project.examinee : ``,
      operator: project ? project.operator : ``,
      regulations: project ? project.regulations : ``,
      aboutDisclosure: project ? project.aboutDisclosure : ``,
      encouragement: project ? project.encouragement : ``,
      questionnaireId: project ? project.questionnaireId : questionnaireId,
      pointOfConversionMethodB1: project ? project.pointOfConversionMethodB1 : 12,
      pointOfConversionMethodB2: project ? project.pointOfConversionMethodB2 : 26,
      pointOfConversionMethodC2: project ? project.pointOfConversionMethodC2 : 17
      // hope: project ? project.hope : ``,
    }
  },
  validate(values) {
    const errors: FormikErrors<Values> = {}
    if (!values.name || !values.name.trim()) {
      errors.name = 'タイトルを入力してください'
    }
    if (!values.year) {
      errors.year = '年度を入力してください'
    } else if ((values.year + '').trim().length < 4) {
      errors.year = '4桁で入力してください'
    }
    const startValid = isValid(parseISO(values.start))
    const endValid = isValid(parseISO(values.end))
    if (!startValid) {
      errors.start = '開始日が無効です'
    }
    if (!endValid) {
      errors.end = '終了日が無効です'
    }
    if (startValid && endValid && !isAfter(parseISO(values.end), parseISO(values.start))) {
      errors.start = '開始日が終了日より後になっています'
    }
    if (!values.purpose || !values.purpose.trim()) {
      errors.purpose = '目的を入力してください'
    }
    if (!values.examinee || !values.examinee.trim()) {
      errors.examinee = '受診対象者を入力してください'
    }
    if (!values.operator || !values.operator.trim()) {
      errors.operator = '実施者・共同実施者を入力してください'
    }
    if (!values.regulations || !values.regulations.trim()) {
      errors.regulations = 'データの取り扱いについて入力してください'
    }
    if (!values.aboutDisclosure || !values.aboutDisclosure.trim()) {
      errors.aboutDisclosure = '開示について入力してください'
    }
    if (!values.encouragement || !values.encouragement.trim()) {
      errors.encouragement = '面談勧奨について入力してください'
    }
    if (!values.pointOfConversionMethodB1) {
      errors.pointOfConversionMethodB1 = '入力してください'
    }
    if (!values.pointOfConversionMethodB2) {
      errors.pointOfConversionMethodB2 = '入力してください'
    }
    if (!values.pointOfConversionMethodC2) {
      errors.pointOfConversionMethodC2 = '入力してください'
    }
    // if (!values.hope) {
    //   errors.hope = '選択してください'
    // }
    return errors
  },
  handleSubmit(values, { props, setSubmitting, setStatus }) {
    try {
      props.submit(values)
    } catch (e) {
      setSubmitting(false)
      setStatus(e)
    }
  }
})(
  ({
    values,
    project,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    status,
    errors,
    isNew,
    setFieldValue
  }) => (
      <>
        <div className="head">
          <h1 className="head__title">
            {isNew ? 'ストレスチェックの新規登録' : `${values.year}年ストレスチェック`}
          </h1>
        </div>

        <div className="l_grid l_grid-border l_grid-spaceL">
          <form onSubmit={handleSubmit}>
            <div className="entry">
              {isNew ? (
                <p className="u_slogan">下記の項目を入力し「確認」ボタンを押して下さい。</p>
              ) : null}
              <div className="headLine">
                <h2 className="headLine__title">基本情報</h2>
              </div>

              <div className="entry__cell">
                <span>{status}</span>
                <div className="entry__row">
                  <div className="entry__col">
                    <div className="entry__col_title">年度</div>
                    <div className="entry__select entry__select-w150">
                      <ul className="entry__list">
                        <li className="entry__list_item">
                          <label className="triangles" htmlFor="year">
                            <select
                              id="year"
                              name="year"
                              // className={!(touched.year && errors.year) ? '' : 'u_errorBorder'}
                              value={values.year}
                              onChange={handleChange}
                            >
                              <option value={values.year - 1}>{values.year - 1}年</option>
                              <option value={values.year}>{values.year}年</option>
                              <option value={values.year + 1}>{values.year + 1}年</option>
                            </select>
                          </label>
                          {/* <div className="entry__col_error">{touched.year && errors.year}</div> */}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="entry__row">
                  <div className="entry__col">
                    <div className="entry__col_title">タイトル</div>
                    <label htmlFor="name" />
                    <input
                      className={
                        !(touched.name && errors.name)
                          ? 'u_flat u_w655'
                          : 'u_flat u_w655 u_errorBorder'
                      }
                      type="text"
                      name="name"
                      id="name"
                      placeholder="ストレスチェック"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name ? (
                      <div className="entry__col_error">{touched.name && errors.name}</div>
                    ) : null}
                  </div>
                </div>

                <div className="entry__row">
                  <div className="entry__col">
                    <div className="entry__col_title">実施期間</div>
                    <p className="entry__col_text">
                      <label htmlFor="start" />
                      <DatePicker
                        className={
                          !(touched.start && errors.start)
                            ? 'u_flat u_w160'
                            : 'u_flat u_w160 u_errorBorder'
                        }
                        name="start"
                        id="start"
                        value={values.start}
                        setFieldValue={setFieldValue}
                        onBlur={handleBlur}
                      />
                      &emsp;&#12316;&emsp;
                        <label htmlFor="end" />
                      <DatePicker
                        className={
                          !(touched.end && errors.end)
                            ? 'u_flat u_w160'
                            : 'u_flat u_w160 u_errorBorder'
                        }
                        name="end"
                        id="end"
                        value={values.end}
                        setFieldValue={setFieldValue}
                        onBlur={handleBlur}
                      />
                      {errors.start ? (
                        <div className="entry__col_error">{touched.start && errors.start}</div>
                      ) : null}
                      {errors.end ? (
                        <div className="entry__col_error">{touched.end && errors.end}</div>
                      ) : null}
                    </p>
                  </div>
                </div>
                <div className="entry__row entry__row-mb20">
                  <div className="entry__col_title">高ストレス者設定</div>
                  <div className="entry__col_titleS">○素点換算を用いた評価点方式</div>
                  <div className="entry__col entry__col-w300L">
                    <ul className="entry__list">
                      <li className="entry__list_item">
                        ①心身のストレス反応&ensp;
                      <label htmlFor="pointOfConversionMethodB1" />
                        <input
                          className={
                            !(touched.pointOfConversionMethodB1 && errors.pointOfConversionMethodB1)
                              ? 'u_flat u_w50'
                              : 'u_flat u_w50 u_errorBorder'
                          }
                          type="number"
                          name="pointOfConversionMethodB1"
                          id="pointOfConversionMethodB1"
                          value={values.pointOfConversionMethodB1}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        &ensp;点以上
                      </li>
                      {errors.pointOfConversionMethodB1 ? (
                        <div className="entry__col_error">
                          {touched.pointOfConversionMethodB1 && errors.pointOfConversionMethodB1}
                        </div>
                      ) : null}
                    </ul>
                  </div>
                  <div className="entry__col entry__col-w340R">
                    <ul className="entry__list">
                      <li className="entry__list_item">
                        ②仕事のストレス要因＋周囲のサポート&ensp;
                      <label htmlFor="pointOfConversionMethodC2" />
                        <input
                          className={
                            !(touched.pointOfConversionMethodC2 && errors.pointOfConversionMethodC2)
                              ? 'u_flat u_w50'
                              : 'u_flat u_w50 u_errorBorder'
                          }
                          type="number"
                          name="pointOfConversionMethodC2"
                          id="pointOfConversionMethodC2"
                          value={values.pointOfConversionMethodC2}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        &ensp;点以上
                        {errors.pointOfConversionMethodC2 ? (
                          <div className="entry__col_error">
                            {touched.pointOfConversionMethodC2 && errors.pointOfConversionMethodC2}
                          </div>
                        ) : null}
                      </li>
                      <li className="entry__list_item">
                        <span className="entry__list_left">かつ</span>心身のストレス反応&ensp;
                      <label htmlFor="pointOfConversionMethodB2" />
                        <input
                          className={
                            !(touched.pointOfConversionMethodB2 && errors.pointOfConversionMethodB2)
                              ? 'u_flat u_w50'
                              : 'u_flat u_w50 u_errorBorder'
                          }
                          type="number"
                          name="pointOfConversionMethodB2"
                          id="pointOfConversionMethodB2"
                          value={values.pointOfConversionMethodB2}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        &ensp;点以上
                        {errors.pointOfConversionMethodB2 ? (
                          <div className="entry__col_error">
                            {touched.pointOfConversionMethodB2 && errors.pointOfConversionMethodB2}
                          </div>
                        ) : null}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="entry__row">
                  <div className="entry__col">
                    <div className="entry__col_title">面談フォーム希望設定</div>
                    <ul className="entry__radio">
                      <li className="entry__radio_item">
                        <input
                          type="radio"
                          name="hope"
                          id="hope1"
                          value={String(1)}
                        //  checked={values.hope === '1'}
                        />
                        <label htmlFor="hope1">全受検者に表示</label>
                      </li>
                      <li className="entry__radio_item">
                        <input
                          type="radio"
                          name="hope"
                          id="hope2"
                          value={String(2)}
                        //  checked={values.hope === '2'}
                        />
                        <label htmlFor="hope2">高ストレス者と面談対象者に表示</label>
                      </li>
                      <li className="entry__radio_item">
                        <input
                          type="radio"
                          name="hope"
                          id="hope3"
                          value={String(3)}
                        //  checked={values.hope === '3'}
                        />
                        <label htmlFor="hope3">面談対象者のみに表示</label>
                      </li>
                      <li className="entry__radio_item">
                        <input
                          type="radio"
                          name="hope"
                          id="hope0"
                          // value={String(0)}
                          checked={isNew}
                        />
                        <label htmlFor="hope0">表示しない</label>
                      </li>
                    </ul>
                    {/* <div className="entry__col_error">{touched.hope && errors.hope}</div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="entry">
              <div className="headLine">
                <h2 className="headLine__title">従業員へのメッセージ</h2>
              </div>
              <div className="entry__cell">
                <div className="entry__row">
                  <div className="entry__col">
                    <div className="entry__col_title">ストレスチェックの目的</div>
                    <label htmlFor="purpose" />
                    <textarea
                      // className="u_textarea"
                      className={
                        !(touched.purpose && errors.purpose)
                          ? 'u_textarea'
                          : 'u_textarea u_errorBorder'
                      }
                      name="purpose"
                      id="purpose"
                      value={values.purpose}
                      // placeholder="会社では従来より、心の健康管理の一環として、定期健康診断における問診を始めとし産業医・保健師への相談窓口設置やメンタルルス研修等を行っておりますが、今般、従来施策とは別のものとして、セルフケア(一人ひとりが行う自身の健康管理)のさらなる充実化および動きやすい職場環境の形成を目的に、労働安全衛生法に基づき、産業医・保健師を実施者としたストレスチェックを実施しています。"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.purpose ? (
                      <div className="entry__col_error">
                        {touched.purpose && errors.purpose}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="entry__row">
                  <div className="entry__col">
                    <div className="entry__col_title">受診対象者</div>
                    <label htmlFor="examinee" />
                    <textarea
                      // className="u_textarea"
                      className={
                        !(touched.examinee && errors.examinee)
                          ? 'u_textarea'
                          : 'u_textarea u_errorBorder'
                      }
                      name="examinee"
                      id="examinee"
                      value={values.examinee}
                      // placeholder="●2016年8月31日以前に就業開始している方 ・実施期間中に雇用契約がある方
                      // 上記の目的から、できるだけ多くの社員(できれば対象者全員)に実施していただきますよう、お願い申し上げます。ただし、今回のストレスチェックを受けない場合でも、会社側からの不利益な取扱い等は一切ございません。"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.examinee ? (
                      <div className="entry__col_error">
                        {touched.examinee && errors.examinee}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="entry__row">
                  <div className="entry__col">
                    <div className="entry__col_title">ご回答いただいたデータの取り扱い</div>
                    <label htmlFor="regulations" />
                    <textarea
                      // className="u_textarea"
                      className={
                        !(touched.regulations && errors.regulations)
                          ? 'u_textarea'
                          : 'u_textarea u_errorBorder'
                      }
                      name="regulations"
                      id="regulations"
                      value={values.regulations}
                      // placeholder="ご回答いただいた個人のストレスチェック結果については、ご回答直後からご自身で確認・閲覧・印刷できますので、自己管理にお役立て下さい。ご回答いただいた個人のストレスチェック結果に基づき、個人の健康管理を目的として産業医・保健師のみが確認し、必要に応じて面接推奨のご連絡を個別に差し上げます。個人の結果が外部(上司・人事部門等)に漏れることは、一切ありません。また、職場全体のストレス傾向の把握を目的に、個人が特定できないようストレスチェック結果を加工し、分析および報告書作成に使用します。"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.regulations ? (
                      <div className="entry__col_error">
                        {touched.regulations && errors.regulations}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="entry__row">
                  <div className="entry__col">
                    <div className="entry__col_title">開示について</div>
                    <label htmlFor="aboutDisclosure" />
                    <textarea
                      // className="u_textarea"
                      className={
                        !(touched.aboutDisclosure && errors.aboutDisclosure)
                          ? 'u_textarea'
                          : 'u_textarea u_errorBorder'
                      }
                      name="aboutDisclosure"
                      id="aboutDisclosure"
                      value={values.aboutDisclosure}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.aboutDisclosure ? (
                      <div className="entry__col_error">
                        {touched.aboutDisclosure && errors.aboutDisclosure}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="entry__row">
                  <div className="entry__col">
                    <div className="entry__col_title">高ストレス者に対する面談勧奨</div>
                    <label htmlFor="encouragement" />
                    <textarea
                      // className="u_textarea"
                      className={
                        !(touched.encouragement && errors.encouragement)
                          ? 'u_textarea'
                          : 'u_textarea u_errorBorder'
                      }
                      name="encouragement"
                      id="encouragement"
                      value={values.encouragement}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.encouragement ? (
                      <div className="entry__col_error">
                        {touched.encouragement && errors.encouragement}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="entry">
              <div className="headLine">
                <h2 className="headLine__title">実施体制</h2>
              </div>
              <div className="entry__cell">
                <div className="entry__row">
                  <div className="entry__col">
                    <div className="entry__col_title">実施者・共同実施者</div>
                    <label htmlFor="operator" />
                    <input
                      // className="u_flat u_w390"
                      className={
                        !(touched.operator && errors.operator)
                          ? 'u_flat u_w390'
                          : 'u_flat u_w390 u_errorBorder'
                      }
                      type="text"
                      name="operator"
                      id="operator"
                      value={values.operator}
                      placeholder="産業医 小川 達也"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.operator ? (
                      <div className="entry__col_error">
                        {touched.operator && errors.operator}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="l_switch">
              <div className="l_switch__w2">
                <Link className="u_switch u_switch-white" to={corporateStresschecksSetting}>
                  キャンセル
              </Link>
              </div>
              <div className="l_switch__w2">
                <button className="u_switch u_switch-blue" type="submit">
                  確認
              </button>
              </div>
            </div>
          </form>
        </div>
      </>
    )
)

export default StressCheckEdit

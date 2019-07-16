import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import getYear from 'date-fns/getYear'
import isAfter from 'date-fns/isAfter'
import isValid from 'date-fns/isValid'
import parseISO from 'date-fns/parseISO'
import { FormikErrors, withFormik } from 'formik'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { corporateCheckupsSetting } from '../../../config/Url'
import MedicalCheckupProjectMetadata from '../../../swagger/model/medicalCheckupProjectMetadata'
import { formatDate } from '../../../util/DateHelper'
import DatePicker from '../../_parts/DatePicker'

interface Props {
  project: MedicalCheckupProjectMetadata | null
  isNew: boolean
  submit: (params: Values) => void
}

export interface Values {
  name: string
  year: number
  start: string
  end: string
}

const CheckupEdit = withFormik<Props, Values>({
  mapPropsToValues({ project }) {
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
        ) // 3ヶ月後の月末
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
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    status,
    errors,
    isNew,
    project,
    setFieldValue
  }) => (
      <>
        <div className="head">
          <h1 className="head__title">{isNew ? '健康診断新規登録' : `${project!.year}年健康診断`}</h1>
        </div>

        <div className="l_grid l_grid-border l_grid-spaceL">
          <form onSubmit={handleSubmit}>
            <div className="entry">
              <span className="u_slogan">下記の項目を入力し「確認」ボタンを押して下さい。</span>
              <br />
              <small>※従業員情報に登録済みの、在籍している全従業員が登録されます。</small>
              <div className="headLine">
                <h2 className="headLine__title">入力情報</h2>
              </div>

              <div className="entry__cell">
                <span>{status}</span>
                <div className="entry__row">
                  <div className="entry__col">
                    <div className="entry__col_title">年度</div>
                    <div className="entry__select entry__select-w150">
                      <label className="triangles" htmlFor="year">
                        <select
                          id="year"
                          name=""
                          className={
                            !(touched.year && errors.year)
                              ? 'u_flat u_w200'
                              : 'u_flat u_w200 u_errorBorder'
                          }
                        >
                          <option value={values.year - 1}>{values.year - 1}年</option>
                          <option value={values.year} selected>
                            {values.year}年
                            </option>
                          <option value={values.year + 1}>{values.year + 1}年</option>
                        </select>
                      </label>
                      {errors.year ? (<div className="entry__col_error">{touched.year && errors.year}</div>
                      ) : null}
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
                      placeholder="関東エリア健康診断"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name ? (<div className="entry__col_error">{touched.name && errors.name}</div>
                    ) : null}
                  </div>
                  <small>※タイトルには組織名、部署名、エリアに紐付けると管理しやすいです。</small>
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
                        placeholder="2019-04-10"
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
                        placeholder="2019-04-15"
                        value={values.end}
                        setFieldValue={setFieldValue}
                        onBlur={handleBlur}
                      />
                      {errors.start ? (<div className="u_w260 entry__col_error">{touched.start && errors.start}</div>
                      ) : null}
                      {errors.end ? (<div className="u_w260 entry__col_error">{touched.end && errors.end}</div>
                      ) : null}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="l_switch">
              <div className="l_switch__w2">
                <Link className="u_switch u_switch-white" to={corporateCheckupsSetting}>
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

export default CheckupEdit

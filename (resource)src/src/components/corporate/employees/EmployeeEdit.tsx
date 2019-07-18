import { FormikErrors, withFormik } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom'
import { corporateEmployeeDetailUrl, corporateEmployees } from '../../../config/Url'
import EmployeePost from '../../../swagger/model/employeePost'
import { CombinedUnitPath } from '../../../util/DepartmentHelper'
import DepartmentSuggest from '../../_parts/DepartmentSuggest'

const dicSex = { 男性: 'male', 女性: 'female' }
interface Props {
  isNew: boolean
  employeeId: number | null
  employeePost: EmployeePost
  units: CombinedUnitPath[]
  submit: (params: Values) => void
}

export type Values = EmployeePost

const EmployeeEdit = withFormik<Props, Values>({
  mapPropsToValues({ employeePost }) {
    return employeePost
  },
  validate(values: Values) {
    const errors: FormikErrors<Values> = {}
    if (!values.employeeCode || !values.employeeCode.trim()) {
      errors.employeeCode = '社員コードを入力してください'
    }
    if (!values.familyName || !values.familyName.trim()) {
      errors.familyName = '氏名（姓）を入力してください'
    }
    if (!values.givenName || !values.givenName.trim()) {
      errors.givenName = '氏名（名）を入力してください'
    }
    if (!values.familyNameKana || !values.familyNameKana.trim()) {
      errors.familyNameKana = 'フリガナ（姓）を入力してください'
    }
    if (!values.givenNameKana || !values.givenNameKana.trim()) {
      errors.givenNameKana = 'フリガナ（名）を入力してください'
    }
    if (!values.birthday || !values.birthday.trim()) {
      errors.birthday = '生年月日を入力してください'
    }
    if (!values.sex || !values.sex.trim()) {
      errors.sex = '選択してください'
    }
    if (!values.businessMail || !values.businessMail.trim()) {
      errors.businessMail = 'メールアドレスを入力してください'
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
    employeeId,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    isNew,
    units
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
      <>
        <div className="head">
          <h1 className="head__title">{isNew ? '従業員新規登録' : `従業員編集`}</h1>
        </div>

        <div className="l_grid l_grid-border l_grid-spaceL">
          <form onSubmit={handleSubmit}>
            <div className="entry">
              <p className="u_slogan">下記の項目を入力し「確認」ボタンを押して下さい。</p>
              <div className="headLine">
                <h2 className="headLine__title">基本情報</h2>
              </div>
              <div className="entry__cell">
                <div className="entry__row">
                  <div className="entry__col">
                    <div className="entry__col_title">
                      <span className="entry__required">必須</span>社員コード
                    </div>
                    <input
                      id="employeeCode"
                      name="employeeCode"
                      className={
                        !(touched.employeeCode && errors.employeeCode)
                          ? 'u_flat u_w200'
                          : 'u_flat u_w200 u_errorBorder'
                      }
                      type="text"
                      placeholder="TEST01"
                      value={values.employeeCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.employeeCode ? (
                      <div className="entry__col_error">
                        {touched.employeeCode && errors.employeeCode}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="entry__row">
                  <div className="entry__col entry__col-w50p">
                    <div className="entry__col_title">
                      <span className="entry__required">必須</span>氏名（姓）
                    </div>
                    <input
                      id="familyName"
                      name="familyName"
                      className={
                        !(touched.familyName && errors.familyName)
                          ? 'u_flat u_w300p'
                          : 'u_flat u_w300p u_errorBorder'
                      }
                      type="text"
                      placeholder="大野"
                      value={values.familyName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.familyName ? (
                      <div className="entry__col_error">
                        {touched.familyName && errors.familyName}
                      </div>
                    ) : null}
                  </div>
                  <div className="entry__col entry__col-w50p">
                    <div className="entry__col_title">
                      <span className="entry__required">必須</span>氏名（名）
                    </div>
                    <input
                      id="givenName"
                      name="givenName"
                      className={
                        !(touched.givenName && errors.givenName)
                          ? 'u_flat u_w300p'
                          : 'u_flat u_w300p u_errorBorder'
                      }
                      type="text"
                      placeholder="拓郎"
                      value={values.givenName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.givenName ? (
                      <div className="entry__col_error">
                        {touched.givenName && errors.givenName}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="entry__row">
                  <div className="entry__col entry__col-w50p">
                    <div className="entry__col_title">
                      <span className="entry__required">必須</span>フリガナ（姓）
                    </div>
                    <input
                      id="familyNameKana"
                      name="familyNameKana"
                      className={
                        !(touched.familyNameKana && errors.familyNameKana)
                          ? 'u_flat u_w300p'
                          : 'u_flat u_w300p u_errorBorder'
                      }
                      type="text"
                      placeholder="オオノ"
                      value={values.familyNameKana}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.familyNameKana ? (
                      <div className="entry__col_error">
                        {touched.familyNameKana && errors.familyNameKana}
                      </div>

                    ) : null}
                  </div>
                  <div className="entry__col entry__col-w50p">
                    <div className="entry__col_title">
                      <span className="entry__required">必須</span>フリガナ（名）
                    </div>
                    <input
                      id="givenNameKana"
                      name="givenNameKana"
                      className={
                        !(touched.givenNameKana && errors.givenNameKana)
                          ? 'u_flat u_w300p'
                          : 'u_flat u_w300p u_errorBorder'
                      }
                      type="text"
                      placeholder="タクロウ"
                      value={values.givenNameKana}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />{errors.givenNameKana ? (<div className="entry__col_error">
                      {touched.givenNameKana && errors.givenNameKana}
                    </div>
                    ) : null}
                  </div>
                </div>
                <div className="entry__row">
                  <div className="entry__col entry__col-w50p">
                    <div className="entry__col_title">
                      <span className="entry__required">必須</span>生年月日
                    </div>
                    <input
                      id="birthday"
                      name="birthday"
                      className={
                        !(touched.birthday && errors.birthday)
                          ? 'u_flat u_w300p'
                          : 'u_flat u_w300p u_errorBorder'
                      }
                      type="date"
                      placeholder="1990-05-20"
                      value={values.birthday}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.birthday ? (<div className="entry__col_error">
                      {touched.birthday && errors.birthday}
                    </div>
                    ) : null}
                  </div>
                </div>
                <div className="entry__row">
                  <div className="entry__col">
                    <div className="entry__col_title">
                      <span className="entry__required">必須</span>性別
                    </div>
                    <div className="entry__select entry__select-w80">
                      <label className="triangles" htmlFor="sex">
                        <select
                          value={dicSex[values.sex]}
                          id="sex"
                          name="sex"
                          className={
                            !(touched.sex && errors.sex)
                              ? 'u_flat u_w300p'
                              : 'u_flat u_w300p u_errorBorder'
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="" />
                          <option value="male">男性</option>
                          <option value="female">女性</option>
                        </select>
                      </label>
                      {errors.sex ? (<div className="entry__col-w160 entry__col_error">{touched.sex && errors.sex}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="headLine">
                <h2 className="headLine__title">ログイン可否</h2>
              </div>
              <div className="entry__cell">
                <div className="entry__row">
                  <div className="entry__col">
                    <ul className="entry__radio">
                      <li className="entry__radio_item">
                        <input
                          type="radio"
                          name="signinAssignment"
                          id="hasSigninAssignment"
                          value={1}
                          onChange={handleNumberChange}
                          checked={!!values.signinAssignment}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="hasSigninAssignment">可</label>
                      </li>
                      <li className="entry__radio_item">
                        <input
                          type="radio"
                          name="signinAssignment"
                          id="noSigninAssignment"
                          value={0}
                          onChange={handleNumberChange}
                          checked={!values.signinAssignment}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="noSigninAssignment">不可</label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="headLine">
                <h2 className="headLine__title">閲覧権限</h2>
              </div>
              <div className="entry__cell">
                <div className="entry__row">
                  <div className="entry__col">
                    <ul className="entry__radio">
                      <li className="entry__radio_item">
                        <input
                          type="checkbox"
                          name="managerAssignment"
                          id="managerAssignment"
                          onChange={handleChange}
                          checked={values.managerAssignment}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="managerAssignment">管理者</label>
                      </li>
                      <li className="entry__radio_item">
                        <input
                          type="checkbox"
                          name="stresscheckOperatorAssignment"
                          id="stresscheckOperatorAssignment"
                          onChange={handleChange}
                          checked={values.stresscheckOperatorAssignment}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="stresscheckOperatorAssignment">実施者</label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="headLine">
                <h2 className="headLine__title">職場連絡先情報</h2>
              </div>
              <div className="entry__cell">
                <div className="entry__row">
                  <div className="entry__col entry__col-w50p">
                    <div className="entry__col_title">
                      {values.signinAssignment ? (
                        <span className="entry__required">必須</span>
                      ) : null}
                      社内E-MAIL
                    </div>
                    <input
                      id="businessMail"
                      name="businessMail"
                      className={
                        !(touched.businessMail && errors.businessMail && values.signinAssignment)
                          ? 'u_flat u_w300p'
                          : 'u_flat u_w300p u_errorBorder'
                      }
                      type="text"
                      placeholder="koyama@micro.co.jp"
                      value={values.businessMail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.businessMail ? (
                    <div className="entry__col_error">
                      {touched.businessMail && errors.businessMail}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="headLine">
                <h2 className="headLine__title">部署</h2>
              </div>
              <div className="entry__cell">
                <div className="entry__row">
                  <div className="entry__col entry__col-w50p">
                    <div className="entry__col_title">部署</div>
                    <DepartmentSuggest
                      classNameModifier=""
                      name="organizationUnitId"
                      initialUnitId={values.organizationUnitId}
                      units={units}
                      setFieldValue={setFieldValue}
                      handleBlur={handleBlur}
                    />
                  </div>
                </div>
              </div>

              <div className="l_switch">
                <div className="l_switch__w2">
                  <Link
                    className="u_switch u_switch-white"
                    to={employeeId ? corporateEmployeeDetailUrl(employeeId) : corporateEmployees}
                  >
                    キャンセル
                  </Link>
                </div>
                <div className="l_switch__w2">
                  <button className="u_switch u_switch-blue" type="submit">
                    確認
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  }
)

export default EmployeeEdit

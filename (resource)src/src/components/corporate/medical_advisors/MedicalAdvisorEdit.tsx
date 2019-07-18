import MedicalAdvisor from '../../../swagger/model/medicalAdvisorRequest'
import { corporateMedicalAdvisors } from '../../../config/Url'
import { withFormik, FormikErrors } from 'formik'
import * as React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  isNew: boolean
  medicalAdvisor: MedicalAdvisor | null
  submit: (params: Values) => void
}

export interface Values {
  signin_assignment: string
  familyName: string
  givenName: string
  userName: string
}

const MedicalAdvisorEdit = withFormik<Props, Values>({
  mapPropsToValues({ medicalAdvisor }) {
    return {
      signin_assignment: medicalAdvisor ? (medicalAdvisor.signinAssignment ? '1' : '0') : '1',
      familyName: medicalAdvisor ? medicalAdvisor.familyName : '',
      givenName: medicalAdvisor ? medicalAdvisor.givenName : '',
      userName: medicalAdvisor ? medicalAdvisor.username : ''
    }
  },
  validate(values) {
    const errors: FormikErrors<Values> = {}
    if (!values.familyName || !values.familyName.trim()) {
      errors.familyName = '氏名（姓）を入力してください'
    }
    if (!values.givenName || !values.givenName.trim()) {
      errors.givenName = '氏名（名）を入力してください'
    }
    if (!values.userName || !values.userName.trim()) {
      errors.userName = 'ログインIDを入力してください'
    }
    return errors
  },
  handleSubmit(values, { props, setSubmitting }) {
    try {
      props.submit(values)
    } catch (e) {
      setSubmitting(false)
    }
  }
})((
  { values, handleSubmit, handleChange, handleBlur, touched, errors, isNew, medicalAdvisor } // errors, // touched,
) => (
    <>
      <div className="head">
        <h1 className="head__title">{isNew ? '産業医新規登録' : `産業医編集`}</h1>
      </div>

      <div className="l_grid l_grid-border l_grid-spaceL">
        <form onSubmit={handleSubmit}>
          <div className="entry">
            <div className="headLine">
              <h2 className="headLine__title">基本情報</h2>
            </div>
            <div className="entry__cell">
              <div className="entry__row">
                <div className="entry__col entry__col-w50p">
                  <div className="entry__col_title">
                    <span className="entry__required">必須</span>氏名（姓）
                </div>
                  <input
                    className={
                      !(touched.familyName && errors.familyName)
                        ? 'u_flat u_w300p'
                        : 'u_flat u_w300p u_errorBorder'
                    }
                    type="text"
                    placeholder="大野"
                    id="familyName"
                    name="familyName"
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
                  <ul className="entry__list">
                    <li className="entry__list_item">
                      <input
                        className={
                          !(touched.givenName && errors.givenName)
                            ? 'u_flat u_w300p'
                            : 'u_flat u_w300p u_errorBorder'
                        }
                        type="text"
                        placeholder="拓郎"
                        id="givenName"
                        name="givenName"
                        value={values.givenName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div className="entry__col_error">{touched.givenName && errors.givenName}</div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="entry__row">
                <div className="entry__col entry__col-w100p">
                  <div className="entry__col_title">
                    {values.signin_assignment === '0' ||
                      (medicalAdvisor &&
                        medicalAdvisor.signinAssignment &&
                        values.signin_assignment === '1') ? null : (
                        <span className="entry__required">必須</span>
                      )}
                    ログインID
                </div>
                  <ul className="entry__list">
                    <li className="entry__list_item">
                      {values.signin_assignment === '0' ||
                        (medicalAdvisor &&
                          medicalAdvisor.signinAssignment &&
                          values.signin_assignment === '1') ? (
                          <>
                            {
                              <input
                                className="u_flat u_w300p"
                                type="text"
                                placeholder="koyama@micro.co.jp"
                                id="userName"
                                name="userName"
                                value={values.userName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={true}
                              />
                            }
                          </>
                        ) : (
                          <>
                            {
                              <input
                                className={
                                  !(touched.userName && errors.userName)
                                    ? 'u_flat u_w300p'
                                    : 'u_flat u_w300p u_errorBorder'
                                }
                                type="text"
                                placeholder="koyama@micro.co.jp"
                                id="userName"
                                name="userName"
                                value={values.userName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={false}
                              />
                            }
                            {
                              <div className="entry__col_error">
                                {touched.userName && errors.userName}
                              </div>
                            }
                          </>
                        )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="headLine">
              <h2 className="headLine__title">ログイン可否（新規登録時は変更不可）</h2>
            </div>
            <div className="entry__cell">
              <div className="entry__row">
                <div className="entry__col">
                  <ul className="entry__radio">
                    <li className="entry__radio_item">
                      <input
                        type="radio"
                        name="signin_assignment"
                        id="hasSigninAssignment"
                        value={String(1)}
                        checked={values.signin_assignment === '1'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="hasSigninAssignment">可</label>
                    </li>
                    <li className="entry__radio_item">
                      {isNew ? (
                        <input
                          type="radio"
                          name="signin_assignment"
                          id="noSigninAssignment"
                          value={String(0)}
                          checked={values.signin_assignment === '0'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={true}
                        />
                      ) : (
                          <input
                            type="radio"
                            name="signin_assignment"
                            id="noSigninAssignment"
                            value={String(0)}
                            checked={values.signin_assignment === '0'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={false}
                          />
                        )}
                      <label htmlFor="noSigninAssignment">不可</label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="l_switch">
              <div className="l_switch__w2">
                <button className="u_switch u_switch-blue" type="submit">
                  {isNew ? '登録' : '更新'}
                </button>
              </div>
              <div className="l_switch__w2">
                <Link to={corporateMedicalAdvisors} className="u_switch u_switch-white">
                  一覧へ戻る
              </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  ))

export default MedicalAdvisorEdit

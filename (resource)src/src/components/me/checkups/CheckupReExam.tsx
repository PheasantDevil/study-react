import * as React from 'react'
// import getYear from 'date-fns/getYear'
// import addMonths from 'date-fns/addMonths'
// import addDays from 'date-fns/addDays'
// import isAfter from 'date-fns/isAfter'
// import isValid from 'date-fns/isValid'
// import { withFormik, FormikErrors } from 'formik'
// import MedicalCheckupProjectMetadata from '../../../swagger/model/medicalCheckupProjectMetadata';
// import { formatDate } from '../../../util/DateHelper'

interface Props {}

interface Values {
  name: string
  year: number
  start: string
  end: string
}

class CheckupReExam extends React.PureComponent<Props, Values> {
  render() {
    return (
      <>
        <div className="head head-between">
          <h1 className="head__title">再検査・精密検査項目追加</h1>
          <div className="head__icon">
            <a className="head__circle head__circle-icon3" href="" />
          </div>
        </div>
        <div className="l_grid l_grid-border">
          <div className="u_text">必要事項をご記入の上、「確認」ボタンを押して下さい。</div>
          <div className="headLine">
            <h2 className="headLine__title">再検査・精密検査項目</h2>
          </div>
          <form action="">
            <div className="form">
              <div className="form__row form__row-flex">
                <div className="form__col form__col-w200">
                  <div className="form__col_title">日付</div>
                  <div className="form__col_input">
                    <input className="u_flat" type="text" placeholder="2018年2月20日" />
                  </div>
                </div>
                <div className="form__col form__col-w600">
                  <div className="form__col_title">場所</div>
                  <div className="form__col_input">
                    <input className="u_flat" type="text" placeholder="渋谷クリニック" />
                  </div>
                </div>
              </div>
              <div className="form__row form__row-flex">
                <div className="form__col form__col-w200">
                  <div className="form__col_title">検査項目</div>
                  <div className="form__col_input">
                    <input className="u_flat" type="text" placeholder="AST" />
                  </div>
                </div>
                <div className="form__col form__col-w600">
                  <div className="form__col_title">検査値or所見</div>
                  <div className="form__col_input">
                    <input className="u_flat" type="text" placeholder="60" />
                  </div>
                </div>
              </div>
              <div className="form__row">
                <div className="form__col">
                  <div className="form__col_title">既往歴</div>
                  <div className="form__col_input form__col-w830">
                    <textarea
                      className="u_textarea u_textarea-h200"
                      placeholder="会社では従来より、心の健康管理の一環として、定期健康診断における問診を始めとし産業医・保健師への相談窓口設置やメンタルルス研修等を行っておりますが、今般、従来施策とは別のものとして、セルフケア(一人ひとりが行う自身の健康管理)のさらなる充実化および動きやすい職場環境の形成を目的に、労働安全衛生法に基づき、産業医・保健師を実施者としたストレスチェック。"
                    />
                  </div>
                </div>
              </div>
              <div className="form__row">
                <div className="form__col">
                  <div className="form__col_title">服薬</div>
                  <div className="form__radio">
                    <div className="form__radio_item">
                      <input type="radio" name="drug" id="drug1" />
                      <label htmlFor="drug1">血圧を下げる薬</label>
                    </div>
                    <div className="form__radio_item">
                      <input type="radio" name="drug" id="drug2" />
                      <label htmlFor="drug2">コレステロールを下げる薬</label>
                    </div>
                    <div className="form__radio_item">
                      <input type="radio" name="drug" id="drug3" />
                      <label htmlFor="drug3">血糖を下げる薬</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="l_switch">
              <div className="l_switch__w2">
                <button className="u_switch u_switch-blue" type="submit">
                  確認
                </button>
              </div>
              <div className="l_switch__w2">
                <button className="u_switch u_switch-white" type="submit">
                  キャンセル
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  }
}

// const CheckupReExam = withFormik<Props, Values>({
//   // mapPropsToValues({ project }) {
//   //   const today = new Date()
//   //   return {

//   //   }
//   // },
//   validate(values) {
//     const errors: FormikErrors<Values> = {}
//     if (!values.name || !values.name.trim()) {
//       errors.name = 'タイトルを入力してください。'
//     }
//     if (!values.year) {
//       errors.year = '年度を入力してください。'
//     } else if ((values.year + '').trim().length < 4) {
//       errors.year = '4桁で入力してください。'
//     }
//     const startValid = isValid(values.start)
//     const endValid = isValid(values.end)
//     if (!startValid) {
//       errors.start = '開始日が無効です。'
//     }
//     if (!endValid) {
//       errors.end = '終了日が無効です。'
//     }
//     if (startValid && endValid && !isAfter(values.end, values.start)) {
//       errors.start = '開始日が終了日より後になっています。'
//     }
//     return errors
//   },
//   handleSubmit({ name, year, start, end }, { props, setSubmitting, setError }) {
//     try {
//       props.isNew
//         ? props.create({ year, name, start, end })
//         : props.update(props.project.id, { year, name, start, end })
//     } catch (e) {
//       setSubmitting(false)
//       setError(e)
//     }
//   }
// })(({ values, handleSubmit, handleChange, handleBlur, touched, error, errors, isNew }) => (
//   <form onSubmit={handleSubmit}>
//     <span>{error}</span>
//     <label htmlFor="name">タイトル</label>
//     <input
//       type="text"
//       name="name"
//       id="name"
//       value={values.name}
//       onChange={handleChange}
//       onBlur={handleBlur}
//     />
//     <span>{touched.name && errors.name}</span>
//     <label htmlFor="year">年度</label>
//     <input
//       type="number"
//       name="year"
//       id="year"
//       value={values.year}
//       onChange={handleChange}
//       onBlur={handleBlur}
//     />
//     <span>{touched.year && errors.year}</span>
//     <label htmlFor="start">開始</label>
//     <input
//       type="date"
//       name="start"
//       id="start"
//       value={values.start}
//       onChange={handleChange}
//       onBlur={handleBlur}
//     />
//     <span>{touched.start && errors.start}</span>
//     <label htmlFor="end">終了</label>
//     <input
//       type="date"
//       name="end"
//       id="end"
//       value={values.end}
//       onChange={handleChange}
//       onBlur={handleBlur}
//     />
//     <span>{touched.end && errors.end}</span>
//     <div>
//       <button type="submit">{isNew ? '登録' : '更新'}</button>
//     </div>
//   </form>
// ))

export default CheckupReExam

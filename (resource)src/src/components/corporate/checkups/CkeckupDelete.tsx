// import * as React from 'react'
// import getYear from 'date-fns/getYear'
// import addMonths from 'date-fns/addMonths'
// import addDays from 'date-fns/addDays'
// import isAfter from 'date-fns/isAfter'
// import isValid from 'date-fns/isValid'
// import { withFormik, FormikErrors } from 'formik'
// import parseISO from 'date-fns/parseISO'
// import { formatDate } from '../../../util/DateHelper'
// import MedicalCheckupProjectMetadata from '../../../swagger/model/medicalCheckupProjectMetadata'
// import { Link } from 'react-router-dom'
// import { corporateCheckupsSetting } from '../../../config/Url'

// interface Props {
//   project: MedicalCheckupProjectMetadata | null
//   // isNew: boolean
//   submit: (params: Values) => void
//   // submit: (e: React.FormEvent) => void
// }

// export interface Values {
//   name: string
//   year: number
//   start: string
//   end: string
// }

// const CheckupDelete = withFormik<Props, Values>({
//   mapPropsToValues({ project }) {
//     const today = new Date()
//     return {
//       name: project ? project.name : '',
//       year: project ? project.year : getYear(today),
//       start: project
//         ? project.period.start
//         : formatDate(
//             ((day: Date) => new Date(day.getFullYear(), day.getMonth(), 1))(addMonths(today, 1))
//           ), // 翌月1日
//       end: project
//         ? project.period.end
//         : formatDate(
//             addDays(
//               ((day: Date) => new Date(day.getFullYear(), day.getMonth(), 1))(addMonths(today, 4)),
//               -1
//             )
//           ) // 3ヶ月後の月末
//     }
//   },
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
//     const startValid = isValid(parseISO(values.start))
//     const endValid = isValid(parseISO(values.end))
//     if (!startValid) {
//       errors.start = '開始日が無効です。'
//     }
//     if (!endValid) {
//       errors.end = '終了日が無効です。'
//     }
//     if (startValid && endValid && !isAfter(parseISO(values.end), parseISO(values.start))) {
//       errors.start = '開始日が終了日より後になっています。'
//     }
//     return errors
//   },
//   handleSubmit(values, { props, setSubmitting, setStatus }) {
//     try {
//       props.submit(values)
//     } catch (e) {
//       setSubmitting(false)
//       setStatus(e)
//     }
//   }
// })((
//   { values, handleSubmit, handleChange, handleBlur, touched, status, errors, project } // , isNew
// ) => (
//   <>
//     <div className="head">
//       <h1 className="head__title">${project!.year}年健康診断</h1>
//     </div>

//     <div className="l_grid l_grid-border l_grid-spaceL">
//       <form onSubmit={handleSubmit}>
//         <div className="entry">
//           <p className="u_slogan">
//             削除するともとに戻すことが出来ません。本当に下記の内容を削除してもよろしいですか？
//           </p>
//           <div className="headLine">
//             <h2 className="headLine__title">入力情報</h2>
//           </div>

//           <div className="entry__cell">
//             <span>{status}</span>
//             <div className="entry__row">
//               <div className="entry__col">
//                 <div className="entry__col_title">年度</div>
//                 <div className="entry__select entry__select-w150">
//                   <label className="triangles" htmlFor="year">
//                     <select id="year" name="">
//                       <option value={values.year - 1}>{values.year - 1}年</option>
//                       <option value={values.year} selected>
//                         {values.year}年
//                       </option>
//                       <option value={values.year + 1}>{values.year + 1}年</option>
//                     </select>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <div className="entry__row">
//               <div className="entry__col">
//                 <div className="entry__col_title">タイトル</div>
//                 <label htmlFor="name" />
//                 <input
//                   className="u_flat u_w655"
//                   type="text"
//                   name="name"
//                   id="name"
//                   placeholder="関東エリア健康診断"
//                   value={values.name}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 <span>{touched.name && errors.name}</span>
//               </div>
//             </div>

//             <div className="entry__row">
//               <div className="entry__col">
//                 <div className="entry__col_title">実施期間</div>
//                 <p className="entry__col_text">
//                   <span>{touched.start && errors.start}</span>
//                   <label htmlFor="start" />
//                   <input
//                     className="u_flat u_w160"
//                     type="date"
//                     name="start"
//                     id="start"
//                     placeholder="2019年4月10日"
//                     value={values.start}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                   &emsp;&#12316;&emsp;
//                   <label htmlFor="end" />
//                   <input
//                     className="u_flat u_w160"
//                     type="date"
//                     name="end"
//                     id="end"
//                     placeholder="2019年4月15日"
//                     value={values.end}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                   <span>{touched.end && errors.end}</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="l_switch">
//           <div className="l_switch__w2">
//             <Link className="u_switch u_switch-white" to={corporateCheckupsSetting}>
//               戻る
//             </Link>
//           </div>
//           <div className="l_switch__w2">
//             <button className="u_switch u_switch-blue" type="submit">
//               削除
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   </>
// ))

// export default CheckupDelete

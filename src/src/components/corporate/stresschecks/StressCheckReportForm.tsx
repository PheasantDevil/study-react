import * as React from 'react'
import { withFormik, FormikErrors } from 'formik'
import isValid from 'date-fns/isValid'
import parseISO from 'date-fns/parseISO'
import StressCheckReport from '../../../swagger/model/stressCheckReport'
import DatePicker from '../../_parts/DatePicker'

interface Props {
  stresscheckReport: StressCheckReport
  create: (params: Values) => void
}

export interface Values {
  prefectures: string // 都道府県
  concern: string // 所掌
  jurisdiction: string // 管轄
  baseNumber: string // 基幹番号
  branchNumber: string // 枝番号
  workplaceNumber: string // 被一括事業場番号
  businessYear: string // 対象年(クライアント側で和暦にする)
  startDate: string // 健診年月日
  businessType: string // 事業の種類
  businessPlaceName: string // 事業場の名称
  postalCode: string // 郵便番号
  address: string // 住所
  phoneNumber: string // 電話番号
  operator: string // 検査を実施した人
  consultant: string // 面接指導を実施した医師
  numberOfEmployees: string // 在籍労働者数
  numberOfTargets: string // 検査を受けた労働者数
  numberOfConsultated: string // 面接指導を受けた労働者数
  analyzed: string // 集団ごとの分析の実施の有無
  medicalAdvisorName: string // 産業医
  medicalAdvisorDepartmentName: string // 産業医所属-名称
  medicalAdvisorDepartmentAddress: string // 産業医所属-住所
}

const operator = [
  { value: '1', text: '1:事業場選任の産業医' },
  {
    value: '2',
    text: '2:事業場所属の医師（1以外の医師に限る）、保険師、看護師又は精神保健福祉士'
  },
  { value: '3', text: '3:外部委託先の医師。保険師、看護師又は精神保健福祉士' }
]

const consultant = [
  { value: '1', text: '1:事業場選任の産業医' },
  { value: '2', text: '2:事業場所属の医師（1以外の医師に限る）' },
  { value: '3', text: '3:外部委託先の医師' }
]

const analyzed = [
  { value: '1', text: '1:検査結果の集団ごとの分析を行った' },
  { value: '2', text: '2:検査結果の集団ごとの分析を行っていない' }
]

// 都道府県の入力補助用
// const prefectures = [
//   { value: '1', text: '北海道' },
//   { value: '2', text: '青森県' },
//   { value: '3', text: '岩手県' },
//   { value: '4', text: '宮城県' },
//   { value: '5', text: '秋田県' },
//   { value: '6', text: '山形県' },
//   { value: '7', text: '福島県' },
//   { value: '8', text: '茨城県' },
//   { value: '9', text: '栃木県' },
//   { value: '10', text: '群馬県' },
//   { value: '11', text: '埼玉県' },
//   { value: '12', text: '千葉県' },
//   { value: '13', text: '東京都' },
//   { value: '14', text: '神奈川県' },
//   { value: '15', text: '新潟県' },
//   { value: '16', text: '富山県' },
//   { value: '17', text: '石川県' },
//   { value: '18', text: '福井県' },
//   { value: '19', text: '山梨県' },
//   { value: '20', text: '長野県' },
//   { value: '21', text: '岐阜県' },
//   { value: '22', text: '静岡県' },
//   { value: '23', text: '愛知県' },
//   { value: '24', text: '三重県' },
//   { value: '25', text: '滋賀県' },
//   { value: '26', text: '京都府' },
//   { value: '27', text: '大阪府' },
//   { value: '28', text: '兵庫県' },
//   { value: '29', text: '奈良県' },
//   { value: '30', text: '和歌山県' },
//   { value: '31', text: '鳥取県' },
//   { value: '32', text: '島根県' },
//   { value: '33', text: '岡山県' },
//   { value: '34', text: '広島県' },
//   { value: '35', text: '山口県' },
//   { value: '36', text: '徳島県' },
//   { value: '37', text: '香川県' },
//   { value: '38', text: '愛媛県' },
//   { value: '39', text: '高知県' },
//   { value: '40', text: '福岡県' },
//   { value: '41', text: '佐賀県' },
//   { value: '42', text: '長崎県' },
//   { value: '43', text: '熊本県' },
//   { value: '44', text: '大分県' },
//   { value: '45', text: '宮崎県' },
//   { value: '46', text: '鹿児島県' },
//   { value: '47', text: '沖縄県' }
// ]

const StressCheckReportForm = withFormik<Props, Values>({
  mapPropsToValues({ stresscheckReport }) {
    return {
      prefectures: '00',
      concern: '0',
      jurisdiction: '00',
      baseNumber: '000000',
      branchNumber: '000',
      workplaceNumber: '0000',
      businessYear: stresscheckReport.businessYear + ``,
      startDate: stresscheckReport.startDate,
      businessType: '',
      businessPlaceName: '',
      postalCode: '-',
      address: '',
      phoneNumber: '--',
      operator: '1',
      consultant: '1',
      numberOfEmployees: stresscheckReport.numberOfEmployees + '',
      numberOfTargets: stresscheckReport.numberOfTargets + '',
      numberOfConsultated: stresscheckReport.numberOfConsultationedEmployees + '',
      analyzed: '1',
      medicalAdvisorName: '',
      medicalAdvisorDepartmentName: '',
      medicalAdvisorDepartmentAddress: ''
    }
  },
  validate(values) {
    const errors: FormikErrors<Values> = {}
    if (!/^[0-9]{2}$/.test(values.prefectures)) {
      errors.prefectures = '2桁の数字を入力してください'
    }

    if (!/^[0-9]{1}$/.test(values.concern)) {
      errors.concern = '1桁の数字を入力してください'
    }

    if (!/^[0-9]{2}$/.test(values.jurisdiction)) {
      errors.jurisdiction = '2桁の数字を入力してください'
    }

    if (!/^[0-9]{6}$/.test(values.baseNumber)) {
      errors.baseNumber = '6桁の数字を入力してください'
    }

    if (!/^[0-9]{3}$/.test(values.branchNumber)) {
      errors.branchNumber = '3桁の数字を入力してください'
    }

    if (!/^[0-9]{4}$/.test(values.workplaceNumber)) {
      errors.workplaceNumber = '4桁の数字を入力してください'
    }
    if ((values.businessYear + '').trim().length !== 4) {
      errors.businessYear = '4桁の数字を入力してください'
    }

    const startValid = isValid(parseISO(values.startDate))
    if (!startValid) {
      errors.startDate = '実施年月日が無効です'
    }
    if (!values.businessType || !values.businessType.trim()) {
      errors.businessType = '事業の種類を入力してください'
    }
    if (!values.businessPlaceName || !values.businessPlaceName.trim()) {
      errors.businessPlaceName = '事業場の名称を入力してください'
    }
    if (!/^[0-9]{3}-?[0-9]{4}$/.test(values.postalCode)) {
      errors.postalCode = '郵便番号を入力してください'
    }
    if (!values.address || !values.address.trim()) {
      errors.address = '住所を入力してください'
    }
    if (!/^[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}$/.test(values.phoneNumber)) {
      errors.phoneNumber = '電話番号を入力してください'
    }
    if (!/^[0-9]{1,5}$/.test(values.numberOfEmployees)) {
      errors.numberOfEmployees = '5桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,5}$/.test(values.numberOfTargets)) {
      errors.numberOfTargets = '5桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,5}$/.test(values.numberOfConsultated)) {
      errors.numberOfConsultated = '5桁の以下の数字を入力してください'
    }
    if (!values.medicalAdvisorName || !values.medicalAdvisorName.trim()) {
      errors.medicalAdvisorName = '産業医を入力してください'
    }
    if (!values.medicalAdvisorDepartmentName || !values.medicalAdvisorDepartmentName.trim()) {
      errors.medicalAdvisorDepartmentName = '産業医所属先-名称を入力してください'
    }
    if (!values.medicalAdvisorDepartmentAddress || !values.medicalAdvisorDepartmentAddress.trim()) {
      errors.medicalAdvisorDepartmentAddress = '産業医所属先-住所を入力してください'
    }
    return errors
  },
  handleSubmit(values, { props }) {
    props.create(values)
  }
})(({ values, handleSubmit, handleChange, handleBlur, touched, setFieldValue, status, errors }) => (
  <>
    <div className="head">
      <h1 className="head__title">ストレスチェック報告書</h1>
    </div>

    <div className="l_grid l_grid-border l_grid-spaceL">
      <form onSubmit={handleSubmit}>
        <div className="entry">
          <div className="head">
            <p className="head__title">心理的な負担の程度を把握するための検査結果等報告書</p>
            <p className="headS__titleS">　様式6号 (第52条の21関係)</p>
            {/* 以下、"className"の調整が必要
            <ul className="entry__list">
              <li className="entry__list_item">
                <div>　必要事項をご記入の上、確認ボタンを押して下さい。</div>
                <div>
                  　※上記以外のフォーマット報告書の場合はご所属の労基署ホームページより、報告書を
                </div>
                <div>　ダウンロードしていただき手書きでのご記入をお願いいたします。</div>
              </li>
            </ul> */}
          </div>
          <div className="headLine">
            <h2 className="headLine__title">事業場に関する項目</h2>
          </div>
          <div className="entry__cell">
            <p>{status}</p>
            <div className="entry__row">
              <div className="entry__col">
                <h2 className="entry__col_title">労働保険番号</h2>
              </div>
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">都道府県</div>
                <label htmlFor="prefectures" />
                <input
                  className={
                    !(touched.prefectures && errors.prefectures)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="text"
                  name="prefectures"
                  id="prefectures"
                  maxLength={2}
                  value={values.prefectures}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.prefectures ? (<div className="entry__col_error">
                  {touched.prefectures && errors.prefectures}
                </div>
                ) : null}
              </div>
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">所掌</div>
                <label htmlFor="concern" />
                <input
                  className={
                    !(touched.concern && errors.concern)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="text"
                  name="concern"
                  id="concern"
                  maxLength={1}
                  value={values.concern}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.concern ? (<div className="entry__col_error">{touched.concern && errors.concern}</div>
                ) : null}
              </div>
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">管轄</div>
                <label htmlFor="jurisdiction" />
                <input
                  className={
                    !(touched.jurisdiction && errors.jurisdiction)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="text"
                  name="jurisdiction"
                  id="jurisdiction"
                  maxLength={2}
                  value={values.jurisdiction}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.jurisdiction ? (<div className="entry__col_error">
                  {touched.jurisdiction && errors.jurisdiction}
                </div>
                ) : null}
              </div>
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">基幹番号</div>
                <label htmlFor="baseNumber" />
                <input
                  className={
                    !(touched.baseNumber && errors.baseNumber)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="text"
                  name="baseNumber"
                  id="baseNumber"
                  maxLength={6}
                  value={values.baseNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.baseNumber ? (
                  <div className="entry__col_error">
                    {touched.baseNumber && errors.baseNumber}
                  </div>
                ) : null}
              </div>
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">枝番号</div>
                <label htmlFor="branchNumber" />
                <input
                  className={
                    !(touched.branchNumber && errors.branchNumber)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="text"
                  name="branchNumber"
                  id="branchNumber"
                  maxLength={3}
                  value={values.branchNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.branchNumber ? (<div className="entry__col_error">
                  {touched.branchNumber && errors.branchNumber}
                </div>
                ) : null}
              </div>
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">被一括事業場番号</div>
                <label htmlFor="workplaceNumber" />
                <input
                  className={
                    !(touched.workplaceNumber && errors.workplaceNumber)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="text"
                  name="workplaceNumber"
                  id="workplaceNumber"
                  maxLength={4}
                  value={values.workplaceNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.workplaceNumber ? (<div className="entry__col_error">
                  {touched.workplaceNumber && errors.workplaceNumber}
                </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">対象年</div>
                <label htmlFor="businessYear" />
                <input
                  className={
                    !(touched.businessYear && errors.businessYear)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="text"
                  name="businessYear"
                  id="businessYear"
                  maxLength={4}
                  value={values.businessYear}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.businessYear ? (<div className="entry__col_error">
                  {touched.businessYear && errors.businessYear}
                </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">検査実施年月日</div>
                <label htmlFor="startDate" />
                <DatePicker
                  className={
                    !(touched.startDate && errors.startDate)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  name="startDate"
                  id="startDate"
                  value={values.startDate}
                  setFieldValue={setFieldValue}
                  onBlur={handleBlur}
                />
                {errors.startDate ? (<div className="entry__col_error">{touched.startDate && errors.startDate}</div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">事業の種類</div>
                <label htmlFor="businessType" />
                <input
                  className={
                    !(touched.businessType && errors.businessType)
                      ? 'u_flat u_w655'
                      : 'u_flat u_w655 u_errorBorder'
                  }
                  type="text"
                  name="businessType"
                  id="businessType"
                  value={values.businessType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.businessType ? (<div className="entry__col_error">
                  {touched.businessType && errors.businessType}
                </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">事業場の名称</div>
                <label htmlFor="businessPlaceName" />
                <input
                  className={
                    !(touched.businessPlaceName && errors.businessPlaceName)
                      ? 'u_flat u_w655'
                      : 'u_flat u_w655 u_errorBorder'
                  }
                  type="text"
                  name="businessPlaceName"
                  id="businessPlaceName"
                  value={values.businessPlaceName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.businessPlaceName ? (
                  <div className="entry__col_error">
                    {touched.businessPlaceName && errors.businessPlaceName}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {/* ============================================================ */}
          <div className="headLine">
            <h2 className="headLine__title">事業場の所在地</h2>
          </div>
          <div className="entry__cell">
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">郵便番号</div>
                <label htmlFor="postalCode" />
                <input
                  className={
                    !(touched.postalCode && errors.postalCode)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  value={values.postalCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.postalCode ? (<div className="entry__col_error">
                  {touched.postalCode && errors.postalCode}
                </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">住所</div>
                <label htmlFor="address" />
                <input
                  className={
                    !(touched.address && errors.address)
                      ? 'u_flat u_w655'
                      : 'u_flat u_w655 u_errorBorder'
                  }
                  type="text"
                  name="address"
                  id="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address ? (<div className="entry__col_error">{touched.address && errors.address}</div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">電話番号</div>
                <label htmlFor="phoneNumber" />
                <input
                  className={
                    !(touched.phoneNumber && errors.phoneNumber)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phoneNumber ? (<div className="entry__col_error">
                  {touched.phoneNumber && errors.phoneNumber}
                </div>
                ) : null}
              </div>
            </div>
          </div>
          {/* ============================================================ */}
          <div className="headLine">
            <h2 className="headLine__title">検査に関する項目</h2>
          </div>
          <div className="entry__cell">
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">在籍労働者数</div>
                <label htmlFor="numberOfEmployees" />
                <input
                  className={
                    !(touched.numberOfEmployees && errors.numberOfEmployees)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="numberOfEmployees"
                  id="numberOfEmployees"
                  maxLength={5}
                  value={values.numberOfEmployees}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.numberOfEmployees ? (
                  <div className="entry__col_error">
                    {touched.numberOfEmployees && errors.numberOfEmployees}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">検査を実施した者</div>
                <ul className="entry__radio">
                  {operator.map((o, i) => (
                    <li className="entry__radio_item">
                      <input
                        type="radio"
                        id={`operator${i}`}
                        name="operator"
                        value={o.value}
                        checked={values.operator === o.value}
                        onChange={() => setFieldValue('operator', (values.operator = o.value))}
                      />
                      <label htmlFor={`operator${i}`} key={`analyzed${i}`}>
                        {o.text}
                      </label>
                    </li>
                  ))}
                  {/* <div>{touched.operator && errors.operator}</div> */}
                </ul>
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">検査を受けた労働者数</div>
                <label htmlFor="numberOfTargets" />
                <input
                  className={
                    !(touched.numberOfTargets && errors.numberOfTargets)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="numberOfTargets"
                  id="numberOfTargets"
                  maxLength={5}
                  value={values.numberOfTargets}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.numberOfTargets ? (
                  <div className="entry__col_error">
                    {touched.numberOfTargets && errors.numberOfTargets}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">面接指導を実施した医師</div>
                <ul className="entry__radio">
                  {consultant.map((o, i) => (
                    <li className="entry__radio_item">
                      <input
                        type="radio"
                        id={`consultant${i}`}
                        name="consultant"
                        value={o.value}
                        checked={values.consultant === o.value}
                        onChange={() => setFieldValue('consultant', (values.consultant = o.value))}
                      />
                      <label htmlFor={`consultant${i}`} key={`analyzed${i}`}>
                        {o.text}
                      </label>
                    </li>
                  ))}
                  {/* <div>{touched.consultant && errors.consultant}</div> */}
                </ul>
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">面接指導を受けた労働者数</div>
                <label htmlFor="numberOfConsultated" />
                <input
                  className={
                    !(touched.numberOfConsultated && errors.numberOfConsultated)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="numberOfConsultated"
                  id="numberOfConsultated"
                  maxLength={5}
                  value={values.numberOfConsultated}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.numberOfConsultated ? (
                  <div className="entry__col_error">
                    {touched.numberOfConsultated && errors.numberOfConsultated}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">集団ごとの分析の実施の有無</div>
                <ul className="entry__radio">
                  {analyzed.map((o, i) => (
                    <li className="entry__radio_item">
                      <input
                        type="radio"
                        id={`analyzed${i}`}
                        name="analyzed"
                        value={o.value}
                        checked={values.analyzed === o.value}
                        onChange={() => setFieldValue('analyzed', (values.analyzed = o.value))}
                      />
                      <label htmlFor={`analyzed${i}`} key={`analyzed${i}`}>
                        {o.text}
                      </label>
                    </li>
                  ))}
                  {/* <div>{touched.analyzed && errors.analyzed}</div> */}
                </ul>
              </div>
            </div>
          </div>
          {/* ============================================================ */}
          <div className="headLine">
            <h2 className="headLine__title">産業医</h2>
          </div>
          <div className="entry__cell">
            <div className="entry__row">
              <label htmlFor="employmentMedicalAdvisor" />
              <div className="entry__col">
                <div className="entry__col_title">産業医名</div>
                <input
                  className={
                    !(touched.medicalAdvisorName && errors.medicalAdvisorName)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="text"
                  name="medicalAdvisorName"
                  id="medicalAdvisorName"
                  value={values.medicalAdvisorName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.medicalAdvisorName ? (<div className="entry__col_error">
                  {touched.medicalAdvisorName && errors.medicalAdvisorName}
                </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">産業医所属_名称</div>
                <input
                  className={
                    !(
                      touched.medicalAdvisorDepartmentName &&
                      errors.medicalAdvisorDepartmentName
                    )
                      ? 'u_flat u_w655'
                      : 'u_flat u_w655 u_errorBorder'
                  }
                  type="text"
                  name="medicalAdvisorDepartmentName"
                  id="medicalAdvisorDepartmentName"
                  value={values.medicalAdvisorDepartmentName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.medicalAdvisorDepartmentName ? (<div className="entry__col_error">
                  {touched.medicalAdvisorDepartmentName && errors.medicalAdvisorDepartmentName}
                </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">産業医所属_住所</div>
                <label htmlFor="medicalAdvisorDepartmentAddress" />
                <input
                  className={
                    !(
                      touched.medicalAdvisorDepartmentAddress &&
                      errors.medicalAdvisorDepartmentAddress
                    )
                      ? 'u_flat u_w655'
                      : 'u_flat u_w655 u_errorBorder'
                  }
                  type="text"
                  name="medicalAdvisorDepartmentAddress"
                  id="medicalAdvisorDepartmentAddress"
                  value={values.medicalAdvisorDepartmentAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.medicalAdvisorDepartmentAddress ? (<div className="entry__col_error">
                  {touched.medicalAdvisorDepartmentAddress &&
                    errors.medicalAdvisorDepartmentAddress}
                </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div>
          <button className="u_switch u_switch-blue" type="submit">
            ダウンロード
          </button>
        </div>
      </form>
    </div>
  </>
))

export default StressCheckReportForm

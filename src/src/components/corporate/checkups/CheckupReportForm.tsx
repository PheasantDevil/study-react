import * as React from 'react'
import { withFormik, FormikErrors } from 'formik'
import isValid from 'date-fns/isValid'
import parseISO from 'date-fns/parseISO'
import CheckupReport from '../../../swagger/model/checkupReport'
import DatePicker from '../../_parts/DatePicker'

interface Props {
  checkupReport: CheckupReport
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
  hospitalName: string // 健康診断実施基幹の名称
  hospitalAddress: string // 健康診断実施機関の所在地
  numberOfEmployees: string // 在籍労働者数
  numberOfTargets: string // 検査を受けた労働者数
  // healthSafetyの項目
  i: string
  ro: string
  ha: string
  ni: string
  ho: string
  he: string
  to: string
  chi: string
  ri: string
  nu: string
  ru: string
  wo: string
  wa: string
  ka: string
  sum: string
  // examinationの項目
  hearingH1kAll: string
  hearingH1kObserved: string
  hearingH4kAll: string
  hearingH4kObserved: string
  hearingOthersAll: string
  hearingOthersObserved: string
  chestXrayAll: string
  chestXrayObserved: string
  sputmAll: string
  sputmObserved: string
  bloodPressureAll: string
  bloodPressureObserved: string
  anemiaAll: string
  anemiaObserved: string
  liverAll: string
  liverObserved: string
  lipidAll: string
  lipidObserved: string
  glucoseAll: string
  glucoseObserved: string
  urinePSugarAll: string
  urinePSugarObserved: string
  urineProteinAll: string
  urineProteinObserved: string
  electroCardiogramAll: string
  electroCardiogramObserved: string
  numberOfObserved: string
  numberOfMedicalTreatmented: string
  dentalAll: string
  dentalObserved: string
  medicalAdvisorName: string
  medicalAdvisorDepartmentName: string
  medicalAdvisorDepartmentAddress: string
}

const CheckupReportForm = withFormik<Props, Values>({
  mapPropsToValues({ checkupReport }) {
    return {
      prefectures: '00',
      concern: '0',
      jurisdiction: '00',
      baseNumber: '000000',
      branchNumber: '000',
      workplaceNumber: '0000',
      businessYear: checkupReport.businessYear + '',
      startDate: checkupReport.startDate,
      businessType: '',
      businessPlaceName: '',
      postalCode: '-',
      address: '',
      phoneNumber: '--',
      hospitalName: '',
      hospitalAddress: '',
      numberOfEmployees: checkupReport.numberOfEmployees + '',
      numberOfTargets: checkupReport.numberOfTargets + '',
      i: '0',
      ro: '0',
      ha: '0',
      ni: '0',
      ho: '0',
      he: '0',
      to: '0',
      chi: '0',
      ri: '0',
      nu: '0',
      ru: '0',
      wo: '0',
      wa: '0',
      ka: '0',
      sum: '0',
      hearingH1kAll: '0',
      hearingH1kObserved: '0',
      hearingH4kAll: '0',
      hearingH4kObserved: '0',
      hearingOthersAll: '0',
      hearingOthersObserved: '0',
      chestXrayAll: '0',
      chestXrayObserved: '0',
      sputmAll: '0',
      sputmObserved: '0',
      bloodPressureAll: '0',
      bloodPressureObserved: '0',
      anemiaAll: '0',
      anemiaObserved: '0',
      liverAll: '0',
      liverObserved: '0',
      lipidAll: '0',
      lipidObserved: '0',
      glucoseAll: '0',
      glucoseObserved: '0',
      urinePSugarAll: '0',
      urinePSugarObserved: '0',
      urineProteinAll: '0',
      urineProteinObserved: '0',
      electroCardiogramAll: '0',
      electroCardiogramObserved: '0',
      numberOfObserved: '0',
      numberOfMedicalTreatmented: '0',
      dentalAll: '0',
      dentalObserved: '0',
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
      errors.startDate = '開始日が無効です'
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
    if (!values.hospitalName || !values.hospitalName.trim()) {
      errors.hospitalName = '健康診断実施基幹の名称を入力してください'
    }
    if (!values.hospitalAddress || !values.hospitalAddress.trim()) {
      errors.hospitalAddress = '健康診断実施機関の所在地を入力してください'
    }
    if (!/^[0-9]{1,5}$/.test(values.numberOfEmployees)) {
      errors.numberOfEmployees = '5桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,5}$/.test(values.numberOfTargets)) {
      errors.numberOfTargets = '5桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.i)) {
      errors.i = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.ro)) {
      errors.ro = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.ha)) {
      errors.ha = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.ni)) {
      errors.ni = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.ho)) {
      errors.ho = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.he)) {
      errors.he = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.to)) {
      errors.to = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.chi)) {
      errors.chi = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.ri)) {
      errors.ri = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.nu)) {
      errors.nu = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.ru)) {
      errors.ru = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.wo)) {
      errors.wo = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.wa)) {
      errors.wa = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.ka)) {
      errors.ka = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,5}$/.test(values.sum)) {
      errors.sum = '5桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,5}$/.test(values.hearingH1kAll)) {
      errors.hearingH1kAll = '5桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.hearingH1kObserved)) {
      errors.hearingH1kObserved = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,5}$/.test(values.hearingH4kAll)) {
      errors.hearingH4kAll = '5桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.hearingH4kObserved)) {
      errors.hearingH4kObserved = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,5}$/.test(values.hearingOthersAll)) {
      errors.hearingOthersAll = '5桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.hearingOthersObserved)) {
      errors.hearingOthersObserved = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,5}$/.test(values.chestXrayAll)) {
      errors.chestXrayAll = '5桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.chestXrayObserved)) {
      errors.chestXrayObserved = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,5}$/.test(values.sputmAll)) {
      errors.sputmAll = '5桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.sputmObserved)) {
      errors.sputmObserved = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,5}$/.test(values.bloodPressureAll)) {
      errors.bloodPressureAll = '5桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.bloodPressureObserved)) {
      errors.bloodPressureObserved = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,5}$/.test(values.anemiaAll)) {
      errors.anemiaAll = '5桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.anemiaObserved)) {
      errors.anemiaObserved = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,5}$/.test(values.liverAll)) {
      errors.liverAll = '5桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.liverObserved)) {
      errors.liverObserved = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,5}$/.test(values.lipidAll)) {
      errors.lipidAll = '5桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.lipidObserved)) {
      errors.lipidObserved = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,5}$/.test(values.glucoseAll)) {
      errors.glucoseAll = '5桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.glucoseObserved)) {
      errors.glucoseObserved = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,5}$/.test(values.urinePSugarAll)) {
      errors.urinePSugarAll = '5桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.urinePSugarObserved)) {
      errors.urinePSugarObserved = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,5}$/.test(values.urineProteinAll)) {
      errors.urineProteinAll = '5桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.urineProteinObserved)) {
      errors.urineProteinObserved = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,5}$/.test(values.electroCardiogramAll)) {
      errors.electroCardiogramAll = '5桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.electroCardiogramObserved)) {
      errors.electroCardiogramObserved = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.numberOfObserved)) {
      errors.numberOfObserved = '4桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,5}$/.test(values.numberOfMedicalTreatmented)) {
      errors.numberOfMedicalTreatmented = '5桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,5}$/.test(values.dentalAll)) {
      errors.dentalAll = '5桁の以下の数字を入力してください'
    }
    if (!/^[0-9]{1,4}$/.test(values.dentalObserved)) {
      errors.dentalObserved = '4桁の以下の数字を入力してください'
    }
    if (!values.medicalAdvisorName || !values.medicalAdvisorName.trim()) {
      errors.medicalAdvisorName = '産業医の名称を入力してください'
    }
    if (!values.medicalAdvisorDepartmentName || !values.medicalAdvisorDepartmentName.trim()) {
      errors.medicalAdvisorDepartmentName = '産業医の所在地名を入力してください'
    }
    if (!values.medicalAdvisorDepartmentAddress || !values.medicalAdvisorDepartmentAddress.trim()) {
      errors.medicalAdvisorDepartmentAddress = '産業医の所在地を入力してください'
    }
    return errors
  },
  handleSubmit(values, { props }) {
    props.create(values)
  }
})(({ values, handleSubmit, handleChange, handleBlur, touched, status, errors, setFieldValue }) => (
  <>
    <div className="head">
      <h1 className="head__title">健診結果報告書作成</h1>
    </div>

    <div className="l_grid l_grid-border l_grid-spaceL">
      <form onSubmit={handleSubmit}>
        <div className="entry">
          <div className="head">
            <h2 className="head__title">定期健康診断結果報告書</h2>
            <p className="headS__titleS">　様式6号 (第52条関係)</p>
          </div>
          {/* 
          以下、"className"の調整が必要
            <ul className="entry__list">
              <li className="entry__list_item">
                <div>
                必要事項をご記入の上、確認ボタンを押して下さい。
                </div>
                <div>
                ※上記以外のフォーマット報告書の場合はご所属の労基署ホームページより、報告書をダウンロードしていただき手書きでのご記入をお願いいたします。
                </div>
              </li>
            </ul>
          */}
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
                <div className="entry__col_title">健診年月日</div>
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
                    !(touched.postalCode && errors.postalCode)
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
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">健康診断実施基幹の名称</div>
                <label htmlFor="hospitalName" />
                <input
                  className={
                    !(touched.hospitalName && errors.hospitalName)
                      ? 'u_flat u_w655'
                      : 'u_flat u_w655 u_errorBorder'
                  }
                  type="text"
                  name="hospitalName"
                  id="hospitalName"
                  value={values.hospitalName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.hospitalName ? (
                  <div className="entry__col_error">
                    {touched.hospitalName && errors.hospitalName}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">健康診断実施機関の所在地</div>
                <label htmlFor="hospitalAddress" />
                <input
                  className={
                    !(touched.hospitalAddress && errors.hospitalAddress)
                      ? 'u_flat u_w655'
                      : 'u_flat u_w655 u_errorBorder'
                  }
                  type="text"
                  name="hospitalAddress"
                  id="hospitalAddress"
                  value={values.hospitalAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.hospitalAddress ? (<div className="entry__col_error">
                  {touched.hospitalAddress && errors.hospitalAddress}
                </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col entry__col-w50p">
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
                    {errors.numberOfEmployees ? (<div className="entry__col_error">
                  {touched.numberOfEmployees && errors.numberOfEmployees}
                </div>
                ) : null}
              </div>
              <div className="entry__col entry__col-w50p">
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
                    {errors.numberOfTargets ? (<div className="entry__col_error">
                  {touched.numberOfTargets && errors.numberOfTargets}
                </div>
                ) : null}
              </div>
            </div>
          </div>
          {/* ============================================================ */}
          <div className="headLine">
            <h2 className="headLine__title">
              労働安全衛生規則第13条第1項第2号に掲げる業務に従事する労働者数
            </h2>
          </div>
          <div className="entry__cell">
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">
                  イ 多量の高熱物体を取り扱う業務及び著しく暑熱な場所における業務
                </div>
                <label htmlFor="i" />
                <input
                  className={
                    !(touched.i && errors.i) ? 'u_flat u_w160' : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="i"
                  id="i"
                  maxLength={4}
                  value={values.i}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.i ? (<div className="entry__col_error">{touched.i && errors.i}</div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">
                  ロ 多量の低温物体を取り扱う業務及び著しく寒冷な場所における業務
                </div>
                <label htmlFor="ro" />
                <input
                  className={
                    !(touched.ro && errors.ro) ? 'u_flat u_w160' : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="ro"
                  id="ro"
                  maxLength={4}
                  value={values.ro}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.ro ? (<div className="entry__col_error">{touched.ro && errors.ro}</div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">
                  ハ ラジウム放射線、エツクス線その他の有害放射線にさらされる業務
                </div>
                <label htmlFor="ha" />
                <input
                  className={
                    !(touched.ha && errors.ha) ? 'u_flat u_w160' : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="ha"
                  id="ha"
                  maxLength={4}
                  value={values.ha}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.ha ? (<div className="entry__col_error">{touched.ha && errors.ha}</div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">
                  ニ 土石、獣毛等のじんあい又は粉末を著しく飛散する場所における業務
                </div>
                <label htmlFor="ni" />
                <input
                  className={
                    !(touched.ni && errors.ni) ? 'u_flat u_w160' : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="ni"
                  id="ni"
                  maxLength={4}
                  value={values.ni}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.ni ? (<div className="entry__col_error">{touched.ni && errors.ni}</div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">ホ 異常気圧下における業務</div>
                <label htmlFor="ho" />
                <input
                  className={
                    !(touched.ho && errors.ho) ? 'u_flat u_w160' : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="ho"
                  id="ho"
                  maxLength={4}
                  value={values.ho}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.ho ? (<div className="entry__col_error">{touched.ho && errors.ho}</div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">
                  ヘ さく岩機、鋲（びよう）打機等の使用によつて、身体に著しい振動を与える業務
                </div>
                <label htmlFor="he" />
                <input
                  className={
                    !(touched.he && errors.he) ? 'u_flat u_w160' : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="he"
                  id="he"
                  maxLength={4}
                  value={values.he}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.he ? (<div className="entry__col_error">{touched.he && errors.he}</div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">ト 重量物の取扱い等重激な業務</div>
                <label htmlFor="to" />
                <input
                  className={
                    !(touched.to && errors.to) ? 'u_flat u_w160' : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="to"
                  id="to"
                  maxLength={4}
                  value={values.to}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.to ? (<div className="entry__col_error">{touched.to && errors.to}</div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">
                  チ ボイラー製造等強烈な騒音を発する場所における業務
                </div>
                <label htmlFor="chi" />
                <input
                  className={
                    !(touched.chi && errors.chi)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="chi"
                  id="chi"
                  maxLength={4}
                  value={values.chi}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.chi ? (<div className="entry__col_error">{touched.chi && errors.chi}</div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">リ 坑内における業務</div>
                <label htmlFor="ri" />
                <input
                  className={
                    !(touched.ri && errors.ri) ? 'u_flat u_w160' : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="ri"
                  id="ri"
                  maxLength={4}
                  value={values.ri}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.ri ? (<div className="entry__col_error">{touched.ri && errors.ri}</div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">ヌ 深夜業を含む業務</div>
                <label htmlFor="nu" />
                <input
                  className={
                    !(touched.nu && errors.nu) ? 'u_flat u_w160' : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="nu"
                  id="nu"
                  maxLength={4}
                  value={values.nu}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.nu ? (<div className="entry__col_error">{touched.nu && errors.nu}</div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">
                  ル
                  水銀、砒(ひ)素、黄りん、弗(ふつ)化水素酸、塩酸、硝酸、硫酸、青酸、か性アルカリ、石炭酸その他これらに準ずる有害物を取り扱う業務
                </div>
                <label htmlFor="ru" />
                <input
                  className={
                    !(touched.ru && errors.ru) ? 'u_flat u_w160' : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="ru"
                  id="ru"
                  maxLength={4}
                  value={values.ru}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.ru ? (<div className="entry__col_error">{touched.ru && errors.ru}</div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">
                  ヲ
                  鉛、水銀、クロム、砒(ひ)素、黄りん、弗(ふつ)化水素、塩素、塩酸、硝酸、亜硫酸、硫酸、一酸化炭素、二硫化炭素、青酸、ベンゼン、アニリンその他これらに準ずる有害物のガス、蒸気又は粉じんを発散する場所における業務
                </div>
                <label htmlFor="wo" />
                <input
                  className={
                    !(touched.wo && errors.wo) ? 'u_flat u_w160' : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="wo"
                  id="wo"
                  maxLength={4}
                  value={values.wo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.wo ? (<div className="entry__col_error">{touched.wo && errors.wo}</div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">ワ 病原体によつて汚染のおそれが著しい業務</div>
                <label htmlFor="wa" />
                <input
                  className={
                    !(touched.wa && errors.wa) ? 'u_flat u_w160' : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="wa"
                  id="wa"
                  maxLength={4}
                  value={values.wa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.wa ? (<div className="entry__col_error">{touched.wa && errors.wa}</div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">カ その他厚生労働大臣が定める業務</div>
                <label htmlFor="ka" />
                <input
                  className={
                    !(touched.ka && errors.ka) ? 'u_flat u_w160' : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="ka"
                  id="ka"
                  maxLength={4}
                  value={values.ka}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.ka ? (<div className="entry__col_error">{touched.ka && errors.ka}</div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col">
                <div className="entry__col_title">計</div>
                <label htmlFor="sum" />
                <input
                  className={
                    !(touched.sum && errors.sum)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="sum"
                  id="sum"
                  maxLength={5}
                  value={values.sum}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.sum ? (<div className="entry__col_error">{touched.sum && errors.sum}</div>
                ) : null}
              </div>
            </div>
          </div>
          {/* ============================================================ */}
          <div className="headLine">
            <h2 className="headLine__title">健康診断項目</h2>
          </div>
          <div className="entry__cell">
            <div className="entry__row">
              <div className="entry__col_title">聴力検査(オージオメーターによる検査)(1000Hz)</div>
              <label htmlFor="hearingH1k" />
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">実施者数</div>
                <input
                  className={
                    !(touched.hearingH1kAll && errors.hearingH1kAll)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="hearingH1kAll"
                  id="hearingH1kAll"
                  maxLength={5}
                  value={values.hearingH1kAll}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.hearingH1kAll ? (<div className="entry__col_error">
                  {touched.hearingH1kAll && errors.hearingH1kAll}
                </div>
                ) : null}
              </div>
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">有所見者数</div>
                <input
                  className={
                    !(touched.hearingH1kObserved && errors.hearingH1kObserved)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="hearingH1kObserved"
                  id="hearingH1kObserved"
                  maxLength={4}
                  value={values.hearingH1kObserved}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.hearingH1kObserved ? (
                  <div className="entry__col_error">
                    {touched.hearingH1kObserved && errors.hearingH1kObserved}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col_title">聴力検査(オージオメーターによる検査)(4000Hz)</div>
              <label htmlFor="hearingH4k" />
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">実施者数</div>
                <input
                  className={
                    !(touched.hearingH4kAll && errors.hearingH4kAll)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="hearingH4kAll"
                  id="hearingH4kAll"
                  maxLength={5}
                  value={values.hearingH4kAll}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.hearingH4kAll ? (
                  <div className="entry__col_error">
                    {touched.hearingH4kAll && errors.hearingH4kAll}
                  </div>
                ) : null}
              </div>
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">有所見者数</div>
                <input
                  className={
                    !(touched.hearingH4kObserved && errors.hearingH4kObserved)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="hearingH4kObserved"
                  id="hearingH4kObserved"
                  maxLength={4}
                  value={values.hearingH4kObserved}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.hearingH4kObserved ? (
                  <div className="entry__col_error">
                    {touched.hearingH4kObserved && errors.hearingH4kObserved}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col_title">聴力検査(その他の方法による検査)</div>
              <label htmlFor="hearingOthers" />
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">実施者数</div>
                <input
                  className={
                    !(touched.hearingOthersAll && errors.hearingOthersAll)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="hearingOthersAll"
                  id="hearingOthersAll"
                  maxLength={5}
                  value={values.hearingOthersAll}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.hearingOthersAll ? (
                  <div className="entry__col_error">
                    {touched.hearingOthersAll && errors.hearingOthersAll}
                  </div>
                ) : null}
              </div>
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">有所見者数</div>
                <input
                  className={
                    !(touched.hearingOthersObserved && errors.hearingOthersObserved)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="hearingOthersObserved"
                  id="hearingOthersObserved"
                  maxLength={4}
                  value={values.hearingOthersObserved}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.hearingOthersObserved ? (
                  <div className="entry__col_error">
                    {touched.hearingOthersObserved && errors.hearingOthersObserved}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col_title">胸部エックス線検査</div>
              <label htmlFor="chestXray" />
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">実施者数</div>
                <input
                  className={
                    !(touched.chestXrayAll && errors.chestXrayAll)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="chestXrayAll"
                  id="chestXrayAll"
                  maxLength={5}
                  value={values.chestXrayAll}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.chestXrayAll ? (
                  <div className="entry__col_error">
                    {touched.chestXrayAll && errors.chestXrayAll}
                  </div>
                ) : null}
              </div>
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">有所見者数</div>
                <input
                  className={
                    !(touched.chestXrayObserved && errors.chestXrayObserved)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="chestXrayObserved"
                  id="chestXrayObserved"
                  maxLength={4}
                  value={values.chestXrayObserved}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.chestXrayObserved ? (
                  <div className="entry__col_error">
                    {touched.chestXrayObserved && errors.chestXrayObserved}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col_title">喀痰(かくたん)検査</div>
              <label htmlFor="sputm" />
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">実施者数</div>
                <input
                  className={
                    !(touched.sputmAll && errors.sputmAll)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="sputmAll"
                  id="sputmAll"
                  maxLength={5}
                  value={values.sputmAll}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.sputmAll ? (<div className="entry__col_error">{touched.sputmAll && errors.sputmAll}</div>
                ) : null}
              </div>
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">有所見者数</div>
                <input
                  className={
                    !(touched.sputmObserved && errors.sputmObserved)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="sputmObserved"
                  id="sputmObserved"
                  maxLength={4}
                  value={values.sputmObserved}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.sputmObserved ? (
                  <div className="entry__col_error">
                    {touched.sputmObserved && errors.sputmObserved}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col_title">血圧</div>
              <label htmlFor="bloodPressure" />
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">実施者数</div>
                <input
                  className={
                    !(touched.bloodPressureAll && errors.bloodPressureAll)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="bloodPressureAll"
                  id="bloodPressureAll"
                  maxLength={5}
                  value={values.bloodPressureAll}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.bloodPressureAll ? (
                  <div className="entry__col_error">
                    {touched.bloodPressureAll && errors.bloodPressureAll}
                  </div>
                ) : null}
              </div>
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">有所見者数</div>
                <input
                  className={
                    !(touched.bloodPressureObserved && errors.bloodPressureObserved)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="bloodPressureObserved"
                  id="bloodPressureObserved"
                  maxLength={4}
                  value={values.bloodPressureObserved}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.bloodPressureObserved ? (
                  <div className="entry__col_error">
                    {touched.bloodPressureObserved && errors.bloodPressureObserved}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col_title">貧血検査</div>
              <label htmlFor="anemia" />
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">実施者数</div>
                <input
                  className={
                    !(touched.anemiaAll && errors.anemiaAll)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="anemiaAll"
                  id="anemiaAll"
                  maxLength={5}
                  value={values.anemiaAll}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.anemiaAll ? (
                  <div className="entry__col_error">{touched.anemiaAll && errors.anemiaAll}</div>
                ) : null}
              </div>
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">有所見者数</div>
                <input
                  className={
                    !(touched.anemiaObserved && errors.anemiaObserved)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="anemiaObserved"
                  id="anemiaObserved"
                  maxLength={4}
                  value={values.anemiaObserved}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.anemiaObserved ? (
                  <div className="entry__col_error">
                    {touched.anemiaObserved && errors.anemiaObserved}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col_title">肝機能検査</div>
              <label htmlFor="liver" />
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">実施者数</div>
                <input
                  className={
                    !(touched.liverAll && errors.liverAll)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="liverAll"
                  id="liverAll"
                  maxLength={5}
                  value={values.liverAll}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.liverAll ? (
                  <div className="entry__col_error">{touched.liverAll && errors.liverAll}</div>
                ) : null}
              </div>
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">有所見者数</div>
                <input
                  className={
                    !(touched.liverObserved && errors.liverObserved)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="liverObserved"
                  id="liverObserved"
                  maxLength={4}
                  value={values.liverObserved}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.liverObserved ? (
                  <div className="entry__col_error">
                    {touched.liverObserved && errors.liverObserved}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col_title">血糖検査</div>
              <label htmlFor="glucose" />
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">実施者数</div>
                <input
                  className={
                    !(touched.glucoseAll && errors.glucoseAll)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="glucoseAll"
                  id="glucoseAll"
                  maxLength={5}
                  value={values.glucoseAll}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.glucoseAll ? (
                  <div className="entry__col_error">
                    {touched.glucoseAll && errors.glucoseAll}
                  </div>
                ) : null}
              </div>
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">有所見者数</div>
                <input
                  className={
                    !(touched.glucoseObserved && errors.glucoseObserved)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="glucoseObserved"
                  id="glucoseObserved"
                  maxLength={4}
                  value={values.glucoseObserved}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.glucoseObserved ? (
                  <div className="entry__col_error">
                    {touched.glucoseObserved && errors.glucoseObserved}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col_title">尿検査(糖)</div>
              <label htmlFor="urinePSugar" />
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">実施者数</div>
                <input
                  className={
                    !(touched.urinePSugarAll && errors.urinePSugarAll)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="urinePSugarAll"
                  id="urinePSugarAll"
                  maxLength={5}
                  value={values.urinePSugarAll}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.urinePSugarAll ? (<div className="entry__col_error">
                  {touched.urinePSugarAll && errors.urinePSugarAll}
                </div>
                ) : null}
              </div>
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">有所見者数</div>
                <input
                  className={
                    !(touched.urinePSugarObserved && errors.urinePSugarObserved)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="urinePSugarObserved"
                  id="urinePSugarObserved"
                  maxLength={4}
                  value={values.urinePSugarObserved}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.urinePSugarObserved ? (<div className="entry__col_error">
                  {touched.urinePSugarObserved && errors.urinePSugarObserved}
                </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col_title">尿検査(蛋白)</div>
              <label htmlFor="urineProtein" />
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">実施者数</div>
                <input
                  className={
                    !(touched.urineProteinAll && errors.urineProteinAll)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="urineProteinAll"
                  id="urineProteinAll"
                  maxLength={5}
                  value={values.urineProteinAll}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.urineProteinAll ? (<div className="entry__col_error">
                  {touched.urineProteinAll && errors.urineProteinAll}
                </div>
                ) : null}
              </div>
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">有所見者数</div>
                <input
                  className={
                    !(touched.urineProteinObserved && errors.urineProteinObserved)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="urineProteinObserved"
                  id="urineProteinObserved"
                  maxLength={4}
                  value={values.urineProteinObserved}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.urineProteinObserved ? (<div className="entry__col_error">
                  {touched.urineProteinObserved && errors.urineProteinObserved}
                </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col_title">心電図検査</div>
              <label htmlFor="electroCardiogram" />
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">実施者数</div>
                <input
                  className={
                    !(touched.electroCardiogramAll && errors.electroCardiogramAll)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="electroCardiogramAll"
                  id="electroCardiogramAll"
                  maxLength={5}
                  value={values.electroCardiogramAll}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.electroCardiogramAll ? (<div className="entry__col_error">
                  {touched.electroCardiogramAll && errors.electroCardiogramAll}
                </div>
                ) : null}
              </div>
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">有所見者数</div>
                <input
                  className={
                    !(touched.electroCardiogramObserved && errors.electroCardiogramObserved)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="electroCardiogramObserved"
                  id="electroCardiogramObserved"
                  maxLength={4}
                  value={values.electroCardiogramObserved}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.electroCardiogramObserved ? (<div className="entry__col_error">
                  {touched.electroCardiogramObserved && errors.electroCardiogramObserved}
                </div>
                ) : null}
              </div>
            </div>
          </div>
          {/* ============================================================ */}
          <div className="headLine">
            <h2 className="headLine__title">その他項目</h2>
          </div>
          <div className="entry__cell">
            <div className="entry__row">
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_title">所見のあった者の人数</div>
                <label htmlFor="numberOfObserved" />
                <input
                  className={
                    !(touched.numberOfObserved && errors.numberOfObserved)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="numberOfObserved"
                  id="numberOfObserved"
                  maxLength={5}
                  value={values.numberOfObserved}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.numberOfObserved ? (<div className="entry__col_error">
                  {touched.numberOfObserved && errors.numberOfObserved}
                </div>
                ) : null}
              </div>
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_title">医師の指示人数</div>
                <label htmlFor="numberOfMedicalTreatmented" />
                <input
                  className={
                    !(touched.numberOfMedicalTreatmented && errors.numberOfMedicalTreatmented)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="numberOfMedicalTreatmented"
                  id="numberOfMedicalTreatmented"
                  maxLength={5}
                  value={values.numberOfMedicalTreatmented}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.numberOfMedicalTreatmented ? (<div className="entry__col_error">
                  {touched.numberOfMedicalTreatmented && errors.numberOfMedicalTreatmented}
                </div>
                ) : null}
              </div>
            </div>
            <div className="entry__row">
              <div className="entry__col_title">歯科健診</div>
              <label htmlFor="dental" />
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">実施者数</div>
                <input
                  className={
                    !(touched.dentalAll && errors.dentalAll)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="dentalAll"
                  id="dentalAll"
                  maxLength={5}
                  value={values.dentalAll}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.dentalAll ? (<div className="entry__col_error">{touched.dentalAll && errors.dentalAll}</div>
                ) : null}
              </div>
              <div className="entry__col entry__col-w50p">
                <div className="entry__col_titleS">有所見者数</div>
                <input
                  className={
                    !(touched.dentalObserved && errors.dentalObserved)
                      ? 'u_flat u_w160'
                      : 'u_flat u_w160 u_errorBorder'
                  }
                  type="number"
                  min={0}
                  name="dentalObserved"
                  id="dentalObserved"
                  maxLength={4}
                  value={values.dentalObserved}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                &ensp;人
                    {errors.dentalObserved ? (<div className="entry__col_error">
                  {touched.dentalObserved && errors.dentalObserved}
                </div>
                ) : null}
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

export default CheckupReportForm

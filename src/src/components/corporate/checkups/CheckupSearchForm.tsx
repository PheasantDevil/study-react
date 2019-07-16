import * as React from 'react'
import { withFormik } from 'formik'
import OrganizationWithUnits from '../../../swagger/model/organizationWithUnits'
import ConsultationStatus from '../../../swagger/model/consultationStatus'
import MedicalCheckupOpinionOnEmploymentStatus from '../../../swagger/model/medicalCheckupOpinionOnEmploymentStatus'
import Decision from '../../../swagger/model/decision'
import MedicalCheckupProjectMetadataWithNumberOfTargets from '../../../swagger/model/medicalCheckupProjectMetadataWithNumberOfTargets'

const queryString = require('query-string')

interface Props {
  queryPush(queryString: string): void
  organizationUnits: OrganizationWithUnits
  decisions: Decision[]
  consultationStatuses: ConsultationStatus[]
  opinionOnEmploymentStatuses: MedicalCheckupOpinionOnEmploymentStatus[]
  projects: MedicalCheckupProjectMetadataWithNumberOfTargets[]
  querySearch: Values
}

interface Values {
  projectId?: number
  selected: number
  employeeCode: string
  name: string
  unitIds: number[]
  statuses: string[]
  medicalDiagnosisIds: number[] // 総合判定
  standardValueSetId?: number
  outOfStandardValueSet: boolean
  checkupOpinionOnEmploymentStatusIds: number[] // 医師の意見
  consultationStatusIds: number[] // 面談
}

const CheckupSearchForm = withFormik<Props, Values>({
  mapPropsToValues(props) {
    return {
      projectid: props.querySearch.projectId,
      selected: props.querySearch.selected,
      employeeCode: props.querySearch.employeeCode,
      name: props.querySearch.name,
      unitIds: [],
      statuses: [],
      medicalDiagnosisIds: props.querySearch.medicalDiagnosisIds,
      standardValueSetId: void 0,
      outOfStandardValueSet: false,
      checkupOpinionOnEmploymentStatusIds: props.querySearch.checkupOpinionOnEmploymentStatusIds,
      consultationStatusIds: props.querySearch.consultationStatusIds
    }
  },
  handleSubmit(values, { props }) {
    const stringified = queryString.stringify(values)
    props.queryPush(stringified)
  }
})(
  ({
    decisions,
    consultationStatuses,
    opinionOnEmploymentStatuses,
    projects,
    status,
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
    touched,
    values
  }) => (
    <form onSubmit={handleSubmit}>
      <div className="search__select">
        <label className="triangles" htmlFor="projectId">
          <select
            name="projectId"
            value={values.projectId}
            onBlur={handleBlur}
            onChange={e => setFieldValue('projectId', e.target.value)}
          >
            <option value="">全件表示</option>
            {projects.map(project => (
              <option value={project.id} key={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="">
        <span>{status}</span>
        <label className="search__grid_title" htmlFor="employeeCode">
          社員番号
        </label>
        <input
          type="text"
          name="employeeCode"
          id="employeeCode"
          value={values.employeeCode}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="">
        <span>{touched.name && errors.name}</span>
        <label className="search__grid_title" htmlFor="name">
          氏名
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="search__grid">
        <span>{touched.name && errors.name}</span>
        <label className="search__grid_title" htmlFor="decisions">
          総合判定
          <div className="search__grid_row">
            {decisions.map(d => (
              <label
                className="search__grid_switch"
                key={d.id}
                htmlFor={`medicalDiagnosisId${d.id}`}
              >
                <input
                  id={`medicalDiagnosisId${d.id}`}
                  type="checkbox"
                  checked={values.medicalDiagnosisIds.includes(d.id)}
                  onChange={() =>
                    setFieldValue(
                      'medicalDiagnosisIds',
                      values.medicalDiagnosisIds.includes(d.id)
                        ? values.medicalDiagnosisIds.filter(id => id !== d.id)
                        : [...values.medicalDiagnosisIds, d.id]
                    )
                  }
                />
                {d.value}
              </label>
            ))}
          </div>
        </label>
      </div>
      <div className="search__grid">
        <label className="search__grid_title" htmlFor="consultationStatuses">
          面談
          <div className="search__grid_row">
            {consultationStatuses.map(c => (
              <label
                className="search__grid_switch"
                key={c.id}
                htmlFor={`consultationStatus${c.id}`}
              >
                <input
                  id={`consultationStatus${c.id}`}
                  type="checkbox"
                  checked={values.consultationStatusIds.includes(c.id)}
                  onChange={() =>
                    setFieldValue(
                      'consultationStatusIds',
                      values.consultationStatusIds.includes(c.id)
                        ? values.consultationStatusIds.filter(id => id !== c.id)
                        : [...values.consultationStatusIds, c.id]
                    )
                  }
                />
                {c.name}
              </label>
            ))}
          </div>
        </label>
      </div>
      <div className="search__grid">
        <label className="search__grid_title" htmlFor="opinionOnEmploymentStatuses">
          医師の意見
          <div className="search__grid_row">
            {opinionOnEmploymentStatuses.map(o => (
              <label className="search__grid_switch" key={o.id} htmlFor={`opinionStatus${o.id}`}>
                <input
                  id={`opinionStatus${o.id}`}
                  type="checkbox"
                  checked={values.checkupOpinionOnEmploymentStatusIds.includes(o.id)}
                  onChange={() =>
                    setFieldValue(
                      'checkupOpinionOnEmploymentStatusIds',
                      values.checkupOpinionOnEmploymentStatusIds.includes(o.id)
                        ? values.checkupOpinionOnEmploymentStatusIds.filter(id => id !== o.id)
                        : [...values.checkupOpinionOnEmploymentStatusIds, o.id]
                    )
                  }
                />
                {o.name}
              </label>
            ))}
          </div>
        </label>
      </div>
      <div className="search__grid">
        <button className="search__grid_button search__grid_button-blue" type="submit">
          検索
        </button>
      </div>
    </form>
  )
)

export default CheckupSearchForm

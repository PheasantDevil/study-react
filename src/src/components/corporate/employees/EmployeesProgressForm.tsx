import * as React from 'react'
import { withFormik } from 'formik'

const queryString = require('query-string')

interface Props {
  queryPush(queryString: string): void
  employeeCode: string
  name: string
  selected: number
}

interface Values {
  employeeCode: string
  name: string
}

const EmployeesProgressForm = withFormik<Props, Values>({
  mapPropsToValues: props => {
    return {
      employeeCode: props.employeeCode,
      name: props.name
    }
  },
  handleSubmit(values, { props }) {
    const stringified = queryString.stringify({ ...values, selected: 0 })
    props.queryPush(stringified)
  }
})(({ status, errors, handleSubmit, handleBlur, handleChange, setFieldValue, touched, values }) => (
  <form onSubmit={handleSubmit}>
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
    <div className="">
      <button className="search__grid_button search__grid_button-blue" type="submit">
        絞り込み
      </button>
    </div>
  </form>
))

export default EmployeesProgressForm

import * as React from 'react'
import { ConsultationType, consultationTypes } from '../../../models/ConsultationType'

interface Props {
  disabled: boolean
  consultationType: ConsultationType | null
  handleChangeConsultationType: React.ChangeEventHandler<HTMLSelectElement>
}

const ConsultationEditBase: React.FunctionComponent<Props> = ({
  disabled,
  consultationType,
  handleChangeConsultationType,
  children
}) => {
  return (
    <>
      <div className="head">
        <h1 className="head__title">面談記録・意見書登録</h1>
        <div className="head__select">
          <label className="triangles" htmlFor="medicalCheckup">
            <select
              className="select"
              id="medicalCheckup"
              value={consultationType || ''}
              onChange={handleChangeConsultationType}
              disabled={disabled}
            >
              <option value={''}>選択してください</option>
              {consultationTypes.map(({ label, type }) => (
                <option key={type} value={type}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      {children}
    </>
  )
}

export default ConsultationEditBase

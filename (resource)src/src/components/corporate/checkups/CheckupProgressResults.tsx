import * as React from 'react'
import { DepartmentTreeItem } from '../../../if/Department'
import { formatDepartment } from '../../../util/DepartmentHelper'
import ConsultationStatus from '../../../swagger/model/consultationStatus'
import MedicalCheckupOpinionOnEmploymentStatus from '../../../swagger/model/medicalCheckupOpinionOnEmploymentStatus'
import Decision from '../../../swagger/model/decision'
import CheckupResults from '../../../swagger/model/checkupResults'

type Props = {
  decisions: Decision[]
  departments: DepartmentTreeItem[]
  consultationStatuses: ConsultationStatus[]
  opinionOnEmploymentStatuses: MedicalCheckupOpinionOnEmploymentStatus[]
  projectName: string
} & CheckupResults

class CheckupProgressResults extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const {
      departments,
      decisions,
      consultationStatuses,
      opinionOnEmploymentStatuses,
      projectName,
      rows
      // supports
    } = this.props

    return (
      <>
        <h4>{projectName}</h4>
        <table>
          <thead>
            <tr>
              <th>従業員番号</th>
              <th>氏名</th>
              <th>部署</th>
              <th>医療機関総合判定</th>
              <th>医師の意見</th>
              <th>面談</th>
              {/* <th>対応履歴</th> */}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td>{row.employeeCode}</td>
                <td>{`${row.familyName} ${row.givenName}`}</td>
                <td>
                  {row.organizationUnitId
                    ? formatDepartment(departments, row.organizationUnitId)
                    : null}
                </td>
                <td>
                  {row.synthesisDiagnosisDecisionId
                    ? decisions.find(d => d.id === row.synthesisDiagnosisDecisionId)!.value
                    : null}
                </td>
                <td>
                  {row.checkupOpinionOnEmploymentStatusId
                    ? opinionOnEmploymentStatuses.find(
                        o => o.id === row.checkupOpinionOnEmploymentStatusId
                      )!.name
                    : null}
                </td>
                <td>
                  {row.consultationStatusId
                    ? consultationStatuses.find(c => c.id === row.consultationStatusId)!.name
                    : null}
                </td>
                {/* <td>
                <ul>
                  {supports
                    .filter(s => s.targetId === row.medicalCheckupTargetId)
                    .map(s => (
                      <li>
                        <span>{s.recorded}</span>
                        <span>{s.content}</span>
                      </li>
                    ))}
                </ul>
              </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }
}

export default CheckupProgressResults

import * as React from 'react'
import CheckupMetadata from '../../../swagger/model/checkupMetadata'

interface Props {
  checkupResultSelect: CheckupMetadata[] // 健診結果一覧
  checkupResult: CheckupMetadata // 健診結果
  changeProject: (projectId: number) => void
}

const CheckupResultHeader: React.FunctionComponent<Props> = ({
  checkupResultSelect,
  checkupResult,
  changeProject
}) => {
  return (
    <>
      <div className="head head-iconRight">
        <h1 className="head__title">健康診断結果</h1>

        <div className="head__select">
          <label className="triangles" htmlFor="year">
            <select
              className="select"
              id="year"
              value={checkupResult.checkupTargetId}
              onChange={e => changeProject(parseInt(e.target.value, 10))}
            >
              {checkupResultSelect.map(projectName => (
                <option value={projectName.checkupTargetId} key={projectName.checkupTargetId}>
                  {projectName.checkupProjectName}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* TODO: 結果をPDFでDLできる様にする */}
        <div className="head__icon">
          <a className="head__circle head__circle-icon5" href="" />
        </div>
      </div>
    </>
  )
}

export default CheckupResultHeader

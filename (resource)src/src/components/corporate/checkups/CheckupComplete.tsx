import * as React from 'react'
import { Link } from 'react-router-dom'
import { corporateCheckupsSetting } from '../../../config/Url'
import MedicalCheckupProjectMetadata from '../../../swagger/model/medicalCheckupProjectMetadata'

const CheckupComplete: React.FunctionComponent<{
  isNew: boolean
  projectId: number
  project: MedicalCheckupProjectMetadata | null
}> = ({ isNew, projectId, project }) => (
  <>
    <div className="head">
      <h1 className="head__title">{isNew ? '健康診断新規登録' : `${project!.year}年健康診断`}</h1>
    </div>

    <div className="l_grid l_grid-border l_grid-spaceL">
      <div className="complete">
        <div className="complete__text">完了しました。</div>
        <div className="complete__circle" />
      </div>

      <div className="l_switch">
        <div className="l_switch__w1">
          <Link to={corporateCheckupsSetting} className="u_switch u_switch-blue">
            一覧へ戻る
          </Link>
        </div>
      </div>
    </div>
  </>
)

export default React.memo(CheckupComplete)

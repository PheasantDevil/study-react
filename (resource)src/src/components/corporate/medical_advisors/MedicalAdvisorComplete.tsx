import * as React from 'react'
import { Link } from 'react-router-dom'
import { corporateMedicalAdvisors } from '../../../config/Url'

const MedicalAdvisorComplete: React.FunctionComponent<{
  isNew: boolean
  medicalAdvisorId: number
  toAddNewMedicalAdvisor: () => void
}> = ({ isNew, medicalAdvisorId, toAddNewMedicalAdvisor }) => (
  <>
    <div className="head">
      <h1 className="head__title">{isNew ? '産業医新規登録' : '産業医編集'}</h1>
    </div>

    <div className="l_grid l_grid-border l_grid-spaceL">
      <div className="complete">
        <div className="complete__text">完了しました。</div>
        <div className="complete__circle" />
      </div>

      <div className="l_switch">
        <div className="l_switch__w1">
          {isNew ? (
            <button className="u_switch" onClick={toAddNewMedicalAdvisor}>
              続けて登録する
            </button>
          ) : (
            ''
          )}
          <Link to={corporateMedicalAdvisors} className="u_switch u_switch-blue">
            完了
          </Link>
        </div>
      </div>
    </div>
  </>
)

export default React.memo(MedicalAdvisorComplete)

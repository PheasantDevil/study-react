import * as React from 'react'
import { Link } from 'react-router-dom'
import { corporateConsultations } from '../../../config/Url'

const ConsultationMedicalCheckupComplete: React.FunctionComponent = () => (
  <div className="l_grid l_grid-border l_grid-spaceL">
    <div className="complete">
      <div className="complete__text">完了しました。</div>
      <div className="complete__circle" />
    </div>
    <div className="l_switch">
      <div className="l_switch__w1">
        <Link className="u_switch u_switch-blue" to={corporateConsultations}>
          一覧へ戻る
        </Link>
      </div>
    </div>
  </div>
)

export default ConsultationMedicalCheckupComplete

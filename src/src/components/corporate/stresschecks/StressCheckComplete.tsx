import * as React from 'react'
import { Link } from 'react-router-dom'
import { corporateStresschecksSetting } from '../../../config/Url'
import StressCheckProject from '../../../swagger/model/stressCheckProject'

const StressCheckComplete: React.FunctionComponent<{
  isNew: boolean
  project: StressCheckProject | null
}> = ({ isNew, project }) => (
  <>
    <div className="head">
      <h1 className="head__title">
        {isNew ? 'ストレスチェックの新規登録' : `${project!.year}年ストレスチェック`}
      </h1>
    </div>

    <div className="l_grid l_grid-border l_grid-spaceL">
      <div className="complete">
        <div className="complete__text">完了しました。</div>
        <div className="complete__circle" />
      </div>

      <div className="l_switch">
        <div className="l_switch__w1">
          <Link to={corporateStresschecksSetting} className="u_switch u_switch-blue">
            一覧へ戻る
          </Link>
        </div>
      </div>
    </div>
  </>
)

export default React.memo(StressCheckComplete)

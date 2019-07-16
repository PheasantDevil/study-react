import * as React from 'react'
import StressCheckTargetMetadata from '../../../swagger/model/stressCheckTargetMetadata'
import StressCheckResult from '../../../swagger/model/stressCheckResult'
import Questionnaire from '../../../swagger/model/questionnaire'
import StressCheckResultScoreTab from './StressCheckResultScoreTab'
import StressCheckResultTab from './StressCheckResultTab'
import StressCheckEvaluationScore from '../../../swagger/model/stressCheckEvaluationScore'
import StressEvaluationGroup from '../../../swagger/model/stressEvaluationGroup'
import AuthorizationInfo from '../../../swagger/model/authorizationInfo'
import { Link } from 'react-router-dom'

interface Props {
  targetId: number
  selectedTab: string | string[]
  stressCheckResultSelect: StressCheckTargetMetadata[] /** stressCheckSelectで取得したデータを配列として格納 */
  stressCheckEvaluationScore: StressCheckEvaluationScore /** ストレス診断結果の一覧取得 stressCheckResultのscoreの中身 */
  stressCheckResult: StressCheckResult
  stressCheckScores: StressCheckResult[]
  stressEvaluationGroup: StressEvaluationGroup[]
  questionnaire: Questionnaire | null
  employeeInfo: AuthorizationInfo
  changeResult: (targetId: number) => void
  consultationOffer: () => void
}

const StressCheckResultHeader: React.FunctionComponent<Props> = ({
  targetId,
  selectedTab,
  stressCheckResultSelect,
  stressCheckEvaluationScore,
  stressCheckResult,
  stressCheckScores,
  stressEvaluationGroup,
  questionnaire,
  changeResult,
  consultationOffer,
  employeeInfo
}) => (
  <>
    <div className="head">
      <h1 className="head__title">ストレスチェック結果</h1>
      <div className="head__select">
        <select
          className="select"
          id="year"
          value={targetId}
          onChange={e => changeResult(parseInt(e.target.value, 10))}
        >
          {stressCheckResultSelect.map(r => (
            <option key={r.stresscheckTargetId} value={r.stresscheckTargetId}>
              {r.stresscheckProjectName}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="tabNav is-tabNav">
      <div className="tabNav__item">
        <Link
          className={`tabNav__link ${
            selectedTab === 'stresschecksResult' ? 'tabNav__link-current' : ''
          }`}
          to={`?selected=stresschecksResult`}
        >
          ストレスチェック結果
        </Link>
      </div>
      <div className="tabNav__item">
        <Link
          className={`tabNav__link ${
            selectedTab === 'stresschecksResultSelectedList' ? 'tabNav__link-current' : ''
          }`}
          to={`?selected=stresschecksResultSelectedList`}
        >
          回答一覧
        </Link>
      </div>
    </div>

    {selectedTab === 'stresschecksResult' ? (
      <StressCheckResultScoreTab
        stressCheckEvaluationScore={stressCheckEvaluationScore}
        stressCheckResult={stressCheckResult}
        stressCheckScores={stressCheckScores}
        consultationOffer={consultationOffer}
        stressEvaluationGroup={stressEvaluationGroup}
        employeeInfo={employeeInfo}
      />
    ) : null}
    {selectedTab === 'stresschecksResultSelectedList' ? (
      <StressCheckResultTab questionnaire={questionnaire!} answer={stressCheckResult.items} />
    ) : null}
  </>
)

export default StressCheckResultHeader

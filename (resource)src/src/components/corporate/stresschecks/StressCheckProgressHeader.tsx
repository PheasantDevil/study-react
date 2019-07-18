import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  corporateStresschecksNew,
  corporateStresschecksReportsUrl,
  corporateStresschecksEmployeeEditUrl
} from '../../../config/Url'
import StressCheckProject from '../../../swagger/model/stressCheckProject'
import StressCheckRate from '../../../swagger/model/stressCheckRate'

interface Props {
  selectedProject: StressCheckProject /*ストレス診断の一覧取得*/
  projects: StressCheckProject[] /* ストレス診断の内容を配列として格納  */
  stressCheckRate: StressCheckRate /* ストレス診断の総数・実施 */
  editProject: () => void
}

const StressCheckProgressHeader: React.FunctionComponent<Props> = ({
  projects,
  selectedProject,
  stressCheckRate,
  editProject
}) => (
  <div>
    <Link to={corporateStresschecksNew}>
      <button>新規作成</button>
    </Link>
    <dl>
      <dt>実施期間</dt>
      <dd>{`${selectedProject.period.start} 〜 ${selectedProject.period.end}`}</dd>
      <dt>受診率</dt>
      <dd>{`${(stressCheckRate.did / stressCheckRate.all) * 100}％（${stressCheckRate.all}人中${
        stressCheckRate.did
      }人受診）`}</dd>
    </dl>
    <button onClick={editProject}>編集</button>
    <Link to={corporateStresschecksReportsUrl(selectedProject.id)}>
      <button>報告書作成</button>
    </Link>
    <Link to={corporateStresschecksEmployeeEditUrl(selectedProject.id)}>
      <button>従業員追加/削除</button>
    </Link>
  </div>
)

export default StressCheckProgressHeader

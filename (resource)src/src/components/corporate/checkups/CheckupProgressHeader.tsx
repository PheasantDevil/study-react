import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  corporateCheckupsReportsUrl,
  corporateCheckupsNew,
  corporateCheckupsEmployeeEditUrl
} from '../../../config/Url'
import MedicalCheckupProjectMetadata from '../../../swagger/model/medicalCheckupProjectMetadata'
import CheckupRate from '../../../swagger/model/checkupRate'

interface Props {
  selectedProject: MedicalCheckupProjectMetadata
  projects: MedicalCheckupProjectMetadata[]
  checkupRate: CheckupRate
  editProject: () => void
}

const CheckupProgressHeader: React.FunctionComponent<Props> = ({
  selectedProject,
  checkupRate,
  editProject
}) => (
  <div>
    <Link to={corporateCheckupsNew}>
      <button>新規作成</button>
    </Link>
    <br />
    <dl>
      <dt>実施期間</dt>
      <dd>{`${selectedProject.period.start} 〜 ${selectedProject.period.end}`}</dd>
      <dt>受診率</dt>
      <dd>{`${(checkupRate.did / checkupRate.all) * 100}％（${checkupRate.all}人中${
        checkupRate.did
      }人受診）`}</dd>
    </dl>
    <button onClick={editProject}>編集</button>

    <Link to={corporateCheckupsReportsUrl(selectedProject.id)}>
      <button>報告書作成</button>
    </Link>
    <Link to={corporateCheckupsEmployeeEditUrl(selectedProject.id)}>
      <button>従業員追加/削除</button>
    </Link>
  </div>
)

export default CheckupProgressHeader

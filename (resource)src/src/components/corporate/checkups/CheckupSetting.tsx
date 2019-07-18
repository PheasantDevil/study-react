import * as React from 'react'
import { Link } from 'react-router-dom'
import MedicalCheckupProjectMetadataWithNumberOfTargets from '../../../swagger/model/medicalCheckupProjectMetadataWithNumberOfTargets'
import { corporateCheckupsNew, corporateCheckupsEditUrl } from '../../../config/Url'

interface Props {
  projects: MedicalCheckupProjectMetadataWithNumberOfTargets[]
  projectsBool: boolean
}

const StressCheckSetting: React.FunctionComponent<Props> = ({ projects, projectsBool }) => (
  <>
    <div className="head">
      <h1 className="head__title">設定</h1>
      <div className="operateNav">
        <div className="operateNav__list">
          <div className="operateNav__list_item">
            <Link to={corporateCheckupsNew} className="operateNav__list_link">
              <img src="/img/index/operateNav1.png" alt="" />
            </Link>
          </div>
          {/* チェックボックス+右上ボタンから詳細編集する形にする時に使用する用 */}
          {/* <div className="operateNav__list_item">
            <Link to={corporateCheckupsEditUrl} className="operateNav__list_link">
              <img src="/img/index/operateNav3.png" alt="" />
            </Link>
          </div> */}
          {/* WILLBIE-153対応用 */}
          {/* チェックボックス+右上ボタンから削除する形にする時に使用する用 */}
          <div className="operateNav__list_item">
            <div className="operateNav__list_item">
              <a
                // className={`operateNav__list_link operateNav__list_icon4${
                //   selectedIds.length ? '' : '-disabled'
                // }`}
                className="operateNav__list_link operateNav__list_icon4"
                href="#"
                // onClick={deleteCheckups}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    {projectsBool ? (
      <div className="l_grid l_grid-border">
        <div className="cellFlex cellFlex-colSpace">
          <div className="cellFlex__row">
            <div className="cellFlex__col cellFlex__col-title cellFlex__col-w300">
              <div className="cellFlex__col_checkbox cellFlex__col_checkbox-space">
                <input type="checkbox" id="employee" />
                <label htmlFor="employee" />
              </div>
              <div className="cellFlex__col_text cellFlex__col_text-space">タイトル</div>
            </div>
            <div className="cellFlex__col cellFlex__col-title cellFlex__col-w100">
              <a className="cellFlex__arrow" href="">
                年度
              </a>
            </div>
            <div className="cellFlex__col cellFlex__col-title cellFlex__col-arrow cellFlex__col-w200">
              <a className="cellFlex__arrow" href="">
                実施期間
              </a>
            </div>
          </div>
          {projects.map((project, i) => (
            <Link
              className="cellFlex__row"
              to={corporateCheckupsEditUrl(project.id)}
              key={project.id}
            >
              <div className="cellFlex__col cellFlex__col-text cellFlex__col-w300">
                <div className="cellFlex__col_checkbox cellFlex__col_checkbox-space">
                  <input type="checkbox" id={`employee${i}`} />
                  <label htmlFor={`employee${i}`} />
                </div>
                <div className="cellFlex__col_text cellFlex__col_text-space">{project.name}</div>
              </div>
              <div className="cellFlex__col cellFlex__col-text cellFlex__col-w100">
                {project.year}年
              </div>

              <div className="cellFlex__col cellFlex__col-text cellFlex__col-w200">
                {project.period.start.replace(/-/g, '.')} 〜 {project.period.end.replace(/-/g, '.')}
              </div>
            </Link>
          ))}
        </div>
      </div>
    ) : (
      <div className="l_grid l_grid-border">
        <div className="cellFlex cellFlex-colSpace">
          <p>健康診断結果がありません。</p>
          <p>
            <Link to={corporateCheckupsNew}>新規作成</Link>
            をして健康診断結果を登録しましょう。
          </p>
        </div>
      </div>
    )}
  </>
)

export default StressCheckSetting

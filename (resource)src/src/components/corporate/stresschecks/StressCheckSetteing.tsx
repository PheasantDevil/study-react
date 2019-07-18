import * as React from 'react'
import { Link } from 'react-router-dom'
import StressCheckProjectWithNumberOfTargets from '../../../swagger/model/stressCheckProjectWithNumberOfTargets'
import { corporateStresschecksNew, corporateStresschecksEditUrl } from '../../../config/Url'

interface Props {
  projects: StressCheckProjectWithNumberOfTargets[]
  projectsBool: boolean
}

const StressCheckSetting: React.FunctionComponent<Props> = ({ projects, projectsBool }) => (
  <>
    <div className="head">
      <h1 className="head__title">設定</h1>
      <div className="operateNav">
        <div className="operateNav__list">
          <div className="operateNav__list_item">
            <Link to={corporateStresschecksNew} className="operateNav__list_link">
              <img src="/img/index/operateNav1.png" alt="" />
            </Link>
          </div>
          {/* 編集機能実装用 */}
          {/* <div className="operateNav__list_item">
            <Link to={'corporateStresschecksEdit'} className="operateNav__list_link">
              <img src="/img/index/operateNav3.png" alt="" />
            </Link>
          </div> */}
          <div className="operateNav__list_item">
            <a className="operateNav__list_link" href="">
              <img src="/img/index/operateNav4.png" alt="" />
            </a>
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
              to={corporateStresschecksEditUrl(project.id)}
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
          <p>ストレスチェック結果がありません。</p>
          <p>
            <Link to={corporateStresschecksNew}>新規作成</Link>
            をしてストレスチェック結果を登録しましょう。
          </p>
        </div>
      </div>
    )}
  </>
)

export default StressCheckSetting

import * as React from 'react'
import { withFormik, FormikProps } from 'formik'
// import OrganizationWithUnits from '../../../swagger/model/organizationWithUnits'
import StressCheckOpinionOnEmployment from '../../../swagger/model/stressCheckOpinionOnEmployment'
import StressCheckProject from '../../../swagger/model/stressCheckProject'
const queryString = require('query-string')
import { bind } from 'decko'
import { DepartmentTreeItem } from '../../../if/Department'
import Modal from '../../_parts/Modal'

interface Props {
  queryPush(queryString: string): void
  organizationUnits: DepartmentTreeItem[] // 部署名/id
  // stressCheckTargetResults: StressCheckTargetResults[] // 開示情報
  // consultationStatuses: StressCheckWorkStatuses[] //産業意見ステータス
  opinionOnEmploymentStatuses: StressCheckOpinionOnEmployment[]
  projects: StressCheckProject[]
  querySearch: Values
  querySearchFirst: Values
}

interface State {
  modalIsOpen: boolean
  searchTerms: boolean
  values: Values
  teams: {
    projectName?: string
    employeeCode?: string
    name?: string
    units?: string[]
    statuses?: string[]
    highStress?: string[]
    consultationOffers?: string[]
    stresscheckOpinionOnEmploymentStatus?: string[]
  }
}

interface Values {
  projectId?: number
  employeeCode: string
  name: string
  unitIds: number[]
  statuses: string[]
  highStress: boolean[]
  consultationOffers: boolean[]
  stresscheckOpinionOnEmploymentStatusIds: number[]
}

const stressCheckResultDisclosure = [
  { value: 'yes', text: '未受診' },
  { value: 'ok', text: '開示OK' },
  { value: 'ng', text: '開示NG' }
]

const highStressStatuses = [{ value: true, text: '該当' }, { value: false, text: '非該当' }]

const consultationOffers = [{ value: true, text: 'あり' }, { value: false, text: 'なし' }]

class StressCheckSearchForm extends React.PureComponent<Props & FormikProps<Values>, State> {
  constructor(props: Props & FormikProps<Values>) {
    super(props)
    this.state = {
      modalIsOpen: false,
      searchTerms: false,
      values: props.querySearch,
      teams: {
        projectName: void 0,
        employeeCode: void 0,
        name: void 0,
        units: [],
        statuses: [],
        highStress: [],
        consultationOffers: [],
        stresscheckOpinionOnEmploymentStatus: []
      }
    }
  }

  componentDidMount() {
    this.setState({
      values: this.props.querySearch
    })
    this.searchTerms()
  }

  componentDidUpdate(prevProps: Props & FormikProps<Values>) {
    if (this.props.values !== prevProps.values) {
      console.log('p1')
      console.log(this.props.values)
      console.log('s1')
      console.log(this.state.values)
      this.setState({
        values: this.props.values
      })
      console.log('p2')
      console.log(this.props.values)
      console.log('s2')
      console.log(this.state.values)

      this.searchTerms()
    }
  }

  @bind
  openModal() {
    this.setState({ modalIsOpen: true })
  }

  @bind
  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  @bind
  renderSubUnit(subUnits: DepartmentTreeItem[]) {
    if (subUnits && 0 < subUnits.length) {
      return (
        <ul key={subUnits[0].id} className="searchCell__accordionBox">
          {this.renderUnits(subUnits)}
        </ul>
      )
    }
    return
  }
  @bind
  renderUnits(units: DepartmentTreeItem[]) {
    const unit = units.map(unit => {
      return (
        <React.Fragment key={unit.id}>
          <li className="searchCell__accordionBox_item" key={`li_${unit.id}`}>
            <input
              type="checkbox"
              name={`unit_${unit.id}`}
              id={`label_${unit.id}`}
              key={`inout_${unit.id}`}
            />
            <label htmlFor={`label_${unit.id}`} key={`unit_${unit.id}`} />
            <span key={`span_${unit.id}`}>{unit.title}</span>
            {this.renderSubUnit(unit.children!)}
          </li>
        </React.Fragment>
      )
    })
    return unit
  }

  @bind
  valueReset() {
    this.setState({
      values: this.props.values
    })
    this.searchTerms()
  }

  @bind
  searchTerms() {
    let projectName = this.props.projects.find(i => i.id === Number(this.state.values.projectId))
    console.log(this.state.values.projectId)

    let employeeCode = this.state.values.employeeCode
    let name = this.state.values.name
    // let units = this.state.values.unitIds.map(
    //   i => this.props.organizationUnits.find(k => i === k.id)!.title
    // )
    let statuses = this.state.values.statuses.map(
      i => stressCheckResultDisclosure.find(k => i === k.value)!.text
    )
    let highStress = this.state.values.highStress.map(
      i => highStressStatuses.find(k => i === k.value)!.text
    )
    let consultationOffer = this.state.values.consultationOffers.map(
      i => consultationOffers.find(k => i === k.value)!.text
    )
    // let stresscheckOpinionOnEmploymentStatus = this.state.values.stresscheckOpinionOnEmploymentStatusIds.map(
    //   i => this.props.opinionOnEmploymentStatuses.find(k => i === k.id)
    // )
    this.setState({
      teams: {
        projectName: projectName ? projectName.name : '',
        employeeCode,
        name,
        units: [],
        statuses,
        highStress,
        consultationOffers: consultationOffer,
        stresscheckOpinionOnEmploymentStatus: []
      }
    })
  }

  @bind
  searchTermsOpCl() {
    this.state.searchTerms
      ? this.setState({
          searchTerms: false
        })
      : this.setState({
          searchTerms: true
        })
  }

  render() {
    const {
      organizationUnits,
      opinionOnEmploymentStatuses,
      projects,
      errors,
      handleSubmit,
      handleReset,
      handleBlur,
      handleChange,
      setFieldValue,
      touched
    } = this.props

    const { searchTerms, values, teams } = this.state
    console.log(this.props.values)

    console.log(values)
    console.log(teams)

    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="search__select">
            <label className="triangles" htmlFor="projectId">
              <select
                name="projectId"
                id="projectId"
                value={values.projectId}
                onBlur={handleBlur}
                onChange={e => setFieldValue('projectId', e.target.value)}
              >
                <option value="">全件表示</option>
                {projects.map(project => (
                  <option value={project.id} key={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="search__grid">
            <span>{touched.statuses && errors.statuses}</span>
            <div className="search__grid_title">結果</div>
            <div className="search__grid_row">
              {stressCheckResultDisclosure.map((d, i) => (
                <label
                  className="search__grid_switch"
                  key={`statuses${i}`}
                  htmlFor={`statuses${i}`}
                >
                  <input
                    id={`statuses${i}`}
                    type="checkbox"
                    checked={values.statuses.includes(d.value)}
                    onChange={() =>
                      setFieldValue(
                        'statuses',
                        values.statuses.includes(d.value)
                          ? values.statuses.filter(id => id !== d.value)
                          : [...values.statuses, d.value]
                      )
                    }
                  />
                  {d.text}
                </label>
              ))}
            </div>
          </div>
          <div className="search__grid">
            <span>{touched.highStress && errors.highStress}</span>
            <label className="search__grid_title" htmlFor="highStress">
              高ストレス
              <div className="search__grid_row">
                {highStressStatuses.map((hs, i) => (
                  <label
                    className="search__grid_switch"
                    key={`highStress${i}`}
                    htmlFor={`highStress${i}`}
                  >
                    <input
                      id={`highStress${i}`}
                      type="checkbox"
                      checked={values.highStress.includes(hs.value)}
                      onChange={() =>
                        setFieldValue(
                          'highStress',
                          values.highStress.includes(hs.value)
                            ? values.highStress.filter(id => id !== hs.value)
                            : [...values.highStress, hs.value]
                        )
                      }
                    />
                    {hs.text}
                  </label>
                ))}
              </div>
            </label>
          </div>
          <div className="search__grid">
            <span>{touched.consultationOffers && errors.consultationOffers}</span>
            <label className="search__grid_title" htmlFor="consultationOffers">
              面談申出
              <div className="search__grid_row">
                {consultationOffers.map((co, i) => (
                  <label
                    className="search__grid_switch"
                    key={`consultationOffers${i}`}
                    htmlFor={`consultationOffers${i}`}
                  >
                    <input
                      id={`consultationOffers${i}`}
                      type="checkbox"
                      checked={values.consultationOffers.includes(co.value)}
                      onChange={() =>
                        setFieldValue(
                          'consultationOffers',
                          values.consultationOffers.includes(co.value)
                            ? values.consultationOffers.filter(id => id !== co.value)
                            : [...values.consultationOffers, co.value]
                        )
                      }
                    />
                    {co.text}
                  </label>
                ))}
              </div>
            </label>
          </div>
          <div className="search__grid">
            <span>
              {touched.stresscheckOpinionOnEmploymentStatusIds &&
                errors.stresscheckOpinionOnEmploymentStatusIds}
            </span>
            <label className="search__grid_title" htmlFor="stresscheckOpinionOnEmploymentStatusIds">
              産業医意見
              <div className="search__grid_row">
                {opinionOnEmploymentStatuses.map(o => (
                  <label
                    className="search__grid_switch"
                    key={`opinionStatus${o.id}`}
                    htmlFor={`opinionStatus${o.id}`}
                  >
                    <input
                      id={`opinionStatus${o.id}`}
                      type="checkbox"
                      checked={values.stresscheckOpinionOnEmploymentStatusIds.includes(o.id)}
                      onChange={() =>
                        setFieldValue(
                          'stresscheckOpinionOnEmploymentStatusIds',
                          values.stresscheckOpinionOnEmploymentStatusIds.includes(o.id)
                            ? values.stresscheckOpinionOnEmploymentStatusIds.filter(
                                id => id !== o.id
                              )
                            : [...values.stresscheckOpinionOnEmploymentStatusIds, o.id]
                        )
                      }
                    />
                    {o.name}
                  </label>
                ))}
              </div>
            </label>
          </div>
          <div className="search__grid">
            <button
              className="search__grid_button"
              type="reset"
              onClick={() => {
                this.valueReset()
                handleReset()
              }}
            >
              クリア
            </button>
            <button className="search__grid_button search__grid_button-blue" type="submit">
              検索
            </button>
          </div>
          <div className="search__grid">
            <button
              className="search__grid_button search__grid_button-w100"
              onClick={this.openModal}
            >
              詳細に検索
            </button>
          </div>
          <Modal
            isOpen={this.state.modalIsOpen}
            // onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            <div className="l_frame">
              <div className="frame_head">
                <h1 className="frame_head__title">詳細検索</h1>
                <a onClick={this.closeModal} className="frame_head__plus" />
              </div>
              <div className="searchCell">
                <div className="searchCell__row">
                  <div className="searchCell__col searchCell__col-title">対象者</div>
                  <div className="searchCell__col searchCell__col-group">
                    <div className="searchCell__group">
                      <div className="searchCell__group_item searchCell__group_item-flex">
                        <div className="searchCell__group_col searchCell__group_col-w70">
                          社員番号
                        </div>
                        <div className="searchCell__group_col">
                          <span>{touched.employeeCode && errors.employeeCode}</span>
                          <input
                            className="u_flat"
                            type="text"
                            name="employeeCode"
                            id="employeeCode"
                            placeholder="TEST01"
                            value={values.employeeCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <div className="searchCell__group_item searchCell__group_item-flex">
                        <div className="searchCell__group_col searchCell__group_col-w50">氏名</div>
                        <div className="searchCell__group_col">
                          <span>{touched.name && errors.name}</span>
                          <input
                            className="u_flat"
                            type="text"
                            name="name"
                            id="name"
                            placeholder="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="searchCell__row">
                  <div className="searchCell__col searchCell__col-title">部署</div>
                  <div className="searchCell__col searchCell__col-group">
                    <div className="searchCell__group">
                      <div className="searchCell__group_item searchCell__group_item-w100">
                        <div className="searchCell__accordion">
                          {organizationUnits.map(unit => (
                            <React.Fragment key={unit.id}>
                              <div key={`unitId_${unit.id}`} className="searchCell__accordion_item">
                                <input
                                  key={`input_${unit.id}`}
                                  id={`unitId_${unit.id}`}
                                  type="checkbox"
                                  checked={values.unitIds.includes(Number(unit.id))}
                                  onChange={() =>
                                    setFieldValue(
                                      'unitIds',
                                      values.unitIds.includes(Number(unit.id))
                                        ? values.unitIds.filter(id => id !== unit.id)
                                        : [...values.unitIds, unit.id]
                                    )
                                  }
                                />
                                <label
                                  htmlFor={`unitId_${unit.id}`}
                                  key={`label_${unit.id}`}
                                  className="searchCell__accordion_label"
                                />
                                <span
                                  key={`span_${unit.id}`}
                                  className="searchCell__accordion_text is-searchCell__accordion_text"
                                >
                                  {unit.title}
                                </span>
                                <ul key={`ul_${unit.id}`} className="searchCell__accordionBox">
                                  {this.renderUnits(unit.children!)}
                                </ul>
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="searchCell__row">
                  <div className="searchCell__col searchCell__col-title">評価点</div>
                  <div className="searchCell__col searchCell__col-group">
                    <div className="searchCell__group">
                      <div className="searchCell__group_item searchCell__group_item-title">
                        合計点方式
                      </div>
                      <div className="searchCell__group_item searchCell__group_item-w33">
                        <p className="searchCell__group_text">①心身のストレス反応</p>
                      </div>
                      <div className="searchCell__group_item searchCell__group_item-w33">
                        <p className="searchCell__group_text">
                          ②仕事のストレス要因
                          <br />
                          ＋周囲のサポート
                        </p>
                      </div>
                      <div className="searchCell__group_item searchCell__group_item-w33">
                        <p className="searchCell__group_text">かつ 心身のストレス反応</p>
                      </div>
                      <div className="searchCell__group_item searchCell__group_item-w33">
                        <div className="searchCell__group_inputIndent">
                          <input className="u_flat u_flat-w60" type="text" value="77" />
                          &ensp;点以上
                        </div>
                      </div>
                      <div className="searchCell__group_item searchCell__group_item-w33">
                        <div className="searchCell__group_inputIndent">
                          <input className="u_flat u_flat-w60" type="text" value="76" />
                          &ensp;点以上
                        </div>
                      </div>
                      <div className="searchCell__group_item searchCell__group_item-w33">
                        <div className="searchCell__group_input">
                          <input className="u_flat u_flat-w60" type="text" value="63" />
                          &ensp;点以上
                        </div>
                      </div>
                    </div>
                    <div className="searchCell__group">
                      <div className="searchCell__group_item searchCell__group_item-title">
                        素点換算を用いた評価点方式
                      </div>
                      <div className="searchCell__group_item searchCell__group_item-w33">
                        <p className="searchCell__group_text">①心身のストレス反応</p>
                      </div>
                      <div className="searchCell__group_item searchCell__group_item-w33">
                        <p className="searchCell__group_text">
                          ②仕事のストレス要因
                          <br />
                          ＋周囲のサポート
                        </p>
                      </div>
                      <div className="searchCell__group_item searchCell__group_item-w33">
                        <p className="searchCell__group_text">かつ 心身のストレス反応</p>
                      </div>
                      <div className="searchCell__group_item searchCell__group_item-w33">
                        <div className="searchCell__group_inputIndent">
                          <input className="u_flat u_flat-w60" type="text" value="77" />
                          &ensp;点以下
                        </div>
                      </div>
                      <div className="searchCell__group_item searchCell__group_item-w33">
                        <div className="searchCell__group_inputIndent">
                          <input className="u_flat u_flat-w60" type="text" value="76" />
                          &ensp;点以下
                        </div>
                      </div>
                      <div className="searchCell__group_item searchCell__group_item-w33">
                        <div className="searchCell__group_input">
                          <input className="u_flat u_flat-w60" type="text" value="63" />
                          &ensp;点以下
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="l_switch">
                <div className="l_switch__w2">
                  <button
                    className="u_switch u_switch-white"
                    type="reset"
                    onClick={() => {
                      this.valueReset()
                      handleReset()
                    }}
                  >
                    クリア
                  </button>
                </div>
                <div className="l_switch__w2">
                  <button className="u_switch u_switch-blue" onClick={this.closeModal}>
                    設定する
                  </button>
                </div>
              </div>
            </div>
          </Modal>
          <div className="search__terms" onClick={this.searchTermsOpCl}>
            <div
              className={
                searchTerms
                  ? `search__terms_title is-search__terms_title search__terms_title-active`
                  : `search__terms_title is-search__terms_title`
              }
            >
              現在の検索条件
            </div>
            <div className={searchTerms ? 'search__terms_list d_block' : 'search__terms_list'}>
              {/* projectName */}
              {teams.projectName ? (
                <div className="search__terms_item">{teams.projectName}</div>
              ) : (
                'aaa'
              )}
              {/* 結果 */}
              {teams.statuses ? <div className="search__terms_item">{teams.statuses}</div> : ''}
              {/* 高ストレス */}
              {teams.highStress ? <div className="search__terms_item">{teams.highStress}</div> : ''}
              {/* 面談申出 */}
              {teams.consultationOffers ? (
                <div className="search__terms_item">{teams.consultationOffers}</div>
              ) : (
                ''
              )}
              {/* 産業医意見 */}
              {teams.stresscheckOpinionOnEmploymentStatus ? (
                <div className="search__terms_item">
                  {teams.stresscheckOpinionOnEmploymentStatus}
                </div>
              ) : (
                ''
              )}
              {/* 社員番号 */}
              {teams.employeeCode ? (
                <div className="search__terms_item">{teams.employeeCode}</div>
              ) : (
                ''
              )}
              {/* 氏名 */}
              {teams.name ? <div className="search__terms_item">{teams.name}</div> : ''}
            </div>
          </div>
        </form>
      </>
    )
  }
}

export default withFormik<Props, Values>({
  // querySearchFirrstを入れて初期値を確実にまっさらにする。
  mapPropsToValues(props) {
    return {
      projectId: props.querySearchFirst.projectId,
      employeeCode: props.querySearchFirst.employeeCode,
      name: props.querySearchFirst.name,
      unitIds: props.querySearchFirst.unitIds,
      statuses: props.querySearchFirst.statuses,
      highStress: props.querySearchFirst.highStress,
      consultationOffers: props.querySearchFirst.consultationOffers,
      stresscheckOpinionOnEmploymentStatusIds:
        props.querySearchFirst.stresscheckOpinionOnEmploymentStatusIds
    }
  },
  handleSubmit(values, { props }) {
    const stringified = queryString.stringify(values)
    props.queryPush(stringified)
  }
})(StressCheckSearchForm)

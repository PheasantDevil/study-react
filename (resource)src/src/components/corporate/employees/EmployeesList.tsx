import React from 'react'
import { bind } from 'decko'
import Dropzone from 'react-dropzone'
import Employee from '../../../swagger/model/employee'
import OrganizationUnit from '../../../swagger/model/organizationUnit'
import { Link } from 'react-router-dom'
import { corporateEmployeesNew } from '../../../config/Url'
import { stopPropagation } from '../../../util/EventHelper'
import BlockUI from '../../BlockUI'
import Modal from '../../_parts/Modal'

interface Props {
  employeesList: Employee[]
  organizationList: OrganizationUnit[]
  handleRowClick: (e: React.MouseEvent<HTMLDivElement>) => void
  download: () => Promise<void>
  upload: (file: File) => Promise<void>
}

interface State {
  modalIsOpen: boolean
  file: File | null
  uploading: boolean
  downloading: boolean
}

const uploadBtnStyles = {
  textAlign: 'center' as 'center'
}

function getParent() {
  return document.querySelector('#modal') as HTMLElement
}

class EmployeesList extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      file: null,
      uploading: false,
      downloading: false
    }
  }

  @bind
  employeeOrganizationName(organizationUnitId: number) {
    const organizationName = this.props.organizationList.some(
      organization => organization.id === organizationUnitId
    )
      ? this.props.organizationList.find(organization => organization.id === organizationUnitId)!
          .name
      : 'ー'
    return organizationName
  }

  @bind
  openModal() {
    this.setState({ modalIsOpen: true })
  }

  @bind
  closeModal() {
    this.setState({ modalIsOpen: false, file: null })
  }

  @bind
  onDrop(files: any) {
    this.setState({ file: files[0] })
  }

  @bind
  onCancel() {
    this.setState({
      file: null
    })
  }

  @bind
  async onClick() {
    this.setState({ uploading: true })
    await this.props.upload(this.state.file!)
    this.setState({ modalIsOpen: false, file: null, uploading: false })
  }

  @bind
  async onClickForDownload() {
    this.setState({ downloading: true })
    await this.props.download()
    this.setState({ downloading: false })
  }

  render() {
    const { employeesList: employeesList } = this.props
    return (
      <>
        <div className="head">
          <h1 className="head__title">従業員情報一覧</h1>
          <div className="operateNav">
            <div className="operateNav__list">
              <div className="operateNav__list_item">
                <button
                  onClick={this.onClickForDownload}
                  className="operateNav__list_link operateNav__list_icon5"
                />
              </div>
              <div className="operateNav__list_item">
                <button
                  onClick={this.openModal}
                  className="operateNav__list_link operateNav__list_icon2"
                  data-fancybox
                  data-type="iframe"
                />
              </div>
              <div className="operateNav__list_item">
                <Link
                  className="operateNav__list_link operateNav__list_icon1"
                  to={corporateEmployeesNew}
                />
              </div>
              <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                contentLabel="Example Modal"
                parentSelector={getParent}
                ariaHideApp={false}
              >
                <div className="l_frame">
                  <div className="frame_head">
                    <h1 className="frame_head__title">従業員リストのアップロード</h1>
                    <a className="frame_head__plus" onClick={this.closeModal} />
                  </div>

                  <form>
                    <div className="upload">
                      <p className="upload__text">
                        エクセルまたはCSVファイルをアップロードして、
                        <br />
                        従業員リスト（従業員マスターデータ）の追加・変更・削除を行います。
                      </p>
                      {/* TODO: fileの選定とかファイル名を出すとか、細かいところは後で… */}
                      {/* https://github.com/react-dropzone/react-dropzone */}
                      <Dropzone
                        onDrop={this.onDrop}
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onFileDialogCancel={this.onCancel}
                      >
                        {({ getRootProps, getInputProps }: any) => (
                          <div {...getRootProps()} className="upload">
                            <input {...getInputProps()} />
                            <div className="upload__area">
                              {!this.state.file ? (
                                <div className="upload__area_text" id="upload">
                                  ここにファイルをドラッグするか、
                                  <span className="upload__area_link">ファイルを選択</span>
                                  してください。
                                </div>
                              ) : (
                                <div className="upload__area_text">{this.state.file.name}</div>
                              )}
                            </div>
                          </div>
                        )}
                      </Dropzone>
                      <div style={uploadBtnStyles}>
                        <button
                          className="u_switch u_switch-blue"
                          onClick={this.onClick}
                          type="button"
                          disabled={!this.state.file}
                        >
                          アップロード
                        </button>
                        {this.state.uploading ? <BlockUI /> : null}
                      </div>
                    </div>
                  </form>
                </div>
              </Modal>
            </div>
          </div>
        </div>

        <form action="" />
        <div className="l_grid l_grid-border">
          <div className="cellFlex cellFlex-colSpace">
            <div className="cellFlex__row">
              <div className="cellFlex__col cellFlex__col-title cellFlex__col-w100">
                <div className="cellFlex__col_checkbox cellFlex__col_checkbox-space">
                  <input type="checkbox" id="employee" />
                  <label htmlFor="employee" />
                </div>
                <div className="cellFlex__col_text cellFlex__col_text-space">社員番号</div>
              </div>
              <div className="cellFlex__col cellFlex__col-title cellFlex__col-arrow cellFlex__col-w200">
                <a className="cellFlex__arrow" href="">
                  氏名
                </a>
              </div>
              <div className="cellFlex__col cellFlex__col-title cellFlex__col-arrow cellFlex__col-w300">
                <a className="cellFlex__arrow" href="">
                  部署
                </a>
              </div>
            </div>
            {employeesList.map((employee, i) => (
              <div
                key={i}
                className="cellFlex__row"
                data-employee-id={employee.employeeId}
                onClick={this.props.handleRowClick}
              >
                <div className="cellFlex__col cellFlex__col-text cellFlex__col-w100">
                  <div
                    className="cellFlex__col_checkbox cellFlex__col_checkbox-space"
                    onClick={stopPropagation}
                  >
                    <input type="checkbox" id={`employee${i}`} />
                    <label htmlFor={`employee${i}`} />
                  </div>
                  <div className="cellFlex__col_text cellFlex__col_text-space">
                    {employee.employeeCode}
                  </div>
                </div>
                <div className="cellFlex__col cellFlex__col-text cellFlex__col-w200">
                  <div className="cellFlex__col_text cellFlex__col_text-space">{`${
                    employee.familyName
                  } ${employee.givenName}`}</div>
                </div>
                <div className="cellFlex__col cellFlex__col-text cellFlex__col-w300">
                  <div className="cellFlex__col_text cellFlex__col_text-space">
                    {this.employeeOrganizationName(employee.organizationUnitId!)}
                  </div>
                </div>
              </div>
            ))}
            {this.state.downloading ? <BlockUI /> : null}
          </div>
        </div>
      </>
    )
  }
}

export default EmployeesList

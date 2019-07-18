import React from 'react'
import MedicalAdvisor from '../../../swagger/model/medicalAdvisor'
import { Link } from 'react-router-dom'
import { corporateMedicalAdvisorsNew } from '../../../config/Url'

interface Props {
  MedicalAdvisorsList: MedicalAdvisor[]
  selected: number[]
  handleRowClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

class MedicalAdvisorsList extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const { MedicalAdvisorsList: medicalAdvisorsList } = this.props
    return (
      <>
        <div className="head">
          <h1 className="head__title">産業医情報一覧</h1>
          <div className="operateNav">
            <div className="operateNav__list">
              <div className="operateNav__list_item">
                <Link
                  className="operateNav__list_link operateNav__list_icon1"
                  to={corporateMedicalAdvisorsNew}
                />
              </div>
            </div>
          </div>
        </div>

        <form action="" />
        <div className="l_grid l_grid-border">
          <div className="cellFlex cellFlex-colSpace">
            <div className="cellFlex__row">
              <div className="cellFlex__col cellFlex__col-title cellFlex__col-arrow cellFlex__col-w200">
                <a className="cellFlex__arrow" href="">
                  氏名
                </a>
              </div>
              <div className="cellFlex__col cellFlex__col-title cellFlex__col-arrow cellFlex__col-w200">
                <a className="cellFlex__arrow" href="">
                  ログイン可否
                </a>
              </div>
              <div className="cellFlex__col cellFlex__col-title cellFlex__col-arrow cellFlex__col-w200">
                <a className="cellFlex__arrow" href="">
                  ログインID
                </a>
              </div>
            </div>
            {medicalAdvisorsList.map((medicalAdvisor, i) => (
              <div
                key={i}
                className="cellFlex__row"
                data-id={medicalAdvisor.id}
                onClick={this.props.handleRowClick}
              >
                <div className="cellFlex__col cellFlex__col-text cellFlex__col-w200">
                  <div className="cellFlex__col_text cellFlex__col_text-space">{`${
                    medicalAdvisor.familyName
                  } ${medicalAdvisor.givenName}`}</div>
                </div>
                <div className="cellFlex__col cellFlex__col-text cellFlex__col-w200">
                  <div className="cellFlex__col_text cellFlex__col_text-space">
                    {medicalAdvisor.signinAssignment ? '可' : '不可'}
                  </div>
                </div>
                <div className="cellFlex__col cellFlex__col-text cellFlex__col-w200">
                  <div className="cellFlex__col_text cellFlex__col_text-space">
                    {medicalAdvisor.username ? medicalAdvisor.username : '※ログイン不可のためID無※'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }
}

export default MedicalAdvisorsList

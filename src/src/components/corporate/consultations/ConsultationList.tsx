import * as React from 'react'
import { Link } from 'react-router-dom'
import { corporateConsultationsEditUrl, corporateConsultationsNew } from '../../../config/Url'
import { consultationTypes } from '../../../models/ConsultationType'
import ConsultationMetadata from '../../../swagger/model/consultationMetadata'
import { stopPropagation } from '../../../util/EventHelper'

interface Props {
  consultations: ConsultationMetadata[]
  selectedIds: number[]
  handleRowClick: (e: React.MouseEvent<HTMLDivElement>) => void
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAllCheckboxClick: (e: React.ChangeEvent<HTMLInputElement>) => void
  deleteConsultations: (e: React.MouseEvent<HTMLElement>) => void
}

const ConsultationList: React.FunctionComponent<Props> = ({
  consultations,
  selectedIds,
  handleRowClick,
  handleCheckboxChange,
  handleAllCheckboxClick,
  deleteConsultations
}) => (
  <>
    <div className="head">
      <h1 className="head__title">面談記録・意見書対象者一覧</h1>
      <div className="operateNav">
        <div className="operateNav__list">
          <div className="operateNav__list_item">
            <Link
              className={`operateNav__list_link operateNav__list_icon3${
                selectedIds.length === 1 ? '' : '-disabled'
              }`}
              to={
                selectedIds.length === 1
                  ? corporateConsultationsEditUrl(selectedIds[0], consultations.find(
                      c => c.id === selectedIds[0]
                    )!.consultationType as any)
                  : '#'
              }
            />
          </div>
          <div className="operateNav__list_item">
            <a
              className={`operateNav__list_link operateNav__list_icon4${
                selectedIds.length ? '' : '-disabled'
              }`}
              href="#"
              onClick={deleteConsultations}
            />
          </div>
          <div className="operateNav__list_item">
            <Link
              className="operateNav__list_link operateNav__list_icon1"
              to={corporateConsultationsNew}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="l_grid l_grid-border">
      <div className="cellFlex cellFlex-colSpace">
        <div className="cellFlex__row">
          <div className="cellFlex__col cellFlex__col-title cellFlex__col-w300">
            <div className="cellFlex__col_checkbox cellFlex__col_checkbox-space">
              <input
                type="checkbox"
                id="all"
                onChange={handleAllCheckboxClick}
                checked={consultations.length === selectedIds.length}
              />
              <label htmlFor="all" />
            </div>
            <div className="cellFlex__col_text cellFlex__col_text-space">面談対象者</div>
          </div>
          <div className="cellFlex__col cellFlex__col-title cellFlex__col-arrow cellFlex__col-w100">
            <a className="cellFlex__arrow">面談目的</a>
          </div>
          <div className="cellFlex__col cellFlex__col-title cellFlex__col-arrow cellFlex__col-w100">
            <a className="cellFlex__arrow">実施日</a>
          </div>
          <div className="cellFlex__col cellFlex__col-title cellFlex__col-arrow cellFlex__col-w100">
            <a className="cellFlex__arrow">産業医</a>
          </div>
        </div>
        {consultations.map(
          ({
            consultationDate,
            consultationType,
            employeeFamilyName,
            employeeGivenName,
            id,
            medicalAdvisorFamilyName,
            medicalAdvisorGivenName
          }) => (
            <div
              key={id}
              data-id={id}
              data-consultation-type={consultationType}
              onClick={handleRowClick}
              className="cellFlex__row"
            >
              <div className="cellFlex__col cellFlex__col-text cellFlex__col-w300">
                <div
                  className="cellFlex__col_checkbox cellFlex__col_checkbox-space"
                  onClick={stopPropagation}
                >
                  <input
                    type="checkbox"
                    id={id + ''}
                    onChange={handleCheckboxChange}
                    checked={selectedIds.includes(id)}
                  />
                  <label htmlFor={id + ''} />
                </div>
                <div className="cellFlex__col_text cellFlex__col_text-space">
                  {`${employeeFamilyName} ${employeeGivenName}`}
                </div>
              </div>
              <div className="cellFlex__col cellFlex__col-text cellFlex__col-w100">
                {consultationTypes.find(c => c.type === consultationType)!.label}
              </div>
              <div className="cellFlex__col cellFlex__col-text cellFlex__col-w100">
                {consultationDate}
              </div>
              <div className="cellFlex__col cellFlex__col-text cellFlex__col-w100">
                {`${medicalAdvisorFamilyName} ${medicalAdvisorGivenName}`}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  </>
)

export default ConsultationList

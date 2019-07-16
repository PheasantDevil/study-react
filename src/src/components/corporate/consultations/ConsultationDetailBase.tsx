import * as React from 'react'
import { Link } from 'react-router-dom'
import { corporateConsultationsDetailUrl, corporateConsultationsEditUrl } from '../../../config/Url'
import { consultationTypes, ConsultationType } from '../../../models/ConsultationType'
import ConsultationMetadata from '../../../swagger/model/consultationMetadata'

interface Props {
  metadata: ConsultationMetadata
  consultations: ConsultationMetadata[]
  deleteConsultation: (e: React.MouseEvent) => void
}

const ConsultationDetailBase: React.FunctionComponent<Props> = ({
  metadata: { consultationType, id: consultationId },
  consultations,
  deleteConsultation,
  children
}) => (
  <>
    <div className="head">
      <h1 className="head__title">面談詳細</h1>
      <div className="operateNav">
        <div className="operateNav__list">
          <div className="operateNav__list_item">
            <Link
              className="operateNav__list_link operateNav__list_icon3"
              to={corporateConsultationsEditUrl(
                consultationId,
                consultationType as ConsultationType
              )}
            />
          </div>
          <div className="operateNav__list_item">
            <a
              className="operateNav__list_link operateNav__list_icon4"
              onClick={deleteConsultation}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="l_grid l_grid-border l_grid-spaceL">
      <div className="lnav">
        {consultations.map(({ consultationDate, consultationType, id }) => (
          <div className="lnav__item" key={id}>
            <Link
              className={`lnav__link ${id === consultationId ? 'lnav__link-current' : ''}`}
              to={corporateConsultationsDetailUrl(id, consultationType as any)}
            >
              {`${consultationDate} ${
                consultationTypes.find(c => c.type === consultationType)!.label
              }`}
            </Link>
          </div>
        ))}
      </div>
      {children}
    </div>
  </>
)

export default ConsultationDetailBase

import { bind } from 'decko'
import * as React from 'react'
import { compose } from 'recompose'
import BlockUI from '../../../components/BlockUI'
import ConsultationDetailBase from '../../../components/corporate/consultations/ConsultationDetailBase'
import ConsultationMedicalCheckupDetail from '../../../components/corporate/consultations/ConsultationMedicalCheckupDetail'
import ConsultationMentalDetail from '../../../components/corporate/consultations/ConsultationMentalDetail'
import LoadingPlaceholder from '../../../components/LoadingPlaceholder'
import { corporateConsultations } from '../../../config/Url'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import withQueryUpdate, { WithQueryProps } from '../../../framework/hocs/withQueryUpdate'
import Account from '../../../models/Account'
import { ConsultationType, consultationTypes } from '../../../models/ConsultationType'
import User from '../../../models/User'
import {
  deleteConsultationHighStressApi,
  deleteConsultationLongHourApi,
  deleteConsultationMedicalCheckupApi,
  getConsultationHighStressApi,
  getConsultationLongHourApi,
  getConsultationMedicalCheckupApi,
  getConsultationsApi
} from '../../../swagger/api/corporate.service'
import {
  getConditionsToBeCorrectedApi,
  getEmploymentDiagnosesApi,
  getInstructionCategoryApi,
  getMedicalDiagnosesApi,
  getNecessityOfPostInstructionsApi,
  getStateOfAccumulatedFatiguesApi
} from '../../../swagger/api/general.service'
import ConditionsToBeCorrected from '../../../swagger/model/conditionsToBeCorrected'
import ConsultationMedicalCheckup from '../../../swagger/model/consultationMedicalCheckup'
import ConsultationMental from '../../../swagger/model/consultationMental'
import ConsultationMetadata from '../../../swagger/model/consultationMetadata'
import ConsultationStatus from '../../../swagger/model/consultationStatus'
import EmploymentDiagnosis from '../../../swagger/model/employmentDiagnosis'
import InstructionCategory from '../../../swagger/model/instructionCategory'
import MedicalDiagnosis from '../../../swagger/model/medicalDiagnosis'
import NecessityOfPostInstruction from '../../../swagger/model/necessityOfPostInstruction'
import StateOfAccumulatedFatigue from '../../../swagger/model/stateOfAccumulatedFatigue'

const searchQueryKey = 'consultationType'
const getConsultationTypeByQuery = (value: string) => {
  if (value && consultationTypes.find(c => c.type === value)) {
    return value as ConsultationType
  }
  return 'medical_checkup'
}

type Props = AuthContext<User> & WithQueryProps<{ consultationId: string }>

interface State {
  blocking: boolean
  consultationId: number
  consultationType: ConsultationType
  consultations: ConsultationMetadata[]
  consultation: ConsultationMedicalCheckup | ConsultationMental | null
}

class CorporateConsultationDetailContainer extends React.Component<Props, State> {
  consultationStatuses: ConsultationStatus[] = []
  stateOfAccumulatedFatigues: StateOfAccumulatedFatigue[] = []
  conditionsToBeCorrected: ConditionsToBeCorrected[] = []
  employmentDiagnoses: EmploymentDiagnosis[] = []
  instructionCategories: InstructionCategory[] = []
  medicalDiagnoses: MedicalDiagnosis[] = []
  necessityOfPostInstructions: NecessityOfPostInstruction[] = []

  constructor(props: Props) {
    super(props)
    this.state = {
      blocking: false,
      consultation: null,
      consultations: [],
      consultationId: parseInt(this.props.match.params.consultationId, 10),
      consultationType: getConsultationTypeByQuery(props.location.query[searchQueryKey] as any)
    }
  }

  async componentDidMount() {
    const { consultationId, consultationType } = this.state
    const authorization = await this.props.authorizer.getIdToken()
    const params = { authorization, consultationId }

    const consultation = await this.getConsultation(consultationType, params)

    const [
      stateOfAccumulatedFatigues,
      conditionsToBeCorrected,
      employmentDiagnoses,
      instructionCategories,
      medicalDiagnoses,
      necessityOfPostInstructions,
      consultations
    ] = await Promise.all([
      getStateOfAccumulatedFatiguesApi(params),
      getConditionsToBeCorrectedApi(params),
      getEmploymentDiagnosesApi(params),
      getInstructionCategoryApi(params),
      getMedicalDiagnosesApi(params),
      getNecessityOfPostInstructionsApi(params),
      getConsultationsApi({
        authorization,
        employeeId: consultation.employeeId
      })
    ])

    this.stateOfAccumulatedFatigues = stateOfAccumulatedFatigues
    this.conditionsToBeCorrected = conditionsToBeCorrected
    this.employmentDiagnoses = employmentDiagnoses
    this.instructionCategories = instructionCategories
    this.medicalDiagnoses = medicalDiagnoses
    this.necessityOfPostInstructions = necessityOfPostInstructions

    this.setState({ consultation, consultations })
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.location.query[searchQueryKey] === this.props.location.query[searchQueryKey]) {
      return
    }
    this.setState({ blocking: true })
    const consultationId = parseInt(this.props.match.params.consultationId, 10)
    const consultationType = getConsultationTypeByQuery(this.props.location.query[
      searchQueryKey
    ] as any)
    const consultation = await this.getConsultation(consultationType, {
      authorization: await this.props.authorizer.getIdToken(),
      consultationId
    })
    this.setState({ consultationId, consultationType, consultation, blocking: false })
  }

  @bind
  getConsultation(
    consultationType: ConsultationType,
    params: { authorization: string; consultationId: number }
  ) {
    switch (consultationType) {
      case 'medical_checkup':
        return getConsultationMedicalCheckupApi(params)
      case 'high_stress':
        return getConsultationHighStressApi(params)
      case 'long_hour':
        return getConsultationLongHourApi(params)
      default:
        throw new Error('not implemented')
    }
  }

  @bind
  async deleteConsultation(e: React.MouseEvent) {
    e.preventDefault()
    if (window.confirm('面談記録を削除します。よろしいですか？')) {
      this.setState({ blocking: true })
      const params = {
        authorization: await this.props.authorizer.getIdToken(),
        consultationId: this.state.consultationId
      }
      switch (this.state.consultationType) {
        case 'medical_checkup':
          await deleteConsultationMedicalCheckupApi(params)
          break
        case 'high_stress':
          await deleteConsultationHighStressApi(params)
          break
        case 'long_hour':
          await deleteConsultationLongHourApi(params)
          break
        default:
          throw new Error('not implemented')
      }
      this.setState({ blocking: false })
      this.props.history.push(corporateConsultations)
    }
  }

  render() {
    const { consultation, consultations, blocking, consultationId, consultationType } = this.state
    const metadata = consultations.find(c => c.id === consultationId)!
    return consultation ? (
      <>
        {blocking ? <BlockUI /> : null}
        <ConsultationDetailBase
          metadata={metadata}
          consultations={consultations}
          deleteConsultation={this.deleteConsultation}
        >
          {consultationType === 'medical_checkup' ? (
            <ConsultationMedicalCheckupDetail
              metadata={metadata}
              consultation={consultation as ConsultationMedicalCheckup}
              stateOfAccumulatedFatigues={this.stateOfAccumulatedFatigues}
              conditionsToBeCorrected={this.conditionsToBeCorrected}
              employmentDiagnoses={this.employmentDiagnoses}
              instructionCategories={this.instructionCategories}
              medicalDiagnoses={this.medicalDiagnoses}
              necessityOfPostInstructions={this.necessityOfPostInstructions}
            />
          ) : (
            <ConsultationMentalDetail
              metadata={metadata}
              consultation={consultation as ConsultationMental}
              stateOfAccumulatedFatigues={this.stateOfAccumulatedFatigues}
              conditionsToBeCorrected={this.conditionsToBeCorrected}
              employmentDiagnoses={this.employmentDiagnoses}
              instructionCategories={this.instructionCategories}
            />
          )}
        </ConsultationDetailBase>
      </>
    ) : (
      <LoadingPlaceholder />
    )
  }
}

export default compose<Props, {}>(
  Account.withAuthConsumer,
  withQueryUpdate
)(CorporateConsultationDetailContainer)

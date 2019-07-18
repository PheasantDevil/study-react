import { bind } from 'decko'
import update from 'immutability-helper'
import queryString from 'query-string'
import * as React from 'react'
import { compose } from 'recompose'
import BlockUI from '../../../components/BlockUI'
import ConsultationComplete from '../../../components/corporate/consultations/ConsultationComplete'
import ConsultationEditBase from '../../../components/corporate/consultations/ConsultationEditBase'
import ConsultationMedicalCheckupConfirm from '../../../components/corporate/consultations/ConsultationMedicalCheckupConfirm'
import ConsultationMedicalCheckupForm, {
  ConsultationMedicalCheckupValues
} from '../../../components/corporate/consultations/ConsultationMedicalCheckupForm'
import ConsultationMentalConfirm from '../../../components/corporate/consultations/ConsultationMentalConfirm'
import ConsultationMentalForm, {
  ConsultationMentalValues
} from '../../../components/corporate/consultations/ConsultationMentalForm'
import LoadingPlaceholder from '../../../components/LoadingPlaceholder'
import { corporateConsultations, corporateConsultationsDetailUrl } from '../../../config/Url'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import withQueryUpdate, { WithQueryProps } from '../../../framework/hocs/withQueryUpdate'
import RecursiveNullable from '../../../framework/types/RecursiveNullable'
import Account from '../../../models/Account'
import { ConsultationType, consultationTypes } from '../../../models/ConsultationType'
import User from '../../../models/User'
import {
  getConsultationHighStressApi,
  getConsultationLongHourApi,
  getConsultationMedicalCheckupApi,
  getEmployeesSuggestApi,
  postConsultationsHighStressApi,
  postConsultationsLongHourApi,
  postConsultationsMedicalCheckupApi,
  putConsultationHighStressApi,
  putConsultationLongHourApi,
  putConsultationMedicalCheckupApi
} from '../../../swagger/api/corporate.service'
import {
  getConditionsToBeCorrectedApi,
  getConsultationStatusesApi,
  getEmploymentDiagnosesApi,
  getInstructionCategoryApi,
  getMedicalDiagnosesApi,
  getNecessityOfPostInstructionsApi,
  getStateOfAccumulatedFatiguesApi
} from '../../../swagger/api/general.service'
import ActionTerm from '../../../swagger/model/actionTerm'
import ConditionsToBeCorrected from '../../../swagger/model/conditionsToBeCorrected'
import ConsultationBaseValue from '../../../swagger/model/consultationBase'
import ConsultationMedicalCheckup from '../../../swagger/model/consultationMedicalCheckup'
import ConsultationMental from '../../../swagger/model/consultationMental'
import ConsultationStatus from '../../../swagger/model/consultationStatus'
import EmploymentDiagnosis from '../../../swagger/model/employmentDiagnosis'
import HowToBeHealthyAboutWorkingTime from '../../../swagger/model/howToBeHealthyAboutWorkingTime'
import InstructionCategory from '../../../swagger/model/instructionCategory'
import MedicalDiagnosis from '../../../swagger/model/medicalDiagnosis'
import NecessityOfPostInstruction from '../../../swagger/model/necessityOfPostInstruction'
import StateOfAccumulatedFatigue from '../../../swagger/model/stateOfAccumulatedFatigue'

type Progress = 'form' | 'confirm' | 'complete'

const searchQueryKey = 'consultationType'
const getConsultationTypeByQuery = (value: string) => {
  if (value && consultationTypes.find(c => c.type === value)) {
    return value as ConsultationType
  }
  return null
}

const updateSpec = (values: RecursiveNullable<ConsultationBaseValue>) => {
  return {
    actionTerm: {
      $unset: (['durationUnit', 'durationValue', 'end', 'start'] as Array<keyof ActionTerm>).filter(
        key => !values.actionTerm[key]
      )
    },
    howToBeHealthyAboutWorkingTime: {
      $unset: (['overtimeHour', 'shortTimeEnd', 'shortTimeStart'] as Array<
        keyof HowToBeHealthyAboutWorkingTime
      >).filter(key => !values.howToBeHealthyAboutWorkingTime[key])
    },
    nextConsultationAt: {
      $set:
        values.nextConsultationAt &&
        values.nextConsultationAt.date &&
        values.nextConsultationAt.endTime &&
        values.nextConsultationAt.startTime
          ? values.nextConsultationAt
          : void 0
    }
  }
}

const convertConsultationMedicalCheckup: (
  values: ConsultationMedicalCheckupValues
) => ConsultationMedicalCheckup = values =>
  update<ConsultationMedicalCheckup>(values as ConsultationMedicalCheckup, updateSpec(values))

const convertConsultationMental: (
  values: ConsultationMentalValues
) => ConsultationMental = values =>
  update<ConsultationMental>(values as ConsultationMental, updateSpec(values))

type Props = AuthContext<User> & WithQueryProps<{ consultationId: string }>

interface State {
  progress: Progress
  blocking: boolean
  consultationId: number | null
  loaded: boolean
  consultationType: ConsultationType | null
  consultationMedicalCheckup: ConsultationMedicalCheckup | null
  consultationHighStress: ConsultationMental | null
  consultationLongHour: ConsultationMental | null
}

class CorporateConsultationEditContainer extends React.Component<Props, State> {
  consultationStatuses: ConsultationStatus[] = []
  stateOfAccumulatedFatigues: StateOfAccumulatedFatigue[] = []
  conditionsToBeCorrected: ConditionsToBeCorrected[] = []
  employmentDiagnoses: EmploymentDiagnosis[] = []
  instructionCategories: InstructionCategory[] = []
  medicalDiagnoses: MedicalDiagnosis[] = []
  necessityOfPostInstructions: NecessityOfPostInstruction[] = []
  initialValues: Partial<ConsultationBaseValue> = {}

  constructor(props: Props) {
    super(props)
    this.state = {
      progress: 'form',
      consultationId: isNaN(props.match.params.consultationId as any)
        ? null
        : parseInt(props.match.params.consultationId, 10),
      blocking: false,
      loaded: false,
      consultationType: getConsultationTypeByQuery(props.location.query[searchQueryKey] as any),
      consultationMedicalCheckup: null,
      consultationHighStress: null,
      consultationLongHour: null
    }
    // TODO 現在は産業医以外でアクセスしているので、employmentMedicalAdvisorIdが取れない。とりあえずの回避措置
    this.initialValues = {
      employmentMedicalAdvisorId: props.user!.employmentMedicalAdvisorId || 1
    }
  }

  async componentDidMount() {
    // 区分値をまとめて取得
    const { consultationId, consultationType } = this.state
    const params = { authorization: await this.props.authorizer.getIdToken() }
    const [
      consultationStatuses,
      stateOfAccumulatedFatigues,
      conditionsToBeCorrected,
      employmentDiagnoses,
      instructionCategories,
      medicalDiagnoses,
      necessityOfPostInstructions,
      consultationMedicalCheckup,
      consultationHighStress,
      consultationLongHour
    ] = await Promise.all([
      getConsultationStatusesApi(params),
      getStateOfAccumulatedFatiguesApi(params),
      getConditionsToBeCorrectedApi(params),
      getEmploymentDiagnosesApi(params),
      getInstructionCategoryApi(params),
      getMedicalDiagnosesApi(params),
      getNecessityOfPostInstructionsApi(params),
      consultationId && consultationType === 'medical_checkup'
        ? getConsultationMedicalCheckupApi({ ...params, consultationId })
        : Promise.resolve(null),
      consultationId && consultationType === 'high_stress'
        ? getConsultationHighStressApi({ ...params, consultationId })
        : Promise.resolve(null),
      consultationId && consultationType === 'long_hour'
        ? getConsultationLongHourApi({ ...params, consultationId })
        : Promise.resolve(null)
    ])
    this.consultationStatuses = consultationStatuses
    this.stateOfAccumulatedFatigues = stateOfAccumulatedFatigues
    this.conditionsToBeCorrected = conditionsToBeCorrected
    this.employmentDiagnoses = employmentDiagnoses
    this.instructionCategories = instructionCategories
    this.medicalDiagnoses = medicalDiagnoses
    this.necessityOfPostInstructions = necessityOfPostInstructions

    this.setState({
      loaded: true,
      consultationMedicalCheckup,
      consultationHighStress,
      consultationLongHour
    })
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.location.query[searchQueryKey] !== this.props.location.query[searchQueryKey]) {
      this.setState({
        consultationType: getConsultationTypeByQuery(this.props.location.query[
          searchQueryKey
        ] as any)
      })
    }
  }

  /**
   * 面談種別を変更
   */
  @bind
  handleChangeConsultationType(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value
    if (consultationTypes.find(c => c.type === value)) {
      return this.props.history.push(
        `${this.props.location.pathname}?${queryString.stringify({ [searchQueryKey]: value })}`
      )
    }
    return this.props.history.push(this.props.location.pathname)
  }

  @bind
  async fetchEmployeeSuggest(params: { employeeId?: number; name?: string }) {
    return getEmployeesSuggestApi({
      authorization: await this.props.authorizer.getIdToken(),
      ...params
    })
  }

  @bind
  cancel(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const { consultationId, consultationType } = this.state
    this.props.history.push(
      consultationId && consultationType
        ? corporateConsultationsDetailUrl(consultationId, consultationType)
        : corporateConsultations
    )
  }

  @bind
  formToConfirm(values: ConsultationMedicalCheckupValues | ConsultationMentalValues) {
    switch (this.state.consultationType) {
      case 'medical_checkup':
        this.setState({
          consultationMedicalCheckup: convertConsultationMedicalCheckup(
            values as ConsultationMedicalCheckupValues
          ),
          progress: 'confirm'
        })
        break
      case 'high_stress':
        this.setState({
          consultationHighStress: convertConsultationMental(values as ConsultationMentalValues),
          progress: 'confirm'
        })
        break
      case 'long_hour':
        this.setState({
          consultationLongHour: convertConsultationMental(values as ConsultationMentalValues),
          progress: 'confirm'
        })
        break
      default:
        throw new Error('not implemented.')
    }
  }

  @bind
  confirmToForm() {
    this.setState({ progress: 'form' })
  }

  @bind
  async confirmToComplete() {
    this.setState({ blocking: true })
    const authorization = await this.props.authorizer.getIdToken()
    const { consultationId, consultationType } = this.state
    if (consultationId) {
      // 更新
      switch (consultationType) {
        case 'medical_checkup':
          await putConsultationMedicalCheckupApi({
            authorization,
            consultationId,
            body: this.state.consultationMedicalCheckup!
          })
          break
        case 'high_stress':
          await putConsultationHighStressApi({
            authorization,
            consultationId,
            body: this.state.consultationHighStress!
          })
          break
        case 'long_hour':
          await putConsultationLongHourApi({
            authorization,
            consultationId,
            body: this.state.consultationLongHour!
          })
          break
        default:
          throw new Error('not implemented.')
      }
    } else {
      // 新規登録
      switch (consultationType) {
        case 'medical_checkup':
          const resultCheckup = await postConsultationsMedicalCheckupApi({
            authorization,
            body: this.state.consultationMedicalCheckup!
          })
          this.setState({ consultationId: resultCheckup.id })
          break
        case 'high_stress':
          const resultHighStress = await postConsultationsHighStressApi({
            authorization,
            body: this.state.consultationHighStress!
          })
          this.setState({ consultationId: resultHighStress.id })
          break
        case 'long_hour':
          const resultLongHour = await postConsultationsLongHourApi({
            authorization,
            body: this.state.consultationLongHour!
          })
          this.setState({ consultationId: resultLongHour.id })
          break
        default:
          throw new Error('not implemented.')
      }
    }
    this.setState({ blocking: false, progress: 'complete' })
  }

  @bind
  renderConsultationMedicalCheckupForm() {
    return (
      <ConsultationMedicalCheckupForm
        initialValues={this.state.consultationMedicalCheckup || (this.initialValues as any)}
        consultationStatuses={this.consultationStatuses}
        stateOfAccumulatedFatigues={this.stateOfAccumulatedFatigues}
        conditionsToBeCorrected={this.conditionsToBeCorrected}
        employmentDiagnoses={this.employmentDiagnoses}
        instructionCategories={this.instructionCategories}
        medicalDiagnoses={this.medicalDiagnoses}
        necessityOfPostInstructions={this.necessityOfPostInstructions}
        fetchEmployeeSuggest={this.fetchEmployeeSuggest}
        submit={this.formToConfirm}
        cancel={this.cancel}
        medicalAdvisorName={this.props.user!.getFullName()}
      />
    )
  }

  @bind
  renderConsultationMedicalCheckupConfirm() {
    return (
      <ConsultationMedicalCheckupConfirm
        employeeName={'TODO'}
        medicalAdvisorName={this.props.user!.getFullName()}
        stateOfAccumulatedFatigues={this.stateOfAccumulatedFatigues}
        conditionsToBeCorrected={this.conditionsToBeCorrected}
        employmentDiagnoses={this.employmentDiagnoses}
        instructionCategories={this.instructionCategories}
        medicalDiagnoses={this.medicalDiagnoses}
        necessityOfPostInstructions={this.necessityOfPostInstructions}
        values={this.state.consultationMedicalCheckup!}
        next={this.confirmToComplete}
        prev={this.confirmToForm}
      />
    )
  }

  @bind
  renderConsultationMentalForm() {
    return (
      <ConsultationMentalForm
        initialValues={
          (this.state.consultationType === 'high_stress'
            ? this.state.consultationHighStress
            : this.state.consultationLongHour) || (this.initialValues as any)
        }
        consultationStatuses={this.consultationStatuses}
        stateOfAccumulatedFatigues={this.stateOfAccumulatedFatigues}
        conditionsToBeCorrected={this.conditionsToBeCorrected}
        employmentDiagnoses={this.employmentDiagnoses}
        instructionCategories={this.instructionCategories}
        fetchEmployeeSuggest={this.fetchEmployeeSuggest}
        submit={this.formToConfirm}
        cancel={this.cancel}
        medicalAdvisorName={this.props.user!.getFullName()}
      />
    )
  }

  @bind
  renderConsultationMentalConfirm() {
    return (
      <ConsultationMentalConfirm
        employeeName={'TODO'}
        medicalAdvisorName={this.props.user!.getFullName()}
        stateOfAccumulatedFatigues={this.stateOfAccumulatedFatigues}
        conditionsToBeCorrected={this.conditionsToBeCorrected}
        employmentDiagnoses={this.employmentDiagnoses}
        instructionCategories={this.instructionCategories}
        values={
          this.state.consultationType === 'high_stress'
            ? this.state.consultationHighStress!
            : this.state.consultationLongHour!
        }
        next={this.confirmToComplete}
        prev={this.confirmToForm}
      />
    )
  }

  @bind
  renderConsultationComplete() {
    return <ConsultationComplete />
  }

  @bind
  getChildRender(consultationType: ConsultationType | null, progress: Progress) {
    if (progress === 'form') {
      if (consultationType === 'medical_checkup') {
        return this.renderConsultationMedicalCheckupForm
      } else if (consultationType) {
        return this.renderConsultationMentalForm
      }
    }
    if (progress === 'confirm') {
      if (consultationType === 'medical_checkup') {
        return this.renderConsultationMedicalCheckupConfirm
      } else {
        return this.renderConsultationMentalConfirm
      }
    }
    if (progress === 'complete') {
      return this.renderConsultationComplete
    }
    return () => null
  }

  render() {
    const { loaded, blocking, progress, consultationType, consultationId } = this.state
    if (loaded) {
      const childRender = this.getChildRender(consultationType, progress)
      return (
        <ConsultationEditBase
          disabled={!!consultationId}
          consultationType={consultationType}
          handleChangeConsultationType={this.handleChangeConsultationType}
        >
          {blocking ? <BlockUI /> : null}
          {childRender()}
        </ConsultationEditBase>
      )
    }
    return <LoadingPlaceholder />
  }
}

export default compose<Props, {}>(
  Account.withAuthConsumer,
  withQueryUpdate
)(CorporateConsultationEditContainer)

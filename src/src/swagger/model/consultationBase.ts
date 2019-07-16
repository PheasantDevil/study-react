// @ts-ignore
import ActionTerm from './actionTerm';
// @ts-ignore
import DateAndTimeRange from './dateAndTimeRange';
// @ts-ignore
import HowToBeHealthyAboutWorkingTime from './howToBeHealthyAboutWorkingTime';
// @ts-ignore
import HowToBeHealthyExceptWorkingTime from './howToBeHealthyExceptWorkingTime';
export default interface ConsultationBase { 
  actionTerm: ActionTerm;
  /**
   * 面談時年齢
   */
  age: number;
  /**
   * 医師の所属先
   */
  belongs: string;
  /**
   * 配慮すべき心身の状況ID
   */
  conditionsToBeCorrectedId: number;
  consultationAt: DateAndTimeRange;
  /**
   * 面談対象者の従業員ID
   */
  employeeId: number;
  /**
   * 就業判定ID
   */
  employmentDiagnosisId: number;
  /**
   * 産業医ID
   */
  employmentMedicalAdvisorId: number;
  howToBeHealthyAboutWorkingTime: HowToBeHealthyAboutWorkingTime;
  howToBeHealthyExceptWorkingTime: HowToBeHealthyExceptWorkingTime;
  /**
   * 指導区分ID
   */
  instructionCategoryId: number;
  nextConsultationAt?: DateAndTimeRange;
  /**
   * 疲労蓄積の状況ID
   */
  stateOfAccumulatedFatigueId: number;
}

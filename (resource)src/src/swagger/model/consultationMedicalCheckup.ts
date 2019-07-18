// @ts-ignore
import ActionTerm from './actionTerm';
// @ts-ignore
import ConsultationBase from './consultationBase';
// @ts-ignore
import DateAndTimeRange from './dateAndTimeRange';
// @ts-ignore
import HowToBeHealthyAboutWorkingTime from './howToBeHealthyAboutWorkingTime';
// @ts-ignore
import HowToBeHealthyExceptWorkingTime from './howToBeHealthyExceptWorkingTime';
export default interface ConsultationMedicalCheckup extends ConsultationBase { 
  /**
   * 医療機関への受診配慮等
   */
  considerationToMedicalInstitution: string;
  /**
   * 記入１（対策の詳細）
   */
  howToBeHealthyDetail: string;
  /**
   * 診断判定ID
   */
  medicalDiagnosisId: number;
  /**
   * 事後措置としての指導・勧告の必要性ID
   */
  necessityOfPostInstructionId: number;
  /**
   * 連絡事項
   */
  notice: string;
  /**
   * 特記事項
   */
  specialMention: string;
}

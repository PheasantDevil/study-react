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
export default interface ConsultationMental extends ConsultationBase { 
  /**
   * 措置内容
   */
  actionContent: string;
  /**
   * 所見ありの場合、状況を記入する（考慮すべき心身の状況の詳細）
   */
  conditionsToBeCorrectedDetails: string;
  /**
   * 医療機関への受診配慮
   */
  considerationToMedicalInstitutions: string;
  /**
   * 医学的所見に関する特記事項
   */
  medicalObservation: string;
  /**
   * 連絡事項
   */
  notice: string;
  /**
   * 職場環境の改善に関する意見
   */
  opinionForWorkingCondition: string;
  /**
   * その他
   */
  remark: string;
  /**
   * その他の特記事項
   */
  specialMention: string;
  /**
   * 勤務の状況
   */
  workingCondition: string;
}

// @ts-ignore
import ExaminationValue from './examinationValue';
// @ts-ignore
import ExaminationValueOthers from './examinationValueOthers';
export default interface CheckupResult { 
  /**
   * 受診時年齢
   */
  checkupAge: number;
  /**
   * 受診日
   */
  checkupDate: string;
  examinationValueOthers: Array<ExaminationValueOthers>;
  examinationValues: Array<ExaminationValue>;
  /**
   * 姓
   */
  familyName: string;
  /**
   * 名
   */
  givenName: string;
  /**
   * 受診場所
   */
  hospitalName: string;
  /**
   * 総合判定
   */
  synthesisDiagnosisDecision: string;
  /**
   * 受診時部署
   */
  unitName: string;
}

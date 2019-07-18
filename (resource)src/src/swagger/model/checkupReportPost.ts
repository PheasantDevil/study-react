// @ts-ignore
import BusinessPlace from './businessPlace';
// @ts-ignore
import Dental from './dental';
// @ts-ignore
import Examination from './examination';
// @ts-ignore
import HealthSafety from './healthSafety';
// @ts-ignore
import WorkInsurance from './workInsurance';
export default interface CheckupReportPost { 
  businessPlace?: BusinessPlace;
  /**
   * 事業場の名称
   */
  businessPlaceName: string;
  /**
   * 事業の種類
   */
  businessType: string;
  /**
   * 対象年
   */
  businessYear: string;
  dental?: Dental;
  examination?: Examination;
  healthSafetyRegulations?: HealthSafety;
  /**
   * 健康診断実施機関の所在地
   */
  hospitalAddress: string;
  /**
   * 健康診断実施基幹の名称
   */
  hospitalName: string;
  /**
   * 産業医所属_住所
   */
  medicalAdvisorDepartmentAddress: string;
  /**
   * 産業医所属_名称
   */
  medicalAdvisorDepartmentName: string;
  /**
   * 産業医名
   */
  medicalAdvisorName: string;
  /**
   * 在籍労働者数
   */
  numberOfEmployees: string;
  /**
   * 医師の指示人数
   */
  numberOfMedicalTreatmented: string;
  /**
   * 所見のあった者の人数
   */
  numberOfObserved: string;
  /**
   * 受診労働者数
   */
  numberOfTargets: string;
  /**
   * 健診年月日
   */
  startDate: string;
  workInsuranceNumber?: WorkInsurance;
}

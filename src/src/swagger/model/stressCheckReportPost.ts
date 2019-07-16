// @ts-ignore
import BusinessPlace from './businessPlace';
// @ts-ignore
import WorkInsurance from './workInsurance';
export default interface StressCheckReportPost { 
  /**
   * 集団ごとの分析の実施の有無
   */
  analyzed: string;
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
  /**
   * 面接指導を実施した医師
   */
  consultant: string;
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
   * 面接指導を受けた労働者数（右詰め）
   */
  numberOfConsultated: string;
  /**
   * 在籍労働者数（右詰め）
   */
  numberOfEmployees: string;
  /**
   * 検査を受けた労働者数（右詰め）
   */
  numberOfTargets: string;
  /**
   * 検査を実施した者
   */
  operator: string;
  /**
   * 健診年月日
   */
  startDate: string;
  workInsuranceNumber?: WorkInsurance;
}

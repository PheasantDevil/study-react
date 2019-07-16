// @ts-ignore
import StressCheckSummaryEmployeeScore from './stressCheckSummaryEmployeeScore';
export default interface StressCheckSummaryEmployee { 
  /**
   * a01, ..., c04
   */
  code: string;
  employees?: Array<StressCheckSummaryEmployeeScore>;
  mask: boolean;
}

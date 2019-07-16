// @ts-ignore
import StressCheckSummaryResult from './stressCheckSummaryResult';
export default interface StressCheckSummaryResults { 
  datas: Array<StressCheckSummaryResult>;
  /**
   * マスクする件数
   */
  maskCount: number;
}

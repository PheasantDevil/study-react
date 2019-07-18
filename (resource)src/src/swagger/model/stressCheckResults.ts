// @ts-ignore
import StressCheckTargetResult from './stressCheckTargetResult';
export default interface StressCheckResults { 
  /**
   * 全件数
   */
  all: number;
  rows: Array<StressCheckTargetResult>;
}

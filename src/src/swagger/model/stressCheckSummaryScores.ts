// @ts-ignore
import StressCheckSummaryScoreGroup from './stressCheckSummaryScoreGroup';
export default interface StressCheckSummaryScores { 
  datas: Array<StressCheckSummaryScoreGroup>;
  /**
   * マスクする件数
   */
  maskCount: number;
}

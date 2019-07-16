// @ts-ignore
import StressCheckSummaryScore from './stressCheckSummaryScore';
export default interface StressCheckSummaryScoreGroup { 
  children: Array<StressCheckSummaryScore>;
  /**
   * sex_id、unit_id（未所属の場合はundifined）、age（2,3,4,5）、project_id、undifined（allの場合）のいずれか
   */
  key?: number;
}

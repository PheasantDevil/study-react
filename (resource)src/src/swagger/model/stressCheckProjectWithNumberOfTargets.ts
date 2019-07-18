// @ts-ignore
import StressCheckProject from './stressCheckProject';
export default interface StressCheckProjectWithNumberOfTargets extends StressCheckProject { 
  /**
   * ストレスチェック対象者数
   */
  numberOfTargets: number;
}

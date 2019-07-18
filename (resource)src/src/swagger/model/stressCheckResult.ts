// @ts-ignore
import StressCheckDisclosure from './stressCheckDisclosure';
// @ts-ignore
import StressCheckEvaluationScore from './stressCheckEvaluationScore';
// @ts-ignore
import StressCheckResultItem from './stressCheckResultItem';
export default interface StressCheckResult { 
  /**
   * 回答日
   */
  answered: string;
  /**
   * 直近の産業医面談日
   */
  consultationDate?: string;
  /**
   * 直近の面談勧奨日
   */
  consultationEncouraged?: string;
  /**
   * 産業医面談申し出日
   */
  consultationOffered?: string;
  disclosure?: StressCheckDisclosure;
  /**
   * ストレスチェック回答内容
   */
  items: Array<StressCheckResultItem>;
  score: StressCheckEvaluationScore;
  /**
   * 受診時の部署
   */
  unitName?: string;
}

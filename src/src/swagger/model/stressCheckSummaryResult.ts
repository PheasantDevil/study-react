// @ts-ignore
import StressCheckSummaryResultAnswer from './stressCheckSummaryResultAnswer';
export default interface StressCheckSummaryResult { 
  answers: Array<StressCheckSummaryResultAnswer>;
  mask: boolean;
  numberOfAnswers: number;
  questionId: number;
}

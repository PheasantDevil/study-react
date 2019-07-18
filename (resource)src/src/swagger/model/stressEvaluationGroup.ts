// @ts-ignore
import StressEvaluation from './stressEvaluation';
export default interface StressEvaluationGroup { 
  code: string;
  id: number;
  order: number;
  stressEvaluations: Array<StressEvaluation>;
  text: string;
}

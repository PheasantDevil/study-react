// @ts-ignore
import MedicalQuestionnaireIdAnswerGroups from './medicalQuestionnaireIdAnswerGroups';
// @ts-ignore
import MedicalQuestionnaireIdQuestions from './medicalQuestionnaireIdQuestions';
export default interface MedicalQuestionnaireId { 
  answerGroups?: Array<MedicalQuestionnaireIdAnswerGroups>;
  /**
   * id
   */
  id: number;
  /**
   * 標準的な質問票
   */
  name: string;
  /**
   * order
   */
  order: number;
  questions?: Array<MedicalQuestionnaireIdQuestions>;
}

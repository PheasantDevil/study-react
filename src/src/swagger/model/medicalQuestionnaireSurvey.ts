// @ts-ignore
import MedicalQuestionnaireSurveyItem from './medicalQuestionnaireSurveyItem';
export default interface MedicalQuestionnaireSurvey { 
  /**
   * MedicalQuestionnaireSurvey.answered 回答日
   */
  answered: string;
  /**
   * MedicalQuestionnaireSurvey.id
   */
  id: number;
  items?: Array<MedicalQuestionnaireSurveyItem>;
}

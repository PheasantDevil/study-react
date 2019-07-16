// @ts-ignore
import QuestionCategory from './questionCategory';
// @ts-ignore
import QuestionnaireMetadata from './questionnaireMetadata';
export default interface Questionnaire extends QuestionnaireMetadata { 
  categories: Array<QuestionCategory>;
}

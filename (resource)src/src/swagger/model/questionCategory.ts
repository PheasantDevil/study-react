// @ts-ignore
import Question from './question';
// @ts-ignore
import QuestionAnswerGroup from './questionAnswerGroup';
export default interface QuestionCategory { 
  answerGroup: QuestionAnswerGroup;
  /**
   * 表示順
   */
  order: number;
  questions: Array<Question>;
  /**
   * 質問カテゴリ文
   */
  text: string;
}

export default interface QuestionnaireMetadata { 
  /**
   * id
   */
  id: number;
  /**
   * 質問表名
   */
  name: string;
  /**
   * 質問数
   */
  numberOfQuestions: number;
  /**
   * 表示順
   */
  order: number;
}

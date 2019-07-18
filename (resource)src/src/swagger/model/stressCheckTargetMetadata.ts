export default interface StressCheckTargetMetadata { 
  /**
   * 回答日
   */
  answered?: string;
  /**
   * 終了日
   */
  end: string;
  /**
   * 質問表Id
   */
  questionnaireId: number;
  /**
   * 開始日
   */
  start: string;
  /**
   * 実施Id
   */
  stresscheckProjectId: number;
  /**
   * 実施名
   */
  stresscheckProjectName: string;
  /**
   * 対象Id
   */
  stresscheckTargetId: number;
}

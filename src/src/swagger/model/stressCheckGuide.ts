export default interface StressCheckGuide { 
  /**
   * 終了
   */
  end: string;
  /**
   * 対象者
   */
  examinee: string;
  /**
   * ストレスチェック名称
   */
  name: string;
  /**
   * 実施者
   */
  operator: string;
  /**
   * project_id
   */
  projectId: number;
  /**
   * ストレスチェックの目的
   */
  purpose: string;
  /**
   * questionnaire id
   */
  questionnaireId: number;
  /**
   * データの取り扱い
   */
  regulations: string;
  /**
   * 開始
   */
  start: string;
  /**
   * 年度
   */
  year: number;
}

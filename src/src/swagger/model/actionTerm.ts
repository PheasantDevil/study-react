export default interface ActionTerm { 
  /**
   * 期間（単位）
   */
  durationUnit?: string;
  /**
   * 期間（値）
   */
  durationValue?: number;
  /**
   * 終了日
   */
  end?: string;
  /**
   * 開始日
   */
  start?: string;
}

export default interface Decision { 
  /**
   * decision id.
   */
  id: number;
  /**
   * 表示順
   */
  order: number;
  /**
   * 判定の重さ
   */
  severity: number;
  /**
   * 判定名
   */
  value: string;
}

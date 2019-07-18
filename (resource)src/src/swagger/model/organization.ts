export default interface Organization { 
  /**
   * organization id
   */
  id: number;
  /**
   * 組織名（会社名）
   */
  name: string;
  /**
   * 社員向けに表示する基準値
   */
  standardValueSetId: number;
}

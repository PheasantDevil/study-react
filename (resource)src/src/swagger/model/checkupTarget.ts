export default interface CheckupTarget { 
  /**
   * 受診日
   */
  checkupDate?: string;
  /**
   * user id.
   */
  employeeId?: number;
  /**
   * 姓
   */
  familyName: string;
  /**
   * 名
   */
  givenName: string;
  /**
   * HIMES医療機関コード
   */
  himesHospitalCode?: string;
  /**
   * HIMES医療機関名
   */
  himesHospitalName?: string;
  /**
   * カルテNo.
   */
  himesKarteNo?: string;
  /**
   * インポート日時
   */
  importDate?: Date;
  /**
   * karte id.
   */
  karteId?: string;
  /**
   * 総合判定
   */
  synthesisDiagnosisDecision?: string;
  /**
   * user id.
   */
  userId: number;
  /**
   * username, ログイン権限がない場合はnull
   */
  username?: string;
}

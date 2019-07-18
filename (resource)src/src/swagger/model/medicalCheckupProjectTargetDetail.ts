export default interface MedicalCheckupProjectTargetDetail { 
  /**
   * 受診日
   */
  checkupDate?: string;
  /**
   * 従業員コード
   */
  employeeCode: string;
  /**
   * 姓
   */
  familyName: string;
  /**
   * 名
   */
  givenName: string;
  /**
   * 受診場所
   */
  hospitalName?: string;
  /**
   * 部署ID
   */
  organizationUnitId: number;
  /**
   * 性別
   */
  sex: string;
  /**
   * 総合判定
   */
  synthesisDiagnosisDecision: string;
}

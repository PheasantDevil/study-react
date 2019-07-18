export default interface CheckupTargetResult { 
  /**
   * 医師の意見
   */
  checkupOpinionOnEmploymentStatusId?: number;
  /**
   * 産業医面談
   */
  consultationStatusId?: number;
  /**
   * 従業員番号
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
   * karte id
   */
  medicalCheckupKarteId?: number;
  /**
   * medicalCheckupTarget id
   */
  medicalCheckupTargetId: number;
  /**
   * 部署ID
   */
  organizationUnitId?: number;
  /**
   * 二次検診結果有無
   */
  reexaminationPresence?: boolean;
  /**
   * ステータス
   */
  status: StatusEnum;
  /**
   * 総合判定ID
   */
  synthesisDiagnosisDecisionId?: number;
  /**
   * user id
   */
  userId: number;
}
export type StatusEnum = 'yet' | 'complete';



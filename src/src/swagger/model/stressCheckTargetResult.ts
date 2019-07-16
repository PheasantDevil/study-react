export default interface StressCheckTargetResult { 
  /**
   * 面談申し出
   */
  consultationOfferId?: number;
  /**
   * 開示
   */
  disclosure?: boolean;
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
   * 高ストレス
   */
  heghStress?: boolean;
  /**
   * 部署ID
   */
  organizationUnitId?: number;
  /**
   * 評価点 A
   */
  scoreA?: number;
  /**
   * 評価点 B
   */
  scoreB?: number;
  /**
   * 評価点 C
   */
  scoreC?: number;
  /**
   * 産業医面談
   */
  stresscheckOpinionOnEmploymentStatusId?: number;
  /**
   * medicalStressCheckTarget id
   */
  stresscheckTargetId: number;
  /**
   * user id
   */
  userId: number;
}

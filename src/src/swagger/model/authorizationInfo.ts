export default interface AuthorizationInfo { 
  /**
   * アバター
   */
  avatar?: string;
  /**
   * 生年月日
   */
  birthday: string;
  /**
   * 産業医の場合IDが入る
   */
  employmentMedicalAdvisorId?: number;
  /**
   * 姓
   */
  familyName: string;
  /**
   * 名
   */
  givenName: string;
  /**
   * 管理者か
   */
  isManager?: boolean;
  /**
   * ストレスチェック運用担当か
   */
  isStresscheckOperator?: boolean;
  /**
   * 会社id
   */
  organizationId: number;
  /**
   * 会社名
   */
  organizationName: string;
  /**
   * 性別
   */
  sex: string;
  /**
   * user id
   */
  userId: number;
  /**
   * ログインID
   */
  username: string;
}

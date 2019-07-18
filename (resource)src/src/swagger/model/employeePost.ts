export default interface EmployeePost { 
  /**
   * 生年月日
   */
  birthday: string;
  /**
   * 業務用メールアドレス
   */
  businessMail: string;
  /**
   * employee code.
   */
  employeeCode: string;
  /**
   * 姓
   */
  familyName: string;
  /**
   * 姓(カナ)
   */
  familyNameKana: string;
  /**
   * 名
   */
  givenName: string;
  /**
   * 名(カナ)
   */
  givenNameKana: string;
  /**
   * 管理者割当
   */
  managerAssignment: boolean;
  /**
   * 部署ID
   */
  organizationUnitId?: number;
  /**
   * 性別
   */
  sex: string;
  /**
   * ログイン権限割当
   */
  signinAssignment: boolean;
  /**
   * ストレスチェック実施者割当
   */
  stresscheckOperatorAssignment: boolean;
  /**
   * username, ログイン権限がない場合はnull
   */
  username?: string;
}

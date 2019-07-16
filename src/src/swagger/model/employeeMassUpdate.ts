export default interface EmployeeMassUpdate { 
  /**
   * 管理者割当
   */
  managerAssignment?: boolean;
  /**
   * 部署ID
   */
  organizationUnitId?: number;
  /**
   * ログイン権限割当
   */
  signinAssignment?: boolean;
  /**
   * ストレスチェック実施者割当
   */
  stresscheckOperatorAssignment?: boolean;
}

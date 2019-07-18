export default interface EmployeeExcludedFromStressCheck { 
  /**
   * employee id.
   */
  employeeId: number;
  /**
   * 姓
   */
  familyName: string;
  /**
   * 名
   */
  givenName: string;
  /**
   * user id.
   */
  userId: number;
  /**
   * username, ログイン権限がない場合はnull
   */
  username?: string;
}

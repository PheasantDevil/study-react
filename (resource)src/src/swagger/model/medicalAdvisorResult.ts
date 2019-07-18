export default interface MedicalAdvisorResult { 
  /**
   * 姓
   */
  familyName: string;
  /**
   * 名
   */
  givenName: string;
  /**
   * ログイン権限割当
   */
  signinAssignment?: boolean;
}

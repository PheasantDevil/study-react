export default interface MedicalAdvisorRequest { 
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
  /**
   * ログインID，ログイン権限がない場合はnull，ログイン権限付与したままusername変更は不可
   */
  username: string;
}

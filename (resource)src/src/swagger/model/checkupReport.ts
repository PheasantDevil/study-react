export default interface CheckupReport { 
  /**
   * 対象年（クライアント側で平成にする）
   */
  businessYear: number;
  /**
   * 在籍労働者数
   */
  numberOfEmployees: number;
  /**
   * 受診労働者数
   */
  numberOfTargets: number;
  /**
   * 実施日（クライアン側で年月にする）
   */
  startDate: string;
}

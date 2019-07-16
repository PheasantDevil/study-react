export default interface StressCheckReport { 
  /**
   * 対象年（クライアント側で平成にする）
   */
  businessYear: number;
  /**
   * 面接指導を受けた労働者数
   */
  numberOfConsultationedEmployees: number;
  /**
   * 在籍労働者数
   */
  numberOfEmployees: number;
  /**
   * 検査を受けた労働者数
   */
  numberOfTargets: number;
  /**
   * 実施日（クライアン側で年月にする）
   */
  startDate: string;
}

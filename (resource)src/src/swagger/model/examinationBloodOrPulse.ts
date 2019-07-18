// @ts-ignore
import BigDecimal from './bigDecimal';
export default interface ExaminationBloodOrPulse { 
  /**
   * 拡張期血圧（最低血圧）
   */
  diastolic?: BigDecimal;
  /**
   * 収縮期血圧（最高血圧）
   */
  systolic?: BigDecimal;
  /**
   * 脈拍
   */
  value?: BigDecimal;
}

// @ts-ignore
import BigDecimal from './bigDecimal';
export default interface StandardValueNumericPostItem { 
  /**
   * 境界値を正常に含むか
   */
  includingEquivalence: boolean;
  /**
   * 境界値
   */
  value: BigDecimal;
}

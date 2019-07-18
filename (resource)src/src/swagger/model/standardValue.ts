// @ts-ignore
import BigDecimal from './bigDecimal';
export default interface StandardValue { 
  /**
   * 最大値（区分値用）
   */
  classificationValueMaxId?: number;
  /**
   * 最小値（区分値用）
   */
  classificationValueMinId?: number;
  /**
   * 同値も正常値に含めるか
   */
  diastolicIncludingEquivalenceMax?: boolean;
  /**
   * 同値も正常値に含めるか
   */
  diastolicIncludingEquivalenceMin?: boolean;
  /**
   * 最大値（最低血圧）
   */
  diastolicMax?: BigDecimal;
  /**
   * 最小値（最低血圧）
   */
  diastolicMin?: BigDecimal;
  /**
   * examination item id
   */
  examinationItemId: number;
  /**
   * 同値も正常値に含めるか
   */
  hpfIncludingEquivalenceMax?: boolean;
  /**
   * 同値も正常値に含めるか
   */
  hpfIncludingEquivalenceMin?: boolean;
  /**
   * 最大値（毎視野）
   */
  hpfMax?: BigDecimal;
  /**
   * 最小値（毎視野）
   */
  hpfMin?: BigDecimal;
  /**
   * standard value id
   */
  id: number;
  /**
   * 同値も正常値に含めるか
   */
  includingEquivalenceMax?: boolean;
  /**
   * 同値も正常値に含めるか
   */
  includingEquivalenceMin?: boolean;
  /**
   * 同値も正常値に含めるか
   */
  lpfIncludingEquivalenceMax?: boolean;
  /**
   * 同値も正常値に含めるか
   */
  lpfIncludingEquivalenceMin?: boolean;
  /**
   * 最大値（数視野）
   */
  lpfMax?: BigDecimal;
  /**
   * 最小値（数視野）
   */
  lpfMin?: BigDecimal;
  /**
   * 最大値（数値用）
   */
  max?: BigDecimal;
  /**
   * 最小値（数値用）
   */
  min?: BigDecimal;
  /**
   * 同値も正常値に含めるか
   */
  systolicIncludingEquivalenceMax?: boolean;
  /**
   * 同値も正常値に含めるか
   */
  systolicIncludingEquivalenceMin?: boolean;
  /**
   * 最大値（最高血圧）
   */
  systolicMax?: BigDecimal;
  /**
   * 最小値（最高血圧）
   */
  systolicMin?: BigDecimal;
  /**
   * 対象性別
   */
  targetSex: TargetSexEnum;
  /**
   * タイプ
   */
  type: TypeEnum;
  /**
   * 同値も正常値に含めるか
   */
  wfIncludingEquivalenceMax?: boolean;
  /**
   * 同値も正常値に含めるか
   */
  wfIncludingEquivalenceMin?: boolean;
  /**
   * 最大値（全視野）
   */
  wfMax?: BigDecimal;
  /**
   * 最小値（全視野）
   */
  wfMin?: BigDecimal;
}
export type TargetSexEnum = 'all' | 'male' | 'female';
export type TypeEnum = 'numeric' | 'classification' | 'blood_pressure' | 'sediment';



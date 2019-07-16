export default interface CheckupStanderdValue { 
  /**
   * 最大値（区分値用）
   */
  classificationValueMaxCode?: number;
  /**
   * 最大値（区分値用）
   */
  classificationValueMaxName?: number;
  /**
   * 最小値（区分値用）
   */
  classificationValueMinCode?: number;
  /**
   * 最小値（区分値用）
   */
  classificationValueMinName?: number;
  /**
   * examination item id
   */
  examinationItemId: number;
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
   * 最大値（数値用）
   */
  max?: number;
  /**
   * 最小値（数値用）
   */
  min?: number;
  /**
   * 対象性別
   */
  targetSex: TargetSexEnum;
  /**
   * タイプ
   */
  type: TypeEnum;
}
export type TargetSexEnum = 'all' | 'male' | 'female';
export type TypeEnum = 'numeric' | 'classification';



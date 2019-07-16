export default interface ExaminationItem { 
  /**
   * classification value set id
   */
  classificationValueSetId?: number;
  /**
   * examination category id
   */
  examinationCategoryId: number;
  /**
   * examination item id
   */
  id: number;
  /**
   * 検査項目名
   */
  name: string;
  /**
   * 表示順
   */
  order: number;
  /**
   * 対象性別
   */
  targetSex: TargetSexEnum;
  /**
   * タイプ
   */
  type: TypeEnum;
  /**
   * 単位
   */
  unit?: string;
}
export type TargetSexEnum = 'all' | 'male' | 'female';
export type TypeEnum = 'numeric' | 'classification';



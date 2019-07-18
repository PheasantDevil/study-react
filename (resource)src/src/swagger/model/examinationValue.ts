// @ts-ignore
import BigDecimal from './bigDecimal';
// @ts-ignore
import ClassificationValue from './classificationValue';
// @ts-ignore
import ExaminationBloodOrPulse from './examinationBloodOrPulse';
export default interface ExaminationValue { 
  classificationValue?: ClassificationValue;
  /**
   * examination item id
   */
  examinationItemId: number;
  /**
   * 空腹
   */
  hunger?: boolean;
  /**
   * examination value id
   */
  id: number;
  /**
   * 未満
   */
  less?: boolean;
  /**
   * 沈渣多数無数
   */
  many?: boolean;
  /**
   * 沈渣範囲max
   */
  maxValue?: BigDecimal;
  /**
   * 沈渣範囲min
   */
  minValue?: BigDecimal;
  /**
   * 以下
   */
  orLess?: boolean;
  /**
   * 以上
   */
  orOver?: boolean;
  /**
   * テキスト
   */
  text?: string;
  /**
   * 食後時間
   */
  timeAfterTheMeal?: BigDecimal;
  /**
   * examination value type
   */
  type: string;
  /**
   * 検査値 numeric, sediment
   */
  value?: BigDecimal;
  /**
   * 検査値 血圧、脈拍
   */
  values: Array<ExaminationBloodOrPulse>;
}

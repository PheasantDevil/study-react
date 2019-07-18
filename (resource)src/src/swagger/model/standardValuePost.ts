// @ts-ignore
import StandardValuePostBloodPressure from './standardValuePostBloodPressure';
// @ts-ignore
import StandardValuePostClassfication from './standardValuePostClassfication';
// @ts-ignore
import StandardValuePostNumeric from './standardValuePostNumeric';
// @ts-ignore
import StandardValuePostSediment from './standardValuePostSediment';
export default interface StandardValuePost { 
  bloodPressure?: StandardValuePostBloodPressure;
  classification?: StandardValuePostClassfication;
  /**
   * 検査項目ID
   */
  examinationItemId: number;
  /**
   * 男女別
   */
  genderSegregated: boolean;
  numeric?: StandardValuePostNumeric;
  sediment?: StandardValuePostSediment;
  /**
   * データ構造タイプ
   */
  type: TypeEnum;
}
export type TypeEnum = 'numeric' | 'classification' | 'blood_pressure' | 'sediment';



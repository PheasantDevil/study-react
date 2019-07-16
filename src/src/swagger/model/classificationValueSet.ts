// @ts-ignore
import ClassificationValue from './classificationValue';
export default interface ClassificationValueSet { 
  classificationValues?: Array<ClassificationValue>;
  /**
   * classification value set id
   */
  id: number;
  /**
   * 区分値セット名
   */
  name: string;
}

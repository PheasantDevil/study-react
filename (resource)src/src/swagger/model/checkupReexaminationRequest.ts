// @ts-ignore
import CheckupReexaminationItem from './checkupReexaminationItem';
export default interface CheckupReexaminationRequest { 
  /**
   * 二次検診日
   */
  checkupDate?: string;
  /**
   * コメント
   */
  comment?: string;
  /**
   * 健診名
   */
  hospitalName?: string;
  medicationIds?: Array<number>;
  reexaminationItems?: Array<CheckupReexaminationItem>;
}

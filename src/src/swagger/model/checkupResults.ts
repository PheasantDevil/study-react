// @ts-ignore
import CheckupTargetResult from './checkupTargetResult';
export default interface CheckupResults { 
  /**
   * 全件数
   */
  all: number;
  rows: Array<CheckupTargetResult>;
}

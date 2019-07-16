export default interface EmployeesPutResult { 
  /**
   * 更新失敗の従業員IDリスト
   */
  failEmployeeIds: Array<number>;
  /**
   * 更新成功の従業員IDリスト
   */
  successEmployeeIds: Array<number>;
}

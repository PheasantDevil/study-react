export default interface CheckupTargetAddedResult { 
  /**
   * 追加に成功したID
   */
  addedTargetIds: Array<number>;
  /**
   * 追加されなかったID
   */
  skippedEmployeeIds: Array<number>;
}

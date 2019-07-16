export default interface StressCheckTargetAddedResult { 
  /**
   * 追加に成功したID
   */
  addedTargetIds: Array<number>;
  /**
   * 追加されなかったID
   */
  skippedEmployeeIds: Array<number>;
}

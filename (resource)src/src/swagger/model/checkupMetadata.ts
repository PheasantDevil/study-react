export default interface CheckupMetadata { 
  /**
   * 受診日
   */
  checkupDate?: string;
  /**
   * カルテID, データ化前の場合はNull
   */
  checkupKarteId?: number;
  /**
   * medical checkup project id
   */
  checkupProjectId: number;
  /**
   * 健診名
   */
  checkupProjectName: string;
  /**
   * medical checkup target id
   */
  checkupTargetId: number;
}

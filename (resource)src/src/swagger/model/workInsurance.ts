export default interface WorkInsurance { 
  /**
   * 基幹番号
   */
  baseNumber: string;
  /**
   * 枝番号
   */
  branchNumber: string;
  /**
   * 所掌
   */
  concern: string;
  /**
   * 管轄
   */
  jurisdiction: string;
  /**
   * 都道府県
   */
  prefectures: string;
  /**
   * 被一括事業場番号
   */
  workplaceNumber: string;
}

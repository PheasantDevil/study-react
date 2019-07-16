export default interface HowToBeHealthyExceptWorkingTime { 
  /**
   * 労働時間以外の項目（就業場所の変更）
   */
  changePlace: boolean;
  /**
   * 労働時間以外の項目（作業の転換）
   */
  changeWork: boolean;
  /**
   * 労働時間以外の項目（その他）
   */
  other: boolean;
  /**
   * 労働時間以外の項目（深夜業の回数の減少）
   */
  reduceMidnight: boolean;
  /**
   * 労働時間以外の項目（昼間勤務への転換）
   */
  workDaytime: boolean;
}

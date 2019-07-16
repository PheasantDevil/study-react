export default interface HowToBeHealthyAboutWorkingTime { 
  /**
   * 労働時間の短縮（就業の禁止）
   */
  ban: boolean;
  /**
   * 労働時間の短縮（変形労働時間制または裁量労働制の対象から除外）
   */
  change: boolean;
  /**
   * 労働時間の短縮（時間外労働の禁止）
   */
  noOvertime: boolean;
  /**
   * 労働時間の短縮（その他）
   */
  other: boolean;
  /**
   * 労働時間の短縮（時間外労働の制限）
   */
  overtime: boolean;
  /**
   * 労働時間の短縮（時間外労働の制限・N時間まで）
   */
  overtimeHour?: number;
  /**
   * 労働時間の短縮（就業時間の制限）
   */
  shortTime: boolean;
  /**
   * 労働時間の短縮（就業時間の制限・終了）
   */
  shortTimeEnd?: string;
  /**
   * 労働時間の短縮（就業時間の制限・開始）
   */
  shortTimeStart?: string;
  /**
   * 労働時間の短縮（特になし）
   */
  unnecessary: boolean;
}

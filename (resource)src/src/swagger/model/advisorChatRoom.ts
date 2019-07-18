export default interface AdvisorChatRoom { 
  /**
   * 相談相手（User）の姓
   */
  adviseeFamilyName: string;
  /**
   * 相談相手（User）の名
   */
  adviseeGivenName: string;
  /**
   * 相談相手（User）のid
   */
  adviseeUserId: number;
  /**
   *  チャットルームの作成日時
   */
  chatRoomCreated: Date;
}

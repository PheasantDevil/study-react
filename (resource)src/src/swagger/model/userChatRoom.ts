export default interface UserChatRoom { 
  /**
   * 相談者の姓
   */
  advisorFamilyName: string;
  /**
   * 相談者の名
   */
  advisorGivenName: string;
  /**
   * 相談者のuser_id
   */
  advisorId: number;
  /**
   *  チャットルームの作成日時
   */
  chatRoomCreated: Date;
}

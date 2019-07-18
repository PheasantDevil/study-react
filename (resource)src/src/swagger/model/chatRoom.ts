// @ts-ignore
import Advisor from './advisor';
// @ts-ignore
import RoomUser from './roomUser';
export default interface ChatRoom { 
  advisor?: Advisor;
  /**
   * 日時
   */
  created?: Date;
  /**
   * id
   */
  id: number;
  user?: RoomUser;
}

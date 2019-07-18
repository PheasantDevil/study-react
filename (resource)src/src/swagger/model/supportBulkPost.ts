// @ts-ignore
import SupportPost from './supportPost';
export default interface SupportBulkPost extends SupportPost { 
  targetIds: Array<number>;
}

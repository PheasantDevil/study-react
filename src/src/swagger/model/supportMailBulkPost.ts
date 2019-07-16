// @ts-ignore
import SupportPost from './supportPost';
export default interface SupportMailBulkPost extends SupportPost { 
  bccTargetIds: Array<number>;
  ccTargetIds: Array<number>;
  mailContent: string;
  mailTitle: string;
  toTargetIds: Array<number>;
}

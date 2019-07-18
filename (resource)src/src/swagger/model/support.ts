// @ts-ignore
import SupportMailAddress from './supportMailAddress';
// @ts-ignore
import SupportPost from './supportPost';
export default interface Support extends SupportPost { 
  /**
   * checkup support id
   */
  id: number;
  mailBcc?: Array<SupportMailAddress>;
  mailCc?: Array<SupportMailAddress>;
  mailContent?: string;
  mailSent?: Date;
  mailTitle?: string;
  mailTo?: Array<SupportMailAddress>;
  /**
   * 記録日
   */
  recorded: Date;
}

// @ts-ignore
import AdvisorOccupation from './advisorOccupation';
// @ts-ignore
import AdvisorSkill from './advisorSkill';
// @ts-ignore
import AdvisorTheme from './advisorTheme';
export default interface Advisor { 
  /**
   * 苗字
   */
  familyName: string;
  /**
   * 苗字のアルファベット
   */
  familyNameAlphabet: string;
  /**
   * 名前
   */
  givenName: string;
  /**
   * 名前のアルファベット
   */
  givenNameAlphabet: string;
  /**
   * id
   */
  id: number;
  occupations?: Array<AdvisorOccupation>;
  /**
   * プロフィール文
   */
  profile: string;
  skills?: Array<AdvisorSkill>;
  themes?: Array<AdvisorTheme>;
}

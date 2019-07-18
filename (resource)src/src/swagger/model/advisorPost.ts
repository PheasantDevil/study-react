// @ts-ignore
import AdvisorOccupationPost from './advisorOccupationPost';
// @ts-ignore
import AdvisorSkillPost from './advisorSkillPost';
// @ts-ignore
import AdvisorThemePost from './advisorThemePost';
export default interface AdvisorPost { 
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
  occupations: Array<AdvisorOccupationPost>;
  /**
   * プロフィール文
   */
  profile: string;
  skills: Array<AdvisorSkillPost>;
  themes: Array<AdvisorThemePost>;
}

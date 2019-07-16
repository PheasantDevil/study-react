// @ts-ignore
import Anemia from './anemia';
// @ts-ignore
import BloodPressure from './bloodPressure';
// @ts-ignore
import ChestXray from './chestXray';
// @ts-ignore
import ElectroCardiogram from './electroCardiogram';
// @ts-ignore
import Glucose from './glucose';
// @ts-ignore
import HearingH1k from './hearingH1k';
// @ts-ignore
import HearingH4k from './hearingH4k';
// @ts-ignore
import HearingOthers from './hearingOthers';
// @ts-ignore
import Lipid from './lipid';
// @ts-ignore
import Liver from './liver';
// @ts-ignore
import Sputum from './sputum';
// @ts-ignore
import UrinePSugar from './urinePSugar';
// @ts-ignore
import UrineProtein from './urineProtein';
export default interface Examination { 
  anemia?: Anemia;
  bloodPressure?: BloodPressure;
  chestXray?: ChestXray;
  electroCardiogram?: ElectroCardiogram;
  glucose?: Glucose;
  hearingH1k?: HearingH1k;
  hearingH4k?: HearingH4k;
  hearingOthers?: HearingOthers;
  lipid?: Lipid;
  liver?: Liver;
  sputum?: Sputum;
  urinePSugar?: UrinePSugar;
  urineProtein?: UrineProtein;
}

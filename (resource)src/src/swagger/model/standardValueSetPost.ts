// @ts-ignore
import StandardValuePost from './standardValuePost';
export default interface StandardValueSetPost { 
  /**
   * 基準値名
   */
  name: string;
  standardValues: Array<StandardValuePost>;
}

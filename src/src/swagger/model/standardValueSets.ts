// @ts-ignore
import StandardValueSetMetadata from './standardValueSetMetadata';
export default interface StandardValueSets { 
  /**
   * 組織用基準値セット
   */
  organizationStandards: Array<StandardValueSetMetadata>;
  /**
   * 共通テンプレート
   */
  templates: Array<StandardValueSetMetadata>;
}

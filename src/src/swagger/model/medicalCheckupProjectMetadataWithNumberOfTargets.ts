// @ts-ignore
import MedicalCheckupProjectMetadata from './medicalCheckupProjectMetadata';
// @ts-ignore
import Period from './period';
export default interface MedicalCheckupProjectMetadataWithNumberOfTargets extends MedicalCheckupProjectMetadata { 
  /**
   * ストレスチェック対象者数
   */
  numberOfTargets: number;
}

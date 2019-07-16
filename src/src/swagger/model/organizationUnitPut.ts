// @ts-ignore
import OrganizationUnitPost from './organizationUnitPost';
export default interface OrganizationUnitPut extends OrganizationUnitPost { 
  /**
   * organization_unit id. 新規作成の場合はnull
   */
  id?: number;
}

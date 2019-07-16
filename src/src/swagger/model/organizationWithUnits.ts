// @ts-ignore
import Organization from './organization';
// @ts-ignore
import OrganizationUnit from './organizationUnit';
export default interface OrganizationWithUnits extends Organization { 
  /**
   * 部署
   */
  organizationUnits: Array<OrganizationUnit>;
}

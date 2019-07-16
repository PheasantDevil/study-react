// @ts-ignore
import Employee from './employee';
// @ts-ignore
import OrganizationUnit from './organizationUnit';
export default interface EmployeeListResult { 
  /**
   * 件数
   */
  count: number;
  /**
   * 従業員
   */
  employees: Array<Employee>;
  /**
   * 部署
   */
  organizationUnits: Array<OrganizationUnit>;
}

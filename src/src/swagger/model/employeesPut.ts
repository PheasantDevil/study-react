// @ts-ignore
import EmployeeMassUpdate from './employeeMassUpdate';
export default interface EmployeesPut { 
  data: EmployeeMassUpdate;
  /**
   * 更新対象従業員IDリスト
   */
  employeeIds: Array<number>;
}

export default interface ConsultationMetadata { 
  /**
   * 面談実施日
   */
  consultationDate: string;
  /**
   * 面談種類・目的
   */
  consultationType: string;
  /**
   * 従業員姓
   */
  employeeFamilyName: string;
  /**
   * 従業員名
   */
  employeeGivenName: string;
  /**
   * consultation id
   */
  id: number;
  /**
   * 産業医姓
   */
  medicalAdvisorFamilyName: string;
  /**
   * 産業医名
   */
  medicalAdvisorGivenName: string;
}

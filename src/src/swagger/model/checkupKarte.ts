// @ts-ignore
import MedicalCheckupImportLog from './medicalCheckupImportLog';
export default interface CheckupKarte { 
  /**
   * 受診日
   */
  checkupDate: string;
  /**
   * medical checkup karte id
   */
  checkupKarteId: number;
  medicalCheckupImportLog: MedicalCheckupImportLog;
}

// @ts-ignore
import ExaminationValue from './examinationValue';
export default interface MedicalCheckupKarte { 
  birthday: string;
  employeeCode: string;
  examinationValues: Array<ExaminationValue>;
  familyName: string;
  givenName: string;
  organizationUnitId?: number;
  sexId: number;
}

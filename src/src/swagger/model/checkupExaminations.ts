// @ts-ignore
import ExaminationCategory from './examinationCategory';
// @ts-ignore
import ExaminationItem from './examinationItem';
export default interface CheckupExaminations { 
  examinationCategories: Array<ExaminationCategory>;
  examinationItems: Array<ExaminationItem>;
}

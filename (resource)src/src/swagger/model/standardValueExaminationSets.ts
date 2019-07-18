// @ts-ignore
import ClassificationValueSet from './classificationValueSet';
// @ts-ignore
import ExaminationCategory from './examinationCategory';
// @ts-ignore
import ExaminationItem from './examinationItem';
export default interface StandardValueExaminationSets { 
  classificationValueSets: Array<ClassificationValueSet>;
  examinationCategories: Array<ExaminationCategory>;
  examinationItems: Array<ExaminationItem>;
}

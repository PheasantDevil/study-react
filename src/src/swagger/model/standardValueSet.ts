// @ts-ignore
import StandardValue from './standardValue';
// @ts-ignore
import StandardValueSetMetadata from './standardValueSetMetadata';
export default interface StandardValueSet extends StandardValueSetMetadata { 
  standardValues: Array<StandardValue>;
}

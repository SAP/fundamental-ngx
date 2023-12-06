import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { alternateSetter } from './setter-alternator';

export const coerceCssPixel = alternateSetter(coerceCssPixelValue);

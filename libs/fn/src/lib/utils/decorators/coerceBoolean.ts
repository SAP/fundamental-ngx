import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { alternateSetter } from './setter-alternator';

export const coerceBoolean = alternateSetter(coerceBooleanProperty);

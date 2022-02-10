import { alternateSetter } from './setter-alternator';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

export const coerceBoolean = alternateSetter(coerceBooleanProperty);

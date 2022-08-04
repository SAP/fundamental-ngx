import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { alternateSetter } from './setter-alternator';

/**
 * Decorator for coercing passed value to boolean, using @angular/cdk coerceBooleanProperty
 */
export const coerceBoolean = alternateSetter(coerceBooleanProperty);

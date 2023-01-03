import { coerceArray } from '@angular/cdk/coercion';
import { isBlank } from '../typecheck';

/** @hidden */
export function coerceArraySafe<T>(value: T | T[]): T[] {
    return isBlank(value) ? [] : coerceArray(value);
}

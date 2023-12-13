import { coerceArray } from '@angular/cdk/coercion';
import { isBlank } from '../typecheck';

/** @ignore */
export function coerceArraySafe<T>(value: T | T[]): T[] {
    return isBlank(value) ? [] : coerceArray(value);
}

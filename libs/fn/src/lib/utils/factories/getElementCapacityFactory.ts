import { coerceElement } from '@angular/cdk/coercion';
import { GetComputedStyleFn, GetElementCapacityFn } from '../utils.types';
import { pxToNum } from '../helpers/pxToNum';

export function getElementCapacityFactory(computedStyle: GetComputedStyleFn): GetElementCapacityFn {
    return (element) => {
        const computed = computedStyle(coerceElement(element));
        return pxToNum(computed.width) - pxToNum(computed.paddingLeft) - pxToNum(computed.paddingRight);
    };
}

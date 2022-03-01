import { coerceElement } from '@angular/cdk/coercion';
import { pxToNum } from '../helpers/px-to-num';
import { GetComputedStyleFn, GetElementWidthFn } from '../utils.types';

export function getElementWidthFactory(getComputedStyle: GetComputedStyleFn): GetElementWidthFn {
    return (element, withMargin?) => {
        const _element = coerceElement(element);
        const computedStyle = getComputedStyle(_element);
        let width = pxToNum(computedStyle.width);
        if (withMargin) {
            width += pxToNum(computedStyle.marginLeft) + pxToNum(computedStyle.marginRight);
        }
        return width;
    };
}

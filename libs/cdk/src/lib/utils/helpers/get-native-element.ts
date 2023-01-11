import { coerceElement } from '@angular/cdk/coercion';
import { ElementRef } from '@angular/core';

/**
 * Retrieves native element from ElementRef.
 */
export function getNativeElement<T extends Element = HTMLElement>(
    element: { elementRef(): ElementRef<T> } | T | ElementRef<T>
): T {
    let coercible = element;
    if (isHasElementRef<T>(element)) {
        coercible = element.elementRef();
    }
    return coerceElement(coercible as T | ElementRef<T>);
}

/**
 * Checks whether object has element reference in it.
 */
export function isHasElementRef<T extends Element = HTMLElement>(
    something: any
): something is { elementRef(): ElementRef<T> } {
    return something && typeof something['elementRef'] === 'function';
}

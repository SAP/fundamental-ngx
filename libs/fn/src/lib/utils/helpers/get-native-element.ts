import { ElementRef } from '@angular/core';
import { coerceElement } from '@angular/cdk/coercion';

export function getNativeElement<T extends HTMLElement>(
    element: { elementRef(): ElementRef<T> } | T | ElementRef<T>
): T {
    let coercible = element;
    if (isHasElementRef(element)) {
        coercible = element.elementRef();
    }
    return coerceElement(coercible as T | ElementRef<T>);
}

export function isHasElementRef<T extends HTMLElement = HTMLElement>(
    something: any
): something is { elementRef(): ElementRef<T> } {
    return something && typeof something['elementRef'] === 'function';
}

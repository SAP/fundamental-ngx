import { ElementRef } from '@angular/core';

export const pxToNum = (pixels: string): number => Number(pixels.replace('px', '')) || 0;

export const toNativeElement = (element: HTMLElement | ElementRef): HTMLElement =>
    element instanceof ElementRef ? element.nativeElement : element;

/** Return elements capacity (width subtract by element padding)
 * @param element - HTMLelement or element reference
 * */
export function getElementCapacity(element: HTMLElement | ElementRef): number {
    const _element = toNativeElement(element);
    const computedStyle = window.getComputedStyle(_element);

    return pxToNum(computedStyle.width) - pxToNum(computedStyle.paddingLeft) - pxToNum(computedStyle.paddingRight);
}

/** Return elements width
 * @param element - HTMLelement or element reference
 * @param withMargin - weather to add element margins to width
 * */
export function getElementWidth(element: HTMLElement | ElementRef, withMargin?: boolean): number {
    const _element = toNativeElement(element);
    const computedStyle = getComputedStyle(_element);

    return withMargin
        ? pxToNum(computedStyle.width) + pxToNum(computedStyle.marginLeft) + pxToNum(computedStyle.marginRight)
        : pxToNum(computedStyle.width);
}

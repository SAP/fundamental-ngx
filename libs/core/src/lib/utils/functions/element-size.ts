import { ElementRef } from '@angular/core';

const pxToNum = (pixels: string): number => Number(pixels.replace('px', '')) || 0;

const toNativeElement = (element: HTMLElement | ElementRef): HTMLElement =>
    element instanceof ElementRef ? element.nativeElement : element;

export function getElementCapacity(element: HTMLElement | ElementRef): number {
    const _element = toNativeElement(element);
    const computedStyle = window.getComputedStyle(_element);

    return pxToNum(computedStyle.width) - pxToNum(computedStyle.paddingLeft) - pxToNum(computedStyle.paddingRight);
}

export function getElementWidth(element: HTMLElement | ElementRef, withMargin?: boolean): number {
    const _element = toNativeElement(element);

    const computedStyle = getComputedStyle(_element);
    return withMargin
        ? pxToNum(computedStyle.width) + pxToNum(computedStyle.marginLeft) + pxToNum(computedStyle.marginRight)
        : pxToNum(computedStyle.width);
}

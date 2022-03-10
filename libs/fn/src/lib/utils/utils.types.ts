import { ElementRef } from '@angular/core';

export type GetElementWidthFn = (element: HTMLElement | ElementRef, withMargin?: boolean) => number;

export type GetComputedStyleFn = (el: HTMLElement) => CSSStyleDeclaration;

export type GetElementCapacityFn = (element: HTMLElement | ElementRef) => number;

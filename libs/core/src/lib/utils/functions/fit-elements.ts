import { ElementRef } from '@angular/core';

const pxToNum = (pixels: string): number => Number(pixels.replace('px', '')) || 0;

const getComputedStyle = (element: HTMLElement): CSSStyleDeclaration => window.getComputedStyle(element);

const getElementWidth = (element: HTMLElement): number => pxToNum(getComputedStyle(element).width);

const getElementCapacity = (element: HTMLElement): number => {
    const computedStyle = getComputedStyle(element);
    return pxToNum(computedStyle.width) - pxToNum(computedStyle.paddingLeft) - pxToNum(computedStyle.paddingRight);
};

export type FitElements<T> = [T[], T[], number];
type HtmlAccessor<T> = (element: T) => HTMLElement;
const defaultAccessor = element => element.nativeElement;

/**@function Used to group elements into
 * @param container - Element which will fit given elements.
 * @param elements - Collection of elements to fit into the container.
 * @param containerHTMLAccessor - Function used to access container HTMLElement.
 * Needs to be specified if container type is different than ElementRef.
 * @param elementHTMLAccessor - Function used to access elements item HTMLElement.
 * Needs to be specified if elements collection type is different than ElementRef[].
 * @param reservedWidthIfCollapsed - Width which should be reserved for additional element,
 * which will be placed in the container if the container can't fit all of the elements.
 *
 * @returns Array of elements, where
 * array[0] - collection of elements which fit in the container
 * array[1] - collection of elements which does not fit in the container
 * array[2] - additional space
 * */
export function fitElements<T = ElementRef, D = ElementRef>(
    container: T,
    elements: D[],
    {
        containerHTMLAccessor = defaultAccessor,
        elementHTMLAccessor = defaultAccessor,
        reservedWidthIfCollapsed = 0
    }: {
        containerHTMLAccessor?: HtmlAccessor<T>,
        elementHTMLAccessor?: HtmlAccessor<D>,
        reservedWidthIfCollapsed?: number;
    } = {}
): FitElements<D> {
    let capacityLeft = getElementCapacity(containerHTMLAccessor(container));
    const elementsWidth = elements.map(element => getElementWidth(elementHTMLAccessor(element)));
    const totalWidthRequired = elementsWidth.reduce((totalWidth, width) => totalWidth + width, 0);
    const requiredFreeSpace = totalWidthRequired > capacityLeft ? reservedWidthIfCollapsed : 0;

    const groupedElements = elements.reduce((acc, element, index) => {
        const elementWidth = elementsWidth[index];

        if (capacityLeft - elementWidth <= requiredFreeSpace) {
            capacityLeft = 0;
            acc[1].push(element);
        } else {
            capacityLeft -= elementWidth;
            acc[0].push(element);
        }
        return acc;
    }, [[], []]);

    return [groupedElements[0], groupedElements[1], capacityLeft]
}

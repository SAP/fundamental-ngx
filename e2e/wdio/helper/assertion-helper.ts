import { webDriver } from '../driver/wdio';

export function checkIfDisabled(element, attribute: string, value: string, index: number = 0): void {
    expect(webDriver.getAttributeByName(element, attribute, index)).toBe(value);
}

export function checkMarkingCheckbox(checkboxArray, sliceStart?: number, sliceEnd?: number): void {
    const beforeClicking = webDriver.getAttributeByNameArr(checkboxArray, 'aria-checked', sliceStart, sliceEnd);
    for (let i = sliceStart; sliceEnd > i; i++) {
        if (!webDriver.getAttributeByNameArr(checkboxArray, 'aria-disabled', i)) {
            webDriver.scrollIntoView(checkboxArray, i);
            webDriver.clickNextElement(checkboxArray, i);
        }
    }
    const afterClickingOnce = webDriver.getAttributeByNameArr(checkboxArray, 'aria-checked', sliceStart, sliceEnd);
    for (let i = sliceStart; sliceEnd > i; i++) {
        if (!webDriver.getAttributeByNameArr(checkboxArray, 'aria-disabled', i)) {
            webDriver.clickNextElement(checkboxArray, i);
        }
    }
    const afterClickingTwice = webDriver.getAttributeByNameArr(checkboxArray, 'aria-checked', sliceStart, sliceEnd);

    expect(beforeClicking).not.toEqual(afterClickingOnce);
    expect(afterClickingTwice).toEqual(beforeClicking);
}

export function checkLabels(arraySelector: string, expectation: string[], sliceStart?: number, sliceEnd?: number): void {
    expect(webDriver.getTextArr(arraySelector, sliceStart, sliceEnd)).toEqual(expectation);
}

export function checkRtlOrientation(element: string, index: number): void {
    expect(webDriver.getAttributeByName(element, 'dir', index)).toBe('rtl');
    expect(webDriver.getCSSPropertyByName(element, 'direction', index).value).toBe('rtl');
}

export function checkLtrOrientation(element: string, index: number): void {
    expect(webDriver.getAttributeByName(element, 'dir', index)).toBe('ltr');
    expect(webDriver.getCSSPropertyByName(element, 'direction', index).value).toBe('ltr');
}

export function checkElementDisplayed(element: string): void {
    const elLength = webDriver.getElementArrayLength(element);
    for (let i = 0; elLength > i; i++) {
        expect(webDriver.elementDisplayed(element, i)).toBe(true);
    }
}

export function checkElementText(element: string): void {
    const elLength = webDriver.getElementArrayLength(element);
    for (let i = 0; elLength > i; i++) {
        expect(webDriver.getText(element, i)).not.toBe(null, '');
    }
}

export function checkAttributeValueTrue(element: string, attribute: string): void {
    const elLength = webDriver.getElementArrayLength(element);
    for (let i = 0; elLength > i; i++) {
        expect(webDriver.getAttributeByName(element, attribute, i)).toBe('true');
    }
}

export function checkElArrIsClickable(element: string): void {
    const elLength = webDriver.getElementArrayLength(element);
    for (let i = 0; elLength > i; i++) {
        expect(webDriver.isElementClickable(element, i)).toBe(true);
    }
}

export function checkElementTextValue(element: string, expectation): void {
    const elLength = webDriver.getElementArrayLength(element);
    for (let i = 0; elLength > i; i++) {
        expect(webDriver.getText(element, i).trim()).toBe(expectation[i]);
    }
}

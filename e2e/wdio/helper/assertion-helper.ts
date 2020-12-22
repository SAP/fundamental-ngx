import { webDriver } from '../driver/wdio';

export function checkRtlOrientation(element: string, index: number): void {
    expect(webDriver.getAttributeByName(element, 'dir', index)).toBe('rtl');
    expect(webDriver.getCSSPropertyByName(element, 'direction', index).value).toBe('rtl');
}

export function checkLtrOrientation(element: string, index: number): void {
    expect(webDriver.getAttributeByName(element, 'dir', index)).toBe('ltr');
    expect(webDriver.getCSSPropertyByName(element, 'direction', index).value).toBe('ltr');
}

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

export function checkNotFocused(element: string, index: number = 0): void {
    expect($$(element)[index].isFocused()).toBe(false);
}

export function checkFocused(element: string, index: number = 0): void {
    expect($$(element)[index].isFocused()).toBe(true);
}

export function checkValueChanged(oldValue: string, newValue: string): void {
    expect(oldValue).not.toEqual(newValue);
}

export function checkTextValueContain(oldValue: string, newValue: string): void {
    expect(oldValue).toContain(newValue);
}

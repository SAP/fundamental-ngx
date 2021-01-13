import {
    clickNextElement,
    elementDisplayed,
    getAttributeByName,
    getAttributeByNameArr,
    getCSSPropertyByName,
    getElementArrayLength,
    getText,
    getTextArr,
    isElementClickable,
    scrollIntoView
} from '../driver/wdio';

export function checkRtlOrientation(element: string, index: number): void {
    expect(getAttributeByName(element, 'dir', index)).toBe('rtl');
    expect(getCSSPropertyByName(element, 'direction', index).value).toBe('rtl');
}

export function checkLtrOrientation(element: string, index: number): void {
    expect(getAttributeByName(element, 'dir', index)).toBe('ltr');
    expect(getCSSPropertyByName(element, 'direction', index).value).toBe('ltr');
}

export function checkIfDisabled(element, attribute: string, value: string, index: number = 0): void {
    expect(getAttributeByName(element, attribute, index)).toBe(value);
}

export function checkMarkingCheckbox(checkboxArray, sliceStart?: number, sliceEnd?: number): void {
    const beforeClicking = getAttributeByNameArr(checkboxArray, 'aria-checked', sliceStart, sliceEnd);
    for (let i = sliceStart; sliceEnd > i; i++) {
        if (!getAttributeByNameArr(checkboxArray, 'aria-disabled', i)) {
            scrollIntoView(checkboxArray, i);
            clickNextElement(checkboxArray, i);
        }
    }
    const afterClickingOnce = getAttributeByNameArr(checkboxArray, 'aria-checked', sliceStart, sliceEnd);
    for (let i = sliceStart; sliceEnd > i; i++) {
        if (!getAttributeByNameArr(checkboxArray, 'aria-disabled', i)) {
            clickNextElement(checkboxArray, i);
        }
    }
    const afterClickingTwice = getAttributeByNameArr(checkboxArray, 'aria-checked', sliceStart, sliceEnd);

    expect(beforeClicking).not.toEqual(afterClickingOnce);
    expect(afterClickingTwice).toEqual(beforeClicking);
}

export function checkLabels(arraySelector: string, expectation: string[], sliceStart?: number, sliceEnd?: number): void {
    expect(getTextArr(arraySelector, sliceStart, sliceEnd)).toEqual(expectation);
}

export function checkNotFocused(element: string, index: number = 0): void {
    expect($$(element)[index].isFocused()).toBe(false);
}

export function checkFocused(element: string, index: number = 0): void {
    expect($$(element)[index].isFocused()).toBe(true);
}

export function checkElementDisplayed(element: string): void {
    const elLength = getElementArrayLength(element);
    for (let i = 0; elLength > i; i++) {
        expect(elementDisplayed(element, i)).toBe(true);
    }
}

export function checkElementText(element: string): void {
    const elLength = getElementArrayLength(element);
    for (let i = 0; elLength > i; i++) {
        expect(getText(element, i)).not.toBe(null, '');
    }
}

export function checkAttributeValueTrue(element: string, attribute: string): void {
    const elLength = getElementArrayLength(element);
    for (let i = 0; elLength > i; i++) {
        expect(getAttributeByName(element, attribute, i)).toBe('true');
    }
}

export function checkValueChanged(oldValue: string, newValue: string): void {
    expect(oldValue).not.toEqual(newValue);
}

export function checkElArrIsClickable(element: string): void {
    const elLength = getElementArrayLength(element);
    for (let i = 0; elLength > i; i++) {
        expect(isElementClickable(element, i)).toBe(true);
    }
}

export function checkElementTextValue(element: string, expectation): void {
    const elLength = getElementArrayLength(element);
    for (let i = 0; elLength > i; i++) {
        expect(getText(element, i).trim()).toBe(expectation[i]);
    }
}

export function checkTextValueContain(str: string, subStr: string): void {
    expect(str).toContain(subStr);
}

import {
    applyState,
    checkElementScreenshot,
    elementDisplayed,
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength,
    getText,
    getTextArr,
    isElementClickable,
    saveElementScreenshot
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

export function checkLabels(
    arraySelector: string,
    expectation: string[],
    sliceStart?: number,
    sliceEnd?: number
): void {
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
        // @ts-ignore
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
        expect(isElementClickable(element, i)).toBe(true, `element ${i} is not clickable`);
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

export function checkElementHoverState(
    selector: string,
    tag: string,
    elementName: string,
    pageObject,
    index: number = 0
): void {
    applyState('hover', selector, index);
    saveElementScreenshot(selector, tag, pageObject.getScreenshotFolder(), index);
    expect(checkElementScreenshot(selector, tag, pageObject.getScreenshotFolder(), index)).toBeLessThan(
        5,
        `${elementName} ${index} element hover state mismatch`
    );
}

export function checkElementFocusState(
    selector: string,
    tag: string,
    elementName: string,
    pageObject,
    index: number = 0
): void {
    applyState('focus', selector, index);
    saveElementScreenshot(selector, tag, pageObject.getScreenshotFolder(), index);
    expect(checkElementScreenshot(selector, tag, pageObject.getScreenshotFolder(), index)).toBeLessThan(
        5,
        `${elementName} ${index} element focus state mismatch`
    );
}

export function checkElementActiveState(
    selector: string,
    tag: string,
    elementName: string,
    pageObject,
    index: number = 0
): void {
    applyState('active', selector, index);
    saveElementScreenshot(selector, tag, pageObject.getScreenshotFolder(), index);
    expect(checkElementScreenshot(selector, tag, pageObject.getScreenshotFolder(), index)).toBeLessThan(
        5,
        `${elementName} ${index} element active state mismatch`
    );
}

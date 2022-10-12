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

export async function checkRtlOrientation(element: string, index: number): Promise<void> {
    await expect(await getAttributeByName(element, 'dir', index)).toBe('rtl');
    await expect((await getCSSPropertyByName(element, 'direction', index)).value).toBe('rtl');
}

export async function checkLtrOrientation(element: string, index: number): Promise<void> {
    await expect(await getAttributeByName(element, 'dir', index)).toBe('ltr');
    await expect((await getCSSPropertyByName(element, 'direction', index)).value).toBe('ltr');
}

export async function checkIfDisabled(element, attribute: string, value: string, index: number = 0): Promise<void> {
    await expect(await getAttributeByName(element, attribute, index)).toBe(value);
}

export async function checkLabels(
    arraySelector: string,
    expectation: string[],
    sliceStart?: number,
    sliceEnd?: number
): Promise<void> {
    await expect(await getTextArr(arraySelector, sliceStart, sliceEnd)).toEqual(expectation);
}

export async function checkNotFocused(element: string, index: number = 0): Promise<void> {
    await expect(await (await $$(element))[index].isFocused()).toBe(false);
}

export async function checkFocused(element: string, index: number = 0): Promise<void> {
    await expect(await (await $$(element))[index].isFocused()).toBe(true);
}

export async function checkElementDisplayed(element: string): Promise<void> {
    const elLength = await getElementArrayLength(element);
    for (let i = 0; elLength > i; i++) {
        await expect(await elementDisplayed(element, i)).toBe(true);
    }
}

export async function checkElementText(element: string): Promise<void> {
    const elLength = await getElementArrayLength(element);
    for (let i = 0; elLength > i; i++) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await expect(await getText(element, i)).not.toBe(null, '');
    }
}

export async function checkAttributeValueTrue(element: string, attribute: string): Promise<void> {
    const elLength = await getElementArrayLength(element);
    for (let i = 0; elLength > i; i++) {
        await expect(await getAttributeByName(element, attribute, i)).toBe('true');
    }
}

export async function checkValueChanged(oldValue: string, newValue: string): Promise<void> {
    await expect(oldValue).not.toEqual(newValue);
}

export async function checkElArrIsClickable(element: string): Promise<void> {
    const elLength = await getElementArrayLength(element);
    for (let i = 0; elLength > i; i++) {
        await expect(await isElementClickable(element, i)).toBe(true, `element ${i} is not clickable`);
    }
}

export async function checkElementTextValue(element: string, expectation): Promise<void> {
    const elLength = await getElementArrayLength(element);
    for (let i = 0; elLength > i; i++) {
        await expect((await getText(element, i)).trim()).toBe(expectation[i]);
    }
}

export async function checkTextValueContain(str: string, subStr: string): Promise<void> {
    await expect(str).toContain(subStr);
}

export async function checkElementHoverState(
    selector: string,
    tag: string,
    elementName: string,
    pageObject,
    index: number = 0
): Promise<void> {
    await applyState('hover', selector, index);
    await saveElementScreenshot(selector, tag, await pageObject.getScreenshotFolder(), index);
    await expect(
        await checkElementScreenshot(selector, tag, await pageObject.getScreenshotFolder(), index)
    ).toBeLessThan(5, `${elementName} ${index} element hover state mismatch`);
}

export async function checkElementFocusState(
    selector: string,
    tag: string,
    elementName: string,
    pageObject,
    index: number = 0
): Promise<void> {
    await applyState('focus', selector, index);
    await saveElementScreenshot(selector, tag, await pageObject.getScreenshotFolder(), index);
    await expect(
        await checkElementScreenshot(selector, tag, await pageObject.getScreenshotFolder(), index)
    ).toBeLessThan(5, `${elementName} ${index} element focus state mismatch`);
}

export async function checkElementActiveState(
    selector: string,
    tag: string,
    elementName: string,
    pageObject,
    index: number = 0
): Promise<void> {
    await applyState('active', selector, index);
    await saveElementScreenshot(selector, tag, await pageObject.getScreenshotFolder(), index);
    await expect(
        await checkElementScreenshot(selector, tag, await pageObject.getScreenshotFolder(), index)
    ).toBeLessThan(5, `${elementName} ${index} element active state mismatch`);
}

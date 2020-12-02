import { webDriver } from '../driver/wdio';

export function checkIfDisabled(element, attribute: string, value: string, index: number = 0): void {
    expect(webDriver.getAttributeByName(element, attribute, index)).toBe(value);
}


export function checkMarkingCheckbox(checkboxArray, sliceStart?: number, sliceEnd?: number): void {
    const beforeClicking = webDriver.getAttributeByNameArr(checkboxArray, 'aria-checked', sliceStart, sliceEnd);
    console.log(beforeClicking , '1111111111111111111111111');
    for (let i = sliceStart; sliceEnd > i; i++) {
        if (!webDriver.getAttributeByNameArr(checkboxArray, 'aria-disabled', i)) {
            webDriver.scrollIntoView(checkboxArray, i);
            webDriver.clickNextElement(checkboxArray, i);
        }
    }
    const afterClickingOnce = webDriver.getAttributeByNameArr(checkboxArray, 'aria-checked', sliceStart, sliceEnd);
    console.log(afterClickingOnce, '22222222222222222222');
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

export function checkBorderColor(array, expectedColor): void {
    array.forEach(element => {
        expect(element.getCssValue('border-color')).toEqual(expectedColor);
    });
}




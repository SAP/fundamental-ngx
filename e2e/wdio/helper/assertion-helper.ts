import { webDriver } from '../driver/wdio';

export class AssertionHelper {
      checkRtlOrientation(element: string, index: number): void {
        expect(webDriver.getAttributeByName(element, 'dir', index)).toBe('rtl');
        expect(webDriver.getCSSPropertyByName(element, 'direction', index).value).toBe('rtl');
    }

      compareDropDownOptions(firstOptionValue: string, inputOptionValue: string): void {
        expect(firstOptionValue).toContain(inputOptionValue);
    }

      checkLtrOrientation(element: string, index: number): void {
        expect(webDriver.getAttributeByName(element, 'dir', index)).toBe('ltr');
        expect(webDriver.getCSSPropertyByName(element, 'direction', index).value).toBe('ltr');
    }

      checkIfDisabled(element, attribute: string, value: string): void {
        expect(webDriver.getAttributeByName(element, attribute)).toBe(value);
    }

     checkMarkingCheckbox(checkboxArray, sliceStart?: number, sliceEnd?: number): void {
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

     checkLabels(arraySelector: string, expectation: string[], sliceStart?: number, sliceEnd?: number): void {
        expect(webDriver.getTextArr(arraySelector, sliceStart, sliceEnd)).toEqual(expectation);
    }

    checkNotFocused(element: string, index: number = 0): void {
          expect($$(element)[index].isFocused()).toBe(false);
    }
}





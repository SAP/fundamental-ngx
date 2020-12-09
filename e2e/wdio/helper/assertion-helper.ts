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

}




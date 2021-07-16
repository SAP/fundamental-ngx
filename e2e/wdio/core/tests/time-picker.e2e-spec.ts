import { TimePickerPo } from '../pages/time-picker.po';
import {
    click,
    getText,
    isElementDisplayed,
    refreshPage,
    getNextElementText,
    clickNextElement,
    getValue,
    doesItExist,
    getElementClass,
    clearValue,
    setValue,
    sendKeys,
    getPreviousElementText,
    clickPreviousElement,
    waitForElDisplayed,
} from '../../driver/wdio';

describe('Time-picker component test', function () {
    const timePickerPage = new TimePickerPo();
    const { formExample, nullExample, localExample, compactExamle, defaultExample, disabledExample, formattingExample,
        setToNullButton, setValidTimeButton, inputGroup, timeInput, clockIcon, formatDropDown, timePicker, currentHour, currentMinute,
        hoursColumn, minutesColumn, thirdColumn, customTimePicker, amButton, pmButton, selectedTime, formatList, arFormat, bgFormat, bnFormat,
        usFormat, zhFormat, frFormat
    } = timePickerPage;

    beforeAll(() => {
        timePickerPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForElDisplayed(timePickerPage.title);
    }, 2);

    it('should check default example', () => {
        checkTimePickerFormat(defaultExample);
        checkChoosingTime(defaultExample);
        setValueByKeyboard(defaultExample);
    })

    it('should check formatting example', () => {
        checkTimePickerFormat(formattingExample);
        checkChoosingTime(formattingExample);
        setValueByKeyboard(formattingExample);
    })

    it('should check disabled time-pickers', () => {
        expect(getElementClass(disabledExample + inputGroup)).toContain('is-disabled', 'Input is not disabled');
        expect(getElementClass(formExample + inputGroup, 1)).toContain('is-disabled', 'Input is not disabled');
    })

    it('should check compact example', () => {
        checkTimePickerFormat(compactExamle);
        checkChoosingTime(compactExamle);
        setValueByKeyboard(compactExamle);
    })

    it('should check null validaty example', () => {
        checkTimePickerFormat(nullExample);
        click(setToNullButton);
        expect(getElementClass(nullExample + customTimePicker)).toContain('ng-invalid', 'Valus is valid');
        expect(getElementClass(nullExample + inputGroup)).toContain('is-error', 'No error message');
        click(setValidTimeButton);
        expect(getElementClass(nullExample + customTimePicker)).not.toContain('ng-invalid', 'Value is invalid');
        expect(getElementClass(nullExample + inputGroup)).not.toContain('is-error', 'Error message is present');
        checkChoosingTime(nullExample);
        setValueByKeyboard(nullExample);
    })

    it('should check form example', () => {
        checkTimePickerFormat(formExample);
        click(formExample + clockIcon);
        click(currentHour);
        click(thirdColumn);
        click(pmButton);
        expect(getText(selectedTime)).toEqual('12h 0m 0s');
        click(amButton);
        expect(getText(selectedTime)).toEqual('0h 0m 0s');
        click(formExample + clockIcon);
        checkChoosingTime(formExample);
        setValueByKeyboard(formExample);
    })

    it('should check local example', () => {
        checkTimePickerFormat(localExample);
        checkChoosingTime(localExample);
        setValueByKeyboard(localExample);
    })

    it('should check countries formats in local example', () => {
        const usInputValue = '3:30 PM';
        const usAmValue = 'AM';
        const usPmValue = 'PM';
        checkCountryFormat(usFormat, usInputValue, usAmValue, usPmValue);

        const frInputValue = '15:30';
        checkCountryFormat(frFormat, frInputValue);

        // skipped due to https://github.com/SAP/fundamental-ngx/issues/5751
        // const bgInputValue = '15:30 ч.';
        // checkCountryFormat(bgFormat, bgInputValue)

        const zhInputValue = '下午3:30';
        const zhAmValue = '上午';
        const zhPmValue = '下午';
        checkCountryFormat(zhFormat, zhInputValue, zhAmValue, zhPmValue);

        const bnInputValue = '৩:৩০ PM';
        const bnAmValue = 'AM';
        const bnPmValue = 'PM';
        checkCountryFormat(bnFormat, bnInputValue, bnAmValue, bnPmValue);

        const arInputValue = '٣:٣٠ م';
        const arAmValue = 'ص';
        const arPmValue = 'م';
        checkCountryFormat(arFormat, arInputValue, arAmValue, arPmValue);
    })

    it('should check RTL and LTR orientation', () => {
        timePickerPage.checkRtlSwitch();
    })

    it('should check visual regression for all examples', () => {
        timePickerPage.saveExampleBaselineScreenshot();
        expect(timePickerPage.compareWithBaseline()).toBeLessThan(5);
    })

    function checkCountryFormat(format: string, inputValue?: string, amValue?: string, pmValue?: string) {
        refreshPage();
        click(formatDropDown);
        expect(isElementDisplayed(formatList)).toBe(true);
        click(format);
        expect(getValue(localExample + timeInput)).toEqual(inputValue);
        click(localExample + clockIcon);
        if (format !== frFormat && format !== bgFormat) {
            click(thirdColumn);
            expect(getText(amButton)).toEqual(amValue);
            expect(getText(pmButton)).toEqual(pmValue);
        }
        if (format === frFormat || format === bgFormat) {
            expect(doesItExist(thirdColumn)).toBe(false);
        }
    }

    function checkChoosingTime(section: string) {
        click(section + clockIcon);
        expect(getElementClass(section + clockIcon)).toContain('is-expanded', 'Time picker is not expanded');
        expect(isElementDisplayed(timePicker)).toBe(true);
        const nextHour = getNextElementText(currentHour);
        clickNextElement(currentHour);
        click(minutesColumn);
        const prevMin = getPreviousElementText(currentMinute);
        clickPreviousElement(currentMinute);
        const inputValue = getValue(section + timeInput);
        if (section === formExample) {
            expect(inputValue).toEqual(`${nextHour}:${prevMin} AM`);
        }
        if (section === formattingExample) {
            expect(inputValue).toEqual(`${nextHour}:${prevMin}:00`);
        }
        if (section !== formattingExample && section !== formExample) {
            expect(inputValue).toEqual(`${nextHour}:${prevMin} PM`);
        }
        click(section + clockIcon);
    }

    function setValueByKeyboard(section: string) {
        const value = '12:34 AM';
        clearValue(section + timeInput);
        setValue(section + timeInput, value);
        sendKeys('Enter');

        if (section === formattingExample) {
            expect(getValue(section + timeInput)).toEqual('00:34:00');
        }
        if (section !== formattingExample) {
            expect(getValue(section + timeInput)).toEqual(`${value}`);
        }
    }

    function checkTimePickerFormat(section: string) {
        click(section + clockIcon);
        expect(doesItExist(hoursColumn)).toBe(true, 'Hours column does not exist');
        expect(doesItExist(minutesColumn)).toBe(true, 'Minutes column does not exist');
        if (section === formattingExample) {
            expect(getElementClass(thirdColumn)).not.toContain('fd-time__wrapper--meridian', 'It is not meridian column');
        }
        if (section !== formattingExample) {
            expect(getElementClass(thirdColumn)).toContain('fd-time__wrapper--meridian', 'It is not meridian column');
        }
        click(section + clockIcon);
    }

});



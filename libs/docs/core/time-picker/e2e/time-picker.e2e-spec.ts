import { TimePickerPo } from './time-picker.po';
import {
    browserIsSafari,
    clearValue,
    click,
    clickNextElement,
    clickPreviousElement,
    doesItExist,
    getElementClass,
    getNextElementText,
    getPreviousElementText,
    getText,
    getValue,
    isElementDisplayed,
    refreshPage,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Time-picker component test', () => {
    const timePickerPage = new TimePickerPo();
    const {
        formExample,
        nullExample,
        localExample,
        compactExamle,
        defaultExample,
        disabledExample,
        formattingExample,
        setToNullButton,
        setValidTimeButton,
        inputGroup,
        timeInput,
        clockIcon,
        formatDropDown,
        timePicker,
        currentHour,
        currentMinute,
        hoursColumn,
        minutesColumn,
        thirdColumn,
        customTimePicker,
        amButton,
        pmButton,
        selectedTime,
        formatList,
        arFormat,
        bgFormat,
        bnFormat,
        usFormat,
        frFormat
    } = timePickerPage;

    beforeAll(async () => {
        await timePickerPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(timePickerPage.root);
        await waitForElDisplayed(timePickerPage.title);
    }, 2);

    it('should check default example', async () => {
        await checkTimePickerFormat(defaultExample);
        await checkChoosingTime(defaultExample);
        await setValueByKeyboard(defaultExample);
    });

    it('should check formatting example', async () => {
        await checkTimePickerFormat(formattingExample);
        await checkChoosingTime(formattingExample);
        await setValueByKeyboard(formattingExample);
    });

    it('should check disabled time-pickers', async () => {
        await expect(await getElementClass(disabledExample + inputGroup)).toContain(
            'is-disabled',
            'Input is not disabled'
        );
        await expect(await getElementClass(formExample + inputGroup, 1)).toContain(
            'is-disabled',
            'Input is not disabled'
        );
    });

    it('should check compact example', async () => {
        await checkTimePickerFormat(compactExamle);
        await checkChoosingTime(compactExamle);
        await setValueByKeyboard(compactExamle);
    });

    it('should check null validaty example', async () => {
        await checkTimePickerFormat(nullExample);
        await click(setToNullButton);
        await expect(await getElementClass(nullExample + customTimePicker)).toContain('ng-invalid', 'Valus is valid');
        await expect(await getElementClass(nullExample + inputGroup)).toContain('is-error', 'No error message');
        await click(setValidTimeButton);
        await expect(await getElementClass(nullExample + customTimePicker)).not.toContain(
            'ng-invalid',
            'Value is invalid'
        );
        await expect(await getElementClass(nullExample + inputGroup)).not.toContain(
            'is-error',
            'Error message is present'
        );
        await checkChoosingTime(nullExample);
        await setValueByKeyboard(nullExample);
    });

    it('should check form example', async () => {
        await checkTimePickerFormat(formExample);
        await click(formExample + clockIcon);
        await click(currentHour);
        await click(thirdColumn);
        await click(pmButton);
        await expect((await getText(selectedTime)).trim()).toEqual('12:00 PM');
        await click(amButton);
        await expect((await getText(selectedTime)).trim()).toEqual('12:00 AM');
        await click(formExample + clockIcon);
        await checkChoosingTime(formExample);
        await setValueByKeyboard(formExample);
    });

    it('should check local example', async () => {
        await checkTimePickerFormat(localExample);
        await checkChoosingTime(localExample);
        await setValueByKeyboard(localExample);
    });

    it('should check countries formats in local example', async () => {
        const usInputValue = '3:30 PM';
        const usAmValue = 'AM';
        const usPmValue = 'PM';
        await checkCountryFormat(usFormat, usInputValue, usAmValue, usPmValue);

        const frInputValue = '15:30';
        await checkCountryFormat(frFormat, frInputValue);

        // skipped due to https://github.com/SAP/fundamental-ngx/issues/5751
        // const bgInputValue = '15:30 ч.';
        // checkCountryFormat(bgFormat, bgInputValue)

        // skipping because correct format is not applied on CI
        // const zhInputValue = '下午3:30';
        // const zhAmValue = '上午';
        // const zhPmValue = '下午';
        // checkCountryFormat(zhFormat, zhInputValue, zhAmValue, zhPmValue);

        const bnInputValue = '৩:৩০ PM';
        const bnAmValue = 'AM';
        const bnPmValue = 'PM';
        await checkCountryFormat(bnFormat, bnInputValue, bnAmValue, bnPmValue);

        // skip due to for unknown issue it fails in Safari
        if (!(await browserIsSafari())) {
            const arInputValue = '٣:٣٠ م';
            const arAmValue = 'ص';
            const arPmValue = 'م';
            await checkCountryFormat(arFormat, arInputValue, arAmValue, arPmValue);
        }
    });

    it('should check RTL and LTR orientation', async () => {
        await timePickerPage.checkRtlSwitch();
    });

    xit('should check visual regression for all examples', async () => {
        await timePickerPage.saveExampleBaselineScreenshot();
        await expect(await timePickerPage.compareWithBaseline()).toBeLessThan(5);
    });

    async function checkCountryFormat(
        format: string,
        inputValue: string,
        amValue?: string,
        pmValue?: string
    ): Promise<void> {
        await refreshPage();
        await click(formatDropDown);
        await expect(await isElementDisplayed(formatList)).toBe(true);
        await click(format);
        await expect((await getValue(localExample + timeInput)).trim()).toEqual(inputValue);
        await click(localExample + clockIcon);
        if (format !== frFormat && format !== bgFormat && amValue && pmValue) {
            await click(thirdColumn);
            await expect((await getText(amButton)).trim()).toEqual(amValue);
            await expect((await getText(pmButton)).trim()).toEqual(pmValue);
        }
        if (format === frFormat || format === bgFormat) {
            await expect(await doesItExist(thirdColumn)).toBe(false);
        }
    }

    async function checkChoosingTime(section: string): Promise<void> {
        await click(section + clockIcon);
        await expect(await getElementClass(section + clockIcon)).toContain(
            'is-expanded',
            'Time picker is not expanded'
        );
        await expect(await isElementDisplayed(timePicker)).toBe(true);
        const nextHour = (await getNextElementText(currentHour)).trim();
        await clickNextElement(currentHour);
        await click(minutesColumn);
        const prevMin = (await getPreviousElementText(currentMinute)).trim();
        await clickPreviousElement(currentMinute);
        const inputValue = await getValue(section + timeInput);
        if (section === formExample) {
            await expect(inputValue).toEqual(`${nextHour}:${prevMin} AM`);
        }
        if (section === formattingExample) {
            await expect(inputValue).toEqual(`${nextHour}:${prevMin}:00`);
        }
        if (section !== formattingExample && section !== formExample) {
            await expect(inputValue).toEqual(`${nextHour}:${prevMin} PM`);
        }
        await click(section + clockIcon);
    }

    async function setValueByKeyboard(section: string): Promise<void> {
        const value = '12:34 AM';
        await clearValue(section + timeInput);
        await setValue(section + timeInput, value);
        await sendKeys('Enter');

        if (section === formattingExample) {
            await expect(await getValue(section + timeInput)).toEqual(`${value}`);
        }
        if (section !== formattingExample) {
            await expect(await getValue(section + timeInput)).toEqual(`${value}`);
        }
    }

    async function checkTimePickerFormat(section: string): Promise<void> {
        await click(section + clockIcon);
        await expect(await doesItExist(hoursColumn)).toBe(true, 'Hours column does not exist');
        await expect(await doesItExist(minutesColumn)).toBe(true, 'Minutes column does not exist');
        if (section === formattingExample) {
            await expect(await getElementClass(thirdColumn)).not.toContain(
                'fd-time__wrapper--meridian',
                'It is not meridian column'
            );
        }
        if (section !== formattingExample) {
            await expect(await getElementClass(thirdColumn)).toContain(
                'fd-time__wrapper--meridian',
                'It is not meridian column'
            );
        }
        await click(section + clockIcon);
    }
});

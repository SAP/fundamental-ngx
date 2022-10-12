// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    browserIsFirefox,
    browserIsSafari,
    browserIsSafariorFF,
    click,
    elementArray,
    getElementArrayLength,
    getElementClass,
    getText,
    getValue,
    isElementClickable,
    isElementDisplayed,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { DateTimePicker } from './date-time-picker.po';
import { currentDay, date, date2, date3, date4, dates, i18n, testText, year2030 } from './date-time-picker-contents';

describe('Datetime picker suite', () => {
    const dateTimePickerPage = new DateTimePicker();
    const {
        datePickerButton,
        calendarExpanded,
        datePickerInput,
        selectYearButton,
        selectMonthButton,
        calendarYearsSection,
        disabledDateTimePickerButton,
        disabledDateTimePickerInput,
        okButton,
        filterCalendarValue,
        buttonSelectYearsRange,
        buttonFirstRangeYear,
        buttonFirstYear,
        buttonFirstMonth,
        selectedHours,
        selectedMinutes,
        navigationDownArrowButton,
        navigationUpArrowButton,
        timeColumn,
        period,
        cancelButton,
        buttonChange,
        optionButton,
        activeDay,
        getOptionById,
        datePickerGroup,
        buttonText,
        clickDayInCalendarButtonByValue
    } = new DateTimePicker();

    beforeAll(async () => {
        await dateTimePickerPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(dateTimePickerPage.root);
        await waitForElDisplayed(dateTimePickerPage.title);
    }, 1);

    it('verify in all the form factor user is able to see the date picker button and input field', async () => {
        const buttonsLength = await getElementArrayLength(datePickerButton);
        const inputsLength = await getElementArrayLength(datePickerInput);
        await expect(buttonsLength).toEqual(inputsLength);
        for (let i = 1; i < buttonsLength; i++) {
            await expect(await isElementDisplayed(datePickerButton, i)).toBe(
                true,
                'date picker button is not displayed when it should be'
            );
            await expect(await isElementDisplayed(datePickerInput, i)).toBe(
                true,
                'date picker input is not displayed when it should be'
            );
        }
    });

    it('verify calendar by clicking on the date time picker button', async () => {
        const activeButtonsLength = await getElementArrayLength(datePickerButton);
        for (let i = 1; i < activeButtonsLength; i++) {
            if (!(await getElementClass(datePickerGroup, i)).includes('is-disabled')) {
                await sendKeys(['Escape']);
                await scrollIntoView(datePickerButton, i);
                await click(datePickerButton, i);
                await expect(await isElementDisplayed(calendarExpanded)).toBe(
                    true,
                    'calendar is not expanded when it should be'
                );
            }
        }
    });

    it('verify from the day view on the calendar, clicking or tapping a year', async () => {
        await sendKeys(['Escape']);
        await click(datePickerButton, 1);
        await expect(await waitForElDisplayed(calendarExpanded)).toBe(
            true,
            'calendar is not expanded when it should be'
        );
        await scrollIntoView(selectYearButton);
        await click(selectYearButton);
        await expect(await waitForElDisplayed(calendarYearsSection)).toBe(
            true,
            'calendar years section is not displayed when it should be'
        );
        await click(await dateTimePickerPage.yearInCalendarByValue(year2030));
        await expect(await getText(selectYearButton)).toBe(year2030.toString());
    });

    it('verify by default today date is focused', async () => {
        const activeButtonsLength = await getElementArrayLength(datePickerButton);
        for (let i = 1; i < activeButtonsLength; i++) {
            if (!(await getElementClass(datePickerGroup, i)).includes('is-disabled')) {
                await sendKeys(['Escape']);
                await scrollIntoView(datePickerButton, i);
                await click(datePickerButton, i);
                await expect(await isElementDisplayed(calendarExpanded)).toBe(
                    true,
                    'calendar is not expanded when it should be'
                );
                await expect(await getText(activeDay + ' .fd-calendar__text')).toBe(new Date().getDate().toString());
            }
        }
    });

    it('verify on click on the input field', async () => {
        const activeInputsLength = await getElementArrayLength(datePickerInput);
        for (let i = 0; i < activeInputsLength; i++) {
            if (!(await getElementClass(datePickerGroup, i)).includes('is-disabled')) {
                await sendKeys(['Escape']);
                await scrollIntoView(datePickerInput, i);
                await setValue(datePickerInput, testText, i);
                await expect(await getValue(datePickerInput, i)).toBe(testText);
            }
        }
    });

    it('verify date input field have placeholder', async () => {
        const inputs = await elementArray(datePickerInput);
        for (let i = 0; i < inputs.length; i++) {
            if (!(await getElementClass(datePickerGroup, i)).includes('is-disabled')) {
                await expect(['', null]).not.toContain(await getValue(datePickerInput, i));
            }
        }
    });

    it(
        'verify the user can then choose the desired date from the calendar, and the time from the rotating wheel, ' +
            'For the time, it’s possible to select hours, minutes, and even seconds.',
        async () => {
            // skip due timeout error
            if (await browserIsSafariorFF()) {
                return;
            }
            await click(datePickerButton);
            await clickDayInCalendarButtonByValue(1);
            await selectHoursMinutesAndPeriod();
            await click(okButton);
            await expect(await getValue(datePickerInput)).toEqual(date);
        }
    );

    it('verify when the user selects cancel the action is aborted and the input field remains unchanged.', async () => {
        if (await browserIsSafari()) {
            // issue with timeouts
            return;
        }
        await click(datePickerButton);
        await clickDayInCalendarButtonByValue(1);
        await selectHoursMinutesAndPeriod();
        await click(cancelButton);
        await expect(await getValue(datePickerInput)).not.toEqual(date);
    });

    it('verify disabled date time picker', async () => {
        const disabledButtonsArr = await elementArray(disabledDateTimePickerButton);
        for (let i = 0; i < disabledButtonsArr.length; i++) {
            if (!(await getElementClass(datePickerGroup, i)).includes('is-disabled')) {
                await expect(await isElementClickable(disabledDateTimePickerButton, i)).toBe(
                    false,
                    'Date time picker button is not disabled when it should be'
                );
                await expect(await isElementClickable(disabledDateTimePickerInput, i)).toBe(
                    false,
                    'Date time input is not disabled when it should be'
                );
            }
        }
    });

    it('verify selecting a year range navigates back to the year view', async () => {
        const activeButtonsLength = await getElementArrayLength(datePickerButton);
        for (let i = 1; i < activeButtonsLength; i++) {
            if (!(await getElementClass(datePickerGroup, i)).includes('is-disabled')) {
                await click(datePickerButton, i);
                await click(selectYearButton);
                await click(buttonSelectYearsRange);
                await waitForElDisplayed(await filterCalendarValue('aggregated-years'));
                await click(buttonFirstRangeYear);
                await waitForElDisplayed(await filterCalendarValue('year'));
                await click(datePickerButton, i);
            }
        }
    });

    it('verify after the user selects a year, the view changes back to the day view', async () => {
        const activeButtonsLength = await getElementArrayLength(datePickerButton);
        for (let i = 1; i < activeButtonsLength; i++) {
            if (!(await getElementClass(datePickerGroup, i)).includes('is-disabled')) {
                await click(datePickerButton, i);
                await click(selectYearButton);
                await waitForElDisplayed(await filterCalendarValue('year'));
                await click(buttonFirstYear);
                await waitForElDisplayed(await filterCalendarValue('day'));
                await click(datePickerButton, i);
            }
        }
    });

    it('verify after the user selects a month, the view changes back to the day view', async () => {
        const activeButtonsLength = await getElementArrayLength(datePickerButton);
        for (let i = 1; i < activeButtonsLength; i++) {
            if (!(await getElementClass(datePickerGroup, i)).includes('is-disabled')) {
                await click(datePickerButton, i);
                await click(selectMonthButton);
                await waitForElDisplayed(await filterCalendarValue('month'));
                await click(buttonFirstMonth);
                await waitForElDisplayed(await filterCalendarValue('day'));
                await click(datePickerButton, i);
            }
        }
    });

    it('verify simple datetime picker has correct default date', async () => {
        if (await browserIsSafari()) {
            // issue with timeouts
            return;
        }
        await click(datePickerButton);
        await clickDayInCalendarButtonByValue(currentDay);
        await selectHoursMinutesAndPeriod();
        await click(okButton);
        await expect(await getValue(datePickerInput)).toEqual(date2);
    });

    it('verify programmatic change datetime picker has correct default date', async () => {
        if (await browserIsSafari()) {
            // issue with timeouts
            return;
        }
        await scrollIntoView(datePickerButton, 1);
        await click(datePickerButton, 1);
        await clickDayInCalendarButtonByValue(currentDay);
        await selectHoursMinutesAndPeriod();
        await click(okButton);
        await expect(await getValue(datePickerInput, 1)).toEqual(date2);
        await click(buttonChange);
        await expect(await getValue(datePickerInput, 1)).toEqual(date3);
    });

    it('verify null validity datetime picker has correct default date', async () => {
        if (await browserIsSafari()) {
            // issue with timeouts
            return;
        }
        await scrollIntoView(datePickerButton, 2);
        await click(datePickerButton, 2);
        await clickDayInCalendarButtonByValue(currentDay);
        await selectHoursMinutesAndPeriod();
        await click(okButton);
        await expect(await getValue(datePickerInput, 2)).toEqual(date2);
    });

    it('verify formatting datetime picker has correct default date', async () => {
        if (await browserIsSafari()) {
            // issue with timeouts
            return;
        }
        await scrollIntoView(datePickerButton, 3);
        await click(datePickerButton, 3);
        await clickDayInCalendarButtonByValue(currentDay);
        await selectHoursAndMinutes();
        await click(okButton);
        await expect(await getValue(datePickerInput, 3)).toEqual(date4);
    });

    it('verify date time picker in reactive form has correct default date', async () => {
        if (await browserIsSafari()) {
            // issue with timeouts
            return;
        }
        await scrollIntoView(datePickerButton, 5);
        await click(datePickerButton, 5);
        await clickDayInCalendarButtonByValue(currentDay);
        await selectHoursMinutesAndPeriod();
        await click(okButton);
        await expect(await getValue(datePickerInput, 5)).toEqual(date2);
    });

    it('verify date time picker i18n example', async () => {
        await scrollIntoView(datePickerButton, 7);
        for (let i = 0; i < i18n.length; i++) {
            // skipped due to https://github.com/SAP/fundamental-ngx/issues/6304
            if (!browserIsFirefox && i !== 4) {
                await click(optionButton);
                await click(await getOptionById(i18n[i]));
                await click(datePickerButton, 7);
                await waitForElDisplayed(calendarExpanded);
                await selectHoursAndMinutes();
                await click(okButton);
                await expect(await getValue(datePickerInput, 7)).toContain(dates[i]);
            }
        }
    });

    it('should check that OK buttons have correct text', async () => {
        const datepickerButtonsLength = await getElementArrayLength(datePickerButton);
        for (let i = 0; i < datepickerButtonsLength; i++) {
            if (!(await getElementClass(datePickerButton, i)).includes('disabled')) {
                await click(datePickerButton, i);
                await expect((await getText(okButton + buttonText)).trim()).toEqual('Ok');
                await click(okButton);
            }
        }
    });

    it('should check LTR and RTL orientation', async () => {
        await dateTimePickerPage.checkRtlSwitch();
    });

    async function selectHoursAndMinutes(hour: number = 11, minute: number = 1): Promise<void> {
        while ((await getText(selectedHours)) !== hour.toString()) {
            await click(navigationUpArrowButton);
        }
        await click(timeColumn, 1);
        while ((await getText(selectedMinutes)) !== minute.toString()) {
            await click(navigationDownArrowButton);
        }
    }

    async function selectHoursMinutesAndPeriod(hour: number = 11, minute: number = 1): Promise<void> {
        while ((await getText(selectedHours)) !== hour.toString()) {
            await click(navigationUpArrowButton);
        }
        await click(timeColumn, 1);
        while ((await getText(selectedMinutes)) !== minute.toString()) {
            await click(navigationDownArrowButton);
        }
        await click(timeColumn, 2);
        await click(period);
    }
});

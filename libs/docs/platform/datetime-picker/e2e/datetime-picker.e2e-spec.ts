import {
    browserIsSafari,
    click,
    elementArray,
    getCSSPropertyByName,
    getElementArrayLength,
    getElementClass,
    getElementPlaceholder,
    getText,
    getValue,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent,
    waitForUnclickable
} from '../../../../../e2e';
import { compactDate, currentDate, date, highlightedColor, text, year2030 } from './datetime-picker';
import { DateTimePicker } from './datetime-picker.po';

let dateTimePickerPage: DateTimePicker;
const {
    activeDateTimePickerButton,
    datePickerButton,
    datePickerInput,
    calendarExpanded,
    selectYearButton,
    calendarYearsSection,
    currentDay,
    changeDateTimeValueButton,
    compactDateTimePickerInput,
    compactDateTimePickerButton,
    activeDateTimePickerInput,
    disabledDateTimePickerInput,
    disabledDateTimePickerButton,
    cancelButton,
    okButton,
    selectedHours,
    selectedMinutes,
    navigationUpArrowButton,
    period,
    navigationDownArrowButton,
    timeColumn,
    topPage,
    bottomPage,
    firstYearButton,
    firstMonthButton,
    selectMonthButton,
    disabledFunctionExample,
    calendarContainer,
    buttonText,
    inputGroup
} = new DateTimePicker();

describe('Datetime picker suite', () => {
    dateTimePickerPage = new DateTimePicker();

    beforeAll(async () => {
        await dateTimePickerPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(dateTimePickerPage.root);
        await waitForElDisplayed(dateTimePickerPage.title);
    }, 2);

    it('Verify in all the form factor user is able to see the date picker button and input field ', async () => {
        const buttons = await elementArray(datePickerButton);
        const inputs = await elementArray(datePickerInput);
        await expect(buttons.length).toEqual(inputs.length);
        for (let i = 1; i < buttons.length; i++) {
            await waitForElDisplayed(datePickerButton, i);
            await waitForElDisplayed(datePickerInput, i);
        }
    });

    it('Verify on click on the date picker button', async () => {
        const activeButtons = await elementArray(activeDateTimePickerButton);
        for (let i = 1; i < activeButtons.length; i++) {
            if (!(await getElementClass(activeDateTimePickerButton, i)).includes('is-disabled')) {
                await sendKeys(['Escape']);
                await scrollIntoView(activeDateTimePickerButton, i);
                await click(activeDateTimePickerButton, i);
                await waitForElDisplayed(calendarExpanded);
            }
        }
    });

    it('Verify From the day view on the calendar, clicking or tapping a year', async () => {
        await sendKeys(['Escape']);
        await scrollIntoView(bottomPage);
        await click(activeDateTimePickerButton, 1);
        await expect(await waitForElDisplayed(calendarExpanded)).toBe(true);
        await scrollIntoView(topPage);
        await scrollIntoView(selectYearButton);
        await click(selectYearButton);
        await expect(await waitForElDisplayed(calendarYearsSection)).toBe(true);
        await click(await dateTimePickerPage.yearInCalendarByValue(year2030));
        await expect(await getText(selectYearButton)).toBe(year2030.toString());
    });

    it('Verify by default today date is focused', async () => {
        const activeButtons = await elementArray(activeDateTimePickerButton);
        for (let i = 0; i < activeButtons.length; i++) {
            if (i !== 2 && i !== 7 && i !== 11) {
                // other default days in these calendars
                if (!(await getElementClass(activeDateTimePickerButton, i)).includes('is-disabled')) {
                    await sendKeys(['Escape']);
                    await scrollIntoView(activeDateTimePickerButton, i);
                    await click(activeDateTimePickerButton, i);
                    await waitForElDisplayed(calendarExpanded);
                    await expect(await getText(currentDay, 0)).toContain(new Date().getDate().toString());
                }
            }
        }
    });

    it('Verify on click on the input field ', async () => {
        const activeInputs = await elementArray(activeDateTimePickerInput);
        for (let i = 0; i < activeInputs.length; i++) {
            await sendKeys(['Escape']);
            await scrollIntoView(activeDateTimePickerInput, i);
            await setValue(activeDateTimePickerInput, text, i);
            await expect(await getValue(activeDateTimePickerInput, i)).toBe(text);
        }
    });

    it('Verify date input field have placeholder', async () => {
        const inputs = await elementArray(datePickerInput);
        for (let i = 0; i < inputs.length; i++) {
            await expect(['', null]).not.toContain(await getElementPlaceholder(datePickerInput, i));
        }
    });

    it('should check LTR and RTL orientation', async () => {
        await dateTimePickerPage.checkRtlSwitch();
    });

    it(
        'Verify The user can then choose the desired date from the calendar, and the time from the rotating wheel, ' +
            'For the time, it’s possible to select hours, minutes, and even seconds.',
        async () => {
            if (await browserIsSafari()) {
                // infinite loop on safari
                return;
            }
            await click(datePickerButton);
            await click(await dateTimePickerPage.dayInCalendarButtonByValue('1'));
            await selectHoursAndMinutes();
            await click(okButton);
            await expect(await getValue(datePickerInput)).toEqual(date);
        }
    );

    it('verify selected date is showing in blue background', async () => {
        await click(activeDateTimePickerButton, 1);
        await click(await dateTimePickerPage.dayInCalendarButtonByValue('1'));
        await click(okButton);
        await click(activeDateTimePickerButton, 1);
        await expect(highlightedColor).toContain(
            (
                await getCSSPropertyByName(await dateTimePickerPage.dayInCalendarButtonByValue('1'), 'background-color')
            ).value
        );
    });

    it('Verify When the user selects cancel the action is aborted and the input field remains unchanged.', async () => {
        if (await browserIsSafari()) {
            // infinite loop on safari
            return;
        }
        await click(activeDateTimePickerButton);
        await click(await dateTimePickerPage.dayInCalendarButtonByValue('1'));
        await selectHoursAndMinutes();
        await click(cancelButton);
        await expect(await getValue(datePickerInput)).not.toEqual(date);
    });

    it('Verify disabled date time picker', async () => {
        const disabledButtonsArr = await elementArray(disabledDateTimePickerButton);
        for (let i = 0; i < disabledButtonsArr.length; i++) {
            await waitForUnclickable(disabledDateTimePickerButton, i);
            await waitForUnclickable(disabledDateTimePickerInput, i);
        }
    });

    it('Verify compact date time picker', async () => {
        const currentText = await getText(compactDateTimePickerInput);
        await scrollIntoView(compactDateTimePickerButton);
        await click(changeDateTimeValueButton);
        await expect(currentText).not.toBe(await getValue(compactDateTimePickerInput));
        await expect(await getValue(compactDateTimePickerInput)).toBe(compactDate);
    });

    it('Verify date time picker with disabled functions', async () => {
        await scrollIntoView(disabledFunctionExample + datePickerButton);
        await click(disabledFunctionExample + datePickerButton);
        await waitForElDisplayed(calendarContainer);
        const index = await dateTimePickerPage.getCurrentDayIndex();
        if (index) {
            await waitForUnclickable(
                await dateTimePickerPage.dayInDisabledFunctionsCalendarByIndex((index - 1).toString())
            );
        }
        if (index === 0) {
            // can't click previous day when today's day is index 0
            return;
        }
    });

    it('verify after the user selects a year, the view changes to the day view. The time remains the same. ', async () => {
        if (await browserIsSafari()) {
            // infinite loop on safari
            return;
        }
        await click(datePickerButton, 1);
        await selectHoursAndMinutes();
        await click(okButton);
        await scrollIntoView(bottomPage);
        await click(datePickerButton, 1);
        await scrollIntoView(topPage);
        await scrollIntoView(selectYearButton);
        await click(selectYearButton);
        await waitForElDisplayed(await dateTimePickerPage.filterCalendarValue('year'));
        await click(firstYearButton);
        await waitForElDisplayed(await dateTimePickerPage.filterCalendarValue('day'));
        await scrollIntoView(datePickerButton, 2);
        await click(okButton);
        await expect(await getValue(datePickerInput, 1)).toEqual(currentDate);
    });

    it('Verify After the user clicks or taps a month, the view changes to the day view. The time remains the same.', async () => {
        if (await browserIsSafari()) {
            // infinite loop on safari
            return;
        }
        await click(datePickerButton);
        await click(await dateTimePickerPage.dayInCalendarButtonByValue('1'));
        await selectHoursAndMinutes();
        await click(okButton);
        await scrollIntoView(bottomPage);
        await click(datePickerButton);
        await scrollIntoView(topPage);
        await click(selectMonthButton);
        await waitForElDisplayed(await dateTimePickerPage.filterCalendarValue('month'));
        await click(firstMonthButton);
        await waitForElDisplayed(await dateTimePickerPage.filterCalendarValue('day'));
        await click(okButton);
        await expect(await getValue(datePickerInput)).toEqual(date);
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

    // skipped due to https://github.com/SAP/fundamental-ngx/issues/7112
    xit('should check that date-time picker does not have error if it contains valid value', async () => {
        await scrollIntoView(inputGroup, 8);
        let validDate;
        const currDate = new Date();
        const currMonth = currDate.getMonth() + 1;
        const currDay = currDate.getDate();
        const currYear = currDate.getFullYear();
        let currMinute = currDate.getMinutes().toString();
        if (currMinute === '0') {
            currMinute = '00';
            // eslint-disable-next-line radix
        } else if (parseInt(currMinute) < 10) {
            currMinute = '0' + currMinute;
        }
        const currentHour = currDate.toLocaleString('en-US', { timeZone: 'UTC', hour: 'numeric', hour12: true });

        if (currentHour[1] === ' ') {
            validDate = `${currMonth}/${currDay}/${currYear}, ${currentHour[0]}:${currMinute} ${currentHour.slice(
                2,
                4
            )}`;
        }
        if (currentHour[1] !== ' ') {
            validDate = `${currMonth}/${currDay}/${currYear}, ${currentHour.slice(
                0,
                2
            )}:${currMinute} ${currentHour.slice(3, 5)}`;
        }

        await expect(await getValue(datePickerInput, 8)).toBe(validDate);
        await expect(await getElementClass(inputGroup, 8)).not.toContain('error');
    });
});

async function selectHoursAndMinutes(hour: number = 1, minute: number = 1): Promise<void> {
    while ((await getText(selectedHours)).trim() !== hour.toString()) {
        await scrollIntoView(activeDateTimePickerButton, 1);
        await click(navigationUpArrowButton);
    }
    await click(timeColumn, 1);
    while ((await getText(selectedMinutes)) !== minute.toString()) {
        await click(navigationDownArrowButton);
    }
    await click(timeColumn, 2);
    await click(period);
}

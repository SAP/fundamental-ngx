import {
    browserIsFirefox,
    click,
    elementArray,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getText,
    getValue, isElementClickable,
    isElementDisplayed,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';
import { DateTimePicker } from '../pages/date-time-picker.po';
import {
    year2030,
    testText,
    date,
    date2,
    date3,
    date4,
    dates,
    i18n,
    currentDay,
} from '../fixtures/appData/date-time-picker-contents';

describe('Datetime picker suite', function () {
    const dateTimePickerPage = new DateTimePicker();
    const {
        datePickerButton, calendarExpanded,
        datePickerInput, topPage, selectYearButton, selectMonthButton, calendarYearsSection, disabledDateTimePickerButton,
        disabledDateTimePickerInput, okButton, filterCalendarValue, buttonSelectYearsRange, buttonFirstRangeYear, buttonFirstYear,
        buttonFirstMonth, selectedHours, selectedMinutes, navigationDownArrowButton, navigationUpArrowButton, timeItem, period,
        cancelButton, buttonChange, optionButton, activeDay, dayInCalendarButtonByValue, getOptionById, datePickerGroup, calendarItem
    } = new DateTimePicker();

    beforeAll(() => {
        dateTimePickerPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(datePickerInput);
    }, 1);

    it('verify in all the form factor user is able to see the date picker button and input field', () => {
        const buttonsLength = getElementArrayLength(datePickerButton);
        const inputsLength = getElementArrayLength(datePickerInput);
        expect(buttonsLength).toEqual(inputsLength);
        for (let i = 1; i < buttonsLength; i++) {
            expect(isElementDisplayed(datePickerButton, i)).toBe(true, 'date picker button is not displayed when it should be');
            expect(isElementDisplayed(datePickerInput, i)).toBe(true, 'date picker input is not displayed when it should be');
        }
    });

    it('verify calendar by clicking on the date time picker button', () => {
        const activeButtonsLength = getElementArrayLength(datePickerButton);
        for (let i = 1; i < activeButtonsLength; i++) {
            if (!getElementClass(datePickerGroup, i).includes('is-disabled')) {
                sendKeys(['Escape']);
                scrollIntoView(datePickerButton, i);
                click(datePickerButton, i);
                expect(isElementDisplayed(calendarExpanded)).toBe(true, 'calendar is not expanded when it should be');
            }
        }
    });

    it('verify from the day view on the calendar, clicking or tapping a year', () => {
        sendKeys(['Escape']);
        click(datePickerButton, 1);
        expect(waitForElDisplayed(calendarExpanded)).toBe(true, 'calendar is not expanded when it should be');
        scrollIntoView(topPage);
        scrollIntoView(selectYearButton);
        click(selectYearButton);
        expect(waitForElDisplayed(calendarYearsSection)).toBe(true, 'calendar years section is not displayed when it should be');
        click(dateTimePickerPage.yearInCalendarByValue(year2030));
        expect(getText(selectYearButton)).toBe(year2030.toString());
    });

    it('verify by default today date is focused', () => {
        const activeButtonsLength = getElementArrayLength(datePickerButton);
        for (let i = 1; i < activeButtonsLength; i++) {
            if (!getElementClass(datePickerGroup, i).includes('is-disabled')) {
                sendKeys(['Escape']);
                scrollIntoView(datePickerButton, i);
                click(datePickerButton, i);
                expect(isElementDisplayed(calendarExpanded)).toBe(true, 'calendar is not expanded when it should be');
                expect(getText(activeDay)).toBe(new Date().getDate().toString());
            }
        }
    });

    it('verify on click on the input field', () => {
        const activeInputsLength = getElementArrayLength(datePickerInput);
        for (let i = 0; i < activeInputsLength; i++) {
            if (!getElementClass(datePickerGroup, i).includes('is-disabled')) {
                sendKeys(['Escape']);
                scrollIntoView(datePickerInput, i);
                setValue(datePickerInput, testText, i);
                expect(getValue(datePickerInput, i)).toBe(testText);
            }
        }
    });

    it('verify date input field have placeholder', () => {
        const inputs = elementArray(datePickerInput);
        for (let i = 0; i < inputs.length; i++) {
            if (!getElementClass(datePickerGroup, i).includes('is-disabled')) {
                expect(['', null]).not.toContain(getValue(datePickerInput, i));
            }
        }
    });

    it('verify the user can then choose the desired date from the calendar, and the time from the rotating wheel, ' +
        'For the time, it’s possible to select hours, minutes, and even seconds.', () => {
            click(datePickerButton);
            click(dateTimePickerPage.dayInCalendarButtonByValue('1'));
            selectHoursMinutesAndPeriod();
            click(okButton);
            expect(getValue(datePickerInput))
                .toEqual(date);
        });

    it('verify when the user selects cancel the action is aborted and the input field remains unchanged.', () => {
        click(datePickerButton);
        click(dateTimePickerPage.dayInCalendarButtonByValue('1'));
        selectHoursMinutesAndPeriod();
        click(cancelButton);
        expect(getValue(datePickerInput))
            .not.toEqual(date);
    });

    it('verify disabled date time picker', () => {
        const disabledButtonsArr = elementArray(disabledDateTimePickerButton);
        for (let i = 0; i < disabledButtonsArr.length; i++) {
            if (!getElementClass(datePickerGroup, i).includes('is-disabled')) {
                expect(isElementClickable(disabledDateTimePickerButton, i)).toBe(false, 'Date time picker button is not disabled when it should be');
                expect(isElementClickable(disabledDateTimePickerInput, i)).toBe(false, 'Date time input is not disabled when it should be');
            }
        }
    });

    it('verify selecting a year range navigates back to the year view', () => {
        const activeButtonsLength = getElementArrayLength(datePickerButton);
        for (let i = 1; i < activeButtonsLength; i++) {
            if (!getElementClass(datePickerGroup, i).includes('is-disabled')) {
                click(datePickerButton, i);
                click(selectYearButton);
                click(buttonSelectYearsRange);
                waitForElDisplayed(filterCalendarValue('aggregated-year'));
                click(buttonFirstRangeYear);
                waitForElDisplayed(filterCalendarValue('year'));
                click(datePickerButton, i);
            }
        }
    });

    it('verify after the user selects a year, the view changes back to the day view', () => {
        const activeButtonsLength = getElementArrayLength(datePickerButton);
        for (let i = 1; i < activeButtonsLength; i++) {
            if (!getElementClass(datePickerGroup, i).includes('is-disabled')) {
                click(datePickerButton, i);
                click(selectYearButton);
                waitForElDisplayed(filterCalendarValue('year'));
                click(buttonFirstYear);
                waitForElDisplayed(filterCalendarValue('day'));
                click(datePickerButton, i);
            }
        }
    });

    it('verify after the user selects a month, the view changes back to the day view', () => {
        const activeButtonsLength = getElementArrayLength(datePickerButton);
        for (let i = 1; i < activeButtonsLength; i++) {
            if (!getElementClass(datePickerGroup, i).includes('is-disabled')) {
                click(datePickerButton, i);
                click(selectMonthButton);
                waitForElDisplayed(filterCalendarValue('month'));
                click(buttonFirstMonth);
                waitForElDisplayed(filterCalendarValue('day'));
                click(datePickerButton, i);
            }
        }
    });

    it('verify simple datetime picker has correct default date', () => {
        click(datePickerButton);
        click(dayInCalendarButtonByValue(currentDay.toString()));
        selectHoursMinutesAndPeriod();
        click(okButton);
        expect(getValue(datePickerInput))
            .toEqual(date2);
    });

    it('verify programmatic change datetime picker has correct default date', () => {
        scrollIntoView(datePickerButton, 1);
        click(datePickerButton, 1);
        click(dayInCalendarButtonByValue(currentDay.toString()));
        selectHoursMinutesAndPeriod();
        click(okButton);
        expect(getValue(datePickerInput, 1))
            .toEqual(date2);
        click(buttonChange);
        expect(getValue(datePickerInput, 1))
            .toEqual(date3);
    });

    it('verify null validity datetime picker has correct default date', () => {
        scrollIntoView(datePickerButton, 2);
        click(datePickerButton, 2);
        click(dayInCalendarButtonByValue(currentDay.toString()));
        selectHoursMinutesAndPeriod();
        click(okButton);
        expect(getValue(datePickerInput, 2))
            .toEqual(date2);
    });

    it('verify formatting datetime picker has correct default date', () => {
        scrollIntoView(datePickerButton, 3);
        click(datePickerButton, 3);
        click(dayInCalendarButtonByValue(currentDay.toString()));
        selectHoursAndMinutes();
        click(okButton);
        expect(getValue(datePickerInput, 3))
            .toEqual(date4);
    });

    it('verify date time picker in reactive form has correct default date', () => {
        scrollIntoView(datePickerButton, 5);
        click(datePickerButton, 5);
        click(dayInCalendarButtonByValue(currentDay.toString()));
        selectHoursMinutesAndPeriod();
        click(okButton);
        expect(getValue(datePickerInput, 5))
            .toEqual(date2);
    });

    it('verify date time picker i18n example', () => {
        scrollIntoView(datePickerButton, 7);
        for (let i = 0; i < i18n.length; i++) {
            // skipped due to https://github.com/SAP/fundamental-ngx/issues/6304
            if (!browserIsFirefox && i !== 4) {
                click(optionButton);
                click(getOptionById(i18n[i]));
                click(datePickerButton, 7);
                waitForElDisplayed(calendarExpanded);
                scrollIntoView(dayInCalendarButtonByValue(currentDay.toString()));
                selectHoursAndMinutes();
                click(okButton);
                expect(getValue(datePickerInput, 7))
                    .toContain(dates[i]);
            }
        }
    });

    it('should check LTR and RTL orientation', () => {
        dateTimePickerPage.checkRtlSwitch();
    });

    function selectHoursAndMinutes(hour: number = 11, minute: number = 1): void {
        while (getText(selectedHours) !== hour.toString()) {
            click(navigationUpArrowButton);
        }
        click(timeItem, 1);
        while (getText(selectedMinutes) !== minute.toString()) {
            click(navigationDownArrowButton);
        }
    }

    function selectHoursMinutesAndPeriod(hour: number = 11, minute: number = 1): void {
        while (getText(selectedHours) !== hour.toString()) {
            click(navigationUpArrowButton);
        }
        click(timeItem, 1);
        while (getText(selectedMinutes) !== minute.toString()) {
            click(navigationDownArrowButton);
        }
        click(timeItem, 2);
        click(period);
    }
});

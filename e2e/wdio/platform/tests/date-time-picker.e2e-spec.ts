import {
    click,
    elementArray, getAttributeByName, getCSSPropertyByName, getText, getValue,
    refreshPage, scrollIntoView, sendKeys, setValue,
    waitForElDisplayed, waitForPresent, waitForUnclickable
} from '../../driver/wdio';
import dateTimePickerTestData from '../fixtures/testData/date-time-picker';
import datePickerTestData from '../fixtures/testData/date-picker';
import { DateTimePicker } from '../pages/date-time-picker.po';

let dateTimePickerPage: DateTimePicker;
const {
    activeButtonDateTimePicker, buttonDatePicker, inputDatePicker, calendarExpanded, buttonSelectYear,
    calendarYearsSection, currentDay, currentYear, changeDateTimeValueButton, compactInputDateTimePicker, compactButtonDateTimePicker,
    activeInputDateTimePicker, disabledInputDateTimePicker, disabledButtonDateTimePicker, buttonCancel,
    buttonOk, selectedHours, selectedMinutes, buttonNavigationUpArrow, period,
    buttonNavigationDownArrow, timeItem, topPage, bottomPage, buttonFirstYear, buttonFirstMonth, buttonSelectMonth
} = new DateTimePicker();

describe('Datetime picker suite', function() {
    dateTimePickerPage = new DateTimePicker();

    beforeAll(() => {
        dateTimePickerPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(inputDatePicker);
    }, 1);

    it('Verify in all the form factor user is able to see the date picker button and input field ', () => {
        const buttons = elementArray(buttonDatePicker);
        const inputs = elementArray(inputDatePicker);
        expect(buttons.length).toEqual(inputs.length);
        for (let i = 1; i < buttons.length; i++) {
            waitForElDisplayed(buttonDatePicker);
            waitForElDisplayed(inputDatePicker);
        }
    });

    it('Verify on click on the date picker button', () => {
        const activeButtons = elementArray(activeButtonDateTimePicker);
        for (let i = 1; i < activeButtons.length; i++) {
            sendKeys(['Escape']);
            scrollIntoView(activeButtonDateTimePicker, i);
            click(activeButtonDateTimePicker, i);
            waitForElDisplayed(calendarExpanded);
        }
    });

    it('Verify From the day view on the calendar, clicking or tapping a year', () => {
        sendKeys(['Escape']);
        scrollIntoView(bottomPage);
        click(activeButtonDateTimePicker, 1);
        expect(waitForElDisplayed(calendarExpanded)).toBe(true);
        scrollIntoView(topPage);
        scrollIntoView(buttonSelectYear);
        click(buttonSelectYear);
        expect(waitForElDisplayed(calendarYearsSection)).toBe(true);
        click(dateTimePickerPage.yearInCalendarByValue(dateTimePickerTestData.year2030));
        expect(getText(currentYear)).toBe(dateTimePickerTestData.year2030.toString());
    });

    it('Verify by default today date is focused', () => {
        const activeButtons = elementArray(activeButtonDateTimePicker);
        for (let i = 0; i < activeButtons.length; i++) {
            if (i !== 2 && i !== 6) {  // other default days in these calendars
                sendKeys(['Escape']);
                scrollIntoView(activeButtonDateTimePicker, i);
                click(activeButtonDateTimePicker, i);
                waitForElDisplayed(calendarExpanded);
                expect(getText(currentDay, 0)).toBe(new Date().getDate().toString());
            }
        }
    });

    it('Verify on click on the input field ', () => {
        const activeInputs = elementArray(activeInputDateTimePicker);
        for (let i = 0; i < activeInputs.length; i++) {
            sendKeys(['Escape']);
            scrollIntoView(activeInputDateTimePicker, i);
            setValue(activeInputDateTimePicker, datePickerTestData.text, i);
            expect(getValue(activeInputDateTimePicker, i)).toBe(datePickerTestData.text);
        }
    });

    it('Verify date input field have placeholder', () => {
        const inputs = elementArray(inputDatePicker);
        for (let i = 0; i < inputs.length; i++) {
            expect(getAttributeByName(inputDatePicker, 'placeholder', i)).toBeDefined();
        }
    });

    it('should check LTR and RTL orientation', () => {
        dateTimePickerPage.checkRtlSwitch();
    });

    it('Verify The user can then choose the desired date from the calendar, and the time from the rotating wheel, ' +
        'For the time, it’s possible to select hours, minutes, and even seconds.', () => {
        click(activeButtonDateTimePicker);
        click(dateTimePickerPage.dayInCalendarButtonByValue('1'));
        selectHoursAndMinutes();
        click(buttonOk);
        expect(getAttributeByName(activeInputDateTimePicker, 'ng-reflect-model'))
            .toEqual(dateTimePickerTestData.date);
    });

    it('verify selected date is showing in blue background', () => {
        click(activeButtonDateTimePicker, 1);
        click(dateTimePickerPage.dayInCalendarButtonByValue('1'));
        click(buttonOk);
        click(activeButtonDateTimePicker, 1);
        expect(dateTimePickerTestData.highlightedColor)
            .toContain(getCSSPropertyByName(dateTimePickerPage.dayInCalendarButtonByValue('1'), 'background-color').value as string);
    });

    it('Verify When the user selects cancel the action is aborted and the input field remains unchanged.', () => {
        click(activeButtonDateTimePicker);
        click(dateTimePickerPage.dayInCalendarButtonByValue('1'));
        selectHoursAndMinutes();
        click(buttonCancel);
        expect(getAttributeByName(activeInputDateTimePicker, 'ng-reflect-model'))
            .not.toEqual(dateTimePickerTestData.date);
    });

    it('Verify disabled date time picker', () => {
        const disabledButtonsArr = elementArray(disabledButtonDateTimePicker);
        for (let i = 0; i < disabledButtonsArr.length; i++) {
            waitForUnclickable(disabledButtonDateTimePicker, i);
            waitForUnclickable(disabledInputDateTimePicker, i);
        }
    });

    it('Verify compact date time picker', () => {
        const currentText = getText(compactInputDateTimePicker);
        scrollIntoView(compactButtonDateTimePicker);
        click(changeDateTimeValueButton);
        expect(currentText).not.toBe(getValue(compactInputDateTimePicker));
        expect(getValue(compactInputDateTimePicker)).toBe(dateTimePickerTestData.compactDate);
    });

    it('Verify date time picker with disabled functions', () => {
        const activeButtonsArr = elementArray(activeButtonDateTimePicker);
        scrollIntoView(activeButtonDateTimePicker, activeButtonsArr.length - 1);
        click(activeButtonDateTimePicker, activeButtonsArr.length - 1);
        const currentIndex = getAttributeByName(currentDay, 'id').split('-')[5];
        waitForUnclickable(dateTimePickerPage.dayInDisabledFunctionsCalendarByIndex((currentIndex - 1).toString()));
    });

    it('verify after the user selects a year, the view changes to the day view. The time remains the same. ', () => {
        click(activeButtonDateTimePicker, 1);
        selectHoursAndMinutes();
        click(buttonOk);
        scrollIntoView(bottomPage);
        click(activeButtonDateTimePicker, 1);
        scrollIntoView(topPage);
        scrollIntoView(buttonSelectYear);
        click(buttonSelectYear);
        waitForElDisplayed(dateTimePickerPage.filterCaledarValue('year'));
        click(buttonFirstYear);
        waitForElDisplayed(dateTimePickerPage.filterCaledarValue('day'));
        scrollIntoView(activeButtonDateTimePicker, 2);
        click(buttonOk);
        expect(getAttributeByName(activeInputDateTimePicker, 'ng-reflect-model', 1))
            .toEqual(dateTimePickerTestData.currentDate);
    });

    it('Verify After the user clicks or taps a month, the view changes to the day view. The time remains the same.', () => {
        click(activeButtonDateTimePicker);
        click(dateTimePickerPage.dayInCalendarButtonByValue('1'));
        selectHoursAndMinutes();
        click(buttonOk);
        scrollIntoView(bottomPage);
        click(activeButtonDateTimePicker);
        scrollIntoView(topPage);
        click(buttonSelectMonth);
        waitForElDisplayed(dateTimePickerPage.filterCaledarValue('month'));
        click(buttonFirstMonth);
        waitForElDisplayed(dateTimePickerPage.filterCaledarValue('day'));
        click(buttonOk);
        expect(getAttributeByName(activeInputDateTimePicker, 'ng-reflect-model'))
            .toEqual(dateTimePickerTestData.date);
    });

});

function selectHoursAndMinutes(hour: number = 1, minute: number = 1): void {
    while (getText(selectedHours) !== hour.toString()) {
        scrollIntoView(activeButtonDateTimePicker, 1);
        click(buttonNavigationUpArrow);
    }
    click(timeItem, 1);
    while (getText(selectedMinutes) !== minute.toString()) {
        click(buttonNavigationDownArrow);
    }
    click(timeItem, 2);
    click(period);
}


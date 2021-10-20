import {
    click,
    elementArray,
    getCSSPropertyByName,
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
} from '../../driver/wdio';
import {
    compactDate,
    currentDate,
    date,
    highlightedColor,
    text,
    year2030
} from '../fixtures/testData/date-time-picker';
import { DateTimePicker } from '../pages/date-time-picker.po';

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
    timeItem,
    topPage,
    bottomPage,
    firstYearButton,
    firstMonthButton,
    selectMonthButton,
    disabledFunctionExample,
    calendarContainer
} = new DateTimePicker();

describe('Datetime picker suite', () => {
    dateTimePickerPage = new DateTimePicker();

    beforeAll(() => {
        dateTimePickerPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(datePickerInput);
    }, 1);

    it('Verify in all the form factor user is able to see the date picker button and input field ', () => {
        const buttons = elementArray(datePickerButton);
        const inputs = elementArray(datePickerInput);
        expect(buttons.length).toEqual(inputs.length);
        for (let i = 1; i < buttons.length; i++) {
            waitForElDisplayed(datePickerButton, i);
            waitForElDisplayed(datePickerInput, i);
        }
    });

    it('Verify on click on the date picker button', () => {
        const activeButtons = elementArray(activeDateTimePickerButton);
        for (let i = 1; i < activeButtons.length; i++) {
            if (!getElementClass(activeDateTimePickerButton, i).includes('is-disabled')) {
                sendKeys(['Escape']);
                scrollIntoView(activeDateTimePickerButton, i);
                click(activeDateTimePickerButton, i);
                waitForElDisplayed(calendarExpanded);
            }
        }
    });

    it('Verify From the day view on the calendar, clicking or tapping a year', () => {
        sendKeys(['Escape']);
        scrollIntoView(bottomPage);
        click(activeDateTimePickerButton, 1);
        expect(waitForElDisplayed(calendarExpanded)).toBe(true);
        scrollIntoView(topPage);
        scrollIntoView(selectYearButton);
        click(selectYearButton);
        expect(waitForElDisplayed(calendarYearsSection)).toBe(true);
        click(dateTimePickerPage.yearInCalendarByValue(year2030));
        expect(getText(selectYearButton)).toBe(year2030.toString());
    });

    it('Verify by default today date is focused', () => {
        const activeButtons = elementArray(activeDateTimePickerButton);
        for (let i = 0; i < activeButtons.length; i++) {
            if (i !== 2 && i !== 7) {
                // other default days in these calendars
                if (!getElementClass(activeDateTimePickerButton, i).includes('is-disabled')) {
                    sendKeys(['Escape']);
                    scrollIntoView(activeDateTimePickerButton, i);
                    click(activeDateTimePickerButton, i);
                    waitForElDisplayed(calendarExpanded);
                    expect(getText(currentDay, 0)).toBe(new Date().getDate().toString());
                }
            }
        }
    });

    it('Verify on click on the input field ', () => {
        const activeInputs = elementArray(activeDateTimePickerInput);
        for (let i = 0; i < activeInputs.length; i++) {
            sendKeys(['Escape']);
            scrollIntoView(activeDateTimePickerInput, i);
            setValue(activeDateTimePickerInput, text, i);
            expect(getValue(activeDateTimePickerInput, i)).toBe(text);
        }
    });

    it('Verify date input field have placeholder', () => {
        const inputs = elementArray(datePickerInput);
        for (let i = 0; i < inputs.length; i++) {
            expect(['', null]).not.toContain(getElementPlaceholder(datePickerInput, i));
        }
    });

    it('should check LTR and RTL orientation', () => {
        dateTimePickerPage.checkRtlSwitch();
    });

    it(
        'Verify The user can then choose the desired date from the calendar, and the time from the rotating wheel, ' +
            'For the time, it’s possible to select hours, minutes, and even seconds.',
        () => {
            click(datePickerButton);
            click(dateTimePickerPage.dayInCalendarButtonByValue('1'));
            selectHoursAndMinutes();
            click(okButton);
            expect(getValue(datePickerInput)).toEqual(date);
        }
    );

    it('verify selected date is showing in blue background', () => {
        click(activeDateTimePickerButton, 1);
        click(dateTimePickerPage.dayInCalendarButtonByValue('1'));
        click(okButton);
        click(activeDateTimePickerButton, 1);
        expect(highlightedColor).toContain(
            getCSSPropertyByName(dateTimePickerPage.dayInCalendarButtonByValue('1'), 'background-color').value
        );
    });

    it('Verify When the user selects cancel the action is aborted and the input field remains unchanged.', () => {
        click(activeDateTimePickerButton);
        click(dateTimePickerPage.dayInCalendarButtonByValue('1'));
        selectHoursAndMinutes();
        click(cancelButton);
        expect(getValue(datePickerInput)).not.toEqual(date);
    });

    it('Verify disabled date time picker', () => {
        const disabledButtonsArr = elementArray(disabledDateTimePickerButton);
        for (let i = 0; i < disabledButtonsArr.length; i++) {
            waitForUnclickable(disabledDateTimePickerButton, i);
            waitForUnclickable(disabledDateTimePickerInput, i);
        }
    });

    it('Verify compact date time picker', () => {
        const currentText = getText(compactDateTimePickerInput);
        scrollIntoView(compactDateTimePickerButton);
        click(changeDateTimeValueButton);
        expect(currentText).not.toBe(getValue(compactDateTimePickerInput));
        expect(getValue(compactDateTimePickerInput)).toBe(compactDate);
    });

    it('Verify date time picker with disabled functions', () => {
        scrollIntoView(disabledFunctionExample + datePickerButton);
        click(disabledFunctionExample + datePickerButton);
        waitForElDisplayed(calendarContainer);
        waitForUnclickable(
            dateTimePickerPage.dayInDisabledFunctionsCalendarByIndex(
                (dateTimePickerPage.getCurrentDayIndex() - 1).toString()
            )
        );
    });

    it('verify after the user selects a year, the view changes to the day view. The time remains the same. ', () => {
        click(datePickerButton, 1);
        selectHoursAndMinutes();
        click(okButton);
        scrollIntoView(bottomPage);
        click(datePickerButton, 1);
        scrollIntoView(topPage);
        scrollIntoView(selectYearButton);
        click(selectYearButton);
        waitForElDisplayed(dateTimePickerPage.filterCaledarValue('year'));
        click(firstYearButton);
        waitForElDisplayed(dateTimePickerPage.filterCaledarValue('day'));
        scrollIntoView(datePickerButton, 2);
        click(okButton);
        expect(getValue(datePickerInput, 1)).toEqual(currentDate);
    });

    it('Verify After the user clicks or taps a month, the view changes to the day view. The time remains the same.', () => {
        click(datePickerButton);
        click(dateTimePickerPage.dayInCalendarButtonByValue('1'));
        selectHoursAndMinutes();
        click(okButton);
        scrollIntoView(bottomPage);
        click(datePickerButton);
        scrollIntoView(topPage);
        click(selectMonthButton);
        waitForElDisplayed(dateTimePickerPage.filterCaledarValue('month'));
        click(firstMonthButton);
        waitForElDisplayed(dateTimePickerPage.filterCaledarValue('day'));
        click(okButton);
        expect(getValue(datePickerInput)).toEqual(date);
    });
});

function selectHoursAndMinutes(hour: number = 1, minute: number = 1): void {
    while (getText(selectedHours) !== hour.toString()) {
        scrollIntoView(activeDateTimePickerButton, 1);
        click(navigationUpArrowButton);
    }
    click(timeItem, 1);
    while (getText(selectedMinutes) !== minute.toString()) {
        click(navigationDownArrowButton);
    }
    click(timeItem, 2);
    click(period);
}

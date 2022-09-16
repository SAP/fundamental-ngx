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
    waitForPresent
} from '../../../../../e2e';
import { DatePicker } from './date-picker.po';
import {
    date,
    date1,
    date10,
    date11,
    date12,
    date2,
    date3,
    date5,
    date8,
    date9,
    highlightedColor,
    text,
    year2025
} from './date-picker';

describe('Date picker suite', () => {
    const datePickerPage: DatePicker = new DatePicker();
    const {
        inputDatePicker,
        buttonDatePicker,
        calendarExpanded,
        calendarYearsSection,
        currentDay,
        buttonGerman,
        buttonBulgarian,
        buttonSelectYear,
        buttonSelectMonth,
        buttonSelectYearsRange,
        buttonFirstRangeYear,
        buttonFirstYear,
        buttonFirstMonth,
        filterCalendarValue,
        dayInCalendarButtonByValue,
        monthInCalendarByValue,
        yearInCalendarByValue
    } = datePickerPage;

    beforeAll(() => {
        datePickerPage.open();
        waitForPresent(datePickerPage.root);
        waitForElDisplayed(datePickerPage.title);
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(datePickerPage.root);
        waitForElDisplayed(datePickerPage.title);
    }, 2);

    it('Verify in all the form factor user is able to see the date picker button and input field ', () => {
        const buttons = elementArray(buttonDatePicker);
        const inputs = elementArray(inputDatePicker);
        expect(buttons.length).toEqual(inputs.length);
        for (let i = 1; i < buttons.length; i++) {
            waitForElDisplayed(buttonDatePicker);
            waitForElDisplayed(inputDatePicker);
        }
    });

    it('Verify calendar is expanded on click on the date picker button', () => {
        const activeButtons = elementArray(buttonDatePicker);
        for (let i = 1; i < activeButtons.length; i++) {
            if (!getElementClass(buttonDatePicker, i).includes('is-disabled')) {
                sendKeys(['Escape']);
                scrollIntoView(buttonDatePicker, i);
                click(buttonDatePicker, i);
                waitForElDisplayed(calendarExpanded);
            }
        }
    });

    it('Verify By clicking the current year', () => {
        sendKeys(['Escape']);
        scrollIntoView(buttonDatePicker, 1);
        click(buttonDatePicker, 1);
        expect(waitForElDisplayed(calendarExpanded)).toBe(true);
        scrollIntoView(buttonSelectYear);
        click(buttonSelectYear);
        expect(waitForElDisplayed(calendarYearsSection)).toBe(true);
        click(yearInCalendarByValue(year2025));
        expect(getText(buttonSelectYear)).toBe(year2025.toString());
    });

    it('Verify by default today date is focused', () => {
        const activeButtons = elementArray(buttonDatePicker);
        for (let i = 4; i < activeButtons.length; i++) {
            if (!getElementClass(buttonDatePicker, i).includes('is-disabled')) {
                sendKeys(['Escape']);
                scrollIntoView(buttonDatePicker, i);
                click(buttonDatePicker, i);
                waitForElDisplayed(calendarExpanded);
                expect(getText(currentDay, 0)).toContain(new Date().getDate().toString());
            }
        }
    });

    it('Verify on click on the input field ', () => {
        const activeInputs = elementArray(inputDatePicker);
        for (let i = 0; i < activeInputs.length; i++) {
            if (!getElementClass(buttonDatePicker, i).includes('is-disabled')) {
                sendKeys(['Escape']);
                scrollIntoView(inputDatePicker, i);
                setValue(inputDatePicker, text, i);
                expect(getValue(inputDatePicker, i)).toBe(text);
            }
        }
    });

    it('Verify date input field have placeholder', () => {
        const inputs = elementArray(inputDatePicker);
        for (let i = 0; i < inputs.length; i++) {
            expect(getElementPlaceholder(inputDatePicker, i)).toBeDefined();
        }
    });

    it('should check LTR and RTL orientation', () => {
        datePickerPage.checkRtlSwitch();
    });

    it('verify pre-populated single type date-picker', () => {
        click(buttonDatePicker);
        click(dayInCalendarButtonByValue('1'));
        expect(getValue(inputDatePicker)).toEqual(date);
    });

    it('verify single type date-picker:', () => {
        click(buttonDatePicker, 3);
        click(dayInCalendarButtonByValue('1'));
        expect(getValue(inputDatePicker, 3)).toEqual(date1);
    });

    it('verify pre-populated range type date-picker', () => {
        click(buttonDatePicker, 1);
        click(dayInCalendarButtonByValue('1'));
        click(dayInCalendarButtonByValue('15'));
        click(buttonDatePicker, 1);
        expect(getValue(inputDatePicker, 1)).toEqual(date2);
    });

    it('verify range type date-picker', () => {
        click(buttonDatePicker, 4);
        click(dayInCalendarButtonByValue('1'));
        click(dayInCalendarButtonByValue('15'));
        click(buttonDatePicker, 4);
        expect(getValue(inputDatePicker, 4)).toEqual(date3);
    });

    it('verify birth date date-picker', () => {
        click(buttonDatePicker, 5);
        click(dayInCalendarButtonByValue('1'));
        expect(getValue(inputDatePicker, 5)).toEqual(date1);
    });

    it('verify holiday date-picker', () => {
        click(buttonDatePicker, 6);
        click(dayInCalendarButtonByValue('1'));
        click(dayInCalendarButtonByValue('15'));
        click(buttonDatePicker, 6);
        expect(getValue(inputDatePicker, 6)).toEqual(date3);
    });

    it('verify date picker use outside Form', () => {
        click(buttonDatePicker, 8);
        click(dayInCalendarButtonByValue('1'));
        expect(getValue(inputDatePicker, 8)).toEqual(date1);
    });

    it('verify range date picker outside form', () => {
        click(buttonDatePicker, 9);
        click(dayInCalendarButtonByValue('1'));
        click(dayInCalendarButtonByValue('15'));
        click(buttonDatePicker, 9);
        expect(getValue(inputDatePicker, 9)).toEqual(date3);
    });

    it('verify disable parts of Calender for selection', () => {
        click(buttonDatePicker, 10);
        click(dayInCalendarButtonByValue('1'));
        expect(getValue(inputDatePicker, 10)).toEqual(date1);
    });

    it('verify date Picker Formatting date picker with custom output format', () => {
        click(buttonDatePicker, 10);
        click(dayInCalendarButtonByValue('1'));
        expect(getValue(inputDatePicker, 10)).toEqual(date5);
    });

    it('verify date Picker Formatting range date picker custom format', () => {
        click(buttonDatePicker, 12);
        click(dayInCalendarButtonByValue('1'));
        click(dayInCalendarButtonByValue('15'));
        click(buttonDatePicker, 12);
        expect(getValue(inputDatePicker, 12)).toEqual(date10);
    });

    it('verify internationalization of Date Picker', () => {
        click(buttonDatePicker, 13);
        click(buttonSelectYear);
        waitForElDisplayed(calendarYearsSection);
        click(yearInCalendarByValue(year2025));
        click(buttonSelectMonth);
        waitForElDisplayed(filterCalendarValue('month'));
        click(monthInCalendarByValue(1));
        click(dayInCalendarButtonByValue('1'));
        expect(getValue(inputDatePicker, 13)).toEqual(date11);
        click(buttonGerman);
        expect(getValue(inputDatePicker, 13)).toEqual(date8);
        click(buttonBulgarian);
        expect(getValue(inputDatePicker, 13)).toEqual(date12);
    });

    it('verify with the date picker, the user can see a day view, month view, year view, or year ranges.', () => {
        const buttons = elementArray(buttonDatePicker);
        for (let i = 1; i < buttons.length - 1; i++) {
            if (!getElementClass(buttonDatePicker, i).includes('is-disabled')) {
                click(buttonDatePicker, i);
                waitForElDisplayed(filterCalendarValue('day'));
                click(buttonSelectMonth);
                waitForElDisplayed(filterCalendarValue('month'));
                click(buttonSelectYear);
                waitForElDisplayed(filterCalendarValue('year'));
                click(buttonSelectYearsRange);
                waitForElDisplayed(filterCalendarValue('aggregated-years'));
                click(buttonDatePicker, i);
            }
        }
    });

    it('verify selected date is showing in blue background', () => {
        click(buttonDatePicker);
        click(dayInCalendarButtonByValue('1'));
        expect(getValue(inputDatePicker)).toEqual(date);
        click(buttonDatePicker);
        expect(highlightedColor).toContain(
            getCSSPropertyByName(dayInCalendarButtonByValue('1'), 'background-color').value
        );
    });

    it('verify selecting a year range navigates back to the year view', () => {
        const buttons = elementArray(buttonDatePicker);
        for (let i = 1; i < buttons.length - 1; i++) {
            if (!getElementClass(buttonDatePicker, i).includes('is-disabled')) {
                click(buttonDatePicker, i);
                click(buttonSelectYear);
                click(buttonSelectYearsRange);
                waitForElDisplayed(filterCalendarValue('aggregated-years'));
                click(buttonFirstRangeYear);
                waitForElDisplayed(filterCalendarValue('year'));
                click(buttonDatePicker, i);
            }
        }
    });

    it('verify after the user selects a year, the view changes back to the day view. ', () => {
        const buttons = elementArray(buttonDatePicker);
        for (let i = 1; i < buttons.length - 1; i++) {
            if (!getElementClass(buttonDatePicker, i).includes('is-disabled')) {
                click(buttonDatePicker, i);
                click(buttonSelectYear);
                waitForElDisplayed(filterCalendarValue('year'));
                click(buttonFirstYear);
                waitForElDisplayed(filterCalendarValue('day'));
                click(buttonDatePicker, i);
            }
        }
    });

    it('verify after the user selects a month, the view changes back to the day view. ', () => {
        const buttons = elementArray(buttonDatePicker);
        for (let i = 1; i < buttons.length - 1; i++) {
            if (!getElementClass(buttonDatePicker, i).includes('is-disabled')) {
                click(buttonDatePicker, i);
                click(buttonSelectMonth);
                waitForElDisplayed(filterCalendarValue('month'));
                click(buttonFirstMonth);
                waitForElDisplayed(filterCalendarValue('day'));
                click(buttonDatePicker, i);
            }
        }
    });

    it('verify user is not able select multiple dates', () => {
        click(buttonDatePicker);
        click(dayInCalendarButtonByValue('1'));
        expect(getValue(inputDatePicker)).toEqual(date);
        click(buttonDatePicker);
        click(dayInCalendarButtonByValue('2'));
        expect(getValue(inputDatePicker)).toEqual(date9);
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            datePickerPage.saveExampleBaselineScreenshot();
            expect(datePickerPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});

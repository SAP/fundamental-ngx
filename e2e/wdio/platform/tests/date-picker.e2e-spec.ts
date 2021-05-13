import {
    click,
    elementArray,
    getAttributeByName,
    getCSSPropertyByName, getElementPlaceholder,
    getText,
    getValue,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';
import { DatePicker } from '../pages/date-picker.po';
import {
    date,
    date1,
    date2,
    date3,
    date4,
    date5,
    date6,
    date7,
    date8,
    date9,
    highlightedColor,
    text,
    year2000
} from '../fixtures/testData/date-picker';

describe('Date picker suite', function() {
    const datePickerPage: DatePicker = new DatePicker();
    const {
        inputDatePicker, buttonDatePicker, activeButtonDatePicker, activeInputDatePicker, calendarExpanded,
        calendarYearsSection, currentDay, buttonGerman, buttonBulgarian, buttonSelectYear, buttonSelectMonth,
        buttonSelectYearsRange, buttonFirstRangeYear, buttonFirstYear, buttonFirstMonth, filterCalendarValue,
        dayInCalendarButtonByValue, yearInCalendarByValue
    } = datePickerPage;

    beforeAll(() => {
        datePickerPage.open();
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

    it('Verify calendar is expanded on click on the date picker button', () => {
        const activeButtons = elementArray(activeButtonDatePicker);
        for (let i = 1; i < activeButtons.length; i++) {
            sendKeys(['Escape']);
            scrollIntoView(activeButtonDatePicker, i);
            click(activeButtonDatePicker, i);
            waitForElDisplayed(calendarExpanded);
        }
    });

    it('Verify By clicking the current year', () => {
        sendKeys(['Escape']);
        scrollIntoView(activeButtonDatePicker, 1);
        click(activeButtonDatePicker, 1);
        expect(waitForElDisplayed(calendarExpanded)).toBe(true);
        scrollIntoView(buttonSelectYear);
        click(buttonSelectYear);
        expect(waitForElDisplayed(calendarYearsSection)).toBe(true);
        click(yearInCalendarByValue(year2000));
        expect(getText(buttonSelectYear)).toBe(year2000.toString());
    });

    it('Verify by default today date is focused', () => {
        const activeButtons = elementArray(activeButtonDatePicker);
        for (let i = 4; i < activeButtons.length; i++) {
            sendKeys(['Escape']);
            scrollIntoView(activeButtonDatePicker, i);
            click(activeButtonDatePicker, i);
            waitForElDisplayed(calendarExpanded);
            expect(getText(currentDay, 0)).toBe(new Date().getDate().toString());
        }
    });

    it('Verify on click on the input field ', () => {
        const activeInputs = elementArray(activeInputDatePicker);
        for (let i = 0; i < activeInputs.length; i++) {
            sendKeys(['Escape']);
            scrollIntoView(activeInputDatePicker, i);
            setValue(activeInputDatePicker, text, i);
            expect(getValue(activeInputDatePicker, i)).toBe(text);
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
        click(activeButtonDatePicker, 1);
        click(dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model')).toEqual(date);
    });

    it('verify single type date-picker:', () => {
        click(activeButtonDatePicker, 3);
        click(dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 2)).toEqual(date1);
    });
    it('verify pre-populated range type date-picker', () => {
        click(activeButtonDatePicker, 2);
        click(dayInCalendarButtonByValue('1'));
        click(dayInCalendarButtonByValue('15'));
        click(activeButtonDatePicker, 2);
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 1)).toEqual(date2);
    });

    it('verify range type date-picker', () => {
        click(activeButtonDatePicker, 4);
        click(dayInCalendarButtonByValue('1'));
        click(dayInCalendarButtonByValue('15'));
        click(activeButtonDatePicker, 4);
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 3)).toEqual(date3);
    });

    it('verify birth date date-picker', () => {
        click(activeButtonDatePicker, 5);
        click(dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 4)).toEqual(date1);
    });

    it('verify holiday date-picker', () => {
        click(activeButtonDatePicker, 6);
        click(dayInCalendarButtonByValue('1'));
        click(dayInCalendarButtonByValue('15'));
        click(activeButtonDatePicker, 6);
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 5)).toEqual(date3);
    });

    it('verify date picker use outside Form', () => {
        click(activeButtonDatePicker, 7);
        click(dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 6)).toEqual(date1);
    });

    it('verify range date picker outside form', () => {
        click(activeButtonDatePicker, 8);
        click(dayInCalendarButtonByValue('1'));
        click(dayInCalendarButtonByValue('15'));
        click(activeButtonDatePicker, 8);
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 7)).toEqual(date3);
    });

    // skipped due to https://github.com/SAP/fundamental-ngx/issues/4553
    xit('verify disable parts of Calender for selection', () => {
        click(activeButtonDatePicker, 9);
        click(dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 8)).toEqual(date1);
    });

    it('verify date Picker Formatting date picker with custom output format', () => {
        click(activeButtonDatePicker, 10);
        click(dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 9)).toEqual(date5);
    });

    it('verify date Picker Formatting range date picker custom format', () => {
        click(activeButtonDatePicker, 11);
        click(dayInCalendarButtonByValue('1'));
        click(dayInCalendarButtonByValue('15'));
        click(activeButtonDatePicker, 11);
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 10)).toEqual(date4);
    });

    it('verify internationalization of Date Picker', () => {
        click(activeButtonDatePicker, 12);
        click(dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 11)).toEqual(date7);
        click(buttonGerman);
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 11)).toEqual(date8);
        click(buttonBulgarian);
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 11)).toEqual(date6);
    });

    it('verify with the date picker, the user can see a day view, month view, year view, or year ranges.', () => {
        const buttons = elementArray(activeButtonDatePicker);
        for (let i = 1; i < buttons.length - 1; i++) {
            click(activeButtonDatePicker, i);
            waitForElDisplayed(filterCalendarValue('day'));
            click(buttonSelectMonth);
            waitForElDisplayed(filterCalendarValue('month'));
            click(buttonSelectYear);
            waitForElDisplayed(filterCalendarValue('year'));
            click(buttonSelectYearsRange);
            waitForElDisplayed(filterCalendarValue('aggregated-year'));
            click(activeButtonDatePicker, i);
        }
    });

   it('verify selected date is showing in blue background', () => {
        click(activeButtonDatePicker, 1);
        click(dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model')).toEqual(date);
        click(activeButtonDatePicker, 1);
        expect(highlightedColor)
            .toContain(getCSSPropertyByName(dayInCalendarButtonByValue('1'), 'background-color').value);
    });

    it('verify selecting a year range navigates back to the year view', () => {
        const buttons = elementArray(activeButtonDatePicker);
        for (let i = 1; i < buttons.length - 1; i++) {
            click(activeButtonDatePicker, i);
            click(buttonSelectYear);
            click(buttonSelectYearsRange);
            waitForElDisplayed(filterCalendarValue('aggregated-year'));
            click(buttonFirstRangeYear);
            waitForElDisplayed(filterCalendarValue('year'));
            click(activeButtonDatePicker, i);
        }
    });

    it('verify after the user selects a year, the view changes back to the day view. ', () => {
        const buttons = elementArray(activeButtonDatePicker);
        for (let i = 1; i < buttons.length - 1; i++) {
            click(activeButtonDatePicker, i);
            click(buttonSelectYear);
            waitForElDisplayed(filterCalendarValue('year'));
            click(buttonFirstYear);
            waitForElDisplayed(filterCalendarValue('day'));
            click(activeButtonDatePicker, i);
        }
    });

    it('verify after the user selects a month, the view changes back to the day view. ', () => {
        const buttons = elementArray(activeButtonDatePicker);
        for (let i = 1; i < buttons.length - 1; i++) {
            click(activeButtonDatePicker, i);
            click(buttonSelectMonth);
            waitForElDisplayed(filterCalendarValue('month'));
            click(buttonFirstMonth);
            waitForElDisplayed(filterCalendarValue('day'));
            click(activeButtonDatePicker, i);
        }
    });

    it('verify user is not able select multiple dates', () => {
        click(activeButtonDatePicker, 1);
        click(dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model')).toEqual(date);
        click(activeButtonDatePicker, 1);
        click(dayInCalendarButtonByValue('2'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model')).toEqual(date9);
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            datePickerPage.saveExampleBaselineScreenshot();
            expect(datePickerPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});


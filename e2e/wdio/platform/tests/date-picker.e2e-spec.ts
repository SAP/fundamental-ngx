import {
    click,
    elementArray, getAttributeByName, getCSSPropertyByName, getText, getValue,
    refreshPage, scrollIntoView, sendKeys, setValue,
    waitForElDisplayed, waitForPresent
} from '../../driver/wdio';
import { DatePicker } from '../pages/date-picker.po';
import datePickerTestData from '../fixtures/testData/date-picker';

describe('Date picker suite', function() {
    const datePickerPage: DatePicker = new DatePicker();

    beforeAll(() => {
        datePickerPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(datePickerPage.inputDatePicker);
    }, 1);

    it('Verify in all the form factor user is able to see the date picker button and input field ', () => {
        const buttons = elementArray(datePickerPage.buttonDatePicker);
        const inputs = elementArray(datePickerPage.inputDatePicker);
        expect(buttons.length).toEqual(inputs.length);
        for (let i = 1; i < buttons.length; i++) {
            waitForElDisplayed(datePickerPage.buttonDatePicker);
            waitForElDisplayed(datePickerPage.inputDatePicker);
        }
    });

    it('Verify on click on the date picker button', () => {
        const activeButtons = elementArray(datePickerPage.activeButtonDatePicker);
        for (let i = 1; i < activeButtons.length; i++) {
            sendKeys(['Escape']);
            scrollIntoView(datePickerPage.activeButtonDatePicker, i);
            click(datePickerPage.activeButtonDatePicker, i);
            waitForElDisplayed(datePickerPage.calendarExpanded);
        }
    });

    it('Verify By clicking the current year', () => {
        sendKeys(['Escape']);
        scrollIntoView(datePickerPage.activeButtonDatePicker, 1);
        click(datePickerPage.activeButtonDatePicker, 1);
        expect(waitForElDisplayed(datePickerPage.calendarExpanded)).toBe(true);
        scrollIntoView(datePickerPage.buttonSelectYear);
        click(datePickerPage.buttonSelectYear);
        expect(waitForElDisplayed(datePickerPage.calendarYearsSection)).toBe(true);
        click(datePickerPage.yearInCalendarByValue(datePickerTestData.year2000));
        expect(getText(datePickerPage.buttonSelectYear)).toBe(datePickerTestData.year2000.toString());
    });

    it('Verify by default today date is focused', () => {
        const activeButtons = elementArray(datePickerPage.activeButtonDatePicker);
        for (let i = 4; i < activeButtons.length; i++) {
            sendKeys(['Escape']);
            scrollIntoView(datePickerPage.activeButtonDatePicker, i);
            click(datePickerPage.activeButtonDatePicker, i);
            waitForElDisplayed(datePickerPage.calendarExpanded);
            expect(getText(datePickerPage.currentDay, 0)).toBe(new Date().getDate().toString());
        }
    });

    it('Verify on click on the input field ', () => {
        const activeInputs = elementArray(datePickerPage.activeInputDatePicker);
        for (let i = 0; i < activeInputs.length; i++) {
            sendKeys(['Escape']);
            scrollIntoView(datePickerPage.activeInputDatePicker, i);
            setValue(datePickerPage.activeInputDatePicker, datePickerTestData.text, i);
            expect(getValue(datePickerPage.activeInputDatePicker, i)).toBe(datePickerTestData.text);
        }
    });

    it('Verify date input field have placeholder', () => {
        const inputs = elementArray(datePickerPage.inputDatePicker);
        for (let i = 0; i < inputs.length; i++) {
            expect(getAttributeByName(datePickerPage.inputDatePicker, 'placeholder', i)).toBeDefined();
        }
    });

    it('should check LTR and RTL orientation', () => {
        datePickerPage.checkRtlSwitch();
    });

    it('verify pre-populated single type date-picker', () => {
        click(datePickerPage.activeButtonDatePicker, 1);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(datePickerPage.activeInputDatePicker, 'ng-reflect-model')).toEqual(datePickerTestData.date);
    });

    it('verify single type date-picker:', () => {
        click(datePickerPage.activeButtonDatePicker, 3);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(datePickerPage.activeInputDatePicker, 'ng-reflect-model', 2)).toEqual(datePickerTestData.date1);
    });
    it('verify pre-populated range type date-picker', () => {
        click(datePickerPage.activeButtonDatePicker, 2);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        click(datePickerPage.dayInCalendarButtonByValue('15'));
        click(datePickerPage.activeButtonDatePicker, 2);
        expect(getAttributeByName(datePickerPage.activeInputDatePicker, 'ng-reflect-model', 1)).toEqual(datePickerTestData.date2);
    });

    it('verify range type date-picker', () => {
        click(datePickerPage.activeButtonDatePicker, 4);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        click(datePickerPage.dayInCalendarButtonByValue('15'));
        click(datePickerPage.activeButtonDatePicker, 4);
        expect(getAttributeByName(datePickerPage.activeInputDatePicker, 'ng-reflect-model', 3)).toEqual(datePickerTestData.date3);
    });

    it('verify birth date date-picker', () => {
        click(datePickerPage.activeButtonDatePicker, 5);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(datePickerPage.activeInputDatePicker, 'ng-reflect-model', 4)).toEqual(datePickerTestData.date1);
    });

    it('verify holiday date-picker', () => {
        click(datePickerPage.activeButtonDatePicker, 6);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        click(datePickerPage.dayInCalendarButtonByValue('15'));
        click(datePickerPage.activeButtonDatePicker, 6);
        expect(getAttributeByName(datePickerPage.activeInputDatePicker, 'ng-reflect-model', 5)).toEqual(datePickerTestData.date3);
    });

    it('verify date picker use outside Form', () => {
        click(datePickerPage.activeButtonDatePicker, 7);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(datePickerPage.activeInputDatePicker, 'ng-reflect-model',6)).toEqual(datePickerTestData.date1);
    });

    it('verify range date picker outside form', () => {
        click(datePickerPage.activeButtonDatePicker, 8);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        click(datePickerPage.dayInCalendarButtonByValue('15'));
        click(datePickerPage.activeButtonDatePicker, 8);
        expect(getAttributeByName(datePickerPage.activeInputDatePicker, 'ng-reflect-model', 7)).toEqual(datePickerTestData.date3);
    });

    // skipped due to https://github.com/SAP/fundamental-ngx/issues/4553
    xit('verify disable parts of Calender for selection', () => {
        click(datePickerPage.activeButtonDatePicker, 9);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(datePickerPage.activeInputDatePicker, 'ng-reflect-model', 8)).toEqual(datePickerTestData.date1);
    });

    it('verify date Picker Formatting date picker with custom output format', () => {
        click(datePickerPage.activeButtonDatePicker, 10);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(datePickerPage.activeInputDatePicker, 'ng-reflect-model', 9)).toEqual(datePickerTestData.date5);
    });

    it('verify date Picker Formatting range date picker custom format', () => {
        click(datePickerPage.activeButtonDatePicker, 11);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        click(datePickerPage.dayInCalendarButtonByValue('15'));
        click(datePickerPage.activeButtonDatePicker, 11);
        expect(getAttributeByName(datePickerPage.activeInputDatePicker, 'ng-reflect-model', 10)).toEqual(datePickerTestData.date4);
    });

    it('verify internationalization of Date Picker', () => {
        click(datePickerPage.activeButtonDatePicker, 12);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(datePickerPage.activeInputDatePicker, 'ng-reflect-model', 11)).toEqual(datePickerTestData.date7);
        click(datePickerPage.buttonGerman);
        expect(getAttributeByName(datePickerPage.activeInputDatePicker, 'ng-reflect-model', 11)).toEqual(datePickerTestData.date8);
        click(datePickerPage.buttonBulgarian);
        expect(getAttributeByName(datePickerPage.activeInputDatePicker, 'ng-reflect-model', 11)).toEqual(datePickerTestData.date6);
    });

    it('verify with the date picker, the user can see a day view, month view, year view, or year ranges.', () => {
        const buttons = elementArray(datePickerPage.activeButtonDatePicker);
        for (let i = 1; i < buttons.length - 1; i++) {
            click(datePickerPage.activeButtonDatePicker, i);
            waitForElDisplayed(datePickerPage.filterCalendarValue('day'));
            click(datePickerPage.buttonSelectMonth);
            waitForElDisplayed(datePickerPage.filterCalendarValue('month'));
            click(datePickerPage.buttonSelectYear);
            waitForElDisplayed(datePickerPage.filterCalendarValue('year'));
            click(datePickerPage.buttonSelectYearsRange);
            waitForElDisplayed(datePickerPage.filterCalendarValue('aggregated-year'));
            click(datePickerPage.activeButtonDatePicker, i);
        }
    });

   it('verify selected date is showing in blue background', () => {
        click(datePickerPage.activeButtonDatePicker, 1);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(datePickerPage.activeInputDatePicker, 'ng-reflect-model')).toEqual(datePickerTestData.date);
        click(datePickerPage.activeButtonDatePicker, 1);
        expect(datePickerTestData.highlightedColor)
            .toContain(getCSSPropertyByName(datePickerPage.dayInCalendarButtonByValue('1'), 'background-color').value);
    });

    it('verify selecting a year range navigates back to the year view', () => {
        const buttons = elementArray(datePickerPage.activeButtonDatePicker);
        for (let i = 1; i < buttons.length - 1; i++) {
            click(datePickerPage.activeButtonDatePicker, i);
            click(datePickerPage.buttonSelectYear);
            click(datePickerPage.buttonSelectYearsRange);
            waitForElDisplayed(datePickerPage.filterCalendarValue('aggregated-year'));
            click(datePickerPage.buttonFirstRangeYear)
            waitForElDisplayed(datePickerPage.filterCalendarValue('year'));
            click(datePickerPage.activeButtonDatePicker, i);
        }
    });

    it('verify after the user selects a year, the view changes back to the day view. ', () => {
        const buttons = elementArray(datePickerPage.activeButtonDatePicker);
        for (let i = 1; i < buttons.length - 1; i++) {
            click(datePickerPage.activeButtonDatePicker, i);
            click(datePickerPage.buttonSelectYear);
            waitForElDisplayed(datePickerPage.filterCalendarValue('year'));
            click(datePickerPage.buttonFirstYear)
            waitForElDisplayed(datePickerPage.filterCalendarValue('day'));
            click(datePickerPage.activeButtonDatePicker, i);
        }
    });

    it('verify after the user selects a month, the view changes back to the day view. ', () => {
        const buttons = elementArray(datePickerPage.activeButtonDatePicker);
        for (let i = 1; i < buttons.length - 1; i++) {
            click(datePickerPage.activeButtonDatePicker, i);
            click(datePickerPage.buttonSelectMonth);
            waitForElDisplayed(datePickerPage.filterCalendarValue('month'));
            click(datePickerPage.buttonFirstMonth)
            waitForElDisplayed(datePickerPage.filterCalendarValue('day'));
            click(datePickerPage.activeButtonDatePicker, i);
        }
    });

    it('verify user is not able select multiple dates', () => {
        click(datePickerPage.activeButtonDatePicker, 1);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(datePickerPage.activeInputDatePicker, 'ng-reflect-model')).toEqual(datePickerTestData.date);
        click(datePickerPage.activeButtonDatePicker, 1);
        click(datePickerPage.dayInCalendarButtonByValue('2'));
        expect(getAttributeByName(datePickerPage.activeInputDatePicker, 'ng-reflect-model')).toEqual(datePickerTestData.date9);
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            datePickerPage.saveExampleBaselineScreenshot('date-picker');
            expect(datePickerPage.compareWithBaseline('date-picker')).toBeLessThan(1);
        });
    });
});


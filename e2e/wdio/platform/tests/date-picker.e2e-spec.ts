import {
    click,
    elementArray, getAttributeByName, getValue,
    refreshPage, scrollIntoView, sendKeys, setValue,
    waitForElDisplayed
} from '../../driver/wdio';
import { DatePicker } from '../pages/date-picker.po';
import datePickerTestData from '../fixtures/testData/date-picker'

describe('Date picker suite', function() {
    const datePickerPage: DatePicker = new DatePicker();

    beforeAll(() => {
        datePickerPage.open();
    });

    afterEach(() => {
        refreshPage();
    });

    it('Verify in all the form factor user is able to see the date picker button and input field ', () => {
        const buttons = elementArray(datePickerPage.buttonDatePicker);
        const inputs = elementArray(datePickerPage.inputDatePicker);
        expect(buttons.length).toEqual(inputs.length);
        for (let i = 0; i < buttons.length; i++) {
            waitForElDisplayed(datePickerPage.buttonDatePicker);
            waitForElDisplayed(datePickerPage.inputDatePicker);
        }
    });

    it('Verify on click on the date picker button', () => {
        const activeButtons = elementArray(datePickerPage.activeButtonDatePicker);
        for (let i = 0; i < activeButtons.length; i++) {
            sendKeys(['Escape']);
            scrollIntoView(datePickerPage.activeButtonDatePicker, i);
            click(datePickerPage.activeButtonDatePicker, i);
            waitForElDisplayed(datePickerPage.calendarExapnded);
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
        click(datePickerPage.activeButtonDatePicker, 0);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(datePickerPage.datePickerInputsByIndex('0'), 'ng-reflect-model')).toEqual(datePickerTestData.date);
    });

    it('verify single type date-picker:', () => {
        click(datePickerPage.activeButtonDatePicker, 1);
        click(datePickerPage.dayInCalendarButtonByValue( '1'));
        expect(getAttributeByName(datePickerPage.datePickerInputsByIndex('1'), 'ng-reflect-model')).toEqual(datePickerTestData.date1);
    });

    it('verify pre-populated range type date-picker', () => {
        click(datePickerPage.activeButtonDatePicker, 2);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        click(datePickerPage.dayInCalendarButtonByValue('15'));
        click(datePickerPage.activeButtonDatePicker, 2);
        expect(getAttributeByName(datePickerPage.datePickerInputsByIndex('2'), 'ng-reflect-model')).toEqual(datePickerTestData.date2);
    });

    it('verify Range type date-picker', () => {
        click(datePickerPage.activeButtonDatePicker, 3);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        click(datePickerPage.dayInCalendarButtonByValue('15'));
        click(datePickerPage.activeButtonDatePicker, 3);
        expect(getAttributeByName(datePickerPage.datePickerInputsByIndex('3'), 'ng-reflect-model')).toEqual(datePickerTestData.date3);
    });

    it('verify birth Date date-picker', () => {
        click(datePickerPage.activeButtonDatePicker, 4);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(datePickerPage.datePickerInputsByIndex('5'), 'ng-reflect-model')).toEqual(datePickerTestData.date1);
    });

    it('verify holiday date-picker', () => {
        click(datePickerPage.activeButtonDatePicker, 5);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        click(datePickerPage.dayInCalendarButtonByValue('15'));
        click(datePickerPage.activeButtonDatePicker, 5);
        expect(getAttributeByName(datePickerPage.datePickerInputsByIndex('6'), 'ng-reflect-model')).toEqual(datePickerTestData.date3);
    });

    it('verify Date Picker Use Outside Form', () => {
        click(datePickerPage.activeButtonDatePicker, 6);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(datePickerPage.datePickerInputsByIndex('8'), 'ng-reflect-model')).toEqual(datePickerTestData.date1);
    });

    it('verify Range Date Picker Outside Form', () => {
        click(datePickerPage.activeButtonDatePicker, 7);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        click(datePickerPage.dayInCalendarButtonByValue('15'));
        click(datePickerPage.activeButtonDatePicker, 7);
        expect(getAttributeByName(datePickerPage.datePickerInputsByIndex('9'), 'ng-reflect-model')).toEqual(datePickerTestData.date3);
    });

    it('verify birth Date date-picker:', () => {
        click(datePickerPage.activeButtonDatePicker, 8);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(datePickerPage.datePickerInputsByIndex('10'), 'ng-reflect-model')).toEqual(datePickerTestData.date1);
    });

    it('verify disable parts of Calender for selection', () => {
        click(datePickerPage.activeButtonDatePicker, 8);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(datePickerPage.datePickerInputsByIndex('10'), 'ng-reflect-model')).toEqual(datePickerTestData.date1);
    });

    it('verify Date Picker Formatting date picker with custom output format', () => {
        click(datePickerPage.activeButtonDatePicker, 9);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(datePickerPage.datePickerInputsByIndex('11'), 'ng-reflect-model')).toEqual(datePickerTestData.date5);
    });

    it('verify Date Picker Formatting range date picker custom format', () => {
        click(datePickerPage.activeButtonDatePicker, 10);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        click(datePickerPage.dayInCalendarButtonByValue('15'));
        click(datePickerPage.activeButtonDatePicker, 7);
        expect(getAttributeByName(datePickerPage.datePickerInputsByIndex('12'), 'ng-reflect-model')).toEqual(datePickerTestData.date4);
    });

    it('verify Internationalization of Date Picker', () => {
        click(datePickerPage.activeButtonDatePicker, 11);
        click(datePickerPage.dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(datePickerPage.datePickerInputsByIndex('13'), 'ng-reflect-model')).toEqual(datePickerTestData.date7);
        click(datePickerPage.buttonGerman);
        expect(getAttributeByName(datePickerPage.datePickerInputsByIndex('13'), 'ng-reflect-model')).toEqual(datePickerTestData.date8);
        click(datePickerPage.buttonBulgarian);
        expect(getAttributeByName(datePickerPage.datePickerInputsByIndex('13'), 'ng-reflect-model')).toEqual(datePickerTestData.date6);
    });

    it('Verify by dafault today date is focused', () => {
        const activeButtons = elementArray(datePickerPage.activeButtonDatePicker);
        for (let i = 0; i < activeButtons.length; i++) {
            if (i !== 0 && i !== 4 && i !== 8 && i !== 11) {
                click(datePickerPage.activeButtonDatePicker, 11);
                click(datePickerPage.dayInCalendarButtonByValue('1'));
                expect(getAttributeByName(datePickerPage.datePickerInputsByIndex('13'), 'ng-reflect-model'))
                    .toEqual(datePickerTestData.date7);
            }
        }
    });
});


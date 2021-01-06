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
            checkPlaceholders(datePickerPage.inputDatePicker, i);
        }
    });

    it('should check LTR and RTL orientation', () => {
        datePickerPage.checkRtlSwitch();
    });
});

function checkPlaceholders(element: string, index: number) {
    expect(getAttributeByName(element, 'placeholder', index)).toBeDefined();
}
